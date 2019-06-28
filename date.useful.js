/* 
 * Complementos para manipulação de datas em javascript
 * Desenvolvido por: Roberto Ferreira da Silva
 * Em breve no site https://tipigao.com.br
 * Contato: tipigao@gmail.com
 */

if (!Date.prototype.addMilliseconds) {
    Date.prototype.addMilliseconds = function (n) {
        return new Date(this.getTime() + n);
    };
}

if (!Date.prototype.addSeconds) {
    Date.prototype.addSeconds = function (n) {
        return this.addMilliseconds(n * 1000);
    };
}

if (!Date.prototype.addMinutes) {
    Date.prototype.addMinutes = function (n) {
        return this.addSeconds(n * 60);
    };
}

if (!Date.prototype.addHours) {
    Date.prototype.addHours = function (n) {
        return this.addMinutes(n * 60);
    };
}

if (!Date.prototype.addDays) {
    Date.prototype.addDays = function (n) {
        return this.addHours(n * 24);
    };
}

if (!Date.prototype.addMonths) {
    Date.prototype.addMonths = function (n) {
        var changedDate = new Date(time);
        changedDate.setMonth(changedDate.getMonth() + n);
        return changedDate;
    };
}

if (!Date.prototype.addYear) {
    Date.prototype.addYear = function (n) {
        var changedDate = new Date(time);
        changedDate.setFullYear(changedDate.getFullYear() + n);
        return changedDate;
    };
}

//Retorna uma nova instância de um objeto Date com as horas definidas para o início do dia
if (!Date.prototype.truncTime) {
    Date.prototype.truncTime = function () {
        var dtTemp =  new Date(this.getTime());
        dtTemp.setHours(0,0,0,0);
        return dtTemp;
    };
}

//Adiciona dias úteis a uma data
if (!Date.prototype.addUsefulDays) {
    Date.prototype.addUsefulDays = function (n) {
        
        var contDias = 0,
            sentidoPositivo = n > 0,
            lmt = Math.abs(Math.ceil(n)),
            anoCorrente = 0,
            arFeriados = null
            dtRet = new Date(this.getTime());

        while(contDias < lmt){
            
            dtRet = dtRet.addDays(sentidoPositivo ? 1 : -1);

            // if(dtRet.getDate()===20){
            //     debugger;
            // }

            //Verifica se o dia da semana é domingo (0) ou sábado (6)
            if(dtRet.getDay()===0 || dtRet.getDay()===6){
                continue;
            }
            
            if(anoCorrente !== dtRet.getFullYear()){
                anoCorrente = dtRet.getFullYear();
                arFeriados = dtRet.holidays();
            }

            //Trunca as horas da data e compara com a lista de feriados
            var dtTrunc = dtRet.truncTime();
            var ehFeriado = false;
            for(var idx = 0; idx < arFeriados.length; idx++){
                if(arFeriados[idx].getTime() === dtTrunc.getTime()){
                    ehFeriado = true;
                    break;
                }
            }

            if(!ehFeriado){
                contDias++;
            }
        }

        return dtRet;
    };
}

//Adiciona um dia útil à uma data
if (!Date.prototype.nextUsefulDay) {
    Date.prototype.nextUsefulDay = function (n) {
        return this.addUsefulDays(1);
    };
}

//Retorna o domingo de Páscoa calculado para o ano no objeto Date
if (!Date.prototype.getEasterSunday) {
    //Retirado e adaptado de https://pt.wikipedia.org/wiki/C%C3%A1lculo_da_P%C3%A1scoa
    Date.prototype.getEasterSunday = function ()  {
        var year = this.getFullYear();
        var X=0;
        var Y=0;
        if (year>=1582 && year<=1699){X = 22; Y = 2;}
        if (year>=1700 && year<=1799){X = 23; Y = 3;}
        if (year>=1800 && year<=1899){X = 23; Y = 4;}
        if (year>=1900 && year<=2099){X = 24; Y = 5;}
        if (year>=2100 && year<=2199){X = 24; Y = 6;}
        if (year>=2200 && year<=2299){X = 25; Y = 7;}
        
        var a = year % 19;
        var b = year % 4;
        var c = year % 7;
        var d = ((19*a)+X) % 30;
        var e = (((2*b)+(4*c)+(6*d)+Y))%7;
        
        var day;
        var month;
        if ((d+e)<10) { 
            day = d+e+22; 
            month = 3;
        }
        else {
            day = d+e-9; 
            month = 4;
        }
        //26 of april 2076
        if (day==26 && month==4) {
            day = 19;
        }
        
        //25 of april 2049
        if (day==25 && month==4 && d==28 && a>10) {
            day = 18;
        }
        
        return new Date(year,(month-1),day,0,0,0,0);
    };
}

//Disponibiliza no objeto Date um vetor de feriados.
//Feriados regionais devem ser incluídos pelo próprio usuário.
if (!Date.prototype.holidays) {
    Date.prototype.holidays = function () {
        var ano = this.getFullYear();
        var arFeriados = [];
        
        //FERIADOS BRASILEIROS FIXOS
        arFeriados.push(new Date(ano,0,1,0,0,0,0));//Confraternização Universal (feriado nacional)
        arFeriados.push(new Date(ano,3,1,0,0,0,0));//Tiradentes
        arFeriados.push(new Date(ano,4,1,0,0,0,0));//Dia Mundial do Trabalho
        arFeriados.push(new Date(ano,8,7,0,0,0,0));//Independência do Brasil
        arFeriados.push(new Date(ano,9,12,0,0,0,0));//Nossa Senhora Aparecida
        arFeriados.push(new Date(ano,10,2,0,0,0,0));//Finados
        arFeriados.push(new Date(ano,10,15,0,0,0,0));//Proclamação da República
        arFeriados.push(new Date(ano,10,20,0,0,0,0));//Dia da Consciência Negra
        arFeriados.push(new Date(ano,11,25,0,0,0,0));//Natal
                
        //FERIADOS MÓVEIS BRASILEIROS
        var domingoDePascoa = this.getEasterSunday();
        var sextaFeiraSanta = domingoDePascoa.addDays(-2);
        var carnaval = domingoDePascoa.addDays(-47);
        var quartaFeiraDeCinzas = domingoDePascoa.addDays(-46);
        var corpusChristi = domingoDePascoa.addDays(60);

        //DESCOMENTE ABAIXO PARA ADICIONAR OS PONTOS FACULTATIVOS MÓVEIS
        //Carnaval, Quarta-feira de Cinzas e Corpus Christi
        arFeriados.push(carnaval); //Ponto facultativo móvel - Carnaval
        //arFeriados.push(quartaFeiraDeCinzas); //Feriado móvel - Quarta-feira de Cinzas
        arFeriados.push(sextaFeiraSanta); //Ponto facultativo móvel - Sexta-feira Santa
        arFeriados.push(corpusChristi); //Ponto facultativo móvel - Corpus Christi

        //FERIADOS REGIONAIS, DESCOMENTE ALGUNS FERIADOS ABAIXO OU ADICIONE UM NOVO FERIADO DE SUA PREFERÊNCIA
        var arFeriadosReg = [];
        
        //AC - Rio Branco
        //arFeriadosReg.push(new Date(ano,0,20,0,0,0,0));//Dia do Católico
        //arFeriadosReg.push(new Date(ano,5,15,0,0,0,0));//Aniversário do Acre
        //arFeriadosReg.push(new Date(ano,8,6,0,0,0,0));//Dia da Amazônia

        //AL - Maceió
        //arFeriadosReg.push(new Date(ano,10,30,0,0,0,0));//Dia do Evangélico
        //arFeriadosReg.push(new Date(ano,11,8,0,0,0,0));//Nossa Senhora da Conceição
        //arFeriadosReg.push(new Date(ano,8,16,0,0,0,0));//Emancipação de Alagoas
        //arFeriadosReg.push(new Date(ano,7,27,0,0,0,0));//Padroeira de Maceió
        //arFeriadosReg.push(new Date(ano,05,29,0,0,0,0));//Dia de São Pedro
        //arFeriadosReg.push(new Date(ano,05,24,0,0,0,0));//Dia de São João 

        //AM - Manaus
        //arFeriadosReg.push(new Date(ano,9,24,0,0,0,0));//Aniversário da cidade de Manaus
        //arFeriadosReg.push(new Date(ano,8,5,0,0,0,0));//Aniversário do Amazonas

        //AP - Macapá
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //BA - Salvador
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //CE - Fortaleza
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //DF - Brasília
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //ES - Vitória
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //GO - Goiânia
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //MA - São Luís
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //MG - Belo Horizonte
        //arFeriadosReg.push(new Date(ano,7,15,0,0,0,0));//Dia da Assunção de Nossa Senhora
        //arFeriadosReg.push(new Date(ano,11,8,0,0,0,0));//Imaculada Conceição

        //MS - Campo Grande
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //MT - Cuiabá
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //PA - Belém
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //PB - João Pessoa
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //PE - Recife
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //PI - Teresina
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //PR - Curitiba
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //RJ - Rio de Janeiro
        //arFeriadosReg.push(new Date(ano,0,20,0,0,0,0));//Dia de São Sebastião, Padroeiro da cidade
        //arFeriadosReg.push(new Date(ano,3,23,0,0,0,0));//Dia de São Jorge

        //RN - Natal
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //RS - Porto Alegre
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //RO - Porto Velho
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //RR - Boa Vista
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //SC - Florianópolis
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //SP - São Paulo
        //arFeriadosReg.push(new Date(ano,0,25,0,0,0,0));//Aniversário da cidade de São Paulo

        //SE - Aracaju
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        //TO - Palmas
        //arFeriadosReg.push(new Date(ano,MES,DIA,0,0,0,0));//___________

        for(var idxFerBra = 0; idxFerBra < arFeriadosReg.length; idxFerBra++){
            arFeriados.push(arFeriadosReg[arFeriadosReg]);
        }

        return arFeriados;
    };
}

/**
 * Indica se a data é um dia útil, compara com fins de semana e com a lista de feriados móveis e fixos retornados pela função holidays().
 * Caso precise alterar os feriados, modifique a lista de datas de feriados na função holidays().
 */
if (!Date.prototype.isUsefulDay) {
    Date.prototype.isUsefulDay = function () {
        //Verifica se o dia da semana é domingo (0) ou sábado (6)
        if(this.getDay()===0 || this.getDay()===6)
            return false;

        var arFeriados = this.holidays();

        //Trunca as horas da data e compara com a lista de feriados
        var dtTemp = this.truncTime();

        for(var idx = 0; idx < arFeriados.length; idx++){
            if(arFeriados[idx].getTime() === dtTemp.getTime())
                return false;
        }

        return true;
    };
}
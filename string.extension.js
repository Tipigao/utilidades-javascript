
//Para navegadores que não tem a função trim()
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

// Retirado de https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.prototype.format) {
    String.prototype.format = function () {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
}

if (!String.prototype.toTitleCase) {
    String.prototype.toTitleCase = function () {
        let str = this;
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
}

//Retirado de https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * 
     * O método splice () altera o conteúdo de uma string removendo um
     * intervalo de caracteres e / ou adicionando novos caracteres.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

//Retirado de https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
if (!String.prototype.insert) {
    String.prototype.insert = function (index, string) {
        if (index > 0){
            return this.substring(0, index) + string + this.substring(index, this.length);
        }
        return string + this;
    };
}

/**
 * Retorna o percentual de um valor total em uma cadeia de caracteres.
 * "10".percentOf(250) = 25
 * "50".percentOf(80) = 40
 * "1".percentOf(100) = 1
 */
if (!String.prototype.percentOf) {
    String.prototype.percentOf = function (totalValue) {
        let vlPercent = (totalValue * parseFloat(this.replace('%', ''))) / 100;
        return vlPercent;
    };
}

if(!String.prototype.removeAcentos) {
    String.prototype.removeAcentos = (text) => {
      const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧÀÁÄÂÃÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇßŸŒÆŔŚŃṔẂǴǸḾǗẌŹḦ';
      const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzhAAAAAEEEEIIIIOOOOUUUUNCSYOARSNPWGNMUXZH';
      const p = new RegExp(a.split('').join('|'), 'g');
      return text.toString()
        .replace(p, c => b.charAt(a.indexOf(c)));
    }
}

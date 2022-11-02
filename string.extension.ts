/**
 * Criando extensões no Angular
 * Retirado e adaptado de https://www.oodlestechnologies.com/blogs/Extending-Native-JavaScript-Prototypes-In-Angular/
 */
export { }

declare global {
    interface String {
        removeAcentos(): string;
        toTitleCase(): string;
        splice(start, delCount, newSubStr): string;
        insert(index, string): string;
        percentualDe(valor: number): number;
    }
}

/**
 * Remover acentos em cadeias de caracteres com javascript
 * Retirado e adaptado de https://pt.stackoverflow.com/questions/237762/remover-acentos-javascript
 */
if (!String.prototype.removeAcentos) {
    String.prototype.removeAcentos = function () {
        return this.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
}

/**
 * Função trim() para navegadores que não tem a função trim()
 */
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

/**
 * Retorna uma cadeia de caracteres com a primeira letra maiúscula
 */
if (!String.prototype.toTitleCase) {
    String.prototype.toTitleCase = function () {
        let str = this;
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
}

/**
 * Altera o conteúdo de uma cadeia de caracteres removendo um intervalo de caracteres e/ou adicionando novos caracteres.
 * Retirado de https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
 */
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
    String.prototype.splice = function (start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

/**
 * Insere uma cadeia de caracteres em um índice específico de uma outra cadeia de caracteres.
 * Retirado de https://stackoverflow.com/questions/4313841/insert-a-string-at-a-specific-index
 */
if (!String.prototype.insert) {
    String.prototype.insert = function (index, string) {
        if (index > 0) {
            return this.substring(0, index) + string + this.substring(index, this.length);
        }
        return string + this;
    };
}

/**
 * Retorna o percentual de um valor total em uma cadeia de caracteres.
 * "10".percentualDe(250) = 25
 * "50".percentualDe(80) = 40
 * "1".percentualDe(100) = 1
 */
if (!String.prototype.percentualDe) {
    String.prototype.percentualDe = function (totalValue: number) {
        let vlPercent = (totalValue * parseFloat(this.replace('%', ''))) / 100;
        return vlPercent;
    };
}

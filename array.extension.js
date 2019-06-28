/*!
 * Retirado de https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

if (!Array.prototype.distinct) {
    Array.prototype.distinct = function(value, index, self) {
      return this.filter( function(value, index, self) { 
        return self.indexOf(value) === index;
      });
    }
  }
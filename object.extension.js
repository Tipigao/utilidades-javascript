function topMax() {
    var docTopo = window;
    while (docTopo.top !== docTopo)
        docTopo = docTopo.top;
    return docTopo;
}

function localStorageKB() {
    var allStrings = '';

    for (var key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
        }
    }

    return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 0;
}

//Função que inclui um novo arquivo js na página sem verificar se ele já foi incluído
function include(arquivo) {
    var novoArquivoJS = document.createElement('script');
    novoArquivoJS.setAttribute('type', 'text/javascript');
    novoArquivoJS.setAttribute('src', arquivo);
    document.getElementsByTagName('head')[0].appendChild(novoArquivoJS);

}


function uniqID(idlength) {
    idlength = idlength === undefined || idlength === null ? 20 : idlength;
    var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!idlength) {
        idlength = Math.floor(Math.random() * charstoformid.length);
    }
    var uniqid = '';
    for (var i = 0; i < idlength; i++) {
        uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
    }
    if (jQuery("#" + uniqid).length === 0)
        return uniqid;
    else
        return uniqID(20);
}

var Uint8ToString = function (u8a) {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
};

var arrayBufferToBase64 = function (buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};


function resizeIFrameToFitContent (iFrame) {
    var oBody = iFrame.contentWindow.document.body;
    var oHtml = iFrame.contentWindow.document.documentElement;
    var heightIfrm = Math.max(oBody.scrollHeight, oBody.offsetHeight, oHtml.clientHeight, oHtml.scrollHeight, oHtml.offsetHeight);

    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = heightIfrm;
}

function fitToParent (obj) {
    var oBody = document.body;
    var oHtml = document.documentElement;
    var heightIfrm = Math.max(oBody.scrollHeight, oBody.offsetHeight, oHtml.clientHeight, oHtml.scrollHeight, oHtml.offsetHeight);

    obj.width = document.body.scrollWidth;
    obj.height = heightIfrm;
}


function loadScript(caminhoRelativo, callback) {

    caminhoRelativo = "/" + caminhoRelativo.replace(/^\//, "");//Remove a barra inicial caso exista para adicioná-la novamente, melhor que checar com "IF"

    var script = document.createElement('script');
    script.src = location.origin + caminhoRelativo;
    script.onload = callback;
    document.head.appendChild(script);
}

function loadStyle(caminhoRelativo, callback) {

    caminhoRelativo = "/" + caminhoRelativo.replace(/^\//, "");//Remove a barra inicial caso exista para adicioná-la novamente, melhor que checar com "IF"

    var css = document.createElement('link');
    css.type = "text/css";
    css.media = "screen";
    css.rel = "stylesheet";
    css.href = location.origin + caminhoRelativo;
    css.onload = callback;
    document.head.appendChild(css);
}

/*!
 * Retirado de https://gist.github.com/cowboy/742952
 * jQuery htmlDoc "fixer" - v0.2pre - 8/8/2011
 * http://benalman.com/projects/jquery-misc-plugins/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function ($) {
    // RegExp that matches opening and closing browser-stripped tags.
    // $1 = slash, $2 = tag name, $3 = attributes
    var matchTag = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/ig;
    // Unique id prefix for selecting placeholder elements.
    var prefix = 'hd' + +new Date;
    // A node under which a temporary DOM tree can be constructed.
    var parent;

    $.htmlDoc = function (html) {
        // A collection of "intended" elements that can't be rendered cross-browser
        // with .innerHTML, for which placeholders must be swapped.
        var elems = $();
        // Input HTML string, parsed to include placeholder DIVs. Replace HTML,
        // HEAD, BODY tags with DIV placeholders.
        var htmlParsed = html.replace(matchTag, function (tag, slash, name, attrs) {
            // Temporary object in which to hold attributes.
            var obj = {};
            // If this is an opening tag...
            if (!slash) {
                // Add an element of this name into the collection of elements. Note
                // that if a string of attributes is added at this point, it fails.
                elems = elems.add('<' + name + '/>');
                // If the original tag had attributes, create a temporary div with
                // those attributes. Then, copy each attribute from the temporary div
                // over to the temporary object.
                if (attrs) {
                    $.each($('<div' + attrs + '/>')[0].attributes, function (i, attr) {
                        obj[attr.name] = attr.value;
                    });
                }
                // Set the attributes of the intended object based on the attributes
                // copied in the previous step.
                elems.eq(-1).attr(obj);
            }
            // A placeholder div with a unique id replaces the intended element's
            // tag in the parsed HTML string.
            return '<' + slash + 'div'
                + (slash ? '' : ' id="' + prefix + (elems.length - 1) + '"') + '>';
        });

        // If no placeholder elements were necessary, just return normal
        // jQuery-parsed HTML.
        if (!elems.length) {
            return $(html);
        }
        // Create parent node if it hasn't been created yet.
        if (!parent) {
            parent = $('<div/>');
        }
        // Create the parent node and append the parsed, place-held HTML.
        parent.html(htmlParsed);
        // Replace each placeholder element with its intended element.
        $.each(elems, function (i) {
            var elem = parent.find('#' + prefix + i).before(elems[i]);
            elems.eq(i).html(elem.contents());
            elem.remove();
        });
        // Return the topmost intended element(s), sans text nodes, while removing
        // them from the parent element with unwrap.
        return parent.children().unwrap();
    };

}(jQuery));

var Base64 = {
    encode: function (e) {
        return $.base64.encode(e);
    },
    decode: function (e) {
        return $.base64.decode(e);
    },
    //Fonte: https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
    decodeToArrayBuffer: function (base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
};

/*jslint adsafe: false, bitwise: true, browser: true, cap: false, css: false,
  debug: false, devel: true, eqeqeq: true, es5: false, evil: false,
  forin: false, fragment: false, immed: true, laxbreak: false, newcap: true,
  nomen: false, on: false, onevar: true, passfail: false, plusplus: true,
  regexp: false, rhino: true, safe: false, strict: false, sub: false,
  undef: true, white: false, widget: false, windows: false */
/*global jQuery: false, window: false */
//"use strict";

/*
 * Original code (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 *
 * jQuery port (c) 2010 Carlo Zottmann
 * http://github.com/carlo/jquery-base64
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

/* base64 encode/decode compatible with window.btoa/atob
 *
 * window.atob/btoa is a Firefox extension to convert binary data (the "b")
 * to base64 (ascii, the "a").
 *
 * It is also found in Safari and Chrome.  It is not available in IE.
 *
 * if (!window.btoa) window.btoa = $.base64.encode
 * if (!window.atob) window.atob = $.base64.decode
 *
 * The original spec's for atob/btoa are a bit lacking
 * https://developer.mozilla.org/en/DOM/window.atob
 * https://developer.mozilla.org/en/DOM/window.btoa
 *
 * window.btoa and $.base64.encode takes a string where charCodeAt is [0,255]
 * If any character is not [0,255], then an exception is thrown.
 *
 * window.atob and $.base64.decode take a base64-encoded string
 * If the input length is not a multiple of 4, or contains invalid characters
 *   then an exception is thrown.
 */

jQuery.base64 = (function ($) {

    var _PADCHAR = "=",
        _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        _VERSION = "1.0";


    function _getbyte64(s, i) {
        // This is oddly fast, except on Chrome/V8.
        // Minimal or no improvement in performance by using a
        // object with properties mapping chars to value (eg. 'A': 0)

        var idx = _ALPHA.indexOf(s.charAt(i));

        if (idx === -1) {
            throw "Cannot decode base64";
        }

        return idx;
    }


    function _decode(s) {
        var pads = 0,
            i,
            b10,
            imax = s.length,
            x = [];

        s = String(s);

        if (imax === 0) {
            return s;
        }

        if (imax % 4 !== 0) {
            throw "Cannot decode base64";
        }

        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;

            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2;
            }

            // either way, we want to ignore this last block
            imax -= 4;
        }

        for (i = 0; i < imax; i += 4) {
            b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
        }

        switch (pads) {
            case 1:
                b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12) | (_getbyte64(s, i + 2) << 6);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
                break;

            case 2:
                b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }

        return x.join("");
    }


    function _getbyte(s, i) {
        var x = s.charCodeAt(i);

        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }

        return x;
    }


    function _encode(s) {
        if (arguments.length !== 1) {
            throw "SyntaxError: exactly one argument required";
        }

        s = String(s);

        var i,
            b10,
            x = [],
            imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }

        for (i = 0; i < imax; i += 3) {
            b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt((b10 >> 12) & 0x3F));
            x.push(_ALPHA.charAt((b10 >> 6) & 0x3f));
            x.push(_ALPHA.charAt(b10 & 0x3f));
        }

        switch (s.length - imax) {
            case 1:
                b10 = _getbyte(s, i) << 16;
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _PADCHAR + _PADCHAR);
                break;

            case 2:
                b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 0x3F) + _ALPHA.charAt((b10 >> 6) & 0x3f) + _PADCHAR);
                break;
        }

        return x.join("");
    }


    return {
        decode: _decode,
        encode: _encode,
        VERSION: _VERSION
    };

}(jQuery));
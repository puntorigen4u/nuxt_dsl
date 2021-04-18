String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

String.prototype.contains = function(test) {
    if (this.indexOf(test) != -1) {
        return true;
    } else {
        return false;
    }
};

const util = require('util');
let custom = function(depth,opt){
    var self = this.value;
    var sp = '  ';
    return '{ ' + Object.keys(self).reduce( function(str,key){
        if( key===util.inspect.custom && typeof self[key]==='function' ) return str ;
        let no_quote=(typeof self[key] === 'string' && (self[key].contains(`'`) || self[key].contains(`new `) || self[key]=='true' || self[key]=='false'))?true:false;
        if (typeof self[key] === 'string') {
            //console.log(`typeof string (${self[key]}): ${typeof self[key]}`);
            if (key.indexOf(`-`)!=-1) key = `'${key}'`;
            if (no_quote) {
                return str+(str?',\n'+sp.repeat(depth+1):'')+key+': '+self[key];
            } else {
                return str+(str?',\n'+sp.repeat(depth+1):'')+key+': \''+self[key]+'\'';
            }
        } else if (Array.isArray(self[key])) {
            console.log('ARRAY!');
            let x = '';
            if (self[key].length!=0) x = util.inspect(new escape(self[key]),opt);
            let espacio = (str?',\n'+sp.repeat(depth+1):'');
            return str+espacio+key+`: [${x}]`;
        } else {
            let x = util.inspect(new escape(self[key]),opt);
            //console.log('typeof *no string (key:'+key+'):'+typeof self[key],x);
            let key2 = key;
            if (key2.contains(`-`)) key2 = `'${key}'`;
            //self[key].constructor.prototype[util.inspect.custom]=custom;
            return str+(str?',\n'+sp.repeat(depth+1):'')+key2+': '+x;
        }
    }, '') + ' }'
}

export default class escape {

	constructor(value) {
        this.value = value;
        this[util.inspect.custom] = custom;
    }
}


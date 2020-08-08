(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('concepto')) :
	typeof define === 'function' && define.amd ? define(['concepto'], factory) :
	(global.vue_dsl = factory(global.concepto));
}(this, (function (concepto) {

	concepto = concepto && concepto.hasOwnProperty('default') ? concepto['default'] : concepto;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _addToUnscopables = function () { /* empty */ };

	var _addToUnscopables$1 = /*#__PURE__*/Object.freeze({
		default: _addToUnscopables,
		__moduleExports: _addToUnscopables
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterStep$1 = /*#__PURE__*/Object.freeze({
		default: _iterStep,
		__moduleExports: _iterStep
	});

	var _iterators = {};

	var _iterators$1 = /*#__PURE__*/Object.freeze({
		default: _iterators,
		__moduleExports: _iterators
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var cof = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	var _library = true;

	var _library$1 = /*#__PURE__*/Object.freeze({
		default: _library,
		__moduleExports: _library
	});

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = /*#__PURE__*/Object.freeze({
		default: _global,
		__moduleExports: _global
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _core$1 = /*#__PURE__*/Object.freeze({
		default: _core,
		__moduleExports: _core,
		version: _core_1
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$1 = /*#__PURE__*/Object.freeze({
		default: _aFunction,
		__moduleExports: _aFunction
	});

	var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _ctx$1 = /*#__PURE__*/Object.freeze({
		default: _ctx,
		__moduleExports: _ctx
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$1 = /*#__PURE__*/Object.freeze({
		default: _isObject,
		__moduleExports: _isObject
	});

	var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

	var _anObject = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$1 = /*#__PURE__*/Object.freeze({
		default: _anObject,
		__moduleExports: _anObject
	});

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$1 = /*#__PURE__*/Object.freeze({
		default: _fails,
		__moduleExports: _fails
	});

	var require$$1 = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !require$$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var global$1 = ( _global$1 && _global ) || _global$1;

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document$1) && isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var require$$0 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !require$$0 && !require$$1(function () {
	  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine,
		__moduleExports: _ie8DomDefine
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive,
		__moduleExports: _toPrimitive
	});

	var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

	var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

	var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

	var dP = Object.defineProperty;

	var f = require$$0 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _objectDp$1 = /*#__PURE__*/Object.freeze({
		default: _objectDp,
		__moduleExports: _objectDp,
		f: f
	});

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc,
		__moduleExports: _propertyDesc
	});

	var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var descriptor = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = require$$0 ? function (object, key, value) {
	  return dP$1.f(object, key, descriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var core = ( _core$1 && _core ) || _core$1;

	var require$$0$1 = ( _ctx$1 && _ctx ) || _ctx$1;

	var require$$0$2 = ( _hide$1 && _hide ) || _hide$1;

	var has = ( _has$1 && _has ) || _has$1;

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? require$$0$1(out, global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? require$$0$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) require$$0$2(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _export$1 = /*#__PURE__*/Object.freeze({
		default: _export,
		__moduleExports: _export
	});

	var _redefine = require$$0$2;

	var _redefine$1 = /*#__PURE__*/Object.freeze({
		default: _redefine,
		__moduleExports: _redefine
	});

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var SHARED = '__core-js_shared__';
	var store = global$1[SHARED] || (global$1[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var require$$0$3 = ( _shared$1 && _shared ) || _shared$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var shared = require$$0$3('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var require$$0$4 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var require$$1$1 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	var arrayIndexOf = require$$0$4(false);
	var IE_PROTO = require$$1$1('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var require$$0$5 = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, require$$0$5);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var _objectDps = require$$0 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP$1.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _objectDps$1 = /*#__PURE__*/Object.freeze({
		default: _objectDps,
		__moduleExports: _objectDps
	});

	var document$2 = global$1.document;
	var _html = document$2 && document$2.documentElement;

	var _html$1 = /*#__PURE__*/Object.freeze({
		default: _html,
		__moduleExports: _html
	});

	var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

	var require$$2$1 = ( _html$1 && _html ) || _html$1;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = require$$1$1('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = require$$2('iframe');
	  var i = require$$0$5.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  require$$2$1.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][require$$0$5[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectCreate$1 = /*#__PURE__*/Object.freeze({
		default: _objectCreate,
		__moduleExports: _objectCreate
	});

	var _wks = createCommonjsModule(function (module) {
	var store = require$$0$3('wks');

	var Symbol = global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = /*#__PURE__*/Object.freeze({
		default: _wks,
		__moduleExports: _wks
	});

	var require$$1$2 = ( _wks$1 && _wks ) || _wks$1;

	var def = dP$1.f;

	var TAG = require$$1$2('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
		default: _setToStringTag,
		__moduleExports: _setToStringTag
	});

	var create = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

	var setToStringTag = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require$$0$2(IteratorPrototype, require$$1$2('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

	var _iterCreate$1 = /*#__PURE__*/Object.freeze({
		default: _iterCreate,
		__moduleExports: _iterCreate
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = require$$1$1('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var _objectGpo$1 = /*#__PURE__*/Object.freeze({
		default: _objectGpo,
		__moduleExports: _objectGpo
	});

	var LIBRARY = ( _library$1 && _library ) || _library$1;

	var $export$1 = ( _export$1 && _export ) || _export$1;

	var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

	var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

	var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

	var getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

	var ITERATOR = require$$1$2('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') require$$0$2(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    require$$0$2(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterDefine$1 = /*#__PURE__*/Object.freeze({
		default: _iterDefine,
		__moduleExports: _iterDefine
	});

	var addToUnscopables = ( _addToUnscopables$1 && _addToUnscopables ) || _addToUnscopables$1;

	var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

	var require$$0$6 = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = require$$0$6(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var TO_STRING_TAG = require$$1$2('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global$1[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) require$$0$2(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _stringAt$1 = /*#__PURE__*/Object.freeze({
		default: _stringAt,
		__moduleExports: _stringAt
	});

	var require$$0$7 = ( _stringAt$1 && _stringAt ) || _stringAt$1;

	var $at = require$$0$7(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	require$$0$6(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = require$$1$2('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _classof$1 = /*#__PURE__*/Object.freeze({
		default: _classof,
		__moduleExports: _classof
	});

	var classof = ( _classof$1 && _classof ) || _classof$1;

	var ITERATOR$1 = require$$1$2('iterator');

	var core_getIteratorMethod = core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

	var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
		default: core_getIteratorMethod,
		__moduleExports: core_getIteratorMethod
	});

	var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

	var core_getIterator = core.getIterator = function (it) {
	  var iterFn = getIterFn(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

	var core_getIterator$1 = /*#__PURE__*/Object.freeze({
		default: core_getIterator,
		__moduleExports: core_getIterator
	});

	var require$$2$2 = ( core_getIterator$1 && core_getIterator ) || core_getIterator$1;

	var getIterator = require$$2$2;

	var getIterator$1 = /*#__PURE__*/Object.freeze({
		default: getIterator,
		__moduleExports: getIterator
	});

	var require$$0$8 = ( getIterator$1 && getIterator ) || getIterator$1;

	var getIterator$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$8, __esModule: true };
	});

	var _getIterator = unwrapExports(getIterator$2);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * require$$1(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var require$$0$9 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.14 Object.keys(O)



	require$$0$9('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	var keys = core.Object.keys;

	var keys$1 = /*#__PURE__*/Object.freeze({
		default: keys,
		__moduleExports: keys
	});

	var require$$0$10 = ( keys$1 && keys ) || keys$1;

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$10, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$2);

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = 'object' === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);
	});

	var runtime$1 = /*#__PURE__*/Object.freeze({
		default: runtime,
		__moduleExports: runtime
	});

	var require$$0$11 = ( runtime$1 && runtime ) || runtime$1;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	var runtimeModule = require$$0$11;

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var runtimeModule$1 = /*#__PURE__*/Object.freeze({
		default: runtimeModule,
		__moduleExports: runtimeModule
	});

	var require$$0$12 = ( runtimeModule$1 && runtimeModule ) || runtimeModule$1;

	var regenerator = require$$0$12;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$1($export$1.S + $export$1.F * !require$$0, 'Object', { defineProperty: dP$1.f });

	var $Object = core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = /*#__PURE__*/Object.freeze({
		default: defineProperty,
		__moduleExports: defineProperty
	});

	var require$$0$13 = ( defineProperty$1 && defineProperty ) || defineProperty$1;

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$13, __esModule: true };
	});

	var defineProperty$3 = unwrapExports(defineProperty$2);

	var defineProperty$4 = /*#__PURE__*/Object.freeze({
		default: defineProperty$3,
		__moduleExports: defineProperty$2
	});

	var _defineProperty = ( defineProperty$4 && defineProperty$3 ) || defineProperty$4;

	var defineProperty$5 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty$1 = unwrapExports(defineProperty$5);

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _anInstance$1 = /*#__PURE__*/Object.freeze({
		default: _anInstance,
		__moduleExports: _anInstance
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterCall$1 = /*#__PURE__*/Object.freeze({
		default: _iterCall,
		__moduleExports: _iterCall
	});

	// check on default Array iterator

	var ITERATOR$2 = require$$1$2('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR$2] === it);
	};

	var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
		default: _isArrayIter,
		__moduleExports: _isArrayIter
	});

	var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

	var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = require$$0$1(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _forOf$1 = /*#__PURE__*/Object.freeze({
		default: _forOf,
		__moduleExports: _forOf
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = require$$1$2('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

	var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _speciesConstructor,
		__moduleExports: _speciesConstructor
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var _invoke$1 = /*#__PURE__*/Object.freeze({
		default: _invoke,
		__moduleExports: _invoke
	});

	var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

	var process = global$1.process;
	var setTask = global$1.setImmediate;
	var clearTask = global$1.clearImmediate;
	var MessageChannel = global$1.MessageChannel;
	var Dispatch = global$1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(require$$0$1(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(require$$0$1(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = require$$0$1(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$1.addEventListener && typeof postMessage == 'function' && !global$1.importScripts) {
	    defer = function (id) {
	      global$1.postMessage(id + '', '*');
	    };
	    global$1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in require$$2('script')) {
	    defer = function (id) {
	      require$$2$1.appendChild(require$$2('script'))[ONREADYSTATECHANGE] = function () {
	        require$$2$1.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(require$$0$1(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var _task$1 = /*#__PURE__*/Object.freeze({
		default: _task,
		__moduleExports: _task,
		set: _task_1,
		clear: _task_2
	});

	var require$$0$14 = ( _task$1 && _task ) || _task$1;

	var macrotask = require$$0$14.set;
	var Observer = global$1.MutationObserver || global$1.WebKitMutationObserver;
	var process$1 = global$1.process;
	var Promise$1 = global$1.Promise;
	var isNode = cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$1.navigator && global$1.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    var promise = Promise$1.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$1, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _microtask$1 = /*#__PURE__*/Object.freeze({
		default: _microtask,
		__moduleExports: _microtask
	});

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	var f$1 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$1
	};

	var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
		default: _newPromiseCapability,
		__moduleExports: _newPromiseCapability,
		f: f$1
	});

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _perform$1 = /*#__PURE__*/Object.freeze({
		default: _perform,
		__moduleExports: _perform
	});

	var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

	var _promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
		default: _promiseResolve,
		__moduleExports: _promiseResolve
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else require$$0$2(target, key, src[key]);
	  } return target;
	};

	var _redefineAll$1 = /*#__PURE__*/Object.freeze({
		default: _redefineAll,
		__moduleExports: _redefineAll
	});

	var SPECIES$1 = require$$1$2('species');

	var _setSpecies = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global$1[KEY];
	  if (require$$0 && C && !C[SPECIES$1]) dP$1.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _setSpecies$1 = /*#__PURE__*/Object.freeze({
		default: _setSpecies,
		__moduleExports: _setSpecies
	});

	var ITERATOR$3 = require$$1$2('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var _iterDetect$1 = /*#__PURE__*/Object.freeze({
		default: _iterDetect,
		__moduleExports: _iterDetect
	});

	var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

	var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

	var speciesConstructor = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

	var require$$1$3 = ( _microtask$1 && _microtask ) || _microtask$1;

	var perform = ( _perform$1 && _perform ) || _perform$1;

	var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

	var require$$3 = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

	var require$$5 = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

	var require$$7 = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

	var task = require$$0$14.set;
	var microtask = require$$1$3();



	var PROMISE = 'Promise';
	var TypeError$1 = global$1.TypeError;
	var process$2 = global$1.process;
	var $Promise = global$1[PROMISE];
	var isNode$1 = classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[require$$1$2('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = global$1.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global$1.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = global$1.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, require$$0$1($resolve, wrapper, 1), require$$0$1($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(require$$0$1($resolve, this, 1), require$$0$1($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = require$$3($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = require$$0$1($resolve, promise, 1);
	    this.reject = require$$0$1($reject, promise, 1);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Promise: $Promise });
	setToStringTag($Promise, PROMISE);
	require$$5(PROMISE);
	Wrapper = core[PROMISE];

	// statics
	$export$1($export$1.S + $export$1.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$1($export$1.S + $export$1.F * !(USE_NATIVE && require$$7(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	$export$1($export$1.P + $export$1.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global$1.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	$export$1($export$1.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = core.Promise;

	var promise$1 = /*#__PURE__*/Object.freeze({
		default: promise,
		__moduleExports: promise
	});

	var require$$0$15 = ( promise$1 && promise ) || promise$1;

	var promise$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$15, __esModule: true };
	});

	var promise$3 = unwrapExports(promise$2);

	var promise$4 = /*#__PURE__*/Object.freeze({
		default: promise$3,
		__moduleExports: promise$2
	});

	var _promise = ( promise$4 && promise$3 ) || promise$4;

	var asyncToGenerator = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};
	});

	var _asyncToGenerator = unwrapExports(asyncToGenerator);

	// 19.1.2.9 Object.getPrototypeOf(O)



	require$$0$9('getPrototypeOf', function () {
	  return function getPrototypeOf$$1(it) {
	    return getPrototypeOf(toObject(it));
	  };
	});

	var getPrototypeOf$1 = core.Object.getPrototypeOf;

	var getPrototypeOf$2 = /*#__PURE__*/Object.freeze({
		default: getPrototypeOf$1,
		__moduleExports: getPrototypeOf$1
	});

	var require$$0$16 = ( getPrototypeOf$2 && getPrototypeOf$1 ) || getPrototypeOf$2;

	var getPrototypeOf$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$16, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$3);

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$2
	});

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$3
	});

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || require$$1(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var require$$0$17 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	// 19.1.3.1 Object.assign(target, source)


	$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$17 });

	var assign = core.Object.assign;

	var assign$1 = /*#__PURE__*/Object.freeze({
		default: assign,
		__moduleExports: assign
	});

	var require$$0$18 = ( assign$1 && assign ) || assign$1;

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$18, __esModule: true };
	});

	var assign$3 = unwrapExports(assign$2);

	var assign$4 = /*#__PURE__*/Object.freeze({
		default: assign$3,
		__moduleExports: assign$2
	});

	var _assign = ( assign$4 && assign$3 ) || assign$4;

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = unwrapExports(_extends);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	var f$4 = require$$1$2;

	var _wksExt = {
		f: f$4
	};

	var _wksExt$1 = /*#__PURE__*/Object.freeze({
		default: _wksExt,
		__moduleExports: _wksExt,
		f: f$4
	});

	var wksExt = ( _wksExt$1 && _wksExt ) || _wksExt$1;

	var iterator = wksExt.f('iterator');

	var iterator$1 = /*#__PURE__*/Object.freeze({
		default: iterator,
		__moduleExports: iterator
	});

	var require$$0$19 = ( iterator$1 && iterator ) || iterator$1;

	var iterator$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$19, __esModule: true };
	});

	var iterator$3 = unwrapExports(iterator$2);

	var iterator$4 = /*#__PURE__*/Object.freeze({
		default: iterator$3,
		__moduleExports: iterator$2
	});

	var _meta = createCommonjsModule(function (module) {
	var META = uid('meta');


	var setDesc = dP$1.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !require$$1(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _meta$1 = /*#__PURE__*/Object.freeze({
		default: _meta,
		__moduleExports: _meta,
		KEY: _meta_1,
		NEED: _meta_2,
		fastKey: _meta_3,
		getWeak: _meta_4,
		onFreeze: _meta_5
	});

	var defineProperty$6 = dP$1.f;
	var _wksDefine = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global$1.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$6($Symbol, name, { value: wksExt.f(name) });
	};

	var _wksDefine$1 = /*#__PURE__*/Object.freeze({
		default: _wksDefine,
		__moduleExports: _wksDefine
	});

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var _enumKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumKeys,
		__moduleExports: _enumKeys
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

	var _isArray$1 = /*#__PURE__*/Object.freeze({
		default: _isArray,
		__moduleExports: _isArray
	});

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = require$$0$5.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	var _objectGopn$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopn,
		__moduleExports: _objectGopn,
		f: f$5
	});

	var require$$0$20 = ( _objectGopn$1 && _objectGopn ) || _objectGopn$1;

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = require$$0$20.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	var _objectGopnExt$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopnExt,
		__moduleExports: _objectGopnExt,
		f: f$6
	});

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$7 = require$$0 ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return descriptor(!pIE.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$7
	};

	var _objectGopd$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopd,
		__moduleExports: _objectGopd,
		f: f$7
	});

	var require$$0$21 = ( _meta$1 && _meta ) || _meta$1;

	var require$$0$22 = ( _wksDefine$1 && _wksDefine ) || _wksDefine$1;

	var enumKeys = ( _enumKeys$1 && _enumKeys ) || _enumKeys$1;

	var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

	var gOPNExt = ( _objectGopnExt$1 && _objectGopnExt ) || _objectGopnExt$1;

	var require$$1$4 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

	// ECMAScript 6 symbols shim





	var META = require$$0$21.KEY;



















	var gOPD$1 = require$$1$4.f;
	var dP$2 = dP$1.f;
	var gOPN$1 = gOPNExt.f;
	var $Symbol = global$1.Symbol;
	var $JSON = global$1.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = require$$1$2('_hidden');
	var TO_PRIMITIVE = require$$1$2('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = require$$0$3('symbol-registry');
	var AllSymbols = require$$0$3('symbols');
	var OPSymbols = require$$0$3('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function';
	var QObject = global$1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = require$$0 && require$$1(function () {
	  return create(dP$2({}, 'a', {
	    get: function () { return dP$2(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$2(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$2(ObjectProto$1, key, protoDesc);
	} : dP$2;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP$2(it, HIDDEN, descriptor(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = create(D, { enumerable: descriptor(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$2(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create$$1(it, P) {
	  return P === undefined ? create(it) : $defineProperties(create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto$1 && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, descriptor(1, value));
	    };
	    if (require$$0 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  require$$1$4.f = $getOwnPropertyDescriptor;
	  dP$1.f = $defineProperty;
	  require$$0$20.f = gOPNExt.f = $getOwnPropertyNames;
	  pIE.f = $propertyIsEnumerable;
	  gOPS.f = $getOwnPropertySymbols;

	  if (require$$0 && !LIBRARY) {
	    redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(require$$1$2(name));
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)require$$1$2(es6Symbols[j++]);

	for (var wellKnownSymbols = getKeys(require$$1$2.store), k = 0; wellKnownSymbols.length > k;) require$$0$22(wellKnownSymbols[k++]);

	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$1($export$1.S + $export$1.F * (!USE_NATIVE$1 || require$$1(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || require$$0$2($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global$1.JSON, 'JSON', true);

	require$$0$22('asyncIterator');

	require$$0$22('observable');

	var symbol = core.Symbol;

	var symbol$1 = /*#__PURE__*/Object.freeze({
		default: symbol,
		__moduleExports: symbol
	});

	var require$$0$23 = ( symbol$1 && symbol ) || symbol$1;

	var symbol$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$23, __esModule: true };
	});

	var symbol$3 = unwrapExports(symbol$2);

	var symbol$4 = /*#__PURE__*/Object.freeze({
		default: symbol$3,
		__moduleExports: symbol$2
	});

	var _iterator = ( iterator$4 && iterator$3 ) || iterator$4;

	var _symbol = ( symbol$4 && symbol$3 ) || symbol$4;

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(_iterator);



	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	var _typeof$1 = /*#__PURE__*/Object.freeze({
		default: _typeof,
		__moduleExports: _typeof_1
	});

	var _typeof2 = ( _typeof$1 && _typeof ) || _typeof$1;

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = require$$0$1(Function.call, require$$1$4.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var _setProto$1 = /*#__PURE__*/Object.freeze({
		default: _setProto,
		__moduleExports: _setProto,
		set: _setProto_1,
		check: _setProto_2
	});

	var require$$0$24 = ( _setProto$1 && _setProto ) || _setProto$1;

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	$export$1($export$1.S, 'Object', { setPrototypeOf: require$$0$24.set });

	var setPrototypeOf = core.Object.setPrototypeOf;

	var setPrototypeOf$1 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf,
		__moduleExports: setPrototypeOf
	});

	var require$$0$25 = ( setPrototypeOf$1 && setPrototypeOf ) || setPrototypeOf$1;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$25, __esModule: true };
	});

	var setPrototypeOf$3 = unwrapExports(setPrototypeOf$2);

	var setPrototypeOf$4 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf$3,
		__moduleExports: setPrototypeOf$2
	});

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$1($export$1.S, 'Object', { create: create });

	var $Object$1 = core.Object;
	var create$1 = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$2 = /*#__PURE__*/Object.freeze({
		default: create$1,
		__moduleExports: create$1
	});

	var require$$0$26 = ( create$2 && create$1 ) || create$2;

	var create$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$26, __esModule: true };
	});

	var create$4 = unwrapExports(create$3);

	var create$5 = /*#__PURE__*/Object.freeze({
		default: create$4,
		__moduleExports: create$3
	});

	var _setPrototypeOf = ( setPrototypeOf$4 && setPrototypeOf$3 ) || setPrototypeOf$4;

	var _create = ( create$5 && create$4 ) || create$5;

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);



	var _create2 = _interopRequireDefault(_create);



	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	var internal_commands = (function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(context) {
			var state, null_template;
			return regenerator.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							state = context.x_state;
							null_template = { hint: 'Allowed node type that must be ommited',
								func: function () {
									var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(node) {
										return regenerator.wrap(function _callee$(_context) {
											while (1) {
												switch (_context.prev = _context.next) {
													case 0:
														return _context.abrupt('return', context.reply_template({ hasChildren: false }));

													case 1:
													case 'end':
														return _context.stop();
												}
											}
										}, _callee, this);
									}));

									function func(_x2) {
										return _ref2.apply(this, arguments);
									}

									return func;
								}()
							};
							/*
	      //special node names you can define:
	      'not_found': {
	      	//executed when no there was no matching command for a node.
	      	func: async function(node) {
	      		return me.reply_template();
	      	}
	      }
	      	full node example:
	      'def_otro': {
	      	x_priority: 'lowest,last,highest,first',
	      	x_icons: 'cancel,desktop_new,idea,..',
	      	x_not_icons: '',
	      	x_not_empty: 'attribute[name]',
	      	x_not_text_contains: '',
	      	x_empty: '',
	      	x_text_contains: '',
	      	x_level: '2,>2,<5,..',
	      	x_all_hasparent: 'def_padre_otro',
	      	x_or_hasparent: '',
	      	x_or_isparent: '',
	      	autocomplete: {
	      		'key_text': 'otro', //activate autocomplete if the node text equals to this
	      		'key_icon': 'idea', //activate autocomplete if the node has this icon
	      		'hint': 'Testing node',
	      		'attributes': {
	      			'from': {
	      				'type': 'int',
	      				'description': 'If defined, sets the start offset for the node. (example)'
	      			}
	      		}
	      	},
	      	func: async function(node) {
	      		let resp = me.reply_template();
	      		return resp;
	      	}
	      }
	      */

							return _context5.abrupt('return', {
								'cancel': _extends$1({}, null_template, { x_icons: 'button_cancel' }),
								'def_config': _extends$1({}, null_template, { x_icons: 'desktop_new', x_level: '2', x_text_contains: 'config' }),
								'def_modelos': _extends$1({}, null_template, { x_icons: 'desktop_new', x_level: '2', x_text_contains: 'modelos' }),
								'def_assets': _extends$1({}, null_template, { x_icons: 'desktop_new', x_level: '2', x_text_contains: 'assets' }),

								'def_server': {
									x_icons: 'desktop_new',
									x_level: '2',
									x_text_contains: 'server|servidor|api',
									hint: 'Representa a un backend integrado con funciones de express.',
									func: function () {
										var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(node) {
											var resp;
											return regenerator.wrap(function _callee2$(_context2) {
												while (1) {
													switch (_context2.prev = _context2.next) {
														case 0:
															resp = context.reply_template();

															state.npm = _extends$1({}, state.npm, { 'body_parser': '*', 'cookie-parser': '*' });
															state.central_config.static = false;
															return _context2.abrupt('return', resp);

														case 4:
														case 'end':
															return _context2.stop();
													}
												}
											}, _callee2, this);
										}));

										function func(_x3) {
											return _ref3.apply(this, arguments);
										}

										return func;
									}()
								},
								'def_path': {
									x_icons: 'list',
									x_level: '3,4',
									x_or_isparent: 'def_server',
									x_not_icons: 'button_cancel,desktop_new,help',
									hint: 'Carpeta para ubicacion de funcion de servidor',
									func: function () {
										var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(node) {
											var resp, parent_node;
											return regenerator.wrap(function _callee3$(_context3) {
												while (1) {
													switch (_context3.prev = _context3.next) {
														case 0:
															resp = context.reply_template();

															if (!(node.level == 2)) {
																_context3.next = 5;
																break;
															}

															state.current_folder = node.text;
															_context3.next = 18;
															break;

														case 5:
															_context3.t0 = node.level == 3;

															if (!_context3.t0) {
																_context3.next = 10;
																break;
															}

															_context3.next = 9;
															return context.isExactParentID(node.id, 'def_path');

														case 9:
															_context3.t0 = _context3.sent;

														case 10:
															if (!_context3.t0) {
																_context3.next = 17;
																break;
															}

															_context3.next = 13;
															return context.dsl_parser.getParentNode({ id: node.id });

														case 13:
															parent_node = _context3.sent;

															state.current_folder = parent_node.text + '/' + node.id;
															_context3.next = 18;
															break;

														case 17:
															resp.valid = false;

														case 18:
															return _context3.abrupt('return', resp);

														case 19:
														case 'end':
															return _context3.stop();
													}
												}
											}, _callee3, this);
										}));

										function func(_x4) {
											return _ref4.apply(this, arguments);
										}

										return func;
									}()
								},

								'def_imagen': {
									x_icons: 'idea',
									x_not_icons: 'button_cancel,desktop_new,help',
									x_not_empty: 'attributes[:src]',
									x_empty: '',
									x_level: '>2',
									func: function () {
										var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(node) {
											return regenerator.wrap(function _callee4$(_context4) {
												while (1) {
													switch (_context4.prev = _context4.next) {
														case 0:
															return _context4.abrupt('return', context.reply_template({ otro: 'Pablo' }));

														case 1:
														case 'end':
															return _context4.stop();
													}
												}
											}, _callee4, this);
										}));

										function func(_x5) {
											return _ref5.apply(this, arguments);
										}

										return func;
									}()
								}
							});

						case 3:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, this);
		}));

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	})();

	var vue_dsl = function (_concepto) {
		_inherits(vue_dsl, _concepto);

		function vue_dsl(file) {
			var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, vue_dsl);

			// we can get class name, from package.json name key (after its in its own project)
			var my_config = {
				class: 'vue',
				debug: true
			};
			var nuevo_config = _extends$1({}, my_config, config);
			return _possibleConstructorReturn(this, (vue_dsl.__proto__ || _Object$getPrototypeOf(vue_dsl)).call(this, file, nuevo_config)); //,...my_config
		}

		// **************************
		// methods to be auto-called
		// **************************

		//Called after init method finishes


		_createClass(vue_dsl, [{
			key: 'onInit',
			value: function () {
				var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
					var _appFolders;

					return regenerator.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									this.x_console.outT({ message: 'hello from vue', color: 'yellow' });
									// define and assign commands
									_context.next = 3;
									return this.addCommands(internal_commands);

								case 3:
									//this.debug('x_commands',this.x_commands);
									// init vue
									// set x_state defaults
									this.x_state = { plugins: {} };
									_context.next = 6;
									return this._readConfig();

								case 6:
									this.x_state.config_node = _context.sent;
									_context.next = 9;
									return this._readCentralConfig();

								case 9:
									this.x_state.central_config = _context.sent;
									_context.next = 12;
									return this._readAssets();

								case 12:
									this.x_state.assets = _context.sent;

									if (!this.x_state.central_config.componente) {
										_context.next = 19;
										break;
									}

									_context.next = 16;
									return this._appFolders({
										'components': '',
										'pages': '',
										'assets': 'assets/',
										'static': 'static/',
										'umd': 'umd/'
									});

								case 16:
									this.x_state.dirs = _context.sent;
									_context.next = 22;
									break;

								case 19:
									_context.next = 21;
									return this._appFolders((_appFolders = {
										'client': 'client/',
										'layouts': 'client/layouts/',
										'components': 'client/components/',
										'pages': 'client/pages/',
										'plugins': 'client/plugins/',
										'static': 'client/static/',
										'store': 'client/store/',
										'middleware': 'client/middleware/',
										'server': 'client/server/',
										'assets': 'client/assets/',
										'css': 'client/assets/css/'
									}, _defineProperty$1(_appFolders, 'store', 'client/store/'), _defineProperty$1(_appFolders, 'lang', 'client/lang/'), _appFolders));

								case 21:
									this.x_state.dirs = _context.sent;

								case 22:
									this.debug('app dirs', this.x_state.dirs);
									// read modelos node (virtual DB)
									_context.next = 25;
									return this._readModelos();

								case 25:
									this.x_state.models = _context.sent;
									//alias: database tables
									//this.debug('models',this.x_state.models);
									//
									this.debug('plugins info', this.x_state.plugins);

								case 27:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this);
				}));

				function onInit() {
					return _ref.apply(this, arguments);
				}

				return onInit;
			}()

			//Called after parsing nodes

		}, {
			key: 'onAfterWritten',
			value: function () {
				var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(processedNodes) {
					return regenerator.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									return _context2.abrupt('return', processedNodes);

								case 1:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, this);
				}));

				function onAfterWritten(_x2) {
					return _ref2.apply(this, arguments);
				}

				return onAfterWritten;
			}()

			//Called for defining the title of class/page by testing node.

		}, {
			key: 'onDefineTitle',
			value: function () {
				var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(node) {
					var resp, i;
					return regenerator.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									resp = node.text, i = void 0;
									_context3.t0 = regenerator.keys(node.attributes);

								case 2:
									if ((_context3.t1 = _context3.t0()).done) {
										_context3.next = 9;
										break;
									}

									i = _context3.t1.value;

									if (!['title', 'titulo'].includes(node.attributes[i])) {
										_context3.next = 7;
										break;
									}

									resp = node.attributes[i];
									return _context3.abrupt('break', 9);

								case 7:
									_context3.next = 2;
									break;

								case 9:
									return _context3.abrupt('return', resp);

								case 10:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, this);
				}));

				function onDefineTitle(_x3) {
					return _ref3.apply(this, arguments);
				}

				return onDefineTitle;
			}()

			//Called for naming filename of class/page by testing node.

		}, {
			key: 'onDefineFilename',
			value: function () {
				var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(node) {
					return regenerator.wrap(function _callee4$(_context4) {
						while (1) {
							switch (_context4.prev = _context4.next) {
								case 0:
									return _context4.abrupt('return', node.text);

								case 1:
								case 'end':
									return _context4.stop();
							}
						}
					}, _callee4, this);
				}));

				function onDefineFilename(_x4) {
					return _ref4.apply(this, arguments);
				}

				return onDefineFilename;
			}()

			//Called for naming the class/page by testing node.

		}, {
			key: 'onDefineNodeName',
			value: function () {
				var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(node) {
					return regenerator.wrap(function _callee5$(_context5) {
						while (1) {
							switch (_context5.prev = _context5.next) {
								case 0:
									return _context5.abrupt('return', node.text.replace(' ', '_'));

								case 1:
								case 'end':
									return _context5.stop();
							}
						}
					}, _callee5, this);
				}));

				function onDefineNodeName(_x5) {
					return _ref5.apply(this, arguments);
				}

				return onDefineNodeName;
			}()

			//Defines template for code given the processedNodes of writer()

		}, {
			key: 'onCompleteCodeTemplate',
			value: function () {
				var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(processedNodes) {
					return regenerator.wrap(function _callee6$(_context6) {
						while (1) {
							switch (_context6.prev = _context6.next) {
								case 0:
									return _context6.abrupt('return', processedNodes);

								case 1:
								case 'end':
									return _context6.stop();
							}
						}
					}, _callee6, this);
				}));

				function onCompleteCodeTemplate(_x6) {
					return _ref6.apply(this, arguments);
				}

				return onCompleteCodeTemplate;
			}()

			//Defines preparation steps before processing nodes.

		}, {
			key: 'onPrepare',
			value: function () {
				var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
					return regenerator.wrap(function _callee7$(_context7) {
						while (1) {
							switch (_context7.prev = _context7.next) {
								case 0:
								case 'end':
									return _context7.stop();
							}
						}
					}, _callee7, this);
				}));

				function onPrepare() {
					return _ref7.apply(this, arguments);
				}

				return onPrepare;
			}()

			//Executed when compiler founds an error processing nodes.

		}, {
			key: 'onErrors',
			value: function () {
				var _ref8 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(errors) {
					return regenerator.wrap(function _callee8$(_context8) {
						while (1) {
							switch (_context8.prev = _context8.next) {
								case 0:
								case 'end':
									return _context8.stop();
							}
						}
					}, _callee8, this);
				}));

				function onErrors(_x7) {
					return _ref8.apply(this, arguments);
				}

				return onErrors;
			}()

			//Transforms the processed nodes into files.

		}, {
			key: 'onCreateFiles',
			value: function () {
				var _ref9 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(processedNodes) {
					return regenerator.wrap(function _callee9$(_context9) {
						while (1) {
							switch (_context9.prev = _context9.next) {
								case 0:
								case 'end':
									return _context9.stop();
							}
						}
					}, _callee9, this);
				}));

				function onCreateFiles(_x8) {
					return _ref9.apply(this, arguments);
				}

				return onCreateFiles;
			}()

			//overwrites default reply structure and value for command's functions
			/*
	  reply_template(init={}) {
	  }
	  */

			// **************************
			// 	Helper Methods
			// **************************

			/*
	  * Reads the node called modelos and creates tables definitions and managing code (alias:database).
	  */

		}, {
			key: '_readModelos',
			value: function () {
				var _ref10 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10() {
					var modelos, tmp, fields_map, resp, type_map, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, table, ala_create, _table, ala_custom;

					return regenerator.wrap(function _callee10$(_context10) {
						while (1) {
							switch (_context10.prev = _context10.next) {
								case 0:
									// @IDEA this method could return the insert/update/delete/select 'function code generators'
									this.debug('_readModelos');
									this.debug_time({ id: 'readModelos' });
									_context10.next = 4;
									return this.dsl_parser.getNodes({ text: 'modelos', level: 2, icon: 'desktop_new', recurse: true });

								case 4:
									modelos = _context10.sent;
									//nodes_raw:true	
									tmp = { appname: this.x_state.config_node.name }, fields_map = {};
									resp = {
										tables: {},
										attributes: {},
										length: 0,
										doc: ''
									};
									// map our values to real database values 

									type_map = {
										id: { value: 'INT AUTOINCREMENT PRIMARY KEY', alias: ['identificador', 'autoid', 'autonum', 'key'] },
										texto: { value: 'STRING', alias: ['text', 'varchar', 'string'] },
										int: { value: 'INTEGER', alias: ['numero chico', 'small int', 'numero'] },
										float: { value: 'FLOAT', alias: ['decimal', 'real'] },
										boolean: { value: 'BOOLEAN', alias: ['boleano', 'true/false'] },
										date: { value: 'DATEONLY', alias: ['fecha'] },
										datetime: { value: 'DATETIME', alias: ['fechahora'] },
										blob: { value: 'BLOB', alias: ['binario', 'binary'] }
									};
									// expand type_map into fields_map

									_Object$keys(type_map).map(function (x) {
										var aliases = type_map[x].alias;
										aliases.push(x);
										aliases.map(function (y) {
											fields_map[y] = type_map[x].value;
										});
									});
									// parse nodes into tables with fields

									if (!(modelos.length > 0)) {
										_context10.next = 33;
										break;
									}

									modelos[0].attributes.map(function (x) {
										resp.attributes = _extends$1({}, resp.attributes, x);
									}); //modelos attributes
									resp.doc = modelos[0].text_note;
									resp.length = modelos[0].nodes.length;

									_loop = function _loop(table) {
										var fields = {};table.attributes.map(function (x) {
											fields = _extends$1({}, fields, x);
										}); //table attributes
										resp.tables[table.text] = { fields: {} }; //create table
										tmp.sql_fields = [];
										for (var field in fields) {
											resp.tables[table.text].fields[field] = fields_map[fields[field]]; //assign field with mapped value
											tmp.sql_fields.push(field + ' ' + fields_map[fields[field]]);
										}
										resp.tables[table.text].sql = 'CREATE TABLE ' + table.text + '(' + tmp.sql_fields.join(',') + ')';
									};

									_iteratorNormalCompletion = true;
									_didIteratorError = false;
									_iteratorError = undefined;
									_context10.prev = 17;
									for (_iterator = _getIterator(modelos[0].nodes); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										table = _step.value;

										_loop(table);
									}
									_context10.next = 25;
									break;

								case 21:
									_context10.prev = 21;
									_context10.t0 = _context10['catch'](17);
									_didIteratorError = true;
									_iteratorError = _context10.t0;

								case 25:
									_context10.prev = 25;
									_context10.prev = 26;

									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}

								case 28:
									_context10.prev = 28;

									if (!_didIteratorError) {
										_context10.next = 31;
										break;
									}

									throw _iteratorError;

								case 31:
									return _context10.finish(28);

								case 32:
									return _context10.finish(25);

								case 33:
									this.debug_timeEnd({ id: 'readModelos' });
									// install alaSQL plugin and define tables
									if (resp.length > 0) {
										// get tables sql create
										ala_create = [];

										for (_table in resp.tables) {
											ala_create.push('alasqlJs(\'' + resp.tables[_table].sql + '\');');
										}
										// set custom install code
										ala_custom = 'const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t' + ala_create.join('\n') + '\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}';
										// set plugin info in state

										this.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
											global: true,
											npm: {
												alasql: '*'
											},
											var: 'alasqlJs',
											mode: 'client',
											customvar: 'alasql',
											custom: ala_custom
										};
									}
									// return 
									return _context10.abrupt('return', resp);

								case 36:
								case 'end':
									return _context10.stop();
							}
						}
					}, _callee10, this, [[17, 21, 25, 33], [26,, 28, 32]]);
				}));

				function _readModelos() {
					return _ref10.apply(this, arguments);
				}

				return _readModelos;
			}()

			/*
	  * Reads assets node, and returns object with info
	  */

		}, {
			key: '_readAssets',
			value: function () {
				var _ref11 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11() {
					var resp, path, assets, sep, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, child, key, _loop2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, i18n_node;

					return regenerator.wrap(function _callee11$(_context11) {
						while (1) {
							switch (_context11.prev = _context11.next) {
								case 0:
									resp = {}, path = require('path');

									this.debug('_readAssets');
									this.debug_time({ id: '_readAssets' });
									_context11.next = 5;
									return this.dsl_parser.getNodes({ text: 'assets', level: 2, icon: 'desktop_new', recurse: true });

								case 5:
									assets = _context11.sent;
									//nodes_raw:true
									sep = path.sep;
									//
									//this.debug('assets search',assets);

									if (!(assets.length > 0)) {
										_context11.next = 64;
										break;
									}

									assets = assets[0];
									// 15ms full
									_iteratorNormalCompletion2 = true;
									_didIteratorError2 = false;
									_iteratorError2 = undefined;
									_context11.prev = 12;
									_iterator2 = _getIterator(assets.nodes);

								case 14:
									if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
										_context11.next = 50;
										break;
									}

									child = _step2.value;

									if (!(child.nodes.length == 1 && child.nodes[0].image != '')) {
										_context11.next = 20;
										break;
									}

									// if there is just 1 grand-child and has an image defined
									resp[child.text.toLowerCase()] = {
										i18n: false,
										original: child.nodes[0].image,
										css: '~assets' + sep + path.basename(child.nodes[0].image),
										js: '~' + sep + 'assets' + sep + path.basename(child.nodes[0].image)
									};

									_context11.next = 47;
									break;

								case 20:
									if (!(child.nodes.length > 1)) {
										_context11.next = 46;
										break;
									}

									// if child has more than 1 child (grandchild), we'll assume its an image with i18n alternatives
									key = child.text.toLowerCase();

									resp[key] = { i18n: true, i18n_keys: [] };

									_loop2 = function _loop2(i18n_node) {
										// expand node attributes
										var attrs = {};
										i18n_node.attributes.map(function (x) {
											attrs = _extends$1({}, attrs, x);
										});
										if (attrs.idioma && i18n_node.image != '') {
											var lang = attrs.idioma.toLowerCase();
											resp[key].i18n_keys.push(lang);
											resp[key][lang] = _defineProperty$1({
												original: i18n_node.image,
												css: '~assets' + sep + path.basename(i18n_node.image)
											}, 'css', '~' + sep + 'assets' + sep + path.basename(i18n_node.image));
										}
									};

									_iteratorNormalCompletion3 = true;
									_didIteratorError3 = false;
									_iteratorError3 = undefined;
									_context11.prev = 27;
									for (_iterator3 = _getIterator(child.nodes); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
										i18n_node = _step3.value;

										_loop2(i18n_node);
									}
									// transform i18n_keys to list
									_context11.next = 35;
									break;

								case 31:
									_context11.prev = 31;
									_context11.t0 = _context11['catch'](27);
									_didIteratorError3 = true;
									_iteratorError3 = _context11.t0;

								case 35:
									_context11.prev = 35;
									_context11.prev = 36;

									if (!_iteratorNormalCompletion3 && _iterator3.return) {
										_iterator3.return();
									}

								case 38:
									_context11.prev = 38;

									if (!_didIteratorError3) {
										_context11.next = 41;
										break;
									}

									throw _iteratorError3;

								case 41:
									return _context11.finish(38);

								case 42:
									return _context11.finish(35);

								case 43:
									resp[key].i18n_keys = resp[key].i18n_keys.join(',');

									_context11.next = 47;
									break;

								case 46:
									if (child.link != '') {
										resp[child.text.toLowerCase()] = {
											original: child.link,
											css: '~assets' + sep + path.basename(child.link),
											js: '~' + sep + 'assets' + sep + path.basename(child.link)
										};
									}

								case 47:
									_iteratorNormalCompletion2 = true;
									_context11.next = 14;
									break;

								case 50:
									_context11.next = 56;
									break;

								case 52:
									_context11.prev = 52;
									_context11.t1 = _context11['catch'](12);
									_didIteratorError2 = true;
									_iteratorError2 = _context11.t1;

								case 56:
									_context11.prev = 56;
									_context11.prev = 57;

									if (!_iteratorNormalCompletion2 && _iterator2.return) {
										_iterator2.return();
									}

								case 59:
									_context11.prev = 59;

									if (!_didIteratorError2) {
										_context11.next = 62;
										break;
									}

									throw _iteratorError2;

								case 62:
									return _context11.finish(59);

								case 63:
									return _context11.finish(56);

								case 64:
									this.debug_timeEnd({ id: '_readAssets' });
									return _context11.abrupt('return', resp);

								case 66:
								case 'end':
									return _context11.stop();
							}
						}
					}, _callee11, this, [[12, 52, 56, 64], [27, 31, 35, 43], [36,, 38, 42], [57,, 59, 63]]);
				}));

				function _readAssets() {
					return _ref11.apply(this, arguments);
				}

				return _readAssets;
			}()

			/* 
	  * Grabs central node configuration information
	  */

		}, {
			key: '_readCentralConfig',
			value: function () {
				var _ref12 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
					var central, resp;
					return regenerator.wrap(function _callee12$(_context12) {
						while (1) {
							switch (_context12.prev = _context12.next) {
								case 0:
									this.debug('_readCentralConfig');
									_context12.next = 3;
									return this.dsl_parser.getNodes({ level: 1, recurse: false });

								case 3:
									central = _context12.sent;

									//this.debug('central search',central);
									// set defaults
									resp = {
										cloud: 'aws',
										type: 'simple',
										i18n: false,
										log: 'console',
										debug: false,
										deploy: false,
										static: false,
										timeout: 30,
										modelos: 'aurora',
										componente: false,
										'keep-alive': true,
										'keep-warm': true,
										port: 3000,
										git: true,
										idiomas: 'es',
										':cache': this.x_config.cache,
										':mode': 'spa',
										':keywords': '',
										':author': 'Punto Origen SpA',
										':license': 'MIT',
										':github': '',
										':version': '1.0.0',
										':description': central[0].text_note,
										default_face: central[0].font.face,
										default_size: central[0].font.size,
										apptitle: central[0].text
									};
									// overwrite default resp with info from central node

									central[0].attributes.map(function (x) {
										resp = _extends$1({}, resp, x);
									});
									if (resp.dominio) {
										resp.service_name = resp.dominio.replace(/\./g, '').toLowerCase();
									} else {
										resp.service_name = resp.apptitle;
									}
									if (!resp[':cache']) this.x_config.cache = false; // disables cache when processing nodes (@todo)
									// return
									return _context12.abrupt('return', resp);

								case 9:
								case 'end':
									return _context12.stop();
							}
						}
					}, _callee12, this);
				}));

				function _readCentralConfig() {
					return _ref12.apply(this, arguments);
				}

				return _readCentralConfig;
			}()

			/*
	  * Grabs the configuration from node named 'config'
	  */

		}, {
			key: '_readConfig',
			value: function () {
				var _ref13 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13() {
					var resp, config_node, search, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, key, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, meta_child, path, dsl_folder, parent_folder, folder;

					return regenerator.wrap(function _callee13$(_context13) {
						while (1) {
							switch (_context13.prev = _context13.next) {
								case 0:
									this.debug('_readConfig');
									resp = { id: '', meta: [], seo: {} }, config_node = {};
									_context13.next = 4;
									return this.dsl_parser.getNodes({ text: 'config', level: '2', icon: 'desktop_new', recurse: true });

								case 4:
									search = _context13.sent;

									if (!(search.length > 0)) {
										_context13.next = 56;
										break;
									}

									config_node = search[0];
									// define default font_face
									resp.default_face = config_node.font.face;
									resp.default_size = config_node.font.size;
									// apply children nodes as keys/value for resp
									_iteratorNormalCompletion4 = true;
									_didIteratorError4 = false;
									_iteratorError4 = undefined;
									_context13.prev = 12;
									_iterator4 = _getIterator(config_node.nodes);

								case 14:
									if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
										_context13.next = 42;
										break;
									}

									key = _step4.value;

									if (!(key.text.toLowerCase() == 'meta')) {
										_context13.next = 38;
										break;
									}

									_iteratorNormalCompletion5 = true;
									_didIteratorError5 = false;
									_iteratorError5 = undefined;
									_context13.prev = 20;

									for (_iterator5 = _getIterator(key.nodes); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
										meta_child = _step5.value;

										// apply grand_childs as meta tags
										if (meta_child.text.toLowerCase() == 'keywords') {
											resp.seo['keywords'] = meta_child.nodes.map(function (x) {
												return x.text;
											});
											resp.meta.push({ hid: this.hash(meta_child.nodes[0].text), name: 'keywords', content: resp.seo['keywords'].join(',') });
										} else if (meta_child.text.toLowerCase() == 'language') {
											resp.seo['language'] = meta_child.nodes[0].text;
											resp.meta.push({ hid: this.hash(meta_child.nodes[0].text), lang: meta_child.nodes[0].text });
										} else if (meta_child.text.toLowerCase() == 'charset') {
											resp.seo['charset'] = meta_child.nodes[0].text;
											resp.meta.push({ charset: meta_child.nodes[0].text });
										} else {
											resp.seo['charset'] = meta_child.nodes[0].text;
											if (meta_child.text.indexOf(':') != -1) {
												resp.meta.push({ property: meta_child.text, vmid: meta_child.text, content: meta_child.nodes[0].text });
											} else {
												resp.meta.push({ hid: this.hash(meta_child.nodes[0].text), name: meta_child.text, content: meta_child.nodes[0].text });
											}
										}
										//
									}
									_context13.next = 28;
									break;

								case 24:
									_context13.prev = 24;
									_context13.t0 = _context13['catch'](20);
									_didIteratorError5 = true;
									_iteratorError5 = _context13.t0;

								case 28:
									_context13.prev = 28;
									_context13.prev = 29;

									if (!_iteratorNormalCompletion5 && _iterator5.return) {
										_iterator5.return();
									}

								case 31:
									_context13.prev = 31;

									if (!_didIteratorError5) {
										_context13.next = 34;
										break;
									}

									throw _iteratorError5;

								case 34:
									return _context13.finish(31);

								case 35:
									return _context13.finish(28);

								case 36:
									_context13.next = 39;
									break;

								case 38:
									// apply keys as config keys (standard config node by content types)
									if (key.attributes.length > 0) {
										(function () {
											// @TODO: test
											var values = {};
											key.attributes.map(function (x) {
												values = _extends$1({}, values, x);
											});
											resp[key.text.toLowerCase().replace(/ /g, '')] = values;
										})();
									} else if (key.nodes.length > 0) {
										resp[key.text] = key.nodes[0].text;
									} else if (key.link != '') {
										resp[key.text] = key.link;
									}
									//

								case 39:
									_iteratorNormalCompletion4 = true;
									_context13.next = 14;
									break;

								case 42:
									_context13.next = 48;
									break;

								case 44:
									_context13.prev = 44;
									_context13.t1 = _context13['catch'](12);
									_didIteratorError4 = true;
									_iteratorError4 = _context13.t1;

								case 48:
									_context13.prev = 48;
									_context13.prev = 49;

									if (!_iteratorNormalCompletion4 && _iterator4.return) {
										_iterator4.return();
									}

								case 51:
									_context13.prev = 51;

									if (!_didIteratorError4) {
										_context13.next = 54;
										break;
									}

									throw _iteratorError4;

								case 54:
									return _context13.finish(51);

								case 55:
									return _context13.finish(48);

								case 56:
									// assign dsl file folder name+filename if node.name is not given
									if (!resp.name) {
										path = require('path');
										dsl_folder = path.dirname(path.resolve(this.x_flags.dsl));
										parent_folder = path.resolve(dsl_folder, '../');
										folder = dsl_folder.replace(parent_folder, '');

										resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(this.x_flags.dsl, '.dsl');
										//console.log('folder:',{folder,name:resp.name});
										//this.x_flags.dsl
									}
									// create id if not given
									if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
									return _context13.abrupt('return', resp);

								case 59:
								case 'end':
									return _context13.stop();
							}
						}
					}, _callee13, this, [[12, 44, 48, 56], [20, 24, 28, 36], [29,, 31, 35], [49,, 51, 55]]);
				}));

				function _readConfig() {
					return _ref13.apply(this, arguments);
				}

				return _readConfig;
			}()
		}]);

		return vue_dsl;
	}(concepto);

	return vue_dsl;

})));

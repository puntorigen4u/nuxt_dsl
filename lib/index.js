(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vue_dsl = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
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
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  String.prototype.replaceAll = function (strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
  };

  String.prototype.cleanLines = function () {
    var esc = '\n'.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, '').trim();
  };

  String.prototype.contains = function (test) {
    if (typeof this === 'string' && this.indexOf(test) != -1) {
      return true;
    } else {
      return false;
    }
  };

  String.prototype.right = function (chars) {
    return this.substr(this.length - chars);
  };

  function setImmediatePromise$1() {
    //for preventing freezing node thread within loops (fors)
    return new Promise(resolve => {
      setImmediate(() => resolve());
    });
  }

  function internal_commands (_x) {
    return _ref.apply(this, arguments);
  }

  function _ref() {
    _ref = _asyncToGenerator(function* (context) {
      // context.x_state; shareable var scope contents between commands and methods.
      var null_template = {
        hint: 'Allowed node type that must be ommited',
        func: function () {
          var _func = _asyncToGenerator(function* (node, state) {
            return context.reply_template({
              hasChildren: false,
              state
            });
          });

          function func(_x2, _x3) {
            return _func.apply(this, arguments);
          }

          return func;
        }()
      };

      var parseInputOutput = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (node, state) {
          //get vars and attrs
          var tmp = {
            var: '',
            original: ''
          };
          if (node.text.contains(',')) tmp.var = node.text.split(',').pop().trim(); //prepare new var

          if (tmp.var.contains('$')) {
            if (state.from_server) {
              tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
            } else {
              tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
              if (tmp.var == 'this.') tmp.var = 'this';
            }
          } //prepare original var


          tmp.original = context.dsl_parser.findVariables({
            text: node.text,
            symbol: "\"",
            symbol_closing: "\""
          });

          if (tmp.original.contains('**') && node.icons.includes('bell')) {
            tmp.original = getTranslatedTextVar(tmp.original);
          } else if (tmp.original.contains('$')) {
            if (state.from_server) {
              tmp.original = tmp.original.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
            } else {
              tmp.original = tmp.original.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
              if (tmp.original == 'this.') tmp.original = 'this';
            }
          }

          return {
            input: tmp.original,
            output: tmp.var
          };
        });

        return function parseInputOutput(_x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }();

      var getTranslatedTextVar = function getTranslatedTextVar(text) {
        var keep_if_same = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var vars = context.dsl_parser.findVariables({
          text,
          symbol: "**",
          symbol_closing: "**"
        }); //console.log('translated text:'+text,vars);

        var new_vars = context.dsl_parser.replaceVarsSymbol({
          text,
          from: {
            open: "**",
            close: "**"
          },
          to: {
            open: '${',
            close: '}'
          }
        }); //console.log('translated new_vars text:'+text,new_vars);

        if ('${' + vars + '}' == new_vars) {
          if (keep_if_same == true) return text;
          return vars;
        } else {
          return "`".concat(new_vars, "`");
        }
      }; // process our own attributes_aliases to normalize node attributes


      var aliases2params = function aliases2params(x_id, node, escape_vars) {
        var variables_to = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var params = {
          refx: node.id
        },
            attr_map = {}; // read x_id attributes aliases

        if ('attributes_aliases' in context.x_commands[x_id]) {
          var aliases = context.x_commands[x_id].attributes_aliases;
          Object.keys(aliases).map(function (key) {
            aliases[key].split(',').map(alternative_key => {
              attr_map[alternative_key] = key;
            });
          });
        } // process mapped attributes


        Object.keys(node.attributes).map(function (key) {
          var value = node.attributes[key];
          var key_use = key.trim();
          if (key_use.charAt(0) == ':') key_use = key_use.right(key_use.length - 1);
          var keytest = key_use.toLowerCase();
          var tvalue = value.toString().replaceAll('$variables.', variables_to).replaceAll('$vars.', variables_to).replaceAll('$params.', variables_to).replaceAll('$config.', 'process.env.').replaceAll('$store.', variables_to + '$store.state.').trim();

          if (tvalue.charAt(0) == '$' && tvalue.contains('$store') == false) {
            tvalue = tvalue.right(tvalue.length - 1);
          } //
          //tvalue = getTranslatedTextVar(tvalue);


          if (keytest == 'props') {
            value.split(' ').map(x => {
              params[x] = null;
            });
          } else if (keytest in attr_map && value != tvalue) {
            // value contains a variable
            if (attr_map[keytest] == 'v-model') {
              params[attr_map[keytest]] = tvalue;
            } else {
              params[":".concat(attr_map[keytest])] = tvalue;
            }
          } else if (keytest in attr_map) {
            // literal value
            params[attr_map[keytest]] = tvalue;
          } else {
            // this is an attribute key that is not mapped
            if (value != tvalue || value[0] == "$" || value[0] == "!" || key.charAt(0) == ':') {
              if (escape_vars && escape_vars == true) {
                tvalue = tvalue.replaceAll('{{', '').replaceAll('}}', '');
              }

              params[":".concat(key_use)] = tvalue;
            } else {
              params[key_use] = tvalue;
            }
          }
        }); //

        return params;
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
      	x_text_exact: '',
      	x_text_contains: '',
      	x_level: '2,>2,<5,..',
      	x_all_hasparent: 'def_padre_otro',
      	x_or_hasparent: '',
      	x_or_isparent: '',
      	x_not_hasparent: '', //@TODO create this meta_attribute in Concepto
      	hint: 'Testing node',
      	autocomplete: {
      		text: 'otro', //activate autocomplete if the node text equals to this
      		icon: 'idea', //activate autocomplete if the node has this icon
      		
      		attributes: {
      			'from': {
      				type: 'int',
      				description: 'If defined, sets the start offset for the node. (example)'
      			}
      		}
      	},
      	func: async function(node,state) {
      		let resp = context.reply_template({ state });
      		return resp;
      	}
      }
      */


      return {
        //'cancel': {...null_template,...{ x_icons:'button_cancel'} },
        'meta': _objectSpread2(_objectSpread2({}, null_template), {
          version: '0.0.2',
          x_level: '2000'
        }),
        'def_config': _objectSpread2(_objectSpread2({}, null_template), {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'config'
        }),
        'def_modelos': _objectSpread2(_objectSpread2({}, null_template), {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'modelos'
        }),
        'def_assets': _objectSpread2(_objectSpread2({}, null_template), {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'assets'
        }),
        // ********************
        //  Express Methods
        // ********************
        'def_server': {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'server|servidor|api',
          hint: 'Representa a un backend integrado con funciones de express.',
          func: function () {
            var _func2 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template();
              context.x_state.npm = _objectSpread2(_objectSpread2({}, context.x_state.npm), {
                'body_parser': '*',
                'cookie-parser': '*'
              });
              context.x_state.central_config.static = false;
              return resp;
            });

            function func(_x6, _x7) {
              return _func2.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_server_path': {
          x_icons: 'list',
          x_level: '3,4',
          x_or_hasparent: 'def_server',
          x_not_icons: 'button_cancel,desktop_new,help',
          hint: 'Carpeta para ubicacion de funcion de servidor',
          func: function () {
            var _func3 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //console.log('def_server_path DEBUG',node);

              var test1 = yield context.isExactParentID(node.id, 'def_server_path');

              if (node.level == 3) {
                //state.current_folder = node.text;
                resp.state.current_folder = node.text;
              } else if (node.level == 4 && test1 == true) {
                var parent_node = yield context.dsl_parser.getParentNode({
                  id: node.id
                }); //state.current_folder = `${parent_node.text}/${node.id}`;

                resp.state.current_folder = "".concat(parent_node.text, "/").concat(node.text);
              } else {
                resp.valid = false;
              }

              return resp;
            });

            function func(_x8, _x9) {
              return _func3.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_server_func': {
          //@TODO finish incomplete
          x_empty: 'icons',
          x_level: '3,4,5',
          x_or_hasparent: 'def_server',
          hint: 'Corresponde a la declaracion de una funcion de servidor',
          func: function () {
            var _func4 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              context.x_state.central_config.static = false; //server func cannot run in a static site

              resp.state.current_func = node.text;

              if (node.level != 2) {
                var new_name = resp.state.current_folder ? resp.state.current_folder.split('/') : [];
                resp.state.current_func = [...new_name, node.text].join('_'); //console.log('@TODO! def_server_func: new_name',new_name);
              } // set function defaults


              if (!context.x_state.functions[resp.state.current_func]) {
                context.x_state.functions[resp.state.current_func] = {
                  tipo: 'web',
                  acceso: '*',
                  params: '',
                  param_doc: {},
                  doc: node.text_note,
                  method: 'get',
                  return: '',
                  path: '/' + (resp.state.current_folder ? resp.state.current_folder + '/' : '') + node.text,
                  imports: {}
                };
              } // process attributes


              Object.keys(node.attributes).map(function (keym) {
                var key = keym.toLowerCase();

                if ([':type', 'type', 'tipo', ':tipo', ':method', 'method'].includes(key)) {
                  context.x_state.functions[resp.state.current_func].method = node.attributes[key];
                } else {
                  if (key.contains(':')) {
                    context.x_state.functions[resp.state.current_func].param_doc[key.split(':')[0]] = {
                      type: key.split(':')[1],
                      desc: node.attributes[key]
                    };
                  } else {
                    context.x_state.functions[resp.state.current_func][key.toLowerCase().trim()] = node.attributes[key];
                  }
                } //

              }); // write tag code

              resp.open = context.tagParams('func_code', {
                name: resp.state.current_func,
                method: context.x_state.functions[resp.state.current_func].method,
                path: context.x_state.functions[resp.state.current_func].path
              }, false) + '\n';
              resp.close = '</func_code>'; //

              return resp;
            });

            function func(_x10, _x11) {
              return _func4.apply(this, arguments);
            }

            return func;
          }()
        },
        // *************************
        //  VueX STORES definitions
        // *************************
        'def_store': {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'store',
          hint: 'Representa una coleccion de stores de Vue',
          func: function () {
            var _func5 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              return resp;
            });

            function func(_x12, _x13) {
              return _func5.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_store_def': {
          x_empty: 'icons',
          x_level: '3',
          x_all_hasparent: 'def_store',
          hint: 'Representa a una definicion de store de VueX',
          func: function () {
            var _func6 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                type: 'normal',
                version: '',
                expire: ''
              }; // create store in app state if not already there

              resp.state.current_store = node.text;
              if (!context.x_state.stores) context.x_state.stores = {};
              if (context.x_state.stores && node.text in context.x_state.stores === false) context.x_state.stores[node.text] = {};
              Object.keys(node.attributes).map(function (keym) {
                var key = keym.toLowerCase();

                if ([':type', 'type', 'tipo', ':tipo'].includes(key)) {
                  // store type value
                  if (['sesion', 'session'].includes(node.attributes[key])) {
                    tmp.type = 'session';
                    context.x_state.npm['nuxt-vuex-localstorage'] = '*'; // add npm to app package
                  } else if (['local', 'persistent', 'persistente', 'localstorage', 'storage', 'db', 'bd'].includes(node.attributes[key])) {
                    tmp.type = 'local';
                    context.x_state.npm['nuxt-vuex-localstorage'] = '*';
                  }
                } else if (['version', ':version'].includes(key)) {
                  tmp.version = node.attributes[key];
                } else if (['expire', ':expire', 'expira', ':expira'].includes(key)) {
                  tmp.expire = node.attributes[key];
                } //

              }); // set store type, version and expire attributes for app state
              //if (!context.x_state.stores_types) context.x_state.stores_types={ versions:{}, expires:{} };
              // prepare stores_type, and keys local or session. 

              if (context.x_state.stores_types && tmp.type in context.x_state.stores_types === false) context.x_state.stores_types[tmp.type] = {};
              if (resp.state.current_store in context.x_state.stores_types[tmp.type] === false) context.x_state.stores_types[tmp.type][resp.state.current_store] = {}; // set version value

              if (tmp.version != '') {
                if (resp.state.current_store in context.x_state.stores_types['versions'] === false) context.x_state.stores_types['versions'][resp.state.current_store] = tmp.version;
              } // set expire value


              if (tmp.expire != '') {
                if (resp.state.current_store in context.x_state.stores_types['expires'] === false) context.x_state.stores_types['expires'][resp.state.current_store] = tmp.expire;
              } // return


              return resp;
            });

            function func(_x14, _x15) {
              return _func6.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_store_field': {
          x_empty: 'icons',
          x_level: '>3',
          x_all_hasparent: 'def_store_def',
          hint: 'Representa al campo de un store de VueX',
          func: function () {
            var _func7 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                type: 'string',
                default: '',
                text: node.text.trim()
              };

              if (node.text.indexOf(':') != -1) {
                tmp.type = tmp.text.split(':').slice(-1)[0];
                tmp.text = tmp.text.split(':')[0];
              } // parse attributes


              Object.keys(node.attributes).map(function (keym) {
                var key = keym.toLowerCase();

                if ([':def,:default,valor,value'].includes(key)) {
                  tmp.default = node.attributes[keym].toLowerCase();
                } else if ([':tipo,:type,tipo,type'].includes(key)) {
                  tmp.type = node.attributes[keym].toLowerCase();
                }
              }); // set

              if (resp.state.current_store in context.x_state.stores) {
                context.x_state.stores[resp.state.current_store][tmp.text.trim()] = {
                  default: tmp.default,
                  type: tmp.type
                };
              } else {
                context.x_state.stores[resp.state.current_store] = {};
                context.x_state.stores[resp.state.current_store][tmp.text.trim()] = {
                  default: tmp.default,
                  type: tmp.type
                };
              } // return


              return resp;
            });

            function func(_x16, _x17) {
              return _func7.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_store_mutation': {
          x_level: '>3',
          x_icons: 'help',
          x_all_hasparent: 'def_store',
          attributes_aliases: {
            'params': ':params,params'
          },
          hint: 'Representa la modificacion de un store de VueX',
          func: function () {
            var _func8 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              var params = aliases2params('def_store_mutation', node);
              resp.state.current_store_mutation = node.text.trim();
              var cur_store = context.x_state.stores[resp.state.current_store];

              if (!(':mutations' in cur_store)) {
                context.x_state.stores[resp.state.current_store][':mutations'] = {};
              }

              context.x_state.stores[resp.state.current_store][':mutations'][resp.state.current_store_mutation] = params;
              resp.open = context.tagParams('store_mutation', _objectSpread2({
                store: resp.state.current_store,
                mutation: resp.state.current_store_mutation
              }, params), false) + '\n';
              resp.close = '</store_mutation>';
              return resp;
            });

            function func(_x18, _x19) {
              return _func8.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_store_modificar': {
          x_level: '>4',
          x_icons: 'desktop_new',
          x_all_hasparent: 'def_store_mutation',
          x_text_contains: 'modificar',
          hint: 'Comando para modificar los valores del state del store padre',
          func: function () {
            var _func9 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });

              var safe = require('safe-eval'); // parse attributes


              Object.keys(node.attributes).map(function (keym) {
                var key = keym.trim();
                var value = node.attributes[keym];

                if (value == '{now}') {
                  resp.open += "state.".concat(key, " = new Date()\n");
                } else if (value == '') {
                  var val = '';

                  if (key in context.x_state.stores[state.current_store]) {
                    val = context.x_state.stores[state.current_store][key].default;
                  }

                  if (val == '') val = "''";
                  resp.open += "state.".concat(key, " = ").concat(val, "\n");
                } else if (value.contains('**')) {
                  // preprocess value               
                  var _val = value.trim();

                  if (node.icons.includes('bell')) {
                    _val = getTranslatedTextVar(value);
                  }

                  if (_val == '') _val = "''";

                  if (_val.contains('this.') || _val.contains('params.')) {
                    _val = _val.replaceAll('this.', '').replaceAll('params.', '');
                    resp.open += "state.".concat(key, " = objeto.").concat(_val, "\n");
                  } else {
                    resp.open += "state.".concat(key, " = ").concat(_val, "\n");
                  }
                } else if (value.contains('!') == false && safe(value) !== '' + value) {
                  // if val is string
                  resp.open += "state.".concat(key, " = ").concat(value, "\n");
                } else {
                  //if val is not a string
                  if (value != '' && value.charAt(0) == '!' && value.contains('.') == false) {
                    resp.open += "state.".concat(key, " = !state.").concat(key, "\n");
                  } else if (value != '' && value.charAt(0) == '!') ;
                }
              });
              return resp;
            });

            function func(_x20, _x21) {
              return _func9.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_store_call': {
          x_level: '>1',
          x_icons: 'desktop_new',
          x_text_contains: 'store:',
          x_or_hasparent: 'def_event_element,def_event_method,def_event_server,def_condicion,def_otra_condicion,def_event_mounted',
          hint: 'Representa al llamdo de un evento de un store',
          func: function () {
            var _func10 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              var store = node.text.split(' ')[0].replaceAll('store:', '').trim();
              var params = {}; //let isProxySon = (context.hasParentID(node.id, 'def_proxy_def')==true)?true:false;

              var isProxySon = 'current_proxy' in resp.state ? true : false;
              var method = context.dsl_parser.findVariables({
                text: node.text,
                symbol: '"',
                symbol_closing: '"'
              }).trim();
              Object.keys(node.attributes).map(function (keym) {
                var key = keym.trim();
                var value = node.attributes[keym];
                value = value.replaceAll('$variables.', 'this.').replaceAll('$vars.', '$this.').replaceAll('$params.', 'this.').replaceAll('$env.', 'process.env.');

                if (value.contains('$store.')) {
                  if (isProxySon == true) {
                    value = value.replaceAll('$store.', 'store.state.');
                  } else {
                    value = value.replaceAll('$store.', 'this.$store.state.');
                  }
                }

                params[key] = value;
              }); //let util = require('util');

              var data = context.jsDump(params).replaceAll("'`", "`").replaceAll("`'", "`");
              resp.open = (isProxySon == true ? 'store.' : 'this.$store.') + "commit('".concat(store, "/").concat(method, "', ").concat(data, ");");
              return resp;
            });

            function func(_x22, _x23) {
              return _func10.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_store_mutation
        //*def_store_field
        //*def_store_modificar
        //*def_store_call
        // **************************
        //  VueX PROXIES definitions
        // **************************
        'def_proxies': {
          x_icons: 'desktop_new',
          x_level: 2,
          x_text_contains: 'prox',
          hint: 'Representa una coleccion de proxies de Vue',
          func: function () {
            var _func11 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              resp.state.from_script = true;
              return resp;
            });

            function func(_x24, _x25) {
              return _func11.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_proxy_def': {
          x_level: 3,
          x_empty: 'icons',
          x_or_isparent: 'def_proxies',
          hint: 'Representa una definicion de un proxy (middleware) en Vue',
          func: function () {
            var _func12 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              resp.state.current_proxy = node.text.trim();
              context.x_state.proxies[resp.state.current_proxy] = {
                imports: {
                  underscore: '_'
                },
                code: ''
              };
              resp.open = context.tagParams('proxy_code', {
                name: resp.state.current_proxy
              }, false) + '\n';
              resp.close = '</proxy_code>';
              return resp;
            });

            function func(_x26, _x27) {
              return _func12.apply(this, arguments);
            }

            return func;
          }()
        },
        // *****************************
        //  Vue Pages and View Elements
        // *****************************
        //def_html y otros
        //*def_page
        //*def_page_seo
        //*def_page_estilos
        //*def_page_estilos_class
        'def_page': {
          x_level: 2,
          x_not_icons: 'button_cancel,desktop_new,list,help',
          x_not_text_contains: 'componente:,layout:',
          hint: 'Archivo vue',
          func: function () {
            var _func13 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              resp.state.current_page = node.text; // set global page defaults for current page

              if (!context.x_state.pages[resp.state.current_page]) {
                context.x_state.pages[resp.state.current_page] = {
                  tipo: 'page',
                  acceso: '*',
                  params: '',
                  layout: '',
                  defaults: {},
                  imports: {},
                  components: {},
                  directives: {},
                  variables: {},
                  seo: {},
                  meta: {},
                  head: {
                    script: [],
                    meta: [],
                    seo: {}
                  },
                  var_types: {},
                  proxies: '',
                  return: '',
                  styles: {},
                  script: {},
                  mixins: {},
                  track_events: {},
                  path: '/' + resp.state.current_page
                };
              }

              if (resp.state.from_def_layout) context.x_state.pages[resp.state.current_page].tipo = 'layout';
              if (resp.state.from_def_componente) context.x_state.pages[resp.state.current_page].tipo = 'componente'; // is this a 'home' page ?

              if (node.icons.includes('gohome')) context.x_state.pages[resp.state.current_page].path = '/'; // attributes overwrite anything

              var params = {};
              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env').replaceAll('$store.', '$store.state.'); // query attributes

                if (['proxy'].includes(key.toLowerCase())) {
                  context.x_state.pages[resp.state.current_page].proxies = value;
                } else if (['acceso', 'method'].includes(key.toLowerCase())) {
                  context.x_state.pages[resp.state.current_page].acceso = value;
                } else if (['path', 'url', 'ruta'].includes(key.toLowerCase())) {
                  context.x_state.pages[resp.state.current_page].path = value;
                } else if (['layout'].includes(key.toLowerCase())) {
                  context.x_state.pages[resp.state.current_page].layout = value;
                } else if (['meta:title', 'meta:titulo'].includes(key.toLowerCase())) {
                  context.x_state.pages[resp.state.current_page].xtitle = value;
                } else if (['background', 'fondo'].includes(key.toLowerCase())) {
                  params.id = 'tapa';
                  var background = context.getAsset(value, 'css');
                  context.x_state.pages[resp.state.current_page].styles['#tapa'] = {
                    'background-image': "url('".concat(background, "')"),
                    'background-repeat': 'no-repeat',
                    'background-size': '100vw'
                  };
                } else {
                  if (key.charAt(0) != ':' && value != node.attributes[key]) {
                    params[':' + key] = value;
                  } else {
                    params[key] = value;
                  } //context.x_state.pages[resp.state.current_page].xtitle = value;

                }

                if (resp.state.from_def_layout || resp.state.from_def_componente) {
                  if (key == 'params') {
                    context.x_state.pages[resp.state.current_page].params = value;
                  } else if (key.contains('params:') || key.contains('param:')) {
                    var tmpo = key.replaceAll('params:', '').replaceAll('param:', '').trim();
                    context.x_state.pages[resp.state.current_page].defaults[tmpo] = value;
                  } //console.log('PABLO COMPONENTE!! o LAYOUT!!',{ key, value });

                }
              }.bind(this)); // has comments ?

              if (node.text_note != '') {
                resp.open = "<!-- ".concat(node.text_note.replaceAll('<br/ >', '\n'), " -->\n");
              } // set code


              resp.open += "<template>\n";

              if ('from_def_componente' in resp.state === false) {
                if (context.x_state.pages[resp.state.current_page]['layout'] == '') {
                  resp.open += '\t' + context.tagParams('v-app', params, false) + '\n';
                  resp.close += '\t</v-app>\n';
                }
              }

              resp.close += "</template>\n"; // return

              return resp;
            });

            function func(_x28, _x29) {
              return _func13.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_page_seo': {
          x_level: 3,
          x_icons: 'desktop_new',
          x_text_contains: 'seo',
          hint: 'Definicion local de SEO',
          func: function () {
            var _func14 = _asyncToGenerator(function* (node, state) {
              // @TODO check this node runs correctly (currently without testing map aug-20-20)
              var resp = context.reply_template({
                state
              }); // process children nodes

              var subnodes = yield node.getNodes();
              subnodes.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(function* (item) {
                  var test = item.text.toLowerCase().trim();
                  var key_nodes = yield item.getNodes(); // test by subnode names.

                  if (test == 'keywords') {
                    // get an array of childrens node text
                    var keys = [];
                    key_nodes.map(x => {
                      keys.push(x.text);
                    }); // set into current_page state

                    context.x_state.pages[state.current_page].seo[test] = keys;
                    context.x_state.pages[state.current_page].meta.push({
                      hid: context.hash(key_nodes),
                      name: 'keywords',
                      content: keys.join(',')
                    });
                  } else if (test == 'language' && key_nodes.length > 0) {
                    //@TODO check this meta statement output format, because its not clear how it's supposed to work aug-20-20
                    context.x_state.pages[state.current_page].seo[test] = key_nodes[0].text;
                    context.x_state.pages[state.current_page].meta.push({
                      hid: context.hash(key_nodes),
                      lang: key_nodes[0].text.toLowerCase().trim(),
                      content: key_nodes[0].text
                    });
                  } else if (key_nodes.length > 0) {
                    context.x_state.pages[state.current_page].seo[test] = key_nodes[0].text;

                    if (test.contains(':')) {
                      context.x_state.pages[state.current_page].meta.push({
                        property: test,
                        vmid: test,
                        content: key_nodes[0].text
                      });
                    } else {
                      context.x_state.pages[state.current_page].meta.push({
                        hid: context.hash(key_nodes),
                        name: item.text.trim(),
                        content: key_nodes[0].text
                      });
                    }
                  }
                });

                return function (_x32) {
                  return _ref3.apply(this, arguments);
                };
              }().bind(this)); // return

              return resp;
            });

            function func(_x30, _x31) {
              return _func14.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_page_estilos': {
          x_level: '3,4',
          x_icons: 'desktop_new',
          x_text_contains: 'estilos',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Definicion de estilos/clases locales',
          func: function () {
            var _func15 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              var params = _objectSpread2(_objectSpread2({}, {
                scoped: true
              }), aliases2params('def_page_estilos', node));

              resp.open = context.tagParams('page_estilos', params, false);
              resp.close = '</page_estilos>';
              resp.state.from_estilos = true;
              return resp;
            });

            function func(_x33, _x34) {
              return _func15.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_page_estilos_class': {
          x_level: 4,
          x_empty: 'icons',
          x_all_hasparent: 'def_page_estilos',
          hint: 'Definicion de clase CSS en template VUE',
          func: function () {
            var _func16 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var left_char = node.text.trim().charAt(0);

              if (['#', '.', '|'].includes(left_char) === false) {
                resp.open = ".".concat(node.text.trim(), " {\n");
              } else if (left_char == '|') {
                resp.open = "".concat(node.text.trim().substring(1), " {\n"); //removed | from start.
              } else {
                resp.open = "".concat(node.text.trim(), " {\n");
              } // output attributes
              // @TODO improve this; I believe this could behave more like def_variables_field instead, and so support nested styles.
              // currently this works as it was in the CFC


              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key];

                if (context.x_state.es6 && !value.contains('!important') && value.slice(-1) != ';') {
                  resp.open += "\t".concat(key, ": ").concat(value, " !important;\n");
                } else if (context.x_state.es6 && !value.contains('!important')) {
                  resp.open += "\t".concat(key, ": ").concat(value.slice(0, -1), " !important;\n");
                } else {
                  resp.open += "\t".concat(key, ": ").concat(value, ";\n");
                }
              });
              resp.open += '}\n';
              return resp;
            });

            function func(_x35, _x36) {
              return _func16.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_layout
        //*def_layout_view
        //*def_layout_contenido (ex. def_contenido_layout)
        //*def_componente
        //*def_componente_view (instancia)
        //*def_componente_emitir (ex: def_llamar_evento, script)
        'def_layout': {
          x_level: 2,
          x_not_icons: 'button_cancel,desktop_new,list,help,idea',
          x_text_contains: 'layout:',
          x_empty: 'icons',
          hint: 'Archivo vue tipo layout',
          func: function () {
            var _func17 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // call def_page for functionality informing we are calling from def_layout using state.

              resp = yield context.x_commands['def_page'].func(node, _objectSpread2(_objectSpread2({}, state), {
                from_def_layout: true
              }));
              delete resp.state.from_def_layout;
              return resp;
            });

            function func(_x37, _x38) {
              return _func17.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_layout_view': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'layout:',
          hint: 'Contenedor flexible, layout:flex o layout:wrap',
          func: function () {
            var _func18 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                tipo: 'flex',
                width: 6
              };
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note.trim(), " -->");
              if (node.text.contains(':wrap')) tmp.tipo = 'wrap';
              var params = aliases2params('def_layout_view', node);
              tmp.params = _objectSpread2({}, params); // special cases

              if (params.width) {
                tmp.width = params.width;

                if (params.width.contains('%')) {
                  tmp.width = Math.round(parseInt(params.width.replaceAll('%', '')) * 12 / 100);
                }

                delete params.width;
              }

              if (params[':width']) delete params[':width']; // write output

              if (tmp.params.margen && tmp.params.margen == 'true') {
                delete params.margen;

                if (tmp.params.center && tmp.params.center == 'true') {
                  //resp.open += `<v-container fill-height='xpropx'>\n`;
                  resp.open += context.tagParams('v-container', {
                    'fill-height': null
                  }, false) + '\n';
                  resp.open += context.tagParams('v-row', {
                    'align-center': null,
                    refx: node.id
                  }, false) + '\n';
                } else {
                  if (tmp.tipo == 'flex') {
                    resp.open += context.tagParams('v-container', {}, false) + '\n';
                    params.row = null;
                    resp.open += context.tagParams('v-layout', params, false) + '\n';
                  } else if (tmp.tipo == 'wrap') {
                    resp.open += context.tagParams('v-container', {
                      'fill-height': null,
                      'container--fluid': null,
                      'grid-list-xl': null
                    }, false) + '\n';
                    params.wrap = null;
                    resp.open += context.tagParams('v-layout', params, false) + '\n';
                  }
                } // part flex


                if (tmp.tipo == 'flex' && tmp.params.center && tmp.params.center == 'true') {
                  params['xs12'] = null;
                  params['sm' + tmp.width] = null;
                  params['offset-sm' + Math.round(tmp.width / 2)] = null;
                  resp.open += context.tagParams('v-flex', params, false) + '\n';
                  resp.close += "</v-flex>";
                } // close layout


                if (context.x_state.es6 && tmp.params.center && tmp.params.center == 'true') {
                  resp.close += '</v-row>\n';
                } else {
                  resp.close += '</v-layout>\n';
                }

                resp.close += '</v-container>\n';
              } else {
                // without margen
                if (tmp.params.center && tmp.params.center == 'true') {
                  delete params.center;
                  params = _objectSpread2(_objectSpread2({}, params), {
                    wrap: null,
                    'align-center': null
                  });
                  resp.open += context.tagParams('v-row', params, false) + '\n';
                } else {
                  params.wrap = null;
                  resp.open += context.tagParams('v-layout', params, false) + '\n';
                } // part flex


                if (tmp.tipo == 'flex' && tmp.params.center && tmp.params.center == 'true') {
                  delete params.center;
                  params['xs12'] = null;
                  params['sm' + tmp.width] = null;
                  params['offset-sm' + Math.round(tmp.width / 2)] = null;
                  resp.open += context.tagParams('v-flex', params, false) + '\n';
                  resp.close += "</v-flex>";
                } // close layout


                if (context.x_state.es6 && tmp.params.center && tmp.params.center == 'true') {
                  resp.close += '</v-row>';
                } else {
                  resp.close += '</v-layout>';
                }
              } // return


              return resp;
            });

            function func(_x39, _x40) {
              return _func18.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_layout_contenido': {
          x_level: 3,
          x_icons: 'idea',
          x_text_contains: 'contenido',
          x_all_hasparent: 'def_layout',
          hint: 'Placeholder para contenidos de paginas en pantallas tipo layouts',
          func: function () {
            var _func19 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {};
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              if (context.x_state.central_config['keep-alive']) params['keep-alive'] = null; // write tag

              resp.open += context.tagParams('nuxt', params, true) + "\n";
              return resp;
            });

            function func(_x41, _x42) {
              return _func19.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_componente': {
          x_level: 2,
          x_not_icons: 'button_cancel,desktop_new,list,help,idea',
          x_text_contains: 'componente:',
          x_empty: 'icons',
          hint: 'Archivo vue tipo componente',
          func: function () {
            var _func20 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // call def_page for functionality informing we are calling from def_componente using state.

              resp = yield context.x_commands['def_page'].func(node, _objectSpread2(_objectSpread2({}, state), {
                from_def_componente: true
              }));
              delete resp.state.from_def_componente;
              return resp;
            });

            function func(_x43, _x44) {
              return _func20.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_componente_view': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'componente:',
          hint: 'Instancia de componente',
          func: function () {
            var _func21 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // prepare vars

              var file_name = node.text.trim().split(':').pop();
              var tag_name = "c-".concat(file_name);
              var var_name = file_name.replaceAll('-', ''); // add import to page

              context.x_state.pages[state.current_page].imports["~/components/".concat(file_name, ".vue")] = var_name;
              context.x_state.pages[state.current_page].components[tag_name] = var_name; // process attributes and write output

              var params = aliases2params('def_componente_view', node); // filter $x values

              /*for (let key in params) {
                  if (params[key].charAt(0)=='$' && params[key].contains('$store')==false) {
                      params[key] = params[key].right(params[key].length-1);
                  }
              }*/
              //

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note.cleanLines(), " -->\n");
              resp.open += context.tagParams(tag_name, params, false) + '\n';
              resp.close = "</".concat(tag_name, ">\n");
              resp.state.from_componente = true;
              return resp;
            });

            function func(_x45, _x46) {
              return _func21.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_componente_emitir': {
          //@oldname: def_llamar_evento
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'llamar evento|emitir evento',
          //@idea x_text_contains: `llamar evento "{evento}"|emitir evento "{evento}"`,
          x_all_hasparent: 'def_componente',
          hint: 'Emite un evento desde el componente a sus instancias',
          func: function () {
            var _func22 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var event_name = context.dsl_parser.findVariables({
                text: node.text,
                symbol: '"',
                symbol_closing: '"'
              }).trim(); // pass attributes as data to parent of component

              var params = [];
              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                if (value.contains('**') && node.icons.includes('bell')) {
                  value = getTranslatedTextVar(value);
                } else if (value == 'true' || value == 'false') {
                  value = value == 'true' ? true : value;
                  value = value == 'false' ? false : value;
                } else if (value.contains('$')) {
                  value = value.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env').replaceAll('$store.', 'this.$store.state.');
                } else if (value.contains('this.') == false) {
                  //@TODO add i18n support here
                  if (value.contains("'") == false) {
                    value = "'".concat(value, "'");
                  }
                }

                params.push("".concat(key, ": ").concat(value));
              }); // write output and return

              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              resp.open += "this.$emit('".concat(event_name, "',{").concat(params.join(','), "});\n");
              return resp;
            });

            function func(_x47, _x48) {
              return _func22.apply(this, arguments);
            }

            return func;
          }()
        },
        // CARDs
        'def_card': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'card',
          x_not_text_contains: ':text,:texto,:title,:action,:image,:media',
          attributes_aliases: {
            'width': 'width,ancho',
            'height': 'height,alto'
          },
          hint: 'Card de vuetify',
          func: function () {
            var _func23 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card', node); // write tag

              resp.open += context.tagParams('v-card', params, false) + '\n';
              resp.close += "</v-card>\n";
              return resp;
            });

            function func(_x49, _x50) {
              return _func23.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_card_title': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'card:title',
          x_all_hasparent: 'def_card',
          hint: 'Titulo de card de vuetify',
          func: function () {
            var _func24 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_title', node);
              resp.open += context.tagParams('v-card-title', params, false) + '\n';
              resp.close += "</v-card-title>\n";
              resp.state.from_card_title = true;
              return resp;
            });

            function func(_x51, _x52) {
              return _func24.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_card_text': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'card:text',
          x_all_hasparent: 'def_card',
          hint: 'Contenido de card de vuetify',
          func: function () {
            var _func25 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_text', node);
              resp.open += context.tagParams('v-card-text', params, false) + '\n';
              resp.close += "</v-card-text>\n";
              return resp;
            });

            function func(_x53, _x54) {
              return _func25.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_card_actions': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'card:action',
          x_all_hasparent: 'def_card',
          hint: 'Acciones de card de vuetify',
          func: function () {
            var _func26 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_actions', node);
              resp.open += context.tagParams('v-card-actions', params, false) + '\n';
              resp.close += "</v-card-actions>\n";
              return resp;
            });

            function func(_x55, _x56) {
              return _func26.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_card_media': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'card:media',
          x_all_hasparent: 'def_card',
          hint: 'Contenido multimedia para card de vuetify',
          func: function () {
            var _func27 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_media', node);

              if (context.x_state.es6) {
                resp.open += context.tagParams('v-img', params, false) + '\n';
                resp.close += "</v-img>\n";
              } else {
                resp.open += context.tagParams('v-card-media', params, false) + '\n';
                resp.close += "</v-card-media>\n";
              }

              return resp;
            });

            function func(_x57, _x58) {
              return _func27.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_card
        //*def_card_title
        //*def_card_text
        //*def_card_actions
        //*def_card_media
        // FORMs
        'def_form': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'form',
          attributes_aliases: {
            'v-model': 'valid,value'
          },
          hint: 'Formulario de vuetify',
          func: function () {
            var _func28 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form', node);
              resp.open += context.tagParams('v-form', params, false) + '\n';
              resp.close += "</v-form>\n";
              return resp;
            });

            function func(_x59, _x60) {
              return _func28.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_field': {
          x_level: '>2',
          x_icons: 'pencil',
          x_not_icons: 'calendar,clock,attach,freemind_butterfly',
          x_not_text_contains: 'google:',
          attributes_aliases: {
            'placeholder': 'hint,ayuda',
            'mark': 'mask,mascara,formato',
            'prepend-icon': 'pre:icon',
            'append-icon': 'post:icon',
            'type': 'type,tipo',
            'value': 'value,valor',
            'counter': 'counter,maxlen,maxlength,max'
          },
          hint: 'Campo de entrada (text,textarea,checkbox,radio,combo,select,switch,toogle,autocomplete) para usar en formulario vuetify',
          func: function () {
            var _func29 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {};
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field', node);
              tmp = _objectSpread2(_objectSpread2({}, {
                type: 'text'
              }), params); // add v-model as node.text

              if (node.text.contains('$')) {
                var vmodel = node.text.trim();
                vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                params['v-model'] = vmodel;
              } else if (node.text.trim() != '') {
                params['v-model'] = node.text.trim();
              } // render by type


              delete params.type;

              if (tmp.type == 'combo') {
                resp.open += context.tagParams('v-combobox', params, false) + '\n';
                resp.close += "</v-combobox>\n";
              } else if (tmp.type == 'toogle') {
                resp.open += context.tagParams('v-btn-toogle', params, false) + '\n';
                resp.close += "</v-btn-toogle>\n";
              } else if ('textarea,checkbox,radio,switch'.split(',').includes(tmp.type)) {
                resp.open += context.tagParams("v-".concat(tmp.type), params, false) + '\n';
                resp.close += "</v-".concat(tmp.type, ">\n");
              } else if ('autocomplete,autocompletar,auto,select'.split(',').includes(tmp.type)) {
                // item-text
                if ('item-text' in params && params['item-text'].contains('{{')) {
                  // suppport for values like '{{ name }} - ({{ tracks.total }})'
                  var new_val = params['item-text'];
                  var vars = context.dsl_parser.findVariables({
                    text: params['item-text'],
                    symbol: '{{',
                    symbol_closing: '}}',
                    array: true
                  }); // replace {{ x }} with {{ item.x }}

                  vars.map(old => {
                    new_val.replaceAll(old, "item.".concat(old.trim()));
                  }); // if starts with "{{ ", remove

                  if (new_val.slice(0, 3) == '{{ ') new_val = new_val.slice(3); // if ends with " }}", remove

                  if (new_val.slice(-3) == ' }}') {
                    new_val = new_val.slice(0, -3);
                  } else {
                    // add quote at the end
                    new_val += "'";
                  } // replace " }}" with "+'" and replace "{{ " with "'+"


                  new_val = new_val.replaceAll(' }}', "+'").replaceAll('{{ ', "'+"); // ready

                  params[':item-text'] = "(item)=>".concat(new_val);
                  delete params['item-text'];
                } else if ('item-text' in params && params['item-text'].contains(' ')) {
                  var _new_val = [];
                  params['item-text'].split(' ').map(nv => {
                    _new_val.push("item.".concat(nv));
                  });
                  params[':item-text'] = '(item)=>' + _new_val.join("+' '+");
                  delete params['item-text'];
                } // item-value


                if ('item-value' in params && params['item-value'].contains(' ')) {
                  var _new_val2 = [];
                  params['item-value'].split(' ').map(nv => {
                    _new_val2.push("item.".concat(nv));
                  });
                  params[':item-value'] = '(item)=>' + _new_val2.join("+' '+");
                  delete params['item-value'];
                } //


                if ('autocomplete,autocompletar,auto'.split(',').includes(tmp.type)) {
                  resp.open += context.tagParams('v-autocomplete', params, false) + '\n';
                  resp.close += "</v-autocomplete>\n";
                } else if (tmp.type == 'select') {
                  if ('item-value' in params === false && 'return-object' in params === false && ':return-object' in params === false) {
                    params[':return-object'] = true;
                  }

                  resp.open += context.tagParams('v-select', params, false) + '\n';
                  resp.close += '</v-select>\n';
                }
              } else {
                // text type or any other type
                if (tmp[':mask']) {
                  tmp['v-mask'] = tmp[':mask'];
                  delete tmp[':mask'];
                } else if (tmp['mask']) {
                  tmp['v-mask'] = "'".concat(tmp['mask'], "'");
                  delete tmp['mask'];
                }

                tmp = _objectSpread2(_objectSpread2({}, tmp), params);
                if (tmp[':type']) delete tmp.type;
                resp.open += context.tagParams('v-text-field', tmp, false) + '\n';
                resp.close += "</v-text-field>\n";
              } //event friendly name


              if (params.label) resp.state.friendly_name = params.label; // return

              return resp;
            });

            function func(_x61, _x62) {
              return _func29.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_field_image': {
          x_level: '>2',
          x_icons: 'pencil,attach',
          x_not_icons: 'calendar,clock,freemind_butterfly',
          x_not_text_contains: 'google:',
          hint: 'Campo de entrada de imagen (subir imagen) para usar en formulario vuetify',
          func: function () {
            var _func30 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field', node);
              params['refx'] = node.id; // add node.text (var) as image prefill

              if (node.text.trim() != '-') {
                if (node.text.contains('$')) {
                  var vmodel = node.text.trim();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                  params[':prefill'] = vmodel;
                } else {
                  params['prefill'] = node.text.trim();
                }
              } // image defaults


              params[':removable'] = false;
              params[':hideChangeButton'] = true; // add plugin

              context.x_state.plugins['vue-picture-input'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue-picture-input': '*'
                },
                tag: 'picture-input'
              };
              if (params.type) delete params.type; // write output

              resp.open += context.tagParams('picture-input', params, false) + '\n';
              resp.close = "</picture-input>\n";

              if (params.placeholder) {
                resp.state.friendly_name = params.placeholder;
              } else if (params.ref && params.ref.contains('ID_') == false) {
                resp.state.friendly_name = params.ref;
              }

              return resp;
            });

            function func(_x63, _x64) {
              return _func30.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_field_galery': {
          x_level: '>2',
          x_icons: 'pencil,freemind_butterfly',
          x_not_icons: 'calendar,clock,attach',
          x_not_text_contains: 'google:',
          hint: 'Campo de entrada de galeria de imagenes (elegir una o varias imagenes) para usar en formulario vuetify',
          func: function () {
            var _func31 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_galery', node);
              params['refx'] = node.id; // add node.text (var) as image prefill

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  //vmodel = vmodel.split(',').pop();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                }

                params['@onselectimage'] = "(item)=>".concat(vmodel, "=[item]");
                params['@onselectmultipleimage'] = "(item)=>".concat(vmodel, "=item");
                params[':selectedImages'] = vmodel;
              } // add plugin


              context.x_state.plugins['vue-select-image'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue-select-image': '*'
                },
                tag: 'vue-select-image',
                requires: ['vue-select-image/dist/vue-select-image.css']
              };
              if (params.type) delete params.type; // write output

              resp.open += context.tagParams('vue-select-image', params, false) + '\n';
              resp.close = "</vue-select-image>\n";
              return resp;
            });

            function func(_x65, _x66) {
              return _func31.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_field_date': {
          x_level: '>2',
          x_icons: 'pencil,calendar',
          x_not_icons: 'clock,attach,freemind_butterfly',
          x_not_text_contains: 'google:',
          hint: 'Campo de entrada con selector de fecha (sin hora) para usar en formulario vuetify',
          func: function () {
            var _func32 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_date', node);

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  //vmodel = vmodel.split(',').pop();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                }

                params['v-model'] = vmodel;
              } // add plugin


              context.x_state.npm['luxon'] = '*'; // for i18n support

              context.x_state.plugins['vue-datetime'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue-datetime': '*'
                }
              };
              params.type = 'date'; // write output

              resp.open += context.tagParams('datetime', params, false) + '\n';
              resp.close = "</datetime>\n";
              return resp;
            });

            function func(_x67, _x68) {
              return _func32.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_field_datetime': {
          x_level: '>2',
          x_icons: 'pencil,calendar,clock',
          x_not_icons: 'attach,freemind_butterfly',
          x_not_text_contains: 'google:',
          hint: 'Campo de entrada con selector de fecha y hora para usar en formulario vuetify',
          func: function () {
            var _func33 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_datetime', node);

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  //vmodel = vmodel.split(',').pop();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                }

                params['v-model'] = vmodel;
              } // add plugin


              context.x_state.plugins['vuetify-datetime-picker'] = {
                global: true,
                npm: {
                  'vuetify-datetime-picker': '2.0.3'
                },
                styles: [{
                  file: 'dtpicker.styl',
                  lang: 'styl',
                  content: "@require '~vuetify-datetime-picker/src/stylus/main.styl'"
                }]
              };
              if (params.type) delete params.type; // write output

              resp.open += context.tagParams('v-datetime-picker', params, false) + '\n';
              resp.close = "</v-datetime-picker>\n";
              return resp;
            });

            function func(_x69, _x70) {
              return _func33.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_form_google_autocomplete': {
          x_level: '>2',
          x_icons: 'pencil',
          x_text_contains: 'google:autocomplet',
          attributes_aliases: {
            'apiKey': 'key,llave',
            'language': 'lang,language,lenguaje',
            'id': 'id',
            'placeholder': 'hint,ayuda'
          },
          hint: 'Campo autocompletar para direcciones en formulario vuetify',
          func: function () {
            var _func34 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var config = {
                language: 'es'
              };
              var params = aliases2params('def_form_google_autocomplete', node);

              if (params.apiKey) {
                config.apiKey = params.apiKey;
                delete params.apiKey;
              }

              if (params.language) {
                config.language = params.language;
                delete params.language;
              }

              context.x_state.plugins['vuetify-google-autocomplete'] = {
                global: true,
                npm: {
                  'vuetify-google-autocomplete': '*'
                },
                config: JSON.stringify(config)
              }; // return output

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('vuetify-google-autocomplete', params, false) + '\n';
              resp.close = "</vuetify-google-autocomplete>\n";
              return resp;
            });

            function func(_x71, _x72) {
              return _func34.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_form
        //*def_form_field (ex. def_textfield)
        //*def_form_field_image
        //*def_form_field_galery
        //*def_form_field_date
        //*def_form_field_datetime
        //*def_form_google_autocomplete (ex. def_google_autocomplete) - IN @PROGRESS
        'def_margen': {
          x_icons: 'idea',
          x_text_contains: 'margen',
          hint: 'Define un margen alrededor del contenido',
          func: function () {
            var _func35 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_margen', node); // code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->\n");
              resp.open += context.tagParams('v-container', params, false) + '\n';
              resp.close += '</v-container>\n'; //

              return resp;
            });

            function func(_x73, _x74) {
              return _func35.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_contenedor': {
          x_icons: 'idea',
          x_text_contains: 'contenedor',
          x_level: '>2',
          hint: 'Vue Container',
          func: function () {
            var _func36 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_contenedor', node); // code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->\n");
              resp.open += context.tagParams('v-container', params, false) + '\n';
              resp.close = '</v-container>\n'; // return

              return resp;
            });

            function func(_x75, _x76) {
              return _func36.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_flex': {
          x_icons: 'idea',
          x_text_contains: 'flex',
          x_not_text_contains: ':',
          hint: 'Columna de ancho flexible',
          func: function () {
            var _func37 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id
              };
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->"); // process attributes

              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key];
                var keytest = key.toLowerCase().trim();
                var tvalue = value.toString().replaceAll('$variables', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$env.', 'process.env.').replaceAll('$store.', '$store.state.').trim();
                var numsize = 0;

                if (tvalue.indexOf('%') != -1) {
                  tvalue = parseInt(tvalue.replaceAll('%', '').trim());
                  numsize = Math.round(tvalue * 12 / 100);
                } // start testing attributes


                if (keytest == 'class') {
                  params.class = tvalue;
                } else if (keytest == 'props') {
                  for (var i of tvalue.split(' ')) {
                    params[i] = null;
                  }
                } else if ('padding,margen'.split(',').includes(keytest)) {
                  params['pa-' + tvalue] = null;
                } else if (keytest == 'ancho') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys("xs-".concat(numsize, ",sm-").concat(numsize, ",md-").concat(numsize, ",lg-").concat(numsize), null));
                } else if (keytest == 'offset') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys("offset-xs-".concat(numsize, ",offset-sm-").concat(numsize, ",offset-md-").concat(numsize, ",offset-lg-").concat(numsize), null));
                } else if ('muy chico,movil,small,mobile'.split(',').includes(keytest)) {
                  params["xs".concat(numsize)] = null;
                } else if ('chico,tablet,small,tableta'.split(',').includes(keytest)) {
                  params["sm".concat(numsize)] = null;
                } else if ('medio,medium,average'.split(',').includes(keytest)) {
                  params["md".concat(numsize)] = null;
                } else if ('grande,pc,desktop,escritorio'.split(',').includes(keytest)) {
                  params["lg".concat(numsize)] = null;
                } else if ('xfila:grande,xfila:pc,xfila:desktop,pc,escritorio,xfila:escritorio'.split(',').includes(keytest)) {
                  params["lg".concat(Math.round(12 / tvalue))] = null;
                } else if ('xfila:medio,xfila:tablet,tablet,xfila'.split(',').includes(keytest)) {
                  params["md".concat(Math.round(12 / tvalue))] = null;
                } else if ('xfila:chico,xfila:movil,xfila:mobile'.split(',').includes(keytest)) {
                  params["sm".concat(Math.round(12 / tvalue))] = null;
                } else if ('xfila:muy chico,xfila:movil chico,xfila:small mobile'.split(',').includes(keytest)) {
                  params["xs".concat(Math.round(12 / tvalue))] = null;
                } else if ('muy chico:offset,movil:offset,small:offset,mobile:offset'.split(',').includes(keytest)) {
                  params["offset-xs".concat(Math.round(12 / tvalue))] = null;
                } else if ('chico:offset,tablet:offset,small:offset,tableta:offset'.split(',').includes(keytest)) {
                  params["offset-sm".concat(Math.round(12 / tvalue))] = null;
                } else if ('medio:offset,medium:offset,average:offset'.split(',').includes(keytest)) {
                  params["offset-md".concat(Math.round(12 / tvalue))] = null;
                } else if ('grande:offset,pc:offset,desktop:offset,escritorio:offset,grande:left'.split(',').includes(keytest)) {
                  params["offset-lg".concat(Math.round(12 / tvalue))] = null;
                } else {
                  if (keytest.charAt(0) != ':' && value != '' && value != tvalue) {
                    params[':' + key.trim()] = tvalue;
                  } else {
                    params[key.trim()] = tvalue;
                  }
                }
              }); // write tag

              resp.open += context.tagParams('v-col', params, false) + '\n';
              resp.close = '</v-col>\n'; // return

              return resp;
            });

            function func(_x77, _x78) {
              return _func37.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_spacer': {
          x_icons: 'idea',
          x_text_contains: 'spacer',
          x_level: '>2',
          hint: 'Spacer es un espaciador flexible',
          func: function () {
            var _func38 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-spacer', {}, true) + '\n';
              return resp;
            });

            function func(_x79, _x80) {
              return _func38.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_progress': {
          x_icons: 'idea',
          x_text_contains: 'progres',
          x_not_text_contains: 'html:',
          x_level: '>2',
          attributes_aliases: {
            'background-color': 'background-color,background',
            'background-opacity': 'background-opacity,opacity',
            'buffer-value': 'max,max-value',
            'value': 'value,valor',
            'indeterminate': 'loop,infinito',
            'width': 'width,ancho',
            'size': 'size,porte',
            'rotate': 'rotate,rotar'
          },
          hint: 'Item de progreso',
          func: function () {
            var _func39 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                tipo: 'circular'
              };
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->"); // process our own attributes_aliases to normalize node attributes

              var params = aliases2params('def_progress', node);
              Object.keys(params).map(function (key) {
                // take into account special cases
                if (key.toLowerCase() == 'tipo' && 'lineal,linea,linear'.split(',').includes(params[key])) {
                  tmp.tipo = 'linear';
                  delete params[key];
                } else if (key.toLowerCase() == 'indeterminate') {
                  params[":".concat(key)] = params[key];
                  delete params[key];
                }
              }); // write tag

              resp.open += context.tagParams("v-progress-".concat(tmp.tipo), params, false) + '\n';
              resp.close = "</v-progress-".concat(tmp.tipo, ">\n"); // return

              return resp;
            });

            function func(_x81, _x82) {
              return _func39.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_dialog': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'dialog',
          x_not_text_contains: 'boton:',
          attributes_aliases: {
            'width': 'width,ancho',
            'max-width': 'max-width,ancho-max,max-ancho'
          },
          hint: 'Dialogo de vuetify',
          func: function () {
            var _func40 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_dialog', node);

              if (params[':visible']) {
                params['v-model'] = params[':visible'];
                delete params[':visible'];
              }

              if (params.visible) {
                params['v-model'] = params.visible;
                delete params.visible;
              } // write tag


              resp.open += context.tagParams('v-dialog', params, false) + '\n';
              resp.close += "</v-dialog>\n";
              return resp;
            });

            function func(_x83, _x84) {
              return _func40.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_center': {
          x_icons: 'idea',
          x_text_contains: 'centrar',
          hint: 'Centra nodos hijos',
          func: function () {
            var _func41 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id,
                class: 'text-xs-center'
              };
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open = context.tagParams('div', params, false) + '<center>\n';
              resp.close += '</center></div>\n';
              return resp;
            });

            function func(_x85, _x86) {
              return _func41.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_html': {
          x_icons: 'idea',
          x_text_contains: 'html:',
          hint: 'html:x, donde x es cualquier tag',
          func: function () {
            var _func42 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_html', node); // parse attributes

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var tag = node.text.replace('html:', '');

              if (node.nodes_raw && node.nodes_raw.length > 0) {
                var tmp = yield node.getNodes({
                  recurse: false
                });
                var has_only_events = true;

                for (var x of tmp) {
                  if (x.icons.includes('help') == false) {
                    has_only_events = false;
                    break;
                  }

                  yield setImmediatePromise$1(); //@improved
                }

                if (!has_only_events) {
                  // this tag has real children
                  resp.open += context.tagParams(tag, params, false) + '\n';
                  resp.close += "</".concat(tag, ">\n");
                } else {
                  // has only ghost childs (self-close)
                  resp.open += context.tagParams(tag, params, true) + '\n';
                }
              } else {
                // doesn't have children nodes (self-close)
                resp.open += context.tagParams(tag, params, true) + '\n';
              }

              resp.state.friendly_name = tag;
              return resp;
            });

            function func(_x87, _x88) {
              return _func42.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_textonly': {
          x_level: '>2',
          x_empty: 'icons',
          x_priority: -5,
          x_or_hasparent: 'def_page,def_componente,def_layout',
          // @TODO (idea) x_not_hasparent: 'def_toolbar+!def_slot,def_variables,def_page_estilos,def_page_estilos', 
          hint: 'Texto a mostrar',
          func: function () {
            var _func43 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }),
                  params = {
                refx: node.id,
                class: []
              },
                  tmp = {};
              var base_text = node.text;

              if (node.text_rich != '') {
                base_text = node.text_rich;
              }

              var text = base_text.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env.').replaceAll('$store.', '$store.state.');
              if (text == '') text = '&nbsp;'; // some extra validation

              if (state.from_toolbar && !state.from_slot) {
                return _objectSpread2(_objectSpread2({}, resp), {
                  valid: false
                });
              } else if (state.from_datatable_headers && !state.from_slot && !state.from_datatable_fila) {
                return _objectSpread2(_objectSpread2({}, resp), {
                  valid: false
                });
              } else if (state.from_variables) {
                return _objectSpread2(_objectSpread2({}, resp), {
                  valid: false
                });
              } else if (state.from_estilos) {
                return _objectSpread2(_objectSpread2({}, resp), {
                  valid: false
                });
              } else {
                if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->\n"); //

                if (node.text.indexOf('..lorem..') != -1 && node.text.indexOf(':') != -1) {
                  //lorem ipsum text
                  var lorem = node.text.split(':');
                  tmp.lorem = lorem[lorem.length - 1];
                }

                if (node.text.indexOf('numeral(') != -1) {
                  //numeral() filter
                  context.x_state.plugins['vue-numeral-filter'] = {
                    global: true,
                    npm: {
                      'vue-numeral-filter': '*'
                    },
                    mode: 'client',
                    config: "{ locale: 'es-es' }"
                  };
                } //node styles


                if (node.text_rich == '') {
                  if (node.font.bold == true) params.class.push('font-weight-bold');
                  if (node.font.size <= 10) params.class.push('caption');
                  if (node.font.italic == true) params.class.push('font-italic');
                } // - process attributes


                Object.keys(node.attributes).map(function (key) {
                  var keytest = key.toLowerCase().trim();
                  var value = node.attributes[key];

                  if (keytest == 'class') {
                    params.class.push(value);
                  } else if (keytest == ':span') {
                    tmp.span = true;
                  } else if (keytest == ':omit') {
                    tmp.omit = true;
                  } else if (':length,:largo,len,length,largo'.split(',').includes(key)) {
                    tmp.lorem = value;
                  } else if (key == 'small') {
                    tmp.small = true;
                  } else if ('ucase,mayusculas,mayuscula'.split(',').includes(key)) {
                    if (value == 'true' || value == true) params.class.push('text-uppercase');
                  } else if ('capitales,capitalize,capital'.split(',').includes(key)) {
                    if (value == 'true' || value == true) params.class.push('text-capitalize');
                  } else if ('lcase,minusculas,minuscula'.split(',').includes(key)) {
                    if (value == 'true' || value == true) params.class.push('text-lowercase');
                  } else if (key == 'truncate') {
                    if (value == 'true' || value == true) params.class.push('text-truncate');
                  } else if (key == 'no-wrap') {
                    if (value == 'true' || value == true) params.class.push('text-no-wrap');
                  } else if ('weight,peso,grosor'.split(',').includes(key)) {
                    var valuetest = value.toLowerCase();

                    if ('thin,fina,100'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-thin');
                    } else if ('light,300'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-light');
                    } else if ('regular,400'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-light');
                    } else if ('medium,500'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-medium');
                    } else if ('bold,700'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-bold');
                    } else if ('black,gruesa,900'.split(',').includes(valuetest)) {
                      params.class.push('font-weight-black');
                    }
                  } else if (key == 'color') {
                    if (value.indexOf(' ') != -1) {
                      var color_values = value.split(' ');
                      params.class.push("".concat(color_values[0], "--text text--").concat(color_values[1]));
                    } else {
                      params.class.push("".concat(value, "--text"));
                    }
                  } else if (key == 'align') {
                    var _valuetest = value.toLowerCase();

                    if ('center,centro,centrar'.split(',').includes(_valuetest)) {
                      params.class.push('text-xs-center');
                    } else if ('right,derecha'.split(',').includes(_valuetest)) {
                      params.class.push('text-xs-right');
                    } else if ('left,izquierda,izquierdo'.split(',').includes(_valuetest)) {
                      params.class.push('text-xs-left');
                    } else if ('justify,justificar,justificado'.split(',').includes(_valuetest)) {
                      tmp.jstyle = 'text-align: justify; text-justify: inter-word;';

                      if (params.style) {
                        params.style = params.style.split(';').push(tmp.jstyle).join(';');
                      } else {
                        params.style = tmp.jstyle;
                      }
                    }
                  } else if (key == 'style') {
                    if (!params.style) params.styles = [];
                    params.styles.push(value);
                  } else {
                    if (key.charAt(0) != ':' && node.text != '' && text != node.text) {
                      params[':' + key] = value;
                    } else {
                      params[key] = value;
                    }
                  }
                }); // - generate lorem.. ipsum text if within text

                if (tmp.lorem) {
                  var loremIpsum = require('lorem-ipsum').loremIpsum;

                  text = loremIpsum({
                    count: parseInt(tmp.lorem),
                    units: 'words'
                  });
                } // - @TODO i18n here
                // - tmp.small


                if (tmp.small) {
                  text = "<small>".concat(text, "</small>");
                } // - normalize class values (depending on vuetify version)


                params.class = params.class.map(function (x) {
                  var resp = x;
                  resp.replaceAll('text-h1', 'display-4').replaceAll('text-h2', 'display-3').replaceAll('text-h3', 'display-2').replaceAll('text-h4', 'display-1').replaceAll('text-h5', 'headline').replaceAll('text-subtitle-1', 'subtitle-1').replaceAll('text-subtitle-2', 'subtitle-2').replaceAll('text-h6', 'title').replaceAll('text-body-1', 'body-1').replaceAll('text-body-2', 'body-2').replaceAll('text-caption', 'caption').replaceAll('text-overline', 'overline');
                  return resp;
                }); //normalize params

                if (params.class && params.class.length == 0) delete params.class;
                if (params.class && params.class.length > 0) params.class = params.class.join(' ');
                if (params.style) params.styles = params.styles.join(';'); //write code

                if (!tmp.omit) {
                  if (tmp.span && tmp.span == true) {
                    resp.open += context.tagParams('span', params) + text + '</span>\n';
                  } else if (state.from_card_title && !params.class) {
                    resp.open += text + '\n';
                  } else {
                    resp.open += context.tagParams('div', params) + text + '</div>\n';
                  }
                } //

              } // return


              resp.state.from_textonly = true;
              return resp;
            });

            function func(_x89, _x90) {
              return _func43.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_tag': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'tag:',
          attributes_aliases: {
            'option': 'config'
          },
          hint: 'Indica que se desea usar un custom tag en el lugar y que se desea instalarlo con la configuración de sus atributos de prefijo :.',
          func: function () {
            var _func44 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                install: {
                  config: {},
                  npm_version: '*',
                  extra_imports: []
                },
                tag: node.text.replaceAll('tag:', '').trim()
              }; //params

              var attrs = {
                mode: 'client',
                config: {},
                extra_imports: []
              };
              Object.keys(node.attributes).map(function (key) {
                var keytest = key.toLowerCase().trim();
                var value = node.attributes[key].trim();

                if (node.icons.includes('bell') && value.contains('**')) {
                  value = getTranslatedTextVar(value, true);
                } else if (value.contains('assets:')) {
                  value = context.getAsset(value, 'js');
                } else {
                  // normalize vue type vars
                  {
                    value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env.').replaceAll('$store.', '$store.state.');
                  }
                }

                if (keytest == 'props') {
                  value.split(' ').map(x => {
                    attrs[x] = null;
                  });
                } //


                if (keytest.contains(':option:') || keytest.contains(':config:')) {
                  var tkey = keytest.replaceAll(':option:', '').replaceAll(':config:', '').trim();
                  attrs.config[tkey] = value;
                } else if (keytest.contains(':use')) {
                  attrs.use = value;
                } else if (keytest.contains(':import')) {
                  attrs.extra_imports.push(value);
                } else if (keytest.contains(':mode')) {
                  attrs.mode = value;
                } else if (keytest == ':npm') {
                  var original = value;
                  value = {
                    npm: value,
                    version: '*'
                  };

                  if (original.contains(',')) {
                    value.npm = original.split(',')[0].trim();
                    value.version = original.split(',').pop().trim();
                  }

                  attrs.npm = value;
                } else {
                  attrs[key] = value;
                }
              });
              if (!attrs.npm) throw "the required attribute :npm is missing! Please specify it."; // install plugin

              context.x_state.npm[attrs.npm.npm] = attrs.npm.version;
              context.x_state.plugins[attrs.npm.npm] = {
                global: true,
                npm: {
                  [attrs.npm.npm]: attrs.npm.version
                },
                mode: attrs.mode,
                extra_imports: attrs.extra_imports,
                config: attrs.config
              };
              if (attrs.use) context.x_state.plugins[attrs.npm.npm].customvar = tmp.tag.toLowerCase();
              if (Object.keys(attrs.config) == '') delete context.x_state.plugins[attrs.npm.npm].config; //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              delete attrs.npm;
              delete attrs.mode;
              delete attrs.use;
              delete attrs.extra_imports;
              delete attrs.config;
              resp.open += context.tagParams(tmp.tag, attrs, false) + '\n';
              resp.close += "</".concat(tmp.tag, ">\n");
              return resp;
            });

            function func(_x91, _x92) {
              return _func44.apply(this, arguments);
            }

            return func;
          }()
        },
        //..views..
        //*def_center
        //*def_html
        //def_tag
        //*def_textonly
        //*def_margen
        //*def_contenedor
        //*def_flex
        //*def_spacer
        //*def_progress
        //*def_dialog
        'def_avatar': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'avatar',
          x_not_text_contains: 'fila',
          hint: 'Imagen con mascara redondeada',
          func: function () {
            var _func45 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_avatar', node);
              var img_params = {}; // move :src to img src

              if (params.src) {
                img_params.src = params.src;
                delete params.src;
              }

              if (params[':src']) {
                img_params[':src'] = params[':src'];
                delete params[':src'];
              } // write tag


              resp.open += context.tagParams('v-avatar', params, false) + '\n';
              resp.open += context.tagParams('v-img', img_params, true) + '\n';
              resp.close += "</v-avatar>\n";
              return resp;
            });

            function func(_x93, _x94) {
              return _func45.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_boton': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'boton:',
          hint: 'Boton de vuetify',
          func: function () {
            var _func46 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_boton', node); // special cases
              // targets a scroll position ?

              if (params.scrollto) {
                context.x_state.plugins['vue-scrollto'] = {
                  global: true,
                  npm: {
                    'vue-scrollto': '*'
                  },
                  mode: 'client'
                };

                if (params.scrollto.contains(',')) {
                  var element = params.scrollto.split(',')[0];
                  var offset = params.scrollto.split(',').pop().trim();
                  params['v-scroll-to'] = "{ element:'".concat(element, "', offset:").concat(offset, ", cancelable:false }");
                } else {
                  params['v-scroll-to'] = "{ element:'".concat(params.scrollto, "', cancelable:false }");
                }

                delete params.scrollto;
              } // re-map props from older version of vuetify props to ones used here


              if ('flat' in params && params.flat == null) {
                params.text = null;
                delete params.flat;
              }

              if ('round' in params && params.round == null) {
                params.rounded = null;
                delete params.round;
              } // pre-process text


              var text = node.text.trim().replaceAll('boton:', '');

              if (context.x_state.central_config.idiomas.indexOf(',') != -1) {
                // text uses i18n keys
                var def_lang = context.x_state.central_config.idiomas.split(',')[0];

                if (!context.x_state.strings_i18n[def_lang]) {
                  context.x_state.strings_i18n[def_lang] = {};
                }

                var crc32 = 't_' + context.hash(text);
                context.x_state.strings_i18n[def_lang][crc32] = text;
                text = "{{ $t('".concat(crc32, "') }}");
              } else if (text.contains('$') && text.contains('{{') && text.contains('}}')) {
                text = text.replaceAll('$params.', '').replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$store.', '$store.state.');
              } // write tag


              resp.open += context.tagParams('v-btn', params, false) + text + '\n';
              resp.close += "</v-btn>\n"; //event friendly name

              resp.state.friendly_name = text;
              return resp;
            });

            function func(_x95, _x96) {
              return _func46.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_chip': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'chip:',
          hint: 'Chip de vuetify',
          func: function () {
            var _func47 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_chip', node); // pre-process text

              var text = node.text.trim().replaceAll('chip:', '');

              if (context.x_state.central_config.idiomas.indexOf(',') != -1) {
                // text uses i18n keys
                var def_lang = context.x_state.central_config.idiomas.split(',')[0];

                if (!context.x_state.strings_i18n[def_lang]) {
                  context.x_state.strings_i18n[def_lang] = {};
                }

                var crc32 = 't_' + context.hash(text);
                context.x_state.strings_i18n[def_lang][crc32] = text;
                text = "{{ $t('".concat(crc32, "') }}");
              } else if (text.contains('$') && text.contains('{{') && text.contains('}}')) {
                text = text.replaceAll('$params.', '').replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$store.', '$store.state.');
              } // write tag


              resp.open += context.tagParams('v-chip', params, false) + "".concat(text, "\n");
              resp.close += "</v-chip>\n";
              resp.state.friendly_name = text;
              if (text.contains('{{')) resp.state.friendly_name = 'chip';
              return resp;
            });

            function func(_x97, _x98) {
              return _func47.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_avatar
        //*def_boton
        //*def_chip
        'def_menu': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'menu',
          x_not_text_contains: ':',
          hint: 'Barra de contenido escondible para menu de vuetify',
          func: function () {
            var _func48 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_menu', node); // special cases

              if (params.visible) {
                params['v-model'] = params.visible;
                delete params.visible;
              } // write tag


              resp.open += context.tagParams('v-menu', params, false) + "\n";
              resp.close += "</v-menu>\n";
              return resp;
            });

            function func(_x99, _x100) {
              return _func48.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_barralateral': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'lateral',
          x_not_text_contains: ':',
          hint: 'Barra lateral (normalmente para un menu) escondible de vuetify',
          func: function () {
            var _func49 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_barralateral', node); // special cases

              if (params.visible) {
                params['v-model'] = params.visible;
                delete params.visible;
              }

              if (params[':visible']) {
                params['v-model'] = params[':visible'];
                delete params[':visible'];
              } // write tag


              resp.open += context.tagParams('v-navigation-drawer', params, false) + "\n";
              resp.close += "</v-navigation-drawer>\n";
              return resp;
            });

            function func(_x101, _x102) {
              return _func49.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_barrainferior': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: 'inferior',
          x_not_text_contains: ':',
          hint: 'Barra inferior escondible de vuetify',
          func: function () {
            var _func50 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_barrainferior', node); // special cases

              if (params.visible) {
                params['v-model'] = params.visible;
                delete params.visible;
              } // write tag


              resp.open += context.tagParams('v-bottom-sheet', params, false) + "\n";
              resp.close += "</v-bottom-sheet>\n";
              return resp;
            });

            function func(_x103, _x104) {
              return _func50.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_menu
        //*def_barralateral
        //*def_barrainferior
        'def_contenido': {
          x_level: 3,
          x_icons: 'idea',
          x_text_exact: 'contenido',
          x_or_hasparent: 'def_page,def_componente',
          hint: 'Contenido de pagina o componente vuetify',
          func: function () {
            var _func51 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_contenido', node); // write tag

              resp.open += context.tagParams('v-main', params, false) + "\n";
              resp.close += "</v-main>\n";
              return resp;
            });

            function func(_x105, _x106) {
              return _func51.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_toolbar': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'toolbar',
          attributes_aliases: {
            'icon': 'icon,icono'
          },
          hint: 'Barra superior o toolbar vuetify que permite auto-alinear un titulo, botones, etc.',
          func: function () {
            var _func52 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {};
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_toolbar', node); // special cases

              if (params[':icon']) {
                tmp.icon = "{{ ".concat(params[':icon'], " }}");
                delete params[':icon'];
              } else if (params.icon) {
                tmp.icon = params.icon.toLowerCase().trim();
                delete params.icon;
              } // write tag


              resp.open += context.tagParams('v-app-bar', params, false) + "\n";

              if (tmp.icon && tmp.icon != '') {
                resp.open += "<v-btn icon><v-icon>".concat(tmp.icon, "</v-icon></v-btn>\n");
              } else if (tmp.icon && tmp.icon == '') {
                resp.open += "<v-app-bar-nav-icon></<v-app-bar-nav-icon>\n";
              }

              resp.close = "</v-app-bar>\n";
              resp.state.from_toolbar = true;
              return resp;
            });

            function func(_x107, _x108) {
              return _func52.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_toolbar_title': {
          x_level: '>3',
          x_empty: 'icons',
          x_all_hasparent: 'def_toolbar',
          attributes_aliases: {
            'grosor': 'weight,peso,grosor'
          },
          hint: 'Titulo para nodo toolbar',
          func: function () {
            var _func53 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_toolbar_title', node); // special cases

              if (params.color) {
                if (!params.class) params.class = '';
                var tmp = params.class.split(' ');

                if (params.color.contains(' ')) {
                  var name = params.color.split(' ')[0];
                  var tint = params.color.split(' ').pop();
                  tmp.push("".concat(name, "--text text--").concat(tint));
                } else {
                  tmp.push("".concat(params.color, "--text"));
                }

                params.class = tmp.join(' ');
                delete params.color;
              }

              if (params.grosor) {
                if (params.class) params.class = params.class.split(' ');
                if (!params.class) params.class = [];
                var valuetest = params.grosor.toLowerCase();

                if ('thin,fina,100'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-thin');
                } else if ('light,300'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-light');
                } else if ('regular,400'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-light');
                } else if ('medium,500'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-medium');
                } else if ('bold,700'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-bold');
                } else if ('black,gruesa,900'.split(',').includes(valuetest)) {
                  params.class.push('font-weight-black');
                }

                params.class = params.class.join(' ');
                delete params.grosor;
              } // process title (node.text)


              var text = node.text.trim();

              if (context.x_state.central_config.idiomas.indexOf(',') != -1) {
                // text uses i18n keys
                var def_lang = context.x_state.central_config.idiomas.split(',')[0];

                if (!context.x_state.strings_i18n[def_lang]) {
                  context.x_state.strings_i18n[def_lang] = {};
                }

                var crc32 = 't_' + context.hash(text);
                context.x_state.strings_i18n[def_lang][crc32] = text;
                text = "{{ $t('".concat(crc32, "') }}");
              } else if (text.contains('$') && text.contains('{{') && text.contains('}}')) {
                text = text.replaceAll('$params.', '').replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$store.', '$store.state.');
              } // write output


              resp.open += context.tagParams('v-toolbar-title', params, false) + text + '\n';
              resp.close = '</v-toolbar-title>\n';
              return resp;
            });

            function func(_x109, _x110) {
              return _func53.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_layout_custom': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'layout',
          x_not_text_contains: ':',
          hint: 'Layout (custom)',
          func: function () {
            var _func54 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_layout_custom', node);
              resp.open += context.tagParams('v-layout', params, true);
              return resp;
            });

            function func(_x111, _x112) {
              return _func54.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_divider': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_contains: '---',
          hint: 'Divisor, separador visual',
          func: function () {
            var _func55 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_divider', node);
              resp.open += context.tagParams('v-divider', params, true);
              return resp;
            });

            function func(_x113, _x114) {
              return _func55.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_slot': {
          x_level: '>2',
          x_icons: 'list',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Template slot; nombre o nombre=valor',
          func: function () {
            var _func56 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_slot', node);

              if (node.text.contains('=')) {
                var extract = require('extractjs')();

                var elements = extract("{name}={value}", node.text); //@todo test this after def_datatable exists

                if (state.from_datatable) {
                  if (elements.name == 'items') {
                    elements.name = 'item';
                  } else if (elements.name == 'headers') {
                    elements.name = 'header';
                  } else if (elements.name == 'expand') {
                    elements.name = 'expanded-item';
                  }
                }

                params["v-slot:".concat(elements.name)] = elements.value;
              } else {
                params["v-slot:".concat(node.text.trim())] = null;
              }

              resp.open += context.tagParams('template', params, false) + '\n';
              resp.close = '</template>\n';
              resp.state.from_slot = true;
              return resp;
            });

            function func(_x115, _x116) {
              return _func56.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_div': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'div',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'HTML div/bloque',
          func: function () {
            var _func57 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_div', node);
              resp.open += context.tagParams('div', params, false) + '\n';
              resp.close = '</div>';
              return resp;
            });

            function func(_x117, _x118) {
              return _func57.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_agrupar': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'agrupar',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Agrupa elementos flex hijos horizontalmente',
          func: function () {
            var _func58 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_agrupar', node);

              if (params.centrar && params.centrar == true) {
                params['justify-center'] = null;
                params['align-center'] = null;
                delete params.centrar;
              }

              resp.open += context.tagParams('v-row', params, false) + '\n';
              resp.close = '</v-row>';
              return resp;
            });

            function func(_x119, _x120) {
              return _func58.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_bloque': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'bloque',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Bloque; una fila de algo en bloque completo',
          func: function () {
            var _func59 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              var params = aliases2params('def_bloque', node);
              params.column = null;

              if (params.centrar && params.centrar == true) {
                params['justify-center'] = null;
                params['align-center'] = null;
                delete params.centrar;
              }

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-layout', params, false) + '\n';
              resp.close = '</v-layout>';
              return resp;
            });

            function func(_x121, _x122) {
              return _func59.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_hover': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'hover',
          hint: 'Crea variable $hover con true si usuario posa mouse sobre su hijo',
          func: function () {
            var _func60 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_hover', node);
              resp.open += context.tagParams('v-hover', params, false) + '\n';
              resp.close = '</v-hover>';
              return resp;
            });

            function func(_x123, _x124) {
              return _func60.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_tooltip': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'tooltip',
          attributes_aliases: {
            'texto': 'texto,text,:text,:texto',
            'class': 'class,:class'
          },
          hint: 'Muestra el mensaje definido cuando se detecta mouse sobre sus hijos',
          func: function () {
            var _func61 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_tooltip', node, false, 'this.');
              var tmp = {
                text: '',
                params_span: {}
              };
              if (params.texto) tmp.text = params.texto;

              if (tmp.text.contains('this.') && tmp.text.contains('{{') == false) {
                tmp.text = "{{ ".concat(tmp.text, " }}");
              }

              delete params.texto;

              if (params.class) {
                tmp.params_span.class = params.class;
                delete params.class;
              } else if (params[':class']) {
                tmp.params_span[':class'] = params.class;
                delete params[':class'];
              } //code


              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-tooltip', params, false) + '\n';
              resp.open += context.tagParams('template', {
                'v-slot:activator': '{ on }'
              }, false) + '\n';
              resp.close = '</template>';
              resp.close += context.tagParams('span', tmp.params_span, false) + tmp.text + '</span>\n';
              resp.close += '</v-tooltip>';
              return resp;
            });

            function func(_x125, _x126) {
              return _func61.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_datatable': {
          x_level: '>2',
          x_icons: 'idea',
          x_text_exact: 'tabla',
          attributes_aliases: {
            'drag': 'draggable,:draggable,sort,:sort,drag,:drag,manilla,:manilla',
            'class': 'class,:class',
            'width': 'width,ancho',
            'height': 'height,alto',
            'items-per-page-text': 'rows-per-page-text'
          },
          hint: 'Dibuja una tabla con datos.',
          func: function () {
            var _func62 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_datatable', node);

              if (params.drag && params[':items']) {
                //install sortablejs plugin
                params.ref = node.id;
                context.x_state.pages[state.current_page].imports.sortablejs = 'Sortable';
                resp.open += "<vue_mounted><!--\n                    let tabla_".concat(node.id, " = this.$refs.").concat(node.id, ".$el.getElementsByTagName('tbody')[0];\n                    const _self = this;\n                    Sortable.create(tabla_").concat(node.id, ", {\n                        handle: '.").concat(params.drag, "',\n                        onEnd({ newIndex, oldIndex }) {\n                            const rowSelected = _self.").concat(params[':items'], ".splice(oldIndex,1)[0];\n                            _self.").concat(params[':items'], ".splice(newIndex,0,rowSelected);\n                        }\n                    });\n                    --></vue_mounted>");
                delete params.drag;
              } //pass header name/id for headers future var


              resp.state.datatable_id = node.id + '_headers';
              params[':headers'] = resp.state.datatable_id; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-data-table', params, false) + '\n';
              resp.close = '</v-data-table>';
              resp.state.friendly_name = 'table';
              resp.state.from_datatable = true;
              return resp;
            });

            function func(_x127, _x128) {
              return _func62.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_datatable_headers': {
          x_level: '>3',
          x_icons: 'edit',
          x_text_exact: 'headers',
          x_all_hasparent: 'def_datatable',
          hint: 'Define los titulos de las columnas de la tabla padre y sus propiedades.',
          func: function () {
            var _func63 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              context.x_state.pages[state.current_page].variables[resp.state.datatable_id] = [];
              context.x_state.pages[state.current_page].var_types[resp.state.datatable_id] = 'array';
              resp.state.from_datatable_headers = true;
              return resp;
            });

            function func(_x129, _x130) {
              return _func63.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_datatable_headers_title': {
          x_level: '>4',
          x_empty: 'icons',
          x_all_hasparent: 'def_datatable_headers',
          attributes_aliases: {
            'value': 'value,campo',
            'sortable': 'orden,ordenable,sortable',
            'ucase': 'ucase,mayusculas,mayuscula',
            'capital': 'capitales,capitalize,capital',
            'lcase': 'lcase,minusculas,minuscula',
            'nowrap': 'no-wrap',
            'weight': 'weight,peso,grosor',
            'fontsize': 'font,size'
          },
          hint: 'Define las propiedades del titulo de una columna de la tabla padre.',
          func: function () {
            var _func64 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_datatable_headers_title', node);
              var item = {
                class: [],
                text: node.text.trim()
              };
              if (params.class) item.class = params.class.split(' ');
              if (node.font.size <= 10) item.class.push('caption');
              if (node.font.bold == true) item.class.push('font-weight-bold');
              if (node.font.italic == true) item.class.push('font-italic');
              if (params.value) item.value = params.value;
              if (params.sortable) item.sortable = params.sortable;
              if (params.ucase && params.ucase == true) item.class.push('text-uppercase');
              if (params.capital && params.capital == true) item.class.push('text-capitalize');
              if (params.lcase && params.lcase == true) item.class.push('text-lowercase');
              if (params.truncate && params.truncate == true) item.class.push('text-truncate');
              if (params.nowrap && params.nowrap == true) item.class.push('text-no-wrap');
              if (params.fontsize) item.class.push(params.fontsize);

              if (params.weight) {
                if ('thin,fina,100'.includes(params.weight)) item.class.push('font-weight-thin');
                if ('light,300'.includes(params.weight)) item.class.push('font-weight-light');
                if ('regular,400'.includes(params.weight)) item.class.push('font-weight-regular');
                if ('medium,500'.includes(params.weight)) item.class.push('font-weight-medium');
                if ('bold,700'.includes(params.weight)) item.class.push('font-weight-bold');
                if ('black,gruesa,900'.includes(params.weight)) item.class.push('font-weight-black');
              } //


              delete params.class;
              delete params.refx;
              delete params.value;
              delete params.sortable;
              delete params.ucase;
              delete params.capital;
              delete params.lcase;
              delete params.truncate;
              delete params.nowrap;
              delete params.weight;
              delete params.fontsize;
              item = _objectSpread2(_objectSpread2({}, item), params);
              item.class = item.class.join(' ');
              if (item.class.trim() == '') delete item.class; //assign struct to datatable header var

              if (resp.state.datatable_id) {
                context.x_state.pages[state.current_page].variables[resp.state.datatable_id].push(item);
                context.x_state.pages[state.current_page].var_types["".concat(resp.state.datatable_id, "[").concat(context.x_state.pages[state.current_page].variables[resp.state.datatable_id].length - 1, "]")] = typeof item;
              }

              return resp;
            });

            function func(_x131, _x132) {
              return _func64.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_datatable_fila': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'fila',
          x_all_hasparent: 'def_datatable',
          hint: 'Crea una nueva fila en la tabla padre.',
          func: function () {
            var _func65 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_datatable_fila', node, true); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('tr', params, false) + '\n';
              resp.close = '</tr>';
              resp.state.friendly_name = 'row';
              resp.state.from_datatable_fila = true;
              return resp;
            });

            function func(_x133, _x134) {
              return _func65.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_datatable_col': {
          x_level: '>4',
          x_icons: 'idea',
          x_text_exact: 'columna',
          hint: 'Agrupa sus hijos en una columna de una tabla.',
          func: function () {
            var _func66 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_datatable_fila) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              });
              var params = aliases2params('def_datatable_col', node, true); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('td', params, false) + '\n';
              resp.close = '</td>';
              resp.state.friendly_name = 'column';
              return resp;
            });

            function func(_x135, _x136) {
              return _func66.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_contenido
        //*def_toolbar
        //*def_toolbar_title
        //**def_layout_custom - @todo needs testing
        //**def_divider
        //**def_slot
        //**def_div
        //**def_agrupar
        //**def_bloque
        //**def_hover
        //**def_tooltip
        //**def_datatable 
        //**def_datatable_headers
        //**def_datatable_headers_title
        //**def_datatable_fila
        //**def_datatable_col
        'def_paginador': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_contains: 'paginador,,',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          attributes_aliases: {
            'length': 'largo,length,cantidad,paginas,items'
          },
          hint: 'Crea un paginador visual en donde asigna el item pagina actual a la variable indicada luego de su coma.',
          func: function () {
            var _func67 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_paginador', node);

              if (node.text.contains(',')) {
                params['v-model'] = node.text.split(',').slice(-1)[0].trim();
                params['v-model'] = params['v-model'].replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store.', '$store.state.');
              }

              if (params[':length'] && !params[':total-visible']) {
                params[':total-visible'] = params[':length'];
              } //code


              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-pagination', params, false) + '\n';
              resp.close = '</v-pagination>';
              return resp;
            });

            function func(_x137, _x138) {
              return _func67.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_sparkline': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'sparkline',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          hint: 'Crea un grafico lineal simple, manipulable con sus parametros.',
          func: function () {
            var _func68 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_sparkline', node, true);

              if (params.centrar && params.centrar == true) {
                params['justify-center'] = null;
                params['align-center'] = null;
                delete params.centrar;
              }

              if (params.colores) {
                params[':gradient'] = JSON.serialize(params.colores.split(','));
                delete params.colores;
              } //code


              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-sparkline', params, false) + '\n';
              resp.close = '</v-sparkline>';
              resp.state.friendly_name = 'spark';
              return resp;
            });

            function func(_x139, _x140) {
              return _func68.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_highcharts': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'highcharts',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          attributes_aliases: {
            'type': 'type,tipo',
            'title': 'title,titulo',
            'data': 'data,series'
          },
          hint: 'Crea un grafico Highchart avanzado, manipulable con sus parametros.',
          func: function () {
            var _func69 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              var config = _objectSpread2(_objectSpread2({}, {
                chartOptions: {}
              }), aliases2params('def_highcharts', node, true));

              if (config.type) {
                config.chartType = config.type;
                config.chartOptions.chart = {
                  type: config.type
                };
                delete config.type;
              }

              if (config.title) {
                config.chartOptions.title = {
                  text: config.title
                };
                delete config.title;
              }

              if (config.data) {
                config.chartOptions.series = [{
                  data: config.data
                }];
                delete config.data;
              } //install plugin


              context.x_state.plugins['highcharts-vue'] = {
                global: true,
                npm: {
                  'highcharts-vue': '*'
                },
                tag: 'highcharts'
              }; //create variable for options

              var options_var = "options_".concat(node.id);
              context.x_state.pages[state.current_page].variables[options_var] = config;
              context.x_state.pages[state.current_page].var_types[options_var] = typeof config; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('highcharts', {
                ':options': options_var
              }, false) + '\n';
              resp.close = '</highcharts>';
              resp.state.friendly_name = 'highchart';
              return resp;
            });

            function func(_x141, _x142) {
              return _func69.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_trend': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'trend',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          hint: 'Crea un grafico de tendencias simple, manipulable con sus parametros.',
          func: function () {
            var _func70 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_trend', node, true);

              if (params.centrar && params.centrar == true) {
                params['justify-center'] = null;
                params['align-center'] = null;
                delete params.centrar;
              } //install plugin


              context.x_state.plugins['pure-vue-chart'] = {
                global: true,
                npm: {
                  'pure-vue-chart': '*'
                },
                mode: 'client',
                tag: 'pure-vue-chart'
              }; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('pure-vue-chart', params, false) + '\n';
              resp.close = '</pure-vue-chart>';
              resp.state.friendly_name = 'trend';
              return resp;
            });

            function func(_x143, _x144) {
              return _func70.apply(this, arguments);
            }

            return func;
          }()
        },
        //**def_paginador	
        //**def_sparkline
        //**def_highcharts -- needs testing (no map available at hand)
        //**def_trend
        'def_listado': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'listado',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          hint: 'Crea un listado con filas y datos.',
          func: function () {
            var _func71 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado', node);

              if (params.lineas) {
                if (params.lineas == 2) params['two-line'] = null;
                if (params.lineas == 3) params['three-line'] = null;
              } //code


              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");

              if (params.layout && params.layout == 'true') {
                params.tag = 'v-list';
                delete params.layout;
                resp.open += context.tagParams('v-layout', params, false) + '\n';

                if (params.subheader) {
                  resp.open += context.tagParams('v-subheader', _objectSpread2(_objectSpread2({}, params), {
                    subheader: null
                  }), false) + params.subheader + '</v-subheader>\n';
                }

                resp.close = '</v-layout>';
              } else {
                resp.open += context.tagParams('v-list', params, false) + '\n';

                if (params.subheader) {
                  resp.open += context.tagParams('v-subheader', _objectSpread2(_objectSpread2({}, params), {
                    subheader: null
                  }), false) + params.subheader + '</v-subheader>\n';
                }

                resp.close = '</v-list>';
              }

              resp.state.friendly_name = 'listado';
              return resp;
            });

            function func(_x145, _x146) {
              return _func71.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_grupo': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'listado:grupo',
          x_or_hasparent: 'def_page,def_layout,def_componente',
          attributes_aliases: {
            'value': 'value,activo,active,model,v-model'
          },
          hint: 'Permite agrupar filas de forma colapsable segun propiedades.',
          func: function () {
            var _func72 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_grupo', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-list-group', params, false) + '\n';
              resp.close = '</v-list-group>';
              resp.state.friendly_name = 'grupo';
              return resp;
            });

            function func(_x147, _x148) {
              return _func72.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila|fila)',
          x_or_hasparent: 'def_listado,def_listado_dummy',
          //x_or_hasparent: 'def_page,def_layout,def_componente',
          hint: 'Permite agrupar filas de forma colapsable segun propiedades.',
          func: function () {
            var _func73 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila', node, true);
              var tmp = {
                subheader: null
              }; //params

              if (params.lineas) {
                if (params.lineas == 2) params['two-line'] = null;
                if (params.lineas == 3) params['three-line'] = null;
              }

              if (params.subheader) {
                tmp.subheader = params.subheader;
                params.subheader = null;
              }

              if (params.scrollto) {
                context.x_state.plugins['vue-scrollto'] = {
                  global: true,
                  mode: 'client',
                  npm: {
                    'vue-scrollto': '*'
                  }
                };
                params['v-scroll-to'] = {
                  cancelable: false,
                  element: params.scrollto
                };

                if (params.scrollto.contains(',')) {
                  params['v-scroll-to'].element = params.scrollto.split(',')[0];
                  params['v-scroll-to'].offset = params.scrollto.split(',').splice(-1)[0];
                }

                delete params.scrollto;
              }

              if (node.link != '' && node.link.contains('ID_')) {
                var link_node = yield context.dsl_parser.getNode({
                  id: node.link,
                  recurse: false
                });

                if (link_node && link_node.valid == true) {
                  params.to = "{vuepath:".concat(link_node.text, "}");
                }
              } //code


              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-list-item', params, false) + '\n';

              if (params.subheader) {
                resp.open += context.tagParams('v-subheader', params, false) + tmp.subheader + '</v-subheader>\n';
              }

              resp.close = '</v-list-item>';
              resp.state.friendly_name = 'fila';
              return resp;
            });

            function func(_x149, _x150) {
              return _func73.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila_accion': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila:accion|fila:accion|accion)',
          x_or_hasparent: 'def_listado_fila,def_listado_dummy',
          hint: 'Define la accion de una fila de un listado.',
          func: function () {
            var _func74 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila_accion', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-list-item-action', params, false) + '\n';
              resp.close = '</v-list-item-action>';
              resp.state.friendly_name = 'accion_fila';
              return resp;
            });

            function func(_x151, _x152) {
              return _func74.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila_contenido': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila:contenido|fila:contenido|contenido)',
          x_or_hasparent: 'def_listado_fila,def_listado_dummy,def_slot',
          hint: 'Define el contenido de una fila de un listado.',
          func: function () {
            var _func75 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila_contenido', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-list-item-content', params, false) + '\n';
              resp.close = '</v-list-item-content>';
              resp.state.friendly_name = 'contenido_fila';
              return resp;
            });

            function func(_x153, _x154) {
              return _func75.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila_titulo': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila:titulo|fila:titulo|titulo)',
          x_or_hasparent: 'def_listado_fila,def_listado_dummy,def_slot',
          hint: 'Define el titulo de una fila de un listado.',
          func: function () {
            var _func76 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila_titulo', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");

              if (params['v-text'] || params[':v-text']) {
                resp.open += context.tagParams('v-list-item-title', params, true) + '\n';
              } else {
                resp.open += context.tagParams('v-list-item-title', params, false) + '\n';
                resp.close = '</v-list-item-title>';
              }

              resp.state.friendly_name = 'titulo_fila';
              return resp;
            });

            function func(_x155, _x156) {
              return _func76.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila_subtitulo': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila:subtitulo|fila:subtitulo|subtitulo)',
          x_or_hasparent: 'def_listado_fila,def_listado_dummy,def_slot',
          hint: 'Define el subtitulo de una fila de un listado.',
          func: function () {
            var _func77 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila_subtitulo', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-list-item-subtitle', params, false) + '\n';
              resp.close = '</v-list-item-subtitle>';
              resp.state.friendly_name = 'subtitulo_fila';
              return resp;
            });

            function func(_x157, _x158) {
              return _func77.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_listado_fila_avatar': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_pattern: '+(listado:fila:avatar|fila:avatar|fila-avatar|avatar)',
          x_or_hasparent: 'def_listado_fila,def_listado_dummy,def_slot',
          hint: 'Define el avatar de una fila de un listado.',
          func: function () {
            var _func78 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_listado_fila_avatar', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");

              if (state.from_slot) {
                resp.open += context.tagParams('v-list-item-avatar', params, false) + '\n';
                resp.close = '</v-list-item-avatar>';
              } else {
                resp.open += context.tagParams('v-list-avatar', params, false) + '\n';
                resp.close = '</v-list-avatar>';
              }

              resp.state.friendly_name = 'avatar';
              return resp;
            });

            function func(_x159, _x160) {
              return _func78.apply(this, arguments);
            }

            return func;
          }()
        },
        //**def_listado
        //**def_listado_grupo
        //?def_listado_dummy (@todo check what is this for)
        //*def_listado_fila
        //**def_listado_fila_accion
        //**def_listado_fila_contenido
        //**def_listado_fila_titulo
        //**def_listado_fila_subtitulo
        //**def_listado_fila_avatar
        'def_icono': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'icono',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          attributes_aliases: {
            'icon': 'icon,icono'
          },
          hint: 'Agrega el icono definido en el lugar.',
          func: function () {
            var _func79 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_icono', node);
              var tmp = {}; //params

              if (params.icon) {
                tmp.icon = params.icon;

                if (tmp.icon.charAt(0) == '$') {
                  tmp.icon = tmp.icon.right(tmp.icon.length - 1);
                  tmp.icon = "{{ ".concat(tmp.icon, " }}");
                } else {
                  resp.state.friendly_name = tmp.icon.replaceAll(' ', '');
                }

                delete params.icon;
              }

              if (params.class) params.class = params.class.split(' ');

              if (params.color) {
                if (params.color.contains('#')) {
                  if (params.style) params.style = params.style.split(';');
                  if (!params.style) params.style = [];
                  params.style.push("color:".concat(params.color));
                } else {
                  if (!params.class) params.class = [];

                  if (params.color.contains(' ')) {
                    var name = params.color.split(' ')[0];
                    var tint = params.color.split(' ').splice(-1)[0];
                    params.class.push("".concat(name, "--text text--").concat(tint));
                  } else {
                    params.class.push("".concat(params.color.trim(), "--text"));
                  }
                }
              } //code


              if (params.style) params.style = params.style.join(';');
              if (params.class) params.class = params.class.join(' ');
              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");

              if (tmp.icon) {
                if (state.from_toolbar) {
                  resp.open += context.tagParams('v-btn', {
                    'icon': null
                  }, false);
                  resp.open += context.tagParams('v-icon', params, false);
                  resp.open += tmp.icon;
                  resp.open += '</v-icon>';
                  resp.open += '</v-btn>';
                } else {
                  resp.open += context.tagParams('v-icon', params, false) + tmp.icon + '</v-icon>';
                  resp.open += '</v-icon>';
                }
              } else {
                if (state.from_toolbar) {
                  resp.open += context.tagParams('v-app-bar-nav-icon', params, true);
                } else {
                  //icon must be a child node
                  resp.open += context.tagParams('v-icon', params, false) + '\n';
                  resp.close += '</v-icon>';
                }
              }

              return resp;
            });

            function func(_x161, _x162) {
              return _func79.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_imagen': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'imagen',
          //x_not_empty: 'attributes[:src]',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Agrega la imagen indicada en el lugar.',
          func: function () {
            var _func80 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              var params = _objectSpread2(_objectSpread2({}, {
                alt: ''
              }), aliases2params('def_imagen', node)); //code


              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->"); //translate asset if defined

              for (var x in params) {
                if (params[x] && params[x].contains('assets:')) {
                  params[x] = context.getAsset(params[x], 'js');
                }

                yield setImmediatePromise$1(); //@improved
              }

              resp.open += context.tagParams('v-img', params, false) + '\n';
              resp.close = '</v-img>';
              resp.state.friendly_name = 'imagen';
              return resp;
            });

            function func(_x163, _x164) {
              return _func80.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_qrcode': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'qrcode',
          //x_not_empty: 'attributes[:src]',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Agrega un codigo QR en el lugar.',
          func: function () {
            var _func81 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var options = aliases2params('def_imagen', node); //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->"); //translate asset if defined

              for (var x in options) {
                if (options[x] && options[x].contains('assets:')) {
                  options[x] = context.getAsset(options[x], 'js');
                }

                yield setImmediatePromise$1(); //@improved
              }

              var params = {};
              if (options.value) params.value = options.value;
              if (options[':value']) params[':value'] = options.value;
              delete options.value;
              delete options[':value'];
              delete options.refx;
              params[':options'] = options; // install plugin

              context.x_state.plugins['@chenfengyuan/vue-qrcode'] = {
                global: true,
                npm: {
                  '@chenfengyuan/vue-qrcode': '*'
                },
                tag: 'qrcode',
                mode: 'client'
              }; // code

              resp.open += context.tagParams('qrcode', params, false) + '\n';
              resp.close = '</qrcode>';
              resp.state.friendly_name = 'qrcode';
              return resp;
            });

            function func(_x165, _x166) {
              return _func81.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_mapa': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'mapa',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          attributes_aliases: {
            'key': 'key,llave',
            'width': 'width,ancho',
            'height': 'height,alto',
            'lat': 'lat,latitude,latitud',
            'lng': 'lon,longitude,longitud,lng'
          },
          hint: 'Agrega un mapa en el lugar y permite controlarlo con sus propiedades.',
          func: function () {
            var _func82 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              var params = _objectSpread2(_objectSpread2({}, {
                width: '100%',
                height: '300px'
              }), aliases2params('def_mapa', node, false, 'this.'));

              var to_map = {
                center: {}
              };
              var config = {
                load: {
                  key: '',
                  libraries: 'places,drawing,visualization'
                },
                installComponents: true
              }; //params

              if (params.style) params.style = params.style.split(';');
              if (!params.style) params.style = [];

              if (params.key) {
                config.load.key = params.key;
                delete params.key;
              }

              if (params.lat) {
                to_map.center.lat = params.lat;
                delete params.lat;
              }

              if (params.lng) {
                to_map.center.lng = params.lng;
                delete params.lng;
              }

              if (params[':lat']) {
                to_map.center.lat = params[':lat'];
                delete params[':lat'];
              }

              if (params[':lng']) {
                to_map.center.lng = params[':lng'];
                delete params[':lng'];
              }

              if (params.width) {
                to_map.width = params.width;
                params.style.push("width: ".concat(to_map.width));
                delete params.width;
              }

              if (params.height) {
                to_map.height = params.height;
                params.style.push("height: ".concat(to_map.height));
                delete params.height;
              }

              params.style = params.style.join(';');
              if (!params[':center'] && to_map.center.lat != '') params[':center'] = to_map.center; //plugin

              context.x_state.plugins['vue2-google-maps'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue2-google-maps': '*'
                },
                as_star: true,
                tag: 'GmapMap',
                config: context.jsDump(config)
              }; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('GmapMap', params, false) + '\n';
              resp.close = '</GmapMap>';
              resp.state.friendly_name = 'mapa';
              return resp;
            });

            function func(_x167, _x168) {
              return _func82.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_youtube_playlist': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'youtube:playlist',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: 'Agrega un reproductor de playlists de YouTube.',
          func: function () {
            var _func83 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_youtube_playlist', node); //plugin

              context.x_state.plugins['vue-youtube-playlist'] = {
                global: true,
                npm: {
                  'vue-youtube-playlist': '*'
                },
                tag: 'youtube-playlist',
                mode: 'client'
              }; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('youtube-playlist', params, false) + '\n';
              resp.close = '</youtube-playlist>';
              resp.state.friendly_name = 'youtube';
              return resp;
            });

            function func(_x169, _x170) {
              return _func83.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_youtube': {
          x_level: '>3',
          x_icons: 'idea',
          x_text_exact: 'youtube',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          attributes_aliases: {
            'player-vars': 'autoplay,player-vars'
          },
          hint: 'Agrega un reproductor de videos de YouTube.',
          func: function () {
            var _func84 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = aliases2params('def_youtube', node); //plugin

              context.x_state.plugins['vue-youtube-embed'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue-youtube-embed': '*'
                },
                tag: 'youtube',
                config: '{ global:true }'
              }; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('youtube', params, false) + '\n';
              resp.close = '</youtube>';
              resp.state.friendly_name = 'youtube';
              return resp;
            });

            function func(_x171, _x172) {
              return _func84.apply(this, arguments);
            }

            return func;
          }()
        },
        //**def_icono
        //def_animar -- @todo re-think its usage (not currently in use anywhere)
        //**def_imagen
        //**def_qrcode
        //**def_mapa
        //**def_youtube_playlist
        //**def_youtube
        'def_xcada_registro_view': {
          x_icons: 'penguin',
          x_text_contains: "por cada registro en",
          x_level: '>2',
          attributes_aliases: {
            'use_index': 'index',
            'unique': 'unique,id',
            'target': 'template,target'
          },
          hint: "Repite sus hijos por cada elemento entrecomillas, dejando el item en curso en la variable luego de la coma.",
          func: function () {
            var _func85 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              if (state.from_script) {
                resp.valid = false;
                return resp;
              }

              var params = (yield context.x_commands['def_xcada_registro'].func(node, _objectSpread2(_objectSpread2({}, state), {
                get_params: true
              }))).state.params; //code

              if (node.text_note != '') resp.open += "<!-- ".concat(node.text_note.trim(), " -->\n");
              resp.open += context.tagParams('vue_for', params, false) + '\n';
              resp.close = '</vue_for>';
              return resp;
            });

            function func(_x173, _x174) {
              return _func85.apply(this, arguments);
            }

            return func;
          }()
        },
        //**def_xcada_registro_view
        'def_event_mounted': {
          x_icons: 'help',
          x_level: 3,
          x_text_contains: ':mounted',
          hint: 'Evento especial :mounted en pagina vue',
          func: function () {
            var _func86 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (node.nodes_raw.length == 0) return resp;
              resp.open = context.tagParams('vue_mounted', {}, false) + '<!--';
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              resp.close = '--></vue_mounted>';
              resp.state.from_script = true;
              return resp;
            });

            function func(_x175, _x176) {
              return _func86.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_event_server': {
          x_icons: 'help',
          x_level: 3,
          x_text_contains: ':server',
          hint: 'Evento especial :server en pagina vue',
          func: function () {
            var _func87 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (node.nodes_raw.length == 0) return resp;
              var params = aliases2params('def_event_server', node);
              resp.open = context.tagParams('server_asyncdata', {}, false) + '<!--';
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              if (!params.return) resp.open += "let resp={};";
              resp.close = '--></server_asyncdata>';
              resp.state.from_server = true;
              resp.state.from_script = true;
              return resp;
            });

            function func(_x177, _x178) {
              return _func87.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_event_method': {
          x_icons: 'help',
          x_level: 3,
          x_not_text_contains: ':',
          attributes_aliases: {
            'm_params': ':params,params',
            'timer_time': 'timer:time,interval,intervalo,repetir',
            'async': ':async,async'
          },
          hint: 'Funcion tipo evento en pagina vue',
          func: function () {
            var _func88 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (node.nodes_raw.length == 0) return resp;
              var params = aliases2params('def_event_method', node);
              params.type = 'async';
              params.name = node.text.trim();
              if (params.async && params.async == 'false') params.type = 'sync';
              if (params.async) delete params.async; //code

              resp.open = context.tagParams('vue_event_method', params, false) + '<!--';
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              resp.close = '--></vue_event_method>';
              resp.state.from_script = true;
              return resp;
            });

            function func(_x179, _x180) {
              return _func88.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_event_element': {
          x_icons: 'help',
          x_level: '>2',
          x_not_text_contains: ':server,:mounted,condicion si,otra condicion, ',
          hint: "Evento de un elemento visual (ej. imagen->?click).\n                    Se puede enlazar a otro evento de la misma p\xE1gina, en cuyo caso sus atributos se traspasan como parametros.",
          func: function () {
            var _func89 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (node.nodes_raw.length == 0) return resp; //get variables etc from node

              var attrs = aliases2params('def_event_element', node);
              var tmp = {
                event_test: node.text.trim()
              };
              var params = {
                n_params: [],
                v_params: [],
                event: node.text.trim(),
                id: node.id
              };

              var isNumeric = function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
              }; //add event name aliases if not son of def_componente_view


              if (!state.from_componente) {
                if (['post:icon:click', 'post:icon'].includes(tmp.event_test) == true) params.event = 'click:append';
                if (['pre:icon:click', 'pre:icon'].includes(tmp.event_test) == true) params.event = 'click:prepend';
              } //get parent node id


              var parent_node = yield context.dsl_parser.getParentNode({
                id: node.id
              });
              params.parent_id = parent_node.id;
              params.friendly_name = ""; //if (!state.from_componente) {

              var normal = require('url-record'),
                  ccase = require('fast-case');

              var short_event = params.event.split('.')[0].split(':')[0];
              var tmp_name = '';

              if (parent_node.text.contains('$variables')) {
                tmp_name = short_event;
              } else {
                tmp_name = short_event + '-' + parent_node.text.split('.')[0];
              }

              if (state.friendly_name && state.friendly_name != '') {
                params.friendly_name = normal(state.friendly_name).split('-')[0];
                tmp_name = short_event + '-' + params.friendly_name.split('.')[0];
              }

              params.friendly_name = tmp_name; //params.friendly_name = normal(tmp_name); //.split('-')[0];

              params.friendly_name = ccase.camelize(params.friendly_name); //`${params.event.split('.')[0]}_`+

              if (params.friendly_name in context.x_state.pages[state.current_page].track_events) {
                context.x_state.pages[state.current_page].track_events[params.friendly_name].count += 1;
                params.friendly_name = params.friendly_name + context.x_state.pages[state.current_page].track_events[params.friendly_name].count;
              } else {
                context.x_state.pages[state.current_page].track_events[params.friendly_name] = {
                  count: 1
                };
              } //has link? ex. img @event='othermethod'


              if (node.link != '' && node.link.contains('ID_')) {
                // get event friendly name - @todo check when target is a declared method and not an event - checked and ready!
                params.link = 'x';
                params.link_id = node.link;
                var link_node = yield context.dsl_parser.getNode({
                  id: node.link,
                  recurse: false
                });

                if (link_node && link_node.valid == true) {
                  params.link = link_node.text;
                }
              } //


              delete attrs.refx; //convert keys to params n_params, and values to v_params

              for (var key in attrs) {
                if (key.charAt(0) == ':') {
                  params.n_params.push(key.right(key.length - 1));
                  var val_tmp = attrs[key];

                  if (val_tmp.charAt(0) == '$') {
                    val_tmp = val_tmp.right(val_tmp.length - 1);
                  }

                  params.v_params.push(val_tmp);
                } else if (attrs[key].contains('**') && node.icons.includes('bell')) {
                  params.n_params.push(key);
                  var sv = getTranslatedTextVar(attrs[key]);
                  params.v_params.push(sv);
                } else {
                  params.n_params.push(key);

                  if (isNumeric(attrs[key])) {
                    params.v_params.push(attrs[key]);
                  } else if (attrs[key] == '') {
                    params.v_params.push('$event');
                  } else if (attrs[key].contains('this.') || attrs[key].contains('$event')) {
                    params.v_params.push(attrs[key]);
                  } else if (attrs[key].contains('**') && node.icons.includes('bell')) {
                    var _sv = getTranslatedTextVar(attrs[key]);

                    params.v_params.push(_sv);
                  } else {
                    params.v_params.push("'".concat(attrs[key], "'"));
                  }
                }

                yield setImmediatePromise$1(); //@improved
              } //add npm packages when needed


              if (tmp.event_test == 'visibility') {
                context.x_state.npm['vue-observe-visibility'] = '*';
                context.x_state.nuxt_config.head_script['polyfill_visibility'] = {
                  src: 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver'
                };
                context.x_state.pages[state.current_page].imports['vue-observe-visibility'] = "{\xA0ObserveVisibility }";
                context.x_state.pages[state.current_page].directives['observe-visibility'] = 'ObserveVisibility';
              } //code


              params.n_params = params.n_params.join(',');
              params.v_params = params.v_params.join(',');
              resp.open = context.tagParams('vue_event_element', params, false) + '<!--';
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              resp.close = '--></vue_event_element>';
              resp.state.from_script = true;
              return resp;
            });

            function func(_x181, _x182) {
              return _func89.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_script': {
          x_icons: 'desktop_new',
          x_level: '>2',
          x_text_exact: 'script',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: "Representa un tag script inyectado en el lugar indicado. Permite escribir y ejecutar c\xF3digo en la posici\xF3n definida.\n                     Si se define un link, el link se especifica con atributo src y en sus hijos el script se ejecuta luego de cargarlo.",
          func: function () {
            var _func90 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              var params = aliases2params('def_script', node);
              if (node.link != '') params.src = node.link; //add packages

              context.x_state.npm['vue-script2'] = '*';
              context.x_state.plugins['vue-script2'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vue-script2': '*'
                }
              }; //code

              resp.open = context.tagParams('script2', params, false);
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              resp.close = '</script2>';
              resp.state.from_script = true;
              return resp;
            });

            function func(_x183, _x184) {
              return _func90.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_script
        //*def_event_server
        //*def_event_mounted
        //*def_event_method
        //*def_event_element
        'def_condicion_view': {
          x_icons: 'help',
          x_level: '>2',
          x_text_contains: 'condicion si',
          x_text_pattern: ["condicion si \"*\" +(es|no es|es menor a|es menor o igual a|es mayor a|es mayor o igual a|esta entre|contiene registro|contiene|contiene item) \"*\"", "condicion si \"*\" es +(objeto|array|struct|string|texto)", "condicion si \"*\" es +(numero|entero|int|booleano|boleano|boolean|fecha|date|email)", "condicion si \"*\" no es +(numero|entero|int|booleano|boleano|boolean|fecha|date|email)", "condicion si \"*\" +(esta vacia|esta vacio|is empty|existe|exists|no es indefinido|no es indefinida|esta definida|no esta vacio|existe|esta definida|no es nula|no es nulo|es nula|not empty)", "condicion si \"*\" +(no contiene registros|contiene registros)", "condicion si \"*\" esta entre \"*\" inclusive"],
          x_or_hasparent: 'def_page,def_componente,def_layout',
          hint: "Declara que la/s vista/s hija/s deben cumplir la condicion indicada para ser visibles.",
          func: function () {
            var _func91 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });

              var isNumeric = function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
              };

              if (resp.state.from_script && resp.state.from_script == true) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); // detect which pattern did the match

              var match = require('minimatch');

              var which = -1;
              var text_trim = node.text.trim();

              for (var x of context.x_commands['def_condicion_view'].x_text_pattern) {
                which += 1;
                var test = match(text_trim, x);
                if (test == true) break;
                yield setImmediatePromise$1(); //@improved
              }

              var extract = require('extractjs')();

              var defaults = {
                variable: '',
                operator: 'es',
                value: ''
              };
              var patterns = ["condicion si \"{variable}\" {operator} \"{value}\"", "condicion si \"{variable}\" {operator}", "condicion si \"{variable}\" {operator}", "condicion si \"{variable}\" {operator}", "condicion si \"{variable}\" {operator}", "condicion si \"{variable}\" {operator}", "condicion si \"{variable} esta entre \"{value}\" inclusive"];

              var elements = _objectSpread2(_objectSpread2({}, defaults), extract(patterns[which], text_trim)); // pre-process elements


              if (typeof elements.variable === 'string' && elements.variable.contains('**') && node.icons.includes('bell')) elements.variable = getTranslatedTextVar(elements.variable);
              if (typeof elements.value === 'string' && elements.value.contains('**') && node.icons.includes('bell')) elements.value = getTranslatedTextVar(elements.value);

              if (typeof elements.variable === 'string' && (elements.variable.contains('$variables.') || elements.variable.contains('$vars.') || elements.variable.contains('$params.') || elements.variable.contains('$store.') || elements.variable.contains('$route.'))) ; else if (typeof elements.variable === 'string' && elements.variable.charAt(0) == '$') {
                elements.variable = elements.variable.right(elements.variable.length - 1);
              } // test for siblings conditions


              elements.type = 'v-if';
              var before_me = yield context.dsl_parser.getBrotherNodesIDs({
                id: node.id,
                before: true,
                after: false,
                array: true
              });

              if (before_me.length > 0) {
                if (before_me[0].TEXT && before_me[0].TEXT.contains('condicion si')) {
                  elements.type = 'v-else-if';
                }
              } // tag params


              var params = aliases2params('def_condicion_view', node);
              params = _objectSpread2(_objectSpread2({}, params), {
                target: 'template',
                tipo: elements.type,
                operador: elements.operator,
                valor: elements.value
              });
              var sons = yield node.getNodes();
              if (sons.length == 1) params.target = sons[0].id; //.id

              if (params.individual && params.individual == true) {
                params.tipo = 'v-if';
                elements.type = 'v-if';
                delete params.individual;
              } // get full expression, depending on operator


              if (elements.operator == 'idioma es') {
                params.expresion = "this.$i18n && this.$i18n.locale=='".concat(elements.variable, "'");
              } else if (['es', '=', 'eq'].includes(elements.operator)) {
                if (elements.value == true && elements.value != 1) {
                  params.expresion = elements.variable;
                } else if (elements.value == false && elements.value != 0) {
                  params.expresion = '!' + elements.variable;
                } else if (typeof elements.value === 'string' && (elements.value.contains('$variables.') || elements.value.contains('$vars.') || elements.value.contains('$params.') || elements.value.contains('$store.') || elements.value.contains('this.'))) {
                  params.expresion = "".concat(elements.variable, " == ").concat(elements.value);
                } else if (typeof elements.value === 'number') {
                  params.expresion = "".concat(elements.variable, " == ").concat(elements.value);
                } else if (typeof elements.value === 'string' && elements.value.charAt(0) == '(' && elements.value.right(1) == ')') {
                  var temp = elements.value.substr(1, elements.value.length - 2);
                  params.expresion = "".concat(elements.variable, " == ").concat(temp);
                } else if (typeof elements.value === 'string' && elements.value.charAt(0) == '$' && elements.value.contains("$t('") == false) {
                  var _temp = elements.value.right(elements.value.length - 1);

                  params.expresion = "".concat(elements.variable, " == ").concat(_temp);
                } else if (typeof elements.value === 'string' && (elements.value == 'true' || elements.value == 'false' || isNumeric(elements.value))) {
                  params.expresion = "".concat(elements.variable, " == ").concat(elements.value);
                } else {
                  params.expresion = "".concat(elements.variable, " == '").concat(elements.value, "'");
                }
              } else if ('es string,es texto,string,texto'.split(',').includes(elements.operator)) {
                params.expresion = "_.isString(".concat(elements.variable, ")");
              } else if ('es numero,es int,numero,int'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNumber(".concat(elements.variable, ")");
              } else if ('es boolean,es boleano,es booleano,booleano,boleano,boolean'.split(',').includes(elements.operator)) {
                params.expresion = "_.isBoolean(".concat(elements.variable, ")");
              } else if ('es fecha,es date,fecha,date'.split(',').includes(elements.operator)) {
                params.expresion = "_.isDate(".concat(elements.variable, ")");
              } else if ('es entero,es int,entero,int'.split(',').includes(elements.operator)) {
                params.expresion = "_.isFinite(".concat(elements.variable, ")");
              } else if ('es array,array'.split(',').includes(elements.operator)) {
                params.expresion = "_.isArray(".concat(elements.variable, ")");
              } else if ('es struct,struct'.split(',').includes(elements.operator)) {
                params.expresion = "_.isObject(".concat(elements.variable, ") && !_.isArray(").concat(elements.variable, ") && !_.isFunction(").concat(elements.variable, ")");
              } else if ('es objeto,objeto'.split(',').includes(elements.operator)) {
                params.expresion = "_.isObject(".concat(elements.variable, ")");
              } else if ('es correo,es email,email,correo'.split(',').includes(elements.operator)) {
                params.expresion = "_.isString(".concat(elements.variable, ") && /\\S+@\\S+\\.\\S+/.test(").concat(elements.variable, ")");
              } else if ('no es correo,no es email'.split(',').includes(elements.operator)) {
                params.expresion = "!(_.isString(".concat(elements.variable, ") && /\\S+@\\S+\\.\\S+/.test(").concat(elements.variable, "))"); //numeric testings
              } else if ('es menor o igual a,es menor o igual que'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNumber(".concat(elements.variable, ") && _.isNumber(").concat(elements.value, ") && ").concat(elements.variable, " <= ").concat(elements.value);
              } else if ('es menor a,es menor que'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNumber(".concat(elements.variable, ") && _.isNumber(").concat(elements.value, ") && ").concat(elements.variable, " < ").concat(elements.value);
              } else if ('es mayor o igual a,es mayor o igual que'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNumber(".concat(elements.variable, ") && _.isNumber(").concat(elements.value, ") && ").concat(elements.variable, " >= ").concat(elements.value);
              } else if ('es mayor a,es mayor que'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNumber(".concat(elements.variable, ") && _.isNumber(").concat(elements.value, ") && ").concat(elements.variable, " > ").concat(elements.value);
              } else if ('esta entre' == elements.operator && elements.value.contains(',')) {
                var from = elements.value.split(',')[0];
                var until = elements.value.split(',').pop();
                params.expresion = "".concat(elements.variable, " >= ").concat(from, " && ").concat(elements.variable, " <= ").concat(until); // strings
              } else if ('no esta vacio,not empty'.split(',').includes(elements.operator)) {
                params.expresion = "(_.isObject(".concat(elements.variable, ") || (_.isString(").concat(elements.variable, ")) &&  !_.isEmpty(").concat(elements.variable, ")) || _.isNumber(").concat(elements.variable, ") || _.isBoolean(").concat(elements.variable, ")");
              } else if ('esta vacio,is empty,esta vacia'.split(',').includes(elements.operator)) {
                params.expresion = "(_.isObject(".concat(elements.variable, ") ||_.isString(").concat(elements.variable, ")) &&  _.isEmpty(").concat(elements.variable, ")"); // other types
              } else if ('existe,exists,no es indefinido,no es indefinida,esta definida'.split(',').includes(elements.operator)) {
                params.expresion = "!_.isUndefined(".concat(elements.variable, ")");
              } else if ('no existe,doesnt exists,es indefinido,es indefinida,no esta definida'.split(',').includes(elements.operator)) {
                params.expresion = "_.isUndefined(".concat(elements.variable, ")");
              } else if ('no es nula,no es nulo'.split(',').includes(elements.operator)) {
                params.expresion = "!_.isNull(".concat(elements.variable, ")");
              } else if ('es nula,es nulo'.split(',').includes(elements.operator)) {
                params.expresion = "_.isNull(".concat(elements.variable, ")");
              } else if ('no es,!=,neq'.split(',').includes(elements.operator)) {
                //@todo check if value is string - pendieng testing
                if (typeof elements.value === 'string' && isNumeric(elements.value) && elements.value.charAt(0) != '0' || !isNaN(elements.value) || elements.value == 'true' || elements.value == 'false' || elements.value.charAt(0) == '$' || elements.value.contains('this.')) {
                  params.expresion = "".concat(elements.variable, "!=").concat(elements.value);
                } else {
                  params.expresion = "".concat(elements.variable, "!='").concat(elements.value, "'");
                } // records

              } else if ('no contiene registros,contains no records'.split(',').includes(elements.operator)) {
                params.expresion = "".concat(elements.variable, " && ").concat(elements.variable, ".length==0");
              } else if ('contiene registros,contains records'.split(',').includes(elements.operator)) {
                params.expresion = "".concat(elements.variable, " && ").concat(elements.variable, ".length"); //@todo check if this needs to be .length>0
              } else if ('contiene registro,contiene item'.split(',').includes(elements.operator)) {
                params.expresion = "_.contains(".concat(elements.variable, ",'").concat(elements.value, "')");
              } else if ('contiene,contains'.split(',').includes(elements.operator)) {
                if (elements.value.contains('this.')) {
                  params.expresion = "".concat(elements.variable, ".toLowerCase().indexOf(").concat(elements.value, ".toLowerCase())!=-1");
                } else {
                  params.expresion = "".concat(elements.variable, ".toLowerCase().indexOf('").concat(elements.value, "'.toLowerCase())!=-1");
                }
              } else {
                //operator not defined
                context.x_console.outT({
                  message: "Operator (".concat(elements.operator, ") not defined in 'condicion si' x_command"),
                  color: 'red',
                  data: {
                    elements,
                    params,
                    which
                  }
                });
                throw "Operator ".concat(elements.operator, " not defined in '").concat(node.text, "'"); //params.expresion = `(AQUI VAMOS: ${node.text})`;
              } //comments?


              if (node.text_note != '') resp.open += "<!--".concat(node.text_note, "-->\n"); // prepare expressions

              var expresion_js = params.expresion.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.');
              var expresion_view = params.expresion.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '');

              if (state.current_proxy) {
                expresion_js = expresion_js.replaceAll('$store.', 'store.state.');
                expresion_view = expresion_view.replaceAll('$store.', 'store.state.');
              } else {
                expresion_js = expresion_js.replaceAll('$store.', 'this.$store.state.');
                expresion_view = expresion_view.replaceAll('$store.', '$store.state.');
              }

              resp.state.meta = {
                if_js: expresion_js,
                if_view: expresion_view,
                params,
                elements
              }; // prepare virtual vars for underscore support

              if (params.expresion && params.expresion.contains('_.')) {
                if (state.current_page) {
                  context.x_state.pages[state.current_page].imports['underscore'] = '_';
                } else if (state.current_proxy) {
                  context.x_state.proxies[state.current_proxy].imports['underscore'] = '_';
                } else if (state.current_store) {
                  context.x_state.stores[state.current_store].imports['underscore'] = '_';
                } //create virtual var 'computed'


                resp.open += context.tagParams('vue_computed', {
                  name: "".concat(node.id, "_if"),
                  type: 'computed'
                }, false) + '<!--';
                resp.open += "return (".concat(expresion_js, ");");
                resp.open += "--></vue_computed>"; //@todo seems the expresion should be the new var here... (was not on the cfc)

                params.expresion = "".concat(node.id, "_if");
              } //create vue_if or template tag code (in tags, this. don't go)


              if (!params.expresion.contains('_if')) params.expresion = expresion_view;

              if (params.target == 'template') {
                // code
                resp.open += context.tagParams('template', {
                  [params.tipo]: params.expresion
                }, false);
                resp.close = "</template>";
              } else {
                // code
                resp.open += context.tagParams('vue_if', params, false);
                resp.close = "</vue_if>";
              }

              return resp;
            });

            function func(_x185, _x186) {
              return _func91.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_otra_condicion_view': {
          x_icons: 'help',
          x_level: '>2',
          x_text_exact: 'otra condicion',
          hint: "Visibiliza sus hijos en caso de no cumplirse la condicion anterior.",
          func: function () {
            var _func92 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (resp.state.from_script && resp.state.from_script == true) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //code

              var sons = yield node.getNodes();

              if (sons.length > 1) {
                if (node.text_note != '') resp.open = "/*".concat(node.text_note, "*/\n");
                resp.open += context.tagParams('template', {
                  'v-else': null
                }, false);
              } else if (sons.length == 1) {
                if (node.text_note != '') resp.open = "/*".concat(node.text_note, "*/\n");
                resp.open += context.tagParams('vue_if', {
                  'expresion': '',
                  'tipo': 'v-else',
                  'target': sons[0].id
                }, false);
                resp.close = "</vue_if>";
              } else ;

              return resp;
            });

            function func(_x187, _x188) {
              return _func92.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_condicion': {
          x_icons: 'help',
          x_level: '>2',
          x_text_contains: 'condicion si',
          hint: "Declara que los hijo/s deben cumplir la condicion indicada para ser ejecutados.",
          func: function () {
            var _func93 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (!resp.state.from_script || resp.state.from_script && resp.state.from_script == false) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              });
              var condicion = yield context.x_commands['def_condicion_view'].func(node, _objectSpread2(_objectSpread2({}, state), {
                from_script: false
              })); //code

              if (node.text_note != '') resp.open = "/* ".concat(node.text_note.cleanLines(), " */\n");

              if (condicion.state.meta.params.tipo == 'v-if') {
                resp.open += "if (".concat(condicion.state.meta.if_js, ") {\n");
              } else {
                resp.open += "else if (".concat(condicion.state.meta.if_js, ") {\n");
              }

              resp.close = "}\n";
              return resp;
            });

            function func(_x189, _x190) {
              return _func93.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_otra_condicion': {
          x_icons: 'help',
          x_level: '>2',
          x_text_exact: 'otra condicion',
          hint: "Ejecuta sus hijos en caso de no cumplirse la condicion anterior.",
          func: function () {
            var _func94 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              if (!resp.state.from_script || resp.state.from_script && resp.state.from_script == false) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //code

              if (node.text_note != '') resp.open = "/*".concat(node.text_note, "*/\n");
              resp.open += "else {\n";
              resp.close = "}\n";
              return resp;
            });

            function func(_x191, _x192) {
              return _func94.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_condicion_view
        //*def_otra_condicion_view
        //*def_condicion (def_script_condicion)
        //*def_otra_condicion (def_script_otra_condicion)
        // *************
        // 	 VARIABLES
        // *************
        'def_variables': {
          x_icons: 'xmag',
          x_level: 3,
          x_text_contains: 'variables',
          hint: 'Definicion local de variables observadas',
          func: function () {
            var _func95 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              // set vars

              if (typeof state.current_page !== 'undefined') {
                if (typeof context.x_state.pages[state.current_page] === 'undefined') context.x_state.pages[state.current_page] = {};
                if ('variables' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].variables = {};
                if ('types' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].types = {};
              }

              resp.state.from_variables = true;
              return resp;
            });

            function func(_x193, _x194) {
              return _func95.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_variables_field': {
          x_priority: 1,
          x_empty: 'icons',
          x_level: '>3',
          x_all_hasparent: 'def_variables',
          hint: 'Campo con nombre de variable observada y tipo',
          func: function () {
            var _func96 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (resp.state.vars_path) resp.state.vars_last_level = resp.state.vars_path.length; //console.log('FIRST CALL var state',resp.state );

              var params = {},
                  tmp = {
                type: 'string',
                field: node.text.trim(),
                level: node.level - 3
              }; //

              if (tmp.field.contains('[') && tmp.field.contains(']') || tmp.field.contains('{') && tmp.field.contains('}')) {
                // this is a script node
                tmp.type = 'script';
                tmp.field = "script".concat(node.id);
              } else if (tmp.field.contains(':')) {
                tmp.type = tmp.field.split(':').pop().toLowerCase().trim(); //listlast

                tmp.field = tmp.field.split(':')[0].trim();
              } else if (node.nodes_raw && node.nodes_raw.length > 0) {
                // get children nodes, and test that they don't have a help icon.
                var subnodes = yield node.getNodes();
                var has_event = false;

                for (var i of subnodes) {
                  if (i.icons.includes('help')) {
                    has_event = true;
                  }

                  yield setImmediatePromise$1(); //@improved
                }

                if (has_event == false) {
                  tmp.type = 'object';
                }
              } else {
                tmp.type = 'string';
              } // process attributes (and overwrite types if needed)


              Object.keys(node.attributes).map(function (keym) {
                var keytest = keym.toLowerCase().trim();
                var value = node.attributes[keym]; //console.log(`${tmp.field} attr key:${keytest}, value:${value}`);

                if ('type,tipo,:type,:tipo'.split(',').includes(keytest)) {
                  tmp.type = value.toLowerCase().trim();
                } else if ('valor,value,:valor,:value'.split(',').includes(keytest)) {
                  var t_value = value.replaceAll('$variables', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
                  if (t_value.toLowerCase().trim() == '{now}') t_value = 'new Date()';

                  if (t_value.contains('assets:')) {
                    t_value = context.getAsset(t_value, 'js');
                  }

                  params.value = t_value;
                } else {
                  if (keytest.contains(':')) {
                    params[keym.trim()] = value.trim();
                  }
                }
              }); // assign default value for type, if not defined

              if ('string,text,texto'.split(',').includes(tmp.type)) {
                if ('value' in params === false) {
                  params.value = '';
                } else {
                  params.value = params.value.toString();
                }
              } else if ('script' == tmp.type) {
                params.value = node.text.trim().replaceAll('&#xa;', '').replaceAll('&apos;', '"').replaceAll('&#xf1;', 'ñ');

                if (params.value.charAt(0) != '[') {
                  params.value = '[' + params.value + ']';
                }

                var convertjs = require('safe-eval');

                try {
                  params.value = convertjs(params.value);
                } catch (cjerr) {
                  params.value = [{
                    error_in_script_var: cjerr
                  }];
                } //params.value = JSON.parse('['+params.value+']');

              } else if ('int,numeric,number,numero'.split(',').includes(tmp.type)) {
                if ('value' in params === false) {
                  params.value = 0;
                } else {
                  params.value = parseInt(params.value);
                }
              } else if ('float,real,decimal'.split(',').includes(tmp.type)) {
                if ('value' in params === false) {
                  params.value = 0.0;
                } else {
                  params.value = parseFloat(params.value);
                }
              } else if ('boolean,boleano,booleano'.split(',').includes(tmp.type)) {
                if ('value' in params === false) {
                  if (tmp.field == 'true') {
                    // ex value of an array (true/false)
                    params.value = true;
                  } else if (tmp.field == 'false') {
                    params.value = false;
                  } else {
                    params.value = false;
                  }
                } else {
                  if (params.value == 'true') {
                    // ex value of an array (true/false)
                    params.value = true;
                  } else if (params.value == 'false') {
                    params.value = false;
                  }
                }
              } else if ('array'.split(',').includes(tmp.type)) {
                tmp.type = 'array';

                if ('value' in params === false) {
                  params.value = [];
                } else {
                  params.value = JSON.parse(params.value);
                }
              } else if ('struct,object'.split(',').includes(tmp.type)) {
                tmp.type = 'object';

                if ('value' in params === false) {
                  params.value = {};
                } else {
                  params.value = JSON.parse(params.value);
                }
              } // check and prepare global state


              if (typeof state.current_page !== 'undefined') {
                if (state.current_page in context.x_state.pages === false) context.x_state.pages[state.current_page] = {};
                if ('variables' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].variables = {};
                if ('var_types' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].var_types = {};
              } // assign var info to page state


              if (tmp.level == 1) {
                // this is a single variable (no dad); eq. variables[field] = value/children
                context.x_state.pages[state.current_page].var_types[tmp.field] = tmp.type;
                context.x_state.pages[state.current_page].variables[tmp.field] = params.value;
                resp.state.vars_path = [tmp.field];
                resp.state.vars_types = [tmp.type];
                resp.state.vars_last_level = tmp.level;
              } else {
                // variables[prev_node_text][current_field] = value
                //console.log(`testing ${tmp.level} (current level) with ${resp.state.vars_last_level} (last var level)`);
                if (tmp.level > resp.state.vars_last_level) {
                  //current is son of prev
                  //console.log(`current var '${tmp.field}' (${tmp.level}) is SON of '${resp.state.vars_path.join('.')}' (${resp.state.vars_last_level})`);
                  resp.state.vars_path.push(tmp.field); // push new var to paths

                  resp.state.vars_types.push(tmp.type); //console.log(`trying to set: ${resp.state.vars_path.join('.')} on context.x_state.pages['${state.current_page}'].variables as ${tmp.type}`);
                } else if (tmp.level == resp.state.vars_last_level) {
                  //current is brother of prev
                  //console.log(`current var '${tmp.field}' (${tmp.level}) is BROTHER of '${resp.state.vars_path.join('.')}' (${resp.state.vars_last_level})`);
                  resp.state.vars_path.pop(); // remove last field from var path

                  resp.state.vars_types.pop(); // remove last field type from vars_types
                  //console.log(`vars_path AFTER pop: `,resp.state.vars_path);

                  resp.state.vars_path.push(tmp.field); // push new var to paths

                  resp.state.vars_types.push(tmp.type); //console.log(`trying to set: ${resp.state.vars_path.join('.')} on context.x_state.pages['${state.current_page}'].variables as ${tmp.type}`);
                } else {
                  //current path is smaller than last
                  //console.log(`current var '${tmp.field}' (${tmp.level}) is UPPER of '${resp.state.vars_path.join('.')}' (${resp.state.vars_last_level})`);
                  //console.log(`new var has higher hierarchy than last! ${resp.state.vars_last_level} > ${tmp.level}`);
                  var amount = new Array(resp.state.vars_last_level - tmp.level + 1);

                  for (var t of amount) {
                    //console.log(`vars_path before pop: `,resp.state.vars_path);
                    resp.state.vars_path.pop(); // remove last field from var path

                    resp.state.vars_types.pop(); // remove last field type from vars_types

                    yield setImmediatePromise$1(); //@improved
                  } //console.log(`vars_path AFTER pops: `,resp.state.vars_path);


                  resp.state.vars_path.push(tmp.field); // push new var to paths

                  resp.state.vars_types.push(tmp.type); //console.log(`trying to set: ${resp.state.vars_path.join('.')} on context.x_state.pages['${state.current_page}'].variables as ${tmp.type}`);
                } //console.log('MY DAD TYPE:'+resp.state.vars_types[resp.state.vars_types.length - 2]);


                if (resp.state.vars_types[resp.state.vars_types.length - 2] == 'object') {
                  // dad was an object
                  //console.log('dad was an object',resp.state.vars_types[resp.state.vars_types.length-1]);
                  setToValue(context.x_state.pages[state.current_page].variables, params.value, resp.state.vars_path.join('.'));
                } else if (resp.state.vars_types[resp.state.vars_types.length - 2] == 'array') {
                  //console.log('dad was an array',resp.state.vars_types[resp.state.vars_types.length-1]);
                  // dad is an array.. 
                  var copy_dad = [...resp.state.vars_path];
                  copy_dad.pop(); //console.log('my dad path is '+copy_dad.join('.'));

                  var daddy = getVal(context.x_state.pages[state.current_page].variables, copy_dad.join('.')); //console.log('daddy says:',daddy);

                  if (tmp.type == 'script') {
                    // if we are a script node, just push our values, and not ourselfs.
                    params.value.map(i => {
                      daddy.push(i);
                    });
                  } else if (tmp.field != params.value) {
                    // push as object (array of objects)
                    var tmpi = {};
                    tmpi[tmp.field] = params.value;
                    daddy.push(tmpi);
                  } else {
                    // push just the value (single value)
                    daddy.push(params.value);
                  } // re-set daddy with new value


                  setToValue(context.x_state.pages[state.current_page].variables, daddy, copy_dad.join('.'));
                } //*resp.state.vars_types.push(tmp.type); // push new var type to vars_types


                context.x_state.pages[state.current_page].var_types[resp.state.vars_path.join('.')] = tmp.type;
                resp.state.vars_last_level = resp.state.vars_path.length; //console.log('BEFORE close: state for next var (cur level: '+tmp.level+', last_level:'+resp.state.vars_last_level+')',resp.state);
                //resp.state.vars_last_level = tmp.level;
              }

              return resp;
            });

            function func(_x195, _x196) {
              return _func96.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_variables_watch': {
          x_icons: 'help',
          x_level: '>4',
          x_text_contains: 'change',
          x_all_hasparent: 'def_variables',
          hint: 'Monitorea los cambios realizados a la variable padre',
          func: function () {
            var _func97 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.nodes_raw.length == 0) return resp;
              var params = {
                name: node.text.trim(),
                type: 'watched',
                oldvar: 'old',
                newvar: 'new'
              }; // process attributes

              Object.keys(node.attributes).map(function (keym) {
                var keytest = keym.toLowerCase().trim();
                var value = node.attributes[keym];

                if (':old,old'.split(',').includes(keytest)) {
                  params.oldvar = value;
                } else if (':new,new'.split(',').includes(keytest)) {
                  params.newvar = value;
                } else if (':deep,deep'.split(',').includes(keytest)) {
                  params.deep = value;
                }
              });
              params.flat = resp.state.vars_path.join('.'); // inherit parent var from def_variables_field last state
              // write tag

              resp.open = context.tagParams('vue_watched_var', params, false) + '<!--';
              if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
              resp.close = '--></vue_watched_var>';
              resp.state.from_script = true;
              return resp;
            });

            function func(_x197, _x198) {
              return _func97.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_variables_func': {
          x_icons: 'help',
          x_level: 4,
          x_not_text_contains: ':server,condicion si,otra condicion',
          x_all_hasparent: 'def_variables',
          hint: 'Variable tipo funcion',
          func: function () {
            var _func98 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                name: node.text.trim(),
                type: 'computed'
              };
              var tmp = {
                type: 'async'
              }; // process attributes

              Object.keys(node.attributes).map(function (key) {
                var keytest = key.toLowerCase().trim().replaceAll(':', '');
                var value = node.attributes[key].trim();

                if ('default' == keytest) {
                  params.valor = value;
                } else if ('valor,value'.split(',').includes(keytest)) {
                  params.valor = value;
                } else if ('lazy' == keytest) {
                  params.lazy = value == 'true' ? true : false;
                } else if ('observar,onchange,cambie,cambien,modifiquen,cuando,monitorear,watch'.split(',').includes(keytest)) {
                  params.watch = value;
                } else if ('async' == keytest) {
                  tmp.type = value == 'true' ? 'async' : 'sync';
                }
              }); // built response

              if (tmp.type == 'async') {
                // add async plugin to app
                context.x_state.plugins['vue-async-computed'] = {
                  global: true,
                  npm: {
                    'vue-async-computed': '*'
                  }
                };
                resp.open = context.tagParams('vue_async_computed', params, false) + '<!--\n';
                if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
                resp.close = '--></vue_async_computed>\n';
              } else {
                resp.open = context.tagParams('vue_computed', params, false) + '<!--\n';
                if (node.text_note != '') resp.open += "/*".concat(node.text_note, "*/\n");
                resp.close = '--></vue_computed>\n';
              }

              resp.state.from_script = true; // return

              return resp;
            });

            function func(_x199, _x200) {
              return _func98.apply(this, arguments);
            }

            return func;
          }()
        },
        // *************************
        //  Scriptable definitions
        // *************************
        //..scripts..
        'def_responder': {
          x_icons: 'desktop_new',
          //x_text_pattern: `responder "*"`,
          x_text_contains: "responder \"",
          x_or_hasparent: 'def_variables,def_event_element,def_event_method',
          x_level: '>3',
          hint: 'Emite una respuesta para la variable de tipo funcion o evento :rules',
          func: function () {
            var _func99 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "/*".concat(node.text_note, "*/\n");
              var text = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              }); // tests return types

              if (text.contains('**') && node.icons.includes('bell')) {
                var new_vars = getTranslatedTextVar(text);
                resp.open += "return ".concat(new_vars, ";\n");
              } else if (text.contains('$')) {
                text = text.replaceAll('$params.', 'this.').replaceAll('$variables.', 'this.');
                resp.open += "return ".concat(text, ";\n");
              } else if (text.contains('assets:')) {
                text = context.getAsset(text, 'js');
                resp.open += "return ".concat(text, ";\n");
              } else if (text == '') {
                resp.open += "return '';\n";
              } else if (text.charAt(0) == '(' && text.slice(-1) == ')') {
                text = text.slice(1).slice(0, -1);
                resp.open += "return ".concat(text, ";\n");
              } else {
                if (context.x_state.central_config.idiomas && context.x_state.central_config.idiomas.contains(',')) ; else {
                  resp.open += "return '".concat(text, "';\n");
                }
              }

              return resp;
            });

            function func(_x201, _x202) {
              return _func99.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_struct': {
          x_icons: 'desktop_new',
          x_text_contains: 'struct,,',
          x_not_text_contains: 'traducir',
          x_level: '>3',
          hint: 'Crea una variable de tipo Objeto, con los campos y valores definidos en sus atributos.',
          func: function () {
            var _func100 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {}; // parse output var

              tmp.var = node.text.split(',').pop().trim(); //last comma element

              if (resp.state.from_server) {
                // if (context.hasParentID(node.id, 'def_event_server')==true) {
                tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                tmp.var = tmp.var == 'resp.' ? 'resp' : tmp.var;
                tmp.parent_server = true;
              } else {
                tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('store.', 'this.$store.state.');
                tmp.var = tmp.var == 'this.' ? 'this' : tmp.var;
              } // process attributes


              var attrs = _objectSpread2({}, node.attributes);

              Object.keys(node.attributes).map(function (key) {
                key.toLowerCase().trim();
                var value = node.attributes[key].trim();

                if (node.icons.includes('bell') && value.contains('**')) {
                  value = getTranslatedTextVar(value, true);
                } else if (value.contains('assets:')) {
                  value = context.getAsset(value, 'js');
                } else {
                  // normalize vue type vars
                  if (tmp.parent_server == true) {
                    value = value.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                  } else {
                    value = value.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
                  }
                }

                attrs[key] = value; //.replaceAll('{now}','new Date()');
              }); // write output

              if (resp.state.as_object) {
                resp.state.object = attrs;
                resp.open = context.jsDump(attrs).replaceAll("'`", "`").replaceAll("`'", "`");
                delete resp.state.as_object;
              } else {
                if (node.text_note != '') resp.open = "// ".concat(node.text_note, "\n");
                resp.open += "let ".concat(tmp.var.trim(), " = ").concat(context.jsDump(attrs).replaceAll("'`", "`").replaceAll("`'", "`"), ";\n");
              }

              return resp;
            });

            function func(_x203, _x204) {
              return _func100.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_extender': {
          x_level: '>3',
          x_text_contains: "extender \"",
          x_icons: 'desktop_new',
          hint: 'Extiende los atributos de un objeto con los datos dados en los atributos.',
          func: function () {
            var _func101 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // create obj from current node as js obj

              resp = yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                as_object: true
              })); // get var name

              var tmp = {};
              tmp.var = context.dsl_parser.findVariables({
                text: node.text,
                symbol: '"',
                symbol_closing: '"'
              }).trim(); // clean given varname $variables, etc.

              if (resp.state.from_server) {
                //if (context.hasParentID(node.id, 'def_event_server')==true) {
                tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                tmp.var = tmp.var == 'resp.' ? 'resp' : tmp.var;
              } else {
                tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('store.', 'this.$store.state.');
                tmp.var = tmp.var == 'this.' ? 'this' : tmp.var;
              } // extend given var with 'extend_node' content


              tmp.nobj = resp.open; //underscore (seems necesary because vue doesn't detect spreads)

              if (state.current_page) {
                context.x_state.pages[resp.state.current_page].imports['underscore'] = '_';
              } else if (state.current_proxy) {
                context.x_state.proxies[resp.state.current_proxy].imports['underscore'] = '_';
              } else if (state.current_store) {
                context.x_state.stores[resp.state.current_store].imports['underscore'] = '_';
              }

              if (node.text_note != '') resp.open = "// ".concat(node.text_note.cleanLines(), "\n"); //resp.open = `${tmp.var} = {...${tmp.var},...${tmp.nobj}};\n`;

              resp.open = "".concat(tmp.var, " = _.extend(").concat(tmp.var, ", ").concat(tmp.nobj, ");\n");
              return resp;
            });

            function func(_x205, _x206) {
              return _func101.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_literal_js': {
          x_icons: 'penguin',
          x_not_text_contains: 'por cada registro en',
          x_level: '>1',
          hint: 'Nodo JS literal; solo traduce $variables y referencias de refrescos a metodos async.',
          func: function () {
            var _func102 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                text: node.text
              };

              if (node.text.contains('$variables.') && node.text.right(2) == '()') {
                tmp.text = tmp.text.replaceAll('$variables.', 'this.$asyncComputed.').replaceAll('()', '.update();').replaceAll(';;', ';');
              } else if (node.text.contains('$vars.') && node.text.right(2) == '()') {
                tmp.text = tmp.text.replaceAll('$vars.', 'this.$asyncComputed.').replaceAll('()', '.update();').replaceAll(';;', ';');
              } else if (node.text.contains('$params.') && node.text.right(2) == '()') {
                //@TODO check this, doesn't look right
                tmp.text = tmp.text.replaceAll('$params.', 'this.$asyncComputed.').replaceAll('()', '.update();').replaceAll(';;', ';');
              } else if (node.text.contains('$store.') && node.text.contains('this.$store.state') == false) {
                tmp.text = tmp.text.replaceAll('$store.', 'this.$store.state.').replaceAll('this.$nuxt.this.$store.', 'this.$nuxt.$store.');
              } else {
                tmp.text = tmp.text.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.');
              } //scrollTo plugin?


              if (tmp.text.contains('this.$scrollTo')) {
                context.plugins['vue-scrollto'] = {
                  global: true,
                  mode: 'client',
                  npm: {
                    'vue-scrollto': '*'
                  }
                };
              } //vuescript2


              if (tmp.text.contains('vuescript2')) tmp.text = tmp.text.replaceAll('vuescript2.', "require('vue-script2')."); //underscore

              if (tmp.text.contains('_.')) {
                context.x_state.pages[resp.state.current_page].imports['underscore'] = '_';
              } //code


              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              resp.open += tmp.text;
              if (resp.open.right(1) != ';') resp.open += ';';
              resp.open += '\n';
              return resp;
            });

            function func(_x207, _x208) {
              return _func102.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_console': {
          x_icons: 'clanbomber',
          x_not_icons: 'desktop_new',
          x_level: '>1',
          hint: 'Emite su texto a la consola. Soporta mostrar los datos/variables de sus atributos.',
          func: function () {
            var _func103 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                text: node.text
              };

              if (node.icons.includes('bell')) {
                tmp.text = getTranslatedTextVar(tmp.text);
              } else {
                tmp.text = "'".concat(tmp.text, "'");
              } //attr
              // process attributes


              var attrs = _objectSpread2({}, node.attributes);

              Object.keys(node.attributes).map(function (key) {
                key.toLowerCase().trim();
                var value = node.attributes[key].trim();
                var valuet = getTranslatedTextVar(value);

                if (value.contains('assets:')) {
                  value = context.getAsset(value, 'jsfunc');
                } else {
                  // normalize vue type vars                        
                  value = value.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$store.', 'this.$store.state.');
                } //bell


                if (node.icons.includes('bell') && value.replaceAll('**', '') != valuet) {
                  // && value!=`**${valuet}**`) {
                  value = getTranslatedTextVar(value);
                } else if (!node.icons.includes('bell') && value.contains('**')) {
                  value = "'".concat(value, "'");
                } // modify values to copy


                attrs[key] = value;
              }); //code

              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              resp.open += "console.log(".concat(tmp.text, ",").concat(context.jsDump(attrs), ");\n");
              return resp;
            });

            function func(_x209, _x210) {
              return _func103.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_npm_instalar': {
          x_icons: 'desktop_new',
          x_text_pattern: ["npm:+(install|instalar) \"*\"", "npm:+(install|instalar) \"*\",*"],
          x_level: '>2',
          hint: 'Instala el paquete npm indicado entrecomillas y lo instancia en la página (import:true) o función actual, o lo asigna a la variable indicada luego de la coma.',
          func: function () {
            var _func104 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var defaults = {
                text: node.text,
                tipo: 'import',
                tipo_: '',
                version: '*',
                git: '',
                init: ''
              };
              var attr = aliases2params('def_npm_instalar', node);
              attr = _objectSpread2(_objectSpread2({}, defaults), attr);
              if (attr.import && attr.import != 'true') attr.tipo_ = attr.import;
              attr.text = context.dsl_parser.findVariables({
                text: node.text,
                symbol: '"',
                symbol_closing: '"'
              }).trim();
              attr.var = attr.tipo_ = node.text.split(',').pop(); //code

              context.x_state.npm[attr.text] = attr.version;
              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");

              if (!attr.require) {
                if ('current_func' in resp.state) {
                  context.x_state.functions[resp.state.current_func].imports[attr.text] = attr.tipo_;
                } else {
                  context.x_state.pages[resp.state.current_page].imports[attr.text] = attr.tipo_;
                }
              } else {
                resp.open += "let ".concat(attr.var, " = require('").concat(attr.text, "');\n");
              }

              return resp;
            });

            function func(_x211, _x212) {
              return _func104.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_crear_id_unico': {
          x_icons: 'desktop_new',
          x_text_contains: 'crear id unico,,',
          //,,=requires comma
          x_level: '>2',
          hint: 'Obtiene un id unico (en 103 trillones) y lo asigna a la variable luego de la coma.',
          func: function () {
            var _func105 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                var: node.text.split(',').pop()
              }; //code

              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              context.x_state.npm['nanoid'] = '2.1.1';
              resp.open += "let ".concat(tmp.var, " = require('nanoid')();\n");
              return resp;
            });

            function func(_x213, _x214) {
              return _func105.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_aftertime': {
          x_icons: 'desktop_new',
          x_text_pattern: "ejecutar en \"*\" +(segundos|minutos|horas)",
          x_level: '>2',
          hint: 'Ejecuta su contenido desfasado en los segundos especificados.',
          func: function () {
            var _func106 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var time = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              }).trim(); //code

              var amount = node.text.split(' ').pop();
              if (amount == 'minutos') time += "*60";
              if (amount == 'horas') time += "*60*60";
              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              resp.open += "setTimeout(function q() {\n";
              resp.close = "}.bind(this), 1000*".concat(time, ");\n");
              return resp;
            });

            function func(_x215, _x216) {
              return _func106.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_probar': {
          x_icons: 'broken-line',
          x_text_exact: 'probar',
          x_level: '>2',
          hint: 'Encapsula sus hijos en un try/catch.',
          func: function () {
            var _func107 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //test if there is an error node child

              var subnodes = yield node.getNodes();
              var has_error = false;
              subnodes.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(function* (item) {
                  if (item.text == 'error' && item.icons.includes('help')) has_error = true;
                });

                return function (_x219) {
                  return _ref4.apply(this, arguments);
                };
              }().bind(this)); //code

              if (node.text_note != '') resp.open = "// ".concat(node.text_note.trim(), "\n");
              resp.open += 'try {\n';

              if (has_error == false) {
                resp.close += "} catch(e".concat(node.id, ") {\n console.log('error en comando probar: recuerda usar evento ?error como hijo para controlarlo.');\n");
              }

              resp.close += '}';
              return resp;
            });

            function func(_x217, _x218) {
              return _func107.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_probar_error': {
          x_icons: 'help',
          x_text_exact: 'error',
          x_all_hasparent: 'def_probar',
          x_level: '>2',
          hint: 'Ejecuta sus hijos si ocurre un error en el nodo padre.',
          func: function () {
            var _func108 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); //code

              resp.open += "} catch(e".concat(node.id, ") {\n");
              resp.open += "let error = e".concat(node.id, ";\n");
              if (node.text_note != '') resp.open += "// ".concat(node.text_note.trim(), "\n");
              return resp;
            });

            function func(_x220, _x221) {
              return _func108.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_insertar_modelo': {
          x_icons: 'desktop_new',
          x_text_pattern: "insertar modelo \"*\"",
          x_level: '>2',
          hint: "Inserta los atributos (campos) y sus valores en el modelo indicado entrecomillas. \n                    Si especifica una variable luego de la coma, asigna el resultado de la nueva insercion en esa variable.",
          func: function () {
            var _func109 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                var: node.id,
                data: {},
                model: ''
              };
              if (node.text.contains(',')) tmp.var = node.text.split(',').splice(-1)[0].trim();
              tmp.model = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              }).trim(); //get attributes and values as struct

              tmp.data = (yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                as_object: true
              }))).open; //code

              if (node.text_note != '') resp.open += "// ".concat(node.text_note.trim(), "\n");
              resp.open += "this.alasql('INSERT INTO ".concat(tmp.model, " VALUES ?', [").concat(tmp.data, "]);\n");
              return resp;
            });

            function func(_x222, _x223) {
              return _func109.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_consultar_modelo': {
          x_icons: 'desktop_new',
          x_text_contains: "consultar modelo \"",
          x_level: '>2',
          hint: "Realiza una consulta a una base de datos virtual (en memoria).\n                    Sus atributos corresponden a los campos y datos a filtrar.\n                    Se asigna el resultado a la variable luego de la coma.",
          func: function () {
            var _func110 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                var: node.id + '_',
                data: {},
                model: ''
              };
              if (node.text.contains(',')) tmp.var = node.text.split(',').splice(-1)[0].trim();
              tmp.model = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              }).trim(); //get attributes and values as struct

              tmp.data = yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                as_object: true
              })); //code

              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

              if (tmp.data.state.object && Object.keys(tmp.data.state.object) != '') {
                resp.open += "let ".concat(node.id, " = { keys:[], vals:[], where:").concat(tmp.data.open, " };\n                    for (let ").concat(node.id, "_k in ").concat(node.id, ".where) {\n                        ").concat(node.id, ".keys.push(").concat(node.id, "_k + '=?');\n                        ").concat(node.id, ".vals.push(").concat(node.id, ".where[").concat(node.id, "_k]);\n                    }\n                    let ").concat(tmp.var, " = this.alasql(`SELECT * FROM ").concat(tmp.model, " WHERE ${").concat(node.id, ".keys.join(' AND ')}`,").concat(node.id, ".vals);\n");
              } else {
                resp.open += "let ".concat(tmp.var, " = this.alasql('SELECT * FROM ").concat(tmp.model, "', []);\n");
                resp.open += "let ".concat(node.id, " = { where:{} };");
              }

              return resp;
            });

            function func(_x224, _x225) {
              return _func110.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_modificar_modelo': {
          x_icons: 'desktop_new',
          x_text_exact: "modificar modelo",
          x_not_empty: 'link',
          x_level: '>2',
          hint: "Modifica los datos de la consulta de modelo enlazada, aplicando los datos definidos en sus atributos.",
          func: function () {
            var _func111 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                data: {},
                model: ''
              }; //if (node.link=='') return {...resp,...{ valid:false }};
              //get target node

              var link_node = yield context.dsl_parser.getNode({
                id: node.link,
                recurse: false
              });

              if (link_node && link_node.valid == true) {
                if (link_node.text.contains('consultar modelo') == false) {
                  throw 'modificar modelo requires an arrow pointing to a consultar modelo node';
                } else {
                  //get linked info
                  tmp.model = context.dsl_parser.findVariables({
                    text: link_node.text,
                    symbol: "\"",
                    symbol_closing: "\""
                  }).trim();
                  tmp.model_where = link_node.id + '.where'; //get attributes and new values as struct

                  tmp.data = (yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                    as_object: true
                  }))).open; //code

                  if (node.text_note != '') resp.open += "// ".concat(node.text_note.trim(), "\n"); //write update statement

                  resp.open += "let ".concat(node.id, " = { keys:[], vals:[], from:[], data:").concat(tmp.data, " };\n");
                  resp.open += "for (let ".concat(node.id, "_k in ").concat(node.id, ".data) {\n                            ").concat(node.id, ".keys.push(").concat(node.id, "_k+'=?');\n                            ").concat(node.id, ".vals.push(").concat(node.id, ".data[").concat(node.id, "_k]);\n                        }\n"); //write where requirements

                  resp.open += "for (let ".concat(node.id, "_k in ").concat(tmp.model_where, ") {\n                            ").concat(node.id, ".from.push(").concat(node.id, "_k+'=?');\n                            ").concat(node.id, ".vals.push(").concat(tmp.model_where, "[").concat(node.id, "_k]);\n                        }\n"); //statement

                  resp.open += "this.alasql(`UPDATE ".concat(tmp.model, " SET ${").concat(node.id, ".keys.join(',')} WHERE ${").concat(node.id, ".from.join(' AND ')}`,").concat(node.id, ".vals);\n");
                }
              } else {
                throw 'modificar modelo requires an arrow pointing to an active consultar modelo node (cannot be cancelled)';
              } //


              return resp;
            });

            function func(_x226, _x227) {
              return _func111.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_eliminar_modelo': {
          x_icons: 'desktop_new',
          x_text_exact: "eliminar modelo",
          x_not_empty: 'link',
          x_level: '>2',
          hint: "Elimina los datos de la consulta de modelo enlazada.",
          func: function () {
            var _func112 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                model: ''
              }; //if (node.link=='') return {...resp,...{ valid:false }};
              //get target node

              var link_node = yield context.dsl_parser.getNode({
                id: node.link,
                recurse: false
              });

              if (link_node && link_node.valid == true) {
                if (link_node.text.contains('consultar modelo') == false) {
                  throw 'eliminar modelo requires an arrow pointing to a consultar modelo node';
                } else {
                  //get linked info
                  tmp.model = context.dsl_parser.findVariables({
                    text: link_node.text,
                    symbol: "\"",
                    symbol_closing: "\""
                  }).trim();
                  tmp.model_where = link_node.id + '.where'; //code

                  if (node.text_note != '') resp.open += "// ".concat(node.text_note.trim(), "\n");
                  resp.open += "let ".concat(node.id, " = { keys:[], vals:[] };\n");
                  resp.open += "for (let ".concat(node.id, "_k in ").concat(tmp.model_where, ") {\n                            ").concat(node.id, ".keys.push(").concat(node.id, "_k+'=?');\n                            ").concat(node.id, ".vals.push(").concat(tmp.model_where, "[").concat(node.id, "_k]);\n                        }\n");
                  resp.open += "if (".concat(node.id, ".keys.length>0) {\n                            this.alasql(`DELETE FROM ").concat(tmp.model, " WHERE ${").concat(node.id, ".keys.JOIN(' AND ')}`,").concat(node.id, ".vals);\n                        } else {\n                            this.alasql(`DELETE FROM ").concat(tmp.model, "`,[]);\n                        }\n");
                }
              } else {
                throw 'eliminar modelo requires an arrow pointing to an active consultar modelo node (cannot be cancelled)';
              } //


              return resp;
            });

            function func(_x228, _x229) {
              return _func112.apply(this, arguments);
            }

            return func;
          }()
        },
        //def_consultar_web
        'def_consultar_web': {
          x_icons: 'desktop_new',
          x_text_contains: 'consultar web,,',
          x_level: '>3',
          attributes_aliases: {
            'method': '_method,:metodo,:method,_metodo',
            'response': 'responsetype,response,:responsetype,:response'
          },
          hint: 'Realiza una llamada a la url indicada enviando los datos definidos en sus atributos. Entrega resultados en variable definida luego de coma.',
          func: function () {
            var _func113 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //prepare

              var isProxySon = 'current_proxy' in resp.state ? true : false;
              var isServerSon = 'current_func' in resp.state ? true : false;
              var tmp = {
                var: node.id,
                meta: false,
                simple: true,
                proxy: isProxySon,
                progress: true,
                axios_call: isProxySon == true ? '$axios' : 'this.$axios',
                config: {
                  method: 'get',
                  url: '',
                  data: {},
                  headers: {},
                  auth: {},
                  timeout: 0,
                  response: 'json',
                  maxContentLength: 5000000
                }
              };
              if (isServerSon) tmp.axios_call = 'axios';
              if (node.text.contains(',')) tmp.var = node.text.split(',').splice(-1)[0].trim(); //attributes

              var attrs = aliases2params('def_consultar_web', node, false, 'this.'); //prepare attrs

              for (var x in attrs) {
                if (x.charAt(0) == ':') {
                  if (typeof attrs[x] === 'string') {
                    if (x != ':progress' && x != ':method' && attrs[x].contains('.') == false) {
                      attrs[x.right(x.length - 1)] = '**' + attrs[x] + '**';
                    } else if (attrs[x].contains('$store.') || attrs[x].contains('this.') || attrs[x].contains('process.env.')) {
                      if (state.current_proxy) {
                        attrs[x.right(x.length - 1)] = '**' + attrs[x].replaceAll('this.$store.', 'store.') + '**';
                      } else {
                        attrs[x.right(x.length - 1)] = '**' + attrs[x] + '**';
                      }
                    } else {
                      attrs[x.right(x.length - 1)] = attrs[x];
                    }
                  } else {
                    attrs[x.right(x.length - 1)] = attrs[x];
                  }

                  delete attrs[x];
                }
              } //


              delete attrs.refx;
              if (node.link != '') tmp.config.url = node.link.trim();
              if (attrs.progress) tmp.progress = attrs.progress;
              delete attrs.progress;
              if (attrs.meta) tmp.meta = true;
              delete attrs.meta;
              if (attrs.url) tmp.config.url = attrs.url;
              delete attrs.url;

              for (var test of 'method,username,password,encoding,maxlength,redirects,timeout,response'.split(',')) {
                if (attrs[test]) {
                  tmp.simple = false;

                  if (test == 'username' || test == 'password') {
                    tmp.config.auth[test] = attrs[test];
                  } else if (test == 'encoding') {
                    tmp.config.responseEncoding = attrs[test];
                  } else {
                    tmp.config[test] = attrs[test];
                  }

                  delete attrs[test];
                }
              } //extract headers from attrs (and keep data)


              for (var _x232 in attrs) {
                if (_x232.length > 2 && _x232.substr(0, 3) == 'x-:') {
                  tmp.config.headers[_x232.right(_x232.length - 3)] = attrs[_x232];
                  delete attrs[_x232];
                } else if (_x232.length > 2 && _x232.substr(0, 2) == 'x-') {
                  tmp.config.headers[_x232] = attrs[_x232];
                  delete attrs[_x232];
                }
              }

              tmp.config.data = _objectSpread2({}, attrs);

              if (tmp.config.method == 'get') {
                tmp.config.data = {
                  params: tmp.config.data
                };
              } else if (tmp.config.method == 'postjson') {
                tmp.config.method = 'post';
                tmp.config.data = {
                  params: tmp.config.data
                };
              } //simple or advanced?


              if (tmp.simple) {
                //add comment
                if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

                if (tmp.meta) {
                  resp.open += "const ".concat(tmp.var, " = await ").concat(tmp.axios_call, ".").concat(tmp.config.method, "(").concat(tmp.config.url, ", ").concat(context.jsDump(tmp.config.data), ", { progress:").concat(tmp.progress, " });\n");
                } else {
                  resp.open += "const ".concat(tmp.var, " = (await ").concat(tmp.axios_call, ".").concat(tmp.config.method, "(").concat(tmp.config.url, ", ").concat(context.jsDump(tmp.config.data), ", { progress:").concat(tmp.progress, " })).data;\n");
                }
              } else {
                //advanced?
                if (tmp.config.response && tmp.config.response != 'json') {
                  tmp.config.responseType = tmp.config.response;
                }

                delete tmp.config.response; //write data on close to support download/upload child events to config object

                resp.state.from_consultar_web = node.id + '_config'; //add comment

                if (node.text_note != '') resp.close += "// ".concat(node.text_note.cleanLines(), "\n");
                resp.close += "let ".concat(node.id, "_config = ").concat(context.jsDump(tmp.config), ";\n"); //

                if (tmp.meta) {
                  resp.close += "const ".concat(tmp.var, " = await ").concat(tmp.axios_call, ".request(").concat(node.id, "_config, { progress:").concat(tmp.progress, " });\n");
                } else {
                  resp.close += "\n                        const ".concat(tmp.var, "_ = await ").concat(tmp.axios_call, ".request(").concat(node.id, "_config, { progress:").concat(tmp.progress, " });\n                        const ").concat(tmp.var, " = ").concat(tmp.var, "_.data;\n");
                }
              } //return


              return resp;
            });

            function func(_x230, _x231) {
              return _func113.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_consultar_web_upload': {
          x_icons: 'help',
          x_text_exact: 'upload',
          x_all_hasparent: 'def_consultar_web',
          x_level: '>2',
          hint: 'Evento para ver el progreso del upload de un consultar web padre (axios).',
          func: function () {
            var _func114 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_consultar_web) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //code

              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");
              resp.open += "".concat(state.from_consultar_web, ".onUploadProgress = function(evento) {\n");
              resp.close += "};\n";
              return resp;
            });

            function func(_x233, _x234) {
              return _func114.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_consultar_web_download': {
          x_icons: 'help',
          x_text_exact: 'download',
          x_all_hasparent: 'def_consultar_web',
          x_level: '>2',
          hint: 'Evento para ver el progreso del download de un consultar web padre (axios).',
          func: function () {
            var _func115 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_consultar_web) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //code

              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");
              resp.open += "".concat(state.from_consultar_web, ".onDownloadProgress = function(evento) {\n");
              resp.close += "};\n";
              return resp;
            });

            function func(_x235, _x236) {
              return _func115.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_xcada_registro': {
          x_icons: 'penguin',
          x_text_contains: "por cada registro en",
          x_level: '>2',
          attributes_aliases: {
            'use_index': 'index',
            'unique': 'unique,id',
            'target': 'template,target'
          },
          hint: "Repite sus hijos por cada elemento entrecomillas, dejando el item en curso en la variable luego de la coma.",
          func: function () {
            var _func116 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {
                key: '',
                has_await: false,
                query: node.text,
                target: ''
              };

              if (!state.from_script && !state.get_params) {
                resp.valid = false;
                return resp;
              }

              if (tmp.query.contains('$store.')) tmp.query = tmp.query.replaceAll('$store.', '$store.state.');
              if (tmp.query.contains(',')) tmp.key = tmp.query.split(',').splice(-1)[0].trim();
              tmp.iterator = context.dsl_parser.findVariables({
                text: tmp.query,
                symbol: "\"",
                symbol_closing: "\""
              }).trim();

              if (tmp.iterator.charAt(0) == '$' && !tmp.iterator.contains('$variables.') && !tmp.iterator.contains('$vars.') && !tmp.iterator.contains('$store.') && !tmp.iterator.contains('$params.') && !tmp.iterator.contains('$route.')) {
                tmp.iterator = tmp.iterator.right(tmp.iterator.length - 1);
              }

              var sons = yield node.getNodes();

              if (sons.length == 1) {
                tmp.target = sons[0].id;
              } else if (sons.length > 1) {
                tmp.target = 'template';
              }

              var attrs = aliases2params('def_xcada_registro', node);
              var params = {
                unique: 0,
                key: 0,
                target: tmp.target,
                tipo: 'v-for',
                iterator: tmp.iterator,
                item: tmp.key,
                use_index: "".concat(tmp.key, "_index")
              };

              if (params[':template']) {
                params.target = 'template';
                delete params[':template'];
                delete params['template'];
              }

              params = _objectSpread2(_objectSpread2({}, params), attrs);
              if (params.unique == 0) params.unique = params.use_index;

              if (state.get_params) {
                resp.state.params = params;
                delete resp.state.get_params;
                return resp;
              } //code (only from scripting)


              if (node.icons.includes('bell') && params.iterator.contains('**')) {
                params.iterator = getTranslatedTextVar(params.iterator);
              }

              params.iterator = params.iterator.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$store.', 'this.$store.state.');
              context.x_state.pages[state.current_page].imports['underscore'] = '_'; //search consultar web nodes

              if (!params[':each'] && sons.length > 0) {
                for (var x of sons) {
                  if (x.text.contains('consultar web')) {
                    tmp.has_await = true;
                    break;
                  }

                  yield setImmediatePromise$1(); //@improved
                }
              } //write code


              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

              if (tmp.has_await == true) {
                resp.open += "_.each(".concat(params.iterator, ", async function(").concat(params.item, ",").concat(params.use_index, ") {");
                resp.close = "}, this);";
              } else {
                resp.open += "for (let ".concat(params.use_index, "=0;").concat(params.use_index, "<").concat(params.iterator, ".length;").concat(params.use_index, "++) {");
                resp.open += "let ".concat(params.item, " = ").concat(params.iterator, "[").concat(params.use_index, "];\n");
                resp.close = "}\n";
              } //


              return resp;
            });

            function func(_x237, _x238) {
              return _func116.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_responder (@todo i18n)
        //**def_insertar_modelo (@todo test it after adding support for events)
        //**def_consultar_modelo
        //**def_modificar_modelo
        //**def_eliminar_modelo
        //**def_consultar_web
        //**def_consultar_web_upload
        //**def_consultar_web_download
        //*def_aftertime
        //*def_struct
        //*def_extender
        //*def_npm_instalar
        //*def_probar
        //*def_probar_error (ex.def_event_try)
        //*def_literal_js
        //*def_console
        //**def_xcada_registro
        //*def_crear_id_unico
        'def_guardar_nota': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'guardar nota|capturar nota|note:save|save note',
          attributes_aliases: {
            'strip': 'text,strip,limpio',
            'asis': 'asis,as_it_was'
          },
          meta_type: 'script',
          hint: 'Crea una variable con el contenido HTML indicado en la nota del nodo.',
          func: function () {
            var _func117 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); // attrs

              var attrs = _objectSpread2(_objectSpread2({}, {
                html: true,
                asis: false
              }), aliases2params('def_guardar_nota', node, false, 'this.'));

              delete attrs.refx;
              if (attrs[':html']) attrs.html = true;
              if (attrs[':strip']) attrs.html = false; //prepare

              var tmp = {
                content: node.text_note
              };
              tmp.var = node.text.split(',').pop().trim();

              if (attrs.html) {
                tmp.content = node.text_rich; //this has inner of body already
                //parse content

                if (!attrs[':asis'] && !attrs.asis) {
                  //transform tags 'p' style:text-align:center to <center>x</center>
                  //transform <p>x</p> to x<br/>
                  var cheerio = require('cheerio');

                  var sub = cheerio.load(tmp.content, {
                    ignoreWhitespace: false,
                    xmlMode: true,
                    decodeEntities: false
                  });
                  var paragraphs = sub('p').toArray();
                  paragraphs.map(function (elem) {
                    var cur = $(elem);
                    var style = cur.attr('style');

                    if (style && style.contains('text-align:center')) {
                      //transform tags 'p' style:text-align:center to <center>x</center>
                      cur.replaceWith("<center>".concat(cur.html(), "</center>"));
                    } else {
                      cur.replaceWith("".concat(cur.html(), "<br/>"));
                    }
                  });
                  tmp.content = sub.html();
                }
              } //escape variables


              if (node.icons.includes('bell')) {
                tmp.content = getTranslatedTextVar(tmp.content);
              } //code


              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");
              resp.open += "let ".concat(tmp.var, " = ").concat(tmp.content, ";\n");
              return resp;
            });

            function func(_x239, _x240) {
              return _func117.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_agregar_campos': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'agregar campos a',
          meta_type: 'script',
          hint: "Agrega los campos definidos en sus atributos (y valores) a cada uno de los registros de la variable de entrada (array de objetos).\n\n                   Si hay una variable definida, se crea una nueva instancia del array con los campos nuevos, en caso contrario se modifican los valores de la variable original.",
          func: function () {
            var _func118 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //get vars and attrs

              var tmp = {
                var: ''
              };
              if (node.text.contains(',')) tmp.var = node.text.split(',').pop().trim();
              tmp.original = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              });

              if (state.from_server) {
                tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                tmp.original = tmp.original.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
              } else if (tmp.var != '') {
                tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$store.', 'this.$store.state.');
                pon;
                tmp.original = tmp.original.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$store.', 'this.$store.state.');
              }

              if (tmp.original.contains('**') && node.icons.includes('bell')) {
                tmp.original = getTranslatedTextVar(tmp.original);
              } // create obj from current node as js obj


              tmp.attr = yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                as_object: true
              }));
              delete tmp.attr.refx; //change this to resp if parent is server

              if (state.from_server) tmp.attr.open = tmp.attr.open.replaceAll('this.', 'resp.'); //add underscore

              if (state.current_page) {
                context.x_state.pages[state.current_page].imports['underscore'] = '_';
              } else if (state.current_proxy) {
                context.x_state.proxies[state.current_proxy].imports['underscore'] = '_';
              } else if (state.current_store) {
                context.x_state.stores[state.current_store].imports['underscore'] = '_';
              } //code


              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

              if (tmp.var.contains('this')) {
                resp.open += "".concat(tmp.var, " = _.map(").concat(tmp.original, ", function(element) {\n                        return _.extend({},element,").concat(tmp.attr.open, ");\n                    });");
              } else if (tmp.var != '') {
                resp.open += "let ".concat(tmp.var, " = _.map(").concat(tmp.original, ", function(element) {\n                        return _.extend({},element,").concat(tmp.attr.open, ");\n                    });");
              } else {
                resp.open += "".concat(tmp.original, " = _.each(").concat(tmp.original, ", function(element) {\n                        return _.extend({},element,").concat(tmp.attr.open, ");\n                    });");
              }

              return resp;
            });

            function func(_x241, _x242) {
              return _func118.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_preguntar': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'preguntar|dialogo:confirm',
          attributes_aliases: {
            'title': 'titulo,title',
            'message': 'mensaje,contenido,message',
            'buttonTrueText': 'true,aceptar,boton:aceptar',
            'buttonFalseText': 'false,cancel,boton:cancelar',
            'width': 'ancho,width',
            'icon': 'icon,icono',
            'persistent': 'persistent,obligatorio,persistente'
          },

          /*x_test_func: function(node) {
              //return true if its a valid match
          },*/
          hint: "Abre un dialogo preguntando lo indicado en sus atributos, respondiendo true o false en la variable indicada luego de la coma.",
          func: function () {
            var _func119 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //get vars and attrs

              var tmp = {
                var: '',
                text: ''
              };
              if (node.text.contains(',')) tmp.var = node.text.split(',').pop().trim(); //add plugin

              context.x_state.plugins['vuetify-confirm'] = {
                global: true,
                mode: 'client',
                npm: {
                  'vuetify-confirm': '*'
                },
                extra_imports: ['vuetify'],
                config: '{ vuetify }'
              }; //attrs

              var params = aliases2params('def_preguntar', node, false, 'this.');
              delete params.refx; //process message attribute

              if (params.message) {
                /* ex.= 'Estas seguro que deseas borrar {{ x }} ?'
                'Estas seguro que deseas borrar '+x+' ?'
                */
                tmp.text = params.message;
                var vars = context.dsl_parser.findVariables({
                  text: params.message,
                  symbol: "{{",
                  symbol_closing: "}}",
                  array: true
                });

                for (var vr in vars) {
                  if (vars[vr].contains('|')) {
                    //add filter support: 'Estas seguro que deseas agregar {{ monto | numeral('0,0') }} ?'
                    var clean = vars[vr].replaceAll('{{', '').replaceAll('}}', '');
                    var the_var = clean.split('|')[0].trim();
                    var the_filter = clean.split('|').pop().trim();
                    the_filter = the_filter.replace('(', "(".concat(the_var, ","));
                    tmp.text = tmp.text.replace(vars[vr], "'+this.$nuxt.$options.filters.".concat(the_filter, "+'"));
                  } else {
                    var n_var = vars[vr].replaceAll('{{', "'+").replaceAll('}}', "+'");
                    tmp.text = tmp.text.replace(vars[vr], n_var);
                  }
                } //


                tmp.text = "'".concat(tmp.text, "'");
                delete params.message;
              } //code


              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

              if (tmp.text && Object.keys(params) == 0) {
                if (tmp.var.contains('this.')) {
                  resp.open += "".concat(tmp.var, " = await this.$confirm(").concat(tmp.text, ");\n");
                } else {
                  resp.open += "let ".concat(tmp.var, " = await this.$confirm(").concat(tmp.text, ");\n");
                }
              } else {
                if (tmp.var.contains('this.')) {
                  resp.open += "".concat(tmp.var, " = await this.$confirm(").concat(tmp.text, ",").concat(context.jsDump(params), ");\n");
                } else {
                  resp.open += "let ".concat(tmp.var, " = await this.$confirm(").concat(tmp.text, ",").concat(context.jsDump(params), ");\n");
                }
              }

              return resp;
            });

            function func(_x243, _x244) {
              return _func119.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_var_clonar': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'clonar variable|copiar variable|variable:clonar|variable:copiar',
          attributes_aliases: {},
          hint: "Crea una copia de la variable indicada, en la variable luego de la coma.",
          func: function () {
            var _func120 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //get vars and attrs

              var tmp = {
                var: '',
                original: ''
              };
              if (node.text.contains(',')) tmp.var = node.text.split(',').pop().trim(); //prepare new var

              if (tmp.var.contains('$')) {
                if (state.from_server) {
                  tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                } else {
                  tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
                  if (tmp.var == 'this.') tmp.var = 'this';
                }
              } //prepare original var


              tmp.original = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              });

              if (tmp.original.contains('**') && node.icons.includes('bell')) {
                tmp.original = getTranslatedTextVar(tmp.original);
              } else if (tmp.original.contains('$')) {
                if (state.from_server) {
                  tmp.original = tmp.original.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                } else {
                  tmp.original = tmp.original.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
                  if (tmp.original == 'this.') tmp.original = 'this';
                }
              } //code


              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");

              if (tmp.var.contains('this.')) {
                resp.open += "".concat(tmp.var, " = JSON.parse(JSON.stringify(").concat(tmp.original, "));\n");
              } else {
                resp.open += "let ".concat(tmp.var, " = JSON.parse(JSON.stringify(").concat(tmp.original, "));\n");
              }

              return resp;
            });

            function func(_x245, _x246) {
              return _func120.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_enviarpantalla': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'enviar a pantalla',
          x_not_empty: 'link',
          attributes_aliases: {
            'event_label': 'tag,tipo,etiqueta,event_label'
          },
          meta_type: 'script',
          hint: 'Envia al usuario a la pantalla enlazada.',
          func: function () {
            var _func121 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              });
              if (node.link.contains('ID_') == false) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); // prepare

              var tmp = {
                link: node.link,
                target: ''
              };
              var link_node = yield context.dsl_parser.getNode({
                id: node.link,
                recurse: false
              });

              if (link_node && link_node.valid == true) {
                tmp.target = "{vuepath:".concat(link_node.text, "}");
              } else {
                context.x_console.outT({
                  message: "enviar a pantalla, invalid linked node",
                  color: 'red',
                  data: link_node
                });
                throw "Invalid 'enviar a pantalla' linked node";
              } //code
              //if (node.text_note != '') resp.open += `// ${node.text_note.cleanLines()}\n`;


              var isProxySon = 'current_proxy' in resp.state ? true : false;

              if (isProxySon == true) {
                resp.open += "return redirect('".concat(tmp.target, "');\n");
              } else {
                // params
                var params = aliases2params('def_enviarpantalla', node, false, 'this.');
                delete params.refx;

                if (Object.keys(params) != '') {
                  if (tmp.target.charAt(0) == '/') tmp.target = tmp.target.right(tmp.target.length - 1);

                  if (params[':query']) {
                    resp.open += "this.$router.push({ path:'".concat(tmp.target, "', query:").concat(context.jsDump(params), " });\n");
                  } else {
                    resp.open += "this.$router.push({ name:'".concat(tmp.target, "', params:").concat(context.jsDump(params), " });\n");
                  }
                } else {
                  resp.open += "this.$router.push('".concat(tmp.target, "');\n");
                }
              }

              return resp;
            });

            function func(_x247, _x248) {
              return _func121.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_procesar_imagen': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'procesar imagen|transformar imagen|ajustar imagen|imagen:transform',
          attributes_aliases: {
            'grey': 'greyscale,gris,grises,grey',
            'maxkb': 'maxkb,compress',
            'format': 'format,format,mimetype'
          },
          meta_type: 'script',
          hint: 'Aplica las modificaciones indicadas en sus atributos a la imagen (dataurl) indicada como variables. Retorna un dataurl de la imagen modificada.',
          func: function () {
            var _func122 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); // get: cmd 'input', output / prepare params

              var tmp = yield parseInputOutput(node, state);
              var params = (yield context.x_commands['def_struct'].func(node, _objectSpread2(_objectSpread2({}, state), {
                as_object: true
              }))).state.object; //code

              context.x_state.npm['image-js'] = '*';
              if (node.text_note != '') resp.open += "// ".concat(node.text_note.cleanLines(), "\n");
              resp.open += "let { Image } = require('image-js');\n                let ".concat(node.id, " = ").concat(tmp.input, ";\n");

              if (params.maxkb) {
                //compress first
                context.x_state.npm['browser-image-compression'] = '*';
                context.x_state.pages[resp.state.current_page].imports['browser-image-compression'] = 'imageCompression';
                resp.open += "let ".concat(node.id, "_f = await imageCompression.getFilefromDataUrl(").concat(tmp.input, ");\n                    let ").concat(node.id, "_c = await imageCompression(").concat(node.id, "_f, { maxSizeMB: ").concat(params.maxkb, "/1000 });\n                    ").concat(node.id, " = await imageCompression.getDataUrlFromFile(").concat(node.id, "_c);\n");
              } //scale and fxs


              resp.open += "let ".concat(tmp.output, "_ = await Image.load(").concat(node.id, ");\n");
              if (tmp.output.contains('this.') == false) resp.open += "let ";
              resp.open += "".concat(tmp.output, " = ").concat(tmp.output, "_"); // params

              if (params.anchomax) resp.open += ".resize({ width:(".concat(tmp.output, "_.width>").concat(params.anchomax, ")?").concat(params.anchomax, ":").concat(tmp.output, "_.width })");
              if (params.altomax) resp.open += ".resize({ height:(".concat(tmp.output, "_.height>").concat(params.altomax, ")?").concat(params.altomax, ":").concat(tmp.output, "_.height })");
              if (params.resmax) resp.open += ".resize({ width:(".concat(tmp.output, "_.width>").concat(params.resmax, ")?").concat(params.resmax, ":").concat(tmp.output, "_.width, height:(").concat(tmp.output, "_.height>").concat(params.resmax, ")?").concat(params.resmax, ":").concat(tmp.output, "_.height })");

              if (params.resize && params.resize.contains('x')) {
                resp.open += ".resize({ width:".concat(params.resize.split('x')[0], ", height:").concat(params.resize.split('x').pop().trim(), " })");
              } else {
                resp.open += ".resize({ width:".concat(params.resize, ", height:").concat(params.resize, " })");
              }

              if (params.grey || params.greyscale || params.gris || params.grises) resp.open += ".grey()";

              if (params.format || params.formato || params.mimetype) {
                if (params.formato) params.format = params.formato;
                if (params.mimetype) params.format = params.mimetype;

                if (params.format.contains('/')) {
                  resp.open += ".toDataURL('".concat(params.format.replaceAll("'", ""), "')");
                } else {
                  resp.open += ".toDataURL('image/".concat(params.format.replaceAll("'", ""), "')");
                }
              }

              resp.open += ";\n"; //

              return resp;
            });

            function func(_x249, _x250) {
              return _func122.apply(this, arguments);
            }

            return func;
          }()
        },
        //**def_guardar_nota
        //**def_agregar_campos
        //**def_preguntar
        //def_array_transformar (pending)
        //def_procesar_imagen
        //def_imagen_exif
        //**def_var_clonar
        //--def_modificar (invalid node for vue)
        //**def_enviarpantalla (todo test)
        'def_analytics_evento': {
          x_level: '>2',
          x_icons: 'desktop_new',
          x_text_contains: 'analytics:event',
          x_or_hasparent: 'def_page,def_componente,def_layout',
          attributes_aliases: {
            'event_label': 'tag,tipo,etiqueta,event_label'
          },
          meta_type: 'script',
          hint: 'Envia el evento indicado al Google Analytics configurado.',
          func: function () {
            var _func123 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (!state.from_script) return _objectSpread2(_objectSpread2({}, resp), {
                valid: false
              }); //if (!context.x_state.config_node['google:analytics']) return {...resp,...{ valid:false }};
              // params

              var params = aliases2params('def_analytics_evento', node, false, 'this.');
              delete params.refx;

              var details = _objectSpread2(_objectSpread2({}, {
                event_category: state.current_page
              }), params); //event name


              var event = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              });

              if (event.contains('**') && node.icons.includes('bell')) {
                event = getTranslatedTextVar(event);
              } else if (event.contains('$')) {
                event = event.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$config.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
                event = "'".concat(event, "'");
              } else if (event.charAt(0) == '(' && event.slice(-1) == ')') {
                event = event.slice(1).slice(0, -1);
              } else {
                event = "'".concat(event, "'");
              } //code


              if ('google:analytics' in context.x_state.config_node) {
                if (node.text_note != '') resp.open += "// ".concat(node.text_note, "\n");
                resp.open += "this.$gtag('event', ".concat(event, ", ").concat(context.jsDump(details), ");\n");
                return resp;
              } else {
                throw 'analytics:event requires config->google:analytics key!';
              }
            });

            function func(_x251, _x252) {
              return _func123.apply(this, arguments);
            }

            return func;
          }()
        } //**def_analytics_evento - @todo test
        //def_medianet_ad - @todo think about the script2 code issue with cheerio
        // OTHER node types

        /*'def_imagen': {
        	x_icons:'idea',
        	x_not_icons:'button_cancel,desktop_new,help',
        	x_not_empty:'attributes[:src]',
        	x_empty:'',
        	x_level:'>2',
        	func:async function(node,state) {
        		return context.reply_template({ otro:'Pablo', state });
        	}
        },*/
        //

      };
    });
    return _ref.apply(this, arguments);
  }

  function setObjectKeys(obj, value) {
    var resp = obj;

    if (typeof resp === 'string') {
      resp = {};
      var keys = obj.split(',');

      for (var i in keys) {
        resp[keys[i]] = value;
      }
    } else {
      for (var _i in resp) {
        resp[_i] = value;
      }
    }

    return resp;
  }

  function setToValue(obj, value, path) {
    var i;
    path = path.split('.');

    for (i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]];
    }

    obj[path[i]] = value;
  }

  function getVal(project, myPath) {
    return myPath.split('.').reduce((res, prop) => res[prop], project);
  }

  /**
  * Base Deploy: A class define deployments for vue_dsl.
  * @name 	base_deploy
  * @module 	base_deploy
  **/
  class base_deploy {
    constructor() {
      var {
        context = {},
        name = 'base_deploy'
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.context = context;
      this.name = name;
    }

    logo() {
      var _arguments = arguments,
          _this = this;

      return _asyncToGenerator(function* () {
        var {
          name = _this.name,
          config = {}
        } = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};

        var cfonts = require('cfonts');

        cfonts.say(name, _objectSpread2(_objectSpread2({}, {
          font: 'block',
          gradient: 'red,blue'
        }), config));
      })();
    }

    run() {
      return _asyncToGenerator(function* () {
        return true;
      })();
    }

    deploy() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        var errors = [];

        _this2.context.x_console.spinner({
          message: "Deploying ".concat(_this2.name, " instance")
        }); //spinner.start('Deploying local instance');

        /*try {
            //launch in a new terminal
            await this.context.launchTerminal('npm',['run','dev'],this.context.x_state.dirs.app);
            //results.git_add = await spawn('npm',['run','dev'],{ cwd:this.x_state.dirs.app });
            spinner.succeed('NuxtJS launched successfully');
        } catch(gi) { 
            spinner.fail('Project failed to launch');
            errors.push(gi);
        }*/


        return errors;
      })();
    }

    base_build() {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        // builds the project
        var spawn = require('await-spawn'),
            path = require('path'),
            fs = require('fs').promises; //let ora = require('ora');


        var node_modules_final = path.join(_this3.context.x_state.dirs.app, 'node_modules');
        var node_package = path.join(_this3.context.x_state.dirs.app, 'package.json');
        var npm = {},
            errors = [];

        _this3.context.x_console.outT({
          message: "Building project",
          color: 'cyan'
        });

        var spinner = _this3.context.x_console.spinner({
          message: 'Building project'
        });

        var node_modules_exist = yield _this3.exists(node_modules_final);
        var node_package_exist = yield _this3.exists(node_package);

        if (node_modules_exist && node_package_exist) {
          //test if every package required is within node_modules
          spinner.start("Some npm packages where installed; checking ..");
          var pkg = JSON.parse(yield fs.readFile(node_package, 'utf-8'));
          var all_ok = true;

          for (var pk in pkg.dependencies) {
            var tst_dir = path.join(_this3.context.x_state.dirs.app, 'node_modules', pk);
            var tst_exist = yield _this3.exists(tst_dir);
            if (!tst_exist) all_ok = false;
          }

          node_modules_exist = all_ok;

          if (all_ok) {
            spinner.succeed('Using existing npm packages');
          } else {
            spinner.warn('Some packages are new, requesting them');
          }
        } // issue npm install (400mb)


        if (!node_modules_exist) {
          spinner.start("Installing npm packages"); //this.x_console.outT({ message:`Installing npm packages` });

          try {
            npm.install = yield spawn('npm', ['install'], {
              cwd: _this3.context.x_state.dirs.app
            }); //, stdio:'inherit'

            spinner.succeed("npm install succesfully");
          } catch (n) {
            npm.install = n;
            spinner.fail('Error installing npm packages');
            errors.push(n);
          }
        } // issue npm run build


        spinner.start("Building NUXT project");

        try {
          npm.build = yield spawn('npm', ['run', 'build'], {
            cwd: _this3.context.x_state.dirs.app
          });
          spinner.succeed('Project build successfully');
        } catch (nb) {
          npm.build = nb;
          spinner.fail('NUXT build failed');

          _this3.context.x_console.out({
            message: "Building NUXT again to show error in console",
            color: 'red'
          }); //build again with output redirected to console, to show it to user


          try {
            console.log('\n');
            npm.build = yield spawn('npm', ['run', 'dev'], {
              cwd: _this3.context.x_state.dirs.app,
              stdio: 'inherit',
              timeout: 15000
            });
          } catch (eg) {}

          errors.push(nb);
        }

        return errors;
      })();
    } //****************************
    // onPrepare and onEnd steps
    //****************************


    pre() {
      return _asyncToGenerator(function* () {})();
    }

    post() {
      return _asyncToGenerator(function* () {})();
    } // HELPER methods


    exists(dir_or_file) {
      return _asyncToGenerator(function* () {
        var fs = require('fs').promises;

        try {
          yield fs.access(dir_or_file);
          return true;
        } catch (e) {
          return false;
        }
      })();
    }

    _isLocalServerRunning() {
      var _arguments2 = arguments,
          _this4 = this;

      return _asyncToGenerator(function* () {
        var port = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : _this4.context.x_state.central_config.port;

        var is_reachable = require('is-port-reachable');

        var resp = yield is_reachable(port);
        return resp;
      })();
    }

    launchTerminal(cmd) {
      var _arguments3 = arguments;
      return _asyncToGenerator(function* () {
        var args = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : [];
        var basepath = _arguments3.length > 2 ? _arguments3[2] : undefined;

        var spawn = require('await-spawn');

        var args_p = '';
        var resp = {
          error: false
        };

        if (basepath) {
          args_p = "sleep 2; clear; cd ".concat(basepath, " && ").concat(cmd, " ").concat(args.join(' '));
        } else {
          args_p = 'sleep 2; clear; ' + cmd + ' ' + args.join(' ');
        }

        try {
          resp = yield spawn('npx', ['terminal-tab', args_p]);
        } catch (e) {
          resp = _objectSpread2(_objectSpread2({}, e), {
            error: true
          });
        }

        return resp;
      })();
    }

  }

  class local extends base_deploy {
    constructor() {
      var {
        context = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super({
        context,
        name: 'Local'
      });
    }

    deploy() {
      var _this = this;

      return _asyncToGenerator(function* () {
        var build = {};

        if ((yield _this._isLocalServerRunning()) == false) {
          _this.context.x_console.title({
            title: 'Deploying Local NuxtJS instance',
            color: 'green'
          });

          yield _this.logo(); //only launch nuxt server if its not running already
          // builds the app

          build.try_build = yield _this.base_build();

          if (build.try_build.length > 0) {
            _this.x_console.outT({
              message: "There was an error building the project.",
              color: 'red'
            });

            return false;
          }

          build.deploy_local = yield _this.run();

          if (build.deploy_local.length > 0) {
            _this.context.x_console.outT({
              message: "There was an error deploying locally.",
              color: 'red',
              data: build.deploy_local.toString()
            });

            return false;
          }
        } else {
          _this.context.x_console.title({
            title: 'Updating local running NuxtJS instance',
            color: 'green'
          });

          yield _this.logo();

          _this.context.x_console.outT({
            message: "Project updated.",
            color: 'green'
          });
        }

        return true;
      })();
    }

    run() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        //issue npm run dev
        var errors = [];

        require('await-spawn');

        var spinner = _this2.context.x_console.spinner({
          message: 'Deploying local instance'
        }); //this.debug('Local deploy');


        spinner.start('Deploying local instance');

        try {
          //launch in a new terminal
          yield _this2.launchTerminal('npm', ['run', 'dev'], _this2.context.x_state.dirs.app); //results.git_add = await spawn('npm',['run','dev'],{ cwd:this.x_state.dirs.app });

          spinner.succeed('NuxtJS launched successfully');
        } catch (gi) {
          spinner.fail('Project failed to launch');
          errors.push(gi);
        }

        return errors;
      })();
    }

  }

  class eb extends base_deploy {
    constructor() {
      var {
        context = {}
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super({
        context,
        name: 'AWS EB'
      });
    }

    logo() {
      return _asyncToGenerator(function* () {
        var asciify = require('asciify-image'),
            path = require('path');

        var aws = path.join(__dirname, 'assets', 'aws.png');
        var logo_txt = yield asciify(aws, {
          fit: 'width',
          width: 25
        });
        console.log(logo_txt);
      })();
    }

    deploy() {
      var _this = this;

      return _asyncToGenerator(function* () {
        var build = {};

        _this.context.x_console.title({
          title: 'Deploying to Amazon AWS Elastic Bean',
          color: 'green'
        });

        yield _this.logo(); // builds the app

        build.try_build = yield _this.base_build();

        if (build.try_build.length > 0) {
          _this.context.x_console.outT({
            message: "There was an error building the project.",
            color: 'red'
          });

          return false;
        } // deploys to aws


        build.deploy_aws_eb = yield _this.run(); //test if results.length>0 (meaning there was an error)

        if (build.deploy_aws_eb.length > 0) {
          _this.context.x_console.outT({
            message: "There was an error deploying to Amazon AWS.",
            color: 'red',
            data: build.deploy_aws_eb.toString()
          });

          return false;
        }

        return true;
      })();
    }

    run() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        var spawn = require('await-spawn');

        var errors = []; //AWS EB deploy

        _this2.context.debug('AWS EB deploy');

        var eb_full = _this2.context.x_state.central_config.deploy.replaceAll('eb:', '');

        var eb_appname = eb_full;
        var eb_instance = "".concat(eb_appname, "-dev");

        if (_this2.context.x_state.central_config.deploy.contains(',')) {
          eb_appname = eb_full.split(',')[0];
          eb_instance = eb_full.split(',').splice(-1)[0];
        }

        if (eb_appname != '') {
          var spinner = _this2.context.x_console.spinner({
            message: 'Creating config files'
          }); //this.x_console.outT({ message:`Creating EB config yml: ${eb_appname} in ${eb_instance}`, color:'yellow' });


          var yaml = require('yaml');

          var data = {
            'branch-defaults': {
              master: {
                enviroment: eb_instance,
                group_suffix: null
              }
            },
            global: {
              application_name: eb_appname,
              branch: null,
              default_ec2_keyname: 'aws-eb',
              default_platform: 'Node.js',
              default_region: 'us-east-1',
              include_git_submodules: true,
              instance_profile: null,
              platform_name: null,
              platform_version: null,
              profile: null,
              repository: null,
              sc: 'git',
              workspace_type: 'Application'
            }
          }; //create .elasticbeanstalk directory

          var path = require('path'),
              fs = require('fs').promises;

          var eb_base = _this2.context.x_state.dirs.app;
          if (_this2.context.x_state.central_config.static) eb_base = path.join(eb_base, 'dist');
          var eb_dir = path.join(eb_base, '.elasticbeanstalk');

          try {
            yield fs.mkdir(eb_dir, {
              recursive: true
            });
          } catch (ef) {} //write .elasticbeanstalk/config.yml file with data


          yield _this2.context.writeFile(path.join(eb_dir, 'config.yml'), yaml.stringify(data)); //write .npmrc file

          yield _this2.context.writeFile(path.join(eb_base, '.npmrc'), 'unsafe-perm=true'); //create .ebignore file

          var eb_ig = "node_modules/\njspm_packages/\n.npm\n.node_repl_history\n*.tgz\n.yarn-integrity\n.editorconfig\n# Mac OSX\n.DS_Store\n# Elastic Beanstalk Files\n.elasticbeanstalk/*\n!.elasticbeanstalk/*.cfg.yml\n!.elasticbeanstalk/*.global.yml";
          yield _this2.context.writeFile(path.join(eb_base, '.ebignore'), eb_ig); //init git if not already

          spinner.succeed('EB config files created successfully');
          var results = {};

          if (!(yield _this2.exists(path.join(eb_base, '.git')))) {
            //git directory doesn't exist
            _this2.context.x_console.outT({
              message: 'CREATING .GIT DIRECTORY'
            });

            spinner.start('Initializing project git repository');
            spinner.text('Creating .gitignore file');
            var git_ignore = "# Mac System files\n.DS_Store\n.DS_Store?\n__MACOSX/\nThumbs.db\n# VUE files\nnode_modules/";
            yield _this2.context.writeFile(path.join(eb_base, '.gitignore'), git_ignore);
            spinner.succeed('.gitignore created');
            spinner.start('Initializing local git repository ..');

            try {
              results.git_init = yield spawn('git', ['init', '-q'], {
                cwd: eb_base
              });
              spinner.succeed('GIT initialized');
            } catch (gi) {
              results.git_init = gi;
              spinner.fail('GIT failed to initialize');
              errors.push(gi);
            }

            spinner.start('Adding files to local git ..');

            try {
              results.git_add = yield spawn('git', ['add', '.'], {
                cwd: eb_base
              });
              spinner.succeed('git added files successfully');
            } catch (gi) {
              results.git_add = gi;
              spinner.fail('git failed to add local files');
              errors.push(gi);
            }

            spinner.start('Creating first git commit ..');

            try {
              results.git_commit = yield spawn('git', ['commit', '-m', 'Inicial'], {
                cwd: eb_base
              });
              spinner.succeed('git created first commit successfully');
            } catch (gi) {
              results.git_commit = gi;
              spinner.fail('git failed to create first commit');
              errors.push(gi);
            }
          }

          if (_this2.context.x_state.central_config.static == true) {
            spinner.start('Deploying *static version* to AWS ElasticBean .. please wait');
          } else {
            spinner.start('Deploying to AWS ElasticBean .. please wait');
          } // execute eb deploy


          try {
            results.eb_deploy = yield spawn('eb', ['deploy', eb_instance], {
              cwd: eb_base
            }); //, stdio:'inherit'

            spinner.succeed('EB deployed successfully');
          } catch (gi) {
            //test if eb failed because instance has not being created yet, if so create it
            results.eb_deploy = gi;
            spinner.warn('EB failed to deploy'); //this.x_console.outT({ message:gi.toString(), color:'red'});

            if (gi.code == 4) {
              // IAM credentials are invalid or instance hasn't being created (eb create is missing)
              spinner.start('Checking if AWS credentials are valid ..');

              try {
                results.eb_create = yield spawn('aws', ['sts', 'get-caller-identity'], {
                  cwd: eb_base
                }); //, stdio:'inherit'

                spinner.succeed('AWS credentials are ok');
              } catch (aws_cred) {
                spinner.fail('Current AWS credentials are invalid');
                errors.push(aws_cred);
              }

              if (errors.length == 0) {
                spinner.start('EB it seems this is a new deployment: issuing eb create');

                try {
                  //console.log('\n');
                  results.eb_create = yield spawn('eb', ['create', eb_instance], {
                    cwd: eb_base
                  }); //, stdio:'inherit'

                  spinner.succeed('EB created and deployed successfully');
                } catch (ec) {
                  _this2.context.x_console.outT({
                    message: gi.stdout.toString(),
                    color: 'red'
                  });

                  spinner.fail('EB creation failed');
                  errors.push(gi);
                }
              }
            } else {
              _this2.context.x_console.outT({
                message: 'error: eb create (exitcode:' + gi.code + '):' + gi.stdout.toString(),
                color: 'red'
              });

              errors.push(gi);
            }
          } //if errors.length==0 && this.x_state.central_config.debug=='true'


          if (errors.length == 0 && _this2.context.x_state.central_config.debug == true) {
            //open eb logging console
            var ci = require('ci-info');

            if (ci.isCI == false) {
              spinner.start('Opening EB debug terminal ..');

              try {
                var abs_cmd = path.resolve(eb_base);
                var cmd = "clear; sleep 2; clear; cd ".concat(abs_cmd, " && clear && eb open ").concat(eb_instance);
                results.eb_log = yield spawn('npx', ['terminal-tab', cmd], {
                  cwd: abs_cmd
                }); //, detached:true

                spinner.succeed("EB logging opened on new tab successfully");
              } catch (ot) {
                results.eb_log = ot;
                spinner.fail("I was unable to open a new tab terminal window with the EB debugging console");
              }
            } else {
              spinner.warn("Omitting EB debug, because a CI env was detected.");
            }
          } // eb deploy done

        }

        return errors;
      })();
    } //****************************
    // onPrepare and onEnd steps
    //****************************


    post() {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        //restores aws credentials if modified by onPrepare after deployment
        if (!_this3.context.x_state.central_config.componente && _this3.context.x_state.central_config.deploy && _this3.context.x_state.central_config.deploy.indexOf('eb:') != -1 && _this3.context.x_state.config_node.aws) {
          // @TODO add this block to deploys/eb 'post' method and onPrepare to 'pre' 20-br-21
          // only execute after deploy and if user requested specific aws credentials on map
          var path = require('path'),
              copy = require('recursive-copy'),
              os = require('os');

          var fs = require('fs');

          var aws_bak = path.join(_this3.context.x_state.dirs.base, 'aws_backup.ini');
          var aws_file = path.join(os.homedir(), '/.aws/') + 'credentials'; // try to copy aws_bak over aws_ini_file (if bak exists)

          if (yield _this3.context.exists(aws_bak)) {
            yield copy(aws_bak, aws_file, {
              overwrite: true,
              dot: true,
              debug: false
            }); // remove aws_bak file

            yield fs.promises.unlink(aws_bak);
          }
        }
      })();
    }

    pre() {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        if (!_this4.context.x_state.central_config.componente && _this4.context.x_state.central_config.deploy && _this4.context.x_state.central_config.deploy.indexOf('eb:') != -1) {
          // if deploying to AWS eb:x, then recover/backup AWS credentials from local system
          var ini = require('ini'),
              path = require('path'),
              fs = require('fs').promises; // read existing AWS credentials if they exist


          var os = require('os');

          var aws_ini = '';
          var aws_ini_file = path.join(os.homedir(), '/.aws/') + 'credentials';

          try {
            //this.debug('trying to read AWS credentials:',aws_ini_file);
            aws_ini = yield fs.readFile(aws_ini_file, 'utf-8');

            _this4.context.debug('AWS credentials:', aws_ini);
          } catch (err_reading) {} // 


          if (_this4.context.x_state.config_node.aws) {
            // if DSL defines temporal AWS credentials for this app .. 
            // create backup of aws credentials, if existing previously
            if (aws_ini != '') {
              var aws_bak = path.join(_this4.context.x_state.dirs.base, 'aws_backup.ini');

              _this4.context.x_console.outT({
                message: "config:aws:creating .aws/credentials backup",
                color: 'yellow'
              });

              yield fs.writeFile(aws_bak, aws_ini, 'utf-8');
            } // debug


            _this4.context.x_console.outT({
              message: "config:aws:access ->".concat(_this4.context.x_state.config_node.aws.access)
            });

            _this4.context.x_console.outT({
              message: "config:aws:secret ->".concat(_this4.context.x_state.config_node.aws.secret)
            }); // transform config_node.aws keys into ini


            var to_ini = ini.stringify({
              aws_access_key_id: _this4.context.x_state.config_node.aws.access,
              aws_secret_access_key: _this4.context.x_state.config_node.aws.secret
            }, {
              section: 'default'
            });

            _this4.context.debug('Setting .aws/credentials from config node'); // save as .aws/credentials (ini file)


            yield fs.writeFile(aws_ini_file, to_ini, 'utf-8');
          } else if (aws_ini != '') {
            // if DSL doesnt define AWS credentials, use the ones defined within the local system.
            var parsed = ini.parse(aws_ini);
            if (parsed.default) _this4.context.debug('Using local system AWS credentials', parsed.default);
            _this4.context.x_state.config_node.aws = {
              access: '',
              secret: ''
            };
            if (parsed.default.aws_access_key_id) _this4.context.x_state.config_node.aws.access = parsed.default.aws_access_key_id;
            if (parsed.default.aws_secret_access_key) _this4.context.x_state.config_node.aws.secret = parsed.default.aws_secret_access_key;
          }
        }
      })();
    }

  }

  var concepto = require('concepto'); //import { timingSafeEqual } from 'crypto';
  class vue_dsl extends concepto {
    constructor(file) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // we can get class name, from package.json name key (after its in its own project)
      var my_config = {
        class: 'vue',
        debug: true
      };

      var nuevo_config = _objectSpread2(_objectSpread2({}, my_config), config);

      super(file, nuevo_config); //,...my_config
    } // **************************
    // methods to be auto-called
    // **************************
    //Called after init method finishes


    onInit() {
      var _this = this;

      return _asyncToGenerator(function* () {
        // define and assign commands
        //this.x_console.outT({ message: `Vue Compiler v${version}`, color: `brightCyan` });
        yield _this.addCommands(internal_commands);

        _this.x_console.outT({
          message: "".concat(Object.keys(_this.x_commands).length, " local x_commands loaded!"),
          color: "green"
        }); //this.debug('x_commands',this.x_commands);
        //this.x_crypto_key = require('crypto').randomBytes(32); // for hash helper method
        // init vue
        // set x_state defaults


        _this.x_state = {
          plugins: {},
          npm: {},
          dev_npm: {},
          envs: {},
          functions: {},
          proxies: {},
          pages: {},
          current_func: '',
          current_folder: '',
          current_proxy: '',
          strings_i18n: {},
          stores: {},
          stores_types: {
            versions: {},
            expires: {}
          },
          nuxt_config: {
            head_script: {},
            build_modules: {},
            modules: {}
          }
        };
        _this.x_state.config_node = yield _this._readConfig(); //this.debug('config_node',this.x_state.config_node);

        _this.x_state.central_config = yield _this._readCentralConfig(); //this.debug('central_config',this.x_state.central_config);

        _this.x_state.assets = yield _this._readAssets(); //this.debug('assets_node',this.x_state.assets);

        if (_this.x_state.central_config.componente) {
          _this.x_state.dirs = yield _this._appFolders({
            'components': '',
            'pages': '',
            'assets': 'assets/',
            'static': 'static/',
            'umd': 'umd/'
          });
        } else {
          _this.x_state.dirs = yield _this._appFolders({
            'client': 'client/',
            'layouts': 'client/layouts/',
            'components': 'client/components/',
            'pages': 'client/pages/',
            'plugins': 'client/plugins/',
            'static': 'client/static/',
            'middleware': 'client/middleware/',
            'server': 'client/server/',
            'assets': 'client/assets/',
            'css': 'client/assets/css/',
            'store': 'client/store/',
            'lang': 'client/lang/',
            'secrets': 'secrets/'
          });
        } // read modelos node (virtual DB)


        _this.x_state.models = yield _this._readModelos(); //alias: database tables
        //is local server running? if so, don't re-launch it

        _this.x_state.nuxt_is_running = yield _this._isLocalServerRunning();

        _this.debug('is Server Running: ' + _this.x_state.nuxt_is_running); // init terminal diagnostics (not needed here)


        if (_this.x_state.central_config.nuxt == 'latest' && _this.atLeastNode('10') == false) {
          //this.debug('error: You need at least Node v10+ to use latest Nuxt/Vuetify version!');
          throw new Error('You need to have at least Node v10+ to use latest Nuxt/Vuetify version!');
        }

        _this.x_state.es6 = _this.x_state.central_config.nuxt == 'latest' ? true : false; // copy sub-directories if defined in node 'config.copiar' key

        if (_this.x_state.config_node.copiar) {
          var _path = require('path');

          var copy = require('recursive-copy');

          _this.x_console.outT({
            message: "copying config:copiar directories to 'static' target folder",
            color: "yellow"
          });

          yield Object.keys(_this.x_state.config_node.copiar).map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(function* (key) {
              var abs = _path.join(this.x_state.dirs.base, key);

              try {
                yield copy(abs, this.x_state.dirs.static);
              } catch (err_copy) {
                if (err_copy.code != 'EEXIST') this.x_console.outT({
                  message: "error: copying directory ".concat(abs),
                  data: err_copy
                });
              } //console.log('copying ',{ from:abs, to:this.x_state.dirs.static });

            });

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }().bind(_this));

          _this.x_console.outT({
            message: "copying config:copiar directories ... READY",
            color: "yellow"
          });
        } // *********************************************
        // install requested modules within config node
        // *********************************************
        // NUXT:ICON


        if (_this.x_state.config_node['nuxt:icon']) {
          // add @nuxtjs/pwa module to app
          _this.x_state.npm['@nuxtjs/pwa'] = '*'; // copy icon to static dir

          var _path2 = require('path');

          var source = _path2.join(_this.x_state.dirs.base, _this.x_state.config_node['nuxt:icon']);

          var target = _this.x_state.dirs.static + 'icon.png';

          _this.debug({
            message: "NUXT ICON dump (copy icon)",
            color: "yellow",
            data: source
          });

          var fs = require('fs').promises;

          try {
            yield fs.copyFile(source, target);
          } catch (err_fs) {
            _this.x_console.outT({
              message: "error: copying NUXT icon",
              data: err_fs
            });
          }
        } // GOOGLE:ADSENSE


        if (_this.x_state.config_node['google:adsense']) {
          _this.x_state.npm['vue-google-adsense'] = '*';
          _this.x_state.npm['vue-script2'] = '*';
        } // GOOGLE:ANALYTICS


        if (_this.x_state.config_node['google:analytics']) {
          _this.x_state.npm['@nuxtjs/google-gtag'] = '*';
        } // ADD v-mask if latest Nuxt/Vuetify, because vuetify v2+ no longer includes masks support


        if (_this.x_state.central_config.nuxt == 'latest') {
          _this.x_state.plugins['v-mask'] = {
            global: true,
            mode: 'client',
            npm: {
              'v-mask': '*'
            },
            customcode: "import Vue from 'vue';\nimport VueMask from 'v-mask';\nVue.directive('mask', VueMask.VueMaskDirective);\nVue.use(VueMask);",
            dev_npm: {}
          };
        } // DEFAULT NPM MODULES & PLUGINS if dsl is not 'componente' type


        if (!_this.x_state.central_config.componente) {
          _this.x_console.outT({
            message: "vue initialized() ->"
          });

          _this.x_state.plugins['vue-moment'] = {
            global: true,
            mode: 'client',
            npm: {
              'vue-moment': '*'
            },
            extra_imports: ['moment'],
            requires: ['moment/locale/es'],
            config: '{ moment }'
          }; // axios

          _this.x_state.npm['@nuxtjs/axios'] = '*';

          if (_this.x_state.central_config.nuxt == 'latest') {
            _this.x_state.npm['nuxt'] = '*';
          } else {
            _this.x_state.npm['nuxt'] = '2.11.0'; // default for compatibility issues with existing dsl maps	
          } // express things


          _this.x_state.npm['express'] = '*';
          _this.x_state.npm['serverless-http'] = '*';
          _this.x_state.npm['serverless-apigw-binary'] = '*';
          _this.x_state.npm['underscore'] = '*'; // dev tools

          _this.x_state.dev_npm['serverless-prune-plugin'] = '*';
          _this.x_state.dev_npm['serverless-offline'] = '*';
          _this.x_state.dev_npm['vue-beautify-loader'] = '*'; //

          if (_this.x_state.central_config.dominio) {
            _this.x_state.dev_npm['serverless-domain-manager'] = '*';
          }
        } else {
          // If DSL mode 'component(e)' @TODO this needs a revision (converting directly from CFC)
          _this.x_console.outT({
            message: "vue initialized() -> as component/plugin"
          });

          _this.x_state.npm['global'] = '^4.4.0';
          _this.x_state.npm['poi'] = '9';
          _this.x_state.npm['underscore'] = '*';
          _this.x_state.dev_npm['@vue/test-utils'] = '^1.0.0-beta.12';
          _this.x_state.dev_npm['babel-core'] = '^6.26.0';
          _this.x_state.dev_npm['babel-preset-env'] = '^1.6.1';
          _this.x_state.dev_npm['jest'] = '^22.4.0';
          _this.x_state.dev_npm['jest-serializer-vue'] = '^0.3.0';
          _this.x_state.dev_npm['vue'] = '*';
          _this.x_state.dev_npm['vue-jest'] = '*';
          _this.x_state.dev_npm['vue-server-renderer'] = '*';
          _this.x_state.dev_npm['vue-template-compiler'] = '*';
        } // serialize 'secret' config keys as json files in app secrets sub-directory (if any)
        // extract 'secret's from config keys; 

        /* */


        _this.x_state.secrets = {}; //await _extractSecrets(config_node)

        var path = require('path');

        for (var key in _this.x_state.config_node) {
          if (key.contains(':') == false) {
            if (_this.x_state.config_node[key][':secret']) {
              var new_obj = _objectSpread2({}, _this.x_state.config_node[key]);

              delete new_obj[':secret'];
              if (new_obj[':link']) delete new_obj[':link']; // set object keys to uppercase

              _this.x_state.secrets[key] = {};
              var obj_keys = Object.keys(new_obj);

              for (var x in obj_keys) {
                _this.x_state.secrets[key][x.toUpperCase()] = new_obj[x];
              }

              var _target = path.join(_this.x_state.dirs.secrets, "".concat(key, ".json"));

              yield _this.writeFile(_target, JSON.stringify(new_obj));
            }
          }
        } // set config keys as ENV accesible variables (ex. $config.childnode.attributename)


        var _loop = function _loop(_key) {
          // omit special config 'reserved' node keys
          if (['aurora', 'vpc', 'aws'].includes(_key) && typeof _this.x_state.config_node[_key] === 'object') {
            Object.keys(_this.x_state.config_node[_key]).map(function (attr) {
              this.x_state.envs["config.".concat(_key, ".").concat(attr)] = "process.env.".concat((_key + '_' + attr).toUpperCase());
            }.bind(_this));
          }
        };

        for (var _key in _this.x_state.config_node) {
          _loop(_key);
        } // show this.x_state contents
        //this.debug('x_state says',this.x_state);

      })();
    } //Called after parsing nodes


    onAfterProcess(processedNode) {
      return _asyncToGenerator(function* () {
        return processedNode;
      })();
    } //Called for defining the title of class/page by testing node.


    onDefineTitle(node) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        var resp = node.text;
        Object.keys(node.attributes).map(function (i) {
          if (i == 'title' || i == 'titulo') {
            resp = node.attributes[i];
            return false;
          }
        }.bind(_this2));
        /*
        for (i in node.attributes) {
        	if (['title','titulo'].includes(node.attributes[i])) {
        		resp = node.attributes[i];
        		break;
        	}
        }*/

        return resp;
      })();
    } //Called for naming filename of class/page by testing node.


    onDefineFilename(node) {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        var resp = node.text; // @idea we could use some 'slug' method here

        resp = resp.replace(/\ /g, '_') + '.vue';

        if (node.icons.includes('gohome')) {
          if (_this3.x_state.central_config.componente == true && _this3.x_state.central_config.service_name) {
            resp = _this3.x_state.central_config.service_name + '.vue';
          } else {
            resp = 'index.vue';
          }
        } else if (node.icons.includes('desktop_new')) {
          if (node.text.indexOf('assets') != -1) {
            resp = 'internal_assets.omit';
          } else if (node.text.indexOf('store') != -1) {
            resp = 'internal_stores.omit';
          } else if (node.text.indexOf('proxy') != -1 || node.text.indexOf('proxies') != -1) {
            resp = 'internal_middleware.omit';
          } else if (node.text.indexOf('config') != -1) {
            resp = 'config.omit';
          } else if (node.text.indexOf('modelos') != -1) {
            resp = 'modelos.omit';
          } else if (['servidor', 'server', 'api'].includes(node.text)) {
            resp = 'server.omit';
          }
        } else if (node.text.indexOf('componente:') != -1) {
          resp = node.text.split(':')[node.text.split(':').length - 1] + '.vue';
        } else if (node.text.indexOf('layout:') != -1) {
          resp = node.text.split(':')[node.text.split(':').length - 1] + '.vue';
        }

        return resp;
      })();
    } //Called for naming the class/page by testing node.


    onDefineNodeName(node) {
      return _asyncToGenerator(function* () {
        return node.text.replace(' ', '_');
      })();
    } //Defines template for code given the processedNode of process() - for each level2 node


    onCompleteCodeTemplate(processedNode) {
      return _asyncToGenerator(function* () {
        return processedNode;
      })();
    } //Defines preparation steps before processing nodes.


    onPrepare() {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        _this4.deploy_module = {
          pre: () => {},
          post: () => {},
          deploy: () => true
        };
        var deploy = _this4.x_state.central_config.deploy;

        if (deploy) {
          deploy += '';

          if (deploy.contains('eb:')) {
            _this4.deploy_module = new eb({
              context: _this4
            });
          } else if (deploy == 'local') {
            _this4.deploy_module = new local({
              context: _this4
            }); //
          } else ;
        }

        yield _this4.deploy_module.pre();
      })();
    } //Executed when compiler founds an error processing nodes.


    onErrors(errors) {
      return _asyncToGenerator(function* () {})();
    } //configNode helper


    generalConfigSetup() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        //this.x_state.dirs.base
        _this5.debug('Setting general configuration steps');

        _this5.debug('Defining nuxt.config.js : initializing'); // default modules


        _this5.debug('Defining nuxt.config.js : default modules');

        _this5.x_state.nuxt_config.modules['@nuxtjs/axios'] = {}; //google analytics

        if (_this5.x_state.config_node['google:analytics']) {
          _this5.debug('Defining nuxt.config.js : Google Analytics');

          _this5.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag'] = {
            'id': _this5.x_state.config_node['google:analytics'].id,
            'debug': true,
            'disableAutoPageTrack': true
          };
          if (_this5.x_state.config_node['google:analytics'].local) _this5.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag'].debug = _this5.x_state.config_node['google:analytics'].local;

          if (_this5.x_state.config_node['google:analytics'].auto && _this5.x_state.config_node['google:analytics'].auto == true) {
            delete _this5.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag']['disableAutoPageTrack'];
          }
        } //medianet


        if (_this5.x_state.config_node['ads:medianet'] && _this5.x_state.config_node['ads:medianet']['cid']) {
          _this5.debug('Defining nuxt.config.js : MediaNet');

          _this5.x_state.nuxt_config.head_script['z_ads_medianet_a'] = {
            'innerHTML': 'window._mNHandle = window._mNHandle || {}; window._mNHandle.queue = window._mNHandle.queue || []; medianet_versionId = "3121199";',
            'type': 'text/javascript'
          };
          _this5.x_state.nuxt_config.head_script['z_ads_medianet_b'] = {
            'src': "https://contextual.media.net/dmedianet.js?cid=".concat(_this5.x_state.config_node['ads:medianet'][cid]),
            'async': true
          };
          _this5.x_state.plugins['vue-script2'] = {
            global: true,
            npm: {
              'vue-script2': '*'
            }
          };
        } //google Adsense


        if (_this5.x_state.config_node['google:adsense']) {
          _this5.debug('Defining nuxt.config.js : Google Adsense');

          if (_this5.x_state.config_node['google:adsense'].auto && _this5.x_state.config_node['google:adsense'].client) {
            _this5.x_state.nuxt_config.head_script['google_adsense'] = {
              'src': 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
              'data-ad-client': _this5.x_state.config_node['google:adsense'].client,
              'async': true
            };
            _this5.x_state.plugins['adsense'] = {
              global: true,
              npm: {
                'vue-google-adsense': '*',
                'vue-script2': '*'
              },
              mode: 'client',
              customcode: "\n\t\t\t\t\timport Vue from \"vue\";\n\t\t\t\t\timport Ads from \"vue-google-adsense\";\n\n\t\t\t\t\tVue.use(require('vue-script2'));\n\t\t\t\t\tVue.use(Ads.AutoAdsense, { adClient: '".concat(_this5.x_state.config_node['google:adsense']['client'], "'});")
            };
          } else {
            _this5.x_state.plugins['adsense'] = {
              global: true,
              npm: {
                'vue-google-adsense': '*',
                'vue-script2': '*'
              },
              mode: 'client',
              customcode: "\n\t\t\t\t\timport Vue from \"vue\";\n\t\t\t\t\timport Ads from \"vue-google-adsense\";\n\n\t\t\t\t\tVue.use(require('vue-script2'));\n\t\t\t\t\tVue.use(Ads.Adsense);\n\t\t\t\t\tVue.use(Ads.InArticleAdsense);\n\t\t\t\t\tVue.use(Ads.InFeedAdsense);"
            };
          }
        } //nuxt:icon


        if (_this5.x_state.config_node['nuxt:icon']) {
          _this5.debug('Defining nuxt.config.js : module nuxtjs/pwa (nuxt:icon)');

          _this5.x_state.nuxt_config.modules['@nuxtjs/pwa'] = {};
        } //idiomas i18n


        if (_this5.x_state.central_config['idiomas'].indexOf(',') != -1) {
          _this5.debug('Defining nuxt.config.js : module nuxt/i18n (idiomas)');

          _this5.x_state.npm['nuxt-i18n'] = '*';
          _this5.x_state.npm['fs'] = '*';
          _this5.x_state.nuxt_config.modules['nuxt-i18n'] = {
            'defaultLocale': _this5.x_state.central_config['idiomas'].split(',')[0],
            'vueI18n': {
              'fallbackLocale': _this5.x_state.central_config['idiomas'].split(',')[0]
            },
            'detectBrowserLanguage': {
              'useCookie': true,
              'alwaysRedirect': true
            },
            locales: [],
            lazy: true,
            langDir: 'lang/'
          };
          var _self = _this5;

          _this5.x_state.central_config['idiomas'].split(',').map(function (lang) {
            if (lang == 'es') {
              _self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                code: 'es',
                iso: 'es-ES',
                file: "".concat(lang, ".js")
              });
            } else if (lang == 'en') {
              _self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                code: 'en',
                iso: 'en-US',
                file: "".concat(lang, ".js")
              });
            } else {
              _self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                code: lang,
                file: "".concat(lang, ".js")
              });
            }
          }.bind(_self));
        } //local storage


        if (_this5.x_state.stores_types['local'] && Object.keys(_this5.x_state.stores_types['local']) != '') {
          _this5.debug('Defining nuxt.config.js : module nuxt-vuex-localstorage (store:local)');

          _this5.x_state.nuxt_config.modules['nuxt-vuex-localstorage'] = {
            mode: 'debug',
            'localStorage': Object.keys(_this5.x_state.stores_types['local'])
          };
        } //session storage


        if (_this5.x_state.stores_types['session'] && Object.keys(_this5.x_state.stores_types['session']) != '') {
          _this5.debug('Defining nuxt.config.js : module nuxt-vuex-localstorage (store:session)');

          var prev = {}; // if vuex-localstorage was defined before, recover keys and just replace with news, without deleting previous

          if (_this5.x_state.nuxt_config.modules['nuxt-vuex-localstorage']) prev = _this5.x_state.nuxt_config.modules['nuxt-vuex-localstorage'];
          _this5.x_state.nuxt_config.modules['nuxt-vuex-localstorage'] = _objectSpread2(_objectSpread2({}, prev), {
            mode: 'debug',
            'sessionStorage': Object.keys(_this5.x_state.stores_types['session'])
          });
        } //proxies


        var has_proxies = false,
            proxies = {};
        var self = _this5;
        Object.keys(_this5.x_state.central_config).map(function (key) {
          if (key.indexOf('proxy:') != -1) {
            var just_key = key.split(':')[1];
            proxies[just_key] = self.x_state.central_config[key];
            has_proxies = true;
          }
        }.bind(self));

        if (has_proxies) {
          _this5.debug('Defining nuxt.config.js : module nuxtjs/proxy (central:proxy)');

          _this5.x_state.npm['@nuxtjs/proxy'] = '*';
          _this5.x_state.nuxt_config.modules['@nuxtjs/proxy'] = {
            'proxy': proxies
          };
        } //end

      })();
    } //.gitignore helper


    createGitIgnore() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        _this6.debug('writing .gitignore files');

        var fs = require('fs').promises;
            require('path');

        if (_this6.x_state.central_config.componente) {
          _this6.debug({
            message: 'writing dsl /.gitignore file'
          });

          var git = "# Mac System files\n.DS_Store\n.DS_Store?\n_MACOSX/\nThumbs.db\n# VUE files\n# Concepto files\ndsl_cache/\ndsl_cache.ini\nvue.dsl\ntmp.ini\n".concat(_this6.x_state.dirs.compile_folder, "/node_modules/");
          yield fs.writeFile("".concat(_this6.x_state.dirs.base, ".gitignore"), git, 'utf-8'); //.gitignore

          _this6.x_console.out({
            message: 'writing component .gitignore file'
          });

          git = "# Mac System files\n.DS_Store\n.DS_Store?\n_MACOSX/\nThumbs.db\n# NPM files\npackage-lock.json\nnode_modules/\n# AWS EB files\n.elasticbeanstalk/*\n!.elasticbeanstalk/*.cfg.yml\n!.elasticbeanstalk/*.global.yml";
          yield fs.writeFile("".concat(_this6.x_state.dirs.app, "/.gitignore"), git, 'utf-8'); //app/.gitignore
        } else {
          _this6.x_console.out({
            message: 'writing /.gitignore file'
          });

          var _git = "# Mac System files\n.DS_Store\n.DS_Store?\n_MACOSX/\nThumbs.db\n# VUE files\n.nuxt/\n# Concepto files\ndsl_cache/\ndsl_cache.ini\ntmp.ini\nvue.dsl\nstats.txt\nstats.json\nstore/\n".concat(_this6.x_state.dirs.compile_folder, "/node_modules/\n").concat(_this6.x_state.dirs.compile_folder, "/secrets/");

          yield fs.writeFile("".concat(_this6.x_state.dirs.base, ".gitignore"), _git, 'utf-8'); //.gitignore
        }
      })();
    } //process .omit file 


    processOmitFile(thefile) {
      var _this7 = this;

      return _asyncToGenerator(function* () {
        //@TODO 13-mar-21 check if .toArray() is needed here (ref processInternalTags method)
        //internal_stores.omit
        var self = _this7;

        if (thefile.file == 'internal_stores.omit') {
          _this7.debug('processing internal_stores.omit');

          var cheerio = require('cheerio');

          var $ = cheerio.load(thefile.code, {
            ignoreWhitespace: false,
            xmlMode: true,
            decodeEntities: false
          });
          var nodes = $("store_mutation").toArray();
          nodes.map(function (elem) {
            var cur = $(elem);
            var store = cur.attr('store') ? cur.attr('store') : '';
            var mutation = cur.attr('mutation') ? cur.attr('mutation') : '';
            var params = cur.attr('params') ? cur.attr('params') : '';
            var code = cur.text();

            if (self.x_state.stores[store] && !(':mutations' in self.x_state.stores[store])) {
              self.x_state.stores[store][':mutations'] = {};
            }

            self.x_state.stores[store][':mutations'][mutation] = {
              code,
              params
            };
          });
        } //internal_middleware.omit


        if (thefile.file == 'internal_middleware.omit') {
          _this7.debug('processing internal_middleware.omit');

          var _cheerio = require('cheerio');

          var _$ = _cheerio.load(thefile.code, {
            ignoreWhitespace: false,
            xmlMode: true,
            decodeEntities: false
          });

          var _nodes = _$("proxy_code").toArray();

          _nodes.map(function (elem) {
            var cur = _$(elem);

            var name = cur.attr('name') ? cur.attr('name') : '';
            self.x_state.proxies[name].code = cur.text().trim();
          });
        } //server.omit


        if (thefile.file == 'server.omit') {
          _this7.debug('processing server.omit');

          var _cheerio2 = require('cheerio');

          var _$2 = _cheerio2.load(thefile.code, {
            ignoreWhitespace: false,
            xmlMode: true,
            decodeEntities: false
          });

          var _nodes2 = _$2("func_code").toArray();

          _nodes2.map(function (elem) {
            var cur = _$2(elem);

            var name = cur.attr('name') ? cur.attr('name') : '';
            self.x_state.functions[name].code = cur.text().trim();
          });
        }
      })();
    }

    getBasicVue(thefile) {
      var _this8 = this;

      return _asyncToGenerator(function* () {
        // write .VUE file
        var vue = {
          template: thefile.code,
          script: '',
          style: '',
          first: false
        };
        var page = _this8.x_state.pages[thefile.title];

        if (page) {
          // declare middlewares (proxies)
          if (page.proxies.indexOf(',') != -1) {
            _this8.debug('- declare middlewares');

            vue.script += "middleware: [".concat(page.proxies, "]");
            vue.first = true;
          } else if (page.proxies.trim() != '') {
            _this8.debug('- declare middlewares');

            vue.script += "middleware: '".concat(page.proxies, "'");
            vue.first = true;
          } // layout attr


          if (page.layout != '') {
            _this8.debug('- declare layout');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "layout: '".concat(page.layout.trim(), "'");
          } // declare components


          if (page.components != '') {
            _this8.debug('- declare components');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "components: {";
            var comps = [];
            Object.keys(page.components).map(function (key) {
              comps.push(" '".concat(key, "': ").concat(page.components[key]));
            }); //.bind(page,comps));

            vue.script += "".concat(comps.join(','), "\n\t}");
          } // declare directives


          if (page.directives != '') {
            _this8.debug('- declare directives');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "directives: {";
            var directs = [];
            Object.keys(page.directives).map(function (key) {
              if (key == page.directives[key]) {
                directs.push(key);
              } else {
                directs.push("'".concat(key, "': ").concat(page.directives[key]));
              }
            }); //.bind(page,directs));

            vue.script += "".concat(directs.join(','), "\n\t}");
          } // declare props (if page tipo componente)


          if (page.tipo == 'componente' && page.params != '') {
            _this8.debug('- declare componente:props');

            if (vue.first) vue.script += ',\n';
            vue.first = true;

            var isNumeric = function isNumeric(n) {
              return !isNaN(parseFloat(n)) && isFinite(n);
            };

            var props = [];

            if (Object.keys(page.defaults) != '') {
              page.params.split(',').map(function (key) {
                var def_val = '';
                if (page.defaults[key]) def_val = page.defaults[key];

                if (def_val == 'true' || def_val == 'false') {
                  props.push("".concat(key, ": { type: Boolean, default: ").concat(def_val, "}"));
                } else if (isNumeric(def_val)) {
                  //if def_val is number or string with number
                  props.push("".concat(key, ": { type: Number, default: ").concat(def_val, "}"));
                } else if (def_val.indexOf('[') != -1 && def_val.indexOf(']') != -1) {
                  props.push("".concat(key, ": { type: Array, default: () => ").concat(def_val, "}"));
                } else if (def_val.indexOf('{') != -1 && def_val.indexOf('}') != -1) {
                  props.push("".concat(key, ": { type: Object, default: () => ").concat(def_val, "}"));
                } else if (def_val.indexOf("()") != -1) {
                  //ex. new Date()
                  props.push("".concat(key, ": { type: Object, default: () => ").concat(def_val, "}"));
                } else if (def_val.toLowerCase().indexOf("null") != -1) {
                  props.push("".concat(key, ": { default: null }"));
                } else if (def_val.indexOf("'") != -1) {
                  props.push("".concat(key, ": { type: String, default: ").concat(def_val, "}"));
                } else {
                  props.push("".concat(key, ": { default: '").concat(def_val, "' }"));
                }
              });
              vue.script += "\tprops: {".concat(props.join(','), "}");
            } else {
              page.params.split(',').map(function (key) {
                props.push("'".concat(key, "'"));
              });
              vue.script += "\tprops: [".concat(props.join(','), "]");
            }
          } // declare meta data


          if (page.xtitle || page.meta.length > 0) {
            _this8.debug('- declare head() meta data');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += " head() {\n return {\n"; // define title

            if (page.xtitle) {
              if (_this8.x_state.central_config.idiomas.indexOf(',') != -1) {
                // i18n title
                var crc32 = "t_".concat(yield _this8.hash(page.xtitle));

                var def_lang = _this8.x_state.central_config.idiomas.indexOf(',')[0].trim().toLowerCase();

                if (!_this8.x_state.strings_i18n[def_lang]) {
                  _this8.x_state.strings_i18n[def_lang] = {};
                }

                _this8.x_state.strings_i18n[def_lang][crc32] = page.xtitle;
                vue.script += "titleTemplate: this.$t('".concat(crc32, "')\n");
              } else {
                // normal title
                vue.script += "titleTemplate: '".concat(page.xtitle, "'\n");
              }
            } // define meta SEO


            if (page.meta.length > 0) {
              if (page.xtitle) vue.script += ",";
              vue.script += "meta: ".concat(JSON.stringify(page.meta), "\n");
            }

            vue.script += "};\n}";
          } // declare variables (data)


          if (Object.keys(page.variables) != '') {
            _this8.debug('- declare data() variables');

            if (vue.first) vue.script += ',\n';
            vue.first = true;

            require('util');

            vue.script += "data() {\n";
            vue.script += " return ".concat(_this8.jsDump(page.variables), "\n");
            vue.script += "}\n";
          }
        }

        return vue;
      })();
    }

    processInternalTags(vue, page) {
      var _this9 = this;

      return _asyncToGenerator(function* () {
        var cheerio = require('cheerio'); //console.log('PABLO beforeInteralTags:',{ template:vue.template, script:vue.script });


        var $ = cheerio.load(vue.template, {
          ignoreWhitespace: false,
          xmlMode: true,
          decodeEntities: false
        }); //console.log('PABLO after:',$.html()); 
        //return vue;
        //

        var nodes = $("server_asyncdata").toArray();
        if (nodes.length > 0) _this9.debug('post-processing server_asyncdata tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        nodes.map(function (elem) {
          var cur = $(elem);
          var name = cur.attr('return') ? cur.attr('return') : '';
          vue.script += "async asyncData({ req, res, params }) {\n";
          vue.script += " if (!process.server) { const req={}, res={}; }\n"; //vue.script += ` ${cur.text()}`;

          vue.script += " ".concat(elem.children[0].data);
          vue.script += " return ".concat(name, ";\n");
          vue.script += "}\n";
          cur.remove();
        });
        vue.template = $.html();
        if (nodes.length > 0) vue.script += "}\n"; // process ?mounted event

        nodes = $("vue_mounted").toArray();
        if (nodes.length > 0) _this9.debug('post-processing vue_mounted tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += "async mounted() {\n";
        nodes.map(function (elem) {
          var cur = $(elem); //console.log('valor vue_mounted',elem.children[0].data);

          vue.script += elem.children[0].data; //cur.text();

          cur.remove();
        });
        vue.template = $.html();
        if (nodes.length > 0) vue.script += "}\n"; // process ?var (vue_computed)

        nodes = $('vue\_computed').toArray(); //this.debug('nodes',nodes);

        if (nodes.length > 0) _this9.debug('post-processing vue_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += "computed: {\n";
        var computed = [];
        nodes.map(function (elem) {
          var cur = $(elem);
          var name = cur.attr('name');
          var code = elem.children[0].data; //cur.html();
          //console.log('PABLO debug code computed:',code);

          computed.push("".concat(name, "() {").concat(code, "}"));
          cur.remove(); //return elem;
        });
        vue.template = $.html();
        vue.script += computed.join(',');
        if (nodes.length > 0) vue.script += "}\n"; // process ?var (asyncComputed)

        nodes = $('vue_async_computed').toArray();
        if (nodes.length > 0) _this9.debug('post-processing vue_async_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += "asyncComputed: {\n";
        var async_computed = [];
        nodes.map(function (elem) {
          var cur = $(elem);
          var code = elem.children[0].data; //cur.text();

          if (cur.attr('valor') || cur.attr('watch')) {
            var lazy = '';
            if (cur.attr('lazy')) lazy += ",lazy: ".concat(cur.attr('lazy'));
            var valor = '';

            if (cur.attr('valor')) {
              valor += ",";
              var test = cur.attr('valor');

              if (test.indexOf('[') != -1 && test.indexOf(']') != -1 || test.indexOf('{') != -1 && test.indexOf('}') != -1 || test.indexOf('(') != -1 && test.indexOf(')') != -1) {
                valor += "default: ".concat(test);
              } else {
                valor += "default: '".concat(test, "'");
              }
            }

            var watch = '';

            if (cur.attr('watch')) {
              watch += ',';

              var _test = cur.attr('watch');

              var test_n = [];

              _test.split(',').map(function (x) {
                var tmp = x.replaceAll('$variables.', '').replaceAll('$vars', '').replaceAll('$params', '').replaceAll('$store', '$store.state.');
                test_n.push("'".concat(tmp, "'"));
              });

              watch += "watch: [".concat(test_n.join(','), "]");
            }

            async_computed.push("\n".concat(cur.attr('name'), ": {\n    async get() {\n        ").concat(code, "\n    }\n    ").concat(lazy, "\n    ").concat(valor, "\n    ").concat(watch, "\n}"));
          } else {
            async_computed.push("async ".concat(cur.attr('name'), "() {").concat(code, "}"));
          }

          cur.remove();
        });
        vue.template = $.html();
        vue.script += async_computed.join(',');
        if (nodes.length > 0) vue.script += "}\n"; // process var ?change -> vue_watched_var

        nodes = $('vue_watched_var').toArray();
        if (nodes.length > 0) _this9.debug('post-processing vue_async_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += "watch: {\n";
        var watched = [];
        nodes.map(function (elem) {
          var cur = $(elem);
          var code = elem.children[0].data; //cur.text();

          if (cur.attr('deep')) {
            watched.push("\n\t\t\t\t'".concat(cur.attr('flat'), "': {\n\t\t\t\t\thandler(newVal, oldVal) {\n\t\t\t\t\t\tlet evento = { ").concat(cur.attr('newvar'), ":newVal, ").concat(cur.attr('oldvar'), ":oldVal };\n\t\t\t\t\t\t").concat(code, "\n\t\t\t\t\t},\n\t\t\t\t\tdeep: true\n\t\t\t\t}\n\t\t\t\t"));
          } else {
            watched.push("\n\t\t\t\t'".concat(cur.attr('flat'), "': function (newVal, oldVal) {\n\t\t\t\t\tlet evento = { ").concat(cur.attr('newvar'), ":newVal, ").concat(cur.attr('oldvar'), ":oldVal };\n\t\t\t\t\t").concat(code, "\n\t\t\t\t}\n\t\t\t\t"));
          }

          cur.remove();
        });
        vue.template = $.html();
        vue.script += watched.join(',');
        if (nodes.length > 0) vue.script += "}\n"; // process vue_if tags
        // repeat upto 5 times (@todo transform this into a self calling method)

        for (var x of [1, 2, 3, 4, 5]) {
          nodes = $('vue_if').toArray();

          if (nodes.length > 0) {
            _this9.debug("post-processing vue_if tag ".concat(x, " (len:").concat(nodes.length, ")"));

            nodes.map(function (elem) {
              var cur = $(elem);
              var if_type = cur.attr('tipo');
              var if_test = cur.attr('expresion');

              if (cur.attr('target') != 'template') {
                //search refx ID tag
                var target = $("*[refx=\"".concat(cur.attr('target'), "\"]")).toArray();

                if (target.length > 0) {
                  var target_node = $(target[0]);

                  if (if_type == 'v-else') {
                    target_node.attr(if_type, 'xpropx');
                  } else {
                    target_node.attr(if_type, if_test);
                  } //erase if tag


                  cur.replaceWith(cur.html());
                }
              }
            });
          } else {
            break;
          }

          yield _this9.setImmediatePromise(); //@improved
        } //


        vue.template = $.html(); // process vue_for tags
        // repeat upto 5 times (@todo transform this into a self calling method)

        for (var _x2 of [1, 2, 3, 4, 5]) {
          nodes = $('vue_for').toArray();

          if (nodes.length > 0) {
            _this9.debug("post-processing vue_for tag ".concat(_x2, " (len:").concat(nodes.length, ")"));
            nodes.map(function (elem) {
              var cur = $(elem);
              var iterator = cur.attr('iterator').replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store.', '$store.state.');

              if (cur.attr('use_index') && cur.attr('use_index') == 'false' && cur.attr('key') != 0) {
                iterator = "(".concat(cur.attr('item'), ", ").concat(cur.attr('key'), ") in ").concat(iterator);
              } else if (cur.attr('use_index') && cur.attr('use_index') == 'false' && cur.attr('key') == 0) {
                iterator = "".concat(cur.attr('item'), " in ").concat(iterator);
              } else if (cur.attr('key') && cur.attr('key') != 0 && cur.attr('use_index') != 'false') {
                iterator = "(".concat(cur.attr('item'), ", ").concat(cur.attr('key'), ", ").concat(cur.attr('use_index'), ") in ").concat(iterator);
              } else {
                iterator = "(".concat(cur.attr('item'), ", ").concat(cur.attr('use_index'), ") in ").concat(iterator);
              }

              if (cur.attr('target') != 'template') {
                //search refx ID tag
                var target = $("*[refx=\"".concat(cur.attr('target'), "\"]")).toArray();

                if (target.length > 0) {
                  var target_node = $(target[0]);
                  target_node.attr('v-for', iterator);
                  if (cur.attr('unique') != 0) target_node.attr(':key', cur.attr('unique'));
                  cur.replaceWith(cur.html());
                } //cur.replaceWith(cur.html()); // remove also if target node is not found

              } else {
                // transform <v_for>x</v_for> -> <template v-for='iterator'>x</template>
                // lookAt x=v_for_selector.html() and selector.replaceWith('<template v-for>'+x+'</template>')
                cur.replaceWith("<template v-for=\"".concat(iterator, "\">").concat(cur.html(), "</template>"));
              }
            });
          } else {
            break;
          }

          yield _this9.setImmediatePromise(); //@improved
        } //


        vue.template = $.html(); // process vue_event tags

        var common_methods = $('vue_event_method').toArray();
        var on_events = $('vue_event_element').toArray();

        if (common_methods.length > 0 || on_events.length > 0) {
          _this9.debug('post-processing methods (common, timer, and v-on element events methods)');

          if (vue.first) vue.script += ',\n';
          vue.first = true;
          var methods = [],
              _self2 = _this9; // event_methods

          common_methods.map(function (elem) {
            var cur = $(elem);
            var code = elem.children[0].data; //cur.text();

            var tmp = '';

            if (cur.attr('timer_time')) {
              _self2.x_state.npm['vue-interval'] = '*';
              page.mixins['vueinterval'] = 'vue-interval/dist/VueInterval.common';
              var timer_prefix = '';

              if (cur.attr('timer_time') && cur.attr('timer_time') != '') {
                //always in ms; tranform into 1e2 notation
                var ceros = cur.attr('timer_time').length - 1;
                var first = cur.attr('timer_time')[0];
                timer_prefix = "INTERVAL__".concat(first, "e").concat(ceros, "$");
              }

              if (cur.attr('m_params')) {
                if (cur.attr('type') == 'async') {
                  tmp += "".concat(timer_prefix).concat(cur.attr('name'), ": async function(").concat(cur.attr('m_params'), ") {");
                } else {
                  tmp += "".concat(timer_prefix).concat(cur.attr('name'), ": function(").concat(cur.attr('m_params'), ") {");
                }
              } else {
                if (cur.attr('type') == 'async') {
                  tmp += "".concat(timer_prefix).concat(cur.attr('name'), ": async function() {");
                } else {
                  tmp += "".concat(timer_prefix).concat(cur.attr('name'), ": function() {");
                }
              }
            } else {
              if (cur.attr('m_params')) {
                if (cur.attr('type') == 'async') {
                  tmp += "".concat(cur.attr('name'), ": async function(").concat(cur.attr('m_params'), ") {");
                } else {
                  tmp += "".concat(cur.attr('name'), ": function(").concat(cur.attr('m_params'), ") {");
                }
              } else {
                if (cur.attr('type') == 'async') {
                  tmp += "".concat(cur.attr('name'), ": async function() {");
                } else {
                  tmp += "".concat(cur.attr('name'), ": function() {");
                }
              }
            }

            methods.push("".concat(tmp, "\n").concat(code, "\n}"));
            cur.remove();
          }); // events_methods

          on_events.map(function (elem) {
            var evt = $(elem); //search father node of event

            var origin = $($("*[refx=\"".concat(evt.attr('parent_id'), "\"]")).toArray()[0]);
            var event = evt.attr('event'); // declare call in origin node

            if (evt.attr('link')) {
              // event linked to another node; usually another existing method func
              var link = evt.attr('link');
              var method_name = link;

              if (evt.attr('link_id')) {
                var target = $("vue_event_element[id=\"".concat(evt.attr('link_id'), "\"]")).toArray();

                if (target.length > 0) {
                  var the_node = $(target[0]);
                  method_name = the_node.attr('friendly_name');
                }

                method_name = method_name.replaceAll(':', '_').replaceAll('.', '_').replaceAll('-', '_');
              } // plugin related events


              if (event == 'click-outside') {
                origin.attr('v-click-outside', method_name);
              } else if (event == 'visibility') {
                origin.attr('v-observe-visibility', method_name);
              } else if (event == ':rules') {
                origin.attr(':rules', "[".concat(method_name, "]"));
              } else if (event == 'resize') {
                origin.attr('v-resize', method_name);
              } else {
                // custom defined methods
                if (evt.attr('v_params')) {
                  // v-on with params
                  origin.attr("v-on:".concat(event), "".concat(method_name, "(").concat(evt.attr('v_params'), ")"));
                } else {
                  // without params
                  if (evt.attr('link_id')) {
                    origin.attr("v-on:".concat(event), "".concat(method_name, "($event)"));
                  } else {
                    origin.attr("v-on:".concat(event), method_name);
                  }
                } //

              } // @TODO check if this is needed/used: was on original CFC code, but it seems it just overwrites previous things
              //if (evt.attr('link_id')) { 	
              //	origin.attr(`v-on:${event}`,`${link}_${evt.attr('link_id')}($event)`);
              //}
              //

            } else {
              // create method function and script
              var tmp = '';
              var _method_name = event;
              if (evt.attr('friendly_name') != '') _method_name = "".concat(evt.attr('friendly_name')); //event_suffix

              _method_name = _method_name.replaceAll(':', '_').replaceAll('.', '_').replaceAll('-', '_');
              var method_code = elem.children[0].data; //evt.text();

              if (event == 'click-outside') {
                origin.attr("v-click-outside", _method_name);
                tmp = "".concat(_method_name, ": async function() {\n\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t}");
              } else if (event == 'visibility') {
                origin.attr("v-observe-visibility", _method_name);
                tmp = "".concat(_method_name, ": async function(estado, elemento) {\n\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t}");
              } else if (event == ':rules') {
                origin.attr(":rules", "[".concat(_method_name, "]"));
                tmp = "".concat(_method_name, ": function() {\n\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t}");
              } else if (event == 'resize') {
                origin.attr("v-resize", _method_name);
                tmp = "".concat(_method_name, ": async function() {\n\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t}");
              } else {
                if (evt.attr('v_params') && evt.attr('v_params') != '') {
                  origin.attr("v-on:".concat(event), "".concat(_method_name, "(").concat(evt.attr('v_params'), ")"));
                } else {
                  origin.attr("v-on:".concat(event), "".concat(_method_name, "($event)"));
                }

                if (evt.attr('n_params')) {
                  tmp = "".concat(_method_name, ": async function(").concat(evt.attr('n_params'), ") {\n\t\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t\t}");
                } else {
                  tmp = "".concat(_method_name, ": async function(evento) {\n\t\t\t\t\t\t\t\t").concat(method_code, "\n\t\t\t\t\t\t\t}");
                }
              } // push tmp to methods


              methods.push(tmp);
            } // remove original event tag node
            // ** evt.remove();

          }); //remove vue_event_element tags

          on_events.map(function (elem) {
            $(elem).remove();
          }); // apply methods and changes

          vue.script += "methods: {\n\t\t\t\t\t\t\t".concat(methods.join(','), "\n\t\t\t\t\t\t   }");
          vue.template = $.html(); // apply changes to template
        }
        /* */


        return vue;
      })();
    }

    processStyles(vue, page) {
      var cheerio = require('cheerio');

      var $ = cheerio.load(vue.template, {
        ignoreWhitespace: false,
        xmlMode: true,
        decodeEntities: false
      });
      var styles = $("page_estilos").toArray();

      if (styles.length > 0) {
        this.debug('post-processing styles');
        var node = $(styles[0]);

        if (node.attr('scoped') && node.attr('scoped') == 'true') {
          vue.style += "\n\t\t\t\t<style scoped>\n\t\t\t\t".concat(node.text(), "\n\t\t\t\t</style>");
        } else {
          vue.style += "\n\t\t\t\t<style>\n\t\t\t\t".concat(node.text(), "\n\t\t\t\t</style>");
        }

        node.remove();
      }

      vue.template = $.html(); // add page styles (defined in js) to style tag code

      if (Object.keys(page.styles).length > 0) {
        var jss = require('jss').default;

        var global_plug = require('jss-plugin-global').default;

        jss.use(global_plug());
        var sheet = jss.createStyleSheet({
          '@global': page.styles
        });
        if (!vue.style) vue.style = '';
        vue.style += "<style>\n".concat(sheet.toString(), "</style>"); //this.debug('JSS sheet',sheet.toString());
      }

      return vue;
    }

    processMixins(vue, page) {
      // call after processInternalTags
      if (page.mixins && Object.keys(page.mixins).length > 0) {
        this.debug('post-processing mixins');
        var close = '';
        if (vue.first) close += ',\n';
        vue.first = true;
        close += "mixins: [".concat(Object.keys(page.mixins).join(','), "]");
        var mixins = [];

        for (var key in page.mixins) {
          mixins.push("import ".concat(key, " from '").concat(page.mixins[key], "';"));
        }

        vue.script = vue.script.replaceAll('{concepto:mixins:import}', mixins.join(';'));
        vue.script = vue.script.replaceAll('{concepto:mixins:array}', close);
      } else {
        vue.script = vue.script.replaceAll('{concepto:mixins:import}', '').replaceAll('{concepto:mixins:array}', '');
      }

      return vue;
    }

    removeRefx(vue) {
      var cheerio = require('cheerio');

      var $ = cheerio.load(vue.template, {
        ignoreWhitespace: false,
        xmlMode: true,
        decodeEntities: false
      });
      var refx = $("*[refx]").toArray();

      if (refx.length > 0) {
        this.debug('removing refx attributes (internal)');
        refx.map(function (x) {
          $(x).attr('refx', null);
        });
        vue.template = $.html();
      }

      return vue;
    }

    fixVuePaths(vue, page) {
      for (var key in this.x_state.pages) {
        if (this.x_state.pages[key].path) {
          vue.script = vue.script.replaceAll("{vuepath:".concat(key, "}"), this.x_state.pages[key].path);
        } else {
          this.x_console.outT({
            message: "WARNING! path key doesn't exist for page ".concat(key),
            color: 'yellow'
          });
        }
      } // remove / when first char inside router push name


      vue.script = vue.script.replaceAll("this.$router.push({ name:'/", "this.$router.push({ name:'");
      return vue;
    }

    processLangPo(vue, page) {
      var _this10 = this;

      return _asyncToGenerator(function* () {
        // writes default lang.po file and converts alternatives to client/lang/iso.js
        if (_this10.x_state.central_config.idiomas.indexOf(',') != -1) {
          _this10.debug('process /lang/ po/mo files');

          var path = require('path'),
              fs = require('fs').promises; // .check and create directs if needed


          var lang_path = path.join(_this10.x_state.dirs.base, '/lang/');

          try {
            yield fs.mkdir(lang_path, {
              recursive: true
            });
          } catch (errdir) {} // .create default po file from strings_i18n


          _this10.x_state.central_config.idiomas.split(',')[0]; // .read other po/mo files from lang dir and convert to .js


          for (var idioma in _this10.x_state.central_config.idiomas.split(',')) {
          } //

        }

        return vue;
      })();
    }

    createVueXStores() {
      var _this11 = this;

      return _asyncToGenerator(function* () {
        if (Object.keys(_this11.x_state.stores).length > 0) {
          _this11.x_console.outT({
            message: "creating VueX store definitions",
            color: 'cyan'
          });

          var path = require('path');

          require('util');

          var safe = require('safe-eval');

          for (var store_name in _this11.x_state.stores) {
            var store = _this11.x_state.stores[store_name];
            var file = path.join(_this11.x_state.dirs.store, "".concat(store_name, ".js"));
            var def_types = {
              'integer': 0,
              'int': 0,
              'float': 0.0,
              'boolean': false,
              'array': []
            };
            var obj = {};
   // iterate each store field
            //this.debug(`store ${store_name}`,store);

            for (var field_name in store) {
              var field = store[field_name]; //this.debug({ message:`checking field ${field_name} within store ${i}` });

              if (field.default && field.default.trim() == '') {
                if (field.type in def_types) {
                  obj[field_name] = def_types[field.type];
                } else {
                  obj[field_name] = '';
                }
              } else {
                if ('integer,int,float,boolean,array'.split(',').includes[field.type]) {
                  obj[field_name] = safe(field.default);
                } else if ('true,false,0,1'.split(',').includes[field.default]) {
                  obj[field_name] = safe(field.default);
                } else {
                  obj[field_name] = '' + field.default;
                }
              }
            } // expires?


            if (store_name in _this11.x_state.stores_types['expires']) {
              obj['expire'] = parseInt(_this11.x_state.stores_types['expires'][store_name]);
            } // versions?


            if (store_name in _this11.x_state.stores_types['versions']) {
              obj['version'] = parseInt(_this11.x_state.stores_types['versions'][store_name]);
            } // write content


            delete obj[':mutations'];
            var content = "export const state = () => (".concat(_this11.jsDump(obj), ")\n"); // :mutations?

            if (':mutations' in store) {
              var muts = [];

              for (var mut_name in store[':mutations']) {
                var mutation = store[':mutations'][mut_name];
                var mut = {
                  params: ['state']
                };
                if (Object.keys(mutation.params).length > 0) mut.params.push('objeto');
                muts.push("".concat(mut_name, "(").concat(mut.params.join(','), ") {\n                            ").concat(mutation.code, "\n                        }"));
              }

              content += "\nexport const mutations = {".concat(muts.join(','), "}");
            } // write file


            _this11.writeFile(file, content);
          }
        }
      })();
    }

    createServerMethods() {
      var _this12 = this;

      return _asyncToGenerator(function* () {
        if (Object.keys(_this12.x_state.functions).length > 0) {
          _this12.x_console.outT({
            message: "creating NuxtJS server methods",
            color: 'green'
          });

          var path = require('path');

          var file = path.join(_this12.x_state.dirs.server, "api.js");
          var content = "\n            var express = require('express'), _ = require('underscore'), axios = require('axios');\n            var server = express();\n            var plugins = {\n                bodyParser: require('body-parser'),\n                cookieParser: require('cookie-parser')\n            };\n            server.disable('x-powered-by');\n            server.use(plugins.bodyParser.urlencoded({ extended: false,limit: '2gb' }));\n            server.use(plugins.bodyParser.json({ extended: false,limit: '2gb' }));\n            server.use(plugins.cookieParser());\n            "; //merge functions import's into a single struct

          var imps = {};

          for (var x in _this12.x_state.functions) {
            for (var imp in _this12.x_state.functions[x]) {
              imps[imp] = _this12.x_state.functions[x][imp];
              yield _this12.setImmediatePromise(); //@improved
            }

            yield _this12.setImmediatePromise(); //@improved
          } //declare imports


          content += "// app declared functions imports\n";

          for (var _x3 in imps) {
            content += "var ".concat(imps[_x3], " = require('").concat(_x3, "');\n");
          }

          content += "// app declared functions\n"; //declare app methods

          for (var func_name in _this12.x_state.functions) {
            var func = _this12.x_state.functions[func_name];
            var func_return = "";
            if (func.return != '') func_return = "res.send(".concat(func.return, ");");
            content += "server.".concat(func.method, "('").concat(func.path, "', async function(req,res) {\n                    var params = req.").concat(func.method == 'get' ? 'params' : 'body', ";\n                    ").concat(func.code, "\n                    ").concat(func_return, "\n                });\n");
          } //close


          content += "module.exports = server;\n"; //write file

          _this12.writeFile(file, content);

          _this12.x_console.outT({
            message: "NuxtJS server methods ready",
            color: 'green'
          });
        }
      })();
    }

    createMiddlewares() {
      var _this13 = this;

      return _asyncToGenerator(function* () {
        if (Object.keys(_this13.x_state.proxies).length > 0) {
          _this13.x_console.outT({
            message: "creating VueJS Middlewares",
            color: 'cyan'
          });

          var path = require('path');

          for (var proxy_name in _this13.x_state.proxies) {
            var proxy = _this13.x_state.proxies[proxy_name];
            var file = path.join(_this13.x_state.dirs.middleware, "".concat(proxy_name, ".js")); //add imports

            var content = "";

            for (var key in proxy.imports) {
              content += "import ".concat(proxy.imports[key], " from '").concat(key, "';\n");
            } //add proxy code


            content += "export default async function ({ route, store, redirect, $axios }) {\n                    ".concat(proxy.code, "\n\n                }\n                "); //find and replace instances of strings {vuepath:targetnode}

            for (var page_name in _this13.x_state.pages) {
              if (page_name != '') {
                var page = _this13.x_state.pages[page_name];

                if (page.path) {
                  content = content.replaceAll("{vuepath:".concat(page_name, "}"), page.path);
                } else {
                  _this13.x_console.outT({
                    message: "Warning! path key doesn't exist for page ".concat(page_name),
                    color: 'yellow'
                  });
                }
              }

              yield _this13.setImmediatePromise(); //@improved
            } //write file


            _this13.writeFile(file, content);

            yield _this13.setImmediatePromise(); //@improved
          }

          _this13.x_console.outT({
            message: "VueJS Middlewares ready",
            color: 'cyan'
          });
        }
      })();
    }

    prepareServerFiles() {
      var _this14 = this;

      return _asyncToGenerator(function* () {
        var path = require('path');

        var index = "// index.js\n        const sls = require('serverless-http');\n        const binaryMimeTypes = require('./binaryMimeTypes');\n        const express = require('express');\n        const app = express();\n        const { Nuxt } = require('nuxt');\n        const path = require('path');\n        const config = require('./nuxt.config.js');\n\n        async function nuxtApp() {\n            app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));\n            const nuxt = new Nuxt(config);\n            await nuxt.ready();\n            app.use(nuxt.render);\n            return app;\n        }\n\n        module.exports.nuxt = async (event, context) => {\n            let nuxt_app = await nuxtApp();\n            let handler = sls(nuxt_app, { binary: binaryMimeTypes });\n            return await handler (event, context);\n        }\n        ";
        var index_file = path.join(_this14.x_state.dirs.app, "index.js");

        _this14.writeFile(index_file, index); // allowed binary mimetypes


        require('util');

        var allowed = ['application/javascript', 'application/json', 'application/octet-stream', 'application/xml', 'font/eot', 'font/opentype', 'font/otf', 'image/jpeg', 'image/png', 'image/svg+xml', 'text/comma-separated-values', 'text/css', 'text/html', 'text/javascript', 'text/plain', 'text/text', 'text/xml'];

        if (_this14.x_state.config_node['nuxt:mimetypes']) {
          var user_mimes = [];

          for (var usermime in _this14.x_state.config_node['nuxt:mimetypes']) {
            user_mimes.push(usermime);
          }

          var sum_mime = [...allowed, ...user_mimes];
          allowed = [...new Set(sum_mime)]; // clean duplicated values from array
        }

        var mime = "// binaryMimeTypes.js\n        module.exports = ".concat(_this14.jsDump(allowed), ";");
        var mime_file = path.join(_this14.x_state.dirs.app, "binaryMimeTypes.js");

        _this14.writeFile(mime_file, mime);
      })();
    }

    installRequiredPlugins() {
      var _this15 = this;

      return _asyncToGenerator(function* () {
        _this15.x_state.plugins['vuetify'] = {
          global: true,
          npm: {
            'node-sass': '*'
          },
          dev_npm: {
            '@nuxtjs/vuetify': '*'
          },
          nuxt_config: {
            vuetify: {
              theme: {
                dark: true,
                themes: {
                  dark: {
                    primary: 'colors.blue.darken2',
                    accent: 'colors.grey.darken3',
                    secondary: 'colors.amber.darken3',
                    info: 'colors.teal.lighten1',
                    warning: 'colors.amber.base',
                    error: 'colors.deepOrange.accent4',
                    success: 'colors.green.accent3'
                  }
                }
              }
            }
          }
        };
        _this15.x_state.nuxt_config.build_modules['@nuxtjs/vuetify'] = {};
        _this15.x_state.plugins['aos'] = {
          global: true,
          npm: {
            aos: '*'
          },
          mode: 'client',
          customcode: "import AOS from \"aos\";\n            import \"aos/dist/aos.css\";\n            export default ({app}) => {\n                app.AOS = new AOS.init({});\n            };"
        };
      })();
    }

    createNuxtPlugins() {
      var _this16 = this;

      return _asyncToGenerator(function* () {
        var path = require('path');

        var resp = {
          global_plugins: {},
          css_files: [],
          nuxt_config: []
        };

        for (var plugin_key in _this16.x_state.plugins) {
          var plugin = _this16.x_state.plugins[plugin_key];

          if (typeof plugin === 'object') {
            // copy x_state_plugins npm's into npm global imports (for future package.json)
            if (plugin.npm) _this16.x_state.npm = _objectSpread2(_objectSpread2({}, _this16.x_state.npm), plugin.npm);
            if (plugin.dev_npm) _this16.x_state.dev_npm = _objectSpread2(_objectSpread2({}, _this16.x_state.dev_npm), plugin.dev_npm);
            if (plugin.global && plugin.global == true) resp.global_plugins[plugin_key] = '*';

            if (plugin.styles) {
              for (var style_key in plugin.styles) {
                var style = plugin.styles[style_key];

                if (style.file.contains('/') == false) {
                  var target = path.join(_this16.x_state.dirs.css, style.file);
                  yield _this16.writeFile(target, style.content);
                  resp.css_files.push({
                    src: "~/assets/css/".concat(style.file),
                    lang: style.lang
                  });
                }
              }
            } // write the plugin code


            var import_as = '',
                _code = '';

            if (plugin.var) {
              import_as = plugin.var;
            } else {
              import_as = plugin_key.split('/').splice(-1)[0].replaceAll('-', '').replaceAll('_', '').toLowerCase().trim();
            }

            _code = "import Vue from 'vue';\n";

            if (plugin.as_star) {
              if (plugin.as_star == true) {
                _code += "import * as ".concat(import_as, " from '").concat(plugin_key, "';\n");
              } else {
                _code += "import ".concat(import_as, " from '").concat(plugin_key, "';\n");
              }
            } else {
              _code += "import ".concat(import_as, " from '").concat(plugin_key, "';\n");
            }

            if (plugin.custom) _code += "".concat(plugin.custom, "\n");

            if (plugin.extra_imports) {
              for (var extra in plugin.extra_imports) {
                var new_key = plugin.extra_imports[extra].replaceAll('-', '').replaceAll('_', '').replaceAll('/', '').replaceAll('.css', '').replaceAll('.', '_').toLowerCase().trim();
                _code += "import ".concat(new_key, " from '").concat(plugin.extra_imports[extra], "'\n");
              }
            }

            if (plugin.requires) {
              for (var req in plugin.requires) {
                _code += "require('".concat(plugin.requires[req], "');\n");
              }
            }

            if (plugin.styles) {
              for (var _style_key in plugin.styles) {
                var _style = plugin.styles[_style_key];

                if (_style.file.contains('/')) {
                  _code += "import '".concat(_style.file, "';\n");
                }
              }
            } // add config to plugin code if requested


            if (plugin.config) {
              if (typeof plugin.config === 'object') {
                _code += "const config = ".concat(_this16.jsDump(plugin.config), ";\n                        Vue.use(").concat(import_as, ",config);");
              } else {
                _code += "Vue.use(".concat(import_as, ",").concat(plugin.config, ");\n");
              }
            } else if (plugin.tag) {
              _code += "Vue.component('".concat(plugin.tag, "',").concat(import_as, ");\n");
            } else if (plugin.customvar) {
              _code += "Vue.use(".concat(plugin.customvar, ");\n");
            } else {
              _code += "Vue.use(".concat(import_as, ");\n");
            } // if customcode overwrite 'code'


            if (plugin.customcode) {
              _code = plugin.customcode;
            } // write to disk and add to response


            if (import_as != 'vuetify') {
              if (plugin.mode) {
                resp.nuxt_config.push({
                  mode: plugin.mode.toLowerCase().trim(),
                  src: "~/plugins/".concat(import_as, ".js")
                });
              } else {
                resp.nuxt_config.push({
                  src: "~/plugins/".concat(import_as, ".js")
                });
              }

              var _target2 = path.join(_this16.x_state.dirs.plugins, "".concat(import_as, ".js"));

              yield _this16.writeFile(_target2, _code);
            }
          } else {
            //simple plugin
            _this16.x_state.npm[plugin_key] = plugin;

            var _import_as = plugin_key.replaceAll('-', '').replaceAll('_', '').toLowerCase().trim();

            code += "import Vue from 'vue';\n                import ".concat(_import_as, " from '").concat(plugin_key, "';\n                Vue.use(").concat(_import_as, ");\n                "); // write to disk and add to response

            if (_import_as != 'vuetify') {
              resp.nuxt_config.push({
                src: "~/plugins/".concat(_import_as, ".js")
              });

              var _target3 = path.join(_this16.x_state.dirs.plugins, "".concat(_import_as, ".js"));

              yield _this16.writeFile(_target3, code);
            }
          }
        }

        return resp;
      })();
    }

    createNuxtConfig() {
      var _this17 = this;

      return _asyncToGenerator(function* () {
        //creates the file nuxt.config.js
        //define structure with defaults
        var path = require('path');

        var target = path.join(_this17.x_state.dirs.app, "nuxt.config.js");
        _this17.x_state.central_config[':mode'] == 'spa' ? true : false;
        if (_this17.x_state.central_config[':ssr']) _this17.x_state.central_config[':ssr'];
        var target_val = _this17.x_state.central_config.static == true ? 'static' : 'server';
        var deploy = _this17.x_state.central_config.deploy + '';
        var config = {
          ssr: false,
          //8may21 forced psb
          target: target_val,
          components: true,
          telemetry: false,
          loading: {
            color: 'orange',
            height: '2px',
            continuous: true
          },
          head: {
            title: _this17.x_state.config_node['nuxt:title'] ? _this17.x_state.config_node['nuxt:title'] : _this17.x_state.central_config.apptitle,
            meta: [],
            link: [{
              rel: 'icon',
              type: 'image/x-icon',
              href: '/favicon.ico'
            }, {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }],
            script: [],
            __dangerouslyDisableSanitizers: ['script']
          },
          env: {},
          debug: false,
          modules: [],
          buildModules: [],
          plugins: [],
          css: [],
          build: {
            publicPath: '/_nuxt/'
          },
          srcDir: 'client/',
          performance: {
            gzip: false
          },
          router: {
            base: '/'
          },
          dev: false
        }; //add title:meta data

        if (_this17.x_state.config_node['nuxt:meta']) {
          for (var meta_key in _this17.x_state.config_node['nuxt:meta']) {
            if (meta_key.charAt(0) != ':') {
              var test = meta_key.toLowerCase().trim();
              var value = _this17.x_state.config_node['nuxt:meta'][meta_key];

              if (test == 'charset') {
                config.head.meta.push({
                  charset: value
                });
              } else if (test == 'description') {
                config.head.push({
                  hid: 'description',
                  name: 'description',
                  content: value
                });
              } else {
                config.head.meta.push({
                  name: meta_key,
                  content: value
                });
              }
            }
          }
        } else if (_this17.x_state.config_node.meta && _this17.x_state.config_node.meta.length > 0) {
          config.head.meta = _this17.x_state.config_node.meta;
        } //add custom head scripts
        //sort head scripts a-z


        var as_array = [];

        for (var head in _this17.x_state.head_script) {
          as_array.push({
            key: head,
            params: _this17.x_state.head_script[head]
          }); //config.head.script.push({ ...this.x_state.head_script[head] });
        }

        var sorted = as_array.sort(function (key) {
          var sort_order = 1; //desc=-1

          return function (a, b) {
            if (a[key] < b[key]) {
              return -1 * sort_order;
            } else if (a[key] > b[key]) {
              return 1 * sort_order;
            } else {
              return 0 * sort_order;
            }
          };
        });

        for (var _head in sorted) {
          config.head.script.push(sorted[_head].params);
        } //nuxt axios config


        if (_this17.x_state.config_node.axios) {
          var ax_config = {
            proxy: _this17.x_state.nuxt_config.modules['@nuxtjs/proxy'] ? true : false
          };
          ax_config = _objectSpread2(_objectSpread2({}, _this17.x_state.config_node.axios), ax_config);

          if (ax_config.retries) {
            ax_config.retry = {
              retries: ax_config.retries
            };
            delete ax_config.retries;
            _this17.x_state.npm['axios-retry'] = '*';
          }

          if (deploy.contains('eb:') || deploy.contains('true')) {
            if (_this17.x_state.config_node.axios.deploy) {
              ax_config.baseURL = _this17.x_state.config_node.axios.deploy;
              ax_config.browserBaseURL = _this17.x_state.config_node.axios.deploy;
              delete ax_config.deploy;
            }
          } else if (deploy == 'local') {
            if (_this17.x_state.config_node.axios.local) {
              ax_config.baseURL = _this17.x_state.config_node.axios.local;
              ax_config.browserBaseURL = _this17.x_state.config_node.axios.local;
              delete ax_config.local;
              if (_this17.x_state.config_node.axios.local.contains('127.0.0.1')) _this17.x_state.config_node.axios.https = false;
            }

            delete ax_config.deploy;
          }

          config.axios = ax_config;
          delete _this17.x_state.config_node.axios;
        } //nuxt vue config


        if (_this17.x_state.config_node['vue:config']) {
          config.vue = {
            config: _this17.x_state.config_node['vue:config']
          };
          delete config.vue.config[':secret'];
          delete config.vue.config[':link'];
        } //nuxt proxy config keys


        if (_this17.x_state.nuxt_config.modules['@nuxtjs/proxy']) {
          config.proxy = _this17.x_state.nuxt_config.modules['@nuxtjs/proxy'];
        } //nuxt env variables


        config.env = {};

        for (var node_key in _this17.x_state.config_node) {
          if (node_key.contains(':') == false) {
            if ('aurora,vpc,aws'.split(',').includes(node_key) == false) {
              if (_this17.x_state.secrets[node_key] === undefined && typeof _this17.x_state.config_node[node_key] === 'object') {
                config.env[node_key.toLowerCase()] = _objectSpread2({}, _this17.x_state.config_node[node_key]);
              }
            }
          }
        } //nuxt google:analytics


        if (_this17.x_state.config_node['google:analytics']) {
          if (_this17.x_state.config_node['google:analytics'].local && _this17.x_state.config_node['google:analytics'].local == true) {
            config.debug = true;
          }
        } //nuxt modules


        for (var module_key in _this17.x_state.nuxt_config.modules) {
          var module = _this17.x_state.nuxt_config.modules[module_key];

          if (Object.keys(module) == '') {
            config.modules.push(module_key);
          } else {
            config.modules.push([module_key, module]);
          }
        } //nuxt build_modules


        for (var _module_key in _this17.x_state.nuxt_config.build_modules) {
          var _module = _this17.x_state.nuxt_config.build_modules[_module_key];

          if (Object.keys(_module) == '') {
            config.buildModules.push(_module_key);
          } else {
            config.buildModules.push([_module_key, _module]);
          }
        } //nuxt plugins


        config.plugins = _this17.x_state.nuxt_config.plugins;
        config.css = _this17.x_state.nuxt_config.css; //muxt server methods

        if (_this17.x_state.functions && Object.keys(_this17.x_state.functions).length > 0) config.serverMiddleware = ['~/server/api']; //nuxt build - cfc: 12637

        config.vuetify = {
          treeShake: true,
          options: {
            variations: false
          }
        }; //8may21 psb

        config.build = {
          publicPath: '/_nuxt/',
          analyze: false,
          extractCSS: {
            ignoreOrder: true
          } //optimizeCSS: true,

          /*
          html: {
              minify: {
                  collapseBooleanAttributes: true,
                  decodeEntities: true,
                  minifyCSS: true,
                  minifyJS: true,
                  processConditionalComments: true,
                  removeEmptyAttributes: true,
                  removeRedundantAttributes: true,
                  trimCustomFragments: true,
                  useShortDoctype: true,
                  minifyURLs: true,
                  removeComments: true,
                  removeEmptyElements: true,
                  preserveLineBreaks: false,
                  collapseWhitespace: true
              }
          }*/

        };

        if (_this17.x_state.central_config.stage && _this17.x_state.central_config.stage != 'production' && _this17.x_state.central_config.stage != 'prod') {
          config.build.publicPath = "/".concat(_this17.x_state.central_config.stage, "/_nuxt/");
        } //we don't need webpack build rules in this edition:omit from cfc, so we are ready here
        //let util = require('util');
        //let content = util.inspect(config,{ depth:Infinity }).replaceAll("'`","`").replaceAll("`'","`");


        var content = _this17.jsDump(config).replaceAll("'`", "`").replaceAll("`'", "`");

        yield _this17.writeFile(target, "export default ".concat(content)); //this.x_console.outT({ message:'future nuxt.config.js', data:data});
      })();
    }

    createPackageJSON() {
      var _this18 = this;

      return _asyncToGenerator(function* () {
        var data = {
          name: _this18.x_state.central_config.service_name,
          version: '',
          description: _this18.x_state.central_config[':description'],
          main: 'index.js',
          dependencies: {},
          devDependencies: {},
          scripts: {
            dev: 'nuxt',
            build: 'nuxt export --no-lock',
            start: 'nuxt export && nuxt serve',
            generate: 'nuxt export',
            deploy: 'nuxt export --no-lock && eb deploy',
            'start-server': 'nuxt build && node app.js',
            'start-sls': 'nuxt build && sls offline start'
          },
          keywords: [],
          author: '',
          license: ''
        }; //if not static

        if (!_this18.x_state.central_config.static) {
          data.scripts = _objectSpread2(_objectSpread2({}, data.scripts), {
            build: 'nuxt build --no-lock',
            start: 'nuxt start --no-lock',
            generate: 'nuxt generate',
            deploy: 'nuxt build --no-lock && sls deploy'
          });
        } //overwrite if we are a component


        if (_this18.x_state.central_config.componente) {
          data = {
            name: '',
            version: '',
            description: '',
            main: _this18.x_state.central_config.service_name + '.vue',
            dependencies: {},
            devDependencies: {},
            scripts: {
              test: 'jest',
              build: 'poi build --prod'
            },
            jest: {
              moduleFileExtensions: ['js', 'vue'],
              moduleNameMapper: {
                '^@/(.*)$': '<rootDir>/src/$1'
              },
              transform: {
                '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
                '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
              },
              snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
            },
            unpkg: "umd/".concat(_this18.x_state.central_config.service_name, ".js"),
            jsdelivr: "umd/".concat(_this18.x_state.central_config.service_name, ".js"),
            keywords: [],
            author: '',
            license: ''
          };
        } //if port is not 3000


        if (_this18.x_state.central_config.port != 3000) data.scripts.dev = "nuxt --port ".concat(_this18.x_state.central_config.port);
        if (_this18.x_state.central_config[':version']) data.version = _this18.x_state.central_config[':version'];
        if (_this18.x_state.central_config[':author']) data.author = _this18.x_state.central_config[':author'];
        if (_this18.x_state.central_config[':license']) data.license = _this18.x_state.central_config[':license'];

        if (_this18.x_state.central_config[':git']) {
          data.repository = {
            type: 'git',
            url: "git+".concat(_this18.x_state.central_config[':git'], ".git")
          };
          data.bugs = {
            url: "".concat(_this18.x_state.central_config[':git'], "/issues")
          };
          data.homepage = _this18.x_state.central_config[':git'];
        }

        if (_this18.x_state.central_config[':keywords']) data.keywords = _this18.x_state.central_config[':keywords'].split(','); //add dependencies

        for (var pack in _this18.x_state.npm) {
          if (_this18.x_state.npm[pack].contains('http') && _this18.x_state.npm[pack].contains('github.com')) {
            data.dependencies[pack] = "git+".concat(_this18.x_state.npm[pack]);
          } else {
            data.dependencies[pack] = _this18.x_state.npm[pack];
          }
        } //add devDependencies


        for (var _pack in _this18.x_state.dev_npm) {
          if (_this18.x_state.dev_npm[_pack].contains('http') && _this18.x_state.dev_npm[_pack].contains('github.com')) {
            data.devDependencies[_pack] = "git+".concat(_this18.x_state.dev_npm[_pack]);
          } else {
            data.devDependencies[_pack] = _this18.x_state.dev_npm[_pack];
          }
        } //write to disk


        var path = require('path');

        var target = path.join(_this18.x_state.dirs.app, "package.json");
        var content = JSON.stringify(data);
        yield _this18.writeFile(target, content); //this.x_console.outT({ message:'future package.json', data:data});
      })();
    }

    createServerlessYML() {
      var _this19 = this;

      return _asyncToGenerator(function* () {
        var yaml = require('yaml'),
            data = {};

        var deploy = _this19.x_state.central_config.deploy + '';

        if (deploy.contains('eb:') == false && deploy != false && deploy != 'local') {
          data.service = _this19.x_state.central_config.service_name;
          data.custom = {
            prune: {
              automatic: true,
              includeLayers: true,
              number: 1
            },
            apigwBinary: {
              types: ['*/*']
            }
          }; //add 'secrets' config json keys - cfc:12895
          //this.x_state.secrets

          for (var secret in _this19.x_state.secrets) {
            data.custom[secret] = '${file(secrets/' + secret + '.json)}';
          } //domain info


          if (_this19.x_state.central_config.dominio) {
            data.custom.customDomain = {
              domainName: _this19.x_state.central_config.dominio
            };
            if (_this19.x_state.central_config.basepath) data.custom.customDomain.basePath = _this19.x_state.central_config.basepath;
            if (_this19.x_state.central_config.stage) data.custom.customDomain.stage = _this19.x_state.central_config.stage;
            data.custom.customDomain.createRoute53Record = true;
          } //nodejs env on aws


          data.provider = {
            name: 'aws',
            runtime: 'nodejs8.10',
            timeout: _this19.x_state.central_config.timeout
          };
          if (_this19.x_state.central_config.stage) data.provider.stage = _this19.x_state.central_config.stage; //env keys

          if (Object.keys(_this19.x_state.config_node) != '') {
            data.provider.enviroment = {};
            if (_this19.x_state.central_config.stage) data.provider.enviroment.STAGE = _this19.x_state.central_config.stage;

            if (_this19.x_state.config_node.vpc) {
              data.provider.vpc = {
                securityGroupIds: [_this19.x_state.config_node.vpc.security_group_id],
                subnetIDs: []
              };

              if (_this19.x_state.secrets.vpc) {
                data.provider.vpc.securityGroupIds = ['${self:custom.vpc.SECURITY_GROUP_ID}'];
              }

              if (_this19.x_state.config_node.vpc.subnet1_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET1_ID}');
              if (_this19.x_state.config_node.vpc.subnet2_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET2_ID}');
              if (_this19.x_state.config_node.vpc.subnet3_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET3_ID}');
              if (_this19.x_state.config_node.vpc.subnet4_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET4_ID}');
              if (_this19.x_state.config_node.vpc.subnet5_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET5_ID}');
              if (_this19.x_state.config_node.vpc.subnet6_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET6_ID}');
              if (_this19.x_state.config_node.vpc.subnet7_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET7_ID}');
            }
          } //aws iam for s3 permissions (x_state.aws_iam) (@TODO later - cfc:12990)

          /*
          data.provider.iamRoleStatements = {
              Effect: 'Allow'
          };*/
          //nuxt handler


          data.functions = {
            nuxt: {
              handler: 'index.nuxt',
              events: [{
                'http': 'ANY /'
              }, {
                'http': 'ANY /{proxy+}'
              }]
            }
          };

          if (_this19.x_state.central_config['keep-warm']) {
            data.functions.nuxt.events.push({
              schedule: 'rate(20 minutes)'
            });
          } //aws resources for s3 (x_state.aws_resources) (@TODO later - no commands use them - cfc:13017)
          //serverless plugins


          data.plugins = ['serverless-apigw-binary', 'serverless-offline', 'serverless-prune-plugin'];
          if (_this19.x_state.central_config.dominio) data.plugins.push('serverless-domain-manager'); //write yaml to disk

          var content = yaml.stringify(data);

          var path = require('path');

          var target = path.join(_this19.x_state.dirs.app, "serverless.yml");
          yield _this19.writeFile(target, content); //debug
          //this.debug('future serverless.yml', content);
        }
      })();
    }

    onEnd() {
      var _this20 = this;

      return _asyncToGenerator(function* () {
        //execute deploy (npm install, etc) AFTER vue compilation (18-4-21: this is new)
        if (!(yield _this20.deploy_module.deploy()) && !_this20.x_state.central_config.componente) {
          _this20.x_console.outT({
            message: 'Something went wrong deploying, check the console, fix it and run again.',
            color: 'red'
          });
        }
        yield _this20.deploy_module.post();
      })();
    }

    exists(dir_or_file) {
      return _asyncToGenerator(function* () {
        var fs = require('fs').promises;

        try {
          yield fs.access(dir_or_file);
          return true;
        } catch (e) {
          return false;
        }
      })();
    }

    writeFile(file, content) {
      var _arguments = arguments,
          _this21 = this;

      return _asyncToGenerator(function* () {
        var encoding = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : 'utf-8';

        var fs = require('fs').promises,
            prettier = require('prettier');

        var ext = file.split('.').splice(-1)[0].toLowerCase(); //console.log('writeFile:'+file+' (ext:'+ext+')');

        /*let beautify = require('js-beautify');
        let beautify_js = beautify.js;
        let beautify_vue = beautify.html;
        let beautify_css = beautify.css;*/

        var resp = content;

        if (ext == 'js') {
          try {
            resp = prettier.format(resp, {
              parser: 'babel',
              useTabs: true,
              singleQuote: true
            });
          } catch (ee) {
            _this21.debug("error: could not format the JS file; trying js-beautify");

            var beautify = require('js-beautify');

            var beautify_js = beautify.js;
            resp = beautify_js(resp, {});
          }
        } else if (ext == 'json') {
          resp = prettier.format(resp, {
            parser: 'json'
          });
        } else if (ext == 'vue') {
          /*
          let beautify = require('js-beautify');
          let beautify_vue = beautify.html;
          resp = beautify_vue(resp.replaceAll(`="xpropx"`,''),{});*/
          try {
            resp = prettier.format(resp.replaceAll("=\"xpropx\"", ''), {
              parser: 'vue',
              htmlWhitespaceSensitivity: 'ignore',
              useTabs: true,
              printWidth: 2000,
              embeddedLanguageFormatting: 'auto',
              singleQuote: true,
              trailingComma: 'none'
            });
          } catch (ee) {
            _this21.debug("error: could not format the vue file; trying vue-beautify");

            var _beautify = require('js-beautify');

            var beautify_vue = _beautify.html;
            resp = beautify_vue(resp, {});
          }
        } else if (ext == 'css') {
          resp = prettier.format(resp, {
            parser: 'css'
          });
        }
        /*
        
        let resp = content;
        if (ext=='js' || ext=='json') {
            resp = beautify_js(resp, { eval_code: false }).replaceAll(`\n\n`,'');
        } else if (ext=='vue') {
            resp = beautify_vue(resp.replaceAll(`="xpropx"`,''),{}); //{ indent_scripts: 'keep' }
        } else if (ext=='css') {
            resp = beautify_css(resp, { indent_scripts: 'keep' });
        }*/


        yield fs.writeFile(file, resp, encoding);
      })();
    } //Transforms the processed nodes into files.


    onCreateFiles(processedNodes) {
      var _this22 = this;

      return _asyncToGenerator(function* () {
        //this.x_console.out({ message:'onCreateFiles', data:processedNodes });
        //this.x_console.out({ message:'x_state', data:this.x_state });
        yield _this22.generalConfigSetup();
        yield _this22.createGitIgnore();

        _this22.debug('processing nodes');

        var fs = require('fs').promises,
            path = require('path');

        for (var thefile_num in processedNodes) {
          //await processedNodes.map(async function(thefile) {
          var thefile = processedNodes[thefile_num];
          thefile.code + '\n';

          if (thefile.file.split('.').slice(-1) == 'omit') {
            yield _this22.processOmitFile(thefile); //process special non 'files'
          } else {
            _this22.debug('processing node ' + thefile.title);

            var vue = yield _this22.getBasicVue(thefile);
            var page = _this22.x_state.pages[thefile.title]; // @TODO check the vue.template replacements (8-mar-21)
            // declare server:asyncData

            _this22.debug('post-processing internal custom tags');

            vue = yield _this22.processInternalTags(vue, page); // closure ...
            // **** **** start script wrap **** **** **** **** 

            var script_imports = ''; // header for imports

            if (page) {
              for (var key in page.imports) {
                script_imports += "import ".concat(page.imports[key], " from '").concat(key, "';\n");
              } //);

            } // export default


            vue.script = "{concepto:mixins:import}\n\t\t\t\t".concat(script_imports, "\n\t\t\t\texport default {\n\t\t\t\t\t").concat(vue.script, "\n                    {concepto:mixins:array}\n\t\t\t\t}"); // **** **** end script wrap **** **** 
            // process Mixins

            vue = _this22.processMixins(vue, page); // process Styles

            vue = _this22.processStyles(vue, page); // removes refx attributes

            vue = _this22.removeRefx(vue); // fix {vuepath:} placeholders

            vue = _this22.fixVuePaths(vue, page); // process lang files (po)

            vue = yield _this22.processLangPo(vue, page); // ********************************** //
            // beautify the script and template
            // ********************************** //

            vue.script = '<script>\n' + vue.script + '\n</script>';
            if (!vue.style) vue.style = '';
            vue.full = "".concat(vue.template, "\n").concat(vue.script, "\n").concat(vue.style); // ********************************** //
            // write files

            var w_path = path.join(_this22.x_state.dirs.pages, thefile.file);

            if (page.tipo == 'componente') {
              _this22.x_console.outT({
                message: "trying to write vue 'component' file ".concat(thefile.file),
                color: 'cyan'
              });

              w_path = path.join(_this22.x_state.dirs.components, thefile.file);
            } else if (page.tipo == 'layout') {
              _this22.x_console.outT({
                message: "trying to write vue 'layout' file ".concat(thefile.file),
                color: 'cyan'
              });

              w_path = path.join(_this22.x_state.dirs.layouts, thefile.file);
            } else {
              _this22.x_console.outT({
                message: "trying to write vue 'page' file ".concat(thefile.file),
                color: 'cyan'
              });
            }

            yield _this22.writeFile(w_path, vue.full); //
            //this.x_console.out({ message: 'vue ' + thefile.title, data: { vue, page_style: page.styles } });
          } //this.x_console.out({ message:'pages debug', data:this.x_state.pages });


          yield _this22.setImmediatePromise(); //@improved
        } // *************************
        // copy/write related files
        // *************************
        // copy static required files for known NPMs packages (gif.js) @TODO improved this ugly hack  
        //this.x_state.npm['gif.js'] = '*';


        if (_this22.x_state.npm['gif.js']) {
          _this22.x_console.outT({
            message: "downloading required gif.worker.js file for gif.js npm package",
            color: 'yellow'
          });

          var fetch = require('node-fetch');

          var static_path = path.join(_this22.x_state.dirs.static, 'gif.worker.js');
          var worker = yield fetch('https://raw.githubusercontent.com/jnordberg/gif.js/master/dist/gif.worker.js');

          var _contenido = yield worker.text();

          yield fs.writeFile(static_path, _contenido, 'utf-8');
        } // copy assets


        if (Object.keys(_this22.x_state.assets).length > 0) {
          _this22.debug({
            message: "Copying assets",
            color: 'cyan'
          });

          var copy = require('recursive-copy');

          for (var i in _this22.x_state.assets) {
            //@TODO add support for i18n assets
            var asset = _this22.x_state.assets[i];

            if (!asset.i18n) {
              var source = path.join(_this22.x_state.dirs.base, asset.original);
              var target = path.join(_this22.x_state.dirs.assets, asset.original.split('/').slice(-1)[0]); //this.debug({ message: `Copying asset`, data:{source,target}, color:'cyan'});

              try {
                yield copy(source, target);
              } catch (e) {}
            }

            yield _this22.setImmediatePromise(); //@improved
          }

          _this22.debug({
            message: "Copying assets ready",
            color: 'cyan'
          });
        } // create Nuxt template structure


        if (!_this22.x_state.central_config.componente) {
          yield _this22.createVueXStores();
          yield _this22.createServerMethods();
          yield _this22.createMiddlewares(); //create server files (nuxt express, mimetypes)

          yield _this22.prepareServerFiles(); //declare required plugins

          yield _this22.installRequiredPlugins(); //create NuxtJS plugin definition files

          var nuxt_plugs = yield _this22.createNuxtPlugins(); //return plugin array list for nuxt.config.js

          _this22.x_state.nuxt_config.plugins = nuxt_plugs.nuxt_config;
          _this22.x_state.nuxt_config.css = nuxt_plugs.css_files; //create nuxt.config.js file

          yield _this22.createNuxtConfig(); //create package.json

          yield _this22.createPackageJSON(); //create serverless.yml for deploy:sls - cfc:12881

          yield _this22.createServerlessYML(); //execute deploy (npm install, etc) - moved to onEnd
        }
      })();
    } // ************************
    // INTERNAL HELPER METHODS 
    // ************************

    /*
     * Returns true if a local server is running on the DSL defined port
     */


    _isLocalServerRunning() {
      var _this23 = this;

      return _asyncToGenerator(function* () {
        var is_reachable = require('is-port-reachable');

        var resp = yield is_reachable(_this23.x_state.central_config.port);
        return resp;
      })();
    }
    /*
     * Reads the node called modelos and creates tables definitions and managing code (alias:database).
     */


    _readModelos() {
      var _this24 = this;

      return _asyncToGenerator(function* () {
        // @IDEA this method could return the insert/update/delete/select 'function code generators'
        _this24.debug('_readModelos');

        _this24.debug_time({
          id: 'readModelos'
        });

        var modelos = yield _this24.dsl_parser.getNodes({
          text: 'modelos',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true	

        var tmp = {
          appname: _this24.x_state.config_node.name
        },
            fields_map = {};
        var resp = {
          tables: {},
          attributes: {},
          length: 0,
          doc: ''
        }; // map our values to real database values 

        var type_map = {
          id: {
            value: 'INT AUTOINCREMENT PRIMARY KEY',
            alias: ['identificador', 'autoid', 'autonum', 'key']
          },
          texto: {
            value: 'STRING',
            alias: ['text', 'varchar', 'string']
          },
          int: {
            value: 'INTEGER',
            alias: ['numero chico', 'small int', 'numero']
          },
          float: {
            value: 'FLOAT',
            alias: ['decimal', 'real']
          },
          boolean: {
            value: 'BOOLEAN',
            alias: ['boleano', 'true/false']
          },
          date: {
            value: 'DATEONLY',
            alias: ['fecha']
          },
          datetime: {
            value: 'DATETIME',
            alias: ['fechahora']
          },
          blob: {
            value: 'BLOB',
            alias: ['binario', 'binary']
          }
        }; // expand type_map into fields_map

        Object.keys(type_map).map(function (x) {
          var aliases = type_map[x].alias;
          aliases.push(x);
          aliases.map(y => {
            fields_map[y] = type_map[x].value;
          });
        }); // parse nodes into tables with fields

        if (modelos.length > 0) {
          //modelos[0].attributes.map(x=>{ resp.attributes={...resp.attributes,...x} }); //modelos attributes
          resp.attributes = _objectSpread2({}, modelos[0].attributes);
          resp.doc = modelos[0].text_note;
          resp.length = modelos[0].nodes.length;

          for (var table of modelos[0].nodes) {
            var fields = _objectSpread2({}, table.attributes); //table.attributes.map(x=>{ fields={...fields,...x} }); //table attributes


            resp.tables[table.text] = {
              fields: {}
            }; //create table

            tmp.sql_fields = [];

            for (var field in fields) {
              resp.tables[table.text].fields[field] = fields_map[fields[field]]; //assign field with mapped value

              tmp.sql_fields.push(field + ' ' + fields_map[fields[field]]);
            }

            resp.tables[table.text].sql = "CREATE TABLE ".concat(table.text, "(").concat(tmp.sql_fields.join(','), ")");
            yield _this24.setImmediatePromise(); //@improved
          }
        }

        _this24.debug_timeEnd({
          id: 'readModelos'
        }); // install alaSQL plugin and define tables


        if (resp.length > 0) {
          // get tables sql create
          var ala_create = [];

          for (var _table in resp.tables) {
            ala_create.push("alasqlJs('".concat(resp.tables[_table].sql, "');"));
          } // set custom install code


          var ala_custom = "const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t".concat(ala_create.join('\n'), "\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}"); // set plugin info in state

          _this24.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
            global: true,
            npm: {
              alasql: '*'
            },
            var: 'alasqlJs',
            mode: 'client',
            customvar: 'alasql',
            custom: ala_custom
          };
        } // return 


        return resp;
      })();
    }
    /*
     * Reads assets node, and returns object with info
     */


    _readAssets() {
      var _this25 = this;

      return _asyncToGenerator(function* () {
        var resp = {},
            path = require('path');

        _this25.debug('_readAssets');

        _this25.debug_time({
          id: '_readAssets'
        });

        var assets = yield _this25.dsl_parser.getNodes({
          text: 'assets',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true

        var sep = path.sep; //
        //this.debug('assets search',assets);

        if (assets.length > 0) {
          assets = assets[0]; // 15ms full

          for (var child of assets.nodes) {
            if (child.nodes.length == 1 && child.nodes[0].image != '') {
              // if there is just 1 grand-child and has an image defined
              resp[child.text.toLowerCase()] = {
                i18n: false,
                original: child.nodes[0].image,
                css: '~assets' + sep + path.basename(child.nodes[0].image),
                js: '~' + sep + 'assets' + sep + path.basename(child.nodes[0].image)
              };
            } else if (child.nodes.length > 1) {
              // if child has more than 1 child (grandchild), we'll assume its an image with i18n alternatives
              var key = child.text.toLowerCase();
              resp[key] = {
                i18n: true,
                i18n_keys: []
              };

              for (var i18n_node of child.nodes) {
                // expand node attributes
                var attrs = _objectSpread2({}, i18n_node.attributes);
                /*i18n_node.attributes.map(function(x) {
                	attrs = {...attrs,...x};
                });*/


                if (attrs.idioma && i18n_node.image != '') {
                  var lang = attrs.idioma.toLowerCase();
                  resp[key].i18n_keys.push(lang);
                  resp[key][lang] = {
                    original: i18n_node.image,
                    css: '~assets' + sep + path.basename(i18n_node.image),
                    js: '~' + sep + 'assets' + sep + path.basename(i18n_node.image)
                  };
                }
              } // transform i18n_keys to list


              resp[key].i18n_keys = resp[key].i18n_keys.join(',');
            } else if (child.link != '') {
              resp[child.text.toLowerCase()] = {
                original: child.link,
                css: '~assets' + sep + path.basename(child.link),
                js: '~' + sep + 'assets' + sep + path.basename(child.link)
              };
            } //console.log('child of asset '+assets.text,child);

          } // 12ms full

          /*let children = await assets.getNodes();
          for (let child of children) {
          	console.log('child of asset '+assets.text,children);
          }*/

        }

        _this25.debug_timeEnd({
          id: '_readAssets'
        });

        return resp;
      })();
    }
    /* 
     * Grabs central node configuration information
     */


    _readCentralConfig() {
      var _this26 = this;

      return _asyncToGenerator(function* () {
        _this26.debug('_readCentralConfig');

        var central = yield _this26.dsl_parser.getNodes({
          level: 1,
          recurse: false
        }); //this.debug('central search',central);
        // set defaults

        var resp = {
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
          nuxt: 'latest',
          idiomas: 'es',
          ':cache': _this26.x_config.cache,
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
        }; // overwrite default resp with info from central node
        //resp = {...resp, ...central[0].attributes };
        //bit slower but transforms string booleans (19-4-21)

        var values = {};

        for (var xz in central[0].attributes) {
          var x = central[0].attributes[xz];

          if (x == 'true') {
            x = true;
          } else if (x == 'false') {
            x = false;
          }

          values = _objectSpread2(_objectSpread2({}, values), {
            [xz]: x
          });
        }

        resp = _objectSpread2(_objectSpread2({}, resp), values);
        /*central[0].attributes.map(function(x) {
        	resp = {...resp,...x};
        });*/

        if (resp.dominio) {
          resp.service_name = resp.dominio.replace(/\./g, '').toLowerCase();
        } else {
          resp.service_name = resp.apptitle;
        }

        if (!resp[':cache']) _this26.x_config.cache = false; // disables cache when processing nodes (@todo)
        // return

        return resp;
      })();
    }
    /*
     * Grabs the configuration from node named 'config'
     */


    _readConfig() {
      var _this27 = this;

      return _asyncToGenerator(function* () {
        _this27.debug('_readConfig');

        var resp = {
          id: '',
          meta: [],
          seo: {},
          secrets: {}
        },
            config_node = {};
        var search = yield _this27.dsl_parser.getNodes({
          text: 'config',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //this.debug({ message:'search says',data:search, prefix:'_readConfig,dim' });
        //

        if (search.length > 0) {
          config_node = search[0]; // define default font_face

          resp.default_face = config_node.font.face;
          resp.default_size = config_node.font.size; // apply children nodes as keys/value for resp

          for (var key of config_node.nodes) {
            if (key.text.toLowerCase() == 'meta') {
              for (var meta_child of key.nodes) {
                // apply grand_childs as meta tags
                if (meta_child.text.toLowerCase() == 'keywords') {
                  resp.seo['keywords'] = meta_child.nodes.map(x => x.text);
                  resp.meta.push({
                    hid: yield _this27.hash(meta_child.nodes[0].text),
                    name: 'keywords',
                    content: resp.seo['keywords'].join(',')
                  });
                } else if (meta_child.text.toLowerCase() == 'language') {
                  resp.seo['language'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    hid: yield _this27.hash(meta_child.nodes[0].text),
                    lang: meta_child.nodes[0].text
                  });
                } else if (meta_child.text.toLowerCase() == 'charset') {
                  resp.seo['charset'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    charset: meta_child.nodes[0].text
                  });
                } else {
                  resp.seo['charset'] = meta_child.nodes[0].text;

                  if (meta_child.text.indexOf(':') != -1) {
                    resp.meta.push({
                      property: meta_child.text,
                      vmid: meta_child.text,
                      content: meta_child.nodes[0].text
                    });
                  } else {
                    resp.meta.push({
                      hid: yield _this27.hash(meta_child.nodes[0].text),
                      name: meta_child.text,
                      content: meta_child.nodes[0].text
                    });
                  }
                } //

              }
            } else {
              // apply keys as config keys (standard config node by content types)
              if (Object.keys(key.attributes).length > 0) {
                // prepare config key
                var config_key = key.text.toLowerCase().replace(/ /g, ''); //alt1 let values = {...key.attributes }; 
                //alt2, bit slower but considers booleans as string

                var values = {};

                for (var xz in key.attributes) {
                  var x = key.attributes[xz];

                  if (x == 'true') {
                    x = true;
                  } else if (x == 'false') {
                    x = false;
                  }

                  values = _objectSpread2(_objectSpread2({}, values), {
                    [xz]: x
                  });
                }

                resp[config_key] = values; // mark secret status true if contains 'password' icon

                if (key.icons.includes('password')) resp[config_key][':secret'] = true; // add link attribute if defined

                if (key.link != '') resp[config_key][':link'] = key.link;
              } else if (key.nodes.length > 0) {
                resp[key.text] = key.nodes[0].text;
              } else if (key.link != '') {
                resp[key.text] = key.link;
              } //

            }
          }
        } // assign dsl file folder name+filename if node.name is not given


        if (!resp.name) {
          var path = require('path');

          var dsl_folder = path.dirname(path.resolve(_this27.x_flags.dsl));
          var parent_folder = path.resolve(dsl_folder, '../');
          var folder = dsl_folder.replace(parent_folder, '');
          resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(_this27.x_flags.dsl, '.dsl'); //console.log('folder:',{folder,name:resp.name});
          //this.x_flags.dsl
        } // create id if not given


        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
      })();
    }

    getParentNodes() {
      var _arguments2 = arguments,
          _this28 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : _this28.throwIfMissing('id');
        var exec = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : false;
        var parents = yield _this28.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this28.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var command = yield _this28.findValidCommand({
            node,
            object: exec
          });
          if (command) resp.push(command);
          yield setImmediatePromise(); //@improved
        }

        return resp;
      })();
    } //gets the asset code for a given string like: assets:assetname


    getAsset() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfMissing('text');
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'js';
      //this.x_state.assets
      var resp = text.replaceAll('assets:', ''),
          type_o = type.replaceAll('jsfunc', 'js').toLowerCase();

      if (text.contains('assets:')) {
        if (resp in this.x_state.assets) {
          if (this.x_state.central_config.idiomas.indexOf(',') != -1 && this.x_state.assets[resp].i18n == true) {
            var first_key = this.x_state.assets[resp].i18n_keys.split(',')[0];
            resp = this.x_state.assets[resp][first_key][type_o];

            if (type.toLowerCase() == 'js') {
              resp = resp.replaceAll("/".concat(first_key, "/"), "/' + $i18n.locale + '/");
              resp = "require('".concat(resp, "')");
            } else if (type.toLowerCase() == 'jsfunc') {
              resp = resp.replaceAll("/".concat(first_key, "/"), "/' + this.$i18n.locale + '/");
              resp = "require('".concat(resp, "')");
            }
          } else if (resp in this.x_state.assets && type_o in this.x_state.assets[resp]) {
            resp = this.x_state.assets[resp][type_o];

            if (type_o == 'js') {
              resp = "require('".concat(resp, "')");
            }
          } else ;
        }
      }

      return resp;
    } //vue attributes tag version


    struct2params() {
      var struct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfMissing('id');

      var resp = [],
          tmp = _objectSpread2({}, struct); // pre-process


      if ('aos' in tmp) {
        var aos_p = struct['aos'].split(',');

        if (aos_p.length == 3) {
          tmp['data-aos'] = aos_p[0];
          tmp['data-aos-duration'] = aos_p[1];
          tmp['data-aos-delay'] = aos_p[2];
        } else {
          tmp['data-aos'] = aos_p[0];
          tmp['data-aos-duration'] = aos_p[1];
        }

        delete tmp['aos'];
      } // process


      for (var [key, value] of Object.entries(tmp)) {
        if (value == null) {
          //needed cause cheerio assigns empty values to props, and vue props don't have values
          //little hack that works together with writeFile method
          resp.push("".concat(key, "=\"xpropx\""));
        } else if (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined') {
          resp.push("".concat(key, "=\"").concat(value, "\""));
        } else if (typeof value === 'object') {
          //serialize value
          resp.push("".concat(key, "=\"").concat(this.jsDump(value), "\""));
        }
      }

      return resp.join(' ');
    } //serializes the given obj escaping quotes from values containing js code


    jsDump(obj) {
      var resp = '';

      var isNumeric = function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      };

      var escape = function escape(obi) {
        var nuevo = '',
            ob = obi; //special escapes first

        if (typeof ob === 'string') ob = ob.replaceAll('{now}', 'new Date()'); //

        if (typeof ob === 'number') {
          nuevo += ob;
        } else if (typeof ob === 'boolean') {
          nuevo += ob;
        } else if (typeof ob === 'string' && ob.substr(0, 2) == '**' && ob.substr(ob.length - 2) == '**') {
          nuevo += ob.replaceAll('**', ''); //escape single ** vars 21-abr-21
        } else if (typeof ob === 'string' && (ob.charAt(0) == '!' || ob.indexOf('this.') != -1 || ob.indexOf('new ') != -1 || ob.indexOf("'") != -1 || ob.indexOf('`') != -1 || ob.charAt(0) != '0' && isNumeric(ob) || ob == 'true' || ob == 'false')) {
          nuevo += ob;
        } else if (typeof ob === 'string') {
          nuevo += "'".concat(ob, "'");
        } else {
          nuevo += ob;
        }

        return nuevo;
      };

      if (Array.isArray(obj)) {
        var tmp = [];

        for (var item in obj) {
          tmp.push(this.jsDump(obj[item]));
        }

        resp = "[".concat(tmp.join(','), "]");
      } else if (typeof obj === 'object') {
        var _tmp = [];

        for (var llave in obj) {
          var nuevo = "".concat(llave, ": ");
          var valor = obj[llave];

          if (typeof valor === 'object' || Array.isArray(valor)) {
            nuevo += this.jsDump(valor);
          } else {
            nuevo += escape(valor);
          }

          _tmp.push(nuevo);
        }

        resp = "{\n".concat(_tmp.join(','), "\n}");
      } else if (typeof obj === 'string') {
        resp = escape(obj);
      } else {
        resp = obj;
      }

      return resp;
    } // hash helper method


    hash(thing) {
      var _this29 = this;

      return _asyncToGenerator(function* () {
        var resp = yield _this29.dsl_parser.hash(thing);
        /*const {sha1} = require('crypto-hash');
        let resp = await sha1(thing,{ outputFormat:'hex' });*/

        return resp;
      })();
    }
    /*
    hash(thing) {
        // returns a hash of the given object, using google highwayhash (fastest)
        //this.debug_time({ id:`hash ${thing}` });
        const highwayhash = require('highwayhash');
        let input;
        if (typeof thing === 'string') {
            input = Buffer.from(thing);
        } else if (typeof thing === 'object') {
            // serialize object into buffer first
            input = Buffer.from(JSON.stringify(thing));
        }
        let resp = highwayhash.asHexString(this.x_crypto_key, input);
        //this.debug_timeEnd({ id:`hash ${thing}` });;
        return resp;
    }*/
    // atLeastNode


    atLeastNode(r) {
      var n = process.versions.node.split('.').map(x => parseInt(x, 10));
      r = r.split('.').map(x => parseInt(x, 10));
      return n[0] > r[0] || n[0] === r[0] && (n[1] > r[1] || n[1] === r[1] && n[2] >= r[2]);
    }

    setImmediatePromise() {
      //for preventing freezing node thread within loops (fors)
      return new Promise(resolve => {
        setImmediate(() => resolve());
      });
    }

  }

  return vue_dsl;

})));

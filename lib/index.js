(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vue_dsl = factory());
}(this, (function () { 'use strict';

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
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

  function internal_commands (_x) {
    return _ref.apply(this, arguments);
  }

  function _ref() {
    _ref = _asyncToGenerator(function* (context) {
      var state = context.x_state;
      var null_template = {
        hint: 'Allowed node type that must be ommited',
        func: function () {
          var _func = _asyncToGenerator(function* (node) {
            return context.reply_template({
              hasChildren: false
            });
          });

          function func(_x2) {
            return _func.apply(this, arguments);
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

      return {
        'cancel': _objectSpread2(_objectSpread2({}, null_template), {
          x_icons: 'button_cancel'
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
        'def_server': {
          x_icons: 'desktop_new',
          x_level: '2',
          x_text_contains: 'server|servidor|api',
          hint: 'Representa a un backend integrado con funciones de express.',
          func: function () {
            var _func2 = _asyncToGenerator(function* (node) {
              var resp = context.reply_template();
              state.npm = _objectSpread2(_objectSpread2({}, state.npm), {
                'body_parser': '*',
                'cookie-parser': '*'
              });
              state.central_config.static = false;
              return resp;
            });

            function func(_x3) {
              return _func2.apply(this, arguments);
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
            var _func3 = _asyncToGenerator(function* (node) {
              var resp = context.reply_template();

              if (node.level == 2) {
                state.current_folder = node.text;
              } else if (node.level == 3 && (yield context.isExactParentID(node.id, 'def_path'))) {
                var parent_node = yield context.dsl_parser.getParentNode({
                  id: node.id
                });
                state.current_folder = "".concat(parent_node.text, "/").concat(node.id);
              } else {
                resp.valid = false;
              }

              return resp;
            });

            function func(_x4) {
              return _func3.apply(this, arguments);
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
            var _func4 = _asyncToGenerator(function* (node) {
              return context.reply_template({
                otro: 'Pablo'
              });
            });

            function func(_x5) {
              return _func4.apply(this, arguments);
            }

            return func;
          }()
        }
      };
    });
    return _ref.apply(this, arguments);
  }

  var concepto = require('concepto');
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
        _this.x_console.outT({
          message: "hello from vue",
          color: "yellow"
        }); // define and assign commands


        yield _this.addCommands(internal_commands); //this.debug('x_commands',this.x_commands);

        _this.x_crypto_key = require('crypto').randomBytes(32); // for hash helper method
        // init vue
        // set x_state defaults

        _this.x_state = {
          plugins: {}
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
            'store': 'client/store/',
            'middleware': 'client/middleware/',
            'server': 'client/server/',
            'assets': 'client/assets/',
            'css': 'client/assets/css/',
            'store': 'client/store/',
            'lang': 'client/lang/'
          });
        }

        _this.debug('app dirs', _this.x_state.dirs); // read modelos node (virtual DB)


        _this.x_state.models = yield _this._readModelos(); //alias: database tables
        //this.debug('models',this.x_state.models);
        //

        _this.debug('plugins info', _this.x_state.plugins);
      })();
    } //Called after parsing nodes


    onAfterWritten(processedNodes) {
      return _asyncToGenerator(function* () {
        return processedNodes;
      })();
    } //Called for defining the title of class/page by testing node.


    onDefineTitle(node) {
      return _asyncToGenerator(function* () {
        var resp = node.text,
            i;

        for (i in node.attributes) {
          if (['title', 'titulo'].includes(node.attributes[i])) {
            resp = node.attributes[i];
            break;
          }
        }

        return resp;
      })();
    } //Called for naming filename of class/page by testing node.


    onDefineFilename(node) {
      return _asyncToGenerator(function* () {
        return node.text;
      })();
    } //Called for naming the class/page by testing node.


    onDefineNodeName(node) {
      return _asyncToGenerator(function* () {
        return node.text.replace(' ', '_');
      })();
    } //Defines template for code given the processedNodes of writer()


    onCompleteCodeTemplate(processedNodes) {
      return _asyncToGenerator(function* () {
        return processedNodes;
      })();
    } //Defines preparation steps before processing nodes.


    onPrepare() {
      return _asyncToGenerator(function* () {})();
    } //Executed when compiler founds an error processing nodes.


    onErrors(errors) {
      return _asyncToGenerator(function* () {})();
    } //Transforms the processed nodes into files.


    onCreateFiles(processedNodes) {
      return _asyncToGenerator(function* () {})();
    } //overwrites default reply structure and value for command's functions

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


    _readModelos() {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        // @IDEA this method could return the insert/update/delete/select 'function code generators'
        _this2.debug('_readModelos');

        _this2.debug_time({
          id: 'readModelos'
        });

        var modelos = yield _this2.dsl_parser.getNodes({
          text: 'modelos',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true	

        var tmp = {
          appname: _this2.x_state.config_node.name
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
          modelos[0].attributes.map(x => {
            resp.attributes = _objectSpread2(_objectSpread2({}, resp.attributes), x);
          }); //modelos attributes

          resp.doc = modelos[0].text_note;
          resp.length = modelos[0].nodes.length;

          var _loop = function _loop(table) {
            var fields = {};
            table.attributes.map(x => {
              fields = _objectSpread2(_objectSpread2({}, fields), x);
            }); //table attributes

            resp.tables[table.text] = {
              fields: {}
            }; //create table

            tmp.sql_fields = [];

            for (var field in fields) {
              resp.tables[table.text].fields[field] = fields_map[fields[field]]; //assign field with mapped value

              tmp.sql_fields.push(field + ' ' + fields_map[fields[field]]);
            }

            resp.tables[table.text].sql = "CREATE TABLE ".concat(table.text, "(").concat(tmp.sql_fields.join(','), ")");
          };

          for (var table of modelos[0].nodes) {
            _loop(table);
          }
        }

        _this2.debug_timeEnd({
          id: 'readModelos'
        }); // install alaSQL plugin and define tables


        if (resp.length > 0) {
          // get tables sql create
          var ala_create = [];

          for (var _table in resp.tables) {
            ala_create.push("alasqlJs('".concat(resp.tables[_table].sql, "');"));
          } // set custom install code


          var ala_custom = "const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t".concat(ala_create.join('\n'), "\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}"); // set plugin info in state

          _this2.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
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
      var _this3 = this;

      return _asyncToGenerator(function* () {
        var resp = {},
            path = require('path');

        _this3.debug('_readAssets');

        _this3.debug_time({
          id: '_readAssets'
        });

        var assets = yield _this3.dsl_parser.getNodes({
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

              var _loop2 = function _loop2(i18n_node) {
                // expand node attributes
                var attrs = {};
                i18n_node.attributes.map(function (x) {
                  attrs = _objectSpread2(_objectSpread2({}, attrs), x);
                });

                if (attrs.idioma && i18n_node.image != '') {
                  var lang = attrs.idioma.toLowerCase();
                  resp[key].i18n_keys.push(lang);
                  resp[key][lang] = {
                    original: i18n_node.image,
                    css: '~assets' + sep + path.basename(i18n_node.image),
                    css: '~' + sep + 'assets' + sep + path.basename(i18n_node.image)
                  };
                }
              };

              for (var i18n_node of child.nodes) {
                _loop2(i18n_node);
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

        _this3.debug_timeEnd({
          id: '_readAssets'
        });

        return resp;
      })();
    }
    /* 
    * Grabs central node configuration information
    */


    _readCentralConfig() {
      var _this4 = this;

      return _asyncToGenerator(function* () {
        _this4.debug('_readCentralConfig');

        var central = yield _this4.dsl_parser.getNodes({
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
          idiomas: 'es',
          ':cache': _this4.x_config.cache,
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

        central[0].attributes.map(function (x) {
          resp = _objectSpread2(_objectSpread2({}, resp), x);
        });

        if (resp.dominio) {
          resp.service_name = resp.dominio.replace(/\./g, '').toLowerCase();
        } else {
          resp.service_name = resp.apptitle;
        }

        if (!resp[':cache']) _this4.x_config.cache = false; // disables cache when processing nodes (@todo)
        // return

        return resp;
      })();
    }
    /*
    * Grabs the configuration from node named 'config'
    */


    _readConfig() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        _this5.debug('_readConfig');

        var resp = {
          id: '',
          meta: [],
          seo: {}
        },
            config_node = {};
        var search = yield _this5.dsl_parser.getNodes({
          text: 'config',
          level: '2',
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
                    hid: _this5.hash(meta_child.nodes[0].text),
                    name: 'keywords',
                    content: resp.seo['keywords'].join(',')
                  });
                } else if (meta_child.text.toLowerCase() == 'language') {
                  resp.seo['language'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    hid: _this5.hash(meta_child.nodes[0].text),
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
                      hid: _this5.hash(meta_child.nodes[0].text),
                      name: meta_child.text,
                      content: meta_child.nodes[0].text
                    });
                  }
                } //

              }
            } else {
              // apply keys as config keys (standard config node by content types)
              if (key.attributes.length > 0) {
                (function () {
                  // @TODO: test
                  var values = {};
                  key.attributes.map(function (x) {
                    values = _objectSpread2(_objectSpread2({}, values), x);
                  });
                  resp[key.text.toLowerCase().replace(/ /g, '')] = values;
                })();
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

          var dsl_folder = path.dirname(path.resolve(_this5.x_flags.dsl));
          var parent_folder = path.resolve(dsl_folder, '../');
          var folder = dsl_folder.replace(parent_folder, '');
          resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(_this5.x_flags.dsl, '.dsl'); //console.log('folder:',{folder,name:resp.name});
          //this.x_flags.dsl
        } // create id if not given


        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
      })();
    } // hash helper method


    hash(thing) {
      // returns a hash of the given object, using google highwayhash (fastest)
      //this.debug_time({ id:`hash ${thing}` });
      var highwayhash = require('highwayhash');

      var input;

      if (typeof thing === 'string') {
        input = Buffer.from(thing);
      } else if (typeof thing === 'object') {
        // serialize object into buffer first
        input = Buffer.from(JSON.stringify(thing));
      }

      var resp = highwayhash.asHexString(this.x_crypto_key, input); //this.debug_timeEnd({ id:`hash ${thing}` });;

      return resp;
    }

  } // private methods

  return vue_dsl;

})));

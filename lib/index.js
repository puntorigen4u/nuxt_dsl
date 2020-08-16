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

  /**
  * Concepto DSL Base Class: A base class (to be extended) for defining new languages for Concepto to be compiled to.
  * @name 	concepto
  * @module 	concepto
  **/

  /**
   * A node object representation of a DSL node.
   * @typedef {Object} NodeDSL
   * @property {number} id - Node unique ID.
   * @property {number} level - Indicates the depth level from the center of the dsl map.
   * @property {string} text - Indicates the text defined in the node itself.
   * @property {string} text_rich - Indicates the html defined in the node itself.
   * @property {string} text_note - Indicates the text/html defined in the notes view of the node (if any).
   * @property {string} image - Image link defined as an image within the node.
   * @property {Object} cloud - Cloud information of the node.
   * @property {string} cloud.bgcolor - Background color of cloud.
   * @property {boolean} cloud.used - True if cloud is used, false otherwise. 
   * @property {Arrow[]} arrows - Visual connections of this node with other nodes {@link #module_concepto..Arrow}.
   * @property {NodeDSL[]} nodes - Children nodes of current node.
   * @property {Object} font - Define font, size and styles of node texts.
   * @property {Object} font.face - Font face type used on node.
   * @property {Object} font.size - Font size used on node.
   * @property {Object} font.bold - True if node text is in bold.
   * @property {Object} font.italic - True if node text is in italics.
   * @property {string} style - Style applied to the node.
   * @property {string} color - Text color of node.
   * @property {string} bgcolor - Background color of node.
   * @property {string} link - Link defined on node.
   * @property {string} position - Position in relation of central node (left,right).
   * @property {Object[]} attributes - Array of objects with each attribute (key is attribute name, value is attribute value).
   * @property {string[]} icons - Array with icon names used in the node.
   * @property {date} date_modified - Date of node when it was last modified.
   * @property {date} date_created - Date of node when it was created.
   */

  /**
   * Arrow object definition, for connections to other nodes within a DSL.
   * @typedef {Object} Arrow
   * @property {string} target - Target node ID of connection.
   * @property {string} color - Color of visual connection.
   * @property {string} style - Graphical representation type of link (source-to-target, target-to-source, both-ways). 
  */
  class concepto {
    constructor(file) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (arguments.length != 2 || typeof arguments[0] === 'object') throw new Error('fatal error! missing file parameter for parser!');

      var console_ = require('open_console');

      var def_config = {
        class: 'concepto',
        console: true,
        debug: false,
        cache: true,
        dsl_git: true,
        prefix: ''
      };
      this.x_config = _objectSpread2(_objectSpread2({}, def_config), config);
      this.x_console = new console_({
        silent: !this.x_config.console
      });
      this.x_console.setPrefix({
        prefix: this.x_config.class,
        color: 'yellow'
      });
      this.x_flags = {
        init_ok: false,
        dsl: file,
        watchdog: {
          start: new Date(),
          end: new Date()
        }
      };
      this.x_commands = {}; //this.commands();

      this.x_time_stats = {
        times: {},
        tables: {}
      };
      this.x_state = {}; // for dsl parser to share variables within commands and onMethods.
      // grab class methods that start with the 'on' prefix

      /* @TODO check if this is useful or needed 1-Aug-2020
      this.x_on_methods={};
      let my_methods=getInstanceMethodNames(this);
      for (let i in my_methods) {
      	let name = my_methods[i].name;
      	if (name.substring(0,2)=='on') {
      		delete my_methods[i].name;
      		this.x_on_methods[name]=my_methods[i];
      	}
      }
      console.log('x_on_methods says',this.x_on_methods);*/
    }
    /**
    * Initializes/starts the class 
    * @async
    */


    init() {
      var _this = this;

      return _asyncToGenerator(function* () {
        if (!_this.x_flags.init_ok) {
          var dsl_parser = require('dsl_parser'),
              path = require('path'),
              fs = require('fs').promises,
              tmp = {}; // show title


          _this.x_console.title({
            title: "DSL Interpreter ".concat(_this.x_config.class, "\ninit:compiling file:\n").concat(_this.x_flags.dsl),
            color: 'cyan',
            config: {
              align: 'left'
            }
          });

          _this.dsl_parser = new dsl_parser({
            file: _this.x_flags.dsl,
            config: {
              cancelled: false,
              debug: _this.x_config.debug
            }
          });

          try {
            yield _this.dsl_parser.process();
          } catch (d_err) {
            _this.x_console.out({
              message: "error: file ".concat(_this.x_flags.dsl, " does't exist!"),
              data: d_err
            });

            return;
          } // @TODO I believe we should get the subnodes as cheerio references and request as needed on Writer method
          //this.x_dsl_nodes = await this.dsl_parser.getNodes({ level:2, recurse:true });
          // 7-ago-2020 x_dsl_nodes commented out, because its not used anymore (was used for git version).

          /*
          // parse nodes ..
          this.x_console.outT({ message:`parsing nodes with dates ..`, color:'cyan' });
          this.x_dsl_nodes = await this.dsl_parser.getNodes({ level:'2', nodes_raw:true });
          */


          tmp.directory = path.dirname(path.resolve(_this.x_flags.dsl));

          if (_this.x_config.cache) ;

          _this.x_console.outT({
            message: "time passed since start .. ".concat(_this.secsPassed_(), " secs"),
            color: 'cyan'
          }); // @TODO create github compatible DSL


          if (_this.x_config.dsl_git) {
            _this.x_console.outT({
              message: "creating github compatible DSL",
              color: 'green'
            });

            var for_git = yield _this.dsl_parser.createGitVersion(); // save dsl git file

            if (typeof _this.x_config.dsl_git === 'boolean') {
              tmp.dsl_git_path = path.join(tmp.directory, 'dsl_git');

              _this.debug("dsl_git dir", tmp.dsl_git_path); // @TODO create dsl_git dir and save file contents as dsl_git/(filename).dsl


              try {
                yield fs.mkdir(tmp.dsl_git_path);
              } catch (cpath_err) {}

              var git_target = path.join(tmp.dsl_git_path, path.basename(_this.x_flags.dsl));
              yield fs.writeFile(git_target, for_git, 'utf-8');

              _this.debug("dsl_git file saved as: ".concat(git_target));
            } else if (typeof _this.x_config.dsl_git === 'function') {
              // if dsl_git is a function, call it with out ready content; maybe to send it though sockets, further processing or saving in a diferent location
              _this.debug("calling dsl_git custom method ".concat(_this.x_config.dsl_git.name));

              yield _this.x_config.dsl_git(for_git);
            } //


            _this.x_console.outT({
              message: "ready github compatible DSL",
              color: 'green'
            });
          } // continue


          _this.x_flags.init_ok = true;
          yield _this.onInit();
        } else {
          // this was already called!
          _this.x_console.out({
            message: "you may only call method init() once!"
          });
        }
      })();
    } // **********************************
    // template methods (to be extended)
    // **********************************

    /**
    * Sets the default reply Object for commands
    * @param 	{Object}	[init]				- Merges given object keys with default defined template
    * @return 	{Object}
    */


    reply_template() {
      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var resp = {
        init: '',
        open: '',
        close: '',
        hasChildren: true,
        type: 'simple',
        valid: true,
        _meta: {
          _set: {},
          cache: true
        }
      };
      return _objectSpread2(_objectSpread2({}, resp), init);
    }
    /**
    * Gets automatically executed after init method finishes.
    * You should place any parser preparation steps here (ex. load commands)
    * @async
    */


    onInit() {
      return _asyncToGenerator(function* () {
        console.log('hello from concepto.js');
      })();
    }
    /**
    * Gets automatically executed after parsing all nodes level 2 of the given dsl (before onCompleteCodeTemplate)
    * @async
    * @param 	{Object}		processedNode		- reply content of process method per processed level2 node (keys of reply_template method)
    * @return 	{Object}
    */


    onAfterProcess(processedNode) {
      return _asyncToGenerator(function* () {
        return processedNode;
      })();
    }
    /**
    * Gets automatically executed within writer method for setting the title for a node level 2.
    * @async
    * @param 	{NodeDSL}		node		- node to process
    * @return 	{String}
    */


    onDefineTitle(node) {
      return _asyncToGenerator(function* () {
        var resp = node.text,
            i;

        for (i in node.attributes) {
          if (node.attributes[i] == 'title' || node.attributes[i] == 'titulo') {
            resp = node.attributes[i];
            break;
          }
        }

        return resp;
      })();
    }
    /**
    * Gets automatically executed for naming filename of class/page by testing node (you could use a slud method here).
    * @async
    * @param 	{NodeDSL}		node		- node to process
    * @return 	{String}
    */


    onDefineFilename(node) {
      return _asyncToGenerator(function* () {
        return node.text;
      })();
    }
    /**
    * Gets automatically called for naming the class/page by testing node (similar to a filename, but for objects reference).
    * @async
    * @param 	{NodeDSL}		node		- node to process
    * @return 	{String}
    */


    onDefineNodeName(node) {
      return _asyncToGenerator(function* () {
        return node.text.replace(' ', '_');
      })();
    }
    /**
    * Defines template for code given the processedNodes of writer(). Useful to prepend/append code before writting code to disk.
    * @async
    * @param 	{Object}		processedNode		- reply content of process method per processed level2 node (keys of reply_template method)
    * @return 	{Object}
    */


    onCompleteCodeTemplate(processedNode) {
      return _asyncToGenerator(function* () {
        return processedNode;
      })();
    }
    /**
    * Defines preparation steps before processing nodes.
    * @async
    */


    onPrepare() {
      return _asyncToGenerator(function* () {})();
    }
    /**
    * Gets automatically called after errors have being found while processing nodes (with the defined commands)
    * @async
    * @param 	{string[]}		errors		- array of errors messages
    */


    onErrors(errors) {
      return _asyncToGenerator(function* () {})();
    }
    /**
    * Gets automatically called after all processing on nodes has being done. You usually create the files here using the received processedNodes array.
    * @async
    * @param 	{Object[]}		processedNodes		- array of nodes already processed (keys of reply_template method) ready to be written to disk
    */


    onCreateFiles(processedNodes) {
      return _asyncToGenerator(function* () {})();
    } // ********************
    // helper methods
    // ********************

    /**
    * A command object specifying requirements for a node to execute its function.
    * @typedef {Object} Command
    * @property {string} [x_icons] 				- List of required icons that the node must define to be a match for this command.
    * @property {string} [x_not_icons] 			- List of icons that the node cannot define to be a match for this command.
    * @property {string} [x_not_empty] 			- List of keys that must not be empty to be a match for this command (can be any key from a NodeDSL object). Example: 'attribute[src],color'
    * @property {string} [x_not_text_contains] 	- List of strings, which cannot be within the node text.
    * @property {string} [x_empty] 				- List of NodeDSL keys that must be empty to be a match for this command.
    * @property {string} [x_text_contains]		- List of strings, that can be contain in node text (if delimiter is comma) or that must be all contained within the node text (if delimiter is |).
    * @property {string} [x_level] 				- Numeric conditions that the level of the node must met (example: '>2,<5' or '2,3,4').
    * @property {string} [x_all_hasparent] 		- List of commands ids (keys), which must be ancestors of the node to be a match for this command.
    * @property {string} [x_or_hasparent] 		- List of commands ids (keys), which at least one must be an ancestor of the node to be a match for this command.
    * @property {string} [x_or_isparent] 		- List of commands ids (keys), which at least one must be the exact parent of the node to be a match for this command.
    * @property {Object} [autocomplete] 			- Describes the node for the autocomplete feature of Concepto DSL software and its related documentation. The feature also takes into account the definition of the command (x_level and x_icons)
    * @property {string} [autocomplete.key_text] 	- String that the node text must have for this command to be suggested.
    * @property {string} [autocomplete.hint] 		- Text description for this command to be shown on Concepto DSL.
    * @property {Function} func - Function to execute with a matching node. Receives one argument and it must be a NodeDSL object.
    */

    /**
    * Add commands for processing nodes with the current class
    * @async
    * @param 	{Function}		command_func		- async function returning an object with commands objects ({@link Command}) where each key is the command id, and its value a Command object.
    */


    addCommands(command_func) {
      var _this2 = this;

      return _asyncToGenerator(function* () {
        if (!_this2.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        if (command_func && typeof command_func === 'function') {
          var t = yield command_func(_this2);

          if (typeof t === 'object') {
            _this2.x_commands = _objectSpread2(_objectSpread2({}, _this2.x_commands), t);
          } else {
            throw new Error('error! addCommands() argument doesn\'t reply with an Object');
          }
        } else if (command_func && typeof command_func === 'object') {
          _this2.x_commands = _objectSpread2(_objectSpread2({}, _this2.x_commands), command_func);
        }
      })();
    }
    /**
    * Finds one or more commands defined that matches the specs of the given node.
    * @async
    * @param 	{NodeDSL}		node			- node for which to find commands that match
    * @param 	{boolean}		[justone=true]	- indicates if you want just the first match (true), or all commands that match the given node (false)
    * @return 	{Command|Command[]}
    */


    findCommand() {
      var _arguments = arguments,
          _this3 = this;

      return _asyncToGenerator(function* () {
        var {
          node = _this3.throwIfMissing('node'),
          justone = true,
          show_debug = true
        } = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
        if (!_this3.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        var resp = _objectSpread2(_objectSpread2({}, _this3.reply_template()), {
          id: 'not_found',
          hint: 'failover command'
        }),
            xtest = [];

        var keys = 'x_icons,x_not_icons,x_not_empty,x_not_text_contains,x_empty,x_text_starts,x_text_contains,x_level,x_or_hasparent,x_all_hasparent,x_or_isparent';
        var command_requires1 = setObjectKeys(keys, '');

        var node_features = _objectSpread2({}, command_requires1);

        var command_defaults = _objectSpread2({}, command_requires1);

        var def_matched = setObjectKeys(keys, true);
        if (show_debug) _this3.debug("findCommand for node ID ".concat(node.id)); // iterate through commands

        for (var key in _this3.x_commands) {
          //let comm_keys = Object.keys(this.x_commands[key]);
          // reset defaults for current command
          var matched = _objectSpread2({}, def_matched); // build template for used keys


          var command_requires = _objectSpread2(_objectSpread2({}, command_defaults), _this3.x_commands[key]);

          delete command_requires.func; // test command features vs node features
          // test 1: icon match
          //if (this.x_config.debug) this.x_console.time({ id:`${key} x_icons` });

          if (command_requires['x_icons'] != '') {
            _this3.debug_time({
              id: "".concat(key, " x_icons")
            });

            for (var qi of command_requires.x_icons.split(',')) {
              matched.x_icons = node.icons.includes(qi) ? true : false;
              if (!matched.x_icons) break; //await setImmediatePromise();
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_icons")
            });
          } //if (this.x_config.debug) this.x_console.timeEnd({ id:`${key} x_icons` });
          // test 2: x_not_icons


          if (command_requires['x_not_icons'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_not_icons")
            }); // special case first


            if (node.icons.length > 0 && command_requires['x_not_icons'] != '' && ['*'].includes(command_requires['x_not_icons'])) {
              matched.x_not_icons = false;
            } else if (command_requires['x_not_icons'] != '') {
              // if node has any icons of the x_not_icons, return false aka intersect values, and if any assign false.
              matched.x_not_icons = _this3.array_intersect(command_requires['x_not_icons'].split(','), node.icons).length > 0 ? false : true;
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_not_icons")
            });
          } // test 3: x_not_empty. example: attributes[event,name] aka key[value1||value2] in node
          // supports multiple requirements using + as delimiter "attributes[event,name]+color"


          if (command_requires['x_not_empty'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_not_empty")
            }); //this.debug(`test x_not_empty: ${command_requires['x_not_empty']}`);
            // transform x_not_empty value => ex. attributes[event,name]+color => attributes[event+name],color in com_reqs


            var com_reqs = command_requires['x_not_empty'].replace(/\+/g, '/').replace(/\,/g, '+').replace(/\//g, ',').split(','); //this.debug(':transformed x_not_empty',com_reqs.join(','));

            for (var test of com_reqs) {
              // start tests
              if (test.indexOf('.') != -1) {
                // struct type definition: ex. cloud.bgcolor (if exists, it must not be empty, or false if doesnt exist)
                var testpath = getVal(node, test);

                if (typeof testpath === 'string' && testpath == '' || typeof testpath === 'boolean' && testpath == false) {
                  matched.x_not_empty = false;
                  break;
                }
              } else if (test.indexOf('[') != -1) {
                (function () {
                  // array type definition: ex. attributes[value1,value2..] (attributes is an array type)
                  // it must exist value1,value2,.. within array attributes of objects to be true
                  var array_key = test.split('[')[0];

                  var keys = _this3.dsl_parser.findVariables({
                    text: test,
                    symbol: '[',
                    symbol_closing: ']'
                  }).split('+');

                  var has_keys = [];

                  if (node[array_key]) {
                    for (var obj of node[array_key]) {
                      Object.keys(obj).filter(function (x) {
                        has_keys.push(x);
                      });
                    }
                  }

                  if (_this3.array_intersect(has_keys, keys).length != keys.length) {
                    matched.x_not_empty = false;
                  }
                })();
              } else {
                // single attribute
                if (test in node && typeof node[test] === 'string' && node[test] == '') {
                  matched.x_not_empty = false;
                } else if (test in node && typeof node[test] === 'boolean' && node[test] == false) {
                  matched.x_not_empty = false;
                } else if (typeof node[test] === 'undefined') {
                  matched.x_not_empty = false;
                }
              }
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_not_empty")
            });
          } // test 4: x_not_text_contains
          // can have multiple values.. ex: margen,arriba


          if (command_requires['x_not_text_contains'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_not_text_contains")
            });

            for (var word of command_requires['x_not_text_contains'].split(',')) {
              if (node.text.indexOf(word) != -1) {
                matched.x_not_text_contains = false;
                break;
              }
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_not_text_contains")
            });
          } // test 5: x_empty (node keys that must be empty (undefined also means not empty))


          if (command_requires['x_empty'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_empty")
            });

            for (var _key of command_requires['x_empty'].split(',')) {
              var _testpath = getVal(node, _key);

              if (typeof _testpath === 'string' && _testpath != '') {
                matched.x_empty = false;
                break;
              } else if (typeof _testpath === 'object' && _testpath.length > 0) {
                matched.x_empty = false;
                break;
              } else if (typeof _testpath === 'undefined') {
                matched.x_empty = false;
                break;
              }
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_empty")
            });
          } // test 6: x_text_contains


          if (allTrue(matched, keys) && command_requires['x_text_contains'] != '') {
            _this3.debug_time({
              id: "".concat(key, " x_text_contains")
            }); // @TODO here we are


            if (command_requires['x_text_contains'].indexOf('|') != -1) {
              // 'or' delimiter
              var n_match = false;

              for (var _key2 of command_requires['x_text_contains'].split('|')) {
                if (node.text.indexOf(_key2) != -1) {
                  n_match = true;
                  break;
                }
              }

              matched.x_text_contains = n_match;
            } else if (command_requires['x_text_contains'].indexOf(',') != -1) {
              // 'and' delimiter
              for (var _key3 of command_requires['x_text_contains'].split(',')) {
                if (node.text.indexOf(_key3) == -1) {
                  matched.x_text_contains = false;
                  break;
                }
              }
            } else if (node.text.toLowerCase().indexOf(command_requires['x_text_contains'].toLowerCase()) == -1) {
              matched.x_text_contains = false;
            }

            _this3.debug_timeEnd({
              id: "".concat(key, " x_text_contains")
            });
          } // test 7: x_level - example: '2,3,4' (any) or '>2,<7' (all)


          if (command_requires['x_level'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_level")
            });

            matched.x_level = numberInCondition(node.level, command_requires['x_level']);

            _this3.debug_timeEnd({
              id: "".concat(key, " x_level")
            });
          } // test 8: x_or_hasparent


          if (command_requires['x_or_hasparent'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_or_hasparent")
            }); //matched.x_or_hasparent=false;


            matched.x_or_hasparent = yield _this3.hasParentID(node.id, command_requires['x_or_hasparent']);

            _this3.debug_timeEnd({
              id: "".concat(key, " x_or_hasparent")
            });
          } // test 9: x_all_hasparent


          if (command_requires['x_all_hasparent'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_all_hasparent")
            }); // @TODO double-check this improved version is working 11-Ago-20


            matched.x_all_hasparent = yield _this3.hasParentID(node.id, command_requires['x_all_hasparent'], true);
            /*for (let key of command_requires['x_all_hasparent'].split(',')) {
            	matched.x_all_hasparent = await this.hasParentID(node.id,key,true);
            	if (!matched.x_all_hasparent) break;
            }*/

            _this3.debug_timeEnd({
              id: "".concat(key, " x_all_hasparent")
            });
          } // test 10: x_or_isparent


          if (command_requires['x_or_isparent'] != '' && allTrue(matched, keys)) {
            _this3.debug_time({
              id: "".concat(key, " x_or_isparent")
            });

            var is_direct = false;

            for (var _key4 of command_requires['x_or_isparent'].split(',')) {
              is_direct = yield _this3.isExactParentID(node.id, _key4);
              if (is_direct == true) break;
            }

            matched.x_or_isparent = is_direct;

            _this3.debug_timeEnd({
              id: "".concat(key, " x_or_isparent")
            });
          } // ***************************
          // if we passed all tests ... 
          // ***************************


          if (allTrue(matched, keys)) {
            // count num of defined requires on matched command (more is more exact match, aka priority)
            var count = Object.entries(command_requires).reduce((n, x) => n + (x[1] != ''), 0); // assign resp

            resp = _objectSpread2(_objectSpread2(_objectSpread2({}, {
              x_priority: -1
            }), _this3.x_commands[key]), {
              x_id: key,
              priority: count
            });

            if (!justone) {
              xtest.push(resp);
            } else {
              break;
            }
          }
          /*if (node.id=='ID_923953027') {
          console.log(`${node.text}: ${key} command_requires`,command_requires);
          console.log(`${node.text}: matched`,matched);
          }*/
          //await setImmediatePromise();

        } // sort by priority


        if (show_debug) _this3.debug_time({
          id: "sorting by priority"
        });
        var sorted = xtest.sort(function (a, b) {
          if (a.x_priority != -1 && b.x_priority != -1) {
            // sort by x_priority
            return b.x_priority - a.x_priority;
          } else {
            // sort by priority (number of features)
            return b.priority - a.priority;
          }
        });
        if (show_debug) _this3.debug_timeEnd({
          id: "sorting by priority"
        }); // reply

        if (!justone) {
          /*
          // get just the ids
          let sorted_ids = sorted.map(function(elem,value) {
          	return elem.id;	
          });
          */
          // return the array of commands, sorted by 'priority' key
          resp = sorted;
        } //console.log(`findCommand resp`,resp);


        return resp;
      })();
    }
    /**
    * Finds the valid/best command match for the given node.
    * Also tests the command for its 'valid' attribute, in case the command func specified aditional conditions.
    * If no command is found, returns false.
    *
    * @async
    * @param 	{NodeDSL}		node			- node for which to find the command
    * @param 	{boolean}		[object=false]	- if false returns the command reference, true returns the command execution answer
    * @return 	{Command|boolean}
    */


    findValidCommand() {
      var _arguments2 = arguments,
          _this4 = this;

      return _asyncToGenerator(function* () {
        var {
          node = _this4.throwIfMissing('node'),
          object = false,
          x_command_shared_state = {},
          show_debug = true
        } = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
        if (!_this4.x_flags.init_ok) throw new Error('error! the first called method must be init()!');
        if (show_debug) _this4.debug({
          message: "findValidCommand called for node ".concat(node.id, ", level:").concat(node.level, ", text:").concat(node.text),
          color: 'yellow'
        });
        var commands_ = yield _this4.findCommand({
          node,
          justone: false,
          show_debug: show_debug
        }),
            reply = {}; // @TODO debug and test

        if (commands_.length == 0) {
          _this4.debug({
            message: 'findValidCommand: no command found.',
            color: 'red'
          });
        } else if (commands_.length == 1) {
          reply = _objectSpread2({}, commands_[0]); // try executing the node on the found commands_

          try {
            var test = yield _this4.x_commands[reply.x_id].func(node, x_command_shared_state);
            reply.exec = test; // @TODO test if _f4e is used; because its ugly

            reply._f4e = commands_[0].x_id;
            if (show_debug) _this4.debug({
              message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
              color: 'green'
            });
          } catch (test_err) {
            if (show_debug) _this4.debug({
              message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... ERROR! (nodeid:").concat(node.id, ")"),
              color: 'red'
            }); // @TODO emit('internal_error','findValidCommand')

            reply.error = true;
            reply.valid = false;
            reply.catch = test_err; //throw new Error(test_err); // @TODO we should throw an error, so our parents catch it (9-AGO-20)
          }
        } else {
          // more than one command found
          if (show_debug) _this4.debug({
            message: "findValidCommand: ".concat(commands_.length, " commands found: (nodeid:").concat(node.id, ")"),
            color: 'green'
          }); // test each command

          for (var qm_index in commands_) {
            var qm = commands_[qm_index];

            try {
              var _test = yield _this4.x_commands[qm.x_id].func(node, x_command_shared_state);

              if (_test.valid) {
                if (show_debug) _this4.debug({
                  message: "findValidCommand: ".concat(parseInt(qm_index) + 1, "/").concat(commands_.length, " testing command ").concat(qm.x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
                  color: 'green'
                });
                if (show_debug) _this4.debug({
                  message: '---------------------',
                  time: false
                });

                if (object) {
                  reply = _test;
                } else {
                  // @TODO test if _f4e is used; because its ugly
                  reply = qm;
                  reply.exec = _test;
                  reply._f4e = qm.x_id;
                }

                break;
              }
            } catch (test_err1) {
              if (show_debug) _this4.debug({
                message: "findValidCommand: error executing command ".concat(qm, " (nodeid:").concat(node.id, ")"),
                data: test_err1,
                color: 'red'
              });
              reply.error = true;
              reply.valid = false;
              reply.catch = test_err1; // @TODO we should throw an error, so our parents catch it (9-AGO-20) and break the loop
            }
          }
        }

        if (Object.keys(reply).length == 0) reply = false;
        return reply;
      })();
    } // ****************************
    // ADVANCED PROCESSING METHODS
    // ****************************

    /**
    * This method traverses the dsl parsed tree, finds/execute x_commands and generated code as files.
    * @return 	{Object}
    */


    process() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        if (!_this5.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        _this5.debug_time({
          id: 'process/writer'
        });

        var resp = {
          nodes: []
        }; // read nodes

        _this5.x_console.outT({
          prefix: 'process,yellow',
          message: "processing nodes ..",
          color: 'cyan'
        });

        var x_dsl_nodes = yield _this5.dsl_parser.getNodes({
          level: 2,
          nodes_raw: true
        });

        _this5.debug('calling onPrepare');

        _this5.debug_time({
          id: 'onPrepare'
        });

        yield _this5.onPrepare();

        _this5.debug_timeEnd({
          id: 'onPrepare'
        }); // 


        for (var level2 of x_dsl_nodes) {
          //this.debug('node',node);
          // remove await when in production (use Promise.all after loop then)
          var main = yield _this5.process_main(level2, {}); // append to resp

          resp.nodes.push(main);
        } // @TODO enable when not debugging
        //await Promise.all(resp.nodes);


        _this5.debug_timeEnd({
          id: 'process/writer'
        }); // check if there was some error


        var were_errors = false;
        resp.nodes.map(function (x) {
          if (x.error == true) {
            were_errors = true;
            return false;
          }
        }); // if there was no error

        if (!were_errors) {
          // request creation of files
          yield _this5.onCreateFiles(resp.nodes);

          _this5.x_console.title({
            title: "Interpreter ".concat(_this5.x_config.class.toUpperCase(), " ENDED. Full Compilation took: ").concat(_this5.secsPassed_(), " secs"),
            color: 'green'
          });

          _this5.debug_table('Amount of Time Per Command');
        } else {
          // errors occurred
          _this5.x_console.title({
            title: "Interpreter ".concat(_this5.x_config.class.toUpperCase(), " ENDED with ERRORS.\nPlease check your console history.\nCompilation took: ").concat(_this5.secsPassed_(), " secs"),
            color: 'red'
          }); //this.debug_table('Amount of Time Per Command');

        } // some debug
        //this.debug('after nodes processing, resp says:',resp);
        //this.debug('app state says:',this.x_state);


        return resp;
      })();
    } // process helper methods 
    // improved in my imagination ...


    sub_process(source_resp, nodei, custom_state) {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        var resp = _objectSpread2({}, source_resp);

        if (resp.hasChildren == true && resp.valid == true) {
          var sub_nodes = yield nodei.getNodes();

          var new_state = _objectSpread2({}, custom_state);

          for (var sublevel of sub_nodes) {
            var real = yield _this6.dsl_parser.getNode({
              id: sublevel.id,
              nodes_raw: true,
              recurse: false
            });
            var real2 = yield _this6.findValidCommand({
              node: real,
              object: false,
              x_command_shared_state: new_state
            }); //console.log('sub_process->findValidCommand node:'+real.text,real2);

            if (nodei.state) new_state = _objectSpread2({}, real2.state); // inherint state from last command if defined

            if (real2 && real2.exec && real2.exec.valid == true) {
              //resp.children.push(real2.exec);
              //console.log('real2 dice:',real2);
              resp.init += real2.exec.init;
              resp.code += real2.exec.open;
              if (!resp.x_ids) resp.x_ids = [];
              resp.x_ids.push(real2.x_id);
              resp = yield _this6.sub_process(resp, sublevel, new_state);
              resp.code += real2.exec.close;
            } else if (real2.error == true) {
              _this6.x_console.outT({
                message: "error: Executing func x_command:".concat(real2.x_id, " for node: id:").concat(real.id, ", level ").concat(real.level, ", text: ").concat(real.text, "."),
                data: {
                  id: real.id,
                  level: real.level,
                  text: real.text,
                  data: real2.catch,
                  x_command_state: new_state
                }
              });

              yield _this6.onErrors(["Error executing func for x_command:".concat(real2.x_id, " for node id ").concat(real.id, ", text: ").concat(real.text, " ")]);
              resp.valid = false, resp.hasChildren = false, resp.error = true;
              break;
            }
          }
        }

        return resp;
      })();
    }

    process_main(node, custom_state) {
      var _this7 = this;

      return _asyncToGenerator(function* () {
        var resp = {
          state: custom_state,
          id: node.id,
          name: yield _this7.onDefineNodeName(node),
          file: yield _this7.onDefineFilename(node),
          init: '',
          title: yield _this7.onDefineTitle(node),
          attributes: node.attributes,
          code: '',
          open: '',
          close: '',
          x_ids: [],
          subnodes: node.nodes_raw.length
        };

        _this7.x_console.outT({
          prefix: 'process,yellow',
          message: "processing node ".concat(node.text, " .."),
          color: 'yellow'
        }); //
        //try {
        //console.log('process_main->findValidCommand node:'+node.text);


        var test = yield _this7.findValidCommand({
          node: node,
          object: false,
          x_command_shared_state: custom_state
        }); //this.debug(`test para node: text:${node.text}`,test);

        if (test && test.exec && test.exec.valid == true) {
          resp = _objectSpread2(_objectSpread2({}, resp), test.exec);
          resp.error = false;
          resp.init += resp.init;
          resp.code += resp.open;
          if (!resp.x_ids) resp.x_ids = [];
          resp.x_ids.push(test.x_id);

          if (typeof node.getNodes === 'function') {
            resp = yield _this7.sub_process(resp, node, custom_state);
          }

          resp.code += resp.close;
          resp.x_ids = resp.x_ids.join(',');
        } else if (test.error == true) {
          _this7.x_console.outT({
            message: "error: Executing func x_command:".concat(test.x_id, " for node: id:").concat(node.id, ", level ").concat(node.level, ", text: ").concat(node.text, "."),
            data: {
              id: node.id,
              level: node.level,
              text: node.text,
              catch: test.catch,
              x_command_state: test.state
            }
          });

          yield _this7.onErrors(["Error executing func for x_command:".concat(test.x_id, " for node id ").concat(node.id, ", text: ").concat(node.text, " ")]);
          resp.valid = false, resp.hasChildren = false, resp.error = true;
        } else {
          _this7.x_console.outT({
            message: 'error: FATAL, no method found for node processing.',
            data: {
              id: node.id,
              level: node.level,
              text: node.text
            }
          });

          yield _this7.onErrors(["No method found for given node id ".concat(node.id, ", text: ").concat(node.text, " ")]);
          resp.valid = false, resp.hasChildren = false, resp.error = true;
        } // closing level2 'on' calls


        resp = yield _this7.onAfterProcess(resp);
        resp = yield _this7.onCompleteCodeTemplate(resp); //

        /*} catch(err) {
        	// @TODO currently findValidCommand doesn't throw an error when an error is found.
        	this.x_console.outT({ message:`error: Executing func x_command for node: id:${node.id}, level ${node.level}, text: ${node.text}.`, data:{ id:node.id, level:node.level, text:node.text, error:err }});
        	await this.onErrors([`Error executing func for x_command for node id ${node.id}, text: ${node.text} `]);
        	resp.valid=false, resp.hasChildren=false, resp.error=true;
        }*/
        // return

        return resp;
      })();
    } // **********************
    // public helper methods
    // **********************


    secsPassed_() {
      var tmp = new Date().getTime() - this.x_flags.watchdog.start.getTime();
      return tmp / 1000;
    }

    throwIfMissing(name) {
      throw new Error('Missing ' + name + ' parameter!');
    }
    /**
    * Helper method for obtaining the common values (which can be anything) between two arrays.
    * @param 	{string[]|Object[]|boolean[]}		arr1	- first array
    * @param 	{string[]|Object[]|boolean[]}		arr2	- second array
    * @return 	{string[]|Object[]|boolean[]}
    */


    array_intersect(arr1, arr2) {
      return arr1.filter(x => arr2.includes(x));
    }
    /**
    * Helper method for obtaining the first array items minus the second array items (which can be anything).
    * @param 	{string[]|Object[]|boolean[]}		arr1	- first array from which to substract
    * @param 	{string[]|Object[]|boolean[]}		arr2	- second array with items to substract from arr1
    * @return 	{string[]|Object[]|boolean[]}
    */


    array_substract(arr1, arr2) {
      return arr1.filter(x => !arr2.includes(x));
    }
    /**
    * Helper method for obtaining the unique values (which can be anything) between two arrays.
    * @param 	{string[]|Object[]|boolean[]}		arr1	- first array
    * @param 	{string[]|Object[]|boolean[]}		arr2	- second array
    * @return 	{string[]|Object[]|boolean[]}
    */


    array_difference(arr1, arr2) {
      return arr1.filter(x => !arr2.includes(x)).concat(arr2.filter(x => !arr1.includes(x)));
    }
    /**
    * Helper method for joining the values (which can be anything) between two arrays.
    * @param 	{string[]|Object[]|boolean[]}		arr1	- first array
    * @param 	{string[]|Object[]|boolean[]}		arr2	- second array
    * @return 	{string[]|Object[]|boolean[]}
    */


    array_union(arr1, arr2) {
      return [...arr1, ...arr2];
    } // public helpers

    /**
    * Helper method for defining how to display (or do with them; if you overload it) debug messages.
    * @param 	{string|Object}		message		- message to display. It can also be an Object of open-console params.
    * @param 	{*}					[data]		- data variable to show with message
    */


    debug(message, data) {
      var params = {};

      if (arguments.length == 1 && typeof arguments[0] === 'object') {
        params = arguments[0];
      } else {
        params = {
          message,
          data
        };
      }

      if (this.x_config.debug && params.time) {
        this.x_console.outT(_objectSpread2(_objectSpread2({}, {
          prefix: 'debug,dim',
          color: 'dim'
        }), params));
      } else if (this.x_config.debug) {
        this.x_console.out(_objectSpread2(_objectSpread2({}, {
          prefix: 'debug,dim',
          color: 'dim'
        }), params));
      }
    }
    /*
    * Creates required app folder structure needed for file generation as the given specs and returns object with absolute paths
    * optional output_dir overwrites base target directory (which is location of .dsl file + apptitle subdir)
    * @param 	{Object} 	keys 			- Object with keys for which to return absolute paths. Each key must contain a relative output directory (can be nested) to be created and returned.
    * @param 	{string} 	[output_dir]	- Overwrites the default output base directory (which is the location of the dsl file being proccessed).
    * @return 	{Object}
    */


    _appFolders(keys, output_dir) {
      var _this8 = this;

      return _asyncToGenerator(function* () {
        var fs = require('fs').promises;

        _this8.debug('_appFolders');

        var path = require('path');

        var dsl_folder = path.dirname(path.resolve(_this8.x_flags.dsl));
        if (output_dir) dsl_folder = output_dir;
        var resp = {
          base: dsl_folder,
          src: dsl_folder + path.sep + _this8.x_state.central_config.apptitle + path.sep
        };
        resp.app = path.normalize(resp.src); // depending on central config type

        for (var key in keys) {
          resp[key] = path.join(resp.app, keys[key]); // create directories as needed

          try {
            yield fs.mkdir(resp[key], {
              recursive: true
            });
          } catch (errdir) {}
        } // return


        return resp;
      })();
    }
    /**
    * Helper method for measuring (start) time in ms from this method until debug_timeEnd() method and show it in the console.
    * @param 	{string}		id		- id key (which can also have spaces and/or symbols) with a unique id to identify the stopwatch.
    */


    debug_time() {
      // instead of marking and showing time, we want in vue to build a time table and show it with another method
      if (arguments.length > 0) {
        var keys = _objectSpread2({}, arguments[0]);

        if (typeof keys.id !== 'undefined' && keys.id.indexOf('def_') != -1) {
          //&& keys.id.indexOf('_x')!=-1
          var filter_key = keys.id.split(' ')[0];

          if (typeof this.x_time_stats.times[filter_key] === 'undefined') {
            this.x_time_stats.times[filter_key] = new Date();
            this.x_time_stats.tables[filter_key] = {
              command: filter_key,
              calls: 0,
              average_call: 0,
              total_ms: 0
            };
          }
        } else if (this.x_config.debug == true) {
          this.x_console.time(_objectSpread2({}, arguments[0]));
        }
      }
    }
    /*
    debug_time() {
    	if (this.x_config.debug && arguments.length>0) {
    		this.x_console.time({...arguments[0]});
    	}
    }*/

    /**
    * Helper method for measuring (end) time in ms from the call of debug_time() method.
    * @param 	{string}		id		- id key used in the call for debug_time() method.
    */


    debug_timeEnd() {
      if (arguments.length > 0) {
        var keys = _objectSpread2({}, arguments[0]),
            filter_key = ''; // && keys.id.indexOf('_x')!=-1


        if (typeof keys.id !== 'undefined') filter_key = keys.id.split(' ')[0];

        if (typeof keys.id !== 'undefined' && keys.id.indexOf('def_') != -1 && filter_key in this.x_time_stats.times) {
          //if (!this.x_time_stats.tables[keys.id]) this.x_time_stats.tables[keys.id] = {};
          if (typeof this.x_time_stats.tables[filter_key] !== 'undefined') {
            var timePassed = new Date().getTime() - this.x_time_stats.times[filter_key].getTime();
            this.x_time_stats.tables[filter_key].calls += 1;
            this.x_time_stats.tables[filter_key].total_ms = timePassed;
            this.x_time_stats.tables[filter_key].average_call = Math.round(this.x_time_stats.tables[filter_key].total_ms / this.x_time_stats.tables[filter_key].calls);
          }
        } else if (this.x_config.debug == true) {
          this.x_console.timeEnd(_objectSpread2(_objectSpread2({}, {
            color: 'dim',
            prefix: 'debug,dim'
          }), arguments[0]));
        }
      }
    }
    /*debug_timeEnd() {
    	if (this.x_config.debug && arguments.length>0) {
    		this.x_console.timeEnd({...{ color:'dim',prefix:'debug,dim' },...arguments[0]});
    	}
    }*/

    /**
    * Helper method for showing a table with each command execution time and amount of calls
    * @param 	{string}		title		- Optional custom title for table.
    */


    debug_table(title) {
      // build a table with x_time_stats and show it on the console
      var table = [];
      Object.keys(this.x_time_stats.tables).map(function (key) {
        table.push(this.x_time_stats.tables[key]);
      }.bind(this));
      this.x_console.table({
        title: title ? title : 'Times per Command',
        data: table,
        color: 'cyan'
      });
    }
    /**
    * Helper method to return true if given node id has a brother of given command x_id
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @param 	{string}	x_id	- Command object x_id to test for
    * @return 	{Boolean}
    */


    hasBrotherID() {
      var _arguments3 = arguments,
          _this9 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : _this9.throwIfMissing('id');
        var x_id = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : _this9.throwIfMissing('x_id');
        // @TODO test it after having 'real' commands on some parser 3-ago-20
        var brother_ids = yield _this9.dsl_parser.getBrotherNodesIDs({
          id,
          before: true,
          after: true
        }).split(',');
        var brother_x_ids = [],
            resp = false;

        for (var q of brother_ids) {
          var node = yield _this9.dsl_parser.getNode({
            id: q,
            recurse: false
          });
          var command = yield findValidCommand({
            node: node,
            show_debug: false,
            object: true
          });
          brother_x_ids.push(command.x_id);
          if (brother_x_ids.includes(x_id) == true) return true;
        } //resp = (brother_x_ids.includes(x_id));


        return resp;
      })();
    }
    /**
    * Helper method to return true if given node ID has a brother before it
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Boolean}
    */


    hasBrotherBefore() {
      var _arguments4 = arguments,
          _this10 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : _this10.throwIfMissing('id');
        var brother_ids = yield _this10.dsl_parser.getBrotherNodesIDs({
          id,
          before: true,
          after: false
        }).split(',');
        return brother_ids.includes(id);
      })();
    }
    /**
    * Helper method to return true if given node ID has a brother following it
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Boolean}
    */


    hasBrotherNext() {
      var _arguments5 = arguments,
          _this11 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : _this11.throwIfMissing('id');
        var brother_ids = yield _this11.dsl_parser.getBrotherNodesIDs({
          id,
          before: false,
          after: true
        }).split(',');
        return brother_ids.includes(id);
      })();
    }
    /**
    * Helper method to return true if given Command object x_id is the exact parent for the given NodeDSL object id
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @param 	{string}	x_id	- Command object x_id to test for
    * @return 	{Boolean}
    */


    isExactParentID() {
      var _arguments6 = arguments,
          _this12 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments6.length > 0 && _arguments6[0] !== undefined ? _arguments6[0] : _this12.throwIfMissing('id');
        var x_id = _arguments6.length > 1 && _arguments6[1] !== undefined ? _arguments6[1] : _this12.throwIfMissing('x_id');
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var parent_node = yield _this12.dsl_parser.getParentNode({
          id
        });
        var parent_command = yield _this12.findValidCommand({
          node: parent_node,
          show_debug: false,
          object: true
        });

        if (parent_command && parent_command.x_id == x_id) {
          return true;
        }

        return false;
      })();
    }
    /**
    * Helper method to return true if given Command object x_id is the parent or is an ancestor for the given NodeDSL object id
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @param 	{string}	x_id	- Command object x_id to test for
    * @return 	{Boolean}
    */


    hasParentID() {
      var _arguments7 = arguments,
          _this13 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments7.length > 0 && _arguments7[0] !== undefined ? _arguments7[0] : _this13.throwIfMissing('id');
        var x_id = _arguments7.length > 1 && _arguments7[1] !== undefined ? _arguments7[1] : _this13.throwIfMissing('x_id');
        var onlyTrueIfAll = _arguments7.length > 2 && _arguments7[2] !== undefined ? _arguments7[2] : false;
        // @TODO test it after having 'real' commands on some parser aug-4-20, fixed on aug-15-20
        var x_ids = x_id.split(',');
        var parents = yield _this13.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var tested_parents_x_ids = [];

        for (var parent_id of parents) {
          var node = yield _this13.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var parentCommand = yield _this13.findValidCommand({
            node,
            show_debug: false,
            object: true
          });

          if (onlyTrueIfAll == false && x_ids.includes(parentCommand.x_id)) {
            return true;
          } else if (onlyTrueIfAll == false) ; else if (onlyTrueIfAll == true) {
            // onlyTrueIfAll==true
            tested_parents_x_ids.push(parentCommand.x_id);

            if (_this13.array_intersect(tested_parents_x_ids, x_ids).length == x_ids.length) {
              return true;
            }
          }
        } // test again if we are here


        if (_this13.array_intersect(tested_parents_x_ids, x_ids).length == x_ids.length) {
          return true;
        } else {
          return false;
        } //if (!onlyTrueIfAll) return false;
      })();
    }
    /**
    * Helper method to return all Command object x_ids parents of given NodeDSL id; if array=true, 
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @param 	{Boolean}	array	- If true, returns array of objects with x_id and ids, instead of a list of NodeDSL ids.
    * @return 	{string|Object[]}
    */


    getParentIDs() {
      var _arguments8 = arguments,
          _this14 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments8.length > 0 && _arguments8[0] !== undefined ? _arguments8[0] : _this14.throwIfMissing('id');
        var array = _arguments8.length > 1 && _arguments8[1] !== undefined ? _arguments8[1] : false;
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var parents = yield _this14.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this14.dsl_parser.getNode({
            parent_id,
            recurse: false
          });
          var command = yield _this14.findValidCommand({
            node,
            show_debug: false
          });

          if (command && array) {
            resp.push({
              id: parent_id,
              x_id: command.x_id
            });
          } else {
            resp.push(command.x_id);
          }
        }

        if (array && array == true) return resp;
        return resp.join(',');
      })();
    }
    /**
    * Helper method to return all Command object x_ids parents of given NodeDSL id as an array (its an alias for getParentIDs) 
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Object[]}
    */


    getParentIDs2Array() {
      var _arguments9 = arguments,
          _this15 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments9.length > 0 && _arguments9[0] !== undefined ? _arguments9[0] : _this15.throwIfMissing('id');
        return yield _this15.getParentIDs(id, true);
      })();
    } // 3-aug-20 PSB doesn't seem to be used anywhere)

    /**
    * Helper method to return all NodeDSL ids parents of given NodeDSL id 
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Object[]}
    * @deprecated
    */


    getParentIDs2ArrayWXID() {
      var _arguments10 = arguments,
          _this16 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments10.length > 0 && _arguments10[0] !== undefined ? _arguments10[0] : _this16.throwIfMissing('id');
        // this is only used in ti.cfc: def_textonly (just for back-compatibility in case needed);
        // @deprecated 4-ago-2020
        var parents = yield _this16.getParentIDs(id, true);
        return parents.map(x => {
           x.id;
        }); // just return ids as an array of objects
      })();
    }
    /**
    * Helper method to transform object keys/values into params for customtags usage
    * @param 	{Object}	struct		- Object with keys and values to transform from.
    * @return 	{string}
    */


    struct2params() {
      var struct = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfMissing('id');
      var resp = [];

      for (var [key, value] of Object.entries(struct)) {
        if (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined') {
          resp.push("".concat(key, "='").concat(value, "'"));
        }
      }

      return resp.join(' ');
    }

    cleanIDs4node() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfMissing('node');
      var copy = node;
      delete copy.id;
      return copy;
    }

  } // private helper methods; not to be exported


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

  function allTrue(object, keys) {
    //ex. allTrue(matched,'x_icons,x_not_icons');
    var resp = true;

    for (var key of keys.split(',')) {
      if (object[key] !== true) {
        resp = false;
        break;
      }
    }

    return resp;
  } //returns true if num meets the conditions listed on test (false otherwise)


  function numberInCondition(num, test) {
    var resp = true;

    if (!isNaN(num) && num == parseInt(test)) ; else if (test.indexOf('>') != -1 || test.indexOf('<') != -1) {
      // 'and/all' (>2,<7)
      for (var i of test.split(',')) {
        if (i.substring(0, 1) == '>') {
          if (num <= parseInt(i.replace('>', ''))) {
            resp = false;
            break;
          }
        } else if (i.substring(0, 1) == '<') {
          if (num >= parseInt(i.replace('<', ''))) {
            resp = false;
            break;
          }
        }
      }
    } else {
      // 'or/any' (2,3,5)
      resp = false;

      for (var _i2 of test.split(',')) {
        if (num == _i2) {
          resp = true;
          break;
        }
      }
    }

    return resp;
  }

  function getVal(project, myPath) {
    return myPath.split('.').reduce((res, prop) => res[prop], project);
  } // end: private helper methods

  String.prototype.replaceAll = function (strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
  };

  String.prototype.contains = function (test) {
    if (this.indexOf(test) != -1) {
      return true;
    } else {
      return false;
    }
  };

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
      	x_not_hasparent: '', //@TODO create this meta_attribute in Concepto
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
      	func: async function(node,state) {
      		let resp = me.reply_template({ state });
      		return resp;
      	}
      }
      */

      return {
        //'cancel': {...null_template,...{ x_icons:'button_cancel'} },
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
            var _func2 = _asyncToGenerator(function* (node, commands_state) {
              var resp = context.reply_template();
              context.x_state.npm = _objectSpread2(_objectSpread2({}, context.x_state.npm), {
                'body_parser': '*',
                'cookie-parser': '*'
              });
              context.x_state.central_config.static = false;
              return resp;
            });

            function func(_x4, _x5) {
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
            var _func3 = _asyncToGenerator(function* (node, commands_state) {
              var resp = context.reply_template({
                state: commands_state
              });

              if (node.level == 2) {
                //state.current_folder = node.text;
                resp.state.current_folder = node.text;
              } else if (node.level == 3 && (yield context.isExactParentID(node.id, 'def_path'))) {
                var parent_node = yield context.dsl_parser.getParentNode({
                  id: node.id
                }); //state.current_folder = `${parent_node.text}/${node.id}`;

                resp.state.current_folder = "".concat(parent_node.text, "/").concat(node.id);
              } else {
                resp.valid = false;
              }

              return resp;
            });

            function func(_x6, _x7) {
              return _func3.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_server_func': {
          x_empty: 'icons',
          x_level: '3,4,5',
          x_or_isparent: 'def_server',
          hint: 'Corresponde a la declaracion de una funcion de servidor',
          func: function () {
            var _func4 = _asyncToGenerator(function* (node, commands_state) {
              var resp = context.reply_template({
                state: commands_state
              });
              context.x_state.central_config.static = false; //server func cannot run in a static site

              resp.state.current_func = node.text;

              if (node.level != 2) {
                var parents = yield context.getParentNodes(node.id); // @TODO finish this method when we can test the parents ORDER (line: 321 vue.CFC)
                //console.log('@TODO! def_server_func: needs testings',parents);
              }

              resp.open = '<func_code>';
              resp.close = '</func_code>'; //

              return resp;
            });

            function func(_x8, _x9) {
              return _func4.apply(this, arguments);
            }

            return func;
          }()
        },
        // STORE definitions
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

            function func(_x10, _x11) {
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
            var _func6 = _asyncToGenerator(function* (node, commands_state) {
              var resp = context.reply_template({
                state: commands_state
              });
              var tmp = {
                type: 'normal',
                version: '',
                expire: ''
              }; // create store in app state if not already there

              resp.state.current_store = node.text;
              if (!context.x_state.stores) context.x_state.stores = {};
              if (context.x_state.stores && node.text in context.x_state.stores === false) context.x_state.stores[node.text] = {}; //@TODO evaluate if we should change the format for node.attributes within dsl_parser, instead of doing this each time.
              // parse attributes

              /*let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/

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
                if (resp.state.current_store in context.x_state.stores_types['versions'] === false) context.x_state.stores_types['versions'][resp.state.current_store] = {};
              } // set expire value


              if (tmp.version != '') {
                if (resp.state.current_store in context.x_state.stores_types['expires'] === false) context.x_state.stores_types['expires'][resp.state.current_store] = {};
              } // return


              return resp;
            });

            function func(_x12, _x13) {
              return _func6.apply(this, arguments);
            }

            return func;
          }()
        },
        //def_store_mutation
        //def_store_field
        //def_store_call
        //def_store_modificar
        //def_proxies
        'def_proxies': {
          x_icons: 'desktop_new',
          x_level: 2,
          x_text_contains: 'prox',
          hint: 'Representa una coleccion de proxies de Vue',
          func: function () {
            var _func7 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state,
                hasChildren: true
              });
              return resp;
            });

            function func(_x14, _x15) {
              return _func7.apply(this, arguments);
            }

            return func;
          }()
        },
        //def_proxy_def
        //def_enviarpantalla
        //def_layout_view
        //def_html y otros
        'def_page': {
          x_level: '2',
          x_not_icons: 'button_cancel,desktop_new,list,help',
          x_not_text_contains: 'componente:,layout:',
          hint: 'Archivo vue',
          func: function () {
            var _func8 = _asyncToGenerator(function* (node, state) {
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
                  path: '/' + resp.state.current_page
                };
              } // is this a 'home' page ?


              if (node.icons.includes('gohome')) context.x_state.pages[resp.state.current_page].path = '/'; // attributes overwrite anything
              // parse attributes

              var params = {};
              /*let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/

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
              }.bind(this)); // has comments ?

              if (node.text_note != '') {
                resp.open = "<!-- ".concat(node.text_note.replaceAll('<br/ >', '\n'), " -->\n");
              } // set code


              resp.open += "<template>\n";

              if (context.x_state.pages[resp.state.current_page]['layout'] == '') {
                resp.open += '\t' + context.tagParams('v-app', params, false) + '\n';
                resp.close += '\t</v-app>\n';
              }

              resp.close += "</template>\n"; // return

              return resp;
            });

            function func(_x16, _x17) {
              return _func8.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_margen': {
          x_icons: 'idea',
          x_text_contains: 'margen',
          hint: 'Define un margen alrededor del contenido',
          func: function () {
            var _func9 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // parse attributes

              var params = {};
              /*
              let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/

              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env').replaceAll('$store.', '$store.state.'); // query attributes

                if (key.toLowerCase() == 'props') {
                  for (var i of value.split(',')) {
                    params[i] = 'vue:prop';
                  }
                } else {
                  params[key] = value;
                }
              }); //

              resp.open += context.tagParams('v-container', params, false) + '\n';
              resp.close += '</v-container>\n'; //

              return resp;
            });

            function func(_x18, _x19) {
              return _func9.apply(this, arguments);
            }

            return func;
          }()
        },
        //def_contenedor
        'def_flex': {
          x_icons: 'idea',
          x_text_contains: 'flex',
          x_not_text_contains: ':',
          hint: 'Columna de ancho flexible',
          func: function () {
            var _func10 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id
              };
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->"); // process attributes

              /*let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/

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
                  for (var i of tvalue.split(',')) {
                    params[i] = 'vue:prop';
                  }
                } else if ('padding,margen'.split(',').includes(keytest)) {
                  params['pa-' + tvalue] = 'vue:prop';
                } else if (keytest == 'ancho') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys$1("xs-".concat(numsize, ",sm-").concat(numsize, ",md-").concat(numsize, ",lg-").concat(numsize), 'vue:prop'));
                } else if (keytest == 'offset') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys$1("offset-xs-".concat(numsize, ",offset-sm-").concat(numsize, ",offset-md-").concat(numsize, ",offset-lg-").concat(numsize), 'vue:prop'));
                } else if ('muy chico,movil,small,mobile'.split(',').includes(keytest)) {
                  params["xs".concat(numsize)] = 'vue:prop';
                } else if ('chico,tablet,small,tableta'.split(',').includes(keytest)) {
                  params["sm".concat(numsize)] = 'vue:prop';
                } else if ('medio,medium,average'.split(',').includes(keytest)) {
                  params["md".concat(numsize)] = 'vue:prop';
                } else if ('grande,pc,desktop,escritorio'.split(',').includes(keytest)) {
                  params["lg".concat(numsize)] = 'vue:prop';
                } else if ('xfila:grande,xfila:pc,xfila:desktop,pc,escritorio,xfila:escritorio'.split(',').includes(keytest)) {
                  params["lg".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('xfila:medio,xfila:tablet,tablet,xfila'.split(',').includes(keytest)) {
                  params["md".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('xfila:chico,xfila:movil,xfila:mobile'.split(',').includes(keytest)) {
                  params["sm".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('xfila:muy chico,xfila:movil chico,xfila:small mobile'.split(',').includes(keytest)) {
                  params["xs".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('muy chico:offset,movil:offset,small:offset,mobile:offset'.split(',').includes(keytest)) {
                  params["offset-xs".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('chico:offset,tablet:offset,small:offset,tableta:offset'.split(',').includes(keytest)) {
                  params["offset-sm".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('medio:offset,medium:offset,average:offset'.split(',').includes(keytest)) {
                  params["offset-md".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else if ('grande:offset,pc:offset,desktop:offset,escritorio:offset,grande:left'.split(',').includes(keytest)) {
                  params["offset-lg".concat(Math.round(12 / tvalue))] = 'vue:prop';
                } else {
                  if (keytest.charAt(0) != ':' && value != '' && value != tvalue) {
                    params[':' + key.trim()] = tvalue;
                  } else {
                    params[key.trim()] = tvalue;
                  }
                }
              }); // write tag

              resp.open += context.tagParams('v-flex', params, false) + '\n';
              resp.close = '</v-flex>\n'; // return

              return resp;
            });

            function func(_x20, _x21) {
              return _func10.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_spacer': {
          x_icons: 'idea',
          x_text_contains: 'spacer',
          hint: 'Spacer es un espaciador flexible',
          func: function () {
            var _func11 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-spacer', {}, true) + '\n';
              return resp;
            });

            function func(_x22, _x23) {
              return _func11.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_center': {
          x_icons: 'idea',
          x_text_contains: 'centrar',
          hint: 'Centra nodos hijos',
          func: function () {
            var _func12 = _asyncToGenerator(function* (node, state) {
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

            function func(_x24, _x25) {
              return _func12.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_html': {
          x_icons: 'idea',
          x_text_contains: 'html:',
          hint: 'html:x, donde x es cualquier tag',
          func: function () {
            var _func13 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id
              }; // parse attributes

              /*let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/

              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env').replaceAll('$store.', '$store.state.'); // query attributes

                if (key.toLowerCase() == 'props') {
                  for (var i of value.split(',')) {
                    params[i] = 'vue:prop';
                  }
                } else if (key.charAt(0) != ':' && value != node.attributes[key]) {
                  params[':' + key] = value;
                } else if (key != 'v-model') {
                  if (context.x_state.central_config.idiomas.indexOf(',') != -1) {
                    // value needs i18n keys
                    var def_lang = context.x_state.centrar.idiomas.split(',')[0];

                    if (!context.x_state.strings_i18n[def_lang]) {
                      context.x_state.strings_i18n[def_lang] = {};
                    }

                    var crc32 = 't_' + context.hash(value);
                    context.x_state.strings_i18n[def_lang][crc32] = value;
                    params[':' + key] = "$t('".concat(crc32, "')");
                  } else {
                    params[key] = value;
                  }
                } else {
                  params[key] = value;
                }
              }.bind(this)); //

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var tag = node.text.replace('html:', '');
              resp.open += context.tagParams(tag, params, false) + '\n';
              resp.close += "</".concat(tag, ">\n");
              return resp;
            });

            function func(_x26, _x27) {
              return _func13.apply(this, arguments);
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
            var _func14 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }),
                  params = {
                class: []
              },
                  tmp = {};
              var text = node.text.replaceAll('$variables', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$env.', 'process.env.').replaceAll('$store.', '$store.state.');
              if (text == '') text = '&nbsp;'; // some extra validation

              if ((yield context.hasParentID(node.id, 'def_toolbar')) == true && (yield context.hasParentID(node.id, 'def_slot')) == false) {
                resp.valid = false;
                resp.invalidated_me = 'def_toolbar';
              } else if ((yield context.hasParentID(node.id, 'def_variables')) == true) {
                resp.valid = false;
                resp.invalidated_me = 'def_variables';
              } else if ((yield context.hasParentID(node.id, 'def_page_estilos')) == true) {
                resp.valid = false;
                resp.invalidated_me = 'def_page_estilos';
              } else if ((yield context.hasParentID(node.id, 'def_page_estilos')) == true) {
                resp.valid = false;
                resp.invalidated_me = 'def_datatable_headers';
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
                    config: "{ locale: 'es-es' }"
                  };
                } //node styles


                if (node.font.bold == true) params.class.push('font-weight-bold');
                if (node.font.size >= 10) params.class.push('caption');
                if (node.font.italic == true) params.class.push('font-italic'); // - process attributes

                /*let attr = {};
                node.attributes.map(function(x) {
                	attr = {...attr,...x};
                });*/

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
                    if (key.indexOf(' ') != -1) {
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

                if (params.class.length > 0) params.class = params.class.join(' ');
                if (params.style) params.styles = params.styles.join(';'); //write code

                if (!tmp.omit) {
                  if (context.hasParentID(node.id, 'def_textonly') || tmp.span) {
                    resp.open += context.tagParams('span', params) + text + '</span>\n';
                  } else if (context.hasParentID(node.id, 'def_card_title') && !params.class) {
                    resp.open += text + '\n';
                  } else {
                    resp.open += context.tagParams('div', params) + text + '</div>\n';
                  }
                } //

              } // return


              return resp;
            });

            function func(_x28, _x29) {
              return _func14.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_variables': {
          x_icons: 'xmag',
          x_level: 3,
          x_text_contains: 'variables',
          hint: 'Definicion local de variables observadas',
          func: function () {
            var _func15 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              // set vars

              if (typeof state.current_page !== 'undefined') {
                if (typeof context.x_state.pages[state.current_page] === 'undefined') context.x_state.pages[state.current_page] = {};
                if ('variables' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].variables = {};
                if ('types' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].types = {};
              }

              return resp;
            });

            function func(_x30, _x31) {
              return _func15.apply(this, arguments);
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
            var _func16 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {},
                  tmp = {
                type: 'string',
                field: node.text.trim(),
                level: node.level - 3
              }; //

              if (tmp.field.contains('[') && tmp.field.contains(']') || tmp.field.contains('{') && tmp.field.contains('}')) {
                // this is a script node
                tmp.type = 'string';
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
                }

                if (has_event == false) {
                  tmp.type = 'object';
                }
              } else {
                tmp.type = 'string';
              } // process attributes (and overwrite types if needed)
              // parse attributes

              /*let attr = {};
              node.attributes.map(function(x) {
              	attr = {...attr,...x};
              });*/


              Object.keys(node.attributes).map(function (keym) {
                var keytest = keym.toLowerCase().trim();
                var value = node.attributes[keym]; //console.log(`${tmp.field} attr key:${keytest}, value:${value}`);

                if ('type,tipo,:type,:tipo'.split(',').includes(keytest)) {
                  tmp.type = value.toLowerCase().trim();
                } else if ('valor,value,:valor,:value'.split(',').includes(keytest)) {
                  var t_value = value.replaceAll('$variables', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$env.', 'process.env.').replaceAll('$store.', 'this.$store.state.');
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
              //if ('value' in params===false) {

              if ('string,text,texto,script'.split(',').includes(tmp.type)) {
                if ('value' in params === false) {
                  params.value = '';
                } else {
                  params.value = params.value.toString();
                }
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
              } //}
              // check and prepare global state


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
                if (resp.state.vars_last_level == tmp.level) {
                  // this node is a brother of the last processed one
                  resp.state.vars_path.pop(); // remove last field from var path

                  resp.state.vars_types.pop(); // remove last field type from vars_types
                }

                resp.state.vars_path.push(tmp.field); // push new var to paths
                //console.log(`trying to set: ${resp.state.vars_path.join('.')} on context.x_state.pages['${state.current_page}'].variables as ${tmp.type}`);

                if (resp.state.vars_types[resp.state.vars_types.length - 1] == 'object') {
                  // dad was an object
                  //console.log('dad was an object',resp.state.vars_types[resp.state.vars_types.length-1]);
                  setToValue(context.x_state.pages[state.current_page].variables, params.value, resp.state.vars_path.join('.'));
                } else if (resp.state.vars_types[resp.state.vars_types.length - 1] == 'array') {
                  //console.log('dad was an array',resp.state.vars_types[resp.state.vars_types.length-1]);
                  // dad is an array.. 
                  var copy_dad = [...resp.state.vars_path];
                  copy_dad.pop(); //console.log('my dad path is '+copy_dad.join('.'));

                  var daddy = getVal$1(context.x_state.pages[state.current_page].variables, copy_dad.join('.')); //console.log('daddy says:',daddy);

                  if (tmp.field != params.value) {
                    // push as object (array of objects)
                    var tmpi = {};
                    tmpi[tmp.field] = params.value;
                    daddy.push(tmpi);
                  } else {
                    // push just the value (single value)
                    daddy.push(params.value);
                  } // re-set daddy with new value


                  setToValue(context.x_state.pages[state.current_page].variables, daddy, copy_dad.join('.'));
                }

                resp.state.vars_types.push(tmp.type); // push new var type to vars_types

                context.x_state.pages[state.current_page].var_types[resp.state.vars_path.join('.')] = tmp.type;
                resp.state.vars_last_level = tmp.level;
                /*
                // get parent nodes
                let parents = await context.dsl_parser.getParentNodesIDs({ id:node.id, array:true });
                let dads = [tmp.field];
                for (let parent_id of parents) {
                	let node = await context.dsl_parser.getNode({ id:parent_id, recurse:false });
                	if (node.text=='variables' && node.icons.includes('xmag')) {
                		break;
                	}
                	dads.push(node.text.split(':')[0].trim());
                }
                let var_name = dads.reverse().join('.');
                context.x_state.pages[state.current_page].var_types[var_name]=tmp.type;
                setToValue(context.x_state.pages[state.current_page].variables,params.value,var_name);
                */
              } // pass level to next var field if it exists 
              // @TODO @DONE I believe this command speed can be improved using the commands state instead of getting Parents
              //console.log('field_var tmp =>',JSON.stringify(tmp));
              //resp.state.tmp_var = tmp;


              return resp;
            });

            function func(_x32, _x33) {
              return _func16.apply(this, arguments);
            }

            return func;
          }()
        },
        // OTHER node types
        'def_imagen': {
          x_icons: 'idea',
          x_not_icons: 'button_cancel,desktop_new,help',
          x_not_empty: 'attributes[:src]',
          x_empty: '',
          x_level: '>2',
          func: function () {
            var _func17 = _asyncToGenerator(function* (node, state) {
              return context.reply_template({
                otro: 'Pablo',
                state
              });
            });

            function func(_x34, _x35) {
              return _func17.apply(this, arguments);
            }

            return func;
          }()
        } //

      };
    });
    return _ref.apply(this, arguments);
  }

  function setObjectKeys$1(obj, value) {
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

  function getVal$1(project, myPath) {
    return myPath.split('.').reduce((res, prop) => res[prop], project);
  }

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
        yield _this.addCommands(internal_commands); //this.debug('x_commands',this.x_commands);

        _this.x_crypto_key = require('crypto').randomBytes(32); // for hash helper method
        // init vue
        // set x_state defaults

        _this.x_state = {
          plugins: {},
          npm: {},
          dev_npm: {},
          envs: {},
          funciones: {},
          proxies: {},
          pages: {},
          current_func: '',
          current_folder: '',
          current_proxy: '',
          strings_i18n: {},
          stores_types: {
            versions: {},
            expires: {}
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
            'lang': 'client/lang/'
          });
        } // read modelos node (virtual DB)


        _this.x_state.models = yield _this._readModelos(); //alias: database tables
        //is local server running? if so, don't re-launch it

        _this.x_state.nuxt_is_running = yield _this._isLocalServerRunning();

        _this.debug('is Server Running: ' + _this.x_state.nuxt_is_running); // init terminal diagnostics (not needed here)
        // copy sub-directories if defined in node 'config.copiar' key


        if (_this.x_state.config_node.copiar) {
          var path = require('path'),
              basepath = path.dirname(path.resolve(_this.x_flags.dsl));

          var copy = require('recursive-copy');

          _this.x_console.outT({
            message: "copying config:copiar directories to 'static' target folder",
            color: "yellow"
          });

          yield Object.keys(_this.x_state.config_node.copiar).map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(function* (key) {
              var abs = path.join(basepath, key);

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

          var _path = require('path'),
              _basepath = _path.dirname(_path.resolve(_this.x_flags.dsl));

          var source = _path.join(_basepath, _this.x_state.config_node['nuxt:icon']);

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
        } // DEFAULT NPM MODULES & PLUGINS if dsl is not 'componente' type


        if (!_this.x_state.central_config.componente) {
          _this.x_console.outT({
            message: "vue initialized() ->"
          });

          _this.x_state.plugins['vue-moment'] = {
            global: true,
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
        // extract 'secret's from config keys; this is not needed in VUE DSL, but in EB DSL
        // commented for future reference

        /*
        this.x_state.secrets={}; //await _extractSecrets(config_node)
        for (let key in this.x_state.config_node) {
        	if (this.x_state.config_node[key][':secret']) {
        		let new_obj = {...this.x_state.config_node[key]};
        		delete new_obj[':secret']
        		if (new_obj[':link']) delete new_obj[':link']
        		// set object keys to uppercase
        		this.x_state.secrets[key]={};
        		let obj_keys = Object.keys(new_obj);
        		obj_keys.map(function(x) {
        			this.x_state.secrets[key][x.toUpperCase()] = new_obj[x];
        		}.bind(this));
        	}
        }*/
        // set config keys as ENV accesible variables (ex. $config.childnode.attributename)


        var _loop = function _loop(key) {
          // omit special config 'reserved' node keys
          if (['aurora', 'vpc', 'aws'].includes(key) && typeof _this.x_state.config_node[key] === 'object') {
            Object.keys(_this.x_state.config_node[key]).map(function (attr) {
              this.x_state.envs["config.".concat(key, ".").concat(attr)] = "process.env.".concat((key + '_' + attr).toUpperCase());
            }.bind(_this));
          }
        };

        for (var key in _this.x_state.config_node) {
          _loop(key);
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
        if (!_this4.x_state.central_config.componente && _this4.x_state.central_config.deploy && _this4.x_state.central_config.deploy.indexOf('eb:') != -1) {
          // if deploying to AWS eb:x, then recover/backup AWS credentials from local system
          var ini = require('ini'),
              path = require('path'),
              fs = require('fs').promises; // read existing AWS credentials if they exist


          var os = require('os');

          var aws_ini = '';
          var aws_ini_file = path.join(os.homedir(), '/.aws/') + 'credentials';

          try {
            //this.debug('trying to read AWS credentials:',aws_ini_file);
            aws_ini = yield fs.readFile(aws_ini_file, 'utf-8'); //this.debug('AWS credentials:',aws_ini);
          } catch (err_reading) {} // 


          if (_this4.x_state.config_node.aws) {
            // if DSL defines temporal AWS credentials for this app .. 
            // create backup of aws credentials, if existing previously
            if (aws_ini != '') {
              var basepath = path.dirname(path.resolve(_this4.x_flags.dsl));
              var aws_bak = path.join(basepath, 'aws_backup.ini');

              _this4.x_console.outT({
                message: "config:aws:creating .aws/credentials backup",
                color: 'yellow'
              });

              yield fs.writeFile(aws_bak, aws_ini, 'utf-8');
            } // debug


            _this4.x_console.outT({
              message: "config:aws:access ->".concat(_this4.x_state.config_node.aws.access)
            });

            _this4.x_console.outT({
              message: "config:aws:secret ->".concat(_this4.x_state.config_node.aws.secret)
            }); // transform config_node.aws keys into ini


            var to_ini = ini.stringify({
              aws_access_key_id: _this4.x_state.config_node.aws.access,
              aws_secret_access_key: _this4.x_state.config_node.aws.secret
            }, {
              section: 'default'
            });

            _this4.debug('Setting .aws/credentials from config node'); // save as .aws/credentials (ini file)


            yield fs.writeFile(aws_ini_file, to_ini, 'utf-8');
          } else if (aws_ini != '') {
            // if DSL doesnt define AWS credentials, use the ones defined within the local system.
            var parsed = ini.parse(aws_ini);
            if (parsed.default) _this4.debug('Using local system AWS credentials', parsed.default);
            _this4.x_state.config_node.aws = {
              access: '',
              secret: ''
            };
            if (parsed.default.aws_access_key_id) _this4.x_state.config_node.aws.access = parsed.default.aws_access_key_id;
            if (parsed.default.aws_secret_access_key) _this4.x_state.config_node.aws.secret = parsed.default.aws_secret_access_key;
          }
        }
      })();
    } //Executed when compiler founds an error processing nodes.


    onErrors(errors) {
      return _asyncToGenerator(function* () {})();
    } //Transforms the processed nodes into files.


    onCreateFiles(processedNodes) {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        _this5.x_console.out({
          message: 'onCreateFiles',
          data: processedNodes
        });

        _this5.x_console.out({
          message: 'pages state',
          data: _this5.x_state.pages
        });
      })();
    } // ************************
    // INTERNAL HELPER METHODS 
    // ************************

    /*
    * Returns true if a local server is running on the DSL defined port
    */


    _isLocalServerRunning() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        var is_reachable = require('is-port-reachable');

        var resp = yield is_reachable(_this6.x_state.central_config.port);
        return resp;
      })();
    }
    /*
    * Reads the node called modelos and creates tables definitions and managing code (alias:database).
    */


    _readModelos() {
      var _this7 = this;

      return _asyncToGenerator(function* () {
        // @IDEA this method could return the insert/update/delete/select 'function code generators'
        _this7.debug('_readModelos');

        _this7.debug_time({
          id: 'readModelos'
        });

        var modelos = yield _this7.dsl_parser.getNodes({
          text: 'modelos',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true	

        var tmp = {
          appname: _this7.x_state.config_node.name
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
          }
        }

        _this7.debug_timeEnd({
          id: 'readModelos'
        }); // install alaSQL plugin and define tables


        if (resp.length > 0) {
          // get tables sql create
          var ala_create = [];

          for (var _table in resp.tables) {
            ala_create.push("alasqlJs('".concat(resp.tables[_table].sql, "');"));
          } // set custom install code


          var ala_custom = "const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t".concat(ala_create.join('\n'), "\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}"); // set plugin info in state

          _this7.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
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
      var _this8 = this;

      return _asyncToGenerator(function* () {
        var resp = {},
            path = require('path');

        _this8.debug('_readAssets');

        _this8.debug_time({
          id: '_readAssets'
        });

        var assets = yield _this8.dsl_parser.getNodes({
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

        _this8.debug_timeEnd({
          id: '_readAssets'
        });

        return resp;
      })();
    }
    /* 
    * Grabs central node configuration information
    */


    _readCentralConfig() {
      var _this9 = this;

      return _asyncToGenerator(function* () {
        _this9.debug('_readCentralConfig');

        var central = yield _this9.dsl_parser.getNodes({
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
          nuxt: '2.11.0',
          idiomas: 'es',
          ':cache': _this9.x_config.cache,
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

        resp = _objectSpread2(_objectSpread2({}, resp), central[0].attributes);
        /*central[0].attributes.map(function(x) {
        	resp = {...resp,...x};
        });*/

        if (resp.dominio) {
          resp.service_name = resp.dominio.replace(/\./g, '').toLowerCase();
        } else {
          resp.service_name = resp.apptitle;
        }

        if (!resp[':cache']) _this9.x_config.cache = false; // disables cache when processing nodes (@todo)
        // return

        return resp;
      })();
    }
    /*
    * Grabs the configuration from node named 'config'
    */


    _readConfig() {
      var _this10 = this;

      return _asyncToGenerator(function* () {
        _this10.debug('_readConfig');

        var resp = {
          id: '',
          meta: [],
          seo: {},
          secrets: {}
        },
            config_node = {};
        var search = yield _this10.dsl_parser.getNodes({
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
                    hid: _this10.hash(meta_child.nodes[0].text),
                    name: 'keywords',
                    content: resp.seo['keywords'].join(',')
                  });
                } else if (meta_child.text.toLowerCase() == 'language') {
                  resp.seo['language'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    hid: _this10.hash(meta_child.nodes[0].text),
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
                      hid: _this10.hash(meta_child.nodes[0].text),
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
                var config_key = key.text.toLowerCase().replace(/ /g, '');

                var values = _objectSpread2({}, key.attributes);
                /*key.attributes.map(function(x) {
                	values = {...values,...x};
                });*/


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

          var dsl_folder = path.dirname(path.resolve(_this10.x_flags.dsl));
          var parent_folder = path.resolve(dsl_folder, '../');
          var folder = dsl_folder.replace(parent_folder, '');
          resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(_this10.x_flags.dsl, '.dsl'); //console.log('folder:',{folder,name:resp.name});
          //this.x_flags.dsl
        } // create id if not given


        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
      })();
    }

    getParentNodes() {
      var _arguments = arguments,
          _this11 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this11.throwIfMissing('id');
        var exec = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
        var parents = yield _this11.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this11.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var command = yield _this11.findValidCommand({
            node,
            object: exec
          });
          if (command) resp.push(command);
        }

        return resp;
      })();
    } //gets the asset code for a given string like: assets:assetname


    getAsset() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.throwIfMissing('text');
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'js';
      //this.x_state.assets
      var resp = text,
          type_o = text.replaceAll('jsfunc', 'js').toLowerCase();

      if (resp.toLowerCase().indexOf('assets:') != -1) {
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

            if (type.toLowerCase().indexOf('js') != -1) {
              resp = "require('".concat(resp, "')");
            }
          } else ;
        }
      }

      return resp;
    } //vue tag constructor helper


    tagParams() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var selfclose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var t_params = _objectSpread2({}, params),
          resp = '';

      if ('aos' in params) {
        var aos_p = params['aos'].split(',');

        if (aos_p.length == 3) {
          t_params['data-aos'] = aos_p[0];
          t_params['data-aos-duration'] = aos_p[1];
          t_params['data-aos-delay'] = aos_p[2];
        } else {
          t_params['data-aos'] = aos_p[0];
          t_params['data-aos-duration'] = aos_p[1];
        }

        delete t_params['aos'];
      }

      var x_params = this.struct2params(t_params);

      if (x_params != '') {
        resp = "<".concat(tag, " ").concat(x_params);
        if (selfclose == true) resp += '/';
        resp += '>';
      } else {
        resp = "<".concat(tag);
        if (selfclose == true) resp += '/';
        resp += '>';
      }

      return resp;
    }

    // hash helper method
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

  }

  return vue_dsl;

})));

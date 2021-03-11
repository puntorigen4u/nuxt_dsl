(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('crypto'), require('vm')) :
  typeof define === 'function' && define.amd ? define(['crypto', 'vm'], factory) :
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
   * @property {Object} attributes - Object with each attribute (key is attribute name, value is attribute value).
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

      this.x_memory_cache = {
        findCommand: {},
        findValidCommand: {},
        isExactParentID: {},
        hasBrotherBefore: {},
        hasBrotherNext: {}
      }; // grab class methods that start with the 'on' prefix

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

          try {
            yield _this.onInit();
          } catch (eeee) {
            _this.x_console.out({
              message: "onInit() ".concat(eeee),
              color: 'red'
            });
          }
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
        	if (node.attributes[i]=='title' || node.attributes[i]=='titulo') {
        		resp = node.attributes[i];
        		break;
        	}
        }*/

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
      var _this3 = this;

      return _asyncToGenerator(function* () {
        if (!_this3.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        if (command_func && typeof command_func === 'function') {
          var t = yield command_func(_this3);

          if (typeof t === 'object') {
            _this3.x_commands = _objectSpread2(_objectSpread2({}, _this3.x_commands), t);
          } else {
            throw new Error('error! addCommands() argument doesn\'t reply with an Object');
          }
        } else if (command_func && typeof command_func === 'object') {
          _this3.x_commands = _objectSpread2(_objectSpread2({}, _this3.x_commands), command_func);
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
          _this4 = this;

      return _asyncToGenerator(function* () {
        var {
          node = _this4.throwIfMissing('node'),
          justone = true,
          show_debug = true
        } = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
        if (!_this4.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        var resp = _objectSpread2(_objectSpread2({}, _this4.reply_template()), {
          id: 'not_found',
          hint: 'failover command'
        }),
            xtest = [];

        if (typeof node.icons === 'undefined') {
          if (show_debug) _this4.debug('error: findCommand was given a blank node!');
          return resp;
        }

        if (node.id in _this4.x_memory_cache.findCommand) {
          if (show_debug) _this4.debug("using memory_cache for findCommand for node ID ".concat(node.id));
          return _this4.x_memory_cache.findCommand[node.id];
        } else {
          if (show_debug) _this4.debug("findCommand for node ID ".concat(node.id));
          var keys = 'x_icons,x_not_icons,x_not_empty,x_not_text_contains,x_empty,x_text_exact,x_text_contains,x_level,x_or_hasparent,x_all_hasparent,x_or_isparent';
          var command_requires1 = setObjectKeys(keys, '');

          var node_features = _objectSpread2({}, command_requires1);

          var command_defaults = _objectSpread2({}, command_requires1);

          var def_matched = setObjectKeys(keys, true);
   // iterate through commands

          for (var key in _this4.x_commands) {
            //let comm_keys = Object.keys(this.x_commands[key]);
            // reset defaults for current command
            var matched = _objectSpread2({}, def_matched); // build template for used keys


            var command_requires = _objectSpread2(_objectSpread2({}, command_defaults), _this4.x_commands[key]);

            delete command_requires.func; // test command features vs node features
            // test 1: icon match
            //if (this.x_config.debug) this.x_console.time({ id:`${key} x_icons` });

            if (command_requires['x_icons'] != '') {
              _this4.debug_time({
                id: "".concat(key, " x_icons")
              });

              for (var qi of command_requires.x_icons.split(',')) {
                matched.x_icons = node.icons.includes(qi) ? true : false;
                if (!matched.x_icons) break;
                yield setImmediatePromise();
              }

              _this4.debug_timeEnd({
                id: "".concat(key, " x_icons")
              });
            } //if (this.x_config.debug) this.x_console.timeEnd({ id:`${key} x_icons` });
            // test 2: x_not_icons


            if (command_requires['x_not_icons'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_not_icons")
              }); // special case first


              if (node.icons.length > 0 && command_requires['x_not_icons'] != '' && ['*'].includes(command_requires['x_not_icons'])) {
                matched.x_not_icons = false;
              } else if (command_requires['x_not_icons'] != '') {
                // if node has any icons of the x_not_icons, return false aka intersect values, and if any assign false.
                matched.x_not_icons = _this4.array_intersect(command_requires['x_not_icons'].split(','), node.icons).length > 0 ? false : true;
              }

              _this4.debug_timeEnd({
                id: "".concat(key, " x_not_icons")
              });
            } // test 3: x_not_empty. example: attributes[event,name] aka key[value1||value2] in node
            // supports multiple requirements using + as delimiter "attributes[event,name]+color"


            if (command_requires['x_not_empty'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
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

                    var keys = _this4.dsl_parser.findVariables({
                      text: test,
                      symbol: '[',
                      symbol_closing: ']'
                    }).split('+');

                    var has_keys = [];

                    if (array_key != 'attributes' && node[array_key]) {
                      for (var obj of node[array_key]) {
                        Object.keys(obj).filter(function (x) {
                          has_keys.push(x);
                        });
                      }
                    } else if (array_key == 'attributes') {
                      Object.keys(node.attributes).filter(function (x) {
                        has_keys.push(x);
                      });
                    }

                    if (_this4.array_intersect(has_keys, keys).length != keys.length) {
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

                yield setImmediatePromise();
              }

              _this4.debug_timeEnd({
                id: "".concat(key, " x_not_empty")
              });
            } // test 4: x_not_text_contains
            // can have multiple values.. ex: margen,arriba


            if (command_requires['x_not_text_contains'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_not_text_contains")
              });

              for (var word of command_requires['x_not_text_contains'].split(',')) {
                if (node.text.indexOf(word) != -1) {
                  matched.x_not_text_contains = false;
                  break;
                }

                yield setImmediatePromise();
              }

              _this4.debug_timeEnd({
                id: "".concat(key, " x_not_text_contains")
              });
            } // test 5: x_empty (node keys that must be empty (undefined also means not empty))


            if (command_requires['x_empty'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
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

                yield setImmediatePromise();
              }

              _this4.debug_timeEnd({
                id: "".concat(key, " x_empty")
              });
            } // test 6: x_text_exact


            if (allTrue(matched, keys) && command_requires['x_text_exact'] != '') {
              _this4.debug_time({
                id: "".concat(key, " x_text_exact")
              });

              matched.x_text_exact = command_requires['x_text_exact'] == node.text ? true : false;

              _this4.debug_timeEnd({
                id: "".concat(key, " x_text_exact")
              });
            } // test 7: x_text_contains


            if (allTrue(matched, keys) && command_requires['x_text_contains'] != '') {
              _this4.debug_time({
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

              _this4.debug_timeEnd({
                id: "".concat(key, " x_text_contains")
              });
            } // test 8: x_level - example: '2,3,4' (any) or '>2,<7' (all)


            if (command_requires['x_level'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_level")
              });

              matched.x_level = numberInCondition(node.level, command_requires['x_level']);

              _this4.debug_timeEnd({
                id: "".concat(key, " x_level")
              });
            } // test 9: x_or_hasparent


            if (command_requires['x_or_hasparent'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_or_hasparent")
              }); //matched.x_or_hasparent=false;


              matched.x_or_hasparent = yield _this4.hasParentID(node.id, command_requires['x_or_hasparent']);

              _this4.debug_timeEnd({
                id: "".concat(key, " x_or_hasparent")
              });
            } // test 10: x_all_hasparent


            if (command_requires['x_all_hasparent'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_all_hasparent")
              });

              matched.x_all_hasparent = yield _this4.hasParentID(node.id, command_requires['x_all_hasparent'], true);

              _this4.debug_timeEnd({
                id: "".concat(key, " x_all_hasparent")
              });
            } // test 11: x_or_isparent


            if (command_requires['x_or_isparent'] != '' && allTrue(matched, keys)) {
              _this4.debug_time({
                id: "".concat(key, " x_or_isparent")
              });

              var is_direct = false;

              for (var _key4 of command_requires['x_or_isparent'].split(',')) {
                is_direct = yield _this4.isExactParentID(node.id, _key4);
                if (is_direct == true) break;
                yield setImmediatePromise();
              }

              matched.x_or_isparent = is_direct;

              _this4.debug_timeEnd({
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
              }), _this4.x_commands[key]), {
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


            yield setImmediatePromise();
          } // sort by priority


          if (show_debug) _this4.debug_time({
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
          if (show_debug) _this4.debug_timeEnd({
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


          _this4.x_memory_cache.findCommand[node.id] = resp;
          return resp;
        }
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
          _this5 = this;

      return _asyncToGenerator(function* () {
        var {
          node = _this5.throwIfMissing('node'),
          object = false,
          x_command_shared_state = {},
          show_debug = true
        } = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : {};
        if (!_this5.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        if (node.id in _this5.x_memory_cache.findValidCommand) {
          //if (show_debug) this.debug({ message:`findValidCommand called for node ${node.id}, level:${node.level}, text:${node.text} using CACHE`, color:'green' });
          return _this5.x_memory_cache.findValidCommand[node.id];
        } else {
          if (show_debug) _this5.debug({
            message: "findValidCommand called for node ".concat(node.id, ", level:").concat(node.level, ", text:").concat(node.text),
            color: 'yellow'
          });
          var reply = {};
          var commands_ = yield _this5.findCommand({
            node,
            justone: false,
            show_debug: show_debug
          }); // @TODO debug and test

          if (commands_.length == 0) {
            _this5.debug({
              message: 'findValidCommand: no command found.',
              color: 'red'
            });
          } else if (commands_.length == 1) {
            reply = _objectSpread2({}, commands_[0]); // try executing the node on the found commands_

            try {
              var test = yield _this5.x_commands[reply.x_id].func(node, x_command_shared_state);
              reply.exec = test; // @TODO test if _f4e is used; because its ugly

              reply._f4e = commands_[0].x_id;
              if (show_debug) _this5.debug({
                message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
                color: 'green'
              });
            } catch (test_err) {
              if (show_debug) _this5.debug({
                message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... ERROR! (nodeid:").concat(node.id, ")"),
                color: 'red'
              }); // @TODO emit('internal_error','findValidCommand')

              reply.error = true;
              reply.valid = false;
              reply.catch = test_err; //throw new Error(test_err); // @TODO we should throw an error, so our parents catch it (9-AGO-20)
            }
          } else {
            // more than one command found
            if (show_debug) _this5.debug({
              message: "findValidCommand: ".concat(commands_.length, " commands found: (nodeid:").concat(node.id, ")"),
              color: 'green'
            }); // test each command

            for (var qm_index in commands_) {
              var qm = commands_[qm_index];

              try {
                var _test = yield _this5.x_commands[qm.x_id].func(node, x_command_shared_state);

                if (_test.valid) {
                  if (show_debug) _this5.debug({
                    message: "findValidCommand: ".concat(parseInt(qm_index) + 1, "/").concat(commands_.length, " testing command ").concat(qm.x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
                    color: 'green'
                  });
                  if (show_debug) _this5.debug({
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
                if (show_debug) _this5.debug({
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
          _this5.x_memory_cache.findValidCommand[node.id] = reply;
          return reply;
        }
      })();
    } // ****************************
    // ADVANCED PROCESSING METHODS
    // ****************************

    /**
    * This method traverses the dsl parsed tree, finds/execute x_commands and generated code as files.
    * @return 	{Object}
    */


    process() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        if (!_this6.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        _this6.debug_time({
          id: 'process/writer'
        });

        var resp = {
          nodes: []
        }; // read nodes

        _this6.x_console.outT({
          prefix: 'process,yellow',
          message: "processing nodes ..",
          color: 'cyan'
        });

        var x_dsl_nodes = yield _this6.dsl_parser.getNodes({
          level: 2,
          nodes_raw: true
        });

        _this6.debug('calling onPrepare');

        _this6.debug_time({
          id: 'onPrepare'
        });

        yield _this6.onPrepare();

        _this6.debug_timeEnd({
          id: 'onPrepare'
        }); // 


        for (var level2 of x_dsl_nodes) {
          //this.debug('node',node);
          // remove await when in production (use Promise.all after loop then)
          var main = yield _this6.process_main(level2, {}); // append to resp

          resp.nodes.push(main);
          yield setImmediatePromise();
        } // @TODO enable when not debugging
        //resp.nodes = await Promise.all(resp.nodes);


        _this6.debug_timeEnd({
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
          yield _this6.onCreateFiles(resp.nodes);

          _this6.x_console.title({
            title: "Interpreter ".concat(_this6.x_config.class.toUpperCase(), " ENDED. Full Compilation took: ").concat(_this6.secsPassed_(), " secs"),
            color: 'green'
          });

          _this6.debug_table('Amount of Time Per Command');
        } else {
          // errors occurred
          _this6.x_console.title({
            title: "Interpreter ".concat(_this6.x_config.class.toUpperCase(), " ENDED with ERRORS.\nPlease check your console history.\nCompilation took: ").concat(_this6.secsPassed_(), " secs"),
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
      var _this7 = this;

      return _asyncToGenerator(function* () {
        var resp = _objectSpread2({}, source_resp);

        if (resp.hasChildren == true && resp.valid == true) {
          var sub_nodes = yield nodei.getNodes();

          var new_state = _objectSpread2({}, custom_state);

          for (var sublevel of sub_nodes) {
            var real = yield _this7.dsl_parser.getNode({
              id: sublevel.id,
              nodes_raw: true,
              recurse: false
            });
            var real2 = yield _this7.findValidCommand({
              node: real,
              object: false,
              x_command_shared_state: new_state
            }); //console.log('sub_process->findValidCommand node:'+real.text,real2);

            if (nodei.state) new_state = _objectSpread2({}, real2.state); // inherint state from last command if defined

            if (real2 && real2.exec && real2.exec.valid == true) {
              //resp.children.push(real2.exec);
              if (real2.exec.state) new_state = _objectSpread2(_objectSpread2({}, new_state), real2.exec.state); //console.log('real2 dice:',real2);

              resp.init += real2.exec.init;
              resp.code += real2.exec.open;
              if (!resp.x_ids) resp.x_ids = [];
              resp.x_ids.push(real2.x_id);
              resp = yield _this7.sub_process(resp, sublevel, new_state);
              resp.code += real2.exec.close;
            } else if (real2.error == true) {
              _this7.x_console.outT({
                message: "error: Executing func x_command:".concat(real2.x_id, " for node: id:").concat(real.id, ", level ").concat(real.level, ", text: ").concat(real.text, "."),
                data: {
                  id: real.id,
                  level: real.level,
                  text: real.text,
                  data: real2.catch,
                  x_command_state: new_state
                }
              });

              yield _this7.onErrors(["Error executing func for x_command:".concat(real2.x_id, " for node id ").concat(real.id, ", text: ").concat(real.text, " ")]);
              resp.valid = false, resp.hasChildren = false, resp.error = true;
              break;
            }

            yield setImmediatePromise();
          }
        }

        return resp;
      })();
    }

    process_main(node, custom_state) {
      var _this8 = this;

      return _asyncToGenerator(function* () {
        var resp = {
          state: custom_state,
          id: node.id,
          name: yield _this8.onDefineNodeName(node),
          file: yield _this8.onDefineFilename(node),
          init: '',
          title: yield _this8.onDefineTitle(node),
          attributes: node.attributes,
          code: '',
          open: '',
          close: '',
          x_ids: [],
          subnodes: node.nodes_raw.length
        };

        _this8.x_console.outT({
          prefix: 'process,yellow',
          message: "processing node ".concat(node.text, " .."),
          color: 'yellow'
        }); //
        //try {
        //console.log('process_main->findValidCommand node:'+node.text);


        var copy_state = _objectSpread2({}, custom_state);

        var test = yield _this8.findValidCommand({
          node: node,
          object: false,
          x_command_shared_state: copy_state
        }); //this.debug(`test para node: text:${node.text}`,test);

        if (test && test.exec && test.exec.valid == true) {
          if (test.exec.state) copy_state = _objectSpread2(_objectSpread2({}, copy_state), test.exec.state);
          resp = _objectSpread2(_objectSpread2({}, resp), test.exec);
          resp.error = false;
          resp.init += resp.init;
          resp.code += resp.open;
          if (!resp.x_ids) resp.x_ids = [];
          resp.x_ids.push(test.x_id);

          if (typeof node.getNodes === 'function') {
            resp = yield _this8.sub_process(resp, node, copy_state);
          }

          resp.code += resp.close;
          resp.x_ids = resp.x_ids.join(',');
        } else if (test.error == true) {
          _this8.x_console.outT({
            message: "error: Executing func x_command:".concat(test.x_id, " for node: id:").concat(node.id, ", level ").concat(node.level, ", text: ").concat(node.text, "."),
            data: {
              id: node.id,
              level: node.level,
              text: node.text,
              catch: test.catch,
              x_command_state: test.state
            }
          });

          yield _this8.onErrors(["Error executing func for x_command:".concat(test.x_id, " for node id ").concat(node.id, ", text: ").concat(node.text, " ")]);
          resp.valid = false, resp.hasChildren = false, resp.error = true;
        } else {
          _this8.x_console.outT({
            message: 'error: FATAL, no method found for node processing.',
            data: {
              id: node.id,
              level: node.level,
              text: node.text
            }
          });

          yield _this8.onErrors(["No method found for given node id ".concat(node.id, ", text: ").concat(node.text, " ")]);
          resp.valid = false, resp.hasChildren = false, resp.error = true;
        } // closing level2 'on' calls


        resp = yield _this8.onAfterProcess(resp);
        resp = yield _this8.onCompleteCodeTemplate(resp); //

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


    _appFolders(keys) {
      var _arguments3 = arguments,
          _this9 = this;

      return _asyncToGenerator(function* () {
        var compile_folder = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : _this9.x_state.central_config.apptitle;
        var output_dir = _arguments3.length > 2 ? _arguments3[2] : undefined;

        var fs = require('fs').promises;

        _this9.debug('_appFolders');

        var path = require('path');

        var dsl_folder = path.dirname(path.resolve(_this9.x_flags.dsl)) + path.sep;
        if (output_dir) dsl_folder = output_dir;
        var resp = {
          base: dsl_folder,
          src: dsl_folder + (compile_folder ? compile_folder : _this9.x_state.central_config.apptitle) + path.sep
        };
        resp.app = path.normalize(resp.src);
        resp.compile_folder = compile_folder; // depending on central config type

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
      var _arguments4 = arguments,
          _this10 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : _this10.throwIfMissing('id');
        var x_id = _arguments4.length > 1 && _arguments4[1] !== undefined ? _arguments4[1] : _this10.throwIfMissing('x_id');

        // @TODO test it after having 'real' commands on some parser 3-ago-20
        if (id + x_id in _this10.x_memory_cache.hasBrotherID) {
          return _this10.x_memory_cache.hasBrotherID[id + x_id];
        } else {
          var brother_ids = yield _this10.dsl_parser.getBrotherNodesIDs({
            id,
            before: true,
            after: true
          }).split(',');
          var brother_x_ids = [],
              resp = false;

          for (var q of brother_ids) {
            var node = yield _this10.dsl_parser.getNode({
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


          _this10.x_memory_cache.hasBrotherID[id + x_id] = resp;
          return resp;
        }
      })();
    }
    /**
    * Helper method to return true if given node ID has a brother before it
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Boolean}
    */


    hasBrotherBefore() {
      var _arguments5 = arguments,
          _this11 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : _this11.throwIfMissing('id');

        if (id in _this11.x_memory_cache.hasBrotherBefore) {
          return _this11.x_memory_cache.hasBrotherBefore[id];
        } else {
          var brother_ids = yield _this11.dsl_parser.getBrotherNodesIDs({
            id,
            before: true,
            after: false
          }).split(',');
          _this11.x_memory_cache.hasBrotherBefore[id] = brother_ids.includes(id);
          return _this11.x_memory_cache.hasBrotherBefore[id];
        }
      })();
    }
    /**
    * Helper method to return true if given node ID has a brother following it
    * @async
    * @param 	{string}	id		- ID of NodeDSL object to query
    * @return 	{Boolean}
    */


    hasBrotherNext() {
      var _arguments6 = arguments,
          _this12 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments6.length > 0 && _arguments6[0] !== undefined ? _arguments6[0] : _this12.throwIfMissing('id');

        if (id in _this12.x_memory_cache.hasBrotherNext) {
          return _this12.x_memory_cache.hasBrotherNext[id];
        } else {
          var brother_ids = yield _this12.dsl_parser.getBrotherNodesIDs({
            id,
            before: false,
            after: true
          }).split(',');
          _this12.x_memory_cache.hasBrotherNext[id] = brother_ids.includes(id);
          return _this12.x_memory_cache.hasBrotherNext[id];
        }
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
      var _arguments7 = arguments,
          _this13 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments7.length > 0 && _arguments7[0] !== undefined ? _arguments7[0] : _this13.throwIfMissing('id');
        var x_id = _arguments7.length > 1 && _arguments7[1] !== undefined ? _arguments7[1] : _this13.throwIfMissing('x_id');

        // @TODO test it after having 'real' commands on some parser 4-ago-20
        if (id + x_id in _this13.x_memory_cache.isExactParentID) {
          return _this13.x_memory_cache.isExactParentID[id + x_id];
        } else {
          var parent_node = yield _this13.dsl_parser.getParentNode({
            id
          });
          var parent_command = yield _this13.findValidCommand({
            node: parent_node,
            show_debug: false,
            object: true
          });

          if (parent_command && parent_command.x_id == x_id) {
            _this13.x_memory_cache.isExactParentID[id + x_id] = true;
            return true;
          }

          _this13.x_memory_cache.isExactParentID[id + x_id] = false;
          return false;
        }
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
      var _arguments8 = arguments,
          _this14 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments8.length > 0 && _arguments8[0] !== undefined ? _arguments8[0] : _this14.throwIfMissing('id');
        var x_id = _arguments8.length > 1 && _arguments8[1] !== undefined ? _arguments8[1] : _this14.throwIfMissing('x_id');
        var onlyTrueIfAll = _arguments8.length > 2 && _arguments8[2] !== undefined ? _arguments8[2] : false;
        // @TODO test it after having 'real' commands on some parser aug-4-20, fixed on aug-15-20
        var x_ids = x_id.split(',');
        var parents = yield _this14.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var tested_parents_x_ids = [];

        for (var parent_id of parents) {
          var node = yield _this14.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var parentCommand = yield _this14.findValidCommand({
            node,
            show_debug: false,
            object: true
          });

          if (onlyTrueIfAll == false && x_ids.includes(parentCommand.x_id)) {
            return true;
          } else if (onlyTrueIfAll == false) ; else if (onlyTrueIfAll == true) {
            // onlyTrueIfAll==true
            tested_parents_x_ids.push(parentCommand.x_id);

            if (_this14.array_intersect(tested_parents_x_ids, x_ids).length == x_ids.length) {
              return true;
            }
          }
        } // test again if we are here


        if (_this14.array_intersect(tested_parents_x_ids, x_ids).length == x_ids.length) {
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
      var _arguments9 = arguments,
          _this15 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments9.length > 0 && _arguments9[0] !== undefined ? _arguments9[0] : _this15.throwIfMissing('id');
        var array = _arguments9.length > 1 && _arguments9[1] !== undefined ? _arguments9[1] : false;
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var parents = yield _this15.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this15.dsl_parser.getNode({
            parent_id,
            recurse: false
          });
          var command = yield _this15.findValidCommand({
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
      var _arguments10 = arguments,
          _this16 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments10.length > 0 && _arguments10[0] !== undefined ? _arguments10[0] : _this16.throwIfMissing('id');
        return yield _this16.getParentIDs(id, true);
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
      var _arguments11 = arguments,
          _this17 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments11.length > 0 && _arguments11[0] !== undefined ? _arguments11[0] : _this17.throwIfMissing('id');
        // this is only used in ti.cfc: def_textonly (just for back-compatibility in case needed);
        // @deprecated 4-ago-2020
        var parents = yield _this17.getParentIDs(id, true);
        return parents.map(x => {
           x.id;
        }); // just return ids as an array of objects
      })();
    }
    /**
    * Helper method to return a tag with key/values as tag attributes
    * @param 	{Object}	struct		- Object with keys and values to transform from.
    * @return 	{string}
    */


    tagParams() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var selfclose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var resp = '';
      var x_params = this.struct2params(params);

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


  function numberInCondition(num, command_test) {
    // num is always 'number' type
    var resp = true;

    if (command_test.toString() === num.toString()) ; else if (typeof command_test === 'number') {
      // cases test: 2,5,9,1 (exact matches)
      if (num == command_test) {
        resp = true;
      } else if (num != command_test) {
        resp = false;
      }
    } else if (typeof command_test === 'string') {
      if (command_test.indexOf(',') == -1 && command_test.charAt(0) == '<') {
        // one condition: <2 or <7
        if (num >= parseInt(command_test.replace('<', ''))) {
          resp = false;
        }
      } else if (command_test.indexOf(',') == -1 && command_test.charAt(0) == '>') {
        // one condition: >2 or >7
        if (num <= parseInt(command_test.replace('>', ''))) {
          resp = false;
        }
      } else if (command_test.indexOf(',') == -1 && command_test != num.toString()) {
        resp = false;
      } else {
        // cases test:['2','>2','2,3,5']
        var test2 = command_test.split(',');

        if (command_test.indexOf('<') == -1 && command_test.indexOf('>') == -1 && test2.includes(num)) {
          // exact match;
          resp = true;
        } else if (command_test.indexOf('<') != -1 || command_test.indexOf('>') != -1) {
          // test may be >2,<5,>7
          // 'and/all' (>2,<7)
          for (var i of test2) {
            if (i.charAt(0) == '>') {
              if (num <= parseInt(i.replace('>', ''))) {
                resp = false;
                break;
              }
            } else if (i.charAt(0) == '<') {
              if (num >= parseInt(i.replace('<', ''))) {
                resp = false;
                break;
              }
            }
          }
        }
      }
    } else {
      resp = false;
    }

    return resp;
  }

  function getVal(project, myPath) {
    return myPath.split('.').reduce((res, prop) => res[prop], project);
  }

  function setImmediatePromise() {
    //for preventing freezing node thread within loops (fors)
    return new Promise(resolve => {
      setImmediate(() => resolve());
    });
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

      var getTranslatedTextVar = function getTranslatedTextVar(text) {
        var vars = context.dsl_parser.findVariables({
          text,
          symbol: "**",
          symbol_closing: "**"
        });
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
        });

        if ('${' + vars + '}' == new_vars) {
          return vars;
        } else {
          return "`".concat(new_vars, "`");
        }
      }; // process our own attributes_aliases to normalize node attributes


      var aliases2params = function aliases2params(x_id, node) {
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
          var key_use = key.trim().replace(':', '');
          var keytest = key_use.toLowerCase();
          var tvalue = value.toString().replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env.').replaceAll('$store.', '$store.state.').trim(); //

          if (keytest == 'props') {
            value.split(',').map(x => {
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
            if (value != tvalue || value[0] == "$" || value[0] == "!") {
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

            function func(_x4, _x5) {
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

              if (node.level == 3) {
                //state.current_folder = node.text;
                resp.state.current_folder = node.text;
              } else if (node.level == 4 && (yield context.isExactParentID(node.id, 'def_server_path'))) {
                var parent_node = yield context.dsl_parser.getParentNode({
                  id: node.id
                }); //state.current_folder = `${parent_node.text}/${node.id}`;

                resp.state.current_folder = "".concat(parent_node.text, "/").concat(node.text);
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

            function func(_x8, _x9) {
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


              if (tmp.version != '') {
                if (resp.state.current_store in context.x_state.stores_types['expires'] === false) context.x_state.stores_types['expires'][resp.state.current_store] = tmp.expire;
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
        // **************************
        //  VueX PROXIES definitions
        // **************************
        'def_proxies': {
          x_icons: 'desktop_new',
          x_level: 2,
          x_text_contains: 'prox',
          hint: 'Representa una coleccion de proxies de Vue',
          func: function () {
            var _func7 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              return resp;
            });

            function func(_x14, _x15) {
              return _func7.apply(this, arguments);
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
            var _func8 = _asyncToGenerator(function* (node, state) {
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

            function func(_x16, _x17) {
              return _func8.apply(this, arguments);
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
            var _func9 = _asyncToGenerator(function* (node, state) {
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

            function func(_x18, _x19) {
              return _func9.apply(this, arguments);
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
            var _func10 = _asyncToGenerator(function* (node, state) {
              // @TODO check this node runs correctly (currently without testing map aug-20-20)
              var resp = context.reply_template({
                state
              }); // process children nodes

              var subnodes = yield node.getNodes();
              subnodes.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(function* (item) {
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

                return function (_x22) {
                  return _ref2.apply(this, arguments);
                };
              }().bind(this)); // return

              return resp;
            });

            function func(_x20, _x21) {
              return _func10.apply(this, arguments);
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
            var _func11 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });

              var params = _objectSpread2(_objectSpread2({}, {
                scoped: true
              }), aliases2params('def_page_estilos', node));

              resp.open = context.tagParams('page_estilos', params, false);
              resp.close = '</page_estilos>';
              return resp;
            });

            function func(_x23, _x24) {
              return _func11.apply(this, arguments);
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
            var _func12 = _asyncToGenerator(function* (node, state) {
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
              // @TODO improved this; I believe this could behave more like def_variables_field instead, and so support nested styles.
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

            function func(_x25, _x26) {
              return _func12.apply(this, arguments);
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
            var _func13 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // call def_page for functionality informing we are calling from def_layout using state.

              resp = yield context.x_commands['def_page'].func(node, _objectSpread2(_objectSpread2({}, state), {
                from_def_layout: true
              }));
              delete resp.state.from_def_layout;
              return resp;
            });

            function func(_x27, _x28) {
              return _func13.apply(this, arguments);
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
            var _func14 = _asyncToGenerator(function* (node, state) {
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
                  resp.open += "<v-container fill-height>\n";

                  if (context.x_state.es6) {
                    resp.open += "<v-row wrap align-center>\n";
                  } else {
                    resp.open += "<v-layout row wrap align-center>\n";
                  }
                } else {
                  if (tmp.tipo == 'flex') {
                    resp.open += "<v-container>\n";
                    params.row = null;
                    resp.open += context.tagParams('v-layout', params, false) + '\n';
                  } else if (tmp.tipo == 'wrap') {
                    if (context.x_state.es6) {
                      resp.open += "<v-container fill-height container--fluid grid-list-xl>\n";
                    } else {
                      resp.open += "<v-container fill-height fluid grid-list-xl>\n";
                    }

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

                  if (context.x_state.es6) {
                    params = _objectSpread2(_objectSpread2({}, params), {
                      wrap: null,
                      'align-center': null
                    });
                    resp.open += context.tagParams('v-row', params, false) + '\n';
                  } else {
                    params = _objectSpread2(_objectSpread2({}, params), {
                      row: null,
                      wrap: null,
                      'align-center': null
                    });
                    resp.open += context.tagParams('v-layout', params, false) + '\n';
                  }
                } else {
                  resp.open += '<v-layout wrap>\n';
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

            function func(_x29, _x30) {
              return _func14.apply(this, arguments);
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
            var _func15 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {};
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              if (context.x_state.central_config['keep-alive']) params['keep-alive'] = null; // write tag

              resp.open += context.tagParams('nuxt', params, true) + "\n";
              return resp;
            });

            function func(_x31, _x32) {
              return _func15.apply(this, arguments);
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
            var _func16 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // call def_page for functionality informing we are calling from def_componente using state.

              resp = yield context.x_commands['def_page'].func(node, _objectSpread2(_objectSpread2({}, state), {
                from_def_componente: true
              }));
              delete resp.state.from_def_componente;
              return resp;
            });

            function func(_x33, _x34) {
              return _func16.apply(this, arguments);
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
            var _func17 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // prepare vars

              var file_name = node.text.trim().split(':').pop();
              var tag_name = "c-".concat(file_name);
              var var_name = file_name.replaceAll('-', ''); // add import to page

              context.x_state.pages[state.current_page].imports["~/components/".concat(file_name, ".vue")] = var_name;
              context.x_state.pages[state.current_page].components[tag_name] = var_name; // process attributes and write output

              var params = aliases2params('def_componente_view', node);
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note.trim(), " -->\n");
              resp.open += context.tagParams(tag_name, params, false) + '\n';
              resp.close = "</".concat(tag_name, ">\n");
              return resp;
            });

            function func(_x35, _x36) {
              return _func17.apply(this, arguments);
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
            var _func18 = _asyncToGenerator(function* (node, state) {
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

            function func(_x37, _x38) {
              return _func18.apply(this, arguments);
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
            var _func19 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card', node); // write tag

              resp.open += context.tagParams('v-card', params, false) + '\n';
              resp.close += "</v-card>\n";
              return resp;
            });

            function func(_x39, _x40) {
              return _func19.apply(this, arguments);
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
            var _func20 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_title', node);
              resp.open += context.tagParams('v-card-title', params, false) + '\n';
              resp.close += "</v-card-title>\n";
              return resp;
            });

            function func(_x41, _x42) {
              return _func20.apply(this, arguments);
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
            var _func21 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_text', node);
              resp.open += context.tagParams('v-card-text', params, false) + '\n';
              resp.close += "</v-card-text>\n";
              return resp;
            });

            function func(_x43, _x44) {
              return _func21.apply(this, arguments);
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
            var _func22 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_card_actions', node);
              resp.open += context.tagParams('v-card-actions', params, false) + '\n';
              resp.close += "</v-card-actions>\n";
              return resp;
            });

            function func(_x45, _x46) {
              return _func22.apply(this, arguments);
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
            var _func23 = _asyncToGenerator(function* (node, state) {
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

            function func(_x47, _x48) {
              return _func23.apply(this, arguments);
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
            var _func24 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form', node);
              resp.open += context.tagParams('v-form', params, false) + '\n';
              resp.close += "</v-form>\n";
              return resp;
            });

            function func(_x49, _x50) {
              return _func24.apply(this, arguments);
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
            var _func25 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {};
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field', node);
              tmp = _objectSpread2(_objectSpread2({}, {
                type: 'text'
              }), params);
              params['refx'] = node.id; // add v-model as node.text

              if (node.text.contains('$')) {
                var vmodel = node.text.trim().split(',').pop();
                vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                params['v-model'] = vmodel;
              } else {
                params['v-model'] = node.text.trim();
              } // render by type


              delete params.type;

              if (tmp.type == 'text') {
                if (context.x_state.es6) {
                  if (params[':mask']) {
                    params['v-mask'] = params[':mask'];
                    delete params[':mask'];
                  } else if (params['mask']) {
                    params['v-mask'] = "'".concat(params['mask'], "'");
                    delete params['mask'];
                  }
                }

                resp.open += context.tagParams('v-text-field', params, false) + '\n';
                resp.close += "</v-text-field>\n";
              } else if (tmp.type == 'combo') {
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
              } // return


              return resp;
            });

            function func(_x51, _x52) {
              return _func25.apply(this, arguments);
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
            var _func26 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field', node);
              params['refx'] = node.id; // add node.text (var) as image prefill

              if (node.text.trim() != '-') {
                if (node.text.contains('$')) {
                  var vmodel = node.text.trim().split(',').pop();
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
                npm: {
                  'vue-picture-input': '*'
                },
                tag: 'picture-input'
              };
              if (params.type) delete params.type; // write output

              resp.open += context.tagParams('picture-input', params, false) + '\n';
              resp.close = "</picture-input>\n";
              return resp;
            });

            function func(_x53, _x54) {
              return _func26.apply(this, arguments);
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
            var _func27 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_galery', node);
              params['refx'] = node.id; // add node.text (var) as image prefill

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  vmodel = vmodel.split(',').pop();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                }

                params['@onselectimage'] = "(item)=>".concat(vmodel, "=[item]");
                params['@onselectmultipleimage'] = "(item)=>".concat(vmodel, "=item");
                params[':selectedImages'] = vmodel;
              } // add plugin


              context.x_state.plugins['vue-picture-input'] = {
                global: true,
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

            function func(_x55, _x56) {
              return _func27.apply(this, arguments);
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
            var _func28 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_date', node);

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  vmodel = vmodel.split(',').pop();
                  vmodel = vmodel.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$store', '$store.state.');
                }

                params['v-model'] = vmodel;
              } // add plugin


              context.x_state.npm['luxon'] = '*'; // for i18n support

              context.x_state.plugins['vue-datetime'] = {
                global: true,
                npm: {
                  'vue-datetime': '*'
                }
              };
              params.type = 'date'; // write output

              resp.open += context.tagParams('datetime', params, false) + '\n';
              resp.close = "</datetime>\n";
              return resp;
            });

            function func(_x57, _x58) {
              return _func28.apply(this, arguments);
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
            var _func29 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_form_field_datetime', node);

              if (node.text.trim() != '') {
                var vmodel = node.text.trim();

                if (node.text.contains('$')) {
                  vmodel = vmodel.split(',').pop();
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

            function func(_x59, _x60) {
              return _func29.apply(this, arguments);
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
            var _func30 = _asyncToGenerator(function* (node, state) {
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

            function func(_x61, _x62) {
              return _func30.apply(this, arguments);
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
            var _func31 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }); // parse attributes

              var params = {};
              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env').replaceAll('$store.', '$store.state.'); // query attributes

                if (key.toLowerCase() == 'props') {
                  for (var i of value.split(',')) {
                    params[i] = null;
                  }
                } else {
                  params[key] = value;
                }
              }); //

              resp.open += context.tagParams('v-container', params, false) + '\n';
              resp.close += '</v-container>\n'; //

              return resp;
            });

            function func(_x63, _x64) {
              return _func31.apply(this, arguments);
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
            var _func32 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id
              }; // process attributes

              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key];
                var keytest = key.toLowerCase().trim();
                var tvalue = value.toString().replaceAll('$variables', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$env.', 'process.env.').replaceAll('$store.', '$store.state.').trim();

                if (keytest == 'props') {
                  for (var i of tvalue.split(',')) {
                    params[i] = null;
                  }
                } else {
                  if (keytest.charAt(0) != ':' && value != '' && value != tvalue) {
                    params[':' + key.trim()] = tvalue;
                  } else {
                    params[key.trim()] = tvalue;
                  }
                }
              }.bind(this)); // write response

              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->\n");
              resp.open += context.tagParams('v-container', params, false) + '\n';
              resp.close = '</v-container>\n'; // return

              return resp;
            });

            function func(_x65, _x66) {
              return _func32.apply(this, arguments);
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
            var _func33 = _asyncToGenerator(function* (node, state) {
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
                  for (var i of tvalue.split(',')) {
                    params[i] = null;
                  }
                } else if ('padding,margen'.split(',').includes(keytest)) {
                  params['pa-' + tvalue] = null;
                } else if (keytest == 'ancho') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys$1("xs-".concat(numsize, ",sm-").concat(numsize, ",md-").concat(numsize, ",lg-").concat(numsize), null));
                } else if (keytest == 'offset') {
                  params = _objectSpread2(_objectSpread2({}, params), setObjectKeys$1("offset-xs-".concat(numsize, ",offset-sm-").concat(numsize, ",offset-md-").concat(numsize, ",offset-lg-").concat(numsize), null));
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

              resp.open += context.tagParams('v-flex', params, false) + '\n';
              resp.close = '</v-flex>\n'; // return

              return resp;
            });

            function func(_x67, _x68) {
              return _func33.apply(this, arguments);
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
            var _func34 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              resp.open += context.tagParams('v-spacer', {}, true) + '\n';
              return resp;
            });

            function func(_x69, _x70) {
              return _func34.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_progress': {
          x_icons: 'idea',
          x_text_contains: 'progres',
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
            var _func35 = _asyncToGenerator(function* (node, state) {
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

            function func(_x71, _x72) {
              return _func35.apply(this, arguments);
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
            var _func36 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_dialog', node); // write tag

              resp.open += context.tagParams('v-dialog', params, false) + '\n';
              resp.close += "</v-dialog>\n";
              return resp;
            });

            function func(_x73, _x74) {
              return _func36.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_center': {
          x_icons: 'idea',
          x_text_contains: 'centrar',
          hint: 'Centra nodos hijos',
          func: function () {
            var _func37 = _asyncToGenerator(function* (node, state) {
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

            function func(_x75, _x76) {
              return _func37.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_html': {
          x_icons: 'idea',
          x_text_contains: 'html:',
          hint: 'html:x, donde x es cualquier tag',
          func: function () {
            var _func38 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                refx: node.id
              }; // parse attributes

              Object.keys(node.attributes).map(function (key) {
                var value = node.attributes[key]; // preprocess value

                value = value.replaceAll('$variables.', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env').replaceAll('$store.', '$store.state.'); // query attributes

                if (key.toLowerCase() == 'props') {
                  for (var i of value.split(',')) {
                    params[i] = null;
                  }
                } else if (key.charAt(0) != ':' && value != node.attributes[key]) {
                  params[':' + key] = value;
                } else if (key != 'v-model') {
                  if (context.x_state.central_config.idiomas.indexOf(',') != -1) {
                    // value needs i18n keys
                    var def_lang = context.x_state.central_config.idiomas.split(',')[0];

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

            function func(_x77, _x78) {
              return _func38.apply(this, arguments);
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
            var _func39 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              }),
                  params = {
                class: []
              },
                  tmp = {};
              var text = node.text.replaceAll('$variables', '').replaceAll('$vars.', '').replaceAll('$params.', '').replaceAll('$config.', 'process.env.').replaceAll('$store.', '$store.state.');
              if (text == '') text = '&nbsp;'; // some extra validation

              if ((yield context.hasParentID(node.id, 'def_toolbar')) == true && (yield context.hasParentID(node.id, 'def_slot')) == false) {
                resp.valid = false;
              } else if ((yield context.hasParentID(node.id, 'def_variables')) == true) {
                resp.valid = false;
              } else if ((yield context.hasParentID(node.id, 'def_page_estilos')) == true) {
                resp.valid = false;
              } else if ((yield context.hasParentID(node.id, 'def_page_estilos')) == true) {
                resp.valid = false;
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

            function func(_x79, _x80) {
              return _func39.apply(this, arguments);
            }

            return func;
          }()
        },
        //..views..
        //*def_center
        //*def_html
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
            var _func40 = _asyncToGenerator(function* (node, state) {
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

            function func(_x81, _x82) {
              return _func40.apply(this, arguments);
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
            var _func41 = _asyncToGenerator(function* (node, state) {
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
                  }
                };

                if (params.scrollto.contains(',')) {
                  var element = params.scrollto.split(',')[0];
                  var offset = params.scrollto.split(',').pop().trim();
                  params['v-scroll-to'] = "{ element:'".concat(element, "', offset:").concat(offset, ", cancelable:false }");
                } else {
                  params['v-scroll-to'] = "{ element:'".concat(params.scrollto, "', cancelable:false }");
                }

                delete params.scrollto;
              } // re-map props latest version vuetify props to one used here


              if (params.text && params.text == null) {
                params.flat = null;
                delete params.text;
              }

              if (params.rounded && params.rounded == null) {
                params.round = null;
                delete params.rounded;
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
              resp.close += "</v-btn>\n";
              return resp;
            });

            function func(_x83, _x84) {
              return _func41.apply(this, arguments);
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
            var _func42 = _asyncToGenerator(function* (node, state) {
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
              return resp;
            });

            function func(_x85, _x86) {
              return _func42.apply(this, arguments);
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
            var _func43 = _asyncToGenerator(function* (node, state) {
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

            function func(_x87, _x88) {
              return _func43.apply(this, arguments);
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
            var _func44 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->");
              var params = aliases2params('def_barralateral', node); // special cases

              if (params.visible) {
                params['v-model'] = params.visible;
                delete params.visible;
              } // write tag


              resp.open += context.tagParams('v-navigation-drawer', params, false) + "\n";
              resp.close += "</v-navigation-drawer>\n";
              return resp;
            });

            function func(_x89, _x90) {
              return _func44.apply(this, arguments);
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
            var _func45 = _asyncToGenerator(function* (node, state) {
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

            function func(_x91, _x92) {
              return _func45.apply(this, arguments);
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
            var _func46 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "<!-- ".concat(node.text_note, " -->"); // write tag

              resp.open += context.tagParams('main', {}, false) + "\n";
              resp.open += context.tagParams('v-content', {}, false) + "\n";
              resp.close += "</v-content>\n";
              resp.close += "</main>\n";
              return resp;
            });

            function func(_x93, _x94) {
              return _func46.apply(this, arguments);
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
            var _func47 = _asyncToGenerator(function* (node, state) {
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


              resp.open += context.tagParams('v-toolbar', params, false) + "\n";

              if (tmp.icon && tmp.icon != '') {
                resp.open += "<v-toolbar-side-icon><v-icon>".concat(tmp.icon, "</v-icon></v-toolbar-side-icon>\n");
              } else if (tmp.icon && tmp.icon == '') {
                resp.open += "<v-toolbar-side-icon></<v-toolbar-side-icon>\n";
              }

              resp.close = "</v-toolbar>\n";
              return resp;
            });

            function func(_x95, _x96) {
              return _func47.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_toolbar_title': {
          x_level: '>3',
          x_empty: 'icons',
          x_all_hasparent: 'def_toolbar',
          hint: 'Titulo para nodo toolbar',
          func: function () {
            var _func48 = _asyncToGenerator(function* (node, state) {
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

            function func(_x97, _x98) {
              return _func48.apply(this, arguments);
            }

            return func;
          }()
        },
        //*def_contenido
        //*def_toolbar
        //*def_toolbar_title
        //def_layout_custom
        //def_divider
        //def_slot
        //def_div
        //def_agrupar
        //def_bloque
        //def_hover
        //def_tooltip
        //def_datatable
        //def_datatable_col
        //def_datatable_fila
        //def_datatable_headers
        //def_paginador	
        //def_sparkline
        //def_highcharts
        //def_trend
        //def_listado
        //def_listado_grupo
        //def_listado_dummy
        //def_listado_fila
        //def_listado_fila_accion
        //def_listado_fila_contenido
        //def_listado_fila_titulo
        //def_listado_fila_subtitulo
        //def_listado_fila_avatar
        //def_icono
        //def_animar
        //def_imagen
        //def_qrcode
        //def_analytics_evento
        //def_medianet_ad
        //def_mapa
        //def_youtube_playlist
        //def_youtube
        //def_script
        //def_event_server
        //def_event_mounted
        //def_event_method
        //def_event_element
        //def_condicion_view
        //def_otra_condicion_view
        //def_condicion (def_script_condicion)
        //def_otra_condicion (def_script_otra_condicion)
        // *************
        // 	 VARIABLES
        // *************
        'def_variables': {
          x_icons: 'xmag',
          x_level: 3,
          x_text_contains: 'variables',
          hint: 'Definicion local de variables observadas',
          func: function () {
            var _func49 = _asyncToGenerator(function* (node, state) {
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

            function func(_x99, _x100) {
              return _func49.apply(this, arguments);
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
            var _func50 = _asyncToGenerator(function* (node, state) {
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
                }

                resp.state.vars_types.push(tmp.type); // push new var type to vars_types

                context.x_state.pages[state.current_page].var_types[resp.state.vars_path.join('.')] = tmp.type;
                resp.state.vars_last_level = tmp.level;
              }

              return resp;
            });

            function func(_x101, _x102) {
              return _func50.apply(this, arguments);
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
            var _func51 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var params = {
                name: node.text.trim(),
                type: 'watched',
                oldvar: 'old',
                newvar: 'new',
                deep: false
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

              resp.open = context.tagParams('vue_watched_var', params, false);
              if (node.text_note != '') resp.open += "//".concat(node.text_note, "\n");
              resp.close = '</vue_watched_var>';
              return resp;
            });

            function func(_x103, _x104) {
              return _func51.apply(this, arguments);
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
            var _func52 = _asyncToGenerator(function* (node, state) {
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
                resp.open = context.tagParams('vue_async_computed', params, false);
                if (node.text_note != '') resp.open += "//".concat(node.text_note, "\n");
                resp.close = '</vue_async_computed>\n';
              } else {
                resp.open = context.tagParams('vue_computed', params, false);
                if (node.text_note != '') resp.open += "//".concat(node.text_note, "\n");
                resp.close = '</vue_computed>\n';
              } // return


              return resp;
            });

            function func(_x105, _x106) {
              return _func52.apply(this, arguments);
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
          x_text_contains: 'responder',
          x_not_text_contains: 'traducir,struct,extender',
          x_all_hasparent: 'def_variables',
          x_level: '>3',
          hint: 'Emite una respuesta para la variable de tipo funcion',
          func: function () {
            var _func53 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              if (node.text_note != '') resp.open = "//".concat(node.text_note, "\n");
              var text = context.dsl_parser.findVariables({
                text: node.text,
                symbol: "\"",
                symbol_closing: "\""
              }); // tests return types

              if (text.contains('**') && node.icons.includes('bell')) {
                var new_vars = getTranslatedTextVar(text);
                resp.open += "return ".concat(new_vars, ";\n");
              } else if (text.contains('$')) {
                text = text.replaceAll('$params', 'this.').replaceAll('$variables', 'this.');
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

            function func(_x107, _x108) {
              return _func53.apply(this, arguments);
            }

            return func;
          }()
        },
        'def_struct': {
          x_icons: 'desktop_new',
          x_text_contains: 'struct',
          x_not_text_contains: 'traducir',
          x_level: '>3',
          hint: 'Crea una variable de tipo Objeto, con los campos y valores definidos en sus atributos.',
          func: function () {
            var _func54 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              var tmp = {};

              if (node.text.contains(',')) {
                // parse output var
                tmp.var = node.text.split(',').pop(); //last comma element

                if (context.hasParentID(node.id, 'def_event_server')) {
                  tmp.var = tmp.var.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                  tmp.var = tmp.var == 'resp.' ? 'resp' : tmp.var;
                  tmp.parent_server = true;
                } else {
                  tmp.var = tmp.var.replaceAll('$variables.', 'this.').replaceAll('store.', 'this.$store.state.');
                  tmp.var = tmp.var == 'this.' ? 'this' : tmp.var;
                } // process attributes


                var attrs = _objectSpread2({}, node.attributes);

                Object.keys(node.attributes).map(function (key) {
                  var keytest = key.toLowerCase().trim();
                  var value = node.attributes[key].trim();

                  if (node.icons.includes('bell')) {
                    value = getTranslatedTextVar(value);
                  } else if (value.contains('assets:')) {
                    value = context.getAsset(value, 'jsfunc');
                  } else {
                    // normalize vue type vars
                    if (tmp.parent_server) {
                      value = value.replaceAll('$variables.', 'resp.').replaceAll('$vars.', 'resp.').replaceAll('$params.', 'resp.');
                    } else {
                      value = value.replaceAll('$variables.', 'this.').replaceAll('$vars.', 'this.').replaceAll('$params.', 'this.').replaceAll('$store.', 'this.$store.state.');
                    }
                  } // modify values to copy


                  attrs[key] = value;
                }); // write output

                if (node.text_note != '') resp.open = "// ".concat(node.text_note, "\n");
                resp.open += "var ".concat(tmp.var.trim(), " = ").concat(JSON.stringify(attrs), ";\n");
              } else {
                resp.valid = false;
              }

              return resp;
            });

            function func(_x109, _x110) {
              return _func54.apply(this, arguments);
            }

            return func;
          }()
        } //*def_responder (@todo i18n)
        //def_insertar_modelo
        //def_consultar_modelo
        //def_modificar_modelo
        //def_eliminar_modelo
        //def_consultar_web
        //def_consultar_web_upload
        //def_consultar_web_download
        //def_aftertime
        //*def_struct
        //def_extender
        //def_npm_instalar
        //def_agregar_campos
        //def_preguntar
        //def_array_transformar
        //def_procesar_imagen
        //def_imagen_exif
        //def_var_clonar
        //def_modificar
        //def_probar
        //def_event_try (def_probar_try)
        //def_literal_js
        //def_guardar_nota
        //def_console
        //def_xcada_registro
        //def_crear_id_unico
        //def_enviarpantalla
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
        yield _this.addCommands(internal_commands);

        _this.x_console.outT({
          message: "".concat(Object.keys(_this.x_commands).length, " local x_commands loaded!"),
          color: "green"
        }); //this.debug('x_commands',this.x_commands);


        _this.x_crypto_key = require('crypto').randomBytes(32); // for hash helper method
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
            'lang': 'client/lang/'
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
          var path = require('path');

          var copy = require('recursive-copy');

          _this.x_console.outT({
            message: "copying config:copiar directories to 'static' target folder",
            color: "yellow"
          });

          yield Object.keys(_this.x_state.config_node.copiar).map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(function* (key) {
              var abs = path.join(this.x_state.dirs.base, key);

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

          var _path = require('path');

          var source = _path.join(_this.x_state.dirs.base, _this.x_state.config_node['nuxt:icon']);

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
              var aws_bak = path.join(_this4.x_state.dirs.base, 'aws_backup.ini');

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

        var fs = require('fs').promises,
            path = require('path');

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
          var nodes = $("store_mutation");
          nodes.map(function (i, elem) {
            var cur = $(elem);
            var store = cur.attr('store') ? cur.attr('store') : '';
            var mutation = cur.attr('mutation') ? cur.attr('mutation') : '';
            var params = cur.attr('params') ? cur.attr('params') : '';
            var code = cur.text();

            if (self.x_state.stores[store] && !self.x_state.stores[store][':mutations']) {
              self.x_state.stores[store][':mutations'] = {};
            }

            self.x_state.stores[store][':mutations'][mutation] = {
              code,
              params
            };
          }.bind(self, $));
        } //internal_middleware.omit


        if (thefile.file == 'internal_middleware.omit') {
          _this7.debug('processing internal_middleware.omit');

          var _cheerio = require('cheerio');

          var _$ = _cheerio.load(thefile.code, {
            ignoreWhitespace: false,
            xmlMode: true,
            decodeEntities: false
          });

          var _nodes = _$("proxy_code");

          _nodes.map(function (i, elem) {
            var cur = _$(elem);

            var name = cur.attr('name') ? cur.attr('name') : '';
            self.x_state.proxies[name].code = cur.text().trim();
          }, self, _$);
        } //server.omit


        if (thefile.file == 'server.omit') {
          _this7.debug('processing server.omit');

          var _cheerio2 = require('cheerio');

          var _$2 = _cheerio2.load(thefile.code, {
            ignoreWhitespace: false,
            xmlMode: true,
            decodeEntities: false
          });

          var _nodes2 = _$2("func_code");

          _nodes2.map(function (i, elem) {
            var cur = _$2(elem);

            var name = cur.attr('name') ? cur.attr('name') : '';
            self.x_state.functions[name].code = cur.text().trim();
          }.bind(self, _$2));
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

            vue.script += "\tmiddleware: [".concat(page.proxies, "]");
            vue.first = true;
          } else if (page.proxies.trim() != '') {
            _this8.debug('- declare middlewares');

            vue.script += "\tmiddleware: '".concat(page.proxies, "'");
            vue.first = true;
          } // layout attr


          if (page.layout != '') {
            _this8.debug('- declare layout');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "\tlayout: '".concat(page.layout.trim(), "'");
          } // declare components


          if (page.components != '') {
            _this8.debug('- declare components');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "\tcomponents: {";
            var comps = [];
            Object.keys(page.components).map(function (key) {
              comps.push("\t\t".concat(key, ": ").concat(page.components[key]));
            }.bind(page, comps));
            vue.script += "".concat(comps.join(','), "\n\t}");
          } // declare directives


          if (page.directives != '') {
            _this8.debug('- declare directives');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "\tdirectives: {";
            var directs = [];
            Object.keys(page.directives).map(function (key) {
              if (key == page.directives[key]) {
                directs.push("\t\t".concat(key));
              } else {
                directs.push("\t\t".concat(key, ": ").concat(page.directives[key]));
              }
            }.bind(page, directs));
            vue.script += "".concat(directs.join(','), "\n\t}");
          } // declare props (if page tipo componente)


          if (page.tipo == 'componente' && page.params != '') {
            _this8.debug('- declare componente:props');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            var props = [];

            if (Object.keys(page.defaults) != '') {
              page.params.split(',').map(function (param) {
                var def_val = '';
                if (page.defaults[key]) def_val = page.defaults[key];

                if (def_val == true || def_val == 'true' || def_val == 'false' || def_val == false) {
                  props.push("".concat(key, ": { default: ").concat(def_val, "}"));
                } else if (!isNaN(+def_val)) {
                  //if def_val is number or string with number
                  props.push("".concat(key, ": { default: ").concat(def_val, "}"));
                } else if (def_val.indexOf('[') != -1 && def_val.indexOf(']') != -1) {
                  props.push("".concat(key, ": { type: Array, default: () => ").concat(def_val, "}"));
                } else if (def_val.indexOf('{') != -1 && def_val.indexOf('}') != -1) {
                  props.push("".concat(key, ": { type: Object, default: () => ").concat(def_val, "}"));
                } else if (def_val.indexOf("'") != -1) {
                  props.push("".concat(key, ": { default: ").concat(def_val, "}"));
                } else {
                  props.push("".concat(key, ": { default: '").concat(def_val, "' }"));
                }
              }.bind(page, props));
            } else {
              page.params.split(',').map(function (param) {
                props.push("'".concat(key, "'"));
              }.bind(props));
            }

            vue.script += "\tprops: {".concat(props.join(','), "}");
          } // declare meta data


          if (page.xtitle || page.meta.length > 0) {
            _this8.debug('- declare head() meta data');

            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += "\thead() {\n";
            vue.script += "\t\treturn {\n"; // define title

            if (page.xtitle) {
              if (_this8.x_state.central_config.idiomas.indexOf(',') != -1) {
                // i18n title
                var crc32 = "t_".concat(_this8.hash(page.xtitle));

                var def_lang = _this8.x_state.central_config.idiomas.indexOf(',')[0].trim().toLowerCase();

                if (!_this8.x_state.strings_i18n[def_lang]) {
                  _this8.x_state.strings_i18n[def_lang] = {};
                }

                _this8.x_state.strings_i18n[def_lang][crc32] = page.xtitle;
                vue.script += "\t\t\ttitleTemplate: this.$t('".concat(crc32, "')\n");
              } else {
                // normal title
                vue.script += "\t\t\ttitleTemplate: '".concat(page.xtitle, "'\n");
              }
            } // define meta SEO


            if (page.meta.length > 0) {
              if (page.xtitle) vue.script += ",";
              vue.script += "\t\t\tmeta: ".concat(JSON.stringify(page.meta), "\n");
            }

            vue.script += "\t\t};\n";
            vue.script += "\t}";
          } // declare variables (data)


          if (Object.keys(page.variables) != '') {
            _this8.debug('- declare data() variables');

            if (vue.first) vue.script += ',\n';
            vue.first = true;

            var util = require('util');

            vue.script += "\tdata() {\n";
            vue.script += "\t\treturn ".concat(util.inspect(page.variables, {
              depth: Infinity
            }), "\n");
            vue.script += "\t}\n";
          }
        }

        return vue;
      })();
    }

    processInternalTags(vue) {
      var _this9 = this;

      return _asyncToGenerator(function* () {
        //let $ = cheerio.load(vue.template, { ignoreWhitespace: false, xmlMode:true, decodeEntities:false });

        /*
        this.debug('post-processing server_asyncdata tag');
        let nodes = $(`server_asyncdata`);
        if (nodes.length>0 && vue.first) vue.script += ',\n'; vue.first = true;
        nodes.map(function(i,elem) {
        	let cur = $(elem);
        	let name = cur.attr('return')?cur.attr('return'):'';
        	vue.script += `\tasync asyncData({ req, res, params }) {\n`;
        	vue.script += `\t\tif (!process.server) { const req={}, res={}; }\n`;
        	vue.script += `\t\t${cur.text()}`;
        	vue.script += `\t\treturn ${name};\n`;
        	vue.script += `\t}\n`;
        	vue.template = vue.template.replace(cur.html(),'');
        }.bind($,vue));
        // process ?mounted event
        this.debug('post-processing vue_mounted tag');
        nodes = $(`vue_mounted`);
        if (nodes.length>0 && vue.first) vue.script += ',\n'; vue.first = true;
        if (nodes.length>0) vue.script += `\tasync mounted() {\n`;
        nodes.map(function(i,elem) {
        	let cur = $(elem);
        	let code = cur.text();
        	vue.script += `\t\t${code}`;
        	vue.template = vue.template.replace(cur.parent().html(),''); //@TODO check its getting the whole html of the cur tag
        }.bind($,vue));
        if (nodes.length>0) vue.script += `\t}\n`;
        */
        // process ?var (vue_computed)

        /* */
        var cheerio = require('cheerio');

        var $ = cheerio.load(vue.template, {
          ignoreWhitespace: false,
          xmlMode: true,
          decodeEntities: false
        });

        _this9.debug('post-processing vue_computed tag');

        var nodes = $('vue\_computed[name]').toArray(); //this.debug('nodes',nodes);

        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += "\tcomputed: {\n";
        var computed = [];
        nodes.map(function (elem) {
          var cur = $(elem);
          var name = cur.attr('name');
          var code = cur.html();
          var tmp = '';
          tmp += "\t\t".concat(name, "() {\n");
          tmp += '\t\t\t' + code;
          tmp += "\t\t}";
          computed.push(tmp);
          cur.remove();
        }); //.bind(vue,computed,self)

        vue.template = $.html();
        vue.script += computed.join(',');
        if (nodes.length > 0) vue.script += "\t}\n";
        /* */

        return vue;
      })();
    } //Transforms the processed nodes into files.


    onCreateFiles(processedNodes) {
      var _this10 = this;

      return _asyncToGenerator(function* () {
        //this.x_console.out({ message:'onCreateFiles', data:processedNodes });
        //this.x_console.out({ message:'x_state', data:this.x_state });
        yield _this10.generalConfigSetup();
        yield _this10.createGitIgnore();

        _this10.debug('processing nodes');

        yield processedNodes.map( /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(function* (thefile) {
            var contenido = thefile.code + '\n';

            if (thefile.file.split('.').slice(-1) == 'omit') {
              yield this.processOmitFile(thefile); //process special non 'files'
            } else {
              this.debug('processing node ' + thefile.title);
              var vue = yield this.getBasicVue(thefile);
              var page = this.x_state.pages[thefile.title]; // @TODO check the vue.template replacements (8-mar-21)
              // declare server:asyncData

              this.debug('post-processing internal custom tags');
              vue = yield this.processInternalTags(vue); // closure ...
              // **** **** start script wrap **** **** **** **** 

              var script_start = '';
              script_start = "<script>\n{concepto:import:mixins}"; // header for imports

              if (page) {
                Object.keys(page.imports).map(function (key) {
                  script_start += "import ".concat(page.imports[key], " from '").concat(key, "'\n");
                }.bind(page, vue));
              } // export default


              script_start += "export default {\n";
              vue.script = script_start + vue.script;
              vue.script += "}"; // close export default
              // **** **** end script wrap **** **** 

              this.x_console.out({
                message: 'vue test',
                data: vue
              });
            } //this.x_console.out({ message:'pages debug', data:this.x_state.pages });

          });

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }().bind(_this10));
      })();
    } // ************************
    // INTERNAL HELPER METHODS 
    // ************************

    /*
    * Returns true if a local server is running on the DSL defined port
    */


    _isLocalServerRunning() {
      var _this11 = this;

      return _asyncToGenerator(function* () {
        var is_reachable = require('is-port-reachable');

        var resp = yield is_reachable(_this11.x_state.central_config.port);
        return resp;
      })();
    }
    /*
    * Reads the node called modelos and creates tables definitions and managing code (alias:database).
    */


    _readModelos() {
      var _this12 = this;

      return _asyncToGenerator(function* () {
        // @IDEA this method could return the insert/update/delete/select 'function code generators'
        _this12.debug('_readModelos');

        _this12.debug_time({
          id: 'readModelos'
        });

        var modelos = yield _this12.dsl_parser.getNodes({
          text: 'modelos',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true	

        var tmp = {
          appname: _this12.x_state.config_node.name
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

        _this12.debug_timeEnd({
          id: 'readModelos'
        }); // install alaSQL plugin and define tables


        if (resp.length > 0) {
          // get tables sql create
          var ala_create = [];

          for (var _table in resp.tables) {
            ala_create.push("alasqlJs('".concat(resp.tables[_table].sql, "');"));
          } // set custom install code


          var ala_custom = "const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t".concat(ala_create.join('\n'), "\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}"); // set plugin info in state

          _this12.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
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
      var _this13 = this;

      return _asyncToGenerator(function* () {
        var resp = {},
            path = require('path');

        _this13.debug('_readAssets');

        _this13.debug_time({
          id: '_readAssets'
        });

        var assets = yield _this13.dsl_parser.getNodes({
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
              var _key2 = child.text.toLowerCase();

              resp[_key2] = {
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

                  resp[_key2].i18n_keys.push(lang);

                  resp[_key2][lang] = {
                    original: i18n_node.image,
                    css: '~assets' + sep + path.basename(i18n_node.image),
                    js: '~' + sep + 'assets' + sep + path.basename(i18n_node.image)
                  };
                }
              } // transform i18n_keys to list


              resp[_key2].i18n_keys = resp[_key2].i18n_keys.join(',');
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

        _this13.debug_timeEnd({
          id: '_readAssets'
        });

        return resp;
      })();
    }
    /* 
    * Grabs central node configuration information
    */


    _readCentralConfig() {
      var _this14 = this;

      return _asyncToGenerator(function* () {
        _this14.debug('_readCentralConfig');

        var central = yield _this14.dsl_parser.getNodes({
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
          ':cache': _this14.x_config.cache,
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

        if (!resp[':cache']) _this14.x_config.cache = false; // disables cache when processing nodes (@todo)
        // return

        return resp;
      })();
    }
    /*
    * Grabs the configuration from node named 'config'
    */


    _readConfig() {
      var _this15 = this;

      return _asyncToGenerator(function* () {
        _this15.debug('_readConfig');

        var resp = {
          id: '',
          meta: [],
          seo: {},
          secrets: {}
        },
            config_node = {};
        var search = yield _this15.dsl_parser.getNodes({
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

          for (var _key3 of config_node.nodes) {
            if (_key3.text.toLowerCase() == 'meta') {
              for (var meta_child of _key3.nodes) {
                // apply grand_childs as meta tags
                if (meta_child.text.toLowerCase() == 'keywords') {
                  resp.seo['keywords'] = meta_child.nodes.map(x => x.text);
                  resp.meta.push({
                    hid: _this15.hash(meta_child.nodes[0].text),
                    name: 'keywords',
                    content: resp.seo['keywords'].join(',')
                  });
                } else if (meta_child.text.toLowerCase() == 'language') {
                  resp.seo['language'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    hid: _this15.hash(meta_child.nodes[0].text),
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
                      hid: _this15.hash(meta_child.nodes[0].text),
                      name: meta_child.text,
                      content: meta_child.nodes[0].text
                    });
                  }
                } //

              }
            } else {
              // apply keys as config keys (standard config node by content types)
              if (Object.keys(_key3.attributes).length > 0) {
                // prepare config key
                var config_key = _key3.text.toLowerCase().replace(/ /g, '');

                var values = _objectSpread2({}, _key3.attributes);
                /*key.attributes.map(function(x) {
                	values = {...values,...x};
                });*/


                resp[config_key] = values; // mark secret status true if contains 'password' icon

                if (_key3.icons.includes('password')) resp[config_key][':secret'] = true; // add link attribute if defined

                if (_key3.link != '') resp[config_key][':link'] = _key3.link;
              } else if (_key3.nodes.length > 0) {
                resp[_key3.text] = _key3.nodes[0].text;
              } else if (_key3.link != '') {
                resp[_key3.text] = _key3.link;
              } //

            }
          }
        } // assign dsl file folder name+filename if node.name is not given


        if (!resp.name) {
          var path = require('path');

          var dsl_folder = path.dirname(path.resolve(_this15.x_flags.dsl));
          var parent_folder = path.resolve(dsl_folder, '../');
          var folder = dsl_folder.replace(parent_folder, '');
          resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(_this15.x_flags.dsl, '.dsl'); //console.log('folder:',{folder,name:resp.name});
          //this.x_flags.dsl
        } // create id if not given


        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
      })();
    }

    getParentNodes() {
      var _arguments = arguments,
          _this16 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this16.throwIfMissing('id');
        var exec = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : false;
        var parents = yield _this16.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this16.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var command = yield _this16.findValidCommand({
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


      for (var [_key4, value] of Object.entries(tmp)) {
        if (value === null) {
          resp.push(_key4);
        } else if (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined') {
          resp.push("".concat(_key4, "='").concat(value, "'"));
        }
      }

      return resp.join(' ');
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
    } // atLeastNode


    atLeastNode(r) {
      var n = process.versions.node.split('.').map(x => parseInt(x, 10));
      r = r.split('.').map(x => parseInt(x, 10));
      return n[0] > r[0] || n[0] === r[0] && (n[1] > r[1] || n[1] === r[1] && n[2] >= r[2]);
    }

  }

  return vue_dsl;

})));

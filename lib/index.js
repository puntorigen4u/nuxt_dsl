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

      this.x_time_stats = {};
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
    * Gets automatically executed after parsing all nodes of the given dsl (before onCompleteCodeTemplate)
    * @async
    * @param 	{Array}		processedNodes		- reply content of writer method
    * @return 	{NodeDSL[]}
    */
    //@TODO rename to onAfterWriter (or onAfterProcess) later 4-ago-20


    onAfterWritten(processedNodes) {
      return _asyncToGenerator(function* () {
        return processedNodes;
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
    * @param 	{NodeDSL[]}		processedNodes		- array of nodes already processed before writing them to disk
    * @return 	{NodeDSL[]}
    */


    onCompleteCodeTemplate(processedNodes) {
      return _asyncToGenerator(function* () {
        return processedNodes;
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
    * @param 	{NodeDSL[]}		processedNodes		- array of nodes already processed ready to be written to disk
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
        var node = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this3.throwIfMissing('node');
        var justone = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
        if (!_this3.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        var resp = _objectSpread2(_objectSpread2({}, _this3.reply_template()), {
          id: 'not_found',
          hint: 'failover command'
        }),
            xtest = [];

        var keys = 'x_icons,x_not_icons,x_not_empty,x_not_text_contains,x_empty,x_text_starts,x_text_contains,x_level,x_or_hasparent,x_all_hasparent,x_or_isparent';
        var command_requires = setObjectKeys(keys, '');

        var node_features = _objectSpread2({}, command_requires);

        var command_defaults = _objectSpread2({}, command_requires);

        var def_matched = setObjectKeys(keys, true);

        var matched = _objectSpread2({}, def_matched);

        _this3.debug("findCommand for node ID ".concat(node.id)); // iterate through commands


        for (var key in _this3.x_commands) {
          var comm_keys = Object.keys(_this3.x_commands[key]); // reset defaults for current command

          matched = _objectSpread2({}, def_matched); // build template for used keys

          command_requires = _objectSpread2(_objectSpread2({}, command_defaults), _this3.x_commands[key]);
          delete command_requires.func; // test command features vs node features
          // test 1: icon match

          _this3.debug_time({
            id: "".concat(key, " x_icons")
          }); //if (this.x_config.debug) this.x_console.time({ id:`${key} x_icons` });


          if (command_requires['x_icons'] != '') {
            for (var qi of command_requires.x_icons.split(',')) {
              matched.x_icons = node.icons.includes(qi) ? true : false;
              if (!matched.x_icons) break; //await setImmediatePromise();
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_icons")
          }); //if (this.x_config.debug) this.x_console.timeEnd({ id:`${key} x_icons` });
          // test 2: x_not_icons


          _this3.debug_time({
            id: "".concat(key, " x_not_icons")
          });

          if (matched.x_icons && command_requires['x_not_icons'] != '') {
            // special case first
            if (node.icons.length > 0 && command_requires['x_not_icons'] != '' && ['*'].includes(command_requires['x_not_icons'])) {
              matched.x_not_icons = false;
            } else if (command_requires['x_not_icons'] != '') {
              // if node has any icons of the x_not_icons, return false aka intersect values, and if any assign false.
              matched.x_not_icons = _this3.array_intersect(command_requires['x_not_icons'].split(','), node.icons).length > 0 ? false : true;
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_not_icons")
          }); // test 3: x_not_empty. example: attributes[event,name] aka key[value1||value2] in node
          // supports multiple requirements using + as delimiter "attributes[event,name]+color"


          _this3.debug_time({
            id: "".concat(key, " x_not_empty")
          });

          if (command_requires['x_not_empty'] != '' && allTrue(matched, keys)) {
            //this.debug(`test x_not_empty: ${command_requires['x_not_empty']}`);
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
                      Object.keys(obj).filter(x => has_keys.push(x));
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
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_not_empty")
          }); // test 4: x_not_text_contains
          // can have multiple values.. ex: margen,arriba


          _this3.debug_time({
            id: "".concat(key, " x_not_text_contains")
          });

          if (command_requires['x_not_text_contains'] != '' && allTrue(matched, keys)) {
            for (var word of command_requires['x_not_text_contains'].split(',')) {
              if (node.text.indexOf(word) != -1) {
                matched.x_not_text_contains = false;
                break;
              }
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_not_text_contains")
          }); // test 5: x_empty (node keys that must be empty (undefined also means not empty))


          _this3.debug_time({
            id: "".concat(key, " x_empty")
          });

          if (command_requires['x_empty'] != '' && allTrue(matched, keys)) {
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
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_empty")
          }); // test 6: x_text_contains


          _this3.debug_time({
            id: "".concat(key, " x_text_contains")
          });

          if (allTrue(matched, keys) && command_requires['x_text_contains'] != '') {
            // @TODO here we are
            if (command_requires['x_text_contains'].indexOf('|') != -1) {
              // 'or' delimiter
              matched.x_text_contains = false;

              for (var _key2 of command_requires['x_text_contains'].split('|')) {
                if (node.text.indexOf(_key2) != -1) {
                  matched.x_text_contains = true;
                  break;
                }
              }
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
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_text_contains")
          }); // test 7: x_level - example: '2,3,4' (any) or '>2,<7' (all)


          _this3.debug_time({
            id: "".concat(key, " x_level")
          });

          if (command_requires['x_level'] != '' && allTrue(matched, keys)) {
            matched.x_level = numberInCondition(node.level, command_requires['x_level']);
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_level")
          }); // test 8: x_or_hasparent (currently mockup logic)


          _this3.debug_time({
            id: "".concat(key, " x_or_hasparent")
          });

          if (command_requires['x_or_hasparent'] != '' && allTrue(matched, keys)) {
            // @TODO need to create hasParentID method
            matched.x_or_hasparent = false;

            var _test = yield _this3.hasParentID(node.id, command_requires['x_or_hasparent']);

            if (_test) {
              matched.x_or_hasparent = true;
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_or_hasparent")
          }); // test 9: x_all_hasparent (currently mockup logic)


          _this3.debug_time({
            id: "".concat(key, " x_all_hasparent")
          });

          if (command_requires['x_all_hasparent'] != '' && allTrue(matched, keys)) {
            // @TODO need to create hasParentID method
            for (var _key4 of command_requires['x_all_hasparent'].split(',')) {
              var _test2 = yield _this3.hasParentID(node.id, _key4);

              if (!_test2) {
                matched.x_all_hasparent = false;
                break;
              }
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_all_hasparent")
          }); // test 10: x_or_isparent (currently mockup logic)


          _this3.debug_time({
            id: "".concat(key, " x_or_isparent")
          });

          if (command_requires['x_or_isparent'] != '' && allTrue(matched, keys)) {
            // @TODO need to create isExactParentID method
            matched.x_or_isparent = false;

            for (var _key5 of command_requires['x_or_isparent'].split(',')) {
              var _test3 = yield _this3.isExactParentID(node.id, _key5);

              if (!_test3) {
                matched.x_or_isparent = true;
                break;
              }
            }
          }

          _this3.debug_timeEnd({
            id: "".concat(key, " x_or_isparent")
          }); // ***************************
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
          } //console.log(`${node.text}: ${key} command_requires`,command_requires);
          //console.log(`${node.text}: matched`,matched);
          //await setImmediatePromise();

        } // sort by priority


        _this3.debug_time({
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

        _this3.debug_timeEnd({
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
        var node = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : _this4.throwIfMissing('node');
        var object = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : false;
        var x_command_shared_state = _arguments2.length > 2 && _arguments2[2] !== undefined ? _arguments2[2] : {};
        if (!_this4.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        _this4.debug({
          message: "findValidCommand called for node ".concat(node.id, ", level:").concat(node.level, ", text:").concat(node.text),
          color: 'yellow'
        });

        var commands_ = yield _this4.findCommand(node, false),
            reply = {}; // @TODO debug and test

        if (commands_.length == 0) {
          _this4.debug({
            message: 'findValidCommand: no command found.',
            color: 'red'
          });
        } else if (commands_.length == 1) {
          reply = commands_[0]; // try executing the node on the found commands_

          try {
            var test = yield _this4.x_commands[reply.x_id].func(node, x_command_shared_state);
            reply.exec = test; // @TODO test if _f4e is used; because its ugly

            reply._f4e = commands_[0].x_id;

            _this4.debug({
              message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
              color: 'green'
            });
          } catch (test_err) {
            _this4.debug({
              message: "findValidCommand: 1/1 applying command ".concat(commands_[0].x_id, " ... ERROR! (nodeid:").concat(node.id, ")"),
              color: 'red'
            }); // @TODO emit('internal_error','findValidCommand')


            reply.error = true;
            reply.valid = false;
            reply.catch = test_err; // @TODO we should throw an error, so our parents catch it (9-AGO-20)
          }
        } else {
          // more than one command found
          _this4.debug({
            message: "findValidCommand: ".concat(commands_.length, " commands found: (nodeid:").concat(node.id, ")"),
            color: 'green'
          }); // test each command


          for (var qm_index in commands_) {
            var qm = commands_[qm_index];

            try {
              var _test4 = yield _this4.x_commands[qm.x_id].func(node, x_command_shared_state);

              if (_test4.valid) {
                _this4.debug({
                  message: "findValidCommand: ".concat(parseInt(qm_index) + 1, "/").concat(commands_.length, " testing command ").concat(qm.x_id, " ... VALID MATCH FOUND! (nodeid:").concat(node.id, ")"),
                  color: 'green'
                });

                _this4.debug({
                  message: '---------------------',
                  time: false
                });

                if (object) {
                  reply = _test4;
                } else {
                  // @TODO test if _f4e is used; because its ugly
                  reply = qm;
                  reply.exec = _test4;
                  reply._f4e = qm.x_id;
                }

                break;
              }
            } catch (test_err1) {
              _this4.debug({
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

        _this5.x_console.outT({
          prefix: 'process,yellow',
          message: "parsing raw nodes ..",
          color: 'cyan'
        });

        var x_dsl_nodes = yield _this5.dsl_parser.getNodes({
          level: '2',
          nodes_raw: true
        });
        var resp = {}; //

        _this5.debug_timeEnd({
          id: 'process/writer'
        });

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
      var _this6 = this;

      return _asyncToGenerator(function* () {
        var fs = require('fs').promises;

        _this6.debug('_appFolders');

        var path = require('path');

        var dsl_folder = path.dirname(path.resolve(_this6.x_flags.dsl));
        if (output_dir) dsl_folder = output_dir;
        var resp = {
          base: dsl_folder,
          src: dsl_folder + path.sep + _this6.x_state.central_config.apptitle + path.sep
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
      if (this.x_config.debug && arguments.length > 0) {
        this.x_console.time(_objectSpread2({}, arguments[0]));
      }
    }
    /**
    * Helper method for measuring (end) time in ms from the call of debug_time() method.
    * @param 	{string}		id		- id key used in the call for debug_time() method.
    */


    debug_timeEnd() {
      if (this.x_config.debug && arguments.length > 0) {
        this.x_console.timeEnd(_objectSpread2(_objectSpread2({}, {
          color: 'dim',
          prefix: 'debug,dim'
        }), arguments[0]));
      }
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
          _this7 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments3.length > 0 && _arguments3[0] !== undefined ? _arguments3[0] : _this7.throwIfMissing('id');
        var x_id = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : _this7.throwIfMissing('x_id');
        // @TODO test it after having 'real' commands on some parser 3-ago-20
        var brother_ids = yield _this7.dsl_parser.getBrotherNodesIDs({
          id,
          before: true,
          after: true
        }).split(',');
        var brother_x_ids = [],
            resp = false;

        for (var q of brother_ids) {
          var node = yield _this7.dsl_parser.getNode({
            id: q,
            recurse: false
          });
          var command = yield findValidCommand(node);
          brother_x_ids.push(command.x_id);
          if (brother_x_ids.includes(x_id)) return true;
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
          _this8 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments4.length > 0 && _arguments4[0] !== undefined ? _arguments4[0] : _this8.throwIfMissing('id');
        var brother_ids = yield _this8.dsl_parser.getBrotherNodesIDs({
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
          _this9 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments5.length > 0 && _arguments5[0] !== undefined ? _arguments5[0] : _this9.throwIfMissing('id');
        var brother_ids = yield _this9.dsl_parser.getBrotherNodesIDs({
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
          _this10 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments6.length > 0 && _arguments6[0] !== undefined ? _arguments6[0] : _this10.throwIfMissing('id');
        var x_id = _arguments6.length > 1 && _arguments6[1] !== undefined ? _arguments6[1] : _this10.throwIfMissing('x_id');
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var parent_node = yield _this10.dsl_parser.getParentNode({
          id
        });
        var parent_command = yield _this10.findValidCommand(parent_node);

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
          _this11 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments7.length > 0 && _arguments7[0] !== undefined ? _arguments7[0] : _this11.throwIfMissing('id');
        var x_id = _arguments7.length > 1 && _arguments7[1] !== undefined ? _arguments7[1] : _this11.throwIfMissing('x_id');
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var x_ids = x_id.split(',');
        var parents = yield _this11.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });

        for (var parent_id of parents) {
          var node = yield _this11.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var command = yield _this11.findValidCommand(node);

          if (command && x_ids.includes(command.x_id)) {
            return true;
          }
        }

        return false;
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
          _this12 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments8.length > 0 && _arguments8[0] !== undefined ? _arguments8[0] : _this12.throwIfMissing('id');
        var array = _arguments8.length > 1 && _arguments8[1] !== undefined ? _arguments8[1] : false;
        // @TODO test it after having 'real' commands on some parser 4-ago-20
        var parents = yield _this12.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this12.dsl_parser.getNode({
            parent_id,
            recurse: false
          });
          var command = yield _this12.findValidCommand(node);

          if (command && array) {
            resp.push({
              id: parent_id,
              x_id: command.x_id
            });
          } else {
            resp.push(command.x_id);
          }
        }

        if (array) return resp;
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
          _this13 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments9.length > 0 && _arguments9[0] !== undefined ? _arguments9[0] : _this13.throwIfMissing('id');
        return yield _this13.getParentIDs(id, true);
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
          _this14 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments10.length > 0 && _arguments10[0] !== undefined ? _arguments10[0] : _this14.throwIfMissing('id');
        // this is only used in ti.cfc: def_textonly (just for back-compatibility in case needed);
        // @deprecated 4-ago-2020
        var parents = yield _this14.getParentIDs(id, true);
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

    if (!isNaN(test) && test == parseInt(test)) ; else if (test.indexOf('>') != -1 || test.indexOf('<') != -1) {
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
              if (context.x_state.stores && !node.text in context.x_state.stores) context.x_state.stores[node.text] = {}; //@TODO evaluate if we should change the format for node.attributes within dsl_parser, instead of doing this each time.
              // parse attributes

              var attr = {};
              key.attributes.map(function (x) {
                attr = _objectSpread2(_objectSpread2({}, attr), x);
              });
              Object.keys(attr).map(function (keym) {
                var key = keym.toLowerCase();

                if ([':type', 'type', 'tipo', ':tipo'].includes(key)) {
                  // store type value
                  if (['sesion', 'session'].includes(attr[key])) {
                    tmp.type = 'session';
                    context.x_state.npm['nuxt-vuex-localstorage'] = '*'; // add npm to app package
                  } else if (['local', 'persistent', 'persistente', 'localstorage', 'storage', 'db', 'bd'].includes(attr[key])) {
                    tmp.type = 'local';
                    context.x_state.npm['nuxt-vuex-localstorage'] = '*';
                  }
                } else if (['version', ':version'].includes(key)) {
                  tmp.version = attr[key];
                } else if (['expire', ':expire', 'expira', ':expira'].includes(key)) {
                  tmp.expire = attr[key];
                } //

              }); // set store type, version and expire attributes for app state

              if (!context.x_state.stores_types) context.x_state.stores_types = {
                versions: {},
                expires: {}
              }; // prepare stores_type, and keys local or session. 

              if (context.x_state.stores_types && !tmp.type in context.x_state.stores_types) context.x_state.stores_types[tmp.type] = {};
              if (!resp.state.current_store in context.x_state.stores_types[tmp.type]) context.x_state.stores_types[tmp.type][resp.state.current_store] = {}; // set version value

              if (tmp.version != '') {
                if (!resp.state.current_store in context.x_state.stores_types['versions']) context.x_state.stores_types['versions'][resp.state.current_store] = {};
              } // set expire value


              if (tmp.version != '') {
                if (!resp.state.current_store in context.x_state.stores_types['expires']) context.x_state.stores_types['expires'][resp.state.current_store] = {};
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
        'def_center': {
          x_icons: 'idea',
          x_text_contains: 'center',
          hint: 'Centra nodos hijos',
          func: function () {
            var _func8 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              return resp;
            });

            function func(_x16, _x17) {
              return _func8.apply(this, arguments);
            }

            return func;
          }()
        },
        //def_html y otros
        'def_page': {
          x_level: '2',
          x_not_icons: 'button_cancel,desktop_new,list,help',
          x_not_text_contains: 'componente:,layout:',
          hint: 'Archivo vue',
          func: function () {
            var _func9 = _asyncToGenerator(function* (node, state) {
              var resp = context.reply_template({
                state
              });
              return resp;
            });

            function func(_x18, _x19) {
              return _func9.apply(this, arguments);
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
            var _func10 = _asyncToGenerator(function* (node, state) {
              return context.reply_template({
                otro: 'Pablo',
                state
              });
            });

            function func(_x20, _x21) {
              return _func10.apply(this, arguments);
            }

            return func;
          }()
        }
      };
    });
    return _ref.apply(this, arguments);
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
          current_proxy: ''
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
      var _this2 = this;

      return _asyncToGenerator(function* () {
        if (!_this2.x_state.central_config.componente) {
          var ini = require('ini'),
              path = require('path'),
              fs = require('fs').promises;

          if (_this2.x_state.config_node.aws) ; else {
            // if DSL doesnt define AWS credentials, read them from system if they exist
            var aws_ini_file = path.join(os.homedir(), '/.aws/') + 'credentials';

            try {
              _this2.debug('trying to read AWS credentials:', aws_ini_file);

              var aws_ini = fs.readFile(aws_ini_file, 'utf-8');

              _this2.debug('AWS credentials:', aws_ini);
            } catch (err_reading) {}
          }
        }
      })();
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
    // *****************************************************************************
    // ADVANCED PROCESSING METHODS (@TODO move to Concepto Class after testing it)
    // *****************************************************************************

    /**
    * This method traverses the dsl parsed tree, finds/execute x_commands and generated code as files.
    * @return 	{Object}
    */


    process() {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        if (!_this3.x_flags.init_ok) throw new Error('error! the first called method must be init()!');

        _this3.debug_time({
          id: 'process/writer'
        });

        var resp = {
          nodes: []
        }; // read nodes

        _this3.x_console.outT({
          prefix: 'process,yellow',
          message: "parsing raw nodes ..",
          color: 'cyan'
        });

        var x_dsl_nodes = yield _this3.dsl_parser.getNodes({
          level: 2,
          nodes_raw: true
        }); // 

        for (var level2 of x_dsl_nodes) {
          var node = {
            id: level2.id,
            name: yield _this3.onDefineNodeName(level2),
            file: yield _this3.onDefineFilename(level2),
            init: '',
            title: yield _this3.onDefineTitle(level2),
            attributes: level2.attributes,
            code: '',
            open: '',
            close: '',
            x_ids: [],
            subnodes: level2.nodes_raw.length
          }; //this.debug('node',node);

          _this3.x_console.outT({
            prefix: 'process,yellow',
            message: "processing node ".concat(node.title, " .."),
            color: 'yellow'
          }); // find x_command and append .open code to node.code, and then .close to node.code at the end.


          var main = yield _this3.process_node({
            node: level2,
            add_main_keys: node
          });
          resp.nodes.push(main);
          /*try {
          	let main = await this.findValidCommand(level2);
          	if (main) {
          		node.init += main.exec.init;
          		node.code += main.exec.open;
          	}
          }
          if (main && main.hasChildren) {
          	this.debug('level2 (main) found match',main);
          	for (let level3 of level2.nodes_raw) {
          		let child = await this.process_node(level3);
          		if (!child.error && child.hasChildren) {
          			for (let level4 of child.nodes_raw) {
          				let child = await this.process_node(level4);
          				}
          		}
          		//let search = this.findValidCommand()
          	}
          }*/
        }

        _this3.debug_timeEnd({
          id: 'process/writer'
        });

        _this3.debug('process resp says:', resp);

        return resp;
      })();
    } // **************************
    // 	Helper Methods
    // **************************
    // improved in my imagination ...


    process_node() {
      var _arguments = arguments,
          _this4 = this;

      return _asyncToGenerator(function* () {
        var {
          node,
          add_main_keys,
          custom_state = {}
        } = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
        var resp = {
          state: custom_state
        };

        if (typeof add_main_keys === 'object') {
          resp = _objectSpread2(_objectSpread2({}, resp), add_main_keys);
          resp.children = [];
        }

        try {
          var test = yield _this4.findValidCommand(node, false, custom_state);
          console.log("test para node: text:".concat(node.text), test);

          if (test && test.exec) {
            resp = _objectSpread2(_objectSpread2({}, resp), test.exec);
            resp.error = false;
            if (typeof add_main_keys !== 'object') resp.init += resp.init;
            resp.code += resp.open;

            if (resp.hasChildren) {
              var sub_nodes = yield node.getNodes();

              for (var e_child of sub_nodes) {
                if ('id' in e_child) {
                  var node_test = yield _this4.dsl_parser.getNode({
                    id: e_child.id,
                    nodes_raw: true,
                    recurse: false
                  });

                  if (node_test) {
                    var new_state = _objectSpread2({}, custom_state);

                    if (test.state) new_state = test.state; // inherint state from last command if defined

                    var child = yield _this4.process_node({
                      node: node_test,
                      custom_state: new_state
                    });

                    if (child && child.exec && !child.error && resp.children) {
                      resp.children.push(child);
                    } else if (child.error) {
                      // break current loop
                      break;
                    }
                  }
                }
              }
            }

            resp.code += resp.close;
          } else {
            _this4.x_console.outT({
              message: 'error: FATAL, no method found for node processing.',
              data: {
                id: node.id,
                level: node.level,
                text: node.text
              }
            });

            yield _this4.onErrors(["No method found for given node id ".concat(node.id, ", text: ").concat(node.text, " ")]);
            resp.valid = false, resp.hasChildren = false, resp.error = true;
          }
        } catch (err) {
          // @TODO currently findValidCommand doesn't throw an error when an error is found.
          _this4.x_console.outT({
            message: "error: Executing func x_command for node: id:".concat(node.id, ", level ").concat(node.level, ", text: ").concat(node.text, "."),
            data: {
              id: node.id,
              level: node.level,
              text: node.text,
              error: err
            }
          });

          yield _this4.onErrors(["Error executing func for x_command for node id ".concat(node.id, ", text: ").concat(node.text, " ")]);
          resp.valid = false, resp.hasChildren = false, resp.error = true;
        } // return


        return resp;
      })();
    }
    /*
    * Returns true if a local server is running on the DSL defined port
    */


    _isLocalServerRunning() {
      var _this5 = this;

      return _asyncToGenerator(function* () {
        var is_reachable = require('is-port-reachable');

        var resp = yield is_reachable(_this5.x_state.central_config.port);
        return resp;
      })();
    }
    /*
    * Reads the node called modelos and creates tables definitions and managing code (alias:database).
    */


    _readModelos() {
      var _this6 = this;

      return _asyncToGenerator(function* () {
        // @IDEA this method could return the insert/update/delete/select 'function code generators'
        _this6.debug('_readModelos');

        _this6.debug_time({
          id: 'readModelos'
        });

        var modelos = yield _this6.dsl_parser.getNodes({
          text: 'modelos',
          level: 2,
          icon: 'desktop_new',
          recurse: true
        }); //nodes_raw:true	

        var tmp = {
          appname: _this6.x_state.config_node.name
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

          var _loop2 = function _loop2(table) {
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
            _loop2(table);
          }
        }

        _this6.debug_timeEnd({
          id: 'readModelos'
        }); // install alaSQL plugin and define tables


        if (resp.length > 0) {
          // get tables sql create
          var ala_create = [];

          for (var _table in resp.tables) {
            ala_create.push("alasqlJs('".concat(resp.tables[_table].sql, "');"));
          } // set custom install code


          var ala_custom = "const alasql = {\n\t\t\t\tinstall (v) {\n\t\t\t\t\t// create tables from models\n\t\t\t\t\t".concat(ala_create.join('\n'), "\n\t\t\t\t\tVue.prototype.alasql = alasqlJs;\n\t\t\t\t}\n\t\t\t}"); // set plugin info in state

          _this6.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
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
      var _this7 = this;

      return _asyncToGenerator(function* () {
        var resp = {},
            path = require('path');

        _this7.debug('_readAssets');

        _this7.debug_time({
          id: '_readAssets'
        });

        var assets = yield _this7.dsl_parser.getNodes({
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

              var _loop3 = function _loop3(i18n_node) {
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
                    js: '~' + sep + 'assets' + sep + path.basename(i18n_node.image)
                  };
                }
              };

              for (var i18n_node of child.nodes) {
                _loop3(i18n_node);
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

        _this7.debug_timeEnd({
          id: '_readAssets'
        });

        return resp;
      })();
    }
    /* 
    * Grabs central node configuration information
    */


    _readCentralConfig() {
      var _this8 = this;

      return _asyncToGenerator(function* () {
        _this8.debug('_readCentralConfig');

        var central = yield _this8.dsl_parser.getNodes({
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
          ':cache': _this8.x_config.cache,
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

        if (!resp[':cache']) _this8.x_config.cache = false; // disables cache when processing nodes (@todo)
        // return

        return resp;
      })();
    }
    /*
    * Grabs the configuration from node named 'config'
    */


    _readConfig() {
      var _this9 = this;

      return _asyncToGenerator(function* () {
        _this9.debug('_readConfig');

        var resp = {
          id: '',
          meta: [],
          seo: {},
          secrets: {}
        },
            config_node = {};
        var search = yield _this9.dsl_parser.getNodes({
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
                    hid: _this9.hash(meta_child.nodes[0].text),
                    name: 'keywords',
                    content: resp.seo['keywords'].join(',')
                  });
                } else if (meta_child.text.toLowerCase() == 'language') {
                  resp.seo['language'] = meta_child.nodes[0].text;
                  resp.meta.push({
                    hid: _this9.hash(meta_child.nodes[0].text),
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
                      hid: _this9.hash(meta_child.nodes[0].text),
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
                  // prepare config key
                  var config_key = key.text.toLowerCase().replace(/ /g, '');
                  var values = {};
                  key.attributes.map(function (x) {
                    values = _objectSpread2(_objectSpread2({}, values), x);
                  });
                  resp[config_key] = values; // mark secret status true if contains 'password' icon

                  if (key.icons.includes('password')) resp[config_key][':secret'] = true; // add link attribute if defined

                  if (key.link != '') resp[config_key][':link'] = key.link;
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

          var dsl_folder = path.dirname(path.resolve(_this9.x_flags.dsl));
          var parent_folder = path.resolve(dsl_folder, '../');
          var folder = dsl_folder.replace(parent_folder, '');
          resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(_this9.x_flags.dsl, '.dsl'); //console.log('folder:',{folder,name:resp.name});
          //this.x_flags.dsl
        } // create id if not given


        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
      })();
    }

    getParentNodes() {
      var _arguments2 = arguments,
          _this10 = this;

      return _asyncToGenerator(function* () {
        var id = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : _this10.throwIfMissing('id');
        var parents = yield _this10.dsl_parser.getParentNodesIDs({
          id,
          array: true
        });
        var resp = [];

        for (var parent_id of parents) {
          var node = yield _this10.dsl_parser.getNode({
            id: parent_id,
            recurse: false
          });
          var command = yield _this10.findValidCommand(node);
          if (command) resp.push(command);
        }

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

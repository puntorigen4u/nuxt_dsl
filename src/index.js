const concepto = require('concepto');
//import concepto from '../../concepto/src/index'
/**
* Concepto VUE DSL Class: A class for compiling vue.dsl Concepto diagrams into VueJS WebApps.
* @name 	vue_dsl
* @module 	vue_dsl
**/
import internal_commands from './commands'
export default class vue_dsl extends concepto {

	constructor(file,config={}) {
		// we can get class name, from package.json name key (after its in its own project)
		let my_config = {
			class: 'vue',
			debug: true
		};
		let nuevo_config = {...my_config,...config};
		super(file,nuevo_config); //,...my_config
	}

	// **************************
	// methods to be auto-called
	// **************************

	//Called after init method finishes
	async onInit() {
		// define and assign commands
		await this.addCommands(internal_commands);
		//this.debug('x_commands',this.x_commands);
		this.x_crypto_key=require('crypto').randomBytes(32); // for hash helper method
		// init vue
		// set x_state defaults
		this.x_state = { plugins:{}, npm:{}, dev_npm:{}, envs:{}, 
			funciones:{},
			proxies:{},
			pages:{},
			current_func:'',
			current_folder:'',
			current_proxy:'',
			strings_i18n: {},
			stores_types: { versions:{}, expires:{} },
		};
		this.x_state.config_node = await this._readConfig();
		//this.debug('config_node',this.x_state.config_node);
		this.x_state.central_config = await this._readCentralConfig();
		//this.debug('central_config',this.x_state.central_config);
		this.x_state.assets = await this._readAssets();
		//this.debug('assets_node',this.x_state.assets);
		if (this.x_state.central_config.componente) {
			this.x_state.dirs = await this._appFolders({
				'components': '',
				'pages': '',
				'assets': 'assets/',
				'static': 'static/',
				'umd': 'umd/'
			});
		} else {
			this.x_state.dirs = await this._appFolders({
				'client': 		'client/',
				'layouts': 		'client/layouts/',
				'components': 	'client/components/',
				'pages': 		'client/pages/',
				'plugins': 		'client/plugins/',
				'static': 		'client/static/',
				'middleware': 	'client/middleware/',
				'server': 		'client/server/',
				'assets': 		'client/assets/',
				'css': 			'client/assets/css/',
				'store': 		'client/store/',
				'lang': 		'client/lang/'
			});
		}
		// read modelos node (virtual DB)
		this.x_state.models = await this._readModelos(); //alias: database tables
		//is local server running? if so, don't re-launch it
		this.x_state.nuxt_is_running = await this._isLocalServerRunning();
		this.debug('is Server Running: '+this.x_state.nuxt_is_running);
		// init terminal diagnostics (not needed here)
		// copy sub-directories if defined in node 'config.copiar' key
		if (this.x_state.config_node.copiar) {
			let path = require('path'), basepath = path.dirname(path.resolve(this.x_flags.dsl));
			let copy = require('recursive-copy');
			this.x_console.outT({ message:`copying config:copiar directories to 'static' target folder`, color:`yellow` });
			await Object.keys(this.x_state.config_node.copiar).map(async function(key) {
				let abs = path.join(basepath,key);
				try {
					await copy(abs,this.x_state.dirs.static);
				} catch(err_copy) {
					if (err_copy.code!='EEXIST') this.x_console.outT({ message:`error: copying directory ${abs}`, data:err_copy });
				}
				//console.log('copying ',{ from:abs, to:this.x_state.dirs.static });
			}.bind(this));
			this.x_console.outT({ message:`copying config:copiar directories ... READY`, color:`yellow` });
		}
		// *********************************************
		// install requested modules within config node
		// *********************************************
		// NUXT:ICON
		if (this.x_state.config_node['nuxt:icon']) {
			// add @nuxtjs/pwa module to app
			this.x_state.npm['@nuxtjs/pwa']='*';
			// copy icon to static dir
			let path = require('path'), basepath = path.dirname(path.resolve(this.x_flags.dsl));
			let source = path.join(basepath,this.x_state.config_node['nuxt:icon']);
			let target = this.x_state.dirs.static+'icon.png';
			this.debug({ message:`NUXT ICON dump (copy icon)`, color:`yellow`, data:source });
			let fs = require('fs').promises;
			try {
				await fs.copyFile(source,target);
			} catch(err_fs) {
				this.x_console.outT({ message:`error: copying NUXT icon`, data:err_fs });
			}
		}
		// GOOGLE:ADSENSE
		if (this.x_state.config_node['google:adsense']) {
			this.x_state.npm['vue-google-adsense']='*';
			this.x_state.npm['vue-script2']='*';
		}
		// GOOGLE:ANALYTICS
		if (this.x_state.config_node['google:analytics']) {
			this.x_state.npm['@nuxtjs/google-gtag']='*';
		}
		// DEFAULT NPM MODULES & PLUGINS if dsl is not 'componente' type
		if (!this.x_state.central_config.componente) {
			this.x_console.outT({ message:`vue initialized() ->` });
			this.x_state.plugins['vue-moment'] = {
				global:true,
				npm: { 'vue-moment':'*' },
				extra_imports: ['moment'],
				requires: ['moment/locale/es'],
				config: '{ moment }'
			};
			// axios
			this.x_state.npm['@nuxtjs/axios']='*';
			if (this.x_state.central_config.nuxt=='latest') {
				this.x_state.npm['nuxt']='*';
			} else {
				this.x_state.npm['nuxt']='2.11.0'; // default for compatibility issues with existing dsl maps	
			}
			// express things
			this.x_state.npm['express']='*';
			this.x_state.npm['serverless-http']='*';
			this.x_state.npm['serverless-apigw-binary']='*';
			this.x_state.npm['underscore']='*';
			// dev tools
			this.x_state.dev_npm['serverless-prune-plugin']='*';
			this.x_state.dev_npm['serverless-offline']='*';
			this.x_state.dev_npm['vue-beautify-loader']='*';
			//
			if (this.x_state.central_config.dominio) {
				this.x_state.dev_npm['serverless-domain-manager']='*';
			}
		} else {
			// If DSL mode 'component(e)' @TODO this needs a revision (converting directly from CFC)
			this.x_console.outT({ message:`vue initialized() -> as component/plugin` });
			this.x_state.npm['global']='^4.4.0';
			this.x_state.npm['poi']='9';
			this.x_state.npm['underscore']='*';
			this.x_state.dev_npm['@vue/test-utils']='^1.0.0-beta.12';
			this.x_state.dev_npm['babel-core']='^6.26.0';
			this.x_state.dev_npm['babel-preset-env']='^1.6.1';
			this.x_state.dev_npm['jest']='^22.4.0';
			this.x_state.dev_npm['jest-serializer-vue']='^0.3.0';
			this.x_state.dev_npm['vue']='*';
			this.x_state.dev_npm['vue-jest']='*';
			this.x_state.dev_npm['vue-server-renderer']='*';
			this.x_state.dev_npm['vue-template-compiler']='*';
		}
		// serialize 'secret' config keys as json files in app secrets sub-directory (if any)
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
		for (let key in this.x_state.config_node) {
			// omit special config 'reserved' node keys
			if (['aurora','vpc','aws'].includes(key) && typeof this.x_state.config_node[key] === 'object') {
				Object.keys(this.x_state.config_node[key]).map(function(attr) {
					this.x_state.envs[`config.${key}.${attr}`]=`process.env.${(key+'_'+attr).toUpperCase()}`;
				}.bind(this));
			}
		}

		// show this.x_state contents
		//this.debug('x_state says',this.x_state);
	}

	//Called after parsing nodes
	async onAfterProcess(processedNode) {
		return processedNode;
	}

	//Called for defining the title of class/page by testing node.
	async onDefineTitle(node) {
		let resp = node.text, i;
		for (i in node.attributes) {
			if (['title','titulo'].includes(node.attributes[i])) {
				resp = node.attributes[i];
				break;
			}
		}
		return resp;
	}

	//Called for naming filename of class/page by testing node.
	async onDefineFilename(node) {
		let resp = node.text;
		// @idea we could use some 'slug' method here
		resp = resp.replace(/\ /g,'_') + '.vue';
		if (node.icons.includes('gohome')) {
			if (this.x_state.central_config.componente==true && this.x_state.central_config.service_name) {
				resp = this.x_state.central_config.service_name + '.vue';
			} else {
				resp = 'index.vue';
			}
		} else if (node.icons.includes('desktop_new')) {
			if (node.text.indexOf('assets')!=-1) {
				resp = 'internal_assets.omit';
			} else if (node.text.indexOf('store')!=-1) {
				resp = 'internal_stores.omit';
			} else if (node.text.indexOf('proxy')!=-1 || node.text.indexOf('proxies')!=-1) {
				resp = 'internal_middleware.omit';
			} else if (node.text.indexOf('config')!=-1) {
				resp = 'config.omit';
			} else if (node.text.indexOf('modelos')!=-1) {
				resp = 'modelos.omit';
			} else if (['servidor','server','api'].includes(node.text)) {
				resp = 'server.omit';
			} 

		} else if (node.text.indexOf('componente:')!=-1) {
			resp = node.text.split(':')[node.text.split(':').length-1] + '.vue';
		} else if (node.text.indexOf('layout:')!=-1) {
			resp = node.text.split(':')[node.text.split(':').length-1] + '.vue';
		}
		return resp;
	}

	//Called for naming the class/page by testing node.
	async onDefineNodeName(node) {
		return node.text.replace(' ','_');
	}

	//Defines template for code given the processedNode of process() - for each level2 node
	async onCompleteCodeTemplate(processedNode) {
		return processedNode;
	}

	//Defines preparation steps before processing nodes.
	async onPrepare() {
		if (!this.x_state.central_config.componente && this.x_state.central_config.deploy && this.x_state.central_config.deploy.indexOf('eb:')!=-1) {
			// if deploying to AWS eb:x, then recover/backup AWS credentials from local system
			let ini = require('ini'), path = require('path'), fs = require('fs').promises;
			// read existing AWS credentials if they exist
			let os = require('os'); let aws_ini = '';
			let aws_ini_file = path.join(os.homedir(),'/.aws/')+'credentials';
			try {
				//this.debug('trying to read AWS credentials:',aws_ini_file);
				aws_ini = await fs.readFile(aws_ini_file,'utf-8');
				//this.debug('AWS credentials:',aws_ini);
			} catch(err_reading) {
			}
			// 
			if (this.x_state.config_node.aws) {
				// if DSL defines temporal AWS credentials for this app .. 
				// create backup of aws credentials, if existing previously
				if (aws_ini!='') {
					let basepath = path.dirname(path.resolve(this.x_flags.dsl));
					let aws_bak = path.join(basepath,'aws_backup.ini');
					this.x_console.outT({ message:`config:aws:creating .aws/credentials backup`, color:'yellow' });
					await fs.writeFile(aws_bak,aws_ini,'utf-8');
				}
				// debug
				this.x_console.outT({ message:`config:aws:access ->${this.x_state.config_node.aws.access}` });
				this.x_console.outT({ message:`config:aws:secret ->${this.x_state.config_node.aws.secret}` });
				// transform config_node.aws keys into ini
				let to_ini = ini.stringify({ 
					aws_access_key_id: this.x_state.config_node.aws.access,
					aws_secret_access_key: this.x_state.config_node.aws.secret
				},{ section:'default' });
				this.debug('Setting .aws/credentials from config node');
				// save as .aws/credentials (ini file)
				await fs.writeFile(aws_ini_file,to_ini,'utf-8');

			} else if (aws_ini!='') {
				// if DSL doesnt define AWS credentials, use the ones defined within the local system.
				let parsed = ini.parse(aws_ini);
				if (parsed.default) this.debug('Using local system AWS credentials',parsed.default);
				this.x_state.config_node.aws = { access:'', secret:'' };
				if (parsed.default.aws_access_key_id) this.x_state.config_node.aws.access = parsed.default.aws_access_key_id;
				if (parsed.default.aws_secret_access_key) this.x_state.config_node.aws.secret = parsed.default.aws_secret_access_key;
			}
		}
	}

	//Executed when compiler founds an error processing nodes.
	async onErrors(errors) {
	}

	//Transforms the processed nodes into files.
	async onCreateFiles(processedNodes) {
		this.x_console.out({ message:'onCreateFiles', data:processedNodes });
	}

	// ************************
	// INTERNAL HELPER METHODS 
	// ************************
	
	/*
	* Returns true if a local server is running on the DSL defined port
	*/
	async _isLocalServerRunning() {
		let is_reachable = require('is-port-reachable');
		let resp = await is_reachable(this.x_state.central_config.port);
		return resp;
	}

	/*
	* Reads the node called modelos and creates tables definitions and managing code (alias:database).
	*/
	async _readModelos() {
		// @IDEA this method could return the insert/update/delete/select 'function code generators'
		this.debug('_readModelos');
		this.debug_time({ id:'readModelos' });
		let modelos = await this.dsl_parser.getNodes({ text:'modelos', level:2, icon:'desktop_new', recurse:true }); //nodes_raw:true	
		let tmp = { appname:this.x_state.config_node.name }, fields_map={};
		let resp = {
			tables:{},
			attributes:{},
			length:0,
			doc:''
		};
		// map our values to real database values 
		let type_map = {
			id: { value:'INT AUTOINCREMENT PRIMARY KEY', alias:['identificador','autoid','autonum','key'] },
			texto: { value:'STRING', alias:['text','varchar','string'] },
			int: { value:'INTEGER', alias:['numero chico','small int','numero'] },
			float: { value:'FLOAT', alias:['decimal','real'] },
			boolean: { value:'BOOLEAN', alias:['boleano','true/false'] },
			date: { value:'DATEONLY', alias:['fecha'] },
			datetime: { value:'DATETIME', alias:['fechahora'] },
			blob: { value:'BLOB', alias:['binario','binary'] }
		};
		// expand type_map into fields_map
		Object.keys(type_map).map(function(x) {
			let aliases = type_map[x].alias;
			aliases.push(x);
			aliases.map(y=>{fields_map[y]=type_map[x].value});
		});
		// parse nodes into tables with fields
		if (modelos.length>0) {
			modelos[0].attributes.map(x=>{ resp.attributes={...resp.attributes,...x} }); //modelos attributes
			resp.doc=modelos[0].text_note;
			resp.length=modelos[0].nodes.length;
			for (let table of modelos[0].nodes) {
				let fields = {}; table.attributes.map(x=>{ fields={...fields,...x} }); //table attributes
				resp.tables[table.text]={ fields:{} }; //create table
				tmp.sql_fields=[];
				for (let field in fields) {
					resp.tables[table.text].fields[field] = fields_map[fields[field]]; //assign field with mapped value
					tmp.sql_fields.push(field + ' ' + fields_map[fields[field]]);
				}
				resp.tables[table.text].sql = `CREATE TABLE ${table.text}(${tmp.sql_fields.join(',')})`;
			}
		}
		this.debug_timeEnd({ id:'readModelos' });
		// install alaSQL plugin and define tables
		if (resp.length>0) {
			// get tables sql create
			let ala_create = [];
			for (let table in resp.tables) {
				ala_create.push(`alasqlJs('${resp.tables[table].sql}');`);
			}
			// set custom install code
			let ala_custom = 
			`const alasql = {
				install (v) {
					// create tables from models
					${ala_create.join('\n')}
					Vue.prototype.alasql = alasqlJs;
				}
			}`;
			// set plugin info in state
			this.x_state.plugins['../../node_modules/alasql/dist/alasql.min.js'] = {
				global:true,
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
		return resp;
	}


	/*
	* Reads assets node, and returns object with info
	*/
	async _readAssets() {
		let resp = {}, path = require('path');
		this.debug('_readAssets');
		this.debug_time({ id:'_readAssets' });
		let assets = await this.dsl_parser.getNodes({ text:'assets', level:2, icon:'desktop_new', recurse:true }); //nodes_raw:true
		let sep = path.sep;
		//
		//this.debug('assets search',assets);
		if (assets.length>0) {
			assets = assets[0];
			// 15ms full
			for (let child of assets.nodes) {
				if (child.nodes.length==1 && child.nodes[0].image!='') {
					// if there is just 1 grand-child and has an image defined
					resp[child.text.toLowerCase()] = {
						i18n: false,
						original: child.nodes[0].image,
						css: '~assets'+sep+path.basename(child.nodes[0].image),
						js: '~'+sep+'assets'+sep+path.basename(child.nodes[0].image)
					}

				} else if (child.nodes.length>1) {
					// if child has more than 1 child (grandchild), we'll assume its an image with i18n alternatives
					let key = child.text.toLowerCase();
					resp[key] = { i18n:true, i18n_keys:[] };
					for (let i18n_node of child.nodes) {
						// expand node attributes
						let attrs = {};
						i18n_node.attributes.map(function(x) {
							attrs = {...attrs,...x};
						});
						if (attrs.idioma && i18n_node.image!='') {
							let lang = attrs.idioma.toLowerCase();
							resp[key].i18n_keys.push(lang);
							resp[key][lang] = {
								original: i18n_node.image,
								css: '~assets'+sep+path.basename(i18n_node.image),
								js: '~'+sep+'assets'+sep+path.basename(i18n_node.image)
							};
						}
					}
					// transform i18n_keys to list
					resp[key].i18n_keys = resp[key].i18n_keys.join(',');

				} else if (child.link!='') {
					resp[child.text.toLowerCase()] = {
						original: 	child.link,
						css: 	  	'~assets'+sep+path.basename(child.link),
						js: 		'~'+sep+'assets'+sep+path.basename(child.link)
					};
				}
				//console.log('child of asset '+assets.text,child);
			}
			// 12ms full
			/*let children = await assets.getNodes();
			for (let child of children) {
				console.log('child of asset '+assets.text,children);
			}*/
		}
		this.debug_timeEnd({ id:'_readAssets'});
		return resp;
	}

	/* 
	* Grabs central node configuration information
	*/
	async _readCentralConfig() {
		this.debug('_readCentralConfig');
		let central = await this.dsl_parser.getNodes({ level:1, recurse:false });	
		//this.debug('central search',central);
		// set defaults
		let resp = {
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
		central[0].attributes.map(function(x) {
			resp = {...resp,...x};
		});
		if (resp.dominio) {
			resp.service_name = resp.dominio.replace(/\./g,'').toLowerCase();
		} else {
			resp.service_name = resp.apptitle;
		}
		if (!resp[':cache']) this.x_config.cache = false; // disables cache when processing nodes (@todo)
		// return
		return resp;
	}

	/*
	* Grabs the configuration from node named 'config'
	*/
	async _readConfig() {
		this.debug('_readConfig');
		let resp = { id:'', meta:[], seo:{}, secrets:{} }, config_node = {};
		let search = await this.dsl_parser.getNodes({ text:'config', level:2, icon:'desktop_new', recurse:true });
		//this.debug({ message:'search says',data:search, prefix:'_readConfig,dim' });
		//
		if (search.length>0) {
			config_node = search[0];
			// define default font_face
			resp.default_face = config_node.font.face;
			resp.default_size = config_node.font.size;
			// apply children nodes as keys/value for resp
			for (let key of config_node.nodes) {
				if (key.text.toLowerCase()=='meta') {
					for (let meta_child of key.nodes) {
						// apply grand_childs as meta tags
						if (meta_child.text.toLowerCase()=='keywords') {
							resp.seo['keywords'] = meta_child.nodes.map(x=>x.text);
							resp.meta.push({ hid:this.hash(meta_child.nodes[0].text), name:'keywords', content:resp.seo['keywords'].join(',') });

						} else if (meta_child.text.toLowerCase()=='language') {
							resp.seo['language'] = meta_child.nodes[0].text;
							resp.meta.push({ hid:this.hash(meta_child.nodes[0].text), lang:meta_child.nodes[0].text });

						} else if (meta_child.text.toLowerCase()=='charset') {
							resp.seo['charset'] = meta_child.nodes[0].text;
							resp.meta.push({ charset:meta_child.nodes[0].text });

						} else {
							resp.seo['charset'] = meta_child.nodes[0].text;
							if (meta_child.text.indexOf(':')!=-1) {
								resp.meta.push({ property:meta_child.text, vmid:meta_child.text, content:meta_child.nodes[0].text });
							} else {
								resp.meta.push({ hid:this.hash(meta_child.nodes[0].text), name:meta_child.text, content:meta_child.nodes[0].text });
							}
						}
						//
					}			
				} else {
					// apply keys as config keys (standard config node by content types)
					if (key.attributes.length>0) {
						// prepare config key
						let config_key = key.text.toLowerCase().replace(/ /g,'');
						let values = {};
						key.attributes.map(function(x) {
							values = {...values,...x};
						});						
						resp[config_key] = values;
						// mark secret status true if contains 'password' icon
						if (key.icons.includes('password')) resp[config_key][':secret'] = true;
						// add link attribute if defined
						if (key.link!='') resp[config_key][':link'] = key.link;

					} else if (key.nodes.length>0) {
						resp[key.text] = key.nodes[0].text;
					} else if (key.link!='') {
						resp[key.text] = key.link;
					}
					//
				}
			}
		}
		// assign dsl file folder name+filename if node.name is not given
		if (!resp.name) {
			let path = require('path');
			let dsl_folder = path.dirname(path.resolve(this.x_flags.dsl));
			let parent_folder = path.resolve(dsl_folder,'../'); 
			let folder = dsl_folder.replace(parent_folder,'');
			resp.name = folder.replace('/','').replace('\\','')+'_'+path.basename(this.x_flags.dsl,'.dsl');
			//console.log('folder:',{folder,name:resp.name});
			//this.x_flags.dsl
		}
		// create id if not given
		if (!resp.id) resp.id = 'com.puntorigen.'+resp.name;
		return resp;
	}

	async getParentNodes(id=this.throwIfMissing('id')) {
		let parents = await this.dsl_parser.getParentNodesIDs({ id, array:true });
		let resp = [];
		for (let parent_id of parents) {
			let node = await this.dsl_parser.getNode({ id:parent_id, recurse:false });
			let command = await this.findValidCommand({ node });
			if (command) resp.push(command);
		}
		return resp;
	}

	//gets the asset code for a given string like: assets:assetname
	getAsset(text=this.throwIfMissing('text'),type='js') {
		//this.x_state.assets
		let resp=text, type_o = text.replaceAll('jsfunc','js').toLowerCase();
		if (resp.toLowerCase().indexOf('assets:')!=-1) {
			if (resp in this.x_state.assets) {
				if (this.x_state.central_config.idiomas.indexOf(',')!=-1 && this.x_state.assets[resp].i18n==true) {
					let first_key = this.x_state.assets[resp].i18n_keys.split(',')[0];
					resp = this.x_state.assets[resp][first_key][type_o];
					if (type.toLowerCase()=='js') {
						resp = resp.replaceAll(`/${first_key}/`,`/' + $i18n.locale + '/`);
						resp = `require('${resp}')`;
					} else if (type.toLowerCase()=='jsfunc') {
						resp = resp.replaceAll(`/${first_key}/`,`/' + this.$i18n.locale + '/`);
						resp = `require('${resp}')`;
					}

				} else if (resp in this.x_state.assets && type_o in this.x_state.assets[resp]) {
					resp = this.x_state.assets[resp][type_o];
					if (type.toLowerCase().indexOf('js')!=-1) {
						resp = `require('${resp}')`;
					}

				} else {
					// throw error: invalid type of asset (valid values: css,js - given: ${type})
				}
			}
		}
		return resp;
	}

	//vue tag constructor helper
	tagParams(tag='',params={}, selfclose=false) {
		let t_params={...params}, resp='';
		if ('aos' in params) {
			let aos_p = params['aos'].split(',');
			if (aos_p.length==3) {
				t_params['data-aos']=aos_p[0]; 
				t_params['data-aos-duration']=aos_p[1];
				t_params['data-aos-delay']=aos_p[2];
			} else {
				t_params['data-aos']=aos_p[0];
				t_params['data-aos-duration']=aos_p[1];
			}
			delete t_params['aos'];
		}
		let x_params = this.struct2params(t_params);
		if (x_params!='') {
			resp=`<${tag} ${x_params}`;
			if (selfclose==true) resp+='/';
			resp+='>';
		} else {
			resp=`<${tag}`;
			if (selfclose==true) resp+='/';
			resp+='>';
		}
		return resp;
	};

	// hash helper method
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
	}

}

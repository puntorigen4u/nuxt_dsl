export default async function(context) {
	// context.x_state; shareable var scope contents between commands and methods.
	let null_template = {	hint:'Allowed node type that must be ommited',
							func:async function(node,state) {
								return context.reply_template({ hasChildren:false, state });
							}
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
		'def_config': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'config' } },
		'def_modelos': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'modelos' } },
		'def_assets': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'assets' } },

		'def_server': {
			x_icons: 'desktop_new',
			x_level: '2',
			x_text_contains: 'server|servidor|api',
			hint: 'Representa a un backend integrado con funciones de express.',
			func: async function(node,commands_state) {
				let resp = context.reply_template();
				context.x_state.npm = {...context.x_state.npm, ...{ 'body_parser':'*', 'cookie-parser':'*' } };
				context.x_state.central_config.static = false;
				return resp;
			}
		},
		'def_path': {
			x_icons: 'list',
			x_level: '3,4',
			x_or_isparent: 'def_server',
			x_not_icons: 'button_cancel,desktop_new,help',
			hint: 'Carpeta para ubicacion de funcion de servidor',
			func: async function(node,commands_state) {
				let resp = context.reply_template({ state:commands_state });
				if (node.level==2) {
					//state.current_folder = node.text;
					resp.state.current_folder = node.text;
				} else if (node.level==3 && await context.isExactParentID(node.id,'def_path')) {
					let parent_node = await context.dsl_parser.getParentNode({ id:node.id });
					//state.current_folder = `${parent_node.text}/${node.id}`;
					resp.state.current_folder = `${parent_node.text}/${node.id}`;
				} else {
					resp.valid=false;
				}
				return resp;
			}
		},
		'def_server_func': {
			x_empty: 'icons',
			x_level: '3,4,5',
			x_or_isparent: 'def_server',
			hint: 'Corresponde a la declaracion de una funcion de servidor',
			func: async function(node,commands_state) {
				let resp = context.reply_template({ state:commands_state });
				context.x_state.central_config.static = false; //server func cannot run in a static site
				resp.state.current_func = node.text; 
				if (node.level!=2) {
					let new_name = [];
					let parents = await context.getParentNodes(node.id);
					// @TODO finish this method when we can test the parents ORDER (line: 321 vue.CFC)
					//console.log('@TODO! def_server_func: needs testings',parents);
				}
				resp.open = '<func_code>';
				resp.close = '</func_code>';
				//
				return resp;
			}
		},

		// STORE definitions
		'def_store': { 
			x_icons:'desktop_new', 
			x_level:'2', 
			x_text_contains:'store',
			hint: 'Representa una coleccion de stores de Vue',
			func: async function(node, state) {
				let resp = context.reply_template({ state, hasChildren:true });
				return resp;
			}
		},
		'def_store_def': {
			x_empty: 'icons',
			x_level: '3',
			x_all_hasparent: 'def_store',
			hint: 'Representa a una definicion de store de VueX',
			func: async function(node, commands_state) {
				let resp = context.reply_template({ state:commands_state });
				let tmp = { type:'normal', version:'', expire:'' };
				// create store in app state if not already there
				resp.state.current_store = node.text;
				if (!context.x_state.stores) context.x_state.stores={};
				if (context.x_state.stores && !node.text in context.x_state.stores) context.x_state.stores[node.text]={};
				//@TODO evaluate if we should change the format for node.attributes within dsl_parser, instead of doing this each time.
				// parse attributes
				let attr = {};
				key.attributes.map(function(x) {
					attr = {...attr,...x};
				});
				Object.keys(attr).map(function(keym) {
					let key = keym.toLowerCase();
					if ([':type','type','tipo',':tipo'].includes(key)) {
						// store type value
						if (['sesion','session'].includes(attr[key])) {
							tmp.type = 'session';
							context.x_state.npm['nuxt-vuex-localstorage'] = '*'; // add npm to app package
						} else if (['local','persistent','persistente','localstorage','storage','db','bd'].includes(attr[key])) {
							tmp.type = 'local';
							context.x_state.npm['nuxt-vuex-localstorage'] = '*';
						}

					} else if (['version',':version'].includes(key)) {
						tmp.version = attr[key];

					} else if (['expire',':expire','expira',':expira'].includes(key)) {
						tmp.expire = attr[key];
					}
					//
				});
				// set store type, version and expire attributes for app state
				if (!context.x_state.stores_types) context.x_state.stores_types={ versions:{}, expires:{} };
				// prepare stores_type, and keys local or session. 
				if (context.x_state.stores_types && !tmp.type in context.x_state.stores_types) context.x_state.stores_types[tmp.type]={};
				if (!resp.state.current_store in context.x_state.stores_types[tmp.type]) context.x_state.stores_types[tmp.type][resp.state.current_store]={};
				// set version value
				if (tmp.version!='') {
					if (!resp.state.current_store in context.x_state.stores_types['versions']) context.x_state.stores_types['versions'][resp.state.current_store]={};
				}
				// set expire value
				if (tmp.version!='') {
					if (!resp.state.current_store in context.x_state.stores_types['expires']) context.x_state.stores_types['expires'][resp.state.current_store]={};
				}
				// return
				return resp;
			}
		},

		//def_store_mutation
		//def_store_field
		//def_store_call
		//def_store_modificar

		//def_proxies
		'def_proxies': { 
			x_icons:'desktop_new', 
			x_level:2, 
			x_text_contains:'prox',
			hint: 'Representa una coleccion de proxies de Vue',
			func: async function(node, state) {
				let resp = context.reply_template({ state, hasChildren:true });
				return resp;
			}
		},
		//def_proxy_def
		//def_enviarpantalla
		//def_layout_view

		'def_center': {
			x_icons: 'idea',
			x_text_contains: 'center',
			hint: 'Centra nodos hijos',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				return resp;
			}
		},

		//def_html y otros

		'def_page': {
			x_level: '2',
			x_not_icons: 'button_cancel,desktop_new,list,help',
			x_not_text_contains: 'componente:,layout:',
			hint: 'Archivo vue',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				return resp;
			}
		},

		// OTHER node types
		'def_imagen': {
			x_icons:'idea',
			x_not_icons:'button_cancel,desktop_new,help',
			x_not_empty:'attributes[:src]',
			x_empty:'',
			x_level:'>2',
			func:async function(node,state) {
				return context.reply_template({ otro:'Pablo', state });
			}
		}
	}
};
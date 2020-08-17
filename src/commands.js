String.prototype.replaceAll = function(strReplace, strWith) {
    // See http://stackoverflow.com/a/3561711/556609
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

String.prototype.contains = function(test) {
	if (this.indexOf(test)!=-1) {
		return true;
	} else {
		return false;
	}
};

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
		'def_config': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'config' } },
		'def_modelos': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'modelos' } },
		'def_assets': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'assets' } },


		// ********************
		//  Express Methods
		// ********************

		'def_server': {
			x_icons: 'desktop_new',
			x_level: '2',
			x_text_contains: 'server|servidor|api',
			hint: 'Representa a un backend integrado con funciones de express.',
			func: async function(node,state) {
				let resp = context.reply_template();
				context.x_state.npm = {...context.x_state.npm, ...{ 'body_parser':'*', 'cookie-parser':'*' } };
				context.x_state.central_config.static = false;
				return resp;
			}
		},
		'def_server_path': {
			x_icons: 'list',
			x_level: '3,4',
			x_or_isparent: 'def_server',
			x_not_icons: 'button_cancel,desktop_new,help',
			hint: 'Carpeta para ubicacion de funcion de servidor',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				if (node.level==2) {
					//state.current_folder = node.text;
					resp.state.current_folder = node.text;
				} else if (node.level==3 && await context.isExactParentID(node.id,'def_server_path')) {
					let parent_node = await context.dsl_parser.getParentNode({ id:node.id });
					//state.current_folder = `${parent_node.text}/${node.id}`;
					resp.state.current_folder = `${parent_node.text}/${node.id}`;
				} else {
					resp.valid=false;
				}
				return resp;
			}
		},
		'def_server_func': { //@TODO finish incomplete
			x_empty: 'icons',
			x_level: '3,4,5',
			x_or_isparent: 'def_server',
			hint: 'Corresponde a la declaracion de una funcion de servidor',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
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

		// *************************
		//  VueX STORES definitions
		// *************************
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
			func: async function(node, state) {
				let resp = context.reply_template({ state });
				let tmp = { type:'normal', version:'', expire:'' };
				// create store in app state if not already there
				resp.state.current_store = node.text;
				if (!context.x_state.stores) context.x_state.stores={};
				if (context.x_state.stores && node.text in context.x_state.stores===false) context.x_state.stores[node.text]={};
				Object.keys(node.attributes).map(function(keym) {
					let key = keym.toLowerCase();
					if ([':type','type','tipo',':tipo'].includes(key)) {
						// store type value
						if (['sesion','session'].includes(node.attributes[key])) {
							tmp.type = 'session';
							context.x_state.npm['nuxt-vuex-localstorage'] = '*'; // add npm to app package
						} else if (['local','persistent','persistente','localstorage','storage','db','bd'].includes(node.attributes[key])) {
							tmp.type = 'local';
							context.x_state.npm['nuxt-vuex-localstorage'] = '*';
						}

					} else if (['version',':version'].includes(key)) {
						tmp.version = node.attributes[key];

					} else if (['expire',':expire','expira',':expira'].includes(key)) {
						tmp.expire = node.attributes[key];
					}
					//
				});
				// set store type, version and expire attributes for app state
				//if (!context.x_state.stores_types) context.x_state.stores_types={ versions:{}, expires:{} };
				// prepare stores_type, and keys local or session. 
				if (context.x_state.stores_types && tmp.type in context.x_state.stores_types===false) context.x_state.stores_types[tmp.type]={};
				if (resp.state.current_store in context.x_state.stores_types[tmp.type]===false) context.x_state.stores_types[tmp.type][resp.state.current_store]={};
				// set version value
				if (tmp.version!='') {
					if (resp.state.current_store in context.x_state.stores_types['versions']===false) context.x_state.stores_types['versions'][resp.state.current_store]={};
				}
				// set expire value
				if (tmp.version!='') {
					if (resp.state.current_store in context.x_state.stores_types['expires']===false) context.x_state.stores_types['expires'][resp.state.current_store]={};
				}
				// return
				return resp;
			}
		},

		//def_store_mutation
		//def_store_field
		//def_store_call
		//def_store_modificar

		// **************************
		//  VueX PROXIES definitions
		// **************************
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

		// *****************************
		//  Vue Pages and View Elements
		// *****************************

		//def_html y otros

		'def_page': {
			x_level: '2',
			x_not_icons: 'button_cancel,desktop_new,list,help',
			x_not_text_contains: 'componente:,layout:',
			hint: 'Archivo vue',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				resp.state.current_page = node.text;
				// set global page defaults for current page
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
						head: { script:[], meta:[], seo:{} },
						var_types: {},
						proxies: '',
						return: '',
						styles: {},
						script: {},
						path: '/'+resp.state.current_page
					};
				}
				// is this a 'home' page ?
				if (node.icons.includes('gohome')) context.x_state.pages[resp.state.current_page].path='/';
				// attributes overwrite anything
				let params = {};
				Object.keys(node.attributes).map(function(key) {
					let value = node.attributes[key];
					// preprocess value
					value = value.replaceAll('$variables.','')
								 .replaceAll('$vars.','')
								 .replaceAll('$params.','')
								 .replaceAll('$config.','process.env')
								 .replaceAll('$store.','$store.state.');
					// query attributes
					if (['proxy'].includes(key.toLowerCase())) {
						context.x_state.pages[resp.state.current_page].proxies = value;

					} else if (['acceso','method'].includes(key.toLowerCase())) {
						context.x_state.pages[resp.state.current_page].acceso = value;

					} else if (['path','url','ruta'].includes(key.toLowerCase())) {
						context.x_state.pages[resp.state.current_page].path = value;

					} else if (['layout'].includes(key.toLowerCase())) {
						context.x_state.pages[resp.state.current_page].layout = value;

					} else if (['meta:title','meta:titulo'].includes(key.toLowerCase())) {
						context.x_state.pages[resp.state.current_page].xtitle = value;

					} else if (['background','fondo'].includes(key.toLowerCase())) {
						params.id = 'tapa';
						let background = context.getAsset(value,'css');
						context.x_state.pages[resp.state.current_page].styles['#tapa'] = {
							'background-image': `url('${background}')`,
							'background-repeat': 'no-repeat',
							'background-size': '100vw'
						};
					
					} else {
						if (key.charAt(0)!=':' && value!=node.attributes[key]) {
							params[':'+key] = value;
						} else {
							params[key] = value;
						}
						//context.x_state.pages[resp.state.current_page].xtitle = value;

					}
				}.bind(this));
				// has comments ?
				if (node.text_note!='') {
					resp.open = `<!-- ${node.text_note.replaceAll('<br/ >','\n')} -->\n`;
				}
				// set code
				resp.open += `<template>\n`;
				if (context.x_state.pages[resp.state.current_page]['layout'] == '') {
					resp.open += '\t'+context.tagParams('v-app',params,false)+'\n';
					resp.close += '\t</v-app>\n';
				}
				resp.close += `</template>\n`;
				// return
				return resp;
			}
		},

		'def_margen': {
			x_icons: 'idea',
			x_text_contains: 'margen',
			hint: 'Define un margen alrededor del contenido',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				// parse attributes
				let params = {};
				Object.keys(node.attributes).map(function(key) {
					let value = node.attributes[key];
					// preprocess value
					value = value.replaceAll('$variables.','')
								 .replaceAll('$vars.','')
								 .replaceAll('$params.','')
								 .replaceAll('$config.','process.env')
								 .replaceAll('$store.','$store.state.');
					// query attributes
					if (key.toLowerCase()=='props') {
						for (let i of value.split(',')) {
							params[i] = 'vue:prop';
						}
					} else {
						params[key] = value;
					}
				});
				//
				resp.open += context.tagParams('v-container',params,false) + '\n';
				resp.close += '</v-container>\n';
				//
				return resp;
			}
		},

		'def_contenedor': {
			x_icons: 'idea',
			x_text_contains: 'contenedor',
			x_level: '>2',
			hint: 'Vue Container',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { refx:node.id };
				// process attributes
				Object.keys(node.attributes).map(function(key) {
					let value = node.attributes[key];
					let keytest = key.toLowerCase().trim();
					let tvalue = value.toString().replaceAll('$variables','')
									.replaceAll('$vars.','')
									.replaceAll('$params.','')
									.replaceAll('$env.','process.env.')
									.replaceAll('$store.','$store.state.').trim();
					if (keytest=='props') {
						for (let i of tvalue.split(',')) {
							params[i] = 'vue:prop';
						}
					} else {
						if (keytest.charAt(0)!=':' && value!='' && value!=tvalue) {
							params[':'+key.trim()] = tvalue;
						} else {
							params[key.trim()] = tvalue;
						}
					}
				}.bind(this));
				// write response
				if (node.text_note!='') resp.open = `<!-- ${node.text_note} -->\n`;
				resp.open += context.tagParams('v-container',params,false) + '\n';
				resp.close = '</v-container>\n';
				// return
				return resp;
			}
		},

		'def_flex': {
			x_icons: 'idea',
			x_text_contains: 'flex',
			x_not_text_contains: ':',
			hint: 'Columna de ancho flexible',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { refx:node.id };
				if (node.text_note!='') resp.open = `<!-- ${node.text_note} -->`;
				// process attributes
				Object.keys(node.attributes).map(function(key) {
					let value = node.attributes[key];
					let keytest = key.toLowerCase().trim();
					let tvalue = value.toString().replaceAll('$variables','')
									.replaceAll('$vars.','')
									.replaceAll('$params.','')
									.replaceAll('$env.','process.env.')
									.replaceAll('$store.','$store.state.').trim();
					let numsize = 0;
					if (tvalue.indexOf('%')!=-1) {
						tvalue = parseInt(tvalue.replaceAll('%','').trim());
						numsize = Math.round((tvalue*12)/100);
					}
					// start testing attributes
					if (keytest=='class') {
						params.class = tvalue;
					} else if (keytest=='props') {
						for (let i of tvalue.split(',')) {
							params[i] = 'vue:prop';
						}
					} else if ('padding,margen'.split(',').includes(keytest)) {
						params['pa-'+tvalue] = 'vue:prop';
					} else if (keytest=='ancho') {
						params = {...params,...setObjectKeys(`xs-${numsize},sm-${numsize},md-${numsize},lg-${numsize}`,'vue:prop')};
					} else if (keytest=='offset') {
						params = {...params,...setObjectKeys(`offset-xs-${numsize},offset-sm-${numsize},offset-md-${numsize},offset-lg-${numsize}`,'vue:prop')};
					} else if ('muy chico,movil,small,mobile'.split(',').includes(keytest)) {
						params[`xs${numsize}`] = 'vue:prop';
					} else if ('chico,tablet,small,tableta'.split(',').includes(keytest)) {
						params[`sm${numsize}`] = 'vue:prop';
					} else if ('medio,medium,average'.split(',').includes(keytest)) {
						params[`md${numsize}`] = 'vue:prop';
					} else if ('grande,pc,desktop,escritorio'.split(',').includes(keytest)) {
						params[`lg${numsize}`] = 'vue:prop';
					} else if ('xfila:grande,xfila:pc,xfila:desktop,pc,escritorio,xfila:escritorio'.split(',').includes(keytest)) {
						params[`lg${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('xfila:medio,xfila:tablet,tablet,xfila'.split(',').includes(keytest)) {
						params[`md${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('xfila:chico,xfila:movil,xfila:mobile'.split(',').includes(keytest)) {
						params[`sm${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('xfila:muy chico,xfila:movil chico,xfila:small mobile'.split(',').includes(keytest)) {
						params[`xs${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('muy chico:offset,movil:offset,small:offset,mobile:offset'.split(',').includes(keytest)) {
						params[`offset-xs${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('chico:offset,tablet:offset,small:offset,tableta:offset'.split(',').includes(keytest)) {
						params[`offset-sm${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('medio:offset,medium:offset,average:offset'.split(',').includes(keytest)) {
						params[`offset-md${Math.round(12/tvalue)}`] = 'vue:prop';
					} else if ('grande:offset,pc:offset,desktop:offset,escritorio:offset,grande:left'.split(',').includes(keytest)) {
						params[`offset-lg${Math.round(12/tvalue)}`] = 'vue:prop';
					} else {
						if (keytest.charAt(0)!=':' && value!='' && value!=tvalue) {
							params[':'+key.trim()] = tvalue;
						} else {
							params[key.trim()] = tvalue;
						}

					}
				});
				// write tag
				resp.open += context.tagParams('v-flex',params,false) + '\n';
				resp.close = '</v-flex>\n';
				// return
				return resp;
			}
		},

		'def_spacer': {
			x_icons: 'idea',
			x_text_contains: 'spacer',
			hint: 'Spacer es un espaciador flexible',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				if (node.text_note!='') resp.open = `<!-- ${node.text_note} -->`;
				resp.open += context.tagParams('v-spacer',{},true) + '\n';
				return resp;
			}
		},
		//..views..
		//def_progress
		//def_datatable
		//def_datatable_col
		//def_datatable_fila
		//def_datatable_headers
		//def_mapa
		//def_youtube_playlist
		//def_youtube
		//def_card
		//def_card_actions
		//def_card_title
		//def_card_text
		//def_card_media
		//def_dialog

		//def_form
		//def_textfield
		//def_avatar
		//def_boton
		//def_chip
		//def_google_autocomplete

		//def_toolbar
		//def_layout_custom
		//def_divider
		//def_slot
		//def_div
		//def_agrupar
		//def_bloque
		//def_hover
		//def_tooltip
		//def_componente_view (instancia)
		//def_menu
		//def_barralateral
		//def_barrainferior

		//def_contenido
		//def_contenido_layout
		
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
		//def_toolbar_title
		//def_layout
		//def_componente
		//def_llamar_evento (def_componente_emitir , script)
		//def_analytics_evento
		//def_medianet_ad
		//def_paginador

		//def_page_seo
		//def_page_estilos
		//def_page_estilos_class
		//def_script
		//def_event_server
		//def_event_mounted
		//def_event_method
		//def_event_element

		//def_condicion_view
		//def_otra_condicion_view
		//def_condicion (def_script_condicion)
		//def_otra_condicion (def_script_otra_condicion)

		'def_center': {
			x_icons: 'idea',
			x_text_contains: 'centrar',
			hint: 'Centra nodos hijos',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { refx:node.id, class:'text-xs-center' };
				if (node.text_note!='') resp.open = `<!-- ${node.text_note} -->`;
				resp.open = context.tagParams('div',params,false) + '<center>\n';
				resp.close += '</center></div>\n';
				return resp;
			}
		},

		'def_html': {
			x_icons: 'idea',
			x_text_contains: 'html:',
			hint: 'html:x, donde x es cualquier tag',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { refx:node.id };
				// parse attributes
				Object.keys(node.attributes).map(function(key) {
					let value = node.attributes[key];
					// preprocess value
					value = value.replaceAll('$variables.','')
								 .replaceAll('$vars.','')
								 .replaceAll('$params.','')
								 .replaceAll('$config.','process.env')
								 .replaceAll('$store.','$store.state.');
					// query attributes
					if (key.toLowerCase()=='props') {
						for (let i of value.split(',')) {
							params[i] = 'vue:prop';
						}
					} else if (key.charAt(0)!=':' && value!=node.attributes[key]) {
						params[':'+key] = value;
					} else if (key!='v-model') {
						if (context.x_state.central_config.idiomas.indexOf(',')!=-1) {
							// value needs i18n keys
							let def_lang = context.x_state.centrar.idiomas.split(',')[0];
							if (!context.x_state.strings_i18n[def_lang]) {
								context.x_state.strings_i18n[def_lang]={};
							}
							let crc32 = 't_'+context.hash(value);
							context.x_state.strings_i18n[def_lang][crc32] = value;
							params[':'+key] = `$t('${crc32}')`;
						} else {
							params[key] = value;
						}

					} else {
						params[key] = value;
					}
				}.bind(this));
				//
				if (node.text_note!='') resp.open = `<!-- ${node.text_note} -->`;
				let tag = node.text.replace('html:','');
				resp.open += context.tagParams(tag,params,false) + '\n';
				resp.close += `</${tag}>\n`;
				return resp;
			}
		},
		'def_textonly': {
			x_level: '>2',
			x_empty: 'icons',
			x_priority: -5,
			x_or_hasparent: 'def_page,def_componente,def_layout',
			// @TODO (idea) x_not_hasparent: 'def_toolbar+!def_slot,def_variables,def_page_estilos,def_page_estilos', 
			hint: 'Texto a mostrar',
			func: async function(node,state) {
				let resp = context.reply_template({ state }), params={ class:[] }, tmp={};
				let text = node.text.replaceAll('$variables','')
									.replaceAll('$vars.','')
									.replaceAll('$params.','')
									.replaceAll('$env.','process.env.')
									.replaceAll('$store.','$store.state.');
				if (text=='') text = '&nbsp;';
				// some extra validation
				if (await context.hasParentID(node.id,'def_toolbar')==true && await context.hasParentID(node.id,'def_slot')==false) {
					resp.valid=false;
					resp.invalidated_me='def_toolbar';
				} else if (await context.hasParentID(node.id,'def_variables')==true) {
					resp.valid=false;
					resp.invalidated_me='def_variables';
				} else if (await context.hasParentID(node.id,'def_page_estilos')==true) {
					resp.valid=false;
					resp.invalidated_me='def_page_estilos';
				} else if (await context.hasParentID(node.id,'def_page_estilos')==true) {
					resp.valid=false;
					resp.invalidated_me='def_datatable_headers';
				} else {
					if (node.text_note!='') resp.open += `<!-- ${node.text_note} -->\n`;
					//
					if (node.text.indexOf('..lorem..')!=-1 && node.text.indexOf(':')!=-1) {
						//lorem ipsum text
						let lorem = node.text.split(':');
						tmp.lorem = lorem[lorem.length-1];
					}
					if (node.text.indexOf('numeral(')!=-1) {
						//numeral() filter
						context.x_state.plugins['vue-numeral-filter'] = {
							global: true,
							npm: {
								'vue-numeral-filter':'*'
							},
							config: `{ locale: 'es-es' }`
						};
					}
					//node styles
					if (node.font.bold==true) params.class.push('font-weight-bold');
					if (node.font.size>=10) params.class.push('caption');
					if (node.font.italic==true) params.class.push('font-italic');
					// - process attributes
					Object.keys(node.attributes).map(function(key) {
						let keytest = key.toLowerCase().trim();
						let value = node.attributes[key];
						if (keytest=='class') {
							params.class.push(value);
						} else if (keytest==':span') {
							tmp.span = true;
						} else if (keytest==':omit') {
							tmp.omit = true;
						} else if (':length,:largo,len,length,largo'.split(',').includes(key)) {
							tmp.lorem = value;
						} else if (key=='small') {
							tmp.small = true;
						} else if ('ucase,mayusculas,mayuscula'.split(',').includes(key)) {
							if (value=='true' || value==true) params.class.push('text-uppercase');
						} else if ('capitales,capitalize,capital'.split(',').includes(key)) {
							if (value=='true' || value==true) params.class.push('text-capitalize');
						} else if ('lcase,minusculas,minuscula'.split(',').includes(key)) {
							if (value=='true' || value==true) params.class.push('text-lowercase');
						} else if (key=='truncate') {
							if (value=='true' || value==true) params.class.push('text-truncate');
						} else if (key=='no-wrap') {
							if (value=='true' || value==true) params.class.push('text-no-wrap');
						} else if ('weight,peso,grosor'.split(',').includes(key)) {
							let valuetest = value.toLowerCase();
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

						} else if (key=='color') {
							if (key.indexOf(' ')!=-1) {
								let color_values = value.split(' ');
								params.class.push(`${color_values[0]}--text text--${color_values[1]}`);									
							} else {
								params.class.push(`${value}--text`);
							}
						} else if (key=='align') {
							let valuetest = value.toLowerCase();
							if ('center,centro,centrar'.split(',').includes(valuetest)) {
								params.class.push('text-xs-center');
							} else if ('right,derecha'.split(',').includes(valuetest)) {
								params.class.push('text-xs-right');
							} else if ('left,izquierda,izquierdo'.split(',').includes(valuetest)) {
								params.class.push('text-xs-left');
							}

						} else if (key=='style') {
							if (!params.style) params.styles=[];
							params.styles.push(value);
						} else {
							if (key.charAt(0)!=':' && node.text!='' && text!=node.text) {
								params[':'+key] = value;
							} else {
								params[key] = value;
							}
						}
					});
					// - generate lorem.. ipsum text if within text
					if (tmp.lorem) {
						let loremIpsum = require('lorem-ipsum').loremIpsum;
						text = loremIpsum({ count:parseInt(tmp.lorem), units:'words' });
					}
					// - @TODO i18n here
					// - tmp.small
					if (tmp.small) {
						text = `<small>${text}</small>`;
					}
					// - normalize class values (depending on vuetify version)
					params.class = params.class.map(function(x) {
						let resp = x;
						resp.replaceAll('text-h1','display-4')
							.replaceAll('text-h2','display-3')
							.replaceAll('text-h3','display-2')
							.replaceAll('text-h4','display-1')
							.replaceAll('text-h5','headline')
							.replaceAll('text-subtitle-1','subtitle-1')
							.replaceAll('text-subtitle-2','subtitle-2')
							.replaceAll('text-h6','title')
							.replaceAll('text-body-1','body-1')
							.replaceAll('text-body-2','body-2')
							.replaceAll('text-caption','caption')
							.replaceAll('text-overline','overline')
						return resp;
					});
					//normalize params
					if (params.class.length>0) params.class=params.class.join(' ');
					if (params.style) params.styles=params.styles.join(';');
					//write code
					if (!tmp.omit) {
						if (context.hasParentID(node.id,'def_textonly') || tmp.span) {
							resp.open += context.tagParams('span',params) + text + '</span>\n';
						} else if (context.hasParentID(node.id,'def_card_title') && !params.class) {
							resp.open += text + '\n';
						} else {
							resp.open += context.tagParams('div',params) + text + '</div>\n';
						}
					}
					//
				}
				// return
				return resp;
			}
		},

		// *************
		// 	 VARIABLES
		// *************

		'def_variables': {
			x_icons: 'xmag',
			x_level: 3,
			x_text_contains: 'variables',
			hint: 'Definicion local de variables observadas',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = {};
				// process attributes as variables
				// set vars
				if (typeof state.current_page !== 'undefined') {
					if (typeof context.x_state.pages[state.current_page] === 'undefined') context.x_state.pages[state.current_page]={};
					if ('variables' in context.x_state.pages[state.current_page]===false) context.x_state.pages[state.current_page].variables={};
					if ('types' in context.x_state.pages[state.current_page]===false) context.x_state.pages[state.current_page].types={};
				}
				return resp;
			}
		},

		'def_variables_field': {
			x_priority: 1,
			x_empty: 'icons',
			x_level: '>3',
			x_all_hasparent: 'def_variables',
			hint: 'Campo con nombre de variable observada y tipo',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = {}, tmp = { type:'string', field:node.text.trim(), level:node.level-3 };
				//
				if ((tmp.field.contains('[') && tmp.field.contains(']')) ||
					(tmp.field.contains('{') && tmp.field.contains('}'))) {
					// this is a script node
					tmp.type = 'string'; tmp.field = `script${node.id}`;

				} else if (tmp.field.contains(':')) {
					tmp.type = tmp.field.split(':').pop().toLowerCase().trim(); //listlast
					tmp.field = tmp.field.split(':')[0].trim();
				} else if (node.nodes_raw && node.nodes_raw.length>0) {
					// get children nodes, and test that they don't have a help icon.
					let subnodes = await node.getNodes();
					let has_event = false;
					for (let i of subnodes) {
						if (i.icons.includes('help')) {
							has_event = true;
						}
					}
					if (has_event==false) {
						tmp.type = 'object';
					}
				} else {
					tmp.type = 'string';
				}
				// process attributes (and overwrite types if needed)
				Object.keys(node.attributes).map(function(keym) {
					let keytest = keym.toLowerCase().trim();
					let value = node.attributes[keym];
					//console.log(`${tmp.field} attr key:${keytest}, value:${value}`);
					if ('type,tipo,:type,:tipo'.split(',').includes(keytest)) {
						tmp.type = value.toLowerCase().trim();
					} else if ('valor,value,:valor,:value'.split(',').includes(keytest)) {
						let t_value = value.replaceAll('$variables','this.')
											.replaceAll('$vars.','this.')
											.replaceAll('$params.','this.')
											.replaceAll('$env.','process.env.')
											.replaceAll('$store.','this.$store.state.');
						if (t_value.toLowerCase().trim()=='{now}') t_value='new Date()';
						if (t_value.contains('assets:')) {
							t_value = context.getAsset(t_value,'js');
						}
						params.value = t_value;
					} else {
						if (keytest.contains(':')) {
							params[keym.trim()] = value.trim();
						}
					}
				});
				// assign default value for type, if not defined
				//if ('value' in params===false) {
					if ('string,text,texto,script'.split(',').includes(tmp.type)) {
						if ('value' in params===false) {
							params.value = '';
						} else {
							params.value = params.value.toString();
						}
					} else if ('int,numeric,number,numero'.split(',').includes(tmp.type)) {
						if ('value' in params===false) {
							params.value = 0;
						} else {
							params.value = parseInt(params.value);
						}
					} else if ('float,real,decimal'.split(',').includes(tmp.type)) {
						if ('value' in params===false) {
							params.value = 0.0;
						} else {
							params.value = parseFloat(params.value);
						}
					} else if ('boolean,boleano,booleano'.split(',').includes(tmp.type)) {
						if ('value' in params===false) {
							if (tmp.field=='true') {
								// ex value of an array (true/false)
								params.value = true;
							} else if (tmp.field=='false') {
								params.value = false;
							} else {
								params.value = false;
							}
						} else {
							if (params.value=='true') {
								// ex value of an array (true/false)
								params.value = true;
							} else if (params.value=='false') {
								params.value = false;
							}
						}
					} else if ('array'.split(',').includes(tmp.type)) {
						tmp.type = 'array';
						if ('value' in params===false) {
							params.value = [];
						} else {
							params.value = JSON.parse(params.value);
						}

					} else if ('struct,object'.split(',').includes(tmp.type)) {
						tmp.type = 'object';
						if ('value' in params===false) {
							params.value = {};							
						} else {
							params.value = JSON.parse(params.value);
						}
					}
				//}
				// check and prepare global state
				if (typeof state.current_page!=='undefined') {
					if (state.current_page in context.x_state.pages === false) context.x_state.pages[state.current_page]={};
					if ('variables' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].variables={};
					if ('var_types' in context.x_state.pages[state.current_page] === false) context.x_state.pages[state.current_page].var_types={};
				}
				// assign var info to page state
				if (tmp.level==1) {
					// this is a single variable (no dad); eq. variables[field] = value/children
					context.x_state.pages[state.current_page].var_types[tmp.field]=tmp.type;
					context.x_state.pages[state.current_page].variables[tmp.field]=params.value;
					resp.state.vars_path=[tmp.field]; resp.state.vars_types=[tmp.type];
					resp.state.vars_last_level=tmp.level;
				} else {
					// variables[prev_node_text][current_field] = value
					if (resp.state.vars_last_level==tmp.level) {
						// this node is a brother of the last processed one
						resp.state.vars_path.pop(); // remove last field from var path
						resp.state.vars_types.pop(); // remove last field type from vars_types
					}
					resp.state.vars_path.push(tmp.field); // push new var to paths
					//console.log(`trying to set: ${resp.state.vars_path.join('.')} on context.x_state.pages['${state.current_page}'].variables as ${tmp.type}`);
					if (resp.state.vars_types[resp.state.vars_types.length-1]=='object') {
						// dad was an object
						//console.log('dad was an object',resp.state.vars_types[resp.state.vars_types.length-1]);
						setToValue(context.x_state.pages[state.current_page].variables,params.value,resp.state.vars_path.join('.'));
					} else if (resp.state.vars_types[resp.state.vars_types.length-1]=='array') {
						//console.log('dad was an array',resp.state.vars_types[resp.state.vars_types.length-1]);
						// dad is an array.. 
						let copy_dad = [...resp.state.vars_path];
						copy_dad.pop();
						//console.log('my dad path is '+copy_dad.join('.'));
						let daddy = getVal(context.x_state.pages[state.current_page].variables,copy_dad.join('.'));
						//console.log('daddy says:',daddy);
						if (tmp.field!=params.value) {
							// push as object (array of objects)
							let tmpi = {};
							tmpi[tmp.field]=params.value;
							daddy.push(tmpi);
						} else {
							// push just the value (single value)
							daddy.push(params.value);
						}
						// re-set daddy with new value
						setToValue(context.x_state.pages[state.current_page].variables,daddy,copy_dad.join('.'));
					}
					resp.state.vars_types.push(tmp.type); // push new var type to vars_types
					context.x_state.pages[state.current_page].var_types[resp.state.vars_path.join('.')]=tmp.type;
					resp.state.vars_last_level=tmp.level;
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
				}
				// pass level to next var field if it exists 
				// @TODO @DONE I believe this command speed can be improved using the commands state instead of getting Parents
				//console.log('field_var tmp =>',JSON.stringify(tmp));
				//resp.state.tmp_var = tmp;
				return resp;
			}
		},

		'def_variables_watch': {
			x_icons: 'help',
			x_level: '>4',
			x_text_contains: 'change',
			x_all_hasparent: 'def_variables',
			hint: 'Monitorea los cambios realizados a la variable padre',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { name:node.text.trim(), type:'watched', oldvar:'old', newvar:'new', deep:false };
				// process attributes
				Object.keys(node.attributes).map(function(keym) {
					let keytest = keym.toLowerCase().trim();
					let value = node.attributes[keym];
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
				resp.open = context.tagParams('vue_watched_var',params,false);
				if (node.text_note!='') resp.open += `//${node.text_note}\n`;
				resp.close = '</vue_watched_var>';
				return resp;
			}
		},

		'def_variables_func': {
			x_icons: 'help',
			x_level: 4,
			x_not_text_contains: ':server,condicion si,otra condicion',
			x_all_hasparent: 'def_variables',
			hint: 'Variable tipo funcion',
			func: async function(node,state) {
				let resp = context.reply_template({ state });
				let params = { name:node.text.trim(), type:'computed' };
				let tmp = { type:'async' };
				// process attributes
				Object.keys(node.attributes).map(function(key) {
					let keytest = key.toLowerCase().trim().replaceAll(':','');
					let value = node.attributes[key].trim();
					if ('default'==keytest) {
						params.valor = value;
					} else if ('valor,value'.split(',').includes(keytest)) {
						params.valor = value;
					} else if ('lazy'==keytest) {
						params.lazy = (value=='true')?true:false;
					} else if ('observar,onchange,cambie,cambien,modifiquen,cuando,monitorear,watch'.split(',').includes(keytest)) {
						params.watch = value;
					} else if ('async'==keytest) {
						tmp.type = (value=='true')?'async':'sync';
					}
				});
				// built response
				if (tmp.type=='async') {
					// add async plugin to app
					context.x_state.plugins['vue-async-computed'] = {
						global: true, npm: {
							'vue-async-computed':'*'
						}
					};
					resp.open = context.tagParams('vue_async_computed',params,false);
					if (node.text_note!='') resp.open += `//${node.text_note}\n`;
					resp.close = '</vue_async_computed>\n';
				} else {
					resp.open = context.tagParams('vue_computed',params,false);
					if (node.text_note!='') resp.open += `//${node.text_note}\n`;
					resp.close = '</vue_computed>\n';
				}
				// return
				return resp;
			}
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
			hint: 'Emite una respuesta para la variable de tipo funcion',
			func:async function(node,state) {
				let resp = context.reply_template({ state });
				if (node.text_note!='') resp.open = `//${node.text_note}\n`;
				let text = context.dsl_parser.findVariables({ text:node.text, symbol:`"`, symbol_closing:`"` });
				// tests return types
				if (text.contains('**')) {
					let new_vars = context.dsl_parser.replaceVarsSymbol({ text, from:{ open:`**`,close:`**` }, to:{ open:'${',close:'}' } });
					/*if (new_vars.charAt(0)=='+') { // if first char is +
						new_vars = new_vars.slice(1); // remove first char
					} else if (new_vars.slice(-1)=='+') { // if lastchar is +
						new_vars = new_vars.slice(0,-1); // remove last char
					}*/
					resp.open += `return \`${new_vars}\`;\n`;
				} else if (text.contains('$')) {
					text = text .replaceAll('$params','this.')
								.replaceAll('$variables','this.');
					resp.open += `return ${text};\n`;
				} else if (text.contains('assets:')) {
					text = context.getAsset(text,'js');
					resp.open += `return ${text};\n`;
				} else if (text=='') {
					resp.open += `return '';\n`;
				} else if (text.charAt(0)=='(' && text.slice(-1)==')') {
					text = text.slice(1).slice(0,-1);
					resp.open += `return ${text};\n`;
				} else {
					if (context.x_state.central_config.idiomas && context.x_state.central_config.idiomas.contains(',')) {
						// @TODO add support for i18m
					} else {
						resp.open += `return '${text}';\n`;
					}
				}
				return resp;
			}
		},

		//def_responder (@todo i18n)
		//def_insertar_modelo
		//def_consultar_modelo
		//def_modificar_modelo
		//def_eliminar_modelo
		//def_consultar_web
		//def_consultar_web_upload
		//def_consultar_web_download
		//def_aftertime
		//def_struct
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
	}
};

//private helper methods
function setObjectKeys(obj,value) {
	let resp=obj;
	if (typeof resp === 'string') {
		resp = {};
		let keys=obj.split(',');
		for (let i in keys) {
			resp[keys[i]]=value;
		}
	} else {
		for (let i in resp) {
			resp[i]=value;
		}
	}
	return resp;
}

function setToValue(obj, value, path) {
    var i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}

function getVal(project, myPath){
    return myPath.split('.').reduce ( (res, prop) => res[prop], project );
}

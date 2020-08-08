export default async function(context) {
	let dad = context, state = context.x_state;
	let null_template = {	hint:'Allowed node type that must be ommited',
							func:async function(node) {
								return context.reply_template({ hasChildren:false });
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
		'cancel': {...null_template,...{ x_icons:'button_cancel'} },
		'def_config': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'config' } },
		'def_modelos': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'modelos' } },
		'def_assets': {...null_template,...{ x_icons:'desktop_new', x_level:'2', x_text_contains:'assets' } },

		'def_server': {
			x_icons: 'desktop_new',
			x_level: '2',
			x_text_contains: 'server|servidor|api',
			hint: 'Representa a un backend integrado con funciones de express.',
			func: async function(node) {
				let resp = context.reply_template();
				state.npm = {...state.npm, ...{ 'body_parser':'*', 'cookie-parser':'*' } };
				state.central_config.static = false;
				return resp;
			}
		},
		'def_path': {
			x_icons: 'list',
			x_level: '3,4',
			x_or_isparent: 'def_server',
			x_not_icons: 'button_cancel,desktop_new,help',
			hint: 'Carpeta para ubicacion de funcion de servidor',
			func: async function(node) {
				let resp = context.reply_template();
				if (node.level==2) {
					state.current_folder = node.text;
				} else if (node.level==3 && await context.isExactParentID(node.id,'def_path')) {
					let parent_node = await context.dsl_parser.getParentNode({ id:node.id });
					state.current_folder = `${parent_node.text}/${node.id}`;
				} else {
					resp.valid=false;
				}
				return resp;
			}
		},

		'def_imagen': {
			x_icons:'idea',
			x_not_icons:'button_cancel,desktop_new,help',
			x_not_empty:'attributes[:src]',
			x_empty:'',
			x_level:'>2',
			func:async function(node) {
				return context.reply_template({ otro:'Pablo' });
			}
		}
	}
};
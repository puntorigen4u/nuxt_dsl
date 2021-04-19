const concepto = require('concepto');
//import { timingSafeEqual } from 'crypto';
//import { isContext, runInThisContext } from 'vm';
//import concepto from '../../concepto/src/index'
/**
 * Concepto VUE DSL Class: A class for compiling vue.dsl Concepto diagrams into VueJS WebApps.
 * @name 	vue_dsl
 * @module 	vue_dsl
 **/
import internal_commands from './commands'

export default class vue_dsl extends concepto {

    constructor(file, config = {}) {
        // we can get class name, from package.json name key (after its in its own project)
        let my_config = {
            class: 'vue',
            debug: true
        };
        let nuevo_config = {...my_config, ...config };
        super(file, nuevo_config); //,...my_config
    }

    // **************************
    // methods to be auto-called
    // **************************

    //Called after init method finishes
    async onInit() {
        // define and assign commands
        await this.addCommands(internal_commands);
        this.x_console.outT({ message: `${Object.keys(this.x_commands).length} local x_commands loaded!`, color: `green` });
        //this.debug('x_commands',this.x_commands);
        this.x_crypto_key = require('crypto').randomBytes(32); // for hash helper method
        // init vue
        // set x_state defaults
        this.x_state = {
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
            stores_types: { versions: {}, expires: {} },
            nuxt_config: { head_script: {}, build_modules: {}, modules: {} },
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
        }
        // read modelos node (virtual DB)
        this.x_state.models = await this._readModelos(); //alias: database tables
        //is local server running? if so, don't re-launch it
        this.x_state.nuxt_is_running = await this._isLocalServerRunning();
        this.debug('is Server Running: ' + this.x_state.nuxt_is_running);
        // init terminal diagnostics (not needed here)
        if (this.x_state.central_config.nuxt == 'latest' && this.atLeastNode('10') == false) {
            //this.debug('error: You need at least Node v10+ to use latest Nuxt/Vuetify version!');
            throw new Error('You need to have at least Node v10+ to use latest Nuxt/Vuetify version!');
        }
        this.x_state.es6 = (this.x_state.central_config.nuxt == 'latest') ? true : false;
        // copy sub-directories if defined in node 'config.copiar' key
        if (this.x_state.config_node.copiar) {
            let path = require('path');
            let copy = require('recursive-copy');
            this.x_console.outT({ message: `copying config:copiar directories to 'static' target folder`, color: `yellow` });
            await Object.keys(this.x_state.config_node.copiar).map(async function(key) {
                let abs = path.join(this.x_state.dirs.base, key);
                try {
                    await copy(abs, this.x_state.dirs.static);
                } catch (err_copy) {
                    if (err_copy.code != 'EEXIST') this.x_console.outT({ message: `error: copying directory ${abs}`, data: err_copy });
                }
                //console.log('copying ',{ from:abs, to:this.x_state.dirs.static });
            }.bind(this));
            this.x_console.outT({ message: `copying config:copiar directories ... READY`, color: `yellow` });
        }
        // *********************************************
        // install requested modules within config node
        // *********************************************
        // NUXT:ICON
        if (this.x_state.config_node['nuxt:icon']) {
            // add @nuxtjs/pwa module to app
            this.x_state.npm['@nuxtjs/pwa'] = '*';
            // copy icon to static dir
            let path = require('path');
            let source = path.join(this.x_state.dirs.base, this.x_state.config_node['nuxt:icon']);
            let target = this.x_state.dirs.static + 'icon.png';
            this.debug({ message: `NUXT ICON dump (copy icon)`, color: `yellow`, data: source });
            let fs = require('fs').promises;
            try {
                await fs.copyFile(source, target);
            } catch (err_fs) {
                this.x_console.outT({ message: `error: copying NUXT icon`, data: err_fs });
            }
        }
        // GOOGLE:ADSENSE
        if (this.x_state.config_node['google:adsense']) {
            this.x_state.npm['vue-google-adsense'] = '*';
            this.x_state.npm['vue-script2'] = '*';
        }
        // GOOGLE:ANALYTICS
        if (this.x_state.config_node['google:analytics']) {
            this.x_state.npm['@nuxtjs/google-gtag'] = '*';
        }
        // ADD v-mask if latest Nuxt/Vuetify, because vuetify v2+ no longer includes masks support
        if (this.x_state.central_config.nuxt == 'latest') {
            this.x_state.plugins['v-mask'] = {
                global: true,
                npm: { 'v-mask': '*' },
                customcode: `import Vue from 'vue';
import VueMask from 'v-mask';
Vue.directive('mask', VueMask.VueMaskDirective);
Vue.use(VueMask);`,
                dev_npm: {}
            };
        }
        // DEFAULT NPM MODULES & PLUGINS if dsl is not 'componente' type
        if (!this.x_state.central_config.componente) {
            this.x_console.outT({ message: `vue initialized() ->` });
            this.x_state.plugins['vue-moment'] = {
                global: true,
                npm: { 'vue-moment': '*' },
                extra_imports: ['moment'],
                requires: ['moment/locale/es'],
                config: '{ moment }'
            };
            // axios
            this.x_state.npm['@nuxtjs/axios'] = '*';
            if (this.x_state.central_config.nuxt == 'latest') {
                this.x_state.npm['nuxt'] = '*';
            } else {
                this.x_state.npm['nuxt'] = '2.11.0'; // default for compatibility issues with existing dsl maps	
            }
            // express things
            this.x_state.npm['express'] = '*';
            this.x_state.npm['serverless-http'] = '*';
            this.x_state.npm['serverless-apigw-binary'] = '*';
            this.x_state.npm['underscore'] = '*';
            // dev tools
            this.x_state.dev_npm['serverless-prune-plugin'] = '*';
            this.x_state.dev_npm['serverless-offline'] = '*';
            this.x_state.dev_npm['vue-beautify-loader'] = '*';
            //
            if (this.x_state.central_config.dominio) {
                this.x_state.dev_npm['serverless-domain-manager'] = '*';
            }
        } else {
            // If DSL mode 'component(e)' @TODO this needs a revision (converting directly from CFC)
            this.x_console.outT({ message: `vue initialized() -> as component/plugin` });
            this.x_state.npm['global'] = '^4.4.0';
            this.x_state.npm['poi'] = '9';
            this.x_state.npm['underscore'] = '*';
            this.x_state.dev_npm['@vue/test-utils'] = '^1.0.0-beta.12';
            this.x_state.dev_npm['babel-core'] = '^6.26.0';
            this.x_state.dev_npm['babel-preset-env'] = '^1.6.1';
            this.x_state.dev_npm['jest'] = '^22.4.0';
            this.x_state.dev_npm['jest-serializer-vue'] = '^0.3.0';
            this.x_state.dev_npm['vue'] = '*';
            this.x_state.dev_npm['vue-jest'] = '*';
            this.x_state.dev_npm['vue-server-renderer'] = '*';
            this.x_state.dev_npm['vue-template-compiler'] = '*';
        }
        // serialize 'secret' config keys as json files in app secrets sub-directory (if any)
        // extract 'secret's from config keys; 
        /* */
        this.x_state.secrets={}; //await _extractSecrets(config_node)
        let path = require('path');
        for (let key in this.x_state.config_node) {
            if (key.contains(':')==false) {
                if (this.x_state.config_node[key][':secret']) {
                    let new_obj = {...this.x_state.config_node[key]};
                    delete new_obj[':secret']
                    if (new_obj[':link']) delete new_obj[':link']
                    // set object keys to uppercase
                    this.x_state.secrets[key]={};
                    let obj_keys = Object.keys(new_obj);
                    for (let x in obj_keys) {
                        this.x_state.secrets[key][x.toUpperCase()] = new_obj[x];
                    }
                    let target = path.join(this.x_state.dirs.secrets, `${key}.json`);
                    await this.writeFile(target,JSON.stringify(new_obj));
                }
            }
        }
        // set config keys as ENV accesible variables (ex. $config.childnode.attributename)
        for (let key in this.x_state.config_node) {
            // omit special config 'reserved' node keys
            if (['aurora', 'vpc', 'aws'].includes(key) && typeof this.x_state.config_node[key] === 'object') {
                Object.keys(this.x_state.config_node[key]).map(function(attr) {
                    this.x_state.envs[`config.${key}.${attr}`] = `process.env.${(key+'_'+attr).toUpperCase()}`;
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
        let resp = node.text;
        Object.keys(node.attributes).map(function(i) {
            if (i == 'title' || i == 'titulo') {
                resp = node.attributes[i];
                return false;
            }
        }.bind(this));
        /*
        for (i in node.attributes) {
        	if (['title','titulo'].includes(node.attributes[i])) {
        		resp = node.attributes[i];
        		break;
        	}
        }*/
        return resp;
    }

    //Called for naming filename of class/page by testing node.
    async onDefineFilename(node) {
        let resp = node.text;
        // @idea we could use some 'slug' method here
        resp = resp.replace(/\ /g, '_') + '.vue';
        if (node.icons.includes('gohome')) {
            if (this.x_state.central_config.componente == true && this.x_state.central_config.service_name) {
                resp = this.x_state.central_config.service_name + '.vue';
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
    }

    //Called for naming the class/page by testing node.
    async onDefineNodeName(node) {
        return node.text.replace(' ', '_');
    }

    //Defines template for code given the processedNode of process() - for each level2 node
    async onCompleteCodeTemplate(processedNode) {
        return processedNode;
    }

    //Defines preparation steps before processing nodes.
    async onPrepare() {
        if (!this.x_state.central_config.componente && this.x_state.central_config.deploy && this.x_state.central_config.deploy.indexOf('eb:') != -1) {
            // if deploying to AWS eb:x, then recover/backup AWS credentials from local system
            let ini = require('ini'),
                path = require('path'),
                fs = require('fs').promises;
            // read existing AWS credentials if they exist
            let os = require('os');
            let aws_ini = '';
            let aws_ini_file = path.join(os.homedir(), '/.aws/') + 'credentials';
            try {
                //this.debug('trying to read AWS credentials:',aws_ini_file);
                aws_ini = await fs.readFile(aws_ini_file, 'utf-8');
                this.debug('AWS credentials:',aws_ini);
            } catch (err_reading) {}
            // 
            if (this.x_state.config_node.aws) {
                // if DSL defines temporal AWS credentials for this app .. 
                // create backup of aws credentials, if existing previously
                if (aws_ini != '') {
                    let aws_bak = path.join(this.x_state.dirs.base, 'aws_backup.ini');
                    this.x_console.outT({ message: `config:aws:creating .aws/credentials backup`, color: 'yellow' });
                    await fs.writeFile(aws_bak, aws_ini, 'utf-8');
                }
                // debug
                this.x_console.outT({ message: `config:aws:access ->${this.x_state.config_node.aws.access}` });
                this.x_console.outT({ message: `config:aws:secret ->${this.x_state.config_node.aws.secret}` });
                // transform config_node.aws keys into ini
                let to_ini = ini.stringify({
                    aws_access_key_id: this.x_state.config_node.aws.access,
                    aws_secret_access_key: this.x_state.config_node.aws.secret
                }, { section: 'default' });
                this.debug('Setting .aws/credentials from config node');
                // save as .aws/credentials (ini file)
                await fs.writeFile(aws_ini_file, to_ini, 'utf-8');

            } else if (aws_ini != '') {
                // if DSL doesnt define AWS credentials, use the ones defined within the local system.
                let parsed = ini.parse(aws_ini);
                if (parsed.default) this.debug('Using local system AWS credentials', parsed.default);
                this.x_state.config_node.aws = { access: '', secret: '' };
                if (parsed.default.aws_access_key_id) this.x_state.config_node.aws.access = parsed.default.aws_access_key_id;
                if (parsed.default.aws_secret_access_key) this.x_state.config_node.aws.secret = parsed.default.aws_secret_access_key;
            }
        }
    }

    //Executed when compiler founds an error processing nodes.
    async onErrors(errors) {}

    //configNode helper
    async generalConfigSetup() {
        //this.x_state.dirs.base
        this.debug('Setting general configuration steps');
        this.debug('Defining nuxt.config.js : initializing');
        // default modules
        this.debug('Defining nuxt.config.js : default modules');
        this.x_state.nuxt_config.modules['@nuxtjs/axios'] = {};
        //google analytics
        if (this.x_state.config_node['google:analytics']) {
            this.debug('Defining nuxt.config.js : Google Analytics');
            this.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag'] = {
                'id': this.x_state.config_node['google:analytics'].id,
                'debug': true,
                'disableAutoPageTrack': true
            };
            if (this.x_state.config_node['google:analytics'].local) this.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag'].debug = this.x_state.config_node['google:analytics'].local;
            if (this.x_state.config_node['google:analytics'].auto && this.x_state.config_node['google:analytics'].auto == true) {
                delete this.x_state.nuxt_config.build_modules['@nuxtjs/google-gtag']['disableAutoPageTrack'];
            }
        }
        //medianet
        if (this.x_state.config_node['ads:medianet'] && this.x_state.config_node['ads:medianet']['cid']) {
            this.debug('Defining nuxt.config.js : MediaNet');
            this.x_state.nuxt_config.head_script['z_ads_medianet_a'] = {
                'innerHTML': 'window._mNHandle = window._mNHandle || {}; window._mNHandle.queue = window._mNHandle.queue || []; medianet_versionId = "3121199";',
                'type': 'text/javascript'
            };
            this.x_state.nuxt_config.head_script['z_ads_medianet_b'] = {
                'src': `https://contextual.media.net/dmedianet.js?cid=${this.x_state.config_node['ads:medianet'][cid]}`,
                'async': true
            };
            this.x_state.plugins['vue-script2'] = {
                global: true,
                npm: { 'vue-script2': '*' }
            };
        }
        //google Adsense
        if (this.x_state.config_node['google:adsense']) {
            this.debug('Defining nuxt.config.js : Google Adsense');
            if (this.x_state.config_node['google:adsense'].auto && this.x_state.config_node['google:adsense'].client) {
                this.x_state.nuxt_config.head_script['google_adsense'] = {
                    'src': 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    'data-ad-client': this.x_state.config_node['google:adsense'].client,
                    'async': true
                };
                this.x_state.plugins['adsense'] = {
                    global: true,
                    npm: {
                        'vue-google-adsense': '*',
                        'vue-script2': '*'
                    },
                    mode: 'client',
                    customcode: `
					import Vue from "vue";
					import Ads from "vue-google-adsense";

					Vue.use(require('vue-script2'));
					Vue.use(Ads.AutoAdsense, { adClient: '${this.x_state.config_node['google:adsense']['client']}'});`
                };
            } else {
                this.x_state.plugins['adsense'] = {
                    global: true,
                    npm: {
                        'vue-google-adsense': '*',
                        'vue-script2': '*'
                    },
                    mode: 'client',
                    customcode: `
					import Vue from "vue";
					import Ads from "vue-google-adsense";

					Vue.use(require('vue-script2'));
					Vue.use(Ads.Adsense);
					Vue.use(Ads.InArticleAdsense);
					Vue.use(Ads.InFeedAdsense);`
                };
            }
        }
        //nuxt:icon
        if (this.x_state.config_node['nuxt:icon']) {
            this.debug('Defining nuxt.config.js : module nuxtjs/pwa (nuxt:icon)');
            this.x_state.nuxt_config.modules['@nuxtjs/pwa'] = {};
        }
        //idiomas i18n
        if (this.x_state.central_config['idiomas'].indexOf(',') != -1) {
            this.debug('Defining nuxt.config.js : module nuxt/i18n (idiomas)');
            this.x_state.npm['nuxt-i18n'] = '*';
            this.x_state.npm['fs'] = '*';
            this.x_state.nuxt_config.modules['nuxt-i18n'] = {
                'defaultLocale': this.x_state.central_config['idiomas'].split(',')[0],
                'vueI18n': { 'fallbackLocale': this.x_state.central_config['idiomas'].split(',')[0] },
                'detectBrowserLanguage': {
                    'useCookie': true,
                    'alwaysRedirect': true
                },
                locales: [],
                lazy: true,
                langDir: 'lang/'
            };
            let self = this;
            this.x_state.central_config['idiomas'].split(',').map(function(lang) {
                if (lang == 'es') {
                    self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                        code: 'es',
                        iso: 'es-ES',
                        file: `${lang}.js`
                    });
                } else if (lang == 'en') {
                    self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                        code: 'en',
                        iso: 'en-US',
                        file: `${lang}.js`
                    });
                } else {
                    self.x_state.nuxt_config.modules['nuxt-i18n'].locales.push({
                        code: lang,
                        file: `${lang}.js`
                    });
                }
            }.bind(self));
        }
        //local storage
        if (this.x_state.stores_types['local'] && Object.keys(this.x_state.stores_types['local']) != '') {
            this.debug('Defining nuxt.config.js : module nuxt-vuex-localstorage (store:local)');
            this.x_state.nuxt_config.modules['nuxt-vuex-localstorage'] = {
                mode: 'debug',
                'localStorage': Object.keys(this.x_state.stores_types['local'])
            };
        }
        //session storage
        if (this.x_state.stores_types['session'] && Object.keys(this.x_state.stores_types['session']) != '') {
            this.debug('Defining nuxt.config.js : module nuxt-vuex-localstorage (store:session)');
            let prev = {};
            // if vuex-localstorage was defined before, recover keys and just replace with news, without deleting previous
            if (this.x_state.nuxt_config.modules['nuxt-vuex-localstorage']) prev = this.x_state.nuxt_config.modules['nuxt-vuex-localstorage'];
            this.x_state.nuxt_config.modules['nuxt-vuex-localstorage'] = {...prev,
                ... {
                    mode: 'debug',
                    'sessionStorage': Object.keys(this.x_state.stores_types['session'])
                }
            };
        }
        //proxies
        let has_proxies = false,
            proxies = {};
        let self = this;
        Object.keys(this.x_state.central_config).map(function(key) {
            if (key.indexOf('proxy:') != -1) {
                let just_key = key.split(':')[1];
                proxies[just_key] = self.x_state.central_config[key];
                has_proxies = true;
            }
        }.bind(self));
        if (has_proxies) {
            this.debug('Defining nuxt.config.js : module nuxtjs/proxy (central:proxy)');
            this.x_state.npm['@nuxtjs/proxy'] = '*';
            this.x_state.nuxt_config.modules['@nuxtjs/proxy'] = { 'proxy': proxies };
        }
        //end
    }

    //.gitignore helper
    async createGitIgnore() {
        this.debug('writing .gitignore files');
        let fs = require('fs').promises,
            path = require('path');
        if (this.x_state.central_config.componente) {
            this.debug({ message: 'writing dsl /.gitignore file' });
            let git =
                `# Mac System files
.DS_Store
.DS_Store?
_MACOSX/
Thumbs.db
# VUE files
# Concepto files
dsl_cache/
dsl_cache.ini
vue.dsl
tmp.ini
${this.x_state.dirs.compile_folder}/node_modules/`;
            await fs.writeFile(`${this.x_state.dirs.base}.gitignore`, git, 'utf-8'); //.gitignore
            this.x_console.out({ message: 'writing component .gitignore file' });
            git =
                `# Mac System files
.DS_Store
.DS_Store?
_MACOSX/
Thumbs.db
# NPM files
package-lock.json
node_modules/
# AWS EB files
.elasticbeanstalk/*
!.elasticbeanstalk/*.cfg.yml
!.elasticbeanstalk/*.global.yml`;
            await fs.writeFile(`${this.x_state.dirs.app}/.gitignore`, git, 'utf-8'); //app/.gitignore
        } else {
            this.x_console.out({ message: 'writing /.gitignore file' });
            let git =
                `# Mac System files
.DS_Store
.DS_Store?
_MACOSX/
Thumbs.db
# VUE files
.nuxt/
# Concepto files
dsl_cache/
dsl_cache.ini
tmp.ini
vue.dsl
stats.txt
stats.json
store/
${this.x_state.dirs.compile_folder}/node_modules/
${this.x_state.dirs.compile_folder}/secrets/`;
            await fs.writeFile(`${this.x_state.dirs.base}.gitignore`, git, 'utf-8'); //.gitignore
        }
    }

    //process .omit file 
    async processOmitFile(thefile) {
        //@TODO 13-mar-21 check if .toArray() is needed here (ref processInternalTags method)
        //internal_stores.omit
        let self = this;
        if (thefile.file == 'internal_stores.omit') {
            this.debug('processing internal_stores.omit');
            let cheerio = require('cheerio');
            let $ = cheerio.load(thefile.code, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });
            let nodes = $(`store_mutation`).toArray();
            nodes.map(function(elem) {
                let cur = $(elem);
                let store = cur.attr('store') ? cur.attr('store') : '';
                let mutation = cur.attr('mutation') ? cur.attr('mutation') : '';
                let params = cur.attr('params') ? cur.attr('params') : '';
                let code = cur.text();
                if (self.x_state.stores[store] && !(':mutations' in self.x_state.stores[store])) {
                    self.x_state.stores[store][':mutations'] = {};
                }
                self.x_state.stores[store][':mutations'][mutation] = { code, params };
            });
        }
        //internal_middleware.omit
        if (thefile.file == 'internal_middleware.omit') {
            this.debug('processing internal_middleware.omit');
            let cheerio = require('cheerio');
            let $ = cheerio.load(thefile.code, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });
            let nodes = $(`proxy_code`).toArray();
            nodes.map(function(elem) {
                let cur = $(elem);
                let name = cur.attr('name') ? cur.attr('name') : '';
                self.x_state.proxies[name].code = cur.text().trim();
            });
        }
        //server.omit
        if (thefile.file == 'server.omit') {
            this.debug('processing server.omit');
            let cheerio = require('cheerio');
            let $ = cheerio.load(thefile.code, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });
            let nodes = $(`func_code`).toArray();
            nodes.map(function(elem) {
                let cur = $(elem);
                let name = cur.attr('name') ? cur.attr('name') : '';
                self.x_state.functions[name].code = cur.text().trim();
            });
        }
    }

    async getBasicVue(thefile) {
        // write .VUE file
        let vue = { template: thefile.code, script: '', style: '', first: false };
        let page = this.x_state.pages[thefile.title];
        if (page) {
            // declare middlewares (proxies)
            if (page.proxies.indexOf(',') != -1) {
                this.debug('- declare middlewares');
                vue.script += `middleware: [${page.proxies}]`;
                vue.first = true;
            } else if (page.proxies.trim() != '') {
                this.debug('- declare middlewares');
                vue.script += `middleware: '${page.proxies}'`;
                vue.first = true;
            }
            // layout attr
            if (page.layout != '') {
                this.debug('- declare layout');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                vue.script += `layout: '${page.layout.trim()}'`;
            }
            // declare components
            if (page.components != '') {
                this.debug('- declare components');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                vue.script += `components: {`;
                let comps = [];
                Object.keys(page.components).map(function(key) {
                    comps.push(` '${key}': ${page.components[key]}`);
                }); //.bind(page,comps));
                vue.script += `${comps.join(',')}\n\t}`;
            }
            // declare directives
            if (page.directives != '') {
                this.debug('- declare directives');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                vue.script += `directives: {`;
                let directs = [];
                Object.keys(page.directives).map(function(key) {
                    if (key == page.directives[key]) {
                        directs.push(key);
                    } else {
                        directs.push(`'${key}': ${page.directives[key]}`);
                    }
                }); //.bind(page,directs));
                vue.script += `${directs.join(',')}\n\t}`;
            }
            // declare props (if page tipo componente)
            if (page.tipo == 'componente' && page.params != '') {
                this.debug('- declare componente:props');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                let props = [];
                if (Object.keys(page.defaults) != '') {
                    page.params.split(',').map(function(param) {
                        let def_val = '';
                        if (page.defaults[key]) def_val = page.defaults[key];
                        if (def_val == true || def_val == 'true' || def_val == 'false' || def_val == false) {
                            props.push(`${key}: { default: ${def_val}}`);
                        } else if (!isNaN(+(def_val))) { //if def_val is number or string with number
                            props.push(`${key}: { default: ${def_val}}`);
                        } else if (def_val.indexOf('[') != -1 && def_val.indexOf(']') != -1) {
                            props.push(`${key}: { type: Array, default: () => ${def_val}}`);
                        } else if (def_val.indexOf('{') != -1 && def_val.indexOf('}') != -1) {
                            props.push(`${key}: { type: Object, default: () => ${def_val}}`);
                        } else if (def_val.indexOf("'") != -1) {
                            props.push(`${key}: { default: ${def_val}}`);
                        } else {
                            props.push(`${key}: { default: '${def_val}' }`);
                        }
                    });
                } else {
                    page.params.split(',').map(function(param) {
                        props.push(`'${key}'`);
                    });
                }
                vue.script += `\tprops: {${props.join(',')}}`;
            }
            // declare meta data
            if (page.xtitle || page.meta.length > 0) {
                this.debug('- declare head() meta data');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                vue.script += ` head() {\n return {\n`;
                // define title
                if (page.xtitle) {
                    if (this.x_state.central_config.idiomas.indexOf(',') != -1) {
                        // i18n title
                        let crc32 = `t_${this.hash(page.xtitle)}`;
                        let def_lang = this.x_state.central_config.idiomas.indexOf(',')[0].trim().toLowerCase();
                        if (!this.x_state.strings_i18n[def_lang]) {
                            this.x_state.strings_i18n[def_lang] = {};
                        }
                        this.x_state.strings_i18n[def_lang][crc32] = page.xtitle;
                        vue.script += `titleTemplate: this.$t('${crc32}')\n`;
                    } else {
                        // normal title
                        vue.script += `titleTemplate: '${page.xtitle}'\n`;
                    }
                }
                // define meta SEO
                if (page.meta.length > 0) {
                    if (page.xtitle) vue.script += `,`;
                    vue.script += `meta: ${JSON.stringify(page.meta)}\n`;
                }
                vue.script += `};\n}`;
            }
            // declare variables (data)
            if (Object.keys(page.variables) != '') {
                this.debug('- declare data() variables');
                if (vue.first) vue.script += ',\n';
                vue.first = true;
                let util = require('util');
                vue.script += `data() {\n`;
                vue.script += ` return ${util.inspect(page.variables,{ depth:Infinity })}\n`;
                vue.script += `}\n`;
            }
        }
        return vue;
    }

    async processInternalTags(vue, page) {
        let cheerio = require('cheerio');
        let $ = cheerio.load(vue.template, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });

        let nodes = $(`server_asyncdata`).toArray();
        if (nodes.length > 0) this.debug('post-processing server_asyncdata tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        nodes.map(function(elem) {
            let cur = $(elem);
            let name = cur.attr('return') ? cur.attr('return') : '';
            vue.script += `async asyncData({ req, res, params }) {\n`;
            vue.script += ` if (!process.server) { const req={}, res={}; }\n`;
            vue.script += ` ${cur.text()}`;
            vue.script += ` return ${name};\n`;
            vue.script += `}\n`;
            cur.remove();
        });
        vue.template = $.html();
        if (nodes.length > 0) vue.script += `}\n`;
        // process ?mounted event
        nodes = $(`vue_mounted`).toArray();
        if (nodes.length > 0) this.debug('post-processing vue_mounted tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += `async mounted() {\n`;
        nodes.map(function(elem) {
            let cur = $(elem);
            vue.script += cur.text();
            cur.remove();
        });
        vue.template = $.html();
        if (nodes.length > 0) vue.script += `}\n`;
        // process ?var (vue_computed)
        nodes = $('vue_computed').toArray();
        //this.debug('nodes',nodes);
        if (nodes.length > 0) this.debug('post-processing vue_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += `computed: {\n`;
        let computed = [];
        nodes.map(function(elem) {
            let cur = $(elem);
            let name = cur.attr('name');
            let code = cur.html();
            computed.push(`${name}() {${code}}`);
            cur.remove();
            //return elem;
        });
        vue.template = $.html();
        vue.script += computed.join(',');
        if (nodes.length > 0) vue.script += `}\n`;
        // process ?var (asyncComputed)
        nodes = $('vue_async_computed').toArray();
        if (nodes.length > 0) this.debug('post-processing vue_async_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += `asyncComputed: {\n`;
        let async_computed = [];
        nodes.map(function(elem) {
            let cur = $(elem);
            let code = cur.text();
            if (cur.attr('valor') || cur.attr('watch')) {
                let lazy = '';
                if (cur.attr('lazy')) lazy += `,lazy: ${cur.attr('lazy')}`;
                let valor = '';
                if (cur.attr('valor')) {
                    valor += `,`;
                    let test = cur.attr('valor');
                    if ((test.indexOf('[') != -1 && test.indexOf(']') != -1) ||
                        (test.indexOf('{') != -1 && test.indexOf('}') != -1) ||
                        (test.indexOf('(') != -1 && test.indexOf(')') != -1)
                    ) {
                        valor += `default: ${test}`;
                    } else {
                        valor += `default: '${test}'`;
                    }
                }
                let watch = '';
                if (cur.attr('watch')) {
                    watch += ',';
                    let test = cur.attr('watch');
                    let test_n = [];
                    test.split(',').map(function(x) {
                        let tmp = x.replaceAll('$variables.', '')
                            .replaceAll('$vars', '')
                            .replaceAll('$params', '')
                            .replaceAll('$store', '$store.state.');
                        test_n.push(`'${tmp}'`);
                    });
                    watch += `watch: [${test_n.join(',')}]`;
                }
                async_computed.push(`
					${cur.attr('name')}: {
						async get() {
							${code}
						}
						${lazy}
						${valor}
						${watch}
					}
				`);
            } else {
                async_computed.push(`async ${cur.attr('name')}() {${code}}`);
            }
            cur.remove();
        });
        vue.template = $.html();
        vue.script += async_computed.join(',');
        if (nodes.length > 0) vue.script += `}\n`;
        // process var ?change -> vue_watched_var
        nodes = $('vue_watched_var').toArray();
        if (nodes.length > 0) this.debug('post-processing vue_async_computed tag');
        if (nodes.length > 0 && vue.first) vue.script += ',\n';
        vue.first = true;
        if (nodes.length > 0) vue.script += `watch: {\n`;
        let watched = [];
        nodes.map(function(elem) {
            let cur = $(elem);
            let code = cur.text();
            if (cur.attr('deep')) {
                watched.push(`
				'${cur.attr('flat')}': {
					handler(newVal, oldVal) {
						let evento = { ${cur.attr('newvar')}:newVal, ${cur.attr('oldvar')}:oldVal };
						${code}
					},
					deep: true
				}
				`);
            } else {
                watched.push(`
				'${cur.attr('flat')}': function (newVal, oldVal) {
					let evento = { ${cur.attr('newvar')}:newVal, ${cur.attr('oldvar')}:oldVal };
					${code}
				}
				`);
            }
            cur.remove();
        });
        vue.template = $.html();
        vue.script += watched.join(',');
        if (nodes.length > 0) vue.script += `}\n`;
        // process vue_if tags -- @TODO double-check when vue_if command exists (13-mar-21)
        nodes = $('vue_if').toArray();
        if (nodes.length > 0) this.debug('post-processing vue_if tag');
        nodes.map(function(elem) {
            let cur = $(elem);
            let if_type = cur.attr('tipo');
            let if_test = cur.attr('expresion');
            if (cur.attr('target') != 'template') {
                //search refx ID tag
                let target = $(`*[refx="${cur.attr('target')}"]`).toArray();
                if (target.length > 0) {
                    let target_node = $(target[0]);
                    if (if_type == 'v-else') {
                        target_node.attr(if_type, '');
                    } else {
                        target_node.attr(if_type, if_test);
                    }
                }
                cur.remove();
            }
        });
        vue.template = $.html();
        // process vue_for tags -- @TODO double-check when vue_for command exists (13-mar-21)
        nodes = $('vue_for').toArray();
        if (nodes.length > 0) this.debug('post-processing vue_for tag');
        nodes.map(function(elem) {
            let cur = $(elem);
            let iterator = cur.attr('iterator')
                .replaceAll('$variables', '')
                .replaceAll('$vars', '')
                .replaceAll('$params.', '')
                .replaceAll('$store', '$store.state.');
            if (cur.attr('use_index') && cur.attr('use_index') == 'false' && cur.attr('key') != '0') {
                iterator = `(${cur.attr('item')}, ${cur.attr('key')}) in ${iterator}`;
            } else if (cur.attr('use_index') && cur.attr('use_index') == 'false' && cur.attr('key') == '0') {
                iterator = `${cur.attr('item')} in ${iterator}`;
            } else if (cur.attr('key') && cur.attr('key') != '0' && cur.attr('use_index') != 'false') {
                iterator = `(${cur.attr('item')}, ${cur.attr('key')}, ${cur.attr('use_index')}) in ${iterator}`;
            } else {
                iterator = `(${cur.attr('item')}, ${cur.attr('use_index')})`;
            }
            if (cur.attr('target') != 'template') {
                //search refx ID tag
                let target = $(`*[refx="${cur.attr('target')}"]`).toArray();
                if (target.length > 0) {
                    let target_node = $(target[0]);
                    target_node.attr('v-for', iterator);
                    if (cur.attr('unique') != 0) target_node.attr(':key', cur.attr('unique'));
                    //cur.remove(); -remove only if target is found..
                }
                cur.remove(); // remove also if target node is not found
            } else {
                // transform <v_for>x</v_for> -> <template v-for='iterator'>x</template>
                // lookAt x=v_for_selector.html() and selector.replaceWith('<template v-for>'+x+'</template>')
                let inner = cur.html();
                cur.replaceWith(`<template v-for="${iterator}">${inner}</template>`);
            }
        });
        vue.template = $.html();
        // process vue_for tags -- @TODO double-check when vue_for command exists (13-mar-21)
        let common_methods = $('vue_event_method').toArray();
        let on_events = $('vue_event_element').toArray();
        if (common_methods.length > 0 || on_events.length > 0) {
            this.debug('post-processing methods (common, timer, and v-on element events methods)');
            if (vue.first) vue.script += ',\n';
            vue.first = true;
            let methods = [],
                self = this;
            // event_methods
            common_methods.map(function(elem) {
                let cur = $(elem);
                let code = cur.text();
                let tmp = '';
                if (cur.attr('timer_time')) {
                    self.x_state.npm['vue-interval'] = '*';
                    page.mixins['vueinterval'] = 'vue-interval/dist/VueInterval.common';
                    let timer_prefix = '';
                    if (cur.attr('timer_time') && cur.attr('timer_time') != '') {
                        //always in ms; tranform into 1e2 notation
                        let ceros = cur.attr('timer_time').length - 1;
                        let first = cur.attr('timer_time')[0];
                        timer_prefix = `INTERVAL__${first}e${ceros}$`;
                    }
                    if (cur.attr('m_params')) {
                        if (cur.attr('type') == 'async') {
                            tmp += `${timer_prefix}${cur.attr('name')}: async function(${cur.attr('m_params')}) {`;
                        } else {
                            tmp += `${timer_prefix}${cur.attr('name')}: function(${cur.attr('m_params')}) {`;
                        }
                    } else {
                        if (cur.attr('type') == 'async') {
                            tmp += `${timer_prefix}${cur.attr('name')}: async function() {`;
                        } else {
                            tmp += `${timer_prefix}${cur.attr('name')}: function() {`;
                        }
                    }
                } else {
                    if (cur.attr('m_params')) {
                        if (cur.attr('type') == 'async') {
                            tmp += `${cur.attr('name')}: async function(${cur.attr('m_params')}) {`;
                        } else {
                            tmp += `${cur.attr('name')}: function(${cur.attr('m_params')}) {`;
                        }
                    } else {
                        if (cur.attr('type') == 'async') {
                            tmp += `${cur.attr('name')}: async function() {`;
                        } else {
                            tmp += `${cur.attr('name')}: function() {`;
                        }
                    }
                }
                methods.push(`${tmp}\n${code}\n}`);
                cur.remove();
            });
            // events_methods
            on_events.map(function(elem) {
                let evt = $(elem);
                //search father node of event
                let origin = $($(`*[refx="${evt.attr('parent_id')}"]`).toArray()[0]);
                let event = evt.attr('event');
                // declare call in origin node
                if (evt.attr('link')) {
                    // event linked to another node; usually another existing method func
                    let link = evt.attr('link');
                    // plugin related events
                    if (event == 'click-outside') {
                        origin.attr('v-click-outside', link);
                    } else if (event == 'visibility') {
                        origin.attr('v-observe-visibility', link);
                    } else if (event == ':rules') {
                        origin.attr(':rules', `[${link}]`);
                    } else if (event == 'resize') {
                        origin.attr('v-resize', link);
                    } else {
                        // custom defined methods
                        if (evt.attr('v_params')) {
                            // v-on with params
                            if (evt.attr('link_id')) {
                                origin.attr(`v-on:${event}`, `${link}_${evt.attr('link_id')}(${evt.attr('v_params')})`);
                            } else {
                                origin.attr(`v-on:${event}`, `${link}(${evt.attr('v_params')})`);
                            }
                        } else {
                            // without params
                            if (evt.attr('link_id')) {
                                origin.attr(`v-on:${event}`, `${link}_${evt.attr('link_id')}`);
                            } else {
                                origin.attr(`v-on:${event}`, link);
                            }
                        }
                        //
                    }
                    /* @TODO check if this is needed/used: was on original CFC code, but it seems it just overwrites previous things
                    if (evt.attr('link_id')) { 	
                    	origin.attr(`v-on:${event}`,`${link}_${evt.attr('link_id')}($event)`);
                    }
                    */
                } else {
                    // create method function and script
                    let tmp = '';
                    let method_name = event.replaceAll(':', '_').replaceAll('.', '_').replaceAll('-', '_');
                    let method_code = evt.text();
                    if (event == 'click-outside') {
                        origin.attr(`v-click-outside`, method_name);
                        tmp = `${method_name}: async function() {
							${method_code}
						}`;
                    } else if (event == 'visibility') {
                        origin.attr(`v-observe-visibility`, method_name);
                        tmp = `${method_name}: async function(estado, elemento) {
							${method_code}
						}`;
                    } else if (event == ':rules') {
                        origin.attr(`:rules`, `[${method_name}]`);
                        tmp = `${method_name}: function() {
							${method_code}
						}`;
                    } else if (event == 'resize') {
                        origin.attr(`v-resize`, method_name);
                        tmp = `${method_name}: async function() {
							${method_code}
						}`;
                    } else {
                        if (evt.attr('v_params') && evt.attr('v_params') != '') {
                            origin.attr(`v-on:${event}`, `${method_name}(${evt.attr('v_params')})`);
                        } else {
                            origin.attr(`v-on:${event}`, `${method_name}($event)`);
                        }
                        if (evt.attr('n_params')) {
                            tmp = `${method_name}: async function(${evt.attr('n_params')}) {
								${method_code}
							}`;
                        } else {
                            tmp = `${method_name}: async function(evento) {
								${method_code}
							}`;
                        }
                    }
                    // push tmp to methods
                    methods.push(tmp);
                }
                // remove original event tag node
                evt.remove();
            });
            // apply methods and changes
            vue.script += `methods: {
							${methods.join(',')}
						   }`;
            vue.template = $.html(); // apply changes to template
        }
        /* */
        return vue;
    }

    processStyles(vue, page) {
        let cheerio = require('cheerio');
        let $ = cheerio.load(vue.template, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });
        let styles = $(`page_estilos`).toArray();
        if (styles.length > 0) {
            this.debug('post-processing styles');
            let node = $(styles[0]);
            if (node.attr('scoped') && node.attr('scoped') == 'true') {
                vue.style += `
				<style scoped>
				${node.text()}
				</style>`;
            } else {
                vue.style += `
				<style>
				${node.text()}
				</style>`;
            }
            node.remove();
        }
        vue.template = $.html();
        // add page styles (defined in js) to style tag code
        if (Object.keys(page.styles).length > 0) {
            let jss = require('jss').default;
            let global_plug = require('jss-plugin-global').default;
            jss.use(global_plug());
            let sheet = jss.createStyleSheet({
                '@global': page.styles
            });
            if (!vue.style) vue.style = '';
            vue.style += `<style>\n${sheet.toString()}</style>`;
            //this.debug('JSS sheet',sheet.toString());
        }
        return vue;
    }

    processMixins(vue, page) {
        // call after processInternalTags
        if (page.mixins && Object.keys(page.mixins).length > 0) {
            this.debug('post-processing mixins');
            if (vue.first) vue.script += ',\n';
            vue.first = true;
            vue.script += `mixins: [${Object.keys(page.mixins).join(',')}]`;
            let mixins = [];
            for (let key in page.mixins) {
                mixins.push(`import ${key} from '${page.mixins[key]}'`);
            }
            vue.script = vue.script.replaceAll('{concepto:import:mixins}', mixins.join(';'));
        } else {
            vue.script = vue.script.replaceAll('{concepto:import:mixins}', '');
        }
        return vue;
    }

    removeRefx(vue) {
        let cheerio = require('cheerio');
        let $ = cheerio.load(vue.template, { ignoreWhitespace: false, xmlMode: true, decodeEntities: false });
        let refx = $(`*[refx]`).toArray();
        if (refx.length > 0) {
            this.debug('removing refx attributes (internal)');
            refx.map(function(x) {
                $(x).attr('refx', null);
            });
            vue.template = $.html();
        }
        return vue;
    }

    fixVuePaths(vue, page) {
        for (let key in this.x_state.pages) {
            if (this.x_state.pages[key].path) {
                vue.script = vue.script.replaceAll(`{vuepath:${key}}`, this.x_state.pages[key].path);
            } else {
                this.x_console.outT({ message: `WARNING! path key doesn't exist for page ${key}`, color: 'yellow' });
            }
        }
        // remove / when first char inside router push name
        vue.script = vue.script.replaceAll(`this.$router.push({ name:'/`, `this.$router.push({ name:'`);
        return vue;
    }

    async processLangPo(vue, page) {
        // writes default lang.po file and converts alternatives to client/lang/iso.js
        if (this.x_state.central_config.idiomas.indexOf(',') != -1) {
            this.debug('process /lang/ po/mo files');
            let path = require('path'),
                fs = require('fs').promises;
            // .check and create directs if needed
            let lang_path = path.join(this.x_state.dirs.base, '/lang/');
            try {
                await fs.mkdir(lang_path, { recursive: true });
            } catch (errdir) {}
            // .create default po file from strings_i18n
            let def_lang = this.x_state.central_config.idiomas.split(',')[0];

            // .read other po/mo files from lang dir and convert to .js
            for (let idioma in this.x_state.central_config.idiomas.split(',')) {
                if (idioma != def_lang) {

                }
            }
            //
        }
        return vue;
    }

    async createVueXStores() {
        if (Object.keys(this.x_state.stores).length>0) {
            this.x_console.outT({ message:`creating VueX store definitions`, color:'cyan' });
            let path = require('path');
            let util = require('util');
            let safe = require('safe-eval');
            for (let store_name in this.x_state.stores) {
                let store = this.x_state.stores[store_name];
                let file = path.join(this.x_state.dirs.store,`${store_name}.js`);
                let def_types = {
                    'integer': 0,
                    'int': 0,
                    'float': 0.0,
                    'boolean': false,
                    'array': []
                };
                let obj = {}, mutations={};
                // iterate each store field
                //this.debug(`store ${store_name}`,store);
                for (let field_name in store) {
                    let field = store[field_name];
                    //this.debug({ message:`checking field ${field_name} within store ${i}` });
                    if (field.default && field.default.trim()=='') {
                        if (field.type in def_types) {
                            obj[field_name]=def_types[field.type];
                        } else {
                            obj[field_name]='';
                        }
                    } else {
                        if ('integer,int,float,boolean,array'.split(',').includes[field.type]) {
                            obj[field_name]=safe(field.default);
                        } else if ('true,false,0,1'.split(',').includes[field.default]) {
                            obj[field_name]=safe(field.default);
                        } else {
                            obj[field_name]=''+field.default;
                        }
                    }
                }
                // expires?
                if (store_name in this.x_state.stores_types['expires']) {
                    obj['expire']=parseInt(this.x_state.stores_types['expires'][store_name]);
                }
                // versions?
                if (store_name in this.x_state.stores_types['versions']) {
                    obj['version']=parseInt(this.x_state.stores_types['versions'][store_name]);
                }
                // write content
                delete obj[':mutations'];
                let content = `export const state = () => (${util.inspect(obj,{ depth:Infinity })})\n`;
                // :mutations?
                if (':mutations' in store) {
                    let muts=[];
                    for (let mut_name in store[':mutations']) {
                        let mutation = store[':mutations'][mut_name];
                        let mut = { params:['state'] };
                        if (Object.keys(mutation.params).length>0) mut.params.push('objeto');
                        muts.push(`${mut_name}(${mut.params.join(',')}) {
                            ${mutation.code}
                        }`);
                    }
                    content += `\nexport const mutations = {${ muts.join(',')}}`;
                }
                // write file
                this.writeFile(file,content);
            }
        }
    }

    async createServerMethods() {
        if (Object.keys(this.x_state.functions).length>0) {
            this.x_console.outT({ message:`creating NuxtJS server methods`, color:'green' });
            let path = require('path');
            let file = path.join(this.x_state.dirs.server,`api.js`);
            let content = `
            var express = require('express'), _ = require('underscore'), axios = require('axios');
            var server = express();
            var plugins = {
                bodyParser: require('body-parser'),
                cookieParser: require('cookie-parser')
            };
            server.disable('x-powered-by');
            server.use(plugins.bodyParser.urlencoded({ extended: false,limit: '2gb' }));
            server.use(plugins.bodyParser.json({ extended: false,limit: '2gb' }));
            server.use(plugins.cookieParser());
            `;
            //merge functions import's into a single struct
            let imps = {};
            for (let x in this.x_state.functions) {
                for (let imp in this.x_state.functions[x]) {
                    imps[imp] = this.x_state.functions[x][imp];
                }
            }
            //declare imports
            content += `// app declared functions imports\n`;
            for (let x in imps) {
                content += `var ${imps[x]} = require('${x}');\n`;
            }
            content += `// app declared functions\n`;
            //declare app methods
            for (let func_name in this.x_state.functions) {
                let func = this.x_state.functions[func_name];
                let func_return = ``;
                if (func.return!='') func_return = `res.send(${func.return});`;
                content += 
                `server.${func.method}('${func.path}', async function(req,res) {
                    var params = req.${(func.method=='get')?'params':'body'};
                    ${func.code}
                    ${func_return}
                });\n`;
            }
            //close
            content += `module.exports = server;\n`;
            //write file
            this.writeFile(file,content);
            this.x_console.outT({ message:`NuxtJS server methods ready`, color:'green' });
        }
    }

    async createMiddlewares() {
        if (Object.keys(this.x_state.proxies).length>0) {
            this.x_console.outT({ message:`creating VueJS Middlewares`, color:'cyan' });
            let path = require('path');
            for (let proxy_name in this.x_state.proxies) {
                let proxy = this.x_state.proxies[proxy_name];
                let file = path.join(this.x_state.dirs.middleware,`${proxy_name}.js`);
                //add imports
                let content = ``;
                for (let key in proxy.imports) {
                    content += `import ${proxy.imports[key]} from '${key}'\n`;
                }
                //add proxy code
                content += 
                `export default async function ({ route, store, redirect, $axios }) {
                    ${proxy.code}\n
                }
                `;
                //find and replace instances of strings {vuepath:targetnode}
                for (let page_name in this.x_state.pages) {
                    if (page_name!='') {
                        let page = this.x_state.pages[page_name];
                        if (page.path) {
                            content = content.replaceAll(`{vuepath:${page_name}}`,page.path);
                        } else {
                            this.x_console.outT({ message:`Warning! path key doesn't exist for page ${page_name}`, color:'yellow'});
                        }
                    }
                }
                //write file
                this.writeFile(file,content);
            }
            this.x_console.outT({ message:`VueJS Middlewares ready`, color:'cyan' });
        }
    }

    async prepareServerFiles() {
        let path = require('path');
        let index = 
        `// index.js
        const sls = require('serverless-http');
        const binaryMimeTypes = require('./binaryMimeTypes');
        const express = require('express');
        const app = express();
        const { Nuxt } = require('nuxt');
        const path = require('path');
        const config = require('./nuxt.config.js');

        async functions nuxtApp() {
            app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));
            const nuxt = new Nuxt(config);
            await nuxt.ready();
            app.use(nuxt.render);
            return app;
        }

        module.exports.nuxt = async (event, context) => {
            let nuxt_app = await nuxtApp();
            let handler = sls(nuxt_app, { binary: binaryMimeTypes });
            return await handler (event, context);
        }
        `;
        let index_file = path.join(this.x_state.dirs.app,`index.js`);
        this.writeFile(index_file,index);
        // allowed binary mimetypes
        let util = require('util');
        let allowed = [
            'application/javascript', 'application/json', 'application/octet-stream', 'application/xml',
            'font/eot', 'font/opentype', 'font/otf', 
            'image/jpeg', 'image/png', 'image/svg+xml',
            'text/comma-separated-values', 'text/css', 'text/html', 'text/javascript', 'text/plain', 'text/text', 'text/xml'
        ];
        if (this.x_state.config_node['nuxt:mimetypes']) {
            let user_mimes = [];
            for (let usermime in this.x_state.config_node['nuxt:mimetypes']) {
                user_mimes.push(usermime);
            }
            let sum_mime = [...allowed, ...user_mimes];
            allowed = [...new Set(sum_mime)]; // clean duplicated values from array
        }
        let mime = 
        `// binaryMimeTypes.js
        module.exports = ${util.inspect(allowed,{ depth:Infinity })};`;
        let mime_file = path.join(this.x_state.dirs.app,`binaryMimeTypes.js`);
        this.writeFile(mime_file,mime);
    }

    async installRequiredPlugins() {
        this.x_state.plugins['vuetify'] = {
            global: true,
            npm: { 'node-sass':'*' },
            dev_npm: { '@nuxtjs/vuetify':'*' },
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
        this.x_state.nuxt_config.build_modules['@nuxtjs/vuetify'] = {};
        this.x_state.plugins['aos'] = {
            global: true,
            npm: { aos:'*' },
            mode: 'client',
            customcode: 
            `import AOS from "aos";
            import "aos/dist/aos.css";
            export default ({app}) => {
                app.AOS = new AOS.init({});
            };`
        };
    }

    async createNuxtPlugins() {
        let path = require('path');
        let resp = { global_plugins:{}, css_files:[], nuxt_config:[] };
        for (let plugin_key in this.x_state.plugins) {
            let plugin = this.x_state.plugins[plugin_key];
            if (typeof plugin === 'object') {
                // copy x_state_plugins npm's into npm global imports (for future package.json)
                if (plugin.npm) this.x_state.npm = {...this.x_state.npm, ...plugin.npm };
                if (plugin.dev_npm) this.x_state.dev_npm = {...this.x_state.dev_npm, ...plugin.dev_npm };
                if (plugin.global && plugin.global==true) resp.global_plugins[plugin_key] = '*';
                if (plugin.styles) {
                    for (let style_key in plugin.styles) {
                        let style = plugin.styles[style_key];
                        if (style.file.contains('/')==false) {
                            let target = path.join(this.x_state.dirs.css, style.file);
                            await this.writeFile(target, style.content);
                            resp.css_files.push(style);
                        }
                    }
                }
                // write the plugin code
                let import_as='', code='';
                if (plugin.var) {
                    import_as = plugin.var;
                } else {
                    import_as = plugin_key.split('/').splice(-1)[0]
                                                    .replaceAll('-','')
                                                    .replaceAll('_','')
                                                    .toLowerCase().trim();
                }
                code = `import Vue from 'vue'`;
                if (plugin.as_star) {
                    if (plugin.as_star==true) {
                        code += `import * as ${import_as} from '${plugin_key}'`;
                    } else {
                        code += `import ${import_as} from '${plugin_key}'`;
                    }
                } else {
                    code += `import ${import_as} from '${plugin_key}'`;
                }
                if (plugin.custom) code += `${plugin.custom}\n`;
                if (plugin.extra_imports) {
                    for (let extra in plugin.extra_imports) {
                        let new_key = plugin.extra_imports[extra]
                                        .replaceAll('-','')
                                        .replaceAll('_','')
                                        .replaceAll('/','')
                                        .replaceAll('.css','')
                                        .replaceAll('.','_')
                                        .toLowerCase().trim();
                        code += `import ${new_key} from '${plugin.extra_imports[extra]}'\n`;
                    }
                }
                if (plugin.requires) {
                    for (let req in plugin.requires) code += `require('${plugin.requires[req]}');\n`;
                }
                if (plugin.styles) {
                    for (let style_key in plugin.styles) {
                        let style = plugin.styles[style_key];
                        if (style.file.contains('/')) {
                            code += `import '${style.file}';\n`;
                        }
                    }
                }
                // add config to plugin code if requested
                if (plugin.config) {
                    if (typeof plugin.config === 'object') {
                        code += 
                        `const config = ${util.inspect(plugin.config,{ depth:Infinity })};
                        Vue.use(${import_as},config);`;        
                    } else {
                        code += `Vue.use(${import_as},${plugin.config});\n`;
                    }
                } else if (plugin.tag) {
                    code += `Vue.component('${plugin.tag}',${import_as});\n`;
                } else if (plugin.customvar) {
                    code += `Vue.use(${plugin.customvar});\n`;
                } else {
                    code += `Vue.use(${import_as});\n`;
                }
                // if customcode overwrite 'code'
                if (plugin.customcode) {
                    code = plugin.customcode;
                }
                // write to disk and add to response
                if (import_as!='vuetify') {
                    if (plugin.mode) {
                        resp.nuxt_config.push({ mode:plugin.mode.toLowerCase().trim(), src:`~/plugins/${import_as}.js` });
                    } else {
                        resp.nuxt_config.push({ src:`~/plugins/${import_as}.js` });
                    }
                    let target = path.join(this.x_state.dirs.plugins, `${import_as}.js`);
                    await this.writeFile(target, code);
                }
            } else {
                //simple plugin
                this.x_state.npm[plugin_key] = plugin;
                let import_as = plugin_key.replaceAll('-','')
                                          .replaceAll('_','')
                                          .toLowerCase().trim();
                code += 
                `import Vue from 'vue'
                import ${import_as} from '${plugin_key}'
                Vue.use(${import_as});
                `;
                // write to disk and add to response
                if (import_as!='vuetify') {
                    resp.nuxt_config.push({ src:`~/plugins/${import_as}.js` });
                    let target = path.join(this.x_state.dirs.plugins, `${import_as}.js`);
                    await this.writeFile(target, code);
                }
            }
        }
        return resp;
    }

    async createNuxtConfig() {
        //creates the file nuxt.config.js
        //define structure with defaults
        let path = require('path');
        let target = path.join(this.x_state.dirs.app,`nuxt.config.js`);
        let config = {
            mode: this.x_state.central_config[':mode'],
            target: '',
            components: true,
            loading: {
                color: 'orange',
                height: '2px',
                continuous: true
            },
            head: {
                title: (this.x_state.config_node['nuxt:title'])?this.x_state.config_node['nuxt:title']:this.x_state.central_config.apptitle,
                meta: [],
                link: [
                    { rel: 'icon', type: 'image/x-icon', href:'/favicon.ico' },
                    { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
                ],
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
        };
        //add title:meta data
        if (this.x_state.config_node['nuxt:meta']) {
            for (let meta_key in this.x_state.config_node['nuxt:meta']) {
                if (meta_key.charAt(0)!=':') {
                    let test = meta_key.toLowerCase().trim();
                    let value = this.x_state.config_node['nuxt:meta'][meta_key];
                    if (test=='charset') {
                        config.head.meta.push({ charset:value });
                    } else if (test=='description') {
                        config.head.push({ hid:'description', name:'description', content:value });
                    } else {
                        config.head.meta.push({ name:meta_key, content:value });
                    }
                }
            }
        } else if (this.x_state.config_node.meta && this.x_state.config_node.meta.length>0) {
            config.head.meta = this.x_state.config_node.meta;
        }
        //add custom head scripts
        //sort head scripts a-z
        let as_array = [];
        for (let head in this.x_state.head_script) {
            as_array.push({ key:head, params:this.x_state.head_script[head] });
            //config.head.script.push({ ...this.x_state.head_script[head] });
        }
        let sorted = as_array.sort(function(key) {
            let sort_order=1; //desc=-1
            return function(a,b) {
                if (a[key] < b[key]) {
                    return -1 * sort_order;
                } else if (a[key] > b[key]) {
                    return 1 * sort_order;
                } else {
                    return 0 * sort_order;
                }
            }
        });
        for (let head in sorted) {
            config.head.script.push(sorted[head].params);
        }
        //nuxt axios config
        if (this.x_state.config_node.axios) {
            let ax_config = { 
                proxy:(this.x_state.nuxt_config.modules['@nuxtjs/proxy'])?true:false 
            };
            ax_config = {...this.x_state.config_node.axios, ...ax_config};
            if (ax_config.retries) {
                ax_config.retry = { retries:ax_config.retries };
                delete ax_config.retries;
                this.x_state.npm['axios-retry']='*';
            }
            if (this.x_state.central_config.deploy.contains('eb:') || this.x_state.central_config.deploy.contains('true')) {
                if (this.x_state.config_node.axios.deploy) {
                    ax_config.baseURL = this.x_state.config_node.axios.deploy;
                    ax_config.browserBaseURL = this.x_state.config_node.axios.deploy;
                    delete ax_config.deploy;
                }
            } else if (this.x_state.central_config.deploy=='local') {
                if (this.x_state.config_node.axios.local) {
                    ax_config.baseURL = this.x_state.config_node.axios.local;
                    ax_config.browserBaseURL = this.x_state.config_node.axios.local;
                    delete ax_config.local;
                    if (this.x_state.config_node.axios.local.contains('127.0.0.1')) 
                        this.x_state.config_node.axios.https=false;
                }
            }
            config.axios = ax_config;
        }
        //nuxt vue config
        if (this.x_state.config_node['vue:config']) {
            config.vue = { config:this.x_state.config_node['vue:config'] };
            delete config.vue.config[':secret'];
            delete config.vue.config[':link'];
        }
        //nuxt proxy config keys
        if (this.x_state.nuxt_config.modules['@nuxtjs/proxy']) {
            config.proxy = this.x_state.nuxt_config.modules['@nuxtjs/proxy'];
        }
        //nuxt env variables
        config.env={};
        for (let node_key in this.x_state.config_node) {
            if (node_key.contains(':')==false) {
                if ('aurora,vpc,aws'.split(',').includes(node_key)==false) {
                    if (this.x_state.secrets[node_key]===undefined && typeof this.x_state.config_node[node_key] === 'object') {
                        config.env[node_key.toLowerCase()]={...this.x_state.config_node[node_key]};
                    }
                }
            }
        }
        //nuxt google:analytics
        if (this.x_state.config_node['google:analytics']) {
            if (this.x_state.config_node['google:analytics'].local && this.x_state.config_node['google:analytics'].local==true) {
                config.debug=true;
            }
        }
        //nuxt modules
        for (let module_key in this.x_state.nuxt_config.modules) {
            let module = this.x_state.nuxt_config.modules[module_key];
            if (Object.keys(module)=='') {
                config.modules.push(module_key);
            } else {
                config.modules.push([module_key,module]);
            }
        }
        //nuxt build_modules
        for (let module_key in this.x_state.nuxt_config.build_modules) {
            let module = this.x_state.nuxt_config.build_modules[module_key];
            if (Object.keys(module)=='') {
                config.buildModules.push(module_key);
            } else {
                config.buildModules.push([module_key,module]);
            }
        }
        //nuxt plugins
        config.plugins = this.x_state.nuxt_config.plugins;
        config.css = this.x_state.nuxt_config.css;
        //muxt server methods
        if (this.x_state.functions && Object.keys(this.x_state.functions).length>0) config.serverMiddleware = ['~/server/api'];
        //nuxt build - cfc: 12637
        config.build = { publicPath:'/_nuxt/' };
        if (this.x_state.central_config.stage && this.x_state.central_config.stage!='production' && this.x_state.central_config.stage!='prod') {
            config.build.publicPath = `/${this.x_state.central_config.stage}/_nuxt/`;
        }
        //we don't need webpack build rules in this edition:omit from cfc, so we are ready here
        let util = require('util');
        let content = util.inspect(config,{ depth:Infinity }).replaceAll("'`","`").replaceAll("`'","`");
        await this.writeFile(target,`export default ${content}`);
        //this.x_console.outT({ message:'future nuxt.config.js', data:data});
    }

    async createPackageJSON() {
        let data = {
            name: this.x_state.central_config.service_name,
            version: '',
            description: this.x_state.central_config[':description'],
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
        };
        //if not static
        if (!this.x_state.central_config.static) {
            data.scripts = {...data.scripts, ...{
                build: 'nuxt build --no-lock',
                start: 'nuxt start --no-lock',
                generate: 'nuxt generate',
                deploy: 'nuxt build --no-lock && sls deploy'
            }};
        }
        //overwrite if we are a component
        if (this.x_state.central_config.componente) {
            data = {
                name: '',
                version: '',
                description: '',
                main: this.x_state.central_config.service_name+'.vue',
                dependencies: {},
                devDependencies: {},
                scripts: {
                    test: 'jest',
                    build: 'poi build --prod'
                },
                jest: {
                    moduleFileExtensions: ['js','vue'],
                    moduleNameMapper: { '^@/(.*)$':'<rootDir>/src/$1' },
                    transform: {
                        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
                        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
                    },
                    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
                },
                unpkg: `umd/${this.x_state.central_config.service_name}.js`,
                jsdelivr: `umd/${this.x_state.central_config.service_name}.js`,
                keywords: [],
                author: '',
                license: ''
            };
        }
        //if port is not 3000
        if (this.x_state.central_config.port!=3000) data.scripts.dev = `nuxt --port ${this.x_state.central_config.port}`;
        if (this.x_state.central_config[':version']) data.version = this.x_state.central_config[':version'];
        if (this.x_state.central_config[':author']) data.author = this.x_state.central_config[':author'];
        if (this.x_state.central_config[':license']) data.license = this.x_state.central_config[':license'];
        if (this.x_state.central_config[':git']) {
            data.repository = {
                type: 'git',
                url: `git+${this.x_state.central_config[':git']}.git`
            };
            data.bugs = {
                url: `${this.x_state.central_config[':git']}/issues`
            }
            data.homepage = this.x_state.central_config[':git'];
        }
        if (this.x_state.central_config[':keywords']) data.keywords = this.x_state.central_config[':keywords'].split(',');
        //add dependencies
        for (let pack in this.x_state.npm) {
            if (this.x_state.npm[pack].contains('http') && this.x_state.npm[pack].contains('github.com')) {
                data.dependencies[pack] = `git+${this.x_state.npm[pack]}`;
            } else {
                data.dependencies[pack] = this.x_state.npm[pack];
            }
        }
        //add devDependencies
        for (let pack in this.x_state.dev_npm) {
            if (this.x_state.dev_npm[pack].contains('http') && this.x_state.dev_npm[pack].contains('github.com')) {
                data.devDependencies[pack] = `git+${this.x_state.dev_npm[pack]}`;
            } else {
                data.devDependencies[pack] = this.x_state.dev_npm[pack];
            }
        }
        //write to disk
        let path = require('path');
        let target = path.join(this.x_state.dirs.app,`package.json`);
        let content = JSON.stringify(data);
        await this.writeFile(target,content);
        //this.x_console.outT({ message:'future package.json', data:data});
    }

    async createServerlessYML() {
        let yaml = require('yaml'), data = {};
        if (this.x_state.central_config.deploy.contains('eb:')==false &&
            this.x_state.central_config.deploy!=false &&
            this.x_state.central_config.deploy!='local') {
            data.service = this.x_state.central_config.service_name;
            data.custom = {
                prune: {
                    automatic: true,
                    includeLayers: true,
                    number: 1
                },
                apigwBinary: {
                    types: ['*/*']
                }
            };
            //add 'secrets' config json keys - cfc:12895
            //this.x_state.secrets
            for (let secret in this.x_state.secrets) {
                data.custom[secret] = '${file(secrets/'+secret+'.json)}'
            }
            //domain info
            if (this.x_state.central_config.dominio) {
                data.custom.customDomain = {
                    domainName: this.x_state.central_config.dominio
                };
                if (this.x_state.central_config.basepath) data.custom.customDomain.basePath = this.x_state.central_config.basepath;
                if (this.x_state.central_config.stage) data.custom.customDomain.stage = this.x_state.central_config.stage;
                data.custom.customDomain.createRoute53Record = true;
            }
            //nodejs env on aws
            data.provider = {
                name: 'aws',
                runtime: 'nodejs8.10',
                timeout: this.x_state.central_config.timeout
            };
            if (this.x_state.central_config.stage) data.provider.stage = this.x_state.central_config.stage;
            //env keys
            if (Object.keys(this.x_state.config_node)!='') {
                data.provider.enviroment = {};
                if (this.x_state.central_config.stage) data.provider.enviroment.STAGE = this.x_state.central_config.stage;
                if (this.x_state.config_node.vpc) {
                    data.provider.vpc = {
                        securityGroupIds: [this.x_state.config_node.vpc.security_group_id],
                        subnetIDs: []
                    };
                    if (this.x_state.secrets.vpc) {
                        data.provider.vpc.securityGroupIds = ['${self:custom.vpc.SECURITY_GROUP_ID}'];
                    }
                    if (this.x_state.config_node.vpc.subnet1_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET1_ID}'); 
                    if (this.x_state.config_node.vpc.subnet2_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET2_ID}');
                    if (this.x_state.config_node.vpc.subnet3_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET3_ID}');
                    if (this.x_state.config_node.vpc.subnet4_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET4_ID}');
                    if (this.x_state.config_node.vpc.subnet5_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET5_ID}');
                    if (this.x_state.config_node.vpc.subnet6_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET6_ID}');
                    if (this.x_state.config_node.vpc.subnet7_id) data.provider.vpc.subnetIDs.push('${self:custom.vpc.SUBNET7_ID}');
                }
            }
            //aws iam for s3 permissions (x_state.aws_iam) (@TODO later - cfc:12990)
            /*
            data.provider.iamRoleStatements = {
                Effect: 'Allow'
            };*/
            //nuxt handler
            data.functions = {
                nuxt: {
                    handler: 'index.nuxt',
                    events: [{'http':'ANY /'},{'http':'ANY /{proxy+}'}]
                }
            };
            if (this.x_state.central_config['keep-warm']) {
                data.functions.nuxt.events.push({ schedule: 'rate(20 minutes)'})
            }
            //aws resources for s3 (x_state.aws_resources) (@TODO later - no commands use them - cfc:13017)
            //serverless plugins
            data.plugins = ['serverless-apigw-binary',
                            'serverless-offline',
                            'serverless-prune-plugin'];
            if (this.x_state.central_config.dominio) data.plugins.push('serverless-domain-manager');
            //write yaml to disk
            let content = yaml.stringify(data);
            let path = require('path');
            let target = path.join(this.x_state.dirs.app,`serverless.yml`);
            await this.writeFile(target,content);
            //debug
            //this.debug('future serverless.yml', content);
        }
    }

    async onEnd() {
        //execute deploy (npm install, etc) AFTER vue compilation (18-4-21: this is new)
        if (!(await this.deploy()) && !this.x_state.central_config.componente) {
            this.x_console.outT({ message:'Something went wrong deploying', color:'red' });
        };
        //restores aws credentials if modified by onPrepare after deployment
        if (!this.x_state.central_config.componente && 
            this.x_state.central_config.deploy && 
            this.x_state.central_config.deploy.indexOf('eb:') != -1 && 
            this.x_state.config_node.aws) {
            // only execute after deploy and if user requested specific aws credentials on map
            let path = require('path'), copy = require('recursive-copy'), os = require('os');
            let fs = require('fs');
            let aws_bak = path.join(this.x_state.dirs.base, 'aws_backup.ini');
            let aws_file = path.join(os.homedir(), '/.aws/') + 'credentials';
            // try to copy aws_bak over aws_ini_file (if bak exists)
            let exists = s => new Promise(r=>fs.access(s, fs.constants.F_OK, e => r(!e)));
            if ((await exists(aws_bak))) {
                await copy(aws_bak,aws_file,{ overwrite:true, dot:true, debug:false });
                // remove aws_bak file
                await fs.promises.unlink(aws_bak);
            }
        }
    }

    async exists(dir_or_file) {
        let fs = require('fs').promises;
        try {
            await fs.access(dir_or_file);
            return true;
        } catch(e) {
            return false;
        }
    }

    async deploy_build() {
        // builds the project
        let spawn = require('await-spawn'), path = require('path'), fs = require('fs').promises;
        //let ora = require('ora');
        let node_modules_final = path.join(this.x_state.dirs.app,'node_modules');
        let npm={};
        this.x_console.outT({ message:`Building project`, color:'cyan' });
        let spinner = this.x_console.spinner({ message:'Building project' });
        let node_modules_exist = await this.exists(node_modules_final);
        /*try {
            await fs.access(node_modules_final);
        } catch(e) {
            node_modules_exist = false;
        }*/
        // issue npm install (400mb)
        if (!node_modules_exist) {
            spinner.start(`Installing npm packages`);
            //this.x_console.outT({ message:`Installing npm packages` });
            try {
                npm.install = await spawn('npm',['install'],{ cwd:this.x_state.dirs.app }); //, stdio:'inherit'
                spinner.succeed(`npm install succesfully`);
            } catch(n) { 
                npm.install=n; 
                spinner.fail('Error installing npm packages');
                return false;
            }
        } else {
            spinner.succeed(`Using existing npm packages`);
        }
        // issue npm run build
        spinner.start(`Building NUXT project`);
        try {
            npm.build = await spawn('npm',['run','build'],{ cwd:this.x_state.dirs.app });
            spinner.succeed('Project build successfully');
        } catch(nb) { 
            npm.build = nb; 
            spinner.fail('NUXT build failed');
            return false;
        }
        this.x_console.out({ message:`Spinner stopped`, color:'cyan' });
        return true;
    }

    async deploy_aws_eb() {
        let spawn = require('child_process').spawn;
        //AWS EB deploy
        this.debug('AWS EB deploy');
        let eb_full = this.x_state.central_config.deploy.replaceAll('eb:','');
        let eb_appname = eb_full;
        let eb_instance = `${eb_appname}-dev`;
        if (this.x_state.central_config.deploy.contains(',')) {
            eb_appname = eb_full.split(',')[0];
            eb_instance = eb_full.split(',').splice(-1)[0];
        }
        if (eb_appname!='') {
            let spinner = this.x_console.spinner({ message:'Creating config files' });
            //this.x_console.outT({ message:`Creating EB config yml: ${eb_appname} in ${eb_instance}`, color:'yellow' });
            let yaml = require('yaml');
            let data = {
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
            };
            //create .elasticbeanstalk directory
            let path = require('path'), fs = require('fs').promises;
            let eb_base = this.x_state.dirs.app;
            if (this.x_state.central_config.static) eb_base = path.join(eb_base,'dist');
            let eb_dir = path.join(eb_base,'.elasticbeanstalk');
            try { await fs.mkdir(eb_dir, { recursive: true }); } catch(ef) {}
            //write .elasticbeanstalk/config.yml file with data
            await this.writeFile(path.join(eb_dir,'config.yml'),yaml.stringify(data));
            //write .npmrc file
            await this.writeFile(path.join(eb_base,'.npmrc'),'unsafe-perm=true');
            //create .ebignore file
let eb_ig = `node_modules/
jspm_packages/
.npm
.node_repl_history
*.tgz
.yarn-integrity
.editorconfig
# Mac OSX
.DS_Store
# Elastic Beanstalk Files
.elasticbeanstalk/*
!.elasticbeanstalk/*.cfg.yml
!.elasticbeanstalk/*.global.yml`;
            await this.writeFile(path.join(eb_base,'.ebignore'),eb_ig);
            //init git if not already
            spinner.succeed('EB config files created successfully');
            if (!(await this.exists(path.join(eb_base,'.git')))) {
                //git directory doesn't exist
                spinner.start('Initializing project git repository');
                spinner.text('Creating .gitignore file');
let git_ignore=`# Mac System files
.DS_Store
.DS_Store?
__MACOSX/
Thumbs.db
# VUE files
node_modules/`;
                
                await this.writeFile(path.join(eb_base,'.gitignore'),git_ignore);
                spinner.succeed('.gitignore created');
                spinner.start('Initializing local git repository ..');
                let results = {};
                try {
                    results.git_init = await spawn('git',['init','-q'],{ cwd:eb_base });
                    spinner.succeed('GIT initialized');
                } catch(gi) { 
                    results.git_init = gi; 
                    spinner.fail('GIT failed to initialize');
                    //return false;
                }
                spinner.start('Adding files to local git ..');
                try {
                    results.git_add = await spawn('git',['add','.'],{ cwd:eb_base });
                    spinner.succeed('git added files successfully');
                } catch(gi) { 
                    results.git_add = gi; 
                    spinner.fail('git failed to add local files');
                    //return false;
                }
                spinner.start('Creating first git commit ..');
                try {
                    results.git_commit = await spawn('git',['commit','-m',"'Inicial'"],{ cwd:eb_base });
                    spinner.succeed('git created first commit successfully');
                } catch(gi) { 
                    results.git_commit = gi; 
                    spinner.fail('git failed to create first commit');
                    //return false;
                }
                // 18-4-21 @TODO continue - cfc 160 helpers/vue/vue.cfc
            }
            
        }
    }
    
    async deploy_aws_logo() {
        let asciify = require('asciify-image'), path = require('path');
        let aws = path.join(__dirname,'assets','aws.png');
        let logo_txt = await asciify(aws, 
            { 
                fit:'width',
                width:25
            }
        );
        console.log(logo_txt);
    }

    async deploy() {
        if (this.x_state.central_config.deploy) {
            if (this.x_state.central_config.deploy.contains('eb:')) {
                this.x_console.title({ title:'Deploying to Amazon AWS Elastic Bean', color:'green' });
                await this.deploy_aws_logo();
                // builds the app
                //if (!(await this.deploy_build())) return false;
                await this.deploy_build(); //comment after debugging
                await this.deploy_aws_eb();
            }
        }
        return true;
    }

    async writeFile(file,content,encoding='utf-8') {
        let fs = require('fs').promises, beautify = require('js-beautify');
        let beautify_js = beautify.js;
        let beautify_vue = beautify.html;
        let beautify_css = beautify.css;
        let ext = file.split('.').splice(-1)[0].toLowerCase();
        let resp = content;
        if (ext=='js' || ext=='json') {
            resp = beautify_js(resp, { space_in_empty_paren: false });
        } else if (ext=='vue') {
            resp = beautify_vue(resp, { indent_scripts: 'keep' });
        } else if (ext=='css') {
            resp = beautify_css(resp, { indent_scripts: 'keep' });
        }
        await fs.writeFile(file, resp, encoding);
    }

    //Transforms the processed nodes into files.
    async onCreateFiles(processedNodes) {
        //this.x_console.out({ message:'onCreateFiles', data:processedNodes });
        //this.x_console.out({ message:'x_state', data:this.x_state });
        await this.generalConfigSetup();
        await this.createGitIgnore();
        this.debug('processing nodes');
        let fs = require('fs').promises, path = require('path');
        for (let thefile_num in processedNodes)  {
            //await processedNodes.map(async function(thefile) {
            let thefile = processedNodes[thefile_num];
            let contenido = thefile.code + '\n';
            if (thefile.file.split('.').slice(-1) == 'omit') {
                await this.processOmitFile(thefile);
                //process special non 'files'
            } else {
                this.debug('processing node ' + thefile.title);
                let vue = await this.getBasicVue(thefile);
                let page = this.x_state.pages[thefile.title];
                // @TODO check the vue.template replacements (8-mar-21)
                // declare server:asyncData
                this.debug('post-processing internal custom tags');
                vue = await this.processInternalTags(vue, page);
                // closure ...
                // **** **** start script wrap **** **** **** **** 
                let script_imports = '';
                // header for imports
                if (page) {
                    for (let key in page.imports) {
                        script_imports += `import ${page.imports[key]} from '${key}'\n`;
                    } //);
                }
                // export default
                vue.script = `{concepto:import:mixins}
				${script_imports}
				export default {
					${vue.script};
				}`
                // **** **** end script wrap **** **** 
                // process Mixins
                vue = this.processMixins(vue, page);
                // process Styles
                vue = this.processStyles(vue, page);
                // removes refx attributes
                vue = this.removeRefx(vue);
                // fix {vuepath:} placeholders
                vue = this.fixVuePaths(vue, page);
                // process lang files (po)
                vue = await this.processLangPo(vue, page);
                // ********************************** //
                // beautify the script and template
                // ********************************** //
                vue.script = '<script>\n' + vue.script + '\n</script>';
                if (!vue.style) vue.style = '';
                vue.full = `${vue.template}\n${vue.script}\n${vue.style}`;
                // ********************************** //
                // write files
                let w_path = path.join(this.x_state.dirs.pages, thefile.file);
                if (page.tipo == 'componente') {
                    this.x_console.outT({ message: `trying to write vue 'component' file ${thefile.file}`, color: 'cyan' });
                    w_path = path.join(this.x_state.dirs.components, thefile.file);
                } else if (page.tipo == 'layout') {
                    this.x_console.outT({ message: `trying to write vue 'layout' file ${thefile.file}`, color: 'cyan' });
                    w_path = path.join(this.x_state.dirs.layouts, thefile.file);
                } else {
                    this.x_console.outT({ message: `trying to write vue 'page' file ${thefile.file}`, color: 'cyan' });
                }
                await this.writeFile(w_path, vue.full);
                //
                //this.x_console.out({ message: 'vue ' + thefile.title, data: { vue, page_style: page.styles } });
            }
            //this.x_console.out({ message:'pages debug', data:this.x_state.pages });
        }
        // *************************
        // copy/write related files
        // *************************
        // copy static required files for known NPMs packages (gif.js) @TODO improved this ugly hack  
        //this.x_state.npm['gif.js'] = '*';
        if (this.x_state.npm['gif.js']) {
            this.x_console.outT({ message: `downloading required gif.worker.js file for gif.js npm package`, color: 'yellow' });
            let fetch = require('node-fetch');
            let static_path = path.join(this.x_state.dirs.static, 'gif.worker.js');
            let worker = await fetch('https://raw.githubusercontent.com/jnordberg/gif.js/master/dist/gif.worker.js');
            let contenido = await worker.text();
            await fs.writeFile(static_path, contenido, 'utf-8');
        }
        // copy assets
        if (Object.keys(this.x_state.assets).length>0) {
            this.debug({ message: `Copying assets`, color:'cyan'});
            let copy = require('recursive-copy');
            for (let i in this.x_state.assets) {
                //@TODO add support for i18n assets
                let asset = this.x_state.assets[i];
                if (!asset.i18n) {
                    let source = path.join(this.x_state.dirs.base, asset.original);
                    let target = path.join(this.x_state.dirs.assets,asset.original.split('/').slice(-1)[0]);
                    //this.debug({ message: `Copying asset`, data:{source,target}, color:'cyan'});
                    try { await copy(source, target); } catch(e) {}
                }
            }
            this.debug({ message:`Copying assets ready`, color:'cyan'});
        }
        // create Nuxt template structure
        if (!this.x_state.central_config.componente) {
            await this.createVueXStores();
            await this.createServerMethods();
            await this.createMiddlewares();
            //create server files (nuxt express, mimetypes)
            await this.prepareServerFiles();
            //declare required plugins
            await this.installRequiredPlugins();
            //create NuxtJS plugin definition files
            let nuxt_plugs = await this.createNuxtPlugins(); //return plugin array list for nuxt.config.js
            this.x_state.nuxt_config.plugins = nuxt_plugs.nuxt_config;
            this.x_state.nuxt_config.css = nuxt_plugs.css_files;
            //create nuxt.config.js file
            await this.createNuxtConfig()
            //create package.json
            await this.createPackageJSON();
            //create serverless.yml for deploy:sls - cfc:12881
            await this.createServerlessYML();
            //execute deploy (npm install, etc) - moved to onEnd
            /*if (!(await this.deploy())) {
                this.x_console.outT({ message:'Something went wrong deploying', color:'red' });
            };*/
        }
        
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
        this.debug_time({ id: 'readModelos' });
        let modelos = await this.dsl_parser.getNodes({ text: 'modelos', level: 2, icon: 'desktop_new', recurse: true }); //nodes_raw:true	
        let tmp = { appname: this.x_state.config_node.name },
            fields_map = {};
        let resp = {
            tables: {},
            attributes: {},
            length: 0,
            doc: ''
        };
        // map our values to real database values 
        let type_map = {
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
        Object.keys(type_map).map(function(x) {
            let aliases = type_map[x].alias;
            aliases.push(x);
            aliases.map(y => { fields_map[y] = type_map[x].value });
        });
        // parse nodes into tables with fields
        if (modelos.length > 0) {
            //modelos[0].attributes.map(x=>{ resp.attributes={...resp.attributes,...x} }); //modelos attributes
            resp.attributes = {...modelos[0].attributes };
            resp.doc = modelos[0].text_note;
            resp.length = modelos[0].nodes.length;
            for (let table of modelos[0].nodes) {
                let fields = {...table.attributes }; //table.attributes.map(x=>{ fields={...fields,...x} }); //table attributes
                resp.tables[table.text] = { fields: {} }; //create table
                tmp.sql_fields = [];
                for (let field in fields) {
                    resp.tables[table.text].fields[field] = fields_map[fields[field]]; //assign field with mapped value
                    tmp.sql_fields.push(field + ' ' + fields_map[fields[field]]);
                }
                resp.tables[table.text].sql = `CREATE TABLE ${table.text}(${tmp.sql_fields.join(',')})`;
            }
        }
        this.debug_timeEnd({ id: 'readModelos' });
        // install alaSQL plugin and define tables
        if (resp.length > 0) {
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
        return resp;
    }


    /*
     * Reads assets node, and returns object with info
     */
    async _readAssets() {
        let resp = {},
            path = require('path');
        this.debug('_readAssets');
        this.debug_time({ id: '_readAssets' });
        let assets = await this.dsl_parser.getNodes({ text: 'assets', level: 2, icon: 'desktop_new', recurse: true }); //nodes_raw:true
        let sep = path.sep;
        //
        //this.debug('assets search',assets);
        if (assets.length > 0) {
            assets = assets[0];
            // 15ms full
            for (let child of assets.nodes) {
                if (child.nodes.length == 1 && child.nodes[0].image != '') {
                    // if there is just 1 grand-child and has an image defined
                    resp[child.text.toLowerCase()] = {
                        i18n: false,
                        original: child.nodes[0].image,
                        css: '~assets' + sep + path.basename(child.nodes[0].image),
                        js: '~' + sep + 'assets' + sep + path.basename(child.nodes[0].image)
                    }

                } else if (child.nodes.length > 1) {
                    // if child has more than 1 child (grandchild), we'll assume its an image with i18n alternatives
                    let key = child.text.toLowerCase();
                    resp[key] = { i18n: true, i18n_keys: [] };
                    for (let i18n_node of child.nodes) {
                        // expand node attributes
                        let attrs = {...i18n_node.attributes };
                        /*i18n_node.attributes.map(function(x) {
                        	attrs = {...attrs,...x};
                        });*/
                        if (attrs.idioma && i18n_node.image != '') {
                            let lang = attrs.idioma.toLowerCase();
                            resp[key].i18n_keys.push(lang);
                            resp[key][lang] = {
                                original: i18n_node.image,
                                css: '~assets' + sep + path.basename(i18n_node.image),
                                js: '~' + sep + 'assets' + sep + path.basename(i18n_node.image)
                            };
                        }
                    }
                    // transform i18n_keys to list
                    resp[key].i18n_keys = resp[key].i18n_keys.join(',');

                } else if (child.link != '') {
                    resp[child.text.toLowerCase()] = {
                        original: child.link,
                        css: '~assets' + sep + path.basename(child.link),
                        js: '~' + sep + 'assets' + sep + path.basename(child.link)
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
        this.debug_timeEnd({ id: '_readAssets' });
        return resp;
    }

    /* 
     * Grabs central node configuration information
     */
    async _readCentralConfig() {
        this.debug('_readCentralConfig');
        let central = await this.dsl_parser.getNodes({ level: 1, recurse: false });
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
            nuxt: 'latest',
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
        resp = {...resp, ...central[0].attributes };
        /*central[0].attributes.map(function(x) {
        	resp = {...resp,...x};
        });*/
        if (resp.dominio) {
            resp.service_name = resp.dominio.replace(/\./g, '').toLowerCase();
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
        let resp = { id: '', meta: [], seo: {}, secrets: {} },
            config_node = {};
        let search = await this.dsl_parser.getNodes({ text: 'config', level: 2, icon: 'desktop_new', recurse: true });
        //this.debug({ message:'search says',data:search, prefix:'_readConfig,dim' });
        //
        if (search.length > 0) {
            config_node = search[0];
            // define default font_face
            resp.default_face = config_node.font.face;
            resp.default_size = config_node.font.size;
            // apply children nodes as keys/value for resp
            for (let key of config_node.nodes) {
                if (key.text.toLowerCase() == 'meta') {
                    for (let meta_child of key.nodes) {
                        // apply grand_childs as meta tags
                        if (meta_child.text.toLowerCase() == 'keywords') {
                            resp.seo['keywords'] = meta_child.nodes.map(x => x.text);
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
                } else {
                    // apply keys as config keys (standard config node by content types)
                    if (Object.keys(key.attributes).length > 0) {
                        // prepare config key
                        let config_key = key.text.toLowerCase().replace(/ /g, '');
                        //alt1 let values = {...key.attributes }; 
                        //alt2, bit slower but considers booleans as string
                        let values = {};
                        for (let xz in key.attributes) {
                        	let x = key.attributes[xz];
                            if (x=='true') { 
                                x=true;
                            } else if (x=='false') {
                                x=false;
                            }
                            values = {...values,...{[xz]:x}};
                        }
                        resp[config_key] = values;
                        // mark secret status true if contains 'password' icon
                        if (key.icons.includes('password')) resp[config_key][':secret'] = true;
                        // add link attribute if defined
                        if (key.link != '') resp[config_key][':link'] = key.link;

                    } else if (key.nodes.length > 0) {
                        resp[key.text] = key.nodes[0].text;
                    } else if (key.link != '') {
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
            let parent_folder = path.resolve(dsl_folder, '../');
            let folder = dsl_folder.replace(parent_folder, '');
            resp.name = folder.replace('/', '').replace('\\', '') + '_' + path.basename(this.x_flags.dsl, '.dsl');
            //console.log('folder:',{folder,name:resp.name});
            //this.x_flags.dsl
        }
        // create id if not given
        if (!resp.id) resp.id = 'com.puntorigen.' + resp.name;
        return resp;
    }

    async getParentNodes(id = this.throwIfMissing('id'), exec = false) {
        let parents = await this.dsl_parser.getParentNodesIDs({ id, array: true });
        let resp = [];
        for (let parent_id of parents) {
            let node = await this.dsl_parser.getNode({ id: parent_id, recurse: false });
            let command = await this.findValidCommand({ node, object: exec });
            if (command) resp.push(command);
        }
        return resp;
    }

    //gets the asset code for a given string like: assets:assetname
    getAsset(text = this.throwIfMissing('text'), type = 'js') {
        //this.x_state.assets
        let resp = text,
            type_o = text.replaceAll('jsfunc', 'js').toLowerCase();
        if (resp.toLowerCase().indexOf('assets:') != -1) {
            if (resp in this.x_state.assets) {
                if (this.x_state.central_config.idiomas.indexOf(',') != -1 && this.x_state.assets[resp].i18n == true) {
                    let first_key = this.x_state.assets[resp].i18n_keys.split(',')[0];
                    resp = this.x_state.assets[resp][first_key][type_o];
                    if (type.toLowerCase() == 'js') {
                        resp = resp.replaceAll(`/${first_key}/`, `/' + $i18n.locale + '/`);
                        resp = `require('${resp}')`;
                    } else if (type.toLowerCase() == 'jsfunc') {
                        resp = resp.replaceAll(`/${first_key}/`, `/' + this.$i18n.locale + '/`);
                        resp = `require('${resp}')`;
                    }

                } else if (resp in this.x_state.assets && type_o in this.x_state.assets[resp]) {
                    resp = this.x_state.assets[resp][type_o];
                    if (type.toLowerCase().indexOf('js') != -1) {
                        resp = `require('${resp}')`;
                    }

                } else {
                    // throw error: invalid type of asset (valid values: css,js - given: ${type})
                }
            }
        }
        return resp;
    }

    //vue attributes tag version
    struct2params(struct = this.throwIfMissing('id')) {
        let resp = [],
            tmp = {...struct };
        // pre-process
        if ('aos' in tmp) {
            let aos_p = struct['aos'].split(',');
            if (aos_p.length == 3) {
                tmp['data-aos'] = aos_p[0];
                tmp['data-aos-duration'] = aos_p[1];
                tmp['data-aos-delay'] = aos_p[2];
            } else {
                tmp['data-aos'] = aos_p[0];
                tmp['data-aos-duration'] = aos_p[1];
            }
            delete tmp['aos'];
        }
        // process
        for (let [key, value] of Object.entries(tmp)) {
            if (value === null) {
                resp.push(key);
            } else if (typeof value !== 'object' && typeof value !== 'function' && typeof value !== 'undefined') {
                resp.push(`${key}='${value}'`);
            }
        }
        return resp.join(' ');
    }

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

    // atLeastNode
    atLeastNode(r) {
        const n = process.versions.node.split('.').map(x => parseInt(x, 10));
        r = r.split('.').map(x => parseInt(x, 10));
        return n[0] > r[0] || (n[0] === r[0] && (n[1] > r[1] || (n[1] === r[1] && n[2] >= r[2])));
    }
}
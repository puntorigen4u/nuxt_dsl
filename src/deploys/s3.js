/**
* S3 Deploy: A class to help deploy vue_dsl to AWS S3.
* @name 	s3
* @module 	s3
**/
import base_deploy from './base_deploy'

export default class s3 extends base_deploy {

    constructor({ context={} }={}) {
        super({ context, name:'AWS S3' });
    }

    async logo() {
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

    async modifyNuxtConfig(config) {
        if (this.context.x_state.config_node.axios && this.context.x_state.config_node.axios.deploy) {
            let ax_config = config.axios;
            ax_config.baseURL = this.context.x_state.config_node.axios.deploy;
            ax_config.browserBaseURL = this.context.x_state.config_node.axios.deploy;
            delete ax_config.deploy;
            config.axios = ax_config;
        }
        this.context.x_state.central_config.static=true; //force static mode
        return config;
    }

    async deploy() {
        let build={};
        this.context.x_console.title({ title:'Deploying to Amazon AWS S3', color:'green' });
        await this.logo();
        // builds the app
        build.try_build = await this.base_build(); 
        if (build.try_build.length>0) {
            this.context.x_console.outT({ message:`There was an error building the project.`, color:'red' });
            return false;
        }
        // deploys to aws
        build.deploy_aws_s3 = await this.run(); //test if results.length>0 (meaning there was an error)
        if (build.deploy_aws_s3.length>0) {
            this.context.x_console.outT({ message:`There was an error deploying to Amazon AWS.`, color:'red', data:build.deploy_aws_s3.toString()});
            return false;
        }
        return true;
    }

    async run() {
        let spawn = require('await-spawn');
        let errors = [];
        let bucket = this.context.x_state.central_config.deploy.replaceAll('s3:','').trim();
        //AWS S3 deploy
        this.context.debug('AWS S3 deploy');
        let spinner = this.context.x_console.spinner({ message:'Obtaining AWS credentials' });
        const AWS = require('aws-sdk');
        const { getAWSCredentials } = require('aws-get-credentials');
        AWS.config.credentials = await getAWSCredentials();
        spinner.succeed('Credentials ready');
        spinner.start(`Creating bucket:${bucket} and uploading website`);
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        let info = await s3.putBucketWebsite({
            Bucket:bucket,
            WebsiteConfiguration: {
                ErrorDocument: {
                    Key: 'index.html'
                },
                IndexDocument: {
                    Suffix:'index.html'
                }
            }
        });
        if (info.error) {
            spinner.faild('Upload failed ->'+info.error.message);
        } else {
            spinner.succeed('Uploaded successfully ->'+info.data);
        }
        return errors;
    }

    //****************************
    // onPrepare and onEnd steps
    //****************************
    async post() {
        //restores aws credentials if modified by onPrepare after deployment
        if (!this.context.x_state.central_config.componente && 
            this.context.x_state.central_config.deploy && 
            this.context.x_state.central_config.deploy.indexOf('s3:') != -1 && 
            this.context.x_state.config_node.aws) {
            // @TODO add this block to deploys/s3 'post' method and onPrepare to 'pre' 20-br-21
            // only execute after deploy and if user requested specific aws credentials on map
            let path = require('path'), copy = require('recursive-copy'), os = require('os');
            let fs = require('fs');
            let aws_bak = path.join(this.context.x_state.dirs.base, 'aws_backup.ini');
            let aws_file = path.join(os.homedir(), '/.aws/') + 'credentials';
            // try to copy aws_bak over aws_ini_file (if bak exists)
            let exists = s => new Promise(r=>fs.access(s, fs.constants.F_OK, e => r(!e)));
            if ((await this.context.exists(aws_bak))) {
                await copy(aws_bak,aws_file,{ overwrite:true, dot:true, debug:false });
                // remove aws_bak file
                await fs.promises.unlink(aws_bak);
            }
        }
    }

    async pre() {
        if (!this.context.x_state.central_config.componente && 
             this.context.x_state.central_config.deploy && 
             this.context.x_state.central_config.deploy.indexOf('s3:') != -1) {
            // if deploying to AWS s3:x, then recover/backup AWS credentials from local system
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
                this.context.debug('AWS credentials:',aws_ini);
            } catch (err_reading) {}
            // 
            if (this.context.x_state.config_node.aws) {
                // if DSL defines temporal AWS credentials for this app .. 
                // create backup of aws credentials, if existing previously
                if (aws_ini != '') {
                    let aws_bak = path.join(this.context.x_state.dirs.base, 'aws_backup.ini');
                    this.context.x_console.outT({ message: `config:aws:creating .aws/credentials backup`, color: 'yellow' });
                    await fs.writeFile(aws_bak, aws_ini, 'utf-8');
                }
                // debug
                this.context.x_console.outT({ message: `config:aws:access ->${this.context.x_state.config_node.aws.access}` });
                this.context.x_console.outT({ message: `config:aws:secret ->${this.context.x_state.config_node.aws.secret}` });
                // transform config_node.aws keys into ini
                let to_ini = ini.stringify({
                    aws_access_key_id: this.context.x_state.config_node.aws.access,
                    aws_secret_access_key: this.context.x_state.config_node.aws.secret
                }, { section: 'default' });
                this.context.debug('Setting .aws/credentials from config node');
                // save as .aws/credentials (ini file)
                await fs.writeFile(aws_ini_file, to_ini, 'utf-8');

            } else if (aws_ini != '') {
                // if DSL doesnt define AWS credentials, use the ones defined within the local system.
                let parsed = ini.parse(aws_ini);
                if (parsed.default) this.context.debug('Using local system AWS credentials', parsed.default);
                this.context.x_state.config_node.aws = { access: '', secret: '' };
                if (parsed.default.aws_access_key_id) this.context.x_state.config_node.aws.access = parsed.default.aws_access_key_id;
                if (parsed.default.aws_secret_access_key) this.context.x_state.config_node.aws.secret = parsed.default.aws_secret_access_key;
            }
        }
    }
}
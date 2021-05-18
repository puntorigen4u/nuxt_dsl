/**
* Remote Deploy: A class to help deploy remotely accesible vue_dsl instances.
* @name 	remote
* @module 	remote
**/
import base_deploy from './base_deploy'
//const base_deploy = require('./base_deploy');

export default class remote extends base_deploy {

    constructor({ context={} }={}) {
        super({ context, name:'Remote' });
    }

    async deploy() {
        let build={};
        if ((await this._isLocalServerRunning())==false) {
            this.context.x_console.title({ title:'Deploying NuxtJS instance with remote access', color:'green' });
            await this.logo();
            //only launch nuxt server if its not running already
            // builds the app
            build.try_build = await this.base_build(); 
            if (build.try_build.length>0) {
                this.x_console.outT({ message:`There was an error building the project.`, color:'red' });
                return false;
            }
            
            build.deploy_local = await this.run();
            if (build.deploy_local.length>0) {
                this.context.x_console.outT({ message:`There was an error deploying locally.`, color:'red', data:build.deploy_local.toString()});
                return false;
            }
                
        } else {
            this.context.x_console.title({ title:'Updating local running NuxtJS instance', color:'green' });
            await this.logo();
            this.context.x_console.outT({ message:`Project updated.`, color:'green' });
        }
        return true;
    }

    async run() {
        //issue npm run dev
        let errors=[];
        let spawn = require('await-spawn');
        let sleep = function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let spinner = this.context.x_console.spinner({ message:'Deploying Ngrok local instance' });
        //this.debug('Local deploy');
        spinner.start('Deploying local instance');
        try {
            //launch in a new terminal
            await this.launchTerminal('npm',['run','dev'],this.context.x_state.dirs.app);
            //results.git_add = await spawn('npm',['run','dev'],{ cwd:this.x_state.dirs.app });
            spinner.succeed('NuxtJS launched successfully');
        } catch(gi) { 
            spinner.fail('Project failed to launch');
            errors.push(gi);
        }
        spinner.start(`Launching remote access for port ${this.context.x_state.central_config.port}`);
        try {
            //launch ngrok in new terminal
            await sleep(1000);
            await this.launchTerminal('npx',['localtunnel','--port',this.context.x_state.central_config.port,'--subdomain',this.context.x_state.central_config.apptitle.toLowerCase()],this.context.x_state.dirs.app);
            spinner.succeed('Remote access requested successfully');
        } catch(ng) { 
            spinner.fail('Remote access failed to launch');
            errors.push(ng);
        }
        return errors;
    }

}
/**
* Base Deploy: A class define deployments for vue_dsl.
* @name 	base_deploy
* @module 	base_deploy
**/
export default class base_deploy {

	constructor({ context={}, name='base_deploy' }={}) {
        this.context = context;
        this.name = name;
    }

    async logo({ name=this.name, config={} }={}) {
        let cfonts = require('cfonts');
        cfonts.say(name, {...{ font:'block', gradient:'red,blue' },...config });
    }

    async run() {
        return true;
    }

    async deploy() {
        let errors=[];
        let spinner = this.context.x_console.spinner({ message:`Deploying ${this.name} instance` });
        //spinner.start('Deploying local instance');
        /*try {
            //launch in a new terminal
            await this.context.launchTerminal('npm',['run','dev'],this.context.x_state.dirs.app);
            //results.git_add = await spawn('npm',['run','dev'],{ cwd:this.x_state.dirs.app });
            spinner.succeed('NuxtJS launched successfully');
        } catch(gi) { 
            spinner.fail('Project failed to launch');
            errors.push(gi);
        }*/
        return errors;
    }

    async _isLocalServerRunning(port=this.context.x_state.central_config.port) {
        let is_reachable = require('is-port-reachable');
        let resp = await is_reachable(port);
        return resp;
    }

}
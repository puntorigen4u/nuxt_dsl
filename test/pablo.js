process.env.UV_THREADPOOL_SIZE=8*require('os').cpus().length;
const vue = require('../lib/index');
var myArgs = process.argv.slice(2);

(async () => {
    // testing code here
    let file = (myArgs.length>0)?myArgs[0]:'vue.dsl';
    let base = new vue(file,{ debug:false });
    await base.init();
    // test node ID_1679802330 (should match def_store)
    //await base.addCommands(require('./more_commands.js'));
    await base.addCommands(require('../lib/commands.js'));
    await base.process(); //aka writer()
    /* let nodetest = await base.dsl_parser.getNode({ id: 'ID_923953027', recurse:false });
    console.log('ID_923953027 nodetest',nodetest);
    let test = await base.findCommand({ node:nodetest, justone:false, show_debug:true });
    console.log('ID_923953027 findCommand (should be def_textonly)',test);
    */
    // does this node have a def_server exact parent x_id ? (it shouldn't)
    //let test2 = await base.isExactParentID(nodetest.id,'def_server');
    //console.log('ID_340889188 isExactParentID def_server says:'+test2);
    /* */
    /*
    nodetest = await base.dsl_parser.getNode({ id: 'ID_861168397' }); // ID_789178185=imagen
    console.log('nodetest dice',nodetest);

    // 6-ago-2020 @TODO test why this is not working as expected
    let search = await base.dsl_parser.getNodes({ text:'config', recurse:false });
    console.log('search config dice',search);

    console.time('findCommand');
    let findcom = await base.findCommand({ node:nodetest,justone:false });
    console.timeEnd('findCommand');
    console.log('findCommand reply',findcom);

    console.time('findValidCommand');
    let findcom2 = await base.findValidCommand({ node:nodetest,object:false });
    console.timeEnd('findValidCommand');
	console.log('findValidCommand reply',findcom2);

    // call writer (when it exists haha)
    //
    */
    console.log('total time passed, since constructor: '+base.secsPassed_());

})().catch(err => {
    console.error(err);
});

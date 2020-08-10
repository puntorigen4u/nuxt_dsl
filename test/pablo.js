const vue = require('../lib/index');
var myArgs = process.argv.slice(2);

(async () => {
    // testing code here
    let file = (myArgs.length>0)?myArgs[0]:'vue.dsl';
    let base = new vue(file,{ debug:true });
    await base.init();
    // test node ID_1679802330 (should match def_store)
    //await base.addCommands(require('./more_commands.js'));
    await base.process(); //aka writer()
    /*let nodetest = await base.dsl_parser.getNode({ id: 'ID_1679802330', recurse:false });
    console.log('ID_1679802330 info',nodetest);
    let test = await base.findCommand(nodetest,false);
    console.log('ID_1679802330 findCommand (should be def_store)',test);
    */
    /*
    nodetest = await base.dsl_parser.getNode({ id: 'ID_861168397' }); // ID_789178185=imagen
    console.log('nodetest dice',nodetest);

    // 6-ago-2020 @TODO test why this is not working as expected
    let search = await base.dsl_parser.getNodes({ text:'config', recurse:false });
    console.log('search config dice',search);

    console.time('findCommand');
    let findcom = await base.findCommand(nodetest,false);
    console.timeEnd('findCommand');
    console.log('findCommand reply',findcom);

    console.time('findValidCommand');
    let findcom2 = await base.findValidCommand(nodetest,false);
    console.timeEnd('findValidCommand');
	console.log('findValidCommand reply',findcom2);

    // call writer (when it exists haha)
    //
    */
    console.log('total time passed, since constructor: '+base.secsPassed_()+' secs');

})().catch(err => {
    console.error(err);
});

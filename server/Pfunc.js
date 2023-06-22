const spawn = require("child_process").spawn;

 const processPython= (async (pathname,args)=>{
    let obj ={};
    let fcall = await spawn('python',[pathname,...args]);
    try {
            fcall.stdout.on('data',async function(data){
            // console.log("inside");
            obj = await JSON.parse(data);
            console.log(await obj);
            return obj;
        })   
    }catch(e){
        console.log(e.message);
        return "data missing";
    }
})

module.exports.processPython = processPython;


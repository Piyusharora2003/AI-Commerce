const {spawn} = require("child_process");
const {once} = require("events");

const processPython= (async (pathname,args)=>{
    let obj ={};
    let pyprocess =  spawn('python',[pathname,...args]);
    try {
        async function updateobject(){
            obj = JSON.parse(await once(pyprocess.stdout, 'data'));
        }
        await updateobject();
        return obj;
    }catch(e){
        console.log("error (at JsPythonConnector.js) : ",e.message);
        return "Something went wrong !! ";
    }

})

module.exports.processPython = processPython;

// NOTE: 
// 1. This function (processPython) takes 2 input ,(pathname , argument array) and returns an object
// 2. The object contains the response (print/stdout) of the code executed by the file at the pathname. 


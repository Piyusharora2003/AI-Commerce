const app = require('./app');
const port = 1000;


// To get data from the python server 
const spawn = require("child_process").spawn;
var obj;
// The following are the -> language, [file path , ...arguments]  
// * arguments can be assessible using the sys.arg1 function
var process = spawn('python',["./python_source/test.py", "Piyush", "Arora"] );

// access data from here onwards
process.stdout.on('data', function(data){
    obj = JSON.parse(data);
    // console.log(obj);
})


const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
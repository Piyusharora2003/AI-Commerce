const express = require('express');
const app = express();
const port = 1000;
let arr;
// To get data from the python server 
const spawn = require("child_process").spawn;

// The following are the -> language, [file path , ...arguments]  
// * arguments can be assessible using the sys.arg1 function
var process = spawn('python',["./python_source/test.py", "Piiush", "Arora"] );

// access data from here onwards
process.stdout.on('data', function(data){
    arr = data
    console.log(data.toString());
    // console.log(data.toJSON());
    // Data is travel as buffer
})

app.get('/', (req, res) =>{
  res.send(`message: ${String.fromCharCode(arr[0])}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
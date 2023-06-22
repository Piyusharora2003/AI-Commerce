const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { processPython } = require('./Pfunc');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,                   //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// routes for application basic 
app.get('/', (req, res) =>{
    res.send(`Hello is it working on fine and`);
})
  


// some issues with integration async await and language (For recommendations only #buggy #no use)
app.get('/test', async(req, res) =>{
    console.log("undefined test before test");
   function test(){
    return new Promise((resolve, reject) => {
        processPython("./python_source/test.py", ["hello", "world"]).then((data) => {
            console.log(typeof(data));
          return data;
        })
        .catch((error) => { 
            console.log(error.message);
          return error;
        });
    
        
      });
    }
    
    async function main() {
      const result = await test();
      console.log(result);
    }
    
    main();
    
    console.log("undefined test after test");
    res.send(`res is working on fine`);
})
  

module.exports = app;
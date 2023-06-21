const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
  

module.exports = app;
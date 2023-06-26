const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { processPython } = require('./JsPythonConnector');
const errorMiddleware = require('./middleware/error.js');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,                   //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(cookieParser());

// routes for application basic 
app.get('/', (req, res) =>{
    res.send(`Hello is it working on fine and`);
})
  

// Note : this is a test api that asks for responses from python file test.py and send params to it and log the response
app.get('/test', async(req, res) =>{
  let response;
    try {
        response =await processPython("./python_source/test.py", ["Panchi", "Kabbi"]);
        console.log(response);
    } catch (error) {
        console.log("Error (at app.js): " + error.message);
    }
    res.send(`res is working on fine ${JSON.stringify(response)}`);
})
  

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);



app.use(errorMiddleware);

module.exports = app;
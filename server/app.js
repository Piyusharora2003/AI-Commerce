const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { processPython } = require('./JsPythonConnector');
const errorMiddleware = require('./middleware/error.js');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const user = require('./routes/userRoute.js');
const product = require('./routes/productRoute.js');
const order = require('./routes/orderRoute.js');
const payment = require('./routes/paymentRoute.js');
const python = require('./routes/pythonRoutes.js');

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
 

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1', python);



app.use(errorMiddleware);

module.exports = app;
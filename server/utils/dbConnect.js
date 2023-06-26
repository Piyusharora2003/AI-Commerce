const mongoose = require('mongoose');
require('dotenv').config();
const Url = process.env.URL

// Connect to MongoDB using URL provided in .env variable URL.
const dbConnect = ()=>{
    try {
        mongoose
      .connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Mongodb connected with server`);
      });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = dbConnect;

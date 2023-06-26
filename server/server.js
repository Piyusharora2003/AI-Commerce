const app = require('./app');
const dbConnect = require('./utils/dbConnect');
const PORT = 4000;
const cloudinary = require('cloudinary');

// UncaughtException Error
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

dbConnect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const server = app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`)
})


process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
      process.exit(1);
  });
});
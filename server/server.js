const app = require('./app');
const dbConnect = require('./utils/dbConnect');
const port = 1000;

dbConnect();

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
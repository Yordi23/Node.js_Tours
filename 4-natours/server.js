const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

//Set Database
let DB = '';
if (process.argv[2] === '--local') {
  DB = process.env.DATABASE_LOCAL;
} else {
  DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
}

//Connect to Database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection succesful');
  });
// .catch(err => {
//   console.log(err);
//   console.log('DB connection failed');
// });

//Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

//This event triggers when there is a rejected promise
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Exception. Shutting dow...');
  server.close(() => process.exit(1));
});

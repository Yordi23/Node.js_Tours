const mongoose = require('mongoose');
const dotenv = require('dotenv');

//This event is triggered when there is an Unhandled Exception
process.on('uncaughtException', err => {
  console.log('Unhandled Exception. Shutting dow...');
  console.log(err.name, err.message);
  process.exit(1);
});

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

//Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

//This event is triggered when there is a rejected promise
process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection. Shutting dow...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

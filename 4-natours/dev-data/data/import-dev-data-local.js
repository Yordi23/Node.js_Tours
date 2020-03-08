const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE_LOCAL;
//const DB = 'mongodb://127.0.0.1:27017/natours';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection succesful');
  })
  .catch(err => {
    console.log(err);
    console.log('DB connection failed');
  });

// Read Json File

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete all data from DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data succesfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

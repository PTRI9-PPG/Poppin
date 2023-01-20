const express = require('express');
require('dotenv').config();
const db = require('./db');

//this is how you pull in the env file

const userRoutes = require('./routes/users');
const businessRoutes = require('./routes/businesses');
const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.use('/businesses', businessRoutes);

app.use((err, _, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message ? err.message : 'An unknown error occured',
  });
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log('🚀 Successfully connected to the database 🚀');
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("🛑 Couldn't connect to the database 🛑");
    console.error(`Something went wrong: ${error.message}`);
  }
};

start();
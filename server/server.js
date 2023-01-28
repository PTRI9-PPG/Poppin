const express = require('express');
const dotenv = require('dotenv').config();

// db and authenticate user
const connectDB = require('./db/connect.js');
// OAuth
const cookieSession = require('cookie-session');
const cors = require('cors');
const passportSetup = require('./oauth/passport');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');

// routers
//this is how you pull in the env file
const userRoutes = require('./routes/userRoutes.js');
const businessRoutes = require('./routes/businessRoutes.js');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();
const port = 3005;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/businesses', businessRoutes);

app.use(
  cookieSession({
    name: 'session',
    keys: ['popping'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  }),
);

app.use('/auth', authRoutes);

//error handler
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('connected to db');
  } catch (error) {
    console.error("🛑 Couldn't connect to the database 🛑");
    console.error(`Something went wrong: ${error.message}`);
  }
};

start();
app.listen(port, () => {
  console.log('🚀 Successfully connected to the server 🚀');
  console.log(`Server is listening on port ${port}...`);
});

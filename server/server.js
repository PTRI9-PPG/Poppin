const express = require('express');
require('dotenv').config();
// const db = require('./db/connect');

// db and authenticate user
const connectDB = require('./db/connect.js');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passportSetup = require('./oauth/passport');
const authRoute = require('./oauth/auth');
const passport = require('passport');

// routers
//this is how you pull in the env file
// const userRoutes = require('./routes/userRoutes.js');
// const businessRoutes = require('./routes/businessRoutes.js');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

// dotenv.config();
// dotenv.config({ path: '../.env' });

require('./auth');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const app = express();
const port = 3005;
console.log('mongo URI ', process.env.MONGODB_URI);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch((err) => console.log('ERROR', err));

app.use('/users', userRoutes);
app.use('/businesses', businessRoutes);

// //catch all route handler
app.use((_, res) => res.status(404).send('page not found'));

app.use(
  cookieSession({
    name: 'session',
    keys: ['poppin'],
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
  })
);

app.use('/auth', authRoute);

//error handler
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.error("🛑 Couldn't connect to the database 🛑");
    console.error(`Something went wrong: ${error.message}`);
  }
};

app.listen(port, () => {
  console.log('🚀 Successfully connected to the database 🚀');
  console.log(`Server is listening on port ${port}...`);
});

start();

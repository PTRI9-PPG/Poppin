const express = require('express');
const dotenv = require ('dotenv');

// db and authenticate user
const connectDB = require('./db/connect.js');

// routers
//this is how you pull in the env file
const userRouter = require('./routes/userRoutes.js');
const businessRoutes = require('./routes/businessRoutes.js');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

dotenv.config();
dotenv.config({ path: '../.env' });

const app = express();
const port = 3005;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/businesses', businessRoutes);

app.use(errorHandlerMiddleware);

//error handler
// app.use((err, res) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;
//   res.status(statusCode).json({
//     message: err.message ? err.message : 'An unknown error occured',
//   });
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
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

// Oauth passport
// const session = require('cookie-session');
// const passportSetup = require("./Oauth/passport");
// const authRoute = require("./oauth/auth");
// const passport = require('passport');
// const cors = require("cors");

//Oauth server
// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: "GET, POST, PUT, DELETE",
//     credentials: true,
//   })
// );
// app.use(cookieSession(
//   {name: "session",
//   keys:["poppin"],
//   maxAge: 24 * 60 * 60 * 100}
// ));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/auth', authRoute);

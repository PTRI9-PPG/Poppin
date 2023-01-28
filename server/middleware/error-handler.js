const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, _, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message ? err.message : 'An unknown error occured',
  });
};

// const errorHandlerMiddleware = (err, req, res, next) => {
//   console.error(err.message);
//   const defaultError = {
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     message: err.message || 'Something went wrong. Please try again later.',
//   };

//   if (err.name === 'ValidationError') {
//     defaultError.statusCode = StatusCodes.BAD_REQUEST;
//     defaultError.message = err.message;
//   }
//   if (err.code && err.code === 11000) {
//     defaultError.statusCode = StatusCodes.BAD_REQUEST;
//     defaultError.message = 'User with this email already exists';
//   }

//   res.status(defaultError.statusCode).json({ message: defaultError.message });
// };

module.exports = errorHandlerMiddleware;

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//GLOBAL MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//Limit request from same Ip (Rate Limiting)
const limiter = rateLimit({
  max: 100, // 100 request
  windowMs: 60 * 60 * 1000, // In 1 hour per ip
  message: 'Too many requests from this IP, please try again in an hour.'
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body. Limit data size.
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
//It will look at the request body, params, querystring and will filter out all the $ signs and dots.
app.use(mongoSanitize());

//Data sanitization against XSS (malitious htmls and js)
app.use(xss());

//Prevent parameter pollution(Duplicate parameters on query strings)
//The whitelist defines which parameters we allow duplicates
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

//ERROR HANDLING

//If the request is not catched in any of the previous handlers, we handle
//the error by sending the following response. This works for any http methods.
app.all('*', (req, res, next) => {
  //Express will asumme that anything we pass as parameter into next() function
  //is an error
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

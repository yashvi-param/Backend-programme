import express from 'express';
import HttpError from './HttpError';
import checkRole from './middleware/checkRoll.js';

const app = express();

//application level

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json( "Hello, Middleware" );
})
app.use(helmet())
app.get('/admin', checkRole, (req, res) => {
  res.status(200).json("Welcome Admin");
});


//undefined routes handling

app.use((req, res, next) => {
  next(new HttpError('Route Not Found', 404));
})
const port = 5000;

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  }

  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const checkRole = (req, res, next) => {
    next();
}


app.listen(port, () => {
  console.log("Server is running on port", port);
});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';

// config .env in a specifiq url
config({
  path: './config/config.env'
});

const app = express();
const PORT = process.env.PORT || 4000;

// config for only development
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan('dev'));
  //   morgan give information about each request
  // cors it's allow to deal with react for localhost at port 3000 without any problem
}

// Routes & middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRouter);
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found"
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

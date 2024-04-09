// server.ts

import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './database';
import passport from './services/passport';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import urlRoutes from './routes/urlRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(session({
  secret: '123123123', // Replace with your secret key
  resave: false,
  saveUninitialized: false,
}));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: process.env.ORIGION_URL ?? "" }));

// Database connection
connectToDatabase();

app.use('/api', authRoutes);
app.use(urlRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

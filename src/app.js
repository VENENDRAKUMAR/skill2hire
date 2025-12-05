import express from 'express';
import cors from 'cors';

import UserRoute from './routes/UserRoute.js';

const app = express();

// CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));

// Cookie parser


// Routes
app.use("/register", UserRoute);
app.use("/login", UserRoute);
app.use("/profile", UserRoute);
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

export default app;

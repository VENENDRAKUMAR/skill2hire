import express from 'express';
import cors from 'cors';

import UserRoute from './routes/User.Route.js';  // 👈 CORRECT PATH

const app = express();

// CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ extended: true, limit: "12kb" }));

// Routes
app.use("/api", UserRoute,()=>{
  console.log('UserRoute accessed');
});

app.get('/', (req, res) => {
  res.send('Welcome to the API');
  console.log('Root route accessed');
});

export default app;

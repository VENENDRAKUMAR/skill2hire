import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import connectDB from './db/dbconnect.js';
import app from './app.js';

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 Visit: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

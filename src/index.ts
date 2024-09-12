import express from 'express';
import mongoose from 'mongoose';
import catRoutes from './routes/cat-routes';
import catImagesRoutes from './routes/cat-image-routes';
import catUserRoutes from './routes/cat-user-routes';
import dotenv from 'dotenv';
import cors from 'cors';

// Express
const app = express();

// Variables
const PORT = process.env.PORT || 3000;

// Settings
dotenv.config();
app.use(express.json());
app.use(cors())

// Routes
app.use('/api', catImagesRoutes);
app.use('/api', catRoutes);
app.use('/api', catUserRoutes);

// Database
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/catdb',
  {},
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

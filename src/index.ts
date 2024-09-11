import express from 'express';
import catRoutes from './routes/cat-routes';
import catImagesRoutes from './routes/cat-image-routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', catImagesRoutes);
app.use('/api', catRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

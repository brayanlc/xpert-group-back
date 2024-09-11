import { Router } from 'express';
import { getImages } from '../controllers/cat-image-controller';

const router = Router();

router.get('/imagesbybreed/:id', getImages);

export default router;

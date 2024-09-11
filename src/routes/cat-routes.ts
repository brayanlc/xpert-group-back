import { Router } from 'express';
import { getAllBreeds, getBreed, searchBreed } from '../controllers/cat-controller';

const router = Router();

router.get('/breeds', getAllBreeds);
router.get('/breeds/:breed_id', getBreed);
router.get('/breeds/search', searchBreed);

export default router;

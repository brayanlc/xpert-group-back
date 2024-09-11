import { Request, Response } from 'express';
import { getImagesByBreedId } from '../services/cat-image-service';

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await getImagesByBreedId(req.params.id as string);
        res.json(images);
    } catch (error) {
        res.status(500).send('Error fetching images');
    }
};

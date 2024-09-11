import { Request, Response } from 'express';
import { getBreeds, getBreedById, searchBreeds } from '../services/cat-service';

export const getAllBreeds = async (_: Request, res: Response) => {
    try {
        const breeds = await getBreeds();
        res.json(breeds);
    } catch (error) {
        res.status(500).send('Error fetching breeds');
    }
};

export const getBreed = async (req: Request, res: Response) => {
    try {
        const breed = await getBreedById(req.params.breed_id);
        res.json(breed);
    } catch (error) {
        res.status(500).send('Error fetching breed');
    }
};

export const searchBreed = async (req: Request, res: Response) => {
    try {
        const breeds = await searchBreeds(req.query.q as string);
        res.json(breeds);
    } catch (error) {
        res.status(500).send('Error searching breed');
    }
};

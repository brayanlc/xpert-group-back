import { getBreeds, getBreedById, searchBreeds } from './cat-service';
import { Request, Response } from 'express';
import {
  getAllBreeds,
  getBreed,
  searchBreed,
} from '../controllers/cat-controller';

jest.mock('../services/cat-service');

describe('CatController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
    };
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
  });

  describe('getAllBreeds', () => {
    it('should fetch all breeds and return 200 status', async () => {
      const breeds = [
        { id: 'breed1', name: 'Breed 1' },
        { id: 'breed2', name: 'Breed 2' },
      ];
      (getBreeds as jest.Mock).mockResolvedValue(breeds);

      await getAllBreeds(req as Request, res as Response);

      expect(getBreeds).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith(breeds);
    });

    it('should return 500 status on error', async () => {
      (getBreeds as jest.Mock).mockRejectedValue(new Error('Error'));

      await getAllBreeds(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Error fetching breeds');
    });
  });

  describe('getBreed', () => {
    it('should fetch a breed by id and return 200 status', async () => {
      req.params = { breed_id: 'breed1' };
      const breed = { id: 'breed1', name: 'Breed 1' };
      (getBreedById as jest.Mock).mockResolvedValue(breed);

      await getBreed(req as Request, res as Response);

      expect(getBreedById).toHaveBeenCalledWith('breed1');
      expect(jsonMock).toHaveBeenCalledWith(breed);
    });

    it('should return 500 status on error', async () => {
      req.params = { breed_id: 'breed1' };
      (getBreedById as jest.Mock).mockRejectedValue(new Error('Error'));

      await getBreed(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Error fetching breed');
    });
  });

  describe('searchBreed', () => {
    it('should search breeds and return 200 status', async () => {
      req.query = { q: 'Breed' };
      const breeds = [
        { id: 'breed1', name: 'Breed 1' },
        { id: 'breed2', name: 'Breed 2' },
      ];
      (searchBreeds as jest.Mock).mockResolvedValue(breeds);

      await searchBreed(req as Request, res as Response);

      expect(searchBreeds).toHaveBeenCalledWith('Breed');
      expect(jsonMock).toHaveBeenCalledWith(breeds);
    });

    it('should return 500 status on error', async () => {
      req.query = { q: 'Breed' };
      (searchBreeds as jest.Mock).mockRejectedValue(new Error('Error'));

      await searchBreed(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Error searching breed');
    });
  });
});

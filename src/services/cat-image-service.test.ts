import { getImagesByBreedId } from './cat-image-service';
import { Request, Response } from 'express';
import { getImages } from '../controllers/cat-image-controller';

jest.mock('../services/cat-image-service');

describe('CatImageController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    req = {
      params: {},
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

  describe('getImages', () => {
    it('should fetch images and return 200 status', async () => {
      req.params = { id: 'breed123' };
      const images = [{ url: 'image1.jpg' }, { url: 'image2.jpg' }];
      (getImagesByBreedId as jest.Mock).mockResolvedValue(images);

      await getImages(req as Request, res as Response);

      expect(getImagesByBreedId).toHaveBeenCalledWith('breed123');
      expect(jsonMock).toHaveBeenCalledWith(images);
    });

    it('should return 500 status on error', async () => {
      req.params = { id: 'breed123' };
      (getImagesByBreedId as jest.Mock).mockRejectedValue(new Error('Error'));

      await getImages(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Error fetching images');
    });
  });
});

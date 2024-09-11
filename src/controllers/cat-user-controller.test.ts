
import { register, login } from './cat-user-controller';
import { registerUser, loginUser } from '../services/cat-user-service';
import { Request, Response } from 'express';

jest.mock('../services/cat-user-service');

describe('CatUserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {}
        };
        statusMock = jest.fn().mockReturnThis();
        jsonMock = jest.fn();
        sendMock = jest.fn();
        res = {
            status: statusMock,
            json: jsonMock,
            send: sendMock
        };
    });

    describe('register', () => {
        it('should register a user and return 201 status', async () => {
            req.body = { username: 'testuser', password: 'testpass' };
            const user = { id: 1, username: 'testuser' };
            (registerUser as jest.Mock).mockResolvedValue(user);

            await register(req as Request, res as Response);

            expect(registerUser).toHaveBeenCalledWith('testuser', 'testpass');
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(user);
        });

        it('should return 500 status on error', async () => {
            req.body = { username: 'testuser', password: 'testpass' };
            (registerUser as jest.Mock).mockRejectedValue(new Error('Error'));

            await register(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(sendMock).toHaveBeenCalledWith('Error registering user');
        });
    });

    describe('login', () => {
        it('should login a user and return 200 status', async () => {
            req.body = { username: 'testuser', password: 'testpass' };
            const user = { id: 1, username: 'testuser' };
            (loginUser as jest.Mock).mockResolvedValue(user);

            await login(req as Request, res as Response);

            expect(loginUser).toHaveBeenCalledWith('testuser', 'testpass');
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(user);
        });

        it('should return 401 status on invalid credentials', async () => {
            req.body = { username: 'testuser', password: 'testpass' };
            (loginUser as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(401);
            expect(sendMock).toHaveBeenCalledWith('Invalid credentials');
        });
    });
});

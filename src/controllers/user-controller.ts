import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/cat-user-service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send('Invalid credentials');
  }
};

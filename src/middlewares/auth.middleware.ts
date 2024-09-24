import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../auth/user.model';

import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
        res.status(401).json({ error: 'Unauthorized', details: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    
  }
};

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';

import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred while registering the user', details: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'An error occurred while logging in', details: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
        
    }
};

import { Request, Response } from 'express';
import Account from './account.model';
import { ValidationError } from 'sequelize';

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { type, account_name, bank_name, account_number, currency } = req.body;
    const user = req.user;

    // Check for user authentication
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate the 'type' against the allowed enum values
    const allowedTypes = ['asset', 'liability'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid account type. Must be "asset" or "liability".' });
    }

    // Create the account
    const account = await Account.create({ 
      type, 
      account_name, 
      bank_name, 
      account_number, 
      currency,
      userId: user.id
    });

    // Respond with success
    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    // Handle validation errors
    if (error instanceof ValidationError) {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).json({ error: 'Validation error', details: errorMessages });
    }

    // Handle other errors
    if (error instanceof Error) {
      res.status(500).json({ error: 'An error occurred while creating the account', details: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.findAll({ where: { userId: req.user.id } });
    res.json({ accounts });
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).json({ error: 'An error occurred while retrieving accounts', details: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};


export const getAccountById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check for user authentication
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Find the account by ID and ensure it belongs to the user
    const account = await Account.findOne({ where: { id, userId: user.id } });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ account });
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).json({ error: 'An error occurred while retrieving the account', details: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
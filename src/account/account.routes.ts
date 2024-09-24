import { Router } from 'express';
import { createAccount, getAccountById, getAccounts } from './account.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/accounts', authenticate, createAccount);
router.get('/accounts', authenticate, getAccounts);
router.get('/accounts/:id', authenticate, getAccountById);

export default router;

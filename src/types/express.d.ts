import { UserAttributes } from '../auth/user.model'; // Adjust the import path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    // Add other properties present in your JWT payload
  };
}

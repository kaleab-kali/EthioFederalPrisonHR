// Controller handling home requests
import { Request, Response } from 'express';

export const getHome = (req: Request, res: Response): void => {
  res.json({ message: 'Home' });
};
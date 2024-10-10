import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel';
import { IEmployee } from '../types/employeeTypes';

interface AuthenticatedRequest extends Request {
  employee?: IEmployee;
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
       res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token || '', 'your-secret-key') as { id: string } | undefined;
    if (!decodedToken || !decodedToken.id) {
      throw new Error('Invalid token');
    }

    const employee = await Employee.findById(decodedToken.id);

    if (!employee) {
       res.status(401).json({ message: 'Unauthorized' });
    }

    req.employee = employee as IEmployee;
    console.log('authorized!');
    next();
  } catch (error) {
     res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticate;

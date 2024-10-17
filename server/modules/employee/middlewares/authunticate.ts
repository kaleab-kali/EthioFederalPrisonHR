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
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("user", req.headers.authorization)

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' }); // Return here
      return
    }

    const decodedToken = jwt.verify(token || '', process.env.JWT_SECRET as any) as
      | { id: string }
      | undefined;
    if (!decodedToken || !decodedToken.id) {
      res.status(401).json({ message: 'Invalid token' }); // Return here
      return
    }

    const employee = await Employee.findById(decodedToken.id);

    if (!employee) {
      res.status(401).json({ message: 'Unauthorized' }); // Return here
      return
    }

    req.employee = employee as IEmployee;
    console.log('authorized!');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' }); // Return here as well
    return
  }
};

export { authenticate };

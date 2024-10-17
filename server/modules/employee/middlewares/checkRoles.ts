import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel';
import { IEmployee } from '../types/employeeTypes';

interface AuthenticatedRequest extends Request {
  employee?: IEmployee;
}

const checkHrRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const emp = req.employee;
    if (!emp) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    if (
        (emp?.role === 'hrStaff' || emp?.role === 'hrManager') &&
        emp?.centerName === 'Head Quarter'
      )
   {
      console.log('role checked');
      next();
    } else {
      res.status(401).json({ message: 'does not have role ' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
const checkAdminRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const emp = req.employee;
    if (!emp) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    if (emp?.role === 'admin') {
      console.log('admin role checked');
      next();
    } else {
      res
        .status(401)
        .json({ message: 'does not have role to assign credentials' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { checkHrRole, checkAdminRole };

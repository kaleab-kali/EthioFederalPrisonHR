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
      return
    }

    // HR Manager or Staff can access only their own center's data
    const { centerName } = req.params;
    console.log(centerName)
    console.log(req.params)
    if (
      (emp.role === 'hrStaff' || emp.role === 'hrManager') &&
      emp.centerName === centerName
    ) {
      console.log(emp.centerName)
      console.log('HR role checked for center:', centerName);
      next();
      return
    }

    res.status(403).json({ message: 'Access denied: Insufficient role or incorrect center' });
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

const checkHqExclusiveRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const emp = req.employee;
    if (!emp) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Only HQ HR Manager or Staff can access this route
    if (
      (emp.role === 'hrStaff' || emp.role === 'hrManager') &&
      emp.centerName === 'Head Quarter'
    ) {
      console.log('HQ exclusive role checked');
      next();
      return
    }

    res.status(403).json({ message: 'Access denied: Insufficient role for HQ-exclusive action' });
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

const checkdocumentStaff = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const emp = req.employee;
    if (!emp) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // HR Manager or Staff can access only their own center's data
    const { centerName } = req.params;
    if (
      (emp.role === 'documentStaff') &&
      emp.centerName === centerName
    ) {
      console.log('document Staff role checked for center:', centerName);
      next();
      return
    }

    res.status(403).json({ message: 'Access denied: Insufficient role or incorrect center' });
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    return
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
      return
    }

    const { centerName } = req.params
    if ((emp?.role === 'admin' || emp?.role === 'hq-admin') &&
    emp.centerName === centerName ){
      console.log('admin role checked');
      next();
      return
    } else {
      res
        .status(401)
        .json({ message: 'does not have role to assign credentials' });
        return
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const checkHqAdminRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const emp = req.employee;
    if (!emp) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Only HQ ADMIN can access this route
    if (
      emp.role === 'hq-admin'
    ) {
      console.log('HQ exclusive Admin role checked');
      next();
      return
    }

    res.status(403).json({ message: 'Access denied: Insufficient role for HQ-exclusive action' });
    return
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

export { checkHrRole, checkAdminRole, checkHqExclusiveRole, checkdocumentStaff, checkHqAdminRole };

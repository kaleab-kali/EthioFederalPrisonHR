import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel';
import 'dotenv';

// Login validation
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addEmployee = async (req: Request, res: Response) => {
  try {
    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    console.log(newEmployee);

    res.status(201).json(newEmployee);
    console.log('employee added');
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const errorMessages = errors.array().map((error) => error.msg); // Extract just the message
  //   res.status(400).json({ message: errorMessages.join(', ') }); //  a string of messages
  // }

  const { userName, password } = req.body;
  try {
    const employee = await Employee.findOne({ userName });
    if (!employee) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = employee && await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    console.log(isMatch);
    const token = generateToken(employee?.id);

    res.status(200).json({
      employee: {
        id: employee?.id,
        name: employee?.firstName,
        email: employee?.email,
        token: token,
        role: employee?.role,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    return;
  }
};
const assignCredentials = async (req: Request, res: Response) => {
  
  const { employeeId, userName, password } = req.body;

  try {
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).send('Employee not found');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    employee.userName = userName;
    employee.password = hashedPassword;

    await employee.save();

    res.send('Credentials assigned');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error assigning credentials');
  }
};

export { getEmployees, addEmployee, loginUser, assignCredentials };

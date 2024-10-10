import { Request, Response } from 'express';
import Employee from '../models/employeeModel';
import bcrypt from 'bcrypt';

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

    res.status(201).json(newEmployee);
    console.log('employee added');
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const assignCredentials = async (req: Request, res: Response) => {
  const { employeeId, userName, password } = req.body;

  try {

    const employee = await Employee.findOne({ empId: employeeId });
    console.log('Received employeeId:', employeeId);

    console.log('Employee found:', employee);

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


export { getEmployees, addEmployee, assignCredentials };

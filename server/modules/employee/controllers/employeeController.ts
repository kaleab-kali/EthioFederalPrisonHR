import { Request, Response } from 'express';
import Employee from '../models/employeeModel';

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

export { getEmployees, addEmployee };

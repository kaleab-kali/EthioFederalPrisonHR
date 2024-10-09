import { Request, Response } from 'express';
import Employee from '../models/employeeModel';

// Controller function to fetch all employees
const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { getEmployees };
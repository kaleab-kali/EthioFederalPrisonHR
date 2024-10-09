import { Router } from 'express';
import { addEmployee, getEmployees } from '../controllers/employeeController';

const router = Router();
router.get('/', getEmployees);
router.post('/', addEmployee);

export default router;

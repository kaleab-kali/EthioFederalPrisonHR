import { Router } from 'express';
import { addEmployee, getEmployees, assignCredentials} from '../controllers/employeeController';

const router = Router();
router.get('/', getEmployees);
router.post('/', addEmployee);
router.post('/assign-credentials', assignCredentials);

export default router;

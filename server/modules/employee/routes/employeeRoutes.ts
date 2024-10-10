import { Router } from 'express';
import { addEmployee, getEmployees, assignCredentials,loginUser} from '../controllers/employeeController';
import authenticate from '../middlewares/authunticate';

const router = Router();
router.get('/', getEmployees);
router.post('/', authenticate,addEmployee);
router.post('/auth/login', loginUser);
router.post('/assign-credentials', assignCredentials)

export default router;

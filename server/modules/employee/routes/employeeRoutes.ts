import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  loginUser,
} from '../controllers/employeeController';
import { checkHrRole,checkAdminRole } from '../middlewares/checkRoles';
import { authenticate } from '../middlewares/authunticate';

const router = Router();
router.get('/', getEmployees);
router.post('/assign-credentials',authenticate,checkAdminRole, assignCredentials);
router.post('/', authenticate,checkHrRole ,addEmployee);
router.post('/auth/login', loginUser);

export default router;

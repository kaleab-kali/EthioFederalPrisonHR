import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  loginUser,
} from '../controllers/employeeController';
import authenticate from '../middlewares/authunticate';

const router = Router();
router.get('/', getEmployees);
router.post('/', addEmployee);
router.post('/assign-credentials', assignCredentials);
router.post('/', authenticate, addEmployee);
router.post('/auth/login', loginUser);

export default router;

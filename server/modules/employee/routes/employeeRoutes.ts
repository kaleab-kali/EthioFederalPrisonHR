import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  handleTransfer,
  loginUser,
  requestTransfer,
} from '../controllers/employeeController';
import { checkHrRole,checkAdminRole } from '../middlewares/checkRoles';
import { authenticate } from '../middlewares/authunticate';

const router = Router();
router.get('/', getEmployees);
router.post('/assign-credentials',
  authenticate, checkAdminRole, assignCredentials);
router.post('/', 
  // authenticate,checkHrRole ,
  addEmployee);
router.post('/auth/login', loginUser);
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);

export default router;

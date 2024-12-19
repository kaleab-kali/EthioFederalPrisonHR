import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  loginUser,
  requestTransfer,
  handleTransfer,
  createEvaluation, getEvaluationById
} from '../controllers/employeeController';
import  {authenticate}  from '../middlewares/authunticate';
import { checkHrRole,checkAdminRole } from '../middlewares/checkRoles';

const router = Router();
router.get('/', getEmployees);
router.post('/assign-credentials',authenticate,checkAdminRole, assignCredentials);
router.post('/', authenticate,checkHrRole ,addEmployee);
router.post('/auth/login', loginUser);
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);
router.post("/evaluation", createEvaluation);
router.get("/evaluation/:employeeId", getEvaluationById);

export default router;

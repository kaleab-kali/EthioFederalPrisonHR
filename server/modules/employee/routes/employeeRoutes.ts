import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  loginUser,
  requestTransfer,
  handleTransfer,
  createEvaluation, getEvaluationById,
  getEmployeeById,
  updateEmployee
} from '../controllers/employeeController';
import  {authenticate}  from '../middlewares/authunticate';
import { checkHrRole,checkAdminRole } from '../middlewares/checkRoles';

const router = Router();
router.get('/', getEmployees);
router.get('/:empId', getEmployeeById);
router.put('/:empId', updateEmployee);
router.post('/assign-credentials',authenticate,checkAdminRole, assignCredentials);
router.post('/' ,addEmployee);
router.post('/auth/login', loginUser);
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);
router.post("/evaluation", createEvaluation);
router.get("/evaluation/:employeeId", getEvaluationById);

export default router;

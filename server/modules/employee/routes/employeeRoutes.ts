import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees,
  loginUser,
  handleTransfer,
  createEvaluation,
  getEvaluationById,
  getEmployeeById,
  updateEmployee,
  requestTransfer,
  getAllEmpsWithPendingTransferStatus,
  getAllEmpsWithAcceptedTransferStatus,
  addWorkExperience
} from '../controllers/employeeController';
import  { addFamilyRecord, addHealthRecord, deleteFamilyRecord, updateFamilyRecord} from "../controllers/healthController";
import  {authenticate}   from '../middlewares/authunticate';
import { checkHrRole,checkAdminRole } from '../middlewares/checkRoles';

const router = Router();
router.get('/', getEmployees);
router.get('/:empId', getEmployeeById);
router.put('/:empId', updateEmployee);
router.post('/assign-credentials',authenticate,checkAdminRole, assignCredentials);
router.post('/', authenticate,checkHrRole ,addEmployee);
router.post('/auth/login', loginUser);
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);
router.post("/evaluation", createEvaluation);
router.get("/evaluation/:employeeId", getEvaluationById);
router.get("/pendingTransfer", getAllEmpsWithPendingTransferStatus),
router.get("/acceptedTransfer", getAllEmpsWithAcceptedTransferStatus),
router.post('/addFamilyRecord', addFamilyRecord);
router.post('/addHealthRecord', addHealthRecord);
router.delete('/deleteFamilyRecord/:employeeId/:recordId', deleteFamilyRecord);
router.put('/updateFamilyRecord/:employeeId/:recordId', updateFamilyRecord);
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);
router.post('/work-experience', addWorkExperience);

export default router;

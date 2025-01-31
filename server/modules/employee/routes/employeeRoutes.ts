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
  addWorkExperience,
  changePasswordController, 
  changeRole 
} from '../controllers/employeeController';
import  { addFamilyRecord, addHealthRecord, deleteFamilyRecord, updateFamilyRecord} from "../controllers/healthController";
import  {authenticate}   from '../middlewares/authunticate';
import { checkHqAdminRole,checkHrRole,checkAdminRole, checkHqExclusiveRole } from '../middlewares/checkRoles';

const router = Router();

// COMMENT FOR MESEKIR
// centerName needed in all routes except get, login, change role, change password

// for center hrmanager and staff exceptinal
router.get('/:centerName', authenticate,checkHrRole, getEmployees);
router.get('/', authenticate, checkHqAdminRole, getEmployees);
router.get('/:empId', getEmployeeById);
router.put('/:empId', authenticate, checkHrRole, updateEmployee);
router.post('/assign-credentials/:centerName',authenticate,checkAdminRole, assignCredentials);
router.put('/change-role', authenticate, checkHqAdminRole, changeRole);
router.post('/', authenticate, checkHqExclusiveRole ,addEmployee);
router.post('/auth/login', loginUser);
router.post("/change-password", changePasswordController);
router.post('/transfer/request/:centerName', authenticate,checkHrRole , requestTransfer);
router.post('/transfer/handle/:centerName', authenticate,checkHrRole , handleTransfer);
router.post("/evaluation/:centerName", authenticate,checkHrRole , createEvaluation);
router.get("/evaluation/:employeeId/:centerName", authenticate, checkHrRole , getEvaluationById);
router.get("/pendingTransfer/:centerName", authenticate,checkHrRole , getAllEmpsWithPendingTransferStatus),
router.get("/acceptedTransfer/:centerName", authenticate,checkHrRole , getAllEmpsWithAcceptedTransferStatus),
router.post('/addFamilyRecord/:centerName', authenticate,checkHrRole , addFamilyRecord);
router.post('/addHealthRecord/:centerName', authenticate,checkHrRole , addHealthRecord);
router.delete('/deleteFamilyRecord/:employeeId/:recordId/:centerName', authenticate, checkHrRole , deleteFamilyRecord);
router.put('/updateFamilyRecord/:employeeId/:recordId/:centerName', authenticate, checkHrRole , updateFamilyRecord);
router.post('/work-experience/:centerName', authenticate, checkHrRole , addWorkExperience);

export default router;

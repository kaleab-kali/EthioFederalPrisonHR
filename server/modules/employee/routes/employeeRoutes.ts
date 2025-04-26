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
router.get('/', getEmployees);
router.get('/',   getEmployees);
router.get('/:empId', getEmployeeById);
router.put('/:empId',  updateEmployee);
router.post('/assign-credentials/', assignCredentials);
router.put('/change-role',   changeRole);
router.post('/',  addEmployee);
router.post('/auth/login', loginUser);
router.post("/change-password", changePasswordController);
router.post('/transfer/request/',  requestTransfer);
router.post('/transfer/handle/',  handleTransfer);
router.post("/evaluation/",  createEvaluation);
router.get("/evaluation/:employeeId/",   getEvaluationById);
router.get("/pendingTransfer/",  getAllEmpsWithPendingTransferStatus),
router.get("/acceptedTransfer/",  getAllEmpsWithAcceptedTransferStatus),
router.post('/addFamilyRecord/',  addFamilyRecord);
router.post('/addHealthRecord/',  addHealthRecord);
router.delete('/deleteFamilyRecord/:employeeId/:recordId/',   deleteFamilyRecord);
router.put('/updateFamilyRecord/:employeeId/:recordId/',   updateFamilyRecord);
router.post('/work-experience/',   addWorkExperience);

export default router;

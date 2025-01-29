import { Router } from 'express';
import {
  addEmployee,
  assignCredentials,
  getEmployees
  ,
  loginUser,
  handleTransfer,
  createEvaluation, getEvaluationById,
  requestTransfer,
  getAllEmpsWithPendingTransferStatus,
  getAllEmpsWithAcceptedTransferStatus,
} from '../controllers/employeeController';
import  { addFamilyRecord, addHealthRecord, deleteFamilyRecord, updateFamilyRecord, addHealthRecords} from "../controllers/healthController";
import  {authenticate}   from '../middlewares/authunticate';
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
router.get('/pendingTransfer', getAllEmpsWithPendingTransferStatus),
  router.get('/acceptedTransfer', getAllEmpsWithAcceptedTransferStatus),
  router.post('/:id/family', async (req, res) => {
    try {
      const result = await addFamilyRecord(req.params.id, req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post("/:id/health", async (req, res) => {
  try {
    const result = await addHealthRecord(req.params.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Error occured' });
  }
});

router.put("/:id/family/:recordId", async (req, res) => {
  try {
    const result = await updateFamilyRecord(req.params.id, req.params.recordId, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Family Record Not found' });
  }
});

router.delete("/:id/family/:recordId", async (req, res) => {
  try {
    const result = await deleteFamilyRecord(req.params.id, req.params.recordId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Family Record Not found' });
  }
});

router.put("/:employeeId/family/:familyRecordId/health-records", async (req, res) => {
  try {
    const { employeeId, familyRecordId } = req.params;
    const newRecord = req.body;

    const updatedFamilyRecord = await addHealthRecords(employeeId, familyRecordId, newRecord);

    res.status(200).json({
      message: "Health record(s) added successfully",
      updatedFamilyRecord,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add health record(s)" });
  }
});
router.post('/transfer/request', requestTransfer);
router.post('/transfer/handle', handleTransfer);

export default router;

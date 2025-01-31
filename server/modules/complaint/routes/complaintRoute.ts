import express from 'express';
import {
  createComplaint,
  updateComplaintStatus,
  getAllComplaints,
  getComplaintById,
} from '../controllers/complaintController';
import fileUpload from 'express-fileupload';
import { checkHrRole, checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = express.Router();

// Enable file upload middleware
router.use(fileUpload());

// Routes
// COMMENT FOR MESEKIR
//All routes need centerName
router.post('/:centerName', authenticate, checkHrRole, createComplaint);
router.patch('/status/:complaintId/:centerName',authenticate, checkHrRole, updateComplaintStatus);
router.get('/:centerName', authenticate, checkHrRole, getAllComplaints);
router.get('/:complaintId/:centerName', authenticate, checkHrRole, getComplaintById);

export default router;

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
router.post('/' ,  createComplaint);
router.patch('/status/:complaintId/',  updateComplaintStatus);
router.get('/' ,  getAllComplaints);
router.get('/:complaintId/' ,  getComplaintById);

export default router;

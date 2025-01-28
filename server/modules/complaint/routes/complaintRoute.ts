import express from 'express';
import {
  createComplaint,
  updateComplaintStatus,
  getAllComplaints,
  getComplaintById,
} from '../controllers/complaintController';
import fileUpload from 'express-fileupload';

const router = express.Router();

// Enable file upload middleware
router.use(fileUpload());

// Routes
router.post('/', createComplaint);
router.patch('/status/:complaintId', updateComplaintStatus);
router.get('/', getAllComplaints);
router.get('/:complaintId', getComplaintById);

export default router;

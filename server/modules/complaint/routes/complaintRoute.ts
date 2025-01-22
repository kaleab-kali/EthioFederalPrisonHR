// complaintRoutes.ts
import express from 'express';
import {
    createComplaint,
    updateComplaintStatus,
    getAllComplaints,
    getComplaintById
} from '../controllers/complaintController';

import upload from '../config/multerConfig';

const router = express.Router();

router.post('/', upload.array('attachments', 10),createComplaint);

router.patch('/status/:complaintId', upload.array('evidenceFiles', 5), updateComplaintStatus);

router.get('/', getAllComplaints);

router.get('/:complaintId', getComplaintById);

export default router;

import express from 'express';
import {
  createLeaveBalance,
  deleteLeaveBalance,
  getAllLeaveBalances,
  updateLeaveBalance,
} from '../controllers/leaveBalanceController';



const router = express.Router();

router.post('/', createLeaveBalance);

router.get('/',getAllLeaveBalances);

router.put('/', updateLeaveBalance);

router.delete(
  '/:leaveType',
  
  deleteLeaveBalance,
);

export default router;


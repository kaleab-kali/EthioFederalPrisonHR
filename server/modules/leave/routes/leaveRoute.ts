import express, { Router } from 'express';
import {
  createLeaveInfo,
  getAllLeaveInfo,
  getLeaveInfoForDepartmentHead,
  getLeaveInfoForManager,
  getLeaveInfoByEmployeeId,
  getAllLeaveBalances,
  updateLeaveBalances,
  getAllLeaveBalanceByYear,
  getLeavePermit,
} from '../controllers/leaveController';

// import authAdminProtect from '../middleware/adminMiddleware/authAdminMiddleware';
// import checkHrStaffRole from '../middleware/adminMiddleware/authHrstaffMiddleware';
// import checkHrManagerRole from '../middleware/adminMiddleware/authHrmanagerMiddleware';
// import checkManagerOrDepartmentHeadWithControl from '../middleware/managerMiddleware/authHeadManager';
// import authDepartmentUserProtect from '../middleware/managerMiddleware/authMangers';
// import leaveControl from '../middleware/managerMiddleware/authleave';
// import checkDepartmentHeadRoleWithControl from '../middleware/managerMiddleware/authDeptHead';

const router: Router = express.Router();

router.post('/', createLeaveInfo);
router.get('/',
    // authAdminProtect, checkHrStaffRole,
    getAllLeaveInfo);

router.get('/leaveBalances', getAllLeaveBalances);
router.get(
  '/departmentHead/:departmentHeadId',
//   authDepartmentUserProtect,
  getLeaveInfoForDepartmentHead,
);
router.get(
  '/manager/:managerId',
//   authDepartmentUserProtect,
  getLeaveInfoForManager,
);
router.get('/leaveBalances/:employeeId/:year', getAllLeaveBalanceByYear);

router.get(
  '/leaveBalancesByYear/:year',
//   getAllLeaveBalancesByYearForAllEmployees,
);
router.get('/employee/:employeeId', getLeaveInfoByEmployeeId);

// Update leave information by ID
router.put('/',
    // authDepartmentUserProtect, leaveControl, updateLeaveInfo
);

router.put(
  '/leaveBalances/:empId',
//   authAdminProtect,
//   checkHrStaffRole,
  updateLeaveBalances,
);

// Delete leave information by ID
// router.delete('/:id', authAdminProtect, checkHrManagerRole, deleteLeaveInfo);
router.get("/leavePermit/:employeeId", getLeavePermit);
export default router;

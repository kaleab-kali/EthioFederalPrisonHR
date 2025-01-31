import express, { Router } from "express";
import {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
} from "../controllers/appraisalHistoryController";
import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router: Router = express.Router();

// Create appraisal information
router.post("/", authenticate, checkHqExclusiveRole, createAppraisalHistory);

// Get appraisal information for a specific employee by ID
router.get("/employee/:employeeId", authenticate, checkHqExclusiveRole, getAppraisalHistoryByEmployeeId);

// Get all appraisal information
router.get("/", authenticate, checkHqExclusiveRole, getAllAppraisalHistory);

export default router;

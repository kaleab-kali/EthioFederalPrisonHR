import express, { Router } from "express";
import {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
} from "../controllers/appraisalHistoryController";

const router: Router = express.Router();

// Create appraisal information
router.post("/", createAppraisalHistory);

// Get appraisal information for a specific employee by ID
router.get("/employee/:employeeId", getAppraisalHistoryByEmployeeId);

// Get all appraisal information
router.get("/", getAllAppraisalHistory);

export default router;

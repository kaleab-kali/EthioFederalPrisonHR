import express, { Router } from "express";
import {
  createSalaryLimit,
  getAllSalaryLimits,
  updateSalaryLimit,
} from "../controllers/SalaryLimitController";


const router: Router = express.Router();

// Create a new salary limit
router.post("/", createSalaryLimit);

// Get all salary limits
router.get("/", getAllSalaryLimits);

// Update an existing salary limit
router.put("/",  updateSalaryLimit);

export default router;

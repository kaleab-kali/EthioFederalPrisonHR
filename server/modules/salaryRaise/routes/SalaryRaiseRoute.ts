import express, { Router } from "express";
import {
    createSalaryRaise,
    updateSalaryRaiseStatus,
    getAllSalaryRaises,
} from "../controllers/salaryRaiseController";

const router: Router = express.Router();

// Create a new salary limit
router.post("/", createSalaryRaise);

// Get all salary raises
router.get("/", getAllSalaryRaises);

// Update an existing salary Raise
router.put("/:id", updateSalaryRaiseStatus);

export default router;

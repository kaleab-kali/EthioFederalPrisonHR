import express, { Router } from "express";
import {
    createSalaryRaise,
    updateSalaryRaiseStatus,
    getAllSalaryRaises,
} from "../controllers/salaryRaiseController";
import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router: Router = express.Router();

// Create a new salary limit
router.post("/", authenticate, checkHqExclusiveRole, createSalaryRaise);

// Get all salary raises
router.get("/", authenticate, checkHqExclusiveRole, getAllSalaryRaises);

// Update an existing salary Raise
router.put("/:id", authenticate, checkHqExclusiveRole, updateSalaryRaiseStatus);

export default router;

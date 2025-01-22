import express from "express";
import {
  createAppraisal,
  getAllAppraisals,
} from "../controllers/appraisalController";


const router = express.Router();

// Get all appraisals
router.get("/all", getAllAppraisals);

// create new appraisal
router.post("/", createAppraisal);

export default router;

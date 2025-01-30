import express from "express";
import {
  createAppraisal,
  getAllAppraisals,
} from "../controllers/appraisalController";

import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = express.Router();

// Get all appraisals
router.get("/all", authenticate, checkHqExclusiveRole, getAllAppraisals);

// create new appraisal
router.post("/", authenticate, checkHqExclusiveRole, createAppraisal);

export default router;

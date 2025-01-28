import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";
import { verifyAuth } from "../middleware/auth";
import { validateUserContext } from "../middleware/center";

const router = Router();
const dashboardController = new DashboardController();

router.get("/statistics", verifyAuth, validateUserContext, async (req, res) => {
  try {
    await dashboardController.getStatistics(req, res);
  } catch (error) {
    res.status(500).json({ message: "Failed to process the request", error });
  }
});

export default router;

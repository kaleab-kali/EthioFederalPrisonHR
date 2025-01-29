import { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService";

const dashboardService = new DashboardService();

export class DashboardController {
  async getStatistics(req: Request, res: Response) {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized: User not authenticated" });
        return
      }

      // Extract the user details directly
      const { centerName, isHQ } = req.user;

      // Check if centerId is undefined
      if (!isHQ && !centerName) {
        return res.status(400).json({ message: "Center ID is required" });
      }

      // Pass the details to the service
      const stats = await dashboardService.getStatistics(centerName || "", isHQ);

      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics", error });
    }
  }
}



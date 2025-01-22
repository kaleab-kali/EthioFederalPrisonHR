import { Request, Response } from "express";
import AppraisalHistoryService from "../services/appraisalHistoryService";

const createAppraisalHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAppraisalHistory = await AppraisalHistoryService.createAppraisalHistory(req.body);
    res.status(201).json({ message: "Appraisal history saved successfully", newAppraisalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppraisalHistoryByEmployeeId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const appraisalHistory = await AppraisalHistoryService.getAppraisalHistoryByEmployeeId(employeeId);
    if (!appraisalHistory) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }
    res.status(200).json(appraisalHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAppraisalHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const appraisalHistory = await AppraisalHistoryService.getAllAppraisalHistory();
    const filteredAppraisalHistory = appraisalHistory.filter((item) => item !== null);
    res.status(200).json(filteredAppraisalHistory);
  } catch (error) {
    console.error("Error fetching appraisal history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
};

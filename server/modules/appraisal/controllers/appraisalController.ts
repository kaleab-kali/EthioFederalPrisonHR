import { Request, Response } from "express";
import * as appraisalService from "../services/appraisalService";

const createAppraisal = async (req: Request, res: Response): Promise<void> => {
  try {
    await appraisalService.createAppraisals();
    res.status(200).json({ message: "Appraisals created successfully" });
  } catch (error) {
    console.error("Error creating appraisals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAppraisals = async (req: Request, res: Response): Promise<void> => {
  try {
    const appraisals = await appraisalService.getAllAppraisals();
    res.status(200).json(appraisals);
  } catch (error) {
    console.error("Error fetching appraisals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {createAppraisal, getAllAppraisals};

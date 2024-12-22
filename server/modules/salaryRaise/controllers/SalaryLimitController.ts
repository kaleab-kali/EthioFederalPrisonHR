import { Request, Response } from "express";
import {
  createSalaryLimitService,
  getAllSalaryLimitsService,
  updateSalaryLimitService,
} from "../services/salaryLimitService";

export const createSalaryLimit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, salaryLimit } = req.body;
    const newSalaryLimit = await createSalaryLimitService(title, salaryLimit);
    res.status(201).json(newSalaryLimit);
  } catch (err) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    res.status(err instanceof Error && errorMessage === "Salary limit for this title already exists" ? 400 : 500).json({ error: errorMessage });
  }
};

export const getAllSalaryLimits = async (_req: Request, res: Response): Promise<void> => {
  try {
    const salaryLimits = await getAllSalaryLimitsService();
    res.status(200).json(salaryLimits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSalaryLimit = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, salaryLimit } = req.body;
    const updatedSalaryLimit = await updateSalaryLimitService(title, salaryLimit);
    if (!updatedSalaryLimit) {
      res.status(404).json({ message: "Salary limit not found" });
      return;
    }
    res.status(200).json(updatedSalaryLimit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
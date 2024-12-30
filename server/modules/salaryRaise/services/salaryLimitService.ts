// services/salaryLimitService.ts
import { SalaryLimits, SalaryLimitsDocument } from "../models/salaryLimitModel";

export const createSalaryLimitService = async (title: string, salaryLimit: number): Promise<SalaryLimitsDocument> => {
  const existingLimit = await SalaryLimits.findOne({ title });
  if (existingLimit) {
    throw new Error("Salary limit for this title already exists");
  }
  const newSalaryLimit: SalaryLimitsDocument = new SalaryLimits({ title, salaryLimit });
  return await newSalaryLimit.save();
};

export const getAllSalaryLimitsService = async (): Promise<SalaryLimitsDocument[]> => {
  return await SalaryLimits.find();
};

export const updateSalaryLimitService = async (title: string, salaryLimit: number): Promise<SalaryLimitsDocument | null> => {
  return await SalaryLimits.findOneAndUpdate({ title }, { salaryLimit }, { new: true });
};

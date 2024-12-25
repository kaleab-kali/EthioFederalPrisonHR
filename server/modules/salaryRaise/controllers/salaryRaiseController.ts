// controllers/salaryRaiseController.ts
import { Request, Response } from "express";
import {
  getEmployees,
  getSalaryLimits,
  isEligibleForSalaryRaise,
  createSalaryRaiseRecords,
  getSalaryRaises,
  updateSalaryRaiseRecord,
} from "../services/SalaryRaiseService";

export const createSalaryRaise = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await getEmployees();
    const salaryLimits = await getSalaryLimits();

    const eligibleEmployees = employees.filter((employee) =>
      isEligibleForSalaryRaise(employee, salaryLimits)
    );

    const salaryRaiseData = eligibleEmployees.map((employee) => ({
      employeeId: employee.empId,
      title: employee.title,
      currentSalary: parseInt(employee.salary),
      salaryRaiseTime: new Date(),
      status: "pending",
    }));

    const newSalaryRaises = await createSalaryRaiseRecords(salaryRaiseData);

    res.status(201).json({ message: "Salary raises created successfully", salaryRaises: newSalaryRaises });
  } catch (error) {
    console.error("Error creating salary raises:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSalaryRaiseStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, newSalary } = req.body;
    const employeeId = req.params.id;

    const { salaryRaise } = await updateSalaryRaiseRecord(employeeId, status, newSalary);

    res.status(200).json({ message: "Salary raise request updated successfully", salaryRaise });
  } catch (error) {
    console.error("Error updating salary raise status:", error);
    res.status(400).json({message:"not found"});
  }
};

export const getAllSalaryRaises = async (_req: Request, res: Response): Promise<void> => {
  try {
    const salaryRaises = await getSalaryRaises();
    res.status(200).json(salaryRaises);
  } catch (error) {
    console.error("Error fetching salary raises:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
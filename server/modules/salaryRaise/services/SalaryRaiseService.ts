import SalaryRaise, { SalaryRaiseDocument } from "../models/salaryRaiseModel";
import Employee from "../../employee/models/employeeModel";
import { SalaryLimitsDocument, SalaryLimits } from "../models/salaryLimitModel";
import {IEmployee} from "../../employee/types/employeeTypes";

export const getEmployees = async (): Promise<IEmployee[]> => {
  return await Employee.find();
};

export const getSalaryLimits = async (): Promise<SalaryLimitsDocument[]> => {
  return await SalaryLimits.find();
};

export const isEligibleForSalaryRaise = (
  employee: IEmployee,
  salaryLimits: SalaryLimitsDocument[]
): boolean => {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

  if (!employee.lastSalaryRaise) {
    return (
      employee.employmentDate &&
      employee.employmentDate <= twoYearsAgo &&
      checkSalaryAgainstLimit(employee.title, employee.salary, salaryLimits)
    );
  }

  const twoYearsAfterLastRaise = new Date(employee.lastSalaryRaise);
  twoYearsAfterLastRaise.setFullYear(twoYearsAfterLastRaise.getFullYear() + 2);

  return (
    twoYearsAfterLastRaise <= new Date() &&
    checkSalaryAgainstLimit(employee.title, employee.salary, salaryLimits)
  );
};

export const checkSalaryAgainstLimit = (
  title: string,
  currentSalary: string,
  salaryLimits: SalaryLimitsDocument[]
): boolean => {
  const salaryLimit = salaryLimits.find((limit) => limit.title === title);
  return salaryLimit ? parseInt(currentSalary) < salaryLimit.salaryLimit : false;
};

export const createSalaryRaiseRecords = async (
    salaryRaiseData: Partial<SalaryRaiseDocument>[]
  ): Promise<SalaryRaiseDocument[]> => {
    return await SalaryRaise.insertMany(salaryRaiseData) as SalaryRaiseDocument[];
  };

export const getSalaryRaises = async (): Promise<SalaryRaiseDocument[]> => {
  return await SalaryRaise.find();
};

export const updateSalaryRaiseRecord = async (
    id: string,
    status: string,
    newSalary?: number
  ): Promise<{ salaryRaise: SalaryRaiseDocument; employee: IEmployee | null }> => {
    const salaryRaise = await SalaryRaise.findOne({ employeeId: id });
    if (!salaryRaise) {
      throw new Error("Salary raise request not found");
    }
  
    if (status !== "accepted" && status !== "rejected") {
      throw new Error("Invalid status. Status must be 'accepted' or 'rejected'");
    }
  
    const employee = await Employee.findOne({ empId: salaryRaise.employeeId });
  
    if (status === "accepted") {
      if (!employee) throw new Error("Employee not found");
      if (!newSalary) throw new Error("New salary must be provided for accepted status");
  
      employee.salary = String(newSalary);
      employee.lastSalaryRaise = new Date();
      await employee.save();
      salaryRaise.newSalary = newSalary;
    }
  
    salaryRaise.status = status;
    await salaryRaise.save();
  
    return { salaryRaise, employee };
  };
// appraisalService.ts
import Employee  from "../../employee/models/employeeModel";
import {IEmployee} from "../../employee/types/employeeTypes";
import Appraisal, { AppraisalDocument } from "../models/appraisalModel";
import Complaint from "../../complaint/models/complaintModel";

const titleMap: { [title: string]: number } = {
  "Constable": 4,
  "Assistant Sergeant": 3,
  "Deputy Sergeant": 3,
  "Sergeant": 3,
  "Chief Sergeant": 2,
  "Assistant Inspector": 3,
  "Deputy Inspector": 3,
  "Inspector": 2,
  "Chief Inspector": 3,
  "DeputyCommander": 3,
  "Commander": 3,
};

export const createAppraisals = async (): Promise<void> => {
  try {
    const employees: IEmployee[] = await Employee.find().exec();
    const eligibleEmployees = employees.filter(isEligibleForAppraisal);
    const uniqueEligibleEmployees = await filterExistingAppraisals(eligibleEmployees);
    const finalEligibleEmployees = await filterEmployeesWithHighComplaints(uniqueEligibleEmployees);

    const appraisals: AppraisalDocument[] = finalEligibleEmployees.map(createAppraisalDocument).filter(Boolean) as AppraisalDocument[];

    await Appraisal.insertMany(appraisals);
    console.log("Appraisals created successfully");
  } catch (error) {
    console.error("Error creating appraisals:", error);
  }
};

export const getAllAppraisals = async (): Promise<AppraisalDocument[]> => {
  return await Appraisal.find().exec();
};

const isEligibleForAppraisal = (employee: IEmployee): boolean => {
  const promotionDate = employee.rankChanges.length > 0 ? employee.rankChanges[0].date : employee.employmentDate;
  if (!promotionDate) return false;
  
  const yearsOfWork = Math.floor((new Date().getTime() - promotionDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  const requiredYears = titleMap[employee.title];
  return yearsOfWork >= requiredYears;
};

const filterExistingAppraisals = async (employees: IEmployee[]): Promise<IEmployee[]> => {
  const existingAppraisalIds = (await Appraisal.find().select("employeeId").exec()).map(a => a.employeeId);
  return employees.filter(employee => !existingAppraisalIds.includes(employee.empId));
};

const filterEmployeesWithHighComplaints = async (employees: IEmployee[]): Promise<IEmployee[]> => {
  const employeesWithHighGuiltyComplaints = (await Complaint.find({ degreeOfComplaint: "High", status: "guilt" }).select("employeeId").exec()).map(c => c.employeeId);
  return employees.filter(employee => employee.empId && !employeesWithHighGuiltyComplaints.includes(employee.empId));
};

const createAppraisalDocument = (employee: IEmployee): AppraisalDocument | null => {
  const promotionDate = employee.rankChanges.length > 0 ? employee.rankChanges[0].date : employee.employmentDate;
  if (!promotionDate) return null;

  return new Appraisal({
    employeeId: employee.empId,
    fullName: `${employee.firstName} ${employee.lastName}`,
    currentLevel: employee.title,
    desiredLevel: getNextTitle(employee.title),
    yearsOfWork: Math.floor((new Date().getTime() - promotionDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)),
    positionOfWork: employee.position,
    previousPromotionDate: employee.rankChanges.length > 0 ? employee.rankChanges[0].date : null,
  });
};



const getNextTitle = (currentTitle: string): string => {
  const titles = [
    "Constable",
    "Assistant Sergeant",
    "Deputy Sergeant",
    "Sergeant",
    "Chief Sergeant",
    "Assistant Inspector",
    "Deputy Inspector",
    "Inspector",
    "Chief Inspector",
    "DeputyCommander",
    "Commander",
  ];
  const currentIndex = titles.indexOf(currentTitle);
  return titles[currentIndex + 1] || "No Next Title";
};

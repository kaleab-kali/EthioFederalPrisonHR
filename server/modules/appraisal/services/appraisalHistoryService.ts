import AppraisalHistoryModel, { AppraisalHistory } from "../../appraisal/models/appraislaHistoryModel";
import Employee from "../../employee/models/employeeModel";
import {IEmployee} from "../../employee/types/employeeTypes";

const createAppraisalHistory = async (appraisalData: AppraisalHistory) => {
  const newAppraisalHistory = new AppraisalHistoryModel(appraisalData);
  await newAppraisalHistory.save();

  const employee = await Employee.findOne({ empId: newAppraisalHistory.employeeId });
  if (employee) {
    await updateEmployeeWithAppraisal(employee, newAppraisalHistory);
  }

  return newAppraisalHistory;
};

const updateEmployeeWithAppraisal = async (employee: IEmployee, appraisalHistory: AppraisalHistory) => {

  if (appraisalHistory.totalScore && appraisalHistory.totalScore >= 50) {
    appraisalHistory.status = "accepted";
    employee.title = appraisalHistory.nextLevel ?? "";
    employee.rankChanges.push({
      oldRank: employee.position,
      newRank: appraisalHistory.nextLevel ?? "",
      date: new Date(),
    });
  } else {
    appraisalHistory.status = "rejected";
  }

  employee.appraisalHistory.push(appraisalHistory);
  await employee.save();
};


const getAppraisalHistoryByEmployeeId = async (employeeId: string) => {
  const employee = await Employee.findOne({ empId: employeeId });
  if (!employee) return null;

  const appraisalHistory = await AppraisalHistoryModel.find({ employeeId });
  return appraisalHistory.map((history) => formatAppraisalHistoryWithEmployeeDetails(employee, history));
};

const getAllAppraisalHistory = async () => {
  const appraisalHistory = await AppraisalHistoryModel.find();
  return Promise.all(
    appraisalHistory.map(async (history) => {
      const employee = await Employee.findOne({ empId: history.employeeId });
      return employee && history.status === "accepted"
        ? formatAppraisalHistoryWithEmployeeDetails(employee, history)
        : null;
    })
  );
};

const formatAppraisalHistoryWithEmployeeDetails = (employee: IEmployee, history: AppraisalHistory) => {
  const latestRankChange = employee.rankChanges[employee.rankChanges.length - 1];
  return {
    ...history.toObject(),
    employee: {
      fullName: `${employee.firstName} ${employee.lastName}`,
      position: employee.position,
      promotionDate: history.status === "accepted" ? latestRankChange?.date ?? null : null,
    },
  };
};

export default {
  createAppraisalHistory,
  getAppraisalHistoryByEmployeeId,
  getAllAppraisalHistory,
};

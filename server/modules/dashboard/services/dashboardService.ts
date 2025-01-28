import Employee from "../../employee/models/employeeModel";
import Leave from "../../leave/models/leaveInfoModel";
import Complaint from "../../complaint/models/complaintModel";
import RetirementRequest from "../../retirement/models/retirementModel";
import Appraisal from "../../appraisal/models/appraisalModel";
import SalaryRaise from "../../salaryRaise/models/salaryRaiseModel"

export class DashboardService {
  async getStatistics(centerName: string, isHQ: boolean = false) {
    const centerFilter = isHQ || !centerName ? {} : { centerName };

    const totalEmployees = await Employee.countDocuments(centerFilter);
    const activeEmployees = await Employee.countDocuments({ ...centerFilter, status: "active" });
    const employeesOnLeave = await Employee.countDocuments({ ...centerFilter, status: "onLeave" });
    const pendingLeaveRequests = await Leave.countDocuments({ ...centerFilter, status: "pending" });
    const upcomingRetirements = await Employee.countDocuments({
      ...centerFilter,
      retirementDate: { $gte: new Date(), $lte: new Date(new Date().setMonth(new Date().getMonth() + 6)) },
    });
    const retirementRequestsPending = await RetirementRequest.countDocuments({ ...centerFilter, status: "pending" });
    const transfersPending = await Employee.countDocuments({ ...centerFilter, transferStatus: "pending" });
    const totalComplaints = await Complaint.countDocuments(centerFilter);
    const openComplaints = await Complaint.countDocuments({ ...centerFilter, status: "open" });
    const appraisalsPending = await Appraisal.countDocuments({ ...centerFilter, status: "pending" });
    const salaryRaiseCandidates = await SalaryRaise.countDocuments({ ...centerFilter, status: "pending" });
    const civilianEmployees = await Employee.countDocuments({ ...centerFilter, role: "civilian" });
    const militaryEmployees = await Employee.countDocuments({ ...centerFilter, role: "military" });

    const employeeDistribution = isHQ
      ? await Employee.aggregate([{ $group: { _id: "$centerId", count: { $sum: 1 } } }])
      : await Employee.countDocuments({ centerName });

    const avgLeaveDaysUsed = await Employee.aggregate([
      { $match: centerFilter },
      { $group: { _id: null, avgLeaveDays: { $avg: "$leaveDaysUsed" } } },
    ]);

    return {
      totalEmployees,
      activeEmployees,
      employeesOnLeave,
      pendingLeaveRequests,
      upcomingRetirements,
      retirementRequestsPending,
      transfersPending,
      totalComplaints,
      openComplaints,
      appraisalsPending,
      salaryRaiseCandidates,
      civilianEmployees,
      militaryEmployees,
      employeeDistribution,
      avgLeaveDaysUsed: avgLeaveDaysUsed[0]?.avgLeaveDays || 0,
    };
  }
}

import { Request, Response, NextFunction } from 'express';
import Employee from '../../employee/models/employeeModel';
import LeaveInfoModel from '../models/leaveInfoModel';
import { ILeaveInfo } from '../types/leaveInfo';
import { IEmployee } from '../../employee/types/employeeTypes';
// import LeaveInfoModel, { LeaveInfo } from '../models/leaveModel';
// import Employee, { IEmployee } from '../models/employeeModel';
// import NotificationService from '../services/notificationService';
// import { getManagerIds } from '../services/employeeManagerService';
// import cron from 'node-cron';
//import { sendMail } from "../mail/sendEmail";

const createLeaveInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, days, leaveType, to, from ,reason,status} = req.body;
    const fromDate: any = new Date(from);
    const toDate: any = new Date(to);
    const currentDate: any = new Date();
    if (days > 30) {
      res.status(400).json({
        message: 'The number of days requested should not exceed 30 days',
      });
      return;
    }

    const employee: any = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found with this ID' });
      return;
    }

    // Check for overlapping leave requests
    const overlappingLeaves = await LeaveInfoModel.find({
      employeeId,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { from: { $lte: toDate, $gte: fromDate } },
        { to: { $gte: fromDate, $lte: toDate } },
        { from: { $lte: fromDate }, to: { $gte: toDate } },
      ],
    });

    if (overlappingLeaves.length > 0) {
      res.status(400).json({
        message: 'You have an overlapping or unfinished leave request',
      });
      return;
    }

    // Get the latest leave balance record for the year
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];
    if (!latestLeaveBalance) {
      res
        .status(404)
        .json({ message: 'Leave balances not found for the employee' });
      return;
    }

    // Locate the balance for the specified leave type
    const leaveTypeBalance = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveType,
    );
    if (!leaveTypeBalance) {
      res.status(404).json({
        message: `Leave type ${leaveType} not found for the employee`,
      });
      return;
    }

    if (days > leaveTypeBalance.available) {
      res.status(400).json({ message: 'Insufficient leave balance' });
      return;
    }

    // Update the balance and mark it as modified
    leaveTypeBalance.used += days;
    leaveTypeBalance.available -= days;

    // Explicitly mark the leave balance array as modified
    employee.markModified('leaveBalances');

    // Save the updated employee document to the database
    await employee.save();

    // Create and save the new leave info
    const newLeaveInfo = new LeaveInfoModel(req.body);
    await newLeaveInfo.save();

    // Respond with updated information
    res.status(201).json({
      message: 'Leave info saved successfully',
      newLeaveInfo,
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLeaveInfoByEmployeeId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const employeeLeaveInfos = await LeaveInfoModel.find({
      employeeId: employeeId,
    });

    if (!employeeLeaveInfos || employeeLeaveInfos.length === 0) {
      res.status(404).json({ message: 'Leave info not found' });
      return;
    }

    res.status(200).json({ employeeLeaveInfos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllLeaveInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const leaveInfo: ILeaveInfo[] = await LeaveInfoModel.find();
    // Fetch employee details for each leaveInfo in parallel
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: IEmployee | null = await Employee.findOne({
            empId: info.employeeId,
          });
          if (employee) {
            // Include relevant employee details in the leaveInfo object
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + ' ' + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Log an error if an employee with the specified ID is not found
            console.error(
              `Employee not found for leaveInfo with ID ${info._id}`,
            );
            return info.toObject();
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`,
          );
          return info.toObject();
        }
      }),
    );
    res.status(200).json(leaveInfoWithEmployeeDetails);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};
const getLeaveInfoForDepartmentHead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { departmentHeadId } = req.params;

    // Fetch the department head details
    const departmentHead: IEmployee | null = await Employee.findOne({
      empId: departmentHeadId,
      role: 'department head',
    });

    if (!departmentHead) {
      res.status(404).json({ message: 'Department head not found' });
      return;
    }

    const department = departmentHead.department;

    // Fetch leave information for employees in the same department as the department head
    const leaveInfo: ILeaveInfo[] = await LeaveInfoModel.find();

    // Filter leaveInfo to include only those of employees in the same department
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: IEmployee | null = await Employee.findOne({
            empId: info.employeeId,
            department: department,
          });

          if (employee) {
            // Include relevant employee details in the leaveInfo object
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + ' ' + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Employee not in the same department, exclude from results
            return null;
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`,
          );
          return null;
        }
      }),
    );

    // Filter out null values from the result
    const filteredLeaveInfo = leaveInfoWithEmployeeDetails.filter(
      (info) => info !== null,
    );

    res.status(200).json(filteredLeaveInfo);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};

const getAllLeaveBalances = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const employees = await Employee.find(
      {},
      'firstName empId leaveBalances lastUpdated',
    );

    if (!employees || employees.length === 0) {
      res.status(404).json({ message: 'No employees found' });
      return;
    }

    res.status(200).json({
      message: 'Leave balances fetched successfully',
      leaveBalancesData: employees,
    });
  } catch (error) {
    console.error('Error fetching leave balances:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllLeaveBalanceByYear = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employeeId, year } = req.params;

    // Validate year parameter
    if (isNaN(Number(year))) {
      res.status(400).json({ message: 'Invalid year format' });
      return;
    }

    // Find the employee by employeeId
    const employee: any = await Employee.findOne({ empId: employeeId });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found with this ID' });
      return;
    }

    // Find the leave balance for the specified year
    const leaveBalanceForYear = employee.leaveBalances.find(
      (balance: any) => balance.year === Number(year),
    );

    if (!leaveBalanceForYear) {
      res
        .status(404)
        .json({ message: `No leave balance found for year ${year}` });
      return;
    }

    res.status(200).json({
      message: `Leave balance for year ${year} fetched successfully`,
      leaveBalance: leaveBalanceForYear,
    });
  } catch (error) {
    console.error('Error fetching leave balance by year:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLeaveInfoForManager = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { managerId } = req.params;

    // Fetch the manager details
    const manager: IEmployee | null = await Employee.findOne({
      empId: managerId,
      role: 'manager',
    });

    if (!manager) {
      res.status(404).json({ message: 'Manager not found' });
      return;
    }

    // Fetch leave information for employees managed by the manager
    const leaveInfo: ILeaveInfo[] = await LeaveInfoModel.find();

    // Filter leaveInfo to include only those of employees managed by the manager
    const leaveInfoWithEmployeeDetails = await Promise.all(
      leaveInfo.map(async (info) => {
        try {
          const employee: IEmployee | null = await Employee.findOne({
            empId: info.employeeId,
            manager: managerId,
          });

          if (employee) {
            return {
              employeeId: employee.empId,
              reason: info.reason,
              from: info.from,
              to: info.to,
              leaveType: info.leaveType,
              status: info.status,
              delegatedTo: info.delegatedTo,
              leaveId: info.leaveId,
              employee: {
                fullName: employee.firstName + ' ' + employee.lastName,
                email: employee.email,
                gender: employee.gender,
                department: employee.department,
              },
            };
          } else {
            // Employee not managed by the specified manager, exclude from results
            return null;
          }
        } catch (employeeError) {
          // Handle errors that may occur during the employee lookup
          console.error(
            `Error fetching employee for leaveInfo with ID ${info._id}: ${employeeError}`,
          );
          return null;
        }
      }),
    );

    // Filter out null values from the result
    const filteredLeaveInfo = leaveInfoWithEmployeeDetails.filter(
      (info) => info !== null,
    );

    res.status(200).json(filteredLeaveInfo);
  } catch (error) {
    // Handle any unexpected errors during the main operation
    console.error(`Error fetching leaveInfo: ${error}`);
    next(error);
  }
};

const updateLeaveBalances = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { empId } = req.params;
    const { leaveType, updatedValues } = req.body;
    console.log('data is ', req.body);
    // Find the employee by empId
    const employee: any = await Employee.findOne({ empId: empId });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    // Get the latest leave balance year
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];

    // Find the specific leave type within the latest leave balance year
    const leaveBalanceToUpdate = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveType,
    );

    if (!leaveBalanceToUpdate) {
      res.status(404).json({ message: 'Leave type not found' });
      return;
    }

    // Update the leave balance values
    const currentCredit = leaveBalanceToUpdate.credit;
    const currentUsed = leaveBalanceToUpdate.used;

    const newCredit =
      updatedValues.credit !== undefined ? updatedValues.credit : currentCredit;
    const newUsed =
      updatedValues.used !== undefined ? updatedValues.used : currentUsed;

    leaveBalanceToUpdate.credit = newCredit;
    leaveBalanceToUpdate.used = newUsed;
    leaveBalanceToUpdate.available = newCredit - newUsed;
    console.log('leave balance to update  ', leaveBalanceToUpdate);

    await employee.save();

    res.status(200).json({
      message: 'Leave balances updated successfully',
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error('Error updating leave balances:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteLeaveInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    // const deletedLeaveInfo = await LeaveInfoModel.findByIdAndDelete(
    //   req.params.id
    // );
    // if (!deletedLeaveInfo) {
    //   res.status(404).json({ error: "Leave info not found" });
    //   return;
    // }
    // // Update the Employee model to remove the leaveInfo reference
    // const employee = await Employee.findById(deletedLeaveInfo.employeeId);
    // if (employee) {
    //   employee.leaveInfo = undefined;
    //   await employee.save();
    // }
    // res.status(200).json({
    //   message: "Leave info deleted successfully",
    //   deletedLeaveInfo,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const hrLeaveApproval = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leaveId, confirm } = req.body;

    console.log('Leave ID:', leaveId);
    console.log('Confirm:', confirm);

    const leaveInfo: any = await LeaveInfoModel.findOne({ leaveId });

    if (!leaveInfo) {
      res.status(404).json({ message: 'Leave info not found' });
      return;
    }

    if (leaveInfo.hrApproval) {
      res.status(400).json({ message: 'Leave request already approved by HR' });
      return;
    }

    if (!confirm) {
      res.status(400).json({ message: 'HR approval confirmation required' });
      return;
    }

    leaveInfo.hrApproval = true;

    // Find the employee by the employeeId from the leaveInfo
    const employee: any = await Employee.findOne({
      empId: leaveInfo.employeeId,
    });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    // Find the latest year's leave balance
    const latestLeaveBalance =
      employee.leaveBalances[employee.leaveBalances.length - 1];

    if (!latestLeaveBalance) {
      res
        .status(404)
        .json({ message: 'Leave balances not found for the employee' });
      return;
    }

    // Find the specific leave type balance within the latest year
    const leaveTypeBalance = latestLeaveBalance.balances.find(
      (balance: any) => balance.leaveType === leaveInfo.leaveType,
    );

    if (!leaveTypeBalance) {
      res.status(404).json({
        message: `Leave type ${leaveInfo.leaveType} not found for the employee`,
      });
      return;
    }

    // Update the leave balances
    leaveTypeBalance.used += leaveInfo.days;
    leaveTypeBalance.available -= leaveInfo.days;

    // Save the updated leave info and employee leave balances
    await leaveInfo.save();
    await employee.save();

    // await NotificationService.createNotification(
    //   employee._id.toString(),
    //   'Leave Request Approved by HR',
    //   'Your leave request has been approved by HR. Enjoy your leave!',
    // );

    res.status(200).json({
      message:
        'Leave request approved by HR and leave balances updated successfully',
      leaveInfo,
      leaveBalances: employee.leaveBalances,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  createLeaveInfo,
  deleteLeaveInfo,
  getAllLeaveInfo,
  getLeaveInfoForDepartmentHead,
  getLeaveInfoForManager,
  updateLeaveBalances,
  getAllLeaveBalances,
  getAllLeaveBalanceByYear,
  getLeaveInfoByEmployeeId,
  hrLeaveApproval,
};

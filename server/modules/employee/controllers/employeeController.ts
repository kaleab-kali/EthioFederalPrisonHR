import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models/employeeModel';
import 'dotenv';
import LeaveBalanceModel from '../../leave/models/leaveBalanceModel';

// Login validation
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { empId } = req.params; // Get the employee ID from the URL parameter

    // Find the employee by ID
    const employee = await Employee.findOne({ empId });
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    // Return the employee data
    res.status(200).json({
      message: 'Employee retrieved successfully',
      employee, // Include all employee data
    });
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const { empId } = req.params; // Get the employee ID from the URL parameter
  const updatedData = req.body; // Get the updated employee data from the request body

  try {
    // Find the employee by ID
    const employee = await Employee.findOne({ empId });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    // Update the employee record with the new data
    Object.assign(employee, updatedData); // Update employee fields with the new data

    // Save the updated employee data
    await employee.save();

    // Return the updated employee data
    res.status(200).json({
      message: 'Employee updated successfully',
      employee, // Return the updated employee data
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const addEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployeeData = req.body;

    const employmentDate = new Date(newEmployeeData.employmentDate);
    const currentYear = new Date().getFullYear();
    let yearOffset = currentYear - employmentDate.getFullYear();
    if (yearOffset > 10) {
      yearOffset = 10;
    }
    const leaveTypes = await LeaveBalanceModel.find(
      {},
      { leaveType: 1, credit: 1, _id: 0 },
    );
    const balances = leaveTypes.map((type) => ({
      leaveType: type.leaveType,
      credit: type.credit + yearOffset,
      used: 0,
      available: type.credit + yearOffset,
    }));
    const leaveBalances = [{ year: currentYear, balances }];
    // Create new Employee instance

    const employee = new Employee({ ...req.body, leaveBalances });
    const newEmployee = await employee.save();
    console.log(newEmployee);

    res.status(201).json(newEmployee);
    console.log('employee added');
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const errorMessages = errors.array().map((error) => error.msg); // Extract just the message
  //   res.status(400).json({ message: errorMessages.join(', ') }); //  a string of messages
  // }

  const { userName, password } = req.body;
  try {
    const employee = await Employee.findOne({ userName });
    if (!employee) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch =
      employee && (await bcrypt.compare(password, employee.password));
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    console.log(isMatch);
    const token = generateToken(employee?.id, employee?.role);

    res.status(200).json({
      employee: {
        id: employee?.id,
        name: employee?.firstName,
        email: employee?.email,
        token: token,
        role: employee?.role,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    return;
  }
};
const assignCredentials = async (req: Request, res: Response) => {
  const { employeeId, userName, password } = req.body;

  try {
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) {
      res.status(404).send('Employee not found');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    employee.userName = userName;
    employee.password = hashedPassword;

    await employee.save();

    res.send('Credentials assigned');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error assigning credentials');
  }
};


const handleTransfer = async (req: Request, res: Response) => {
  const { employeeId, status, rejectionReason } = req.body;

  try {
    const employee = await Employee.findOne({ empId: employeeId });

    if (!employee) {
      res.status(404).send('Employee not found');
      return;
    }

    if (status === 'accepted') {
      employee.transferStatus = 'accepted';
      employee.centerName = employee.pendingCenterName;
      employee.pendingCenterName = undefined;
      await employee.save();
      res.status(200).send('Transfer accepted and center updated');
    } else if (status === 'rejected') {
      employee.transferStatus = 'rejected';
      employee.pendingCenterName = undefined;
      employee.rejectionReason = rejectionReason;
      await employee.save();
      res.status(200).send('Transfer rejected with reason');
    } else {
      res.status(400).send('Invalid status');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing transfer decision');
  }
};

const requestTransfer = async (req: Request, res: Response) => {
  const { employeeId, centerName } = req.body;
  console.log(employeeId, centerName);
  try {
    const employee = await Employee.findOne({ empId: employeeId });

    if (!employee) {
      res.status(404).send("Employee not found");
      return
    }

    employee.transferStatus = 'pending';
    employee.pendingCenterName = centerName;

    await employee.save();

    res.status(200).send("Transfer request submitted and pending approval");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error initiating transfer request");
  }
};

const getAllEmpsWithPendingTransferStatus = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find({ transferStatus: 'pending' });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getAllEmpsWithAcceptedTransferStatus = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find({ transferStatus: 'accepted' });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, self, colleague, remark, from, to } = req.body;

    // Validate the scores
    if (self < 0 || self > 70 || colleague < 0 || colleague > 30) {
      res
        .status(400)
        .json({
          message:
            "Invalid scores. Self evaluation must be between 0 and 70, colleague evaluation must be between 0 and 30.",
        });
      return;
    }

    const total = self * 0.7 + colleague * 0.3; // Calculate total score (weighted average)

    const evaluation = {
      self,
      colleague,
      total,
      remark,
      from: new Date(from), // Ensure from is a valid date
      to: new Date(to), // Ensure to is a valid date
    };

    // Find the employee by ID and update the evaluation field
    const employee = await Employee.findOne({empId: employeeId});
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Add the new evaluation to the employee's evaluation array
    employee.evaluation.push(evaluation);
    await employee.save();

    res.status(201).json({
      message: "Evaluation created successfully",
      evaluation: employee.evaluation,
    });
  } catch (error) {
    console.error("Error creating evaluation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEvaluationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params; // Get the employee ID from the URL parameter

    // Find the employee by ID
    const employee = await Employee.findOne({empId: employeeId});
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Return the evaluation data
    res.status(200).json({
      message: "Evaluation retrieved successfully",
      evaluations: employee.evaluation, // Return all evaluations
    });
  } catch (error) {
    console.error("Error retrieving evaluation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addWorkExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, workExperience } = req.body;

    // Find the employee by ID
    const employee = await Employee.findOne({empId: employeeId});
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return
    }

    // Add the work experience
    employee.workExperience.push(workExperience);
    await employee.save();

    res.status(200).json({ message: 'Work experience added successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  addEmployee,
  loginUser,getAllEmpsWithAcceptedTransferStatus,getAllEmpsWithPendingTransferStatus,
  assignCredentials, requestTransfer, handleTransfer, createEvaluation, getEvaluationById,
  
  
};
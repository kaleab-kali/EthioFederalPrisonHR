import { Request, Response } from 'express';
import Employee from "../models/employeeModel";
import { FamilyRecord } from "../types/employeeTypes";

const addFamilyRecord = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, familyRecord } = req.body;
  try {
    // Calculate the child's age using the birth date
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(familyRecord.birthDate).getFullYear();
    const age = currentYear - birthYear;

    // Assign the calculated age to the family record
    familyRecord.Age = age;

    // Determine eligibility
    if (
      (familyRecord.eventType === 'Child' && age >= 18) ||
      (familyRecord.eventType === 'Spouse' && ['Divorce', 'Widowed'].includes(familyRecord.eventType))
    ) {
      familyRecord.iseligible = false;
    } else {
      familyRecord.iseligible = true;
    }

    // Update or create the employee document and add the family record
    const employee = await Employee.findOneAndUpdate(
      { empId: employeeId },
      { $push: { familyRecords: familyRecord } },
      { new: true, upsert: true }
    );

    res.status(200).json(employee);
  } catch (error) {
    console.error(error); // Optional: log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addHealthRecord = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, healthRecord } = req.body;
  try {
    const employee = await Employee.findOne({ empId: employeeId });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    // Check eligibility
    const familyRecords = employee.familyRecords ?? [];
    if (
      healthRecord.beneficiary === 'Spouse' && !familyRecords.some(
        (record) => record.eventType === 'Marriage' && record.iseligible
      ) ||
      healthRecord.beneficiary === 'Child' && !familyRecords.some(
        (record) => record.eventType === 'Child' && record.iseligible && record.childName === healthRecord.childName
      )
    ) {
      res.status(400).json({ message: 'Beneficiary is not eligible' });
      return;
    }

    employee.healthRecords = employee.healthRecords ?? [];
    employee.healthRecords.push(healthRecord);
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFamilyRecord = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, recordId } = req.params;
  try {
    const employee = await Employee.findOneAndUpdate(
      { empId: employeeId },
      { $pull: { familyRecords: { _id: recordId } } },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateFamilyRecord = async (req: Request, res: Response): Promise<void> => {
  const { employeeId, recordId } = req.params;
  const updatedRecord = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { empId: employeeId, 'familyRecords._id': recordId },
      { $set: { 'familyRecords.$': updatedRecord } },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { addFamilyRecord, addHealthRecord, deleteFamilyRecord, updateFamilyRecord };

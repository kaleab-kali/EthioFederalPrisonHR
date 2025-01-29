import Employee from "../models/employeeModel";
import { FamilyRecord } from "../types/employeeTypes";

const addFamilyRecord = async (employeeId: string, record: FamilyRecord) => {
  console.log(`adding family record for employee ${employeeId}`, record);
  const employee = await Employee.findOne({empId: employeeId});
  if (!employee) throw new Error("Employee not found");


  if (record.type === "Kid" && record.age > 18) {
    record.isEligible = false;
  } else if (record.type === "Spouse" && record.marriageStatus === "divorced") {
    record.isEligible = false;
  } else {
    record.isEligible = true;
  }

  employee.familyRecords.push(record);
  await employee.save();
  return employee;
};

const addHealthRecord = async (employeeId: string, record: { date: string; healthIssue: string; cost: number }) => {
  const employee = await Employee.findOne({empId: employeeId});
  if (!employee) throw new Error("Employee not found");

  employee.healthRecords.push({ records: [record] });
  await employee.save();
  return employee;
};

const updateFamilyRecord = async (employeeId: string, recordId: string, updates: Partial<FamilyRecord>) => {
  const employee = await Employee.findOne({empId: employeeId});
  if (!employee) throw new Error("Employee not found");

  const record = employee.familyRecords.find(record => record.id === recordId);
  console.log(record)
  if (!record) throw new Error("Family record not found");

  Object.assign(record, updates);
  if (record.type === "Kid" && record.age > 18) {
    record.isEligible = false;
  } else if (record.type === "Spouse" && record.marriageStatus === "divorced") {
    record.isEligible = false;
  } else {
    record.isEligible = true;
  }
  await employee.save();
  return employee;
};

const deleteFamilyRecord = async (employeeId: string, recordId: string) => {
  const employee = await Employee.findOne({empId: employeeId});
  if (!employee) throw new Error("Employee not found");

  employee.familyRecords = employee.familyRecords.filter(record => record.id !== recordId);
  await employee.save();
  return employee;
};

const addHealthRecords = async (
    employeeId: string,
    familyRecordId: string,
    newRecord: { date: string; healthIssue: string; cost: number } | { date: string; healthIssue: string; cost: number }[]
  ) => {
    const employee = await Employee.findOne({ empId: employeeId });
    if (!employee) throw new Error("Employee not found");
  
    // Locate the family record
    const familyRecord = employee.familyRecords.find(record => record.id === familyRecordId);
    if (!familyRecord) throw new Error("Family record not found");
  

    const recordsToAdd = Array.isArray(newRecord) ? newRecord : [newRecord];
  

    recordsToAdd.forEach(record => {
      if (!record.date || !record.healthIssue || typeof record.cost !== 'number') {
        throw new Error("Invalid health record structure");
      }
    });
  
   
    familyRecord.records.push(...recordsToAdd);
  
    await employee.save(); 
    return familyRecord;
  };

  export{addFamilyRecord, addHealthRecord, updateFamilyRecord, deleteFamilyRecord, addHealthRecords}
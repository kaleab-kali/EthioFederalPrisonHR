import mongoose, { Schema, Document } from 'mongoose';
export interface IEmployee {
  save: any;
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  title: string;
  empId?: string;
  middleName?: string;
  userName?: string;
  birthday: Date;
  gender: string;
  department: string;
  photo?: string;
  ethnicity: string;
  centerName?: string;
  pendingCenterName?: string;
  phoneNumber: {
    prefix: string;
    number: string;
  };
  email: string;
  currentAddress?: {
    region?: string;
    subcity?: string;
    woreda?: string;
    houseNumber?: string;
    leyuBota?: string;
  };
  salary: string;
  educationLevel?: string;
  education?: Education[];
  birthplaceInfo?: {
    region?: string;
    subcity?: string;
    woreda?: string;
    houseNumber?: string;
    leyuBota?: string;
  };
  motherInformation: {
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: {
      prefix: string;
      number: string;
    };
  };
  emergencyContact: {
    info: {
      firstName: string;
      middleName?: string;
      lastName: string;
      relationship: string;
      phoneNumber: string;
      email?: string;
    };
    address?: {
      region?: string;
      subcity?: string;
      woreda?: string;
      houseNumber?: string;
      leyuBota?: string;
    };
  };
  maritalStatus: string;
  spouseInfo?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: Date;
    phoneNumber?: string;
    address?: {
      region?: string;
      subcity?: string;
      woreda?: string;
      houseNumber?: string;
      leyuBota?: string;
    };
  };
  divorcedInfo?: {
    divorceDate?: Date;
  };
  password: string;
  role: Roles;
  lastSalaryRaise?: Date;
  rankChanges: RankChange[];
  appraisalHistory: AppraisalHistory[];
  retirementDate?: Date;
  status: 'active' | 'inactive';
  skinColor: string;
  noseStructure: string;
  eyeColor: string;
  hairTexture: string;
  height: string;
  religion: string;
  nationality: string;
  employmentDate: Date;
  complaints: mongoose.Schema.Types.ObjectId[];
  evaluation: Evaluation[];
  healthRecords: HealthRecord[];
  familyRecords: FamilyRecord[];
  transferStatus?: string;
  rejectionReason?: string;
  leaveBalances?: YearlyLeaveBalances[];
}

// Types for the Education schema
export interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}

export interface RankChange {
  oldRank?: string;
  newRank?: string;
  date?: Date;
}
export interface AppraisalHistory {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string;
  promotionDate?: Date;
}
export interface Evaluation {
  self: number;
  colleague: number;
  total: number;
  remark: string;
  from: Date;
  to: Date;
}
// Family Schema
export interface FamilyRecord {
  id: string;
  personName: string;
  type: 'Spouse' | 'Kid';
  age: number;
  isEligible?: boolean;
  records: { date: string; healthIssue: string; cost: number }[];
  marriageStatus: 'married' | 'divorced' | 'widowed';
}

// Health Record Schema
export interface HealthRecord {
  records: { date: string; healthIssue: string; cost: number }[];
}
// Enum for roles
export enum Roles {
  Employee = 'employee',
  Manager = 'hrManager',
  Staff = 'hrStaff',
  DocumentStaff = 'documentStaff',
  Admin = 'admin',
  HQAdmin = 'ha-admin'
}
interface YearlyLeaveBalances {
  year: number;
  balances: LeaveBalance[];
}
interface LeaveBalance {
  leaveType: string;
  credit: number;
  used: number;
  available: number;
}

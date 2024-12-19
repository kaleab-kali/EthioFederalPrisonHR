// Types for the employee module
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
  transferStatus?: string;
  rejectionReason?: string;
  complaints: mongoose.Schema.Types.ObjectId[];
  evaluation: Evaluation[];
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
// Enum for roles
export enum Roles {
  Employee = 'employee',
  Manager = 'hrManager',
  Staff = 'hrStaff',
  DocumentStaff = 'documentStaff',
  Admin = 'admin',
}

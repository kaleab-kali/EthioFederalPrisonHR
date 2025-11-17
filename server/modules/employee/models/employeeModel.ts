import mongoose, { Schema, model, Document } from 'mongoose';
import {
  Education,
  IEmployee,
  Roles,
  RankChange,
  Evaluation,
  FamilyRecord,
  HealthRecord,
  WorkExperience
} from '../types/employeeTypes';

export const educationSchema = new Schema<Education>({
  id: { type: String },
  fieldofstudy: { type: String },
  institution: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  educationLevel: { type: String, required: true },
});

export const rankChangeSchema = new Schema<RankChange>({
  oldRank: { type: String },
  newRank: { type: String },
  date: { type: Date, default: Date.now },
});

const FamilyRecordSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: ['Marriage', 'Child', 'Divorce', 'Widowed'],
    required: true,
  },
  spouseName: String,
  spousePhoneNumber: String,
  spouseEthnicity: String,
  spouseAddress: {
    region: String,
    subcity: String,
    woreda: String,
  },
  spouseDateOfBirth: Date,
  childName: String,
  relation: String,
  childDateOfBirth: Date,
  Age: Number,
  divorceDate: Date,
  widowedDate: Date,
  iseligible: {
    type: Boolean,
    default: true,
  },
});

// Define the HealthRecord schema
const HealthRecordSchema = new mongoose.Schema({
  beneficiary: {
    type: String,
    enum: ['Employee', 'Spouse', 'Child'],
    required: true,
  },
  childName: String,
  costOfCoverage: {
    type: Number,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  coverageStartDate: {
    type: Date,
    required: true,
  },
  coverageEndDate: {
    type: Date,
    required: true,
  },
});

const workExperienceSchema = new Schema<WorkExperience>({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String, required: true },
});

const employeeSchema = new Schema<IEmployee>(
  {
    title: { type: String, required: true },
    empId: { type: String },
    firstName: { type: String, required: true },
    centerName: { type: String },
    pendingCenterName: { type: String },
    userName: { type: String, default: 'user' },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String },
    ethnicity: { type: String, required: true },
    phoneNumber: {
      prefix: { type: String },
      number: { type: String, required: true },
    },
    email: { type: String },
    currentAddress: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    salary: { type: String, required: true },
    lastSalaryRaise: { type: Date },
    educationLevel: { type: String },
    education: [educationSchema],
    birthplaceInfo: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    motherInformation: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
      phoneNumber: {
        prefix: { type: String },
        number: { type: String, required: true },
      },
    },
    emergencyContact: {
      info: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        relationship: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String },
      },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    maritalStatus: { type: String, required: true },
    spouseInfo: {
      firstName: { type: String },
      middleName: { type: String },
      lastName: { type: String },
      dob: { type: Date },
      phoneNumber: { type: String },
      address: {
        region: { type: String },
        subcity: { type: String },
        woreda: { type: String },
        houseNumber: { type: String },
        leyuBota: { type: String },
      },
    },
    divorcedInfo: {
      divorceDate: { type: Date },
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(Roles),
      default: Roles.Employee,
    },
    retirementDate: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    // New fields added
    skinColor: { type: String },
    noseStructure: { type: String },
    eyeColor: { type: String },
    hairTexture: { type: String },
    height: { type: String },
    religion: { type: String },
    nationality: { type: String },
    employmentDate: { type: Date },
    transferStatus: { type: String },
    rejectionReason: { type: String },
    rankChanges: [rankChangeSchema],
    appraisalHistory: [
      {
        employeeId: { type: String },
        currentLevel: { type: String },
        nextLevel: { type: String },
        scores: {
          education: { type: Number },
          service: { type: Number },
          attitude: { type: Number },
          behaviour: { type: Number },
          workEfficiency: { type: Number },
          disciplinary: { type: Number },
        },
        totalScore: { type: Number },
        status: { type: String },
        promotionDate: { type: Date },
      },
    ],
    complaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' }],
    evaluation: [
      {
        self: { type: Number, required: true },
        colleague: { type: Number, required: true },
        total: { type: Number, required: true },
        remark: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date, required: true },
      },
    ],
    familyRecords: [FamilyRecordSchema],
    healthRecords: [HealthRecordSchema],
    leaveBalances: [],
    workExperience: [workExperienceSchema],
    passwordChanged: { type: Boolean, default: false },
  },
  { timestamps: true },
);

employeeSchema.pre<IEmployee>('save', async function (next) {
  if (!this.empId) {
    const lastEmployee = await Employee.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastempIdNumber = 0;
    if (lastEmployee && lastEmployee.empId) {
      lastempIdNumber = parseInt(lastEmployee.empId.split('-')[1]);
    }
    this.empId = `FPC-${(lastempIdNumber + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
export default Employee;

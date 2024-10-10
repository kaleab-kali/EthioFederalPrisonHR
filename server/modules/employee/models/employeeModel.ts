import mongoose, { Schema,model,Document } from "mongoose";
import { Education, IEmployee, Roles } from "../types/employeeTypes";

export const educationSchema = new Schema<Education>({
  id: { type: String },
  fieldofstudy: { type: String },
  institution: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  educationLevel: { type: String, required: true },
});

const employeeSchema = new Schema<IEmployee>(
  {
    title: { type: String, required: true },
    empId: { type: String },
    firstName: { type: String, required: true },
    centerName: { type: String },
    userName: { type: String,default: 'user' },
    middleName: { type: String },
    lastName: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photo: { type: String },
    ethnicity: { type: String, required: true },
    phoneNumber: {
      prefix: { type: String, required: true },
      number: { type: String, required: true },
    },
    email: { type: String, required: true },
    currentAddress: {
      region: { type: String },
      subcity: { type: String },
      woreda: { type: String },
      houseNumber: { type: String },
      leyuBota: { type: String },
    },
    salary: { type: String, required: true },
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
        prefix: { type: String, required: true },
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
      required: true,
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
    skinColor: { type: String, required: true },
    noseStructure: { type: String, required: true },
    eyeColor: { type: String, required: true },
    hairTexture: { type: String, required: true },
    height: { type: String, required: true },
    religion: { type: String, required: true },
    nationality: { type: String, required: true },
    employmentDate: { type: Date },
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

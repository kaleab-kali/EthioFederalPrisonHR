import mongoose, { Types, Schema, Document } from 'mongoose';
import { DepartmentInfo } from '../types/departmentTypes';



const departmentInfoSchema = new Schema<DepartmentInfo>(
  {
    departmentId: { type: String },
    departmentName: { type: String, required: true },
    departmentHead: { type: String },
  },
  { timestamps: true },
);

departmentInfoSchema.pre<DepartmentInfo>('save', async function (next) {
  if (!this.departmentId) {
    const lastDepartment = await DepartmentModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastDepartmentNumber = 0;
    if (lastDepartment && lastDepartment.departmentId) {
      lastDepartmentNumber = parseInt(
        lastDepartment.departmentId.split('-')[1],
      );
    }
    this.departmentId = `D-${(lastDepartmentNumber + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const DepartmentModel = mongoose.model<DepartmentInfo>(
  'Departments',
  departmentInfoSchema,
);

export default DepartmentModel;

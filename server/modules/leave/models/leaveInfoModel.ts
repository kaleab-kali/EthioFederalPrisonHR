import mongoose, { Types, Schema, Document } from 'mongoose';
import { ILeaveInfo } from '../types/leaveInfo';

const leaveInfoSchema = new Schema<ILeaveInfo>(
  {
    employeeId: { type: String },
    leaveId: { type: String },
    from: { type: Date },
    to: { type: Date },
    leaveType: { type: String },
    dayType: { type: String },
    days: { type: Number },
    status: { type: String },
    delegatedTo: { type: String },
    reason: { type: String },
        rejectReason: { type: String },
    file: { type: String },
    
  },
  { timestamps: true },
);

leaveInfoSchema.pre<ILeaveInfo>('save', async function (next) {
  if (!this.leaveId) {
    const lastLeave = await LeaveInfoModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastLeaveIdNumber = 0;
    if (lastLeave && lastLeave.leaveId) {
      lastLeaveIdNumber = parseInt(lastLeave.leaveId.split('-')[1]);
    }
    this.leaveId = `FPCL-${(lastLeaveIdNumber + 1)
      .toString()
      .padStart(4, '0')}`;
  }
  next();
});

leaveInfoSchema.pre<ILeaveInfo>('save', async function (next) {
  if (!this.leaveId) {
    const lastLeave = await LeaveInfoModel.findOne(
      {},
      {},
      { sort: { createdAt: -1 } },
    );
    let lastLeaveIdNumber = 0;
    if (lastLeave && lastLeave.leaveId) {
      lastLeaveIdNumber = parseInt(lastLeave.leaveId.split('-')[1]);
    }
    this.leaveId = `FPCL-${(lastLeaveIdNumber + 1)
      .toString()
      .padStart(4, '0')}`;
  }
  next();
});

const LeaveInfoModel = mongoose.model<ILeaveInfo>('LeaveInfo', leaveInfoSchema);
export default LeaveInfoModel;

import mongoose, { Schema, Document, Model } from 'mongoose';
import { IELeaveBalance } from '../types/leaveBalance';


const LeaveBalanceSchema: Schema = new Schema({
  leaveType: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
  },
});

const LeaveBalanceModel: Model<IELeaveBalance> = mongoose.model<IELeaveBalance>(
  'LeaveBalance',
  LeaveBalanceSchema,
);

export default LeaveBalanceModel;

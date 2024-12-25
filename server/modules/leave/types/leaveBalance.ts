export interface IELeaveBalance extends Document {
  leaveType: string;
  credit: number;
  used: number;
  available: number;
}

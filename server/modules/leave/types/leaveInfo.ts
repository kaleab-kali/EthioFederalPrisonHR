export interface ILeaveInfo extends Document {
  employeeId?: string;
  leaveId?: string;
  from?: Date;
  to?: Date;
  leaveType?: string;
  dayType?: string | undefined;
  days?: number | undefined;
  status?: string | undefined;
  delegatedTo?: string | undefined;
  reason?: string | undefined;
  rejectReason?: string | undefined;
  file?: string | undefined;
}

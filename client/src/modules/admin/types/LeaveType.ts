export type LeaveType = {
  id: string;
  leaveType: string;
  credit: number;
};
  
  export type NewLeaveType = Omit<LeaveType, "id">;
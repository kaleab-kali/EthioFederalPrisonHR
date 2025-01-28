export type LeaveType = {
    id: string;
    type: string;
    credit: number;
  };
  
  export type NewLeaveType = Omit<LeaveType, "id">;
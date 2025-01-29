export interface IComplaintList {
  empID: string;
  empName: string;
  complaintID: string;
  reason: string;
  category: string;
  subCategory: string;
  status: string;
  complaintDate: string;
  attachments?: string[];
}
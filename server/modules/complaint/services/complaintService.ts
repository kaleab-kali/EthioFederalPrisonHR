import Complaint, { ComplaintDocument } from "../models/complaintModel";
import Employee from "../../employee/models/employeeModel";

interface ComplaintInput {
    employeeId: string;
    category: string;
    complaint: string;
    description: string;
    attachments?: string[];
    degreeOfComplaint?: string;
}

export const createComplaint = async (
    complaintData: ComplaintInput
): Promise<ComplaintDocument | null> => {
    const newComplaint = new Complaint(complaintData);
    const savedComplaint = await newComplaint.save();

    await Employee.findOneAndUpdate(
        { empId: complaintData.employeeId },
        { $push: { complaints: savedComplaint._id } },
        { new: true }
    );

    return savedComplaint;
};


export const updateComplaintStatus = async (
    complaintId: string,
    status: "guilt" | "not guilt",
    comment?: string,
    evidenceFiles?: string[]
): Promise<ComplaintDocument | null> => {
    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) return null;

    complaint.status = status;
    if (comment) complaint.comment = comment;
    if (evidenceFiles) complaint.evidenceFiles = evidenceFiles;

    return await complaint.save();
};

export const getAllComplaints = async (): Promise<ComplaintDocument[]> => {
    return await Complaint.find();
};

export const getComplaintById = async (complaintId: string): Promise<ComplaintDocument | null> => {
    return await Complaint.findById(complaintId);
};
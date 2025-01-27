import { Request, Response } from "express";
import * as ComplaintService from "../services/complaintService";
export const createComplaint = async (req: Request, res: Response): Promise<void> => {
    try {
        const { employeeId, category, complaint, description } = req.body;
        const attachments = req.files as Express.Multer.File[] | undefined;
        console.log('Files received:', req.files);

        const attachmentPaths = attachments?.map(file => file.path) || [];

        const newComplaint = await ComplaintService.createComplaint({
            employeeId,
            category,
            complaint,
            description,
            attachments: attachmentPaths,
        });

        if (!newComplaint) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        res.status(201).json({ message: "Complaint created and attached to employee", complaint: newComplaint });
    } catch (error) {
        console.error("Error creating complaint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateComplaintStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { complaintId } = req.params;
        const { status, comment } = req.body;
        const evidenceFiles = req.files as Express.Multer.File[] | undefined;
        const evidencePaths = evidenceFiles?.map(file => file.path) || [];

        if (status !== "guilt" && status !== "not guilt") {
            res.status(400).json({ error: "Invalid status" });
            return;
        }

        const updatedComplaint = await ComplaintService.updateComplaintStatus(
            complaintId,
            status,
            comment,
            evidencePaths
        );

        if (!updatedComplaint) {
            res.status(404).json({ message: "Complaint not found" });
            return;
        }

        res.status(200).json({ message: "Complaint status updated successfully", complaint: updatedComplaint });
    } catch (error) {
        console.error("Error updating complaint status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllComplaints = async (req: Request, res: Response): Promise<void> =>  {
    try {
        const complaints = await ComplaintService.getAllComplaints();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints', error });
    }
};

export const getComplaintById = async (req: Request, res: Response): Promise<void> =>  {
    const { complaintId } = req.params;

    try {
        const complaint = await ComplaintService.getComplaintById(complaintId);
        if (!complaint) {
            res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaint', error });
    }
};
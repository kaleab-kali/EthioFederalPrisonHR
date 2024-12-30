import { Request, Response } from 'express';
import * as ComplaintService from '../services/complaintService';
import { handleFileUpload } from '../../../config/handleFileUpload';

export const createComplaint = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { employeeId, category, complaint, description } = req.body;

    const attachments = req.files
      ? await handleFileUpload(req.files, 'complaints') // Ensure it's an array of strings
      : undefined;

    const newComplaint = await ComplaintService.createComplaint({
      employeeId,
      category,
      complaint,
      description,
      attachments,
    });

    if (!newComplaint) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(201).json({
      message: 'Complaint created and attached to employee',
      complaint: newComplaint,
    });
  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateComplaintStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { complaintId } = req.params;
    const { status, comment } = req.body;

    // Handle evidence file uploads
    const evidenceFiles = req.files
      ? await handleFileUpload(req.files, 'complaint-evidence') // Ensure it's an array of strings
      : undefined;

    if (status !== 'guilt' && status !== 'not guilt') {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const updatedComplaint = await ComplaintService.updateComplaintStatus(
      complaintId,
      status,
      comment,
      evidenceFiles,
    );

    if (!updatedComplaint) {
      res.status(404).json({ message: 'Complaint not found' });
      return;
    }

    res.status(200).json({
      message: 'Complaint status updated successfully',
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllComplaints = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch all complaints from the service
    const complaints = await ComplaintService.getAllComplaints();

    if (!complaints || complaints.length === 0) {
      res.status(404).json({ message: 'No complaints found' });
      return;
    }

    res.status(200).json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getComplaintById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { complaintId } = req.params;

    // Fetch the specific complaint by ID
    const complaint = await ComplaintService.getComplaintById(complaintId);

    if (!complaint) {
      res
        .status(404)
        .json({ message: `Complaint with ID ${complaintId} not found` });
      return;
    }

    res.status(200).json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

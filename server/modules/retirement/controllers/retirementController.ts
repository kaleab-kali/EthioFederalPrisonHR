import { Request, Response } from 'express';
import DocumentModel from '../models/retirementModel';

// Create a new retirement request
export const createRetirementRequest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { retirementId, center, centerId, empId } = req.body;

    if (!retirementId || !center || !centerId || !empId) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const newRetirementRequest = new DocumentModel({
      retirementId,
      center,
      centerId,
      empId,
    });

    await newRetirementRequest.save();

    res.status(201).json({
      message: 'Retirement request created successfully.',
      data: newRetirementRequest,
    });
  } catch (error) {
    console.error('Error creating retirement request:', error);
    res.status(500).json({ message: 'Failed to create retirement request.' });
  }
};

// Get all requested retirements
export const getRequestedRetirements = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const retirements = await DocumentModel.find();
    res.status(200).json({
      message: 'Requested retirements retrieved successfully.',
      data: retirements,
    });
  } catch (error) {
    console.error('Error retrieving requested retirements:', error);
    res
      .status(500)
      .json({ message: 'Failed to retrieve requested retirements.' });
  }
};

import { Request, Response } from 'express';
import Center from '../models/centerModel';

export const createCenter = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body;

    const existingCenter = await Center.findOne({ name });
    if (existingCenter) {
       res.status(400).json({ message: 'Center with this name already exists' });
    }

    const newCenter = new Center({ name, location });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(500).json({ message: 'Error creating center', error });
  }
};

export const getAllCenters = async (req: Request, res: Response) => {
  try {
    const centers = await Center.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving centers', error });
  }
};

export const getCenterById = async (req: Request, res: Response) => {
  try {
    const { centerId } = req.params;
    const center = await Center.findOne({ centerId });

    if (!center) {
       res.status(404).json({ message: 'Center not found' });
    }

    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving center', error });
  }
};

export const updateCenter = async (req: Request, res: Response) => {

  try {
    const { centerId } = req.params;
    const center = await Center.findOneAndUpdate({ centerId },{$set:req.body}, { new: true });
    if (!center) {
      res.status(404).json({ error: 'Center not found' });
    }
    res.status(200).json(center);
    console.log('Center updated successfully');
  } catch (error) {
    res.status(500).json({ error: 'Error updating center' });
    console.error(error);
  }

}

    
    
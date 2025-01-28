import { Request, Response, NextFunction } from 'express';
import DepartmentModel from '../models/departmentModel';

const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const newDepartment = new DepartmentModel(req.body);
    await newDepartment.save();
    res
      .status(201)
      .json({ message: 'Department saved successfully', newDepartment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDepartmentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const department = await DepartmentModel.findById(req.params.id);
    if (!department) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }
    console.log('Fetched Data:', department);
    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const departments = await DepartmentModel.find();
    res.status(200).json(departments);
  } catch (err) {
    next(err);
  }
};

const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await DepartmentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (department) {
      await department.save();
      res
        .status(200)
        .json({ message: 'Department updated successfully', department });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedDepartment = await DepartmentModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedDepartment) {
      res.status(404).json({ error: 'Department not found' });
      return;
    }
    res.status(200).json({
      message: 'Department deleted successfully',
      deletedDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
};

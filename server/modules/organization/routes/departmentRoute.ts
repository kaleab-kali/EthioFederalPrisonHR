import express, { Router } from 'express';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from '../controllers/departmentController';

const router: Router = express.Router();

// Create a Department registration
router.post('/', createDepartment);

// Get all Departments
router.get('/', getAllDepartments);

// Get a specific Department by ID
router.get('/:id', getDepartmentById);

// Update a Department by ID
router.put('/:id', updateDepartment);

// Delete a Department by ID
router.delete('/:id', deleteDepartment);

export default router;

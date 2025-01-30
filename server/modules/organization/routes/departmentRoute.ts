import express, { Router } from 'express';
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from '../controllers/departmentController';

import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router: Router = express.Router();

// Create a Department registration
router.post('/', authenticate, checkHqExclusiveRole, createDepartment);

// Get all Departments
router.get('/', getAllDepartments);

// Get a specific Department by ID
router.get('/:id', getDepartmentById);

// Update a Department by ID
router.put('/:id', authenticate, checkHqExclusiveRole, updateDepartment);

// Delete a Department by ID
router.delete('/:id', authenticate, checkHqExclusiveRole, deleteDepartment);

export default router;

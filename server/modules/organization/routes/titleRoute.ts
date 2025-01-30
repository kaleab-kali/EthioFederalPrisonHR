import express, { Router } from 'express';
import {
  createTitle,
  deleteTitle,
  getAllTitles,
  getTitleById,
  updateTitle,
} from '../controllers/titleController';

import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router: Router = express.Router();

// Create an Title registration
router.post('/', authenticate, checkHqExclusiveRole, createTitle);

// Get all Titles
router.get('/', getAllTitles);

// Get a specific Title by ID
router.get('/:id', getTitleById);

// Update an Title by ID
router.put('/:id', authenticate, checkHqExclusiveRole, updateTitle);

// Delete an Title by ID
router.delete('/:id', authenticate, checkHqExclusiveRole, deleteTitle);

export default router;

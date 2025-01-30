import express from 'express';
import {
  createPosition,
  deletePosition,
  getAllPositions,
  getPositionById,
  updatePosition,
} from '../controllers/positionController';

import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = express.Router();

// Create a new position
router.post('/',  authenticate, checkHqExclusiveRole, createPosition);

// Get all positions
router.get('/', getAllPositions);

// Get a specific position by ID
router.get('/:id', getPositionById);

// Update a position by ID
router.put('/:id',authenticate,  checkHqExclusiveRole, updatePosition);

// Delete a position by ID
router.delete('/:id', authenticate, checkHqExclusiveRole, deletePosition);

export default router;

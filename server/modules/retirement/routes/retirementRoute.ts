import { Router } from 'express';
import {
  createRetirementRequest,
  getRequestedRetirements,
} from '../controllers/retirementController';

const router = Router();

router.get('/', getRequestedRetirements);
router.post('/', createRetirementRequest);

export default router;

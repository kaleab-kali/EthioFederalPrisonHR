import { Router } from 'express';
import {
  createRetirementRequest,
  getRequestedRetirements,
} from '../controllers/retirementController';
import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = Router();

router.get('/',   getRequestedRetirements);
router.post('/',   createRetirementRequest);

export default router;

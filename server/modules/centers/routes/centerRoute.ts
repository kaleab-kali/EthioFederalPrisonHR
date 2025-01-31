import { Router } from 'express';
import {    createCenter, getAllCenters, getCenterById, updateCenter, } from '../controllers/centerController';
import { checkHqExclusiveRole } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';
const router = Router();

router.get('/', getAllCenters);
router.get('/:centerId', getCenterById);
router.post('/', authenticate, checkHqExclusiveRole, createCenter);
router.put('/:centerId', authenticate, checkHqExclusiveRole, updateCenter);


export default router;

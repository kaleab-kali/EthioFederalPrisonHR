import { Router } from 'express';
import {    createCenter, getAllCenters, getCenterById, updateCenter, } from '../controllers/centerController';

const router = Router();

router.get('/', getAllCenters);
router.get('/:centerId', getCenterById);
router.post('/', createCenter);
router.put('/:centerId', updateCenter);


export default router;

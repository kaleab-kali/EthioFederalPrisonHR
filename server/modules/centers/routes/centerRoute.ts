import { Router } from 'express';
import {    createCenter, getAllCenters, getCenterById,updateCenter } from '../controllers/centerController';

const router = Router();

router.get('/', getAllCenters);
router.get('/id', getCenterById);
router.post('/', createCenter);
router.put('/id',updateCenter)


export default router;

import { Router } from 'express';
import {    createCenter, getAllCenters, getCenterById, } from '../controllers/centerController';

const router = Router();

router.get('/', getAllCenters);
router.get('/id', getCenterById);
router.post('/', createCenter);


export default router;

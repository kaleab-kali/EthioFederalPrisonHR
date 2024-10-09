// Employee module API routes
import { Router } from 'express';
const router = Router();
router.get('/', getEmployee);
export default router;
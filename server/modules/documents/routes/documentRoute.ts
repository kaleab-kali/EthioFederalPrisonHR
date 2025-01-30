import { Router } from 'express';
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '../controllers/documentController';
import fileUpload from 'express-fileupload';
import { checkdocumentStaff } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = Router();
router.use(fileUpload());
// COMMENT FOR MESEKIR
//All routes need centerName

router.get('/:centerName', authenticate, checkdocumentStaff, getDocuments);
router.get('/:id/:centerName', authenticate, checkdocumentStaff, getDocument);
router.post('/:centerName', authenticate, checkdocumentStaff, createDocument);
router.put('/:id/:centerName', authenticate, checkdocumentStaff, updateDocument);
router.delete('/:id/:centerName', checkdocumentStaff, deleteDocument);

export default router;

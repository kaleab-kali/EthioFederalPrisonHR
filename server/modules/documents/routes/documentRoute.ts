import { Router } from 'express';
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '../controllers/documentController';
import fileUpload from 'express-fileupload';
import { checkdocumentStaff } from '../../employee/middlewares/checkRoles';
import  {authenticate}   from '../../employee/middlewares/authunticate';

const router = Router();
router.use(fileUpload());
// COMMENT FOR MESEKIR
//All routes need centerName

router.get('/',   getDocuments);
router.get('/:id/',   getDocument);
router.post('/',   createDocument);
router.put('/:id/',   updateDocument);
router.delete('/:id/',  deleteDocument);

export default router;

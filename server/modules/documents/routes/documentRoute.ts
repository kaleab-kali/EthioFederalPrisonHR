import { Router } from 'express';
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '../controllers/documentController';
import fileUpload from 'express-fileupload';


const router = Router();
router.use(fileUpload());

router.get('/', getDocuments);
router.get('/:id', getDocument);
router.post('', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;

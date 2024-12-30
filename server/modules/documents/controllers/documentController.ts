import { Request, Response } from 'express';
import {
  uploadDocumentFile,
  createNewDocument,
  getAllDocuments,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
} from '../services/documentServices';

// Create a new document with file upload
const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !req.files.documentFile) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const documentFile = req.files.documentFile as any;
    const fileLocation = await uploadDocumentFile(documentFile);
    req.body.documentFile = fileLocation;

    const document = await createNewDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating document' });
  }
};

// Get all documents
const getDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const documents = await getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

// Get a single document by ID
const getDocumentByIdHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const document = await getDocumentById(req.params.id);
    if (!document) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching document' });
  }
};

// Update a document by ID
const updateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await updateDocumentById(req.params.id, req.body);
    if (!document) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating document' });
  }
};

// Delete a document by ID
const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await deleteDocumentById(req.params.id);
    if (!document) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting document' });
  }
};

export {
  createDocument,
  getDocuments,
  getDocumentByIdHandler as getDocumentById,
  updateDocument,
  deleteDocument,
};

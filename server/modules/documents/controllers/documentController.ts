import { Request, Response } from 'express';
import {
  createNewDocument,
  getAllDocuments,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
} from '../services/documentServices';
import { handleFileUpload } from '../../../config/handleFileUpload';

// Create a new document with file upload
const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !req.files.documentFile) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Use handleFileUpload
    const uploadedFiles = await handleFileUpload(req.files, 'documents');
    req.body.documentFile = uploadedFiles[0]; // Extract the first file if it's a single upload

    const document = await createNewDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Error creating document' });
  }
};

// Get all documents
const getDocuments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const documents = await getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Error fetching documents' });
  }
};

// Get a document by ID
const getDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const document = await getDocumentById(id);

    if (!document) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    res.status(200).json(document);
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ message: 'Error fetching document' });
  }
};

// Update a document by ID
const updateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedDocument = await updateDocumentById(id, req.body);

    if (!updatedDocument) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ message: 'Error updating document' });
  }
};

// Delete a document by ID
const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedDocument = await deleteDocumentById(id);

    if (!deletedDocument) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Error deleting document' });
  }
};

export {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};

import { Request, Response } from 'express';
import Document from '../models/documentModel';

// Create a new document
 const createDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const document = new Document(req.body);
    await document.save();
     res.status(201).json(document);
  } catch (error) {
     res.status(500).json({ message: 'Error creating document'});
  }
};

// Get all documents
 const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const documents = await Document.find();
     res.status(200).json(documents);
  } catch (error) {
     res.status(500).json({ message: 'Error fetching documents'});
  }
};

// Get a single document by ID
 const getDocumentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
       res.status(404).json({ message: 'Document not found' });
    }
     res.status(200).json(document);
  } catch (error) {
     res.status(500).json({ message: 'Error fetching document'});
  }
};

// Update a document by ID
 const updateDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
       res.status(404).json({ message: 'Document not found' });
    }
     res.status(200).json(document);
  } catch (error) {
     res.status(500).json({ message: 'Error updating document'});
  }
};

// Delete a document by ID
 const deleteDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
       res.status(404).json({ message: 'Document not found' });
    }
     res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
     res.status(500).json({ message: 'Error deleting document'});
  }
};

export {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
}
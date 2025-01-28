import Document from '../models/documentModel';
import { handleFileUpload } from '../../../config/handleFileUpload';

export const createNewDocument = async (data: any): Promise<any> => {
  const document = new Document(data);
  return await document.save();
};

export const getAllDocuments = async (): Promise<any[]> => {
  return await Document.find();
};

export const getDocumentById = async (id: string): Promise<any | null> => {
  return await Document.findById(id);
};

export const updateDocumentById = async (
  id: string,
  data: any,
): Promise<any | null> => {
  return await Document.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDocumentById = async (id: string): Promise<any | null> => {
  return await Document.findByIdAndDelete(id);
};

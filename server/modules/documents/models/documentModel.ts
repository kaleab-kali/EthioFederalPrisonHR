import { Schema, model } from 'mongoose';
import { IDocument } from '../types/documentType';

const documentSchema = new Schema<IDocument>(
  {
    documentType: {
      type: String,
      enum: ['in', 'out'],
    },
    tag: {
      type: String,
      enum: ['personal', 'organizational'],
    },
    documentNumber: {
      type: String,
      // unique: true,
    },
    empId: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    title: {
      type: String,
    },
    documentFile: {
      type: String,
    },
    docReceiverId: {
      type: String,
    },
    docSenderId: {
      type: String,
    },
    content: {
      type: String,
    },
    shelf: {
      type: String,
    },
    date: {
      type: Date,
    },
    topic: {
      type: String,
    },
  },
  { timestamps: true },
);

const DocumentModel = model<IDocument>('Document', documentSchema);

export default DocumentModel;

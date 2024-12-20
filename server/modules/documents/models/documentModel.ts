import { Schema, model } from 'mongoose';
import { IDocument } from '../types/documentType';

const documentSchema = new Schema<IDocument>(
  {
    documentType: {
      type: String,
      enum: ['in', 'out'],
      // required: true,
    },
    tag: {
      type: String,
      enum: ['personal', 'organizational'],
      // required: true,
    },
    documentNumber: {
      type: String,
      // required: true,
      // unique: true,
    },
    empId: {
      type: String,
      // required: true,
    },
    from: {
      type: String,
      // required: true,
    },
    to: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    documentFile: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    shelf: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
    topic: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true },
);

const DocumentModel = model<IDocument>('Document', documentSchema);

export default DocumentModel;

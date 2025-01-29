import { Schema, model } from 'mongoose';
import { RInterface } from '../types/retirementTypes';

const documentSchema = new Schema<RInterface>(
  {
    retirementId: { type: String, required: true },
    center: { type: String, required: true },
    centerId: { type: String, required: true },
    empId: { type: String, required: true },
    status : { type: String,enum: ['pending', 'approved', 'rejected']},
  },
  { timestamps: true },
);

const DocumentModel = model<RInterface>('Retirement', documentSchema);

export default DocumentModel;

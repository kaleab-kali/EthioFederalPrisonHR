export interface IDocument extends Document {
  documentType: 'in' | 'out';
  tag: 'personal' | 'organizational';
  documentNumber: string;
  empId: string;
  from: string;
  to: string;
  shelf: string;
  date: Date;
  title: string;
  topic: string;
  documentFile: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Schema, Document, model } from 'mongoose';
import { IEmployee } from '../types/employeeTypes';

const employeeSchema = new Schema<IEmployee>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
});

// Create and export the employee model
export default model<IEmployee>('Employee', employeeSchema);
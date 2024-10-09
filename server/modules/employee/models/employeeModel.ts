import { Schema, Document, model } from 'mongoose';

interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    age: number;
    position: string;
}

// Define the employee schema
const employeeSchema = new Schema<IEmployee>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
});

// Create and export the employee model
export default model<IEmployee>('Employee', employeeSchema);
// Types for employee module
export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
}
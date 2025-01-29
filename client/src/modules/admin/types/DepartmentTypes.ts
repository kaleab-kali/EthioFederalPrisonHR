// Define the Department type
export type Department = {
  departmentId: string; // Unique identifier for the department
  departmentName: string; // Name of the department
  departmentHead?: string; // Department head (optional)
};
  
  // Define the type for the new department form state
  export type NewDepartment = Omit<Department, "id">; // Exclude 'id' since it's generated
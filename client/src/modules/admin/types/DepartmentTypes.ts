// Define the Department type
export type Department = {
    id: string; // Unique identifier for the department
    name: string; // Name of the department
    head?: string; // Department head (optional)
  };
  
  // Define the type for the new department form state
  export type NewDepartment = Omit<Department, "id">; // Exclude 'id' since it's generated
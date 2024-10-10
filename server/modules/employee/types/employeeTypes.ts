// Types for the employee module
export interface IEmployee {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  title: string;
  empId?: string;
  middleName?: string;
  birthday: Date;
  gender: string;
  department: string;
  photo?: string;
  ethnicity: string;
  centerName?: string;
  phoneNumber: {
    prefix: string;
    number: string;
  };
  email: string;
  currentAddress?: {
    region?: string;
    subcity?: string;
    woreda?: string;
    houseNumber?: string;
    leyuBota?: string;
  };
  salary: string;
  educationLevel?: string;
  education?: Education[];
  birthplaceInfo?: {
    region?: string;
    subcity?: string;
    woreda?: string;
    houseNumber?: string;
    leyuBota?: string;
  };
  motherInformation: {
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber: {
      prefix: string;
      number: string;
    };
  };
  emergencyContact: {
    info: {
      firstName: string;
      middleName?: string;
      lastName: string;
      relationship: string;
      phoneNumber: string;
      email?: string;
    };
    address?: {
      region?: string;
      subcity?: string;
      woreda?: string;
      houseNumber?: string;
      leyuBota?: string;
    };
  };
  maritalStatus: string;
  spouseInfo?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dob?: Date;
    phoneNumber?: string;
    address?: {
      region?: string;
      subcity?: string;
      woreda?: string;
      houseNumber?: string;
      leyuBota?: string;
    };
  };
  divorcedInfo?: {
    divorceDate?: Date;
  };
  userName: string;
  password: string;
  role: Roles;
  retirementDate?: Date;
  status: 'active' | 'inactive';
  skinColor: string;
  noseStructure: string;
  eyeColor: string;
  hairTexture: string;
  height: string;
  religion: string;
  nationality: string;
  employmentDate: Date;
}

// Types for the Education schema
export interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}

// Enum for roles
export enum Roles {
  Employee = 'employee',
  Manager = 'hrManager',
  Staff = 'hrStaff',
  DocumentStaff = 'documentStaff',
  Admin = 'admin',
}

// // Types for the employee module
// export interface IEmployee {
//     firstName: string;
//     lastName: string;
//     age: number;
//     position: string;
//     title: string;
//     empId?: string;
//     middleName?: string;
//     userName?: string;
//     birthday: Date;
//     gender: string;
//     department: string;
//     photo?: string;
//     ethnicity: string;
//     centerName?: string;
//     pendingCenterName?: string;
//     phoneNumber: {
//       prefix: string;
//       number: string;
//     };
//     email: string;
//     currentAddress?: {
//       region?: string;
//       subcity?: string;
//       woreda?: string;
//       houseNumber?: string;
//       leyuBota?: string;
//     };
//     salary: string;
//     educationLevel?: string;
//     education?: Education[];
//     birthplaceInfo?: {
//       region?: string;
//       subcity?: string;
//       woreda?: string;
//       houseNumber?: string;
//       leyuBota?: string;
//     };
//     motherInformation: {
//       firstName: string;
//       middleName?: string;
//       lastName: string;
//       phoneNumber: {
//         prefix: string;
//         number: string;
//       };
//     };
//     emergencyContact: {
//       info: {
//         firstName: string;
//         middleName?: string;
//         lastName: string;
//         relationship: string;
//         phoneNumber: string;
//         email?: string;
//       };
//       address?: {
//         region?: string;
//         subcity?: string;
//         woreda?: string;
//         houseNumber?: string;
//         leyuBota?: string;
//       };
//     };
//     maritalStatus: string;
//     spouseInfo?: {
//       firstName?: string;
//       middleName?: string;
//       lastName?: string;
//       dob?: Date;
//       phoneNumber?: string;
//       address?: {
//         region?: string;
//         subcity?: string;
//         woreda?: string;
//         houseNumber?: string;
//         leyuBota?: string;
//       };
//     };
//     divorcedInfo?: {
//       divorceDate?: Date;
//     };
//     password: string;
//     role: Roles;
//     retirementDate?: Date;
//     status: 'active' | 'inactive';
//     skinColor: string;
//     noseStructure: string;
//     eyeColor: string;
//     hairTexture: string;
//     height: string;
//     religion: string;
//     nationality: string;
//     employmentDate: Date;
//     transferStatus?: string;
//     rejectionReason?: string;
//   }
  
//   // Types for the Education schema
//   export interface Education {
//     id?: string;
//     fieldofstudy?: string;
//     institution: string;
//     graduationYear: number;
//     educationLevel: string;
//   }
  

export interface Appraisal {
  previousTitle: string;
  appraisedTitle: string;
  date: string;
  rating: 'Excellent' | 'Satisfactory' | 'Unsatisfactory' | 'Not Appraised';
  performanceEvaluation?: {
    primary: number; // Out of 70
    secondary: number; // Out of 30
  };
  remarks?: string;
}

export interface DocumentRecord {
  documentType: 'in' | 'out';
  tag?: 'personal' | 'organizational';
  documentNumber?: string;
  empId: string;
  from?: string;
  to?: string;
  shelf: string;
  docReceiverId: string;
  docSenderId: string;
  date: Date;
  title?: string;
  topic?: string;
  documentFile: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;

}

export interface AttendanceRecord {
  date: string;
  totalDays: number;
  presentDays: number;
}

export interface PerformanceRecord {
  date: string;
  result30: number;
  result70: number;
}

export interface LeaveRecord {
  dateFrom: string;
  dateTo: string;
  leaveType: string;
  reason: string;
  delegatedTo: string;
  status: string;
}

export interface Education {
  id?: string;
  fieldofstudy?: string;
  institution: string;
  graduationYear: number;
  educationLevel: string;
}


export interface WorkExperience {
  _id: string; 
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description : string;
}

export interface IEmployee {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
  title: string;
  empId: string;
  middleName?: string;
  userName?: string;
  birthday: Date;
  gender: string;
  department: string;
  photo?: string;
  ethnicity: string;
  centerName?: string;
  pendingCenterName?: string;
  workExperience?: WorkExperience[];
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
  password: string;
  role: string; // Assuming Roles is a type or enum
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
  transferStatus?: string;
  rejectionReason?: string;
  appraisalRecords?: Appraisal[];
  attendanceRecords?: AttendanceRecord[];
  performance?: PerformanceRecord[];
  leaveRecords?: LeaveRecord[];
  documentRecords?: DocumentRecord[];
}

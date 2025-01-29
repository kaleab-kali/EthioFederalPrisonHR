export interface IAppraisalCandidates{
    empID: string;
    empName: string;
    previousTitle: string;
    appraisalTitle: string;
    department: string;
    workYears: number;
    position: string;
}

export interface IAppraisalApproved{
    empID: string;
    empName: string;
    previousTitle: string;
    appraisalTitle: string;
    department: string;
    dateOfPromotion: string;
}

export interface IAppraisalForm {
    empID: string;
    primaryResult: number;
    secondaryResult: number;
    remark: string;
    disciplineResult: number;
}


export interface AppraisalHistory {
  employeeId?: string;
  currentLevel?: string;
  nextLevel?: string;
  scores?: {
    education?: number;
    service?: number;
    attitude?: number;
    behaviour?: number;
    workEfficiency?: number;
    disciplinary?: number;
  };
  totalScore?: number;
  status?: string | undefined;
  promotionDate?: Date | undefined;
}



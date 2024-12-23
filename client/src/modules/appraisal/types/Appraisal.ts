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
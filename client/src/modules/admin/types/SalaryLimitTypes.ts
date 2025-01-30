export type SalaryLimitType = {
    id: string;
    title: string;
    salaryLimit: number;
};
    
export type NewSalaryLimitType = Omit<SalaryLimitType, "id">;
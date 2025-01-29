type EthiopianMonth = {
    month: number;
    days: number[];
  };
  
  export const getEthiopianMonthName = (month: number): string => {
    const months = [
      "Meskerem", "Tikimit", "Hidar", "Tahesas", "Tir", "Yekatit", "Megabit", 
      "Miazia", "Genbot", "Sene", "Hamle", "Nehase", "Pagume"
    ];
    return months[month - 1] || "";
  };
  
  export const generateEthiopianCalendar = (year: number): EthiopianMonth[] => {
    const months: EthiopianMonth[] = [];
    for (let month = 1; month <= 13; month++) {
      const days = month === 13 ? (year % 4 === 3 ? 6 : 5) : 30;
      months.push({ month, days: Array.from({ length: days }, (_, i) => i + 1) });
    }
    return months;
  };
  
  export const getEthiopianYears = (startYear: number, endYear: number): number[] => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  };
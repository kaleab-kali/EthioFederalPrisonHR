export function convertToEthiopianDate(gregorianDate: string | number | Date) {
    // Simple implementation. For a complete implementation, consider using a library or algorithm for Ethiopian dates.
    const ethiopianYearOffset = 8; // Ethiopian year is roughly 8 years behind Gregorian.
    const date = new Date(gregorianDate);
    const ethiopianYear = date.getFullYear() - ethiopianYearOffset;
    return `${ethiopianYear}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  
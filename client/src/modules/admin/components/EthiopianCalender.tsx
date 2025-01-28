import { useState } from "react";
import { getEthiopianMonthName, generateEthiopianCalendar, getEthiopianYears } from "../utils/ethiopianCalender";

const EthiopianCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2015); // Default year
  const [holidays, setHolidays] = useState<Record<string, string>>({}); // { "1-1": "New Year" }
  const [newHolidayDate, setNewHolidayDate] = useState<string>("");
  const [newHolidayName, setNewHolidayName] = useState<string>("");
  const [filterText, setFilterText] = useState<string>(""); // For filtering holidays

  const handleAddHoliday = () => {
    if (newHolidayDate && newHolidayName) {
      setHolidays((prev) => ({ ...prev, [newHolidayDate]: newHolidayName }));
      setNewHolidayDate("");
      setNewHolidayName("");
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const calendarData = generateEthiopianCalendar(selectedYear);

  // Filter holidays based on the filter text
  const filteredHolidays = Object.entries(holidays).filter(([date, name]) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ethiopian Calendar</h1>

      {/* Year Selector */}
      <div className="mb-4">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="border p-2 rounded"
        >
          {getEthiopianYears(2010, 2030).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calendarData.map(({ month, days }) => (
          <div key={month} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{getEthiopianMonthName(month)}</h2>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const dateKey = `${month}-${day}`;
                const isHoliday = holidays[dateKey];
                return (
                  <div
                    key={day}
                    className={`p-2 text-center rounded ${
                      isHoliday ? "bg-yellow-200" : "bg-gray-100"
                    }`}
                  >
                    {day}
                    {isHoliday && <div className="text-xs text-gray-600">{holidays[dateKey]}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Add Holiday Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add Holiday</h3>
        <input
          type="text"
          placeholder="Date (e.g., 1-1)"
          value={newHolidayDate}
          onChange={(e) => setNewHolidayDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Holiday Name"
          value={newHolidayName}
          onChange={(e) => setNewHolidayName(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={handleAddHoliday}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Add
        </button>
      </div>

      {/* Holiday Filter Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Filter Holidays</h3>
        <input
          type="text"
          placeholder="Search holidays..."
          value={filterText}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <div className="mt-2">
          {filteredHolidays.map(([date, name]) => (
            <div key={date} className="text-sm text-gray-600">
              {date}: {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EthiopianCalendar;
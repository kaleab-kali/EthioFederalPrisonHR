import { EthDateTime } from "ethiopian-calendar-date-converter";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

interface FamilyRecord {
  eventType: "Marriage" | "Child" | "Divorce" | "Widowed";
  spouseName?: string;
  spousePhoneNumber?: string;
  spouseEthnicity?: string;
  spouseAddress?: {
    region: string;
    subcity: string;
    woreda: string;
  };
  spouseDateOfBirth?: string;
  childName?: string;
  childDateOfBirth?: string;
  divorceDate?: string;
  widowedDate?: string;
}

interface IEmployee {
  name: string;
  familyRecords: FamilyRecord[];
}

const EmployeeFamily: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
const convertToEthiopianDate = (dateString: string) => {
  const date = new Date(dateString);
  const ethDate = EthDateTime.fromEuropeanDate(date);
  return `${ethDate.year}/${ethDate.month}/${ethDate.date}`;
};
const formatDate = (date: Date | string) => {
  // Ensure that the date is a valid Date object
  const formattedDate = new Date(date);
  return formattedDate instanceof Date && !isNaN(formattedDate.getTime())
    ? formattedDate.toLocaleDateString()
    : "Invalid date";
};
  return (
    <div className="max-w-4xl mx-auto">
      {employee.familyRecords.map((record, index) => (
        <div key={index} className="mb-4 shadow-lg rounded-lg bg-white">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left py-4 px-6 bg-white text-xl font-semibold rounded-t-lg hover:bg-gray-100 focus:outline-none"
          >
            {record.eventType}
          </button>
          {activeIndex === index && (
            <div className="p-6 bg-white rounded-b-lg">
              {record.eventType === "Marriage" && (
                <div>
                  <p>Spouse Name: {record.spouseName}</p>
                  <p>Phone: {record.spousePhoneNumber}</p>
                  <p>Ethnicity: {record.spouseEthnicity}</p>
                  <p>Birth Date: {convertToEthiopianDate(formatDate(record.spouseDateOfBirth ?? ''))}</p>
                  <p>
                    Address: {record.spouseAddress?.region},{" "}
                    {record.spouseAddress?.subcity},{" "}
                    {record.spouseAddress?.woreda}
                  </p>
                </div>
              )}
              {record.eventType === "Child" && (
                <div>
                  <p>Child Name: {record.childName}</p>
                  <p>Date of Birth: {convertToEthiopianDate(formatDate(record.childDateOfBirth ?? ''))}</p>
                </div>
              )}
              {record.eventType === "Divorce" && (
                <div>
                  <p>Divorce Date: {convertToEthiopianDate(formatDate(record.divorceDate ?? ''))}</p>
                </div>
              )}
              {record.eventType === "Widowed" && (
                <div>
                  <p>Widowed Date: {convertToEthiopianDate(formatDate(record.widowedDate ?? ''))}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployeeFamily;

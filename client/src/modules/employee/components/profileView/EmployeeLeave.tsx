import React from "react";
import { useOutletContext } from "react-router-dom";
import { IEmployee } from "../../../../common/Types/Employee";
import { useFetchLeave } from "../../../leave/services/queries";
import { EthDateTime } from "ethiopian-calendar-date-converter";

const EmployeeLeave: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const leaveInfo = useFetchLeave(employee.empId);
  console.log(leaveInfo.data);
const convertToEthiopianDate = (dateString: string) => {
  const date = new Date(dateString);
  const ethDate = EthDateTime.fromEuropeanDate(date);
  return `${ethDate.toDateWithDayString()}`;
};
const formatDate = (date: Date | string) => {
  // Ensure that the date is a valid Date object
  const formattedDate = new Date(date);
  return formattedDate instanceof Date && !isNaN(formattedDate.getTime())
    ? formattedDate.toLocaleDateString()
    : "Invalid date";
};
  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  const getStatusColor = (from: string, to: string) => {
    const today = new Date();
    const startDate = new Date(from);
    const endDate = new Date(to);

    if (today.toDateString() === startDate.toDateString())
      return "bg-green-500";
    if (today < startDate) return "bg-orange-500";
    if (today > endDate) return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {leaveInfo.data && leaveInfo.data.employeeLeaveInfos.length > 0 ? (
        leaveInfo.data?.employeeLeaveInfos.map((leave, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div
              className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg text-white font-semibold ${getStatusColor(
                leave.from,
                leave.to
              )}`}
            >
              {leave.status}
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-6 w-full">
              <div className="text-gray-600">
                <p className="font-normal text-sm">Date From</p>
                <p className="font-semibold text-gray-900">
                  {convertToEthiopianDate(formatDate(leave.from))}
                </p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Date To</p>
                <p className="font-semibold text-gray-900">
                  {convertToEthiopianDate(formatDate(leave.to))}
                </p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Type of Leave</p>
                <p className="font-semibold text-gray-900">{leave.leaveType}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Reason</p>
                <p className="font-semibold text-gray-900">{leave.reason}</p>
              </div>

              <div className="text-gray-600">
                <p className="font-normal text-sm">Delegated To</p>
                <p className="font-semibold text-gray-900">
                  {leave.delegatedTo}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
          No leave history available at the moment.
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;

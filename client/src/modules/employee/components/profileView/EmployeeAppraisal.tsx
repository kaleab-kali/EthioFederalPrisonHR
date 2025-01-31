import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IEmployee } from '../../../../common/Types/Employee';
import { useFetchAppraisalHistory } from '../../../appraisal/services/queries';
import { EthDateTime } from 'ethiopian-calendar-date-converter';

const EmployeeAppraisal: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const appraisals = useFetchAppraisalHistory(employee.empId)
  console.log(appraisals.data)
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
  const toggleDetails = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderRatingBadge = (rating: number) => {
    const baseClass = 'inline-block px-3 py-1 text-sm font-semibold rounded-full';
    if (rating) {
      if (rating >= 90 )
        return <span className={`${baseClass} bg-green-200 text-green-800`}>Excellent</span>;
      else if (rating >= 70 )
        return <span className={`${baseClass} bg-yellow-200 text-yellow-800`}>Satisfactory</span>;
      else if (rating >= 55 )
        return <span className={`${baseClass} bg-red-200 text-red-800`}>Unsatisfactory</span>;
      else if (rating <=54 )
        return <span className={`${baseClass} bg-gray-200 text-gray-800`}>Not Appraised</span>;
      else
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">
              Previous Title
            </th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">
              Appraised Title
            </th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">
              Appraisal Date
            </th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">
              Rating
            </th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {appraisals.data?.map((appraisal, index) => (
            <React.Fragment key={index}>
              <tr
                className="hover:bg-blue-50 cursor-pointer"
                onClick={() => toggleDetails(index)}
              >
                <td className="py-4 px-6 border-b border-gray-200 text-sm">
                  {appraisal.currentLevel}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">
                  {appraisal.nextLevel}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">
                  {convertToEthiopianDate(formatDate(appraisal.updatedAt))}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">
                  {renderRatingBadge(appraisal.totalScore)}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-blue-500">
                  {activeIndex === index ? "Hide Details" : "View Details"}
                </td>
              </tr>

              {activeIndex === index && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-6 border-b border-gray-200 bg-gray-50 text-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {appraisal.totalScore && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h3 className="text-lg font-bold text-gray-700">
                            Performance Evaluation
                          </h3>
                          <div className="mt-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Primary:{" "}
                                {((appraisal.totalScore / 100) * 70).toFixed(2)}{" "}
                                / 70
                              </span>
                              <span className="text-gray-600">
                                Secondary:{" "}
                                {((appraisal.totalScore / 100) * 30).toFixed(2)}{" "}
                                / 30
                              </span>
                            </div>
                            <div className="mt-2">
                              <p className="font-semibold text-gray-700">
                                Total: {appraisal.totalScore.toFixed(2)} / 100
                              </p>
                              {/* Progress bar */}
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{
                                    width: `${appraisal.totalScore}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {appraisal.remarks && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h3 className="text-lg font-bold text-gray-700">
                            Remarks
                          </h3>
                          <p className="mt-4 text-gray-600">
                            {appraisal.remarks}
                          </p>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAppraisal;

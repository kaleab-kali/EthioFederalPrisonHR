import React, { useState } from 'react';

// Define types for appraisals
type Appraisal = {
  previousTitle: string;
  appraisedTitle: string;
  date: string;
  rating: 'Excellent' | 'Satisfactory' | 'Unsatisfactory' | 'Not Appraised';
  performanceEvaluation?: {
    primary: number; // Out of 70
    secondary: number; // Out of 30
  };
  remarks?: string;
  additionalInfo?: string;
};

// Dummy data for employee appraisals
const appraisals: Appraisal[] = [
  {
    previousTitle: 'Lieutenant',
    appraisedTitle: 'Captain',
    date: '2023-06-12',
    rating: 'Excellent',
    performanceEvaluation: {
      primary: 65, // out of 70
      secondary: 28, // out of 30
    },
    remarks: 'Exceptional leadership and initiative in the field.',
  },
  {
    previousTitle: 'Sergeant',
    appraisedTitle: 'Lieutenant',
    date: '2022-12-20',
    rating: 'Satisfactory',
    performanceEvaluation: {
      primary: 50, // out of 70
      secondary: 20, // out of 30
    },
    remarks: 'Consistently meets expectations. Needs improvement in communication.',
  },
  {
    previousTitle: 'Corporal',
    appraisedTitle: 'Sergeant',
    date: '2022-07-05',
    rating: 'Unsatisfactory',
    performanceEvaluation: {
      primary: 40, // out of 70
      secondary: 10, // out of 30
    },
    remarks: 'Underperformed in key operations. Needs additional training.',
  },
  {
    previousTitle: 'Private',
    appraisedTitle: 'Corporal',
    date: '2021-03-10',
    rating: 'Not Appraised',
  },
];

const EmployeeAppraisal: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleDetails = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderRatingBadge = (rating: string) => {
    const baseClass = 'inline-block px-3 py-1 text-sm font-semibold rounded-full';
    switch (rating) {
      case 'Excellent':
        return <span className={`${baseClass} bg-green-200 text-green-800`}>Excellent</span>;
      case 'Satisfactory':
        return <span className={`${baseClass} bg-yellow-200 text-yellow-800`}>Satisfactory</span>;
      case 'Unsatisfactory':
        return <span className={`${baseClass} bg-red-200 text-red-800`}>Unsatisfactory</span>;
      case 'Not Appraised':
        return <span className={`${baseClass} bg-gray-200 text-gray-800`}>Not Appraised</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">Previous Title</th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">Appraised Title</th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">Appraisal Date</th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">Rating</th>
            <th className="py-4 px-6 bg-blue-100 text-left text-sm font-semibold text-gray-600">Details</th>
          </tr>
        </thead>
        <tbody>
          {appraisals.map((appraisal, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-blue-50 cursor-pointer" onClick={() => toggleDetails(index)}>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">{appraisal.previousTitle}</td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">{appraisal.appraisedTitle}</td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">{appraisal.date}</td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm">
                  {renderRatingBadge(appraisal.rating)}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm text-blue-500">
                  {activeIndex === index ? 'Hide Details' : 'View Details'}
                </td>
              </tr>

              {activeIndex === index && (
                <tr>
                  <td colSpan={5} className="py-4 px-6 border-b border-gray-200 bg-gray-50 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {appraisal.performanceEvaluation && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h3 className="text-lg font-bold text-gray-700">Performance Evaluation</h3>
                          <div className="mt-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Primary: {appraisal.performanceEvaluation.primary} / 70</span>
                              <span className="text-gray-600">Secondary: {appraisal.performanceEvaluation.secondary} / 30</span>
                            </div>
                            <div className="mt-2">
                              <p className="font-semibold text-gray-700">
                                Total: {appraisal.performanceEvaluation.primary + appraisal.performanceEvaluation.secondary} / 100
                              </p>
                              {/* Progress bar */}
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{
                                    width: `${(appraisal.performanceEvaluation.primary + appraisal.performanceEvaluation.secondary)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {appraisal.remarks && (
                        <div className="p-4 bg-white rounded-lg shadow">
                          <h3 className="text-lg font-bold text-gray-700">Remarks</h3>
                          <p className="mt-4 text-gray-600">{appraisal.remarks}</p>
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

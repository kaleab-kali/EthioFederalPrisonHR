import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { IEmployee, Education } from "../../../../common/Types/Employee";
import { useUpdateEmployee } from "../../services/mutation";

const EmployeeEducation: React.FC = () => {
  const employee = useOutletContext<IEmployee>();
  console.log("current employee info", employee);

  const [editableCardId, setEditableCardId] = useState<string | null>(null);
  const [newEducation, setNewEducation] = useState<Education | null>(null);
  const updateEmp = useUpdateEmployee();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Education,
    id?: string
  ) => {
    const value = e.target.value;
    if (id) {
      // Editing existing education
      employee.education = employee.education?.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      );
    } else {
      // Adding new education
      setNewEducation((prev) => ({ ...prev, [field]: value } as Education));
    }
  };

  const toggleEdit = (id: string) => {
    setEditableCardId(editableCardId === id ? null : id);
  };

  const handleSave = (id: string) => {
    console.log("Updated Education Data:", employee.education);
    const empId = employee.empId;
    updateEmp.mutate({ id: empId, data: employee });
    setEditableCardId(null);
  };

  const handleAdd = () => {
    if (newEducation) {
      employee.education = [
        ...(employee.education || []),
        { ...newEducation, id: `${Date.now()}` },
      ];
      setNewEducation(null);
    }
  };

  const handleCancelAdd = () => {
    setNewEducation(null);
  };

  const renderField = (
    label: string,
    value: string | number,
    fieldName: keyof Education,
    id?: string
  ) => (
    <div className="col-span-1 mb-4">
      <label className="text-sm text-gray-500">{label}:</label>
      {editableCardId === id || id === undefined ? (
        <input
          type={fieldName === "graduationYear" ? "number" : "text"}
          name={fieldName}
          value={value}
          onChange={(e) => handleInputChange(e, fieldName, id)}
          className="w-full p-1 mt-1 border rounded text-gray-700 font-bold"
        />
      ) : (
        <p className="text-base font-bold mt-1 font-roboto">{value}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {employee.education?.map((education) => (
        <div
          key={education.id}
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
        >
          <div className="grid grid-cols-3 gap-6 flex-grow">
            {renderField(
              "Field of Study",
              education.fieldofstudy || "",
              "fieldofstudy",
              education.id
            )}
            {renderField(
              "Institution",
              education.institution,
              "institution",
              education.id
            )}
            {renderField(
              "Graduation Year",
              education.graduationYear,
              "graduationYear",
              education.id
            )}
            {renderField(
              "Education Level",
              education.educationLevel,
              "educationLevel",
              education.id
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() =>
                editableCardId === education.id
                  ? handleSave(education.id!)
                  : toggleEdit(education.id!)
              }
            >
              {editableCardId === education.id ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      ))}

      {/* Add New Education Form */}
      {newEducation && (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
          <div className="grid grid-cols-3 gap-6 flex-grow">
            {renderField(
              "Field of Study",
              newEducation.fieldofstudy || "",
              "fieldofstudy"
            )}
            {renderField(
              "Institution",
              newEducation.institution || "",
              "institution"
            )}
            {renderField(
              "Graduation Year",
              newEducation.graduationYear || "",
              "graduationYear"
            )}
            {renderField(
              "Education Level",
              newEducation.educationLevel || "",
              "educationLevel"
            )}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleCancelAdd}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Button */}
      <div className="flex justify-end mt-8">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() =>
            setNewEducation({
              institution: "",
              graduationYear: 0,
              educationLevel: "",
              fieldofstudy: "",
            })
          }
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EmployeeEducation;

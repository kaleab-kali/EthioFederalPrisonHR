import React, { useEffect, useState } from "react";
import { useSubmitRetirement } from "../services/mutation";
import { useAllEmployees } from "../../employee/services/queries";

interface ParentInfo {
  name: string;
  birthday: string;
  incomeSource: string;
}

interface FormData {
  retirementIdentifier: string;
  organizationIdentifier: string;
  father: ParentInfo;
  mother: ParentInfo;
}

interface EmployeeData {
  id: string;
  picture: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  birthday: string;
  title: string;
  sex: string;
  pastWorkExperience: string;
  wifeInformation?: string;
  kidsNames?: string[];
}

const RetirmentRequest: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string>("");
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  const retirementForm= useSubmitRetirement()
  const [formData, setFormData] = useState<FormData>({
    retirementIdentifier: "",
    organizationIdentifier: "",
    father: { name: "", birthday: "", incomeSource: "" },
    mother: { name: "", birthday: "", incomeSource: "" },
  });
    const employeesQuery = useAllEmployees();
    console.log("employees" + employeesQuery.data);
     useEffect(() => {
       if (employeesQuery.data) {
         const mappedData = employeesQuery.data.map((employee: any) => ({
           empID: employee.empId,
           title: employee.title,
           firstName: employee.firstName,
           lastName: employee.lastName,
           department: employee.department,
           position: employee.position,
         }));
         setEmployeeData(mappedData);
       }
     }, [employeesQuery.data]);

  const mockEmployeeData: EmployeeData = {
    id: "123",
    picture: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    age: 45,
    birthday: "1979-01-15",
    title: "Software Engineer",
    sex: "Male",
    pastWorkExperience: "10 years at ABC Corp",
    wifeInformation: "Jane Doe",
    kidsNames: ["Alice", "Bob"],
  };

  const handleSearch = () => {
  if (employeeId.trim() !== "") {
    const filteredData = employeesQuery.data?.find(
      (employee: any) => employee.empId.toString() === employeeId.trim()
    );
    setEmployeeData(filteredData || null);
  } else {
    setEmployeeData(null);
  }
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    retirementForm.mutate(formData);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Sidebar Section */}
      <div className="bg-gray-100 p-4 w-full md:w-1/4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Employee</h2>
        <div className="form-group">
          <label className="block font-medium text-gray-700">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px bg-gray-300"></div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header Section */}
        

        {/* Main Body Section */}
        <div className="text-gray-700">
          {employeeData ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* First Row */}
              <div className="relative col-span-1 md:col-span-1 flex items-center">
                <img
                  src={employeeData.picture}
                  alt="Employee"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="col-span-3 grid grid-cols-3 gap-4">
                <div>
                  <strong>First Name:</strong>
                  <p>{employeeData.firstName}</p>
                </div>
                <div>
                  <strong>Middle Name:</strong>
                  <p>{employeeData.middleName}</p>
                </div>
                <div>
                  <strong>Last Name:</strong>
                  <p>{employeeData.lastName}</p>
                </div>
              </div>

              {/* Remaining Fields */}
              <div>
                <strong>Age:</strong>
                <p>{employeeData.age}</p>
              </div>
              <div>
                <strong>Birthday:</strong>
                <p>{employeeData.birthday}</p>
              </div>
              <div>
                <strong>Title:</strong>
                <p>{employeeData.title}</p>
              </div>
              <div>
                <strong>Sex:</strong>
                <p>{employeeData.sex}</p>
              </div>
              <div>
                <strong>Work Experience:</strong>
                <p>{employeeData.pastWorkExperience}</p>
              </div>
              {employeeData.wifeInformation && (
                <div>
                  <strong>Wife:</strong>
                  <p>{employeeData.wifeInformation}</p>
                </div>
              )}
              {employeeData.kidsNames && (
                <div>
                  <strong>Kids:</strong>
                  <p>{employeeData.kidsNames.join(", ")}</p>
                </div>
              )}
            </div>
          ) : (
            <p>No employee data available. Please search for a valid employee ID.</p>
          )}
        </div>
        <hr className="mt-6 border-gray-300" />
        <header className="mb-6 relative">
          <h1 className="text-xl font-bold text-gray-800">Employee Retirement Form</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Retirement Time Request <span className="text-red-500">*</span>
              </label>
              <input
                name="retirementIdentifier"
                value={formData.retirementIdentifier}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Organization Identifier <span className="text-red-500">*</span>
              </label>
              <input
                name="organizationIdentifier"
                value={formData.organizationIdentifier}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Father's Information */}
          <h2 className="text-lg font-semibold text-gray-800 mt-6">Father's Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.father.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    father: { ...prev.father, name: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Birthday <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.father.birthday}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    father: { ...prev.father, birthday: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.father.incomeSource}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    father: { ...prev.father, incomeSource: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Mother's Information */}
          <h2 className="text-lg font-semibold text-gray-800 mt-6">Mother's Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.mother.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mother: { ...prev.mother, name: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Birthday <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.mother.birthday}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mother: { ...prev.mother, birthday: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium text-gray-700">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.mother.incomeSource}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    mother: { ...prev.mother, incomeSource: e.target.value },
                  }))
                }
                className="mt-1 block w-full px-3 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            
          </div>

          <button
            onClick={handleSubmit}
            className="flex align-bottom px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
          
        </header>
      </div>
    </div>
  );
};



export default RetirmentRequest
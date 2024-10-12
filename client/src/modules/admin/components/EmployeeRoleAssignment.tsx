import React, { useState } from "react";

// Employee type definition
interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  profileUrl: string;
}

// Example employee data
const employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    profileUrl: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    profileUrl: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Designer",
    profileUrl: "https://via.placeholder.com/40",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    role: "HR",
    profileUrl: "https://via.placeholder.com/40",
  },
  // Add more employees for testing pagination...
];

// List of available roles
const roles = ["All", "Developer", "Manager", "Designer", "Admin", "HR"];

const EmployeeRoleAssignment: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [newRole, setNewRole] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const employeesPerPage = 5;

  // Filter employees by search term and role
  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((employee) =>
      roleFilter === "All" ? true : employee.role === roleFilter
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setNewRole(employee.role); // Set the current role as default
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedEmployee) {
      alert(
        `Role of employee ${selectedEmployee.name} has been changed to ${newRole}`
      );
      // API call to update employee role can be made here
      setSelectedEmployee(null);
      setNewRole("");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Employee Role Assignment
        </h1>

        {/* Search Filter */}
        <div className="flex justify-between mb-6">
          <input
            type="text"
            placeholder="Search employees by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="ml-4 p-3 w-48 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-2 px-4">Profile</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Current Role</th>
                <th className="py-2 px-4">Assign New Role</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <td className="py-3 px-4 text-center">
                    <img
                      src={employee.profileUrl}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4">{employee.name}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">{employee.role}</td>
                  <td className="py-3 px-4">
                    {selectedEmployee?.id === employee.id && (
                      <select
                        value={newRole}
                        onChange={handleRoleChange}
                        className="p-2 border border-gray-300 rounded-lg"
                      >
                        {roles
                          .filter((role) => role !== "All")
                          .map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div>
            Showing{" "}
            {Math.min(
              (currentPage - 1) * employeesPerPage + 1,
              filteredEmployees.length
            )}{" "}
            to{" "}
            {Math.min(currentPage * employeesPerPage, filteredEmployees.length)}{" "}
            of {filteredEmployees.length} employees
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        {selectedEmployee && (
          <div className="mt-8 text-right">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-blue-600"
            >
              Assign Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeRoleAssignment;

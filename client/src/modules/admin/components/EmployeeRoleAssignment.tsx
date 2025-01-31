import React, { useState } from "react";
import { useAllEmployees } from "../../employee/services/queries";
import { useSubmitChangeRole } from "../services/mutation";

const roles = [
  "hrStaff",
  "documentStaff",
  "hrManager",
  "hq-admin",
  "admin",
  "employee",
];

interface Employee {
  id: number;
  empId: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
}

// const employeesData: Employee[] = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     title: "Software Engineer",
//     role: "employee",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     title: "HR Manager",
//     role: "hrManager",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     title: "Admin",
//     role: "admin",
//   },
// ];

const EmployeeTable: React.FC = () => {
  const {data:employeesData} = useAllEmployees()
  const [employees, setEmployees] = useState(employeesData);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const changeRole= useSubmitChangeRole()
  const filteredEmployees = employees?.filter(
    (employee) =>
      (employee.firstName + " " + employee.lastName)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (selectedRole ? employee.role === selectedRole : true)
  );

  const openModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const updateRole = (role: string) => {
    if (selectedEmployee) {
      changeRole.mutate({ employeeId: selectedEmployee.empId, newRole: role });
      // setEmployees(
      //   employees.map((emp) =>
      //     emp.id === selectedEmployee.id ? { ...emp, role } : emp
      //   )
      // );
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2"
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles?.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees?.map((employee) => (
            <tr key={employee.id} className="border">
              <td className="border p-2">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="border p-2">{employee.title}</td>
              <td className="border p-2">{employee.role}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2"
                  onClick={() => openModal(employee)}
                >
                  Edit Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Employee Role</h2>
            <p className="mb-2">
              Updating role for:{" "}
              <strong>
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </strong>
            </p>
            <select
              className="border p-2 w-full mb-4"
              onChange={(e) => updateRole(e.target.value)}
              defaultValue={selectedEmployee.role}
            >
              {roles?.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button
              className="bg-red-500 text-white px-4 py-2 mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2"
              onClick={() => updateRole(selectedEmployee.role)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;

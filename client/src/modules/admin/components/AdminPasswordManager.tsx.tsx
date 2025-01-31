import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useAllEmployees } from "../../employee/services/queries";
import { useSubmitAddPassword, useSubmitChangePassword } from "../services/mutation"; // Import separate mutation hooks

interface Employee {
  id: number;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  userName: string;
  title: string;
  hasPassword: boolean;
}

const AdminPasswordManager: React.FC = () => {
  const { t } = useTranslation("adminPassChange");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: employeesData } = useAllEmployees();

  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employeesData);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Separate mutation hooks for adding and updating passwords
  const addPassword = useSubmitAddPassword();
  const updatePassword = useSubmitChangePassword();

  useEffect(() => {
    setFilteredEmployees(
      employeesData?.filter(
        (employee) =>
          (employee.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedDepartment
            ? employee.department === selectedDepartment
            : true) &&
          (selectedTitle ? employee.title === selectedTitle : true)
      )
    );
  }, [searchTerm, selectedDepartment, selectedTitle]);

  const totalPages = Math.ceil(filteredEmployees?.length / itemsPerPage);
  const currentEmployees = filteredEmployees?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEmployeeSelection = (employee: Employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((e) => e.id !== employee.id)
        : [...prev, employee]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees?.length === currentEmployees?.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(currentEmployees);
    }
  };

  const handleSubmitPassword = () => {
    if (newPassword !== confirmPassword) {
      alert(t("passwordMismatch"));
      return;
    }

    // Determine if it's an add or update action
    const isUpdate = selectedEmployees.some((emp) => emp.hasPassword);

    // Call the appropriate API based on the action
    if (isUpdate) {
      // Update password API
      selectedEmployees.forEach((employee) => {
        updatePassword.mutate({
          userName: employee.userName,
          newPassword: newPassword,
        });
      });
    } else {
      // Add password API
      selectedEmployees.forEach((employee) => {
        addPassword.mutate({
          employeeId: employee.empId,
          userName: employee.userName,
          newPassword: newPassword,
        });
      });
    }

    setIsModalOpen(false);
    setSelectedEmployees([]);
    setNewPassword("");
    setConfirmPassword("");
    setUserName("");
  };

  const handleOpenModal = () => {
    // Pre-fill userName if updating, otherwise leave it blank
    if (selectedEmployees.some((emp) => emp.hasPassword)) {
      setUserName(selectedEmployees[0].userName); // Assuming only one employee is selected for update
    } else {
      setUserName("");
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">{t("title")}</h1>

        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">{t("departmentLabel")}</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">{t("titleLabel")}</option>
            <option value="Senior Manager">Senior Manager</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Graphic Designer">Graphic Designer</option>
          </select>
        </div>

        <table className="min-w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedEmployees?.length === currentEmployees?.length
                  }
                />
              </th>
              <th className="text-left py-3 px-4">{t("name")}</th>
              <th className="text-left py-3 px-4">{t("email")}</th>
              <th className="text-left py-3 px-4">{t("role")}</th>
              <th className="text-left py-3 px-4">{t("department")}</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees?.map((employee) => (
              <tr key={employee.id} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee)}
                    onChange={() => handleEmployeeSelection(employee)}
                  />
                </td>
                <td className="py-3 px-4">
                  {employee.firstName + " " + employee.lastName}
                </td>
                <td className="py-3 px-4">{employee.email}</td>
                <td className="py-3 px-4">{employee.role}</td>
                <td className="py-3 px-4">{employee.department}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            {t("previous")}
          </button>
          <span>
            {t("page")} {currentPage} {t("of")} {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            {t("next")}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            disabled={selectedEmployees?.length === 0}
          >
            {selectedEmployees.some((emp) => emp.hasPassword)
              ? t("updatePassword")
              : t("addPassword")}
          </button>
        </div>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <Dialog.Title className="text-xl font-bold mb-4">
                {selectedEmployees.some((emp) => emp.hasPassword)
                  ? t("updatePassword")
                  : t("addPassword")}
              </Dialog.Title>
              <div className="mb-4">
                <label className="block mb-1">{t("userName")}</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  disabled={selectedEmployees.some((emp) => emp.hasPassword)} // Disable if updating
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">{t("newPassword")}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">{t("confirmPassword")}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitPassword}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {t("confirm")}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPasswordManager;

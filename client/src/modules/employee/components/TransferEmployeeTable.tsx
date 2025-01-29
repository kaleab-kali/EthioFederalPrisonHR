import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAllEmployees } from "../services/queries";
import { useAllCenters } from "../../admin/services/queries";
import { useSubmitTransferRequest } from "../services/mutation";

interface Employee {
  id: number;
  avatar: string;
  fullName: string;
  position: string;
  department: string;
  branch: string;
}

const TransferEmployeeTable: React.FC = () => {
  const { t } = useTranslation("transfer");
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const employeesQuery = useAllEmployees();
    console.log("employees" + employeesQuery.data);
     useEffect(() => {
       if (employeesQuery.data) {
         const mappedData = employeesQuery.data.map((employee: any) => ({
           id: employee.empId,
           title: employee.title,
           fullName: employee.firstName + ' ' + employee.lastName,
           department: employee.department,
           position: employee.position,
           branch: employee.branch
         }));
         setEmployees(mappedData);
       }
     }, [employeesQuery.data]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const fetchCenters = useAllCenters()
  const [newBranch, setNewBranch] = useState("");
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTransferModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  const createTransfer=useSubmitTransferRequest();
  const handleTransferConfirm = () => {
    if (selectedEmployee && newBranch) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id ? { ...emp, branch: newBranch } : emp
        )
      );
      const data = {
        employeeId: selectedEmployee.id,
        centerName: newBranch,
        reason: reason,
      };
      createTransfer.mutate(data);
      setIsConfirmOpen(false);
      setIsModalOpen(false);
      setSelectedEmployee(null);
      setNewBranch("");
      setReason("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder={t("search")}
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded-md w-full"
      />

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-6">{t("employee.avatar")}</th>
            <th className="py-3 px-6">{t("employee.name")}</th>
            <th className="py-3 px-6">{t("employee.position")}</th>
            <th className="py-3 px-6">{t("employee.department")}</th>
            <th className="py-3 px-6">{t("employee.branch")}</th>
            <th className="py-3 px-6">{t("employee.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="py-3 px-6">
                <img
                  src={employee.avatar}
                  alt={employee.fullName}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="py-3 px-6">{employee.fullName}</td>
              <td className="py-3 px-6">{employee.position}</td>
              <td className="py-3 px-6">{employee.department}</td>
              <td className="py-3 px-6">{employee.branch}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => openTransferModal(employee)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  {t("employee.transfer")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transfer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {t("employee.transfer")} {selectedEmployee?.fullName}
            </h2>
            <label className="block mb-2">{t("employee.branch")}</label>
            <select
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">{t("employee.selectBranch")}</option>
              {fetchCenters.data.map(fetchCenter => (
                <option value={fetchCenter.name}>{fetchCenter.name}</option>)
              )}
              {/* Add more branches */}
            </select>
            <label className="block mb-2">{t("employee.reason")}</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder={t("employee.enterReason")}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                {t("employee.cancel")}
              </button>
              <button
                onClick={() => setIsConfirmOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                {t("employee.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              {t("employee.confirmTransfer")}
            </h3>
            <p className="mb-4">{t("employee.confirmationMessage")}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                {t("employee.cancel")}
              </button>
              <button
                onClick={handleTransferConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                {t("employee.yes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferEmployeeTable;

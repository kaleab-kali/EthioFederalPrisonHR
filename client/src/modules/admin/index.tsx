import {AdminComponent} from "./components/AdminComponent";
import { Routes, Route } from "react-router-dom";
import AdminPasswordManager from "./components/AdminPasswordManager.tsx";
import EmployeeRoleAssignment from "./components/EmployeeRoleAssignment";
import SignIn from "../../common/components/SignIn";
import DepartmentTable from "./features/Department/DepartmentTable";
import CenterTable from "./features/Center/CenterTable";
import PositionTable from "./features/Position/PositionTable";
import LeaveTypeTable from "./features/LeaveType/LeaveTypeTable";
import TitleTable from "./features/Title/TitleTable";
import EthiopianCalendar from "./components/EthiopianCalender";
import SalaryLimitTable from "./features/SalaryLimit/SalaryLimitTable";

const Admin = () => {
  return (
    <Routes>
      <Route path="/password" element={<AdminPasswordManager />} />
      <Route path="/role" element={<EmployeeRoleAssignment />} />
      <Route path="/departments" element={<DepartmentTable />} />
      <Route path="/centers" element={<CenterTable />} />
      <Route path="/positions" element={<PositionTable />} />
      <Route path="/leaveTypes" element={<LeaveTypeTable />} />
      <Route path="/titles" element={<TitleTable/>} />
      <Route path="/calender" element={<EthiopianCalendar/>} />
      <Route path="/salaryLimit" element={<SalaryLimitTable/>} />

      {/* <SignIn/> */}
      {/* <AdminComponent /> */}
    </Routes>
  );
};

export default Admin;

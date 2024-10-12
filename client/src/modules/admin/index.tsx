import {AdminComponent} from "./components/AdminComponent";
import { Routes, Route } from "react-router-dom";
import AdminPasswordManager from "./components/AdminPasswordManager.tsx";
import EmployeeRoleAssignment from "./components/EmployeeRoleAssignment";
import SignIn from "./components/SignIn";

const Admin = () => {
  return (
    <Routes>
      <Route path="/password" element={<AdminPasswordManager />} />
      <Route path="/role" element={<EmployeeRoleAssignment />} />
      {/* <SignIn/> */}
      {/* <AdminComponent /> */}

    </Routes>
  );
};

export default Admin;

import {AdminComponent} from "./components/AdminComponent";
import AdminPasswordManager from "./components/AdminPasswordManager.tsx";
import EmployeeRoleAssignment from "./components/EmployeeRoleAssignment";
import SignIn from "./components/SignIn";

const Admin = () => {
  return (
    <div>
      <AdminPasswordManager />
      {/* <SignIn/> */}
      <EmployeeRoleAssignment/>
      {/* <AdminComponent /> */}
    </div>
  );
};

export default Admin;

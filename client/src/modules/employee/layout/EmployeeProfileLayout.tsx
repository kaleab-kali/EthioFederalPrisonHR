import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProfileMenu from "../components/profileView/ProfileMenu";
import ProfileCard from "../components/profileView/ProfileCard";
import Breadcrumb from "../components/BreadCrumb";
import { IEmployee } from "../../../common/Types/Employee";
import { useFetchEmployee } from "../services/queries";

interface ProfileCardEmployeeInfo {
  picture: string;
  name: string;
  id: string;
  title: string;
  active: string;
  manager: string;
}


const extractProfileCardInfo = (
  employee: IEmployee
): ProfileCardEmployeeInfo => ({
  picture: "https://via.placeholder.com/150",
  name: `${employee.firstName} ${employee.lastName}`,
  id: employee.empId ?? "",
  title: employee.title,
  active: employee.status === "active" ? "Active" : "Inactive",
  manager: employee.emergencyContact?.info?.firstName ?? "",
});

const EmployeeProfileLayout: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employeeData, setEmployeeData] = useState<IEmployee | null>(null);
  const [profileCardData, setProfileCardData] =
    useState<ProfileCardEmployeeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const employeeQuery = useFetchEmployee(employeeId || "");
  useEffect(() => {
    if (employeeId) {
      const fetchEmployeeData = async () => {
        setLoading(true);

        // Fetch data using the custom hook
        const fetchedEmployee = employeeQuery.data;
        console.log(fetchedEmployee?.employee);

        if (fetchedEmployee) {
          setEmployeeData(fetchedEmployee.employee);
          setProfileCardData(extractProfileCardInfo(fetchedEmployee.employee)); // Assuming `extractProfileCardInfo` processes the employee data
        }

        setLoading(false);
      };

      fetchEmployeeData();
    }
  }, [employeeId, employeeQuery.data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employeeData) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="p-6 bg-transparent h-full w-full">
      <Breadcrumb />
      <h1 className="text-2xl font-semibold mb-4">Employee Profile</h1>
      <ProfileMenu />
      <div className="flex mt-6">
        {profileCardData && <ProfileCard employee={profileCardData} />}
        <div className="flex-1 ml-6 bg-gray-50 p-0 rounded-md shadow-sm overflow-y-auto">
          <Outlet context={employeeData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileLayout;

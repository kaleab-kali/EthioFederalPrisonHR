import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserTie,
  FaChevronDown,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaChartLine,
  FaMoneyBill,
  FaUserClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdOutlineAppRegistration, MdAccountBalance } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useAuth } from "./context/AuthContex";

// structure and permissions for each item
const menuItems = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    route: "/home/dashboard",
    submenus: [],
    allowedRoles: ["admin", "hq-admin", "hrManager"],
  },
  {
    name: "Organization",
    icon: FaBuilding,
    submenus: [
      {
        name: "Departments",
        icon: FaBuilding,
        route: "/organization/departments",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Center",
        icon: FaBuilding,
        route: "/organization/centers",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Position",
        icon: FaBuilding,
        route: "/organization/positions",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "leave Types",
        icon: FaBuilding,
        route: "/organization/leaveTypes",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Title",
        icon: FaBuilding,
        route: "/organization/titles",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Salary Limit",
        icon: FaUsers,
        route: "/organization/salaryLimit",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Role",
        icon: FaBuilding,
        route: "/organization/role",
        allowedRoles: ["hq-admin"],
      },
      {
        name: "Password",
        icon: FaBuilding,
        route: "/organization/password",
        allowedRoles: ["hq-admin", "admin"],
      },
      {
        name: "Calender",
        icon: FaBuilding,
        route: "/organization/calender",
        allowedRoles: ["hq-admin"],
      },
    ],
    allowedRoles: ["hq-admin", "hrManager","admin"],
  },
  {
    name: "Employees",
    icon: FaUserTie,
    submenus: [
      {
        name: "List",
        icon: FaUserTie,
        route: "/employee/list",
        allowedRoles: ["hq-admin", "hrManager","hrStaff"],
      },
      {
        name: "Registration",
        icon: MdOutlineAppRegistration,
        route: "/employee/registration",
        allowedRoles: ["hq-admin", "hrManager","hrstaff"],
      },
      {
        name: "Transfer",
        icon: MdOutlineAppRegistration,
        route: "/employee/transfer",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Photo Capture",
        icon: MdOutlineAppRegistration,
        route: "/employee/picture",
        allowedRoles: ["hq-admin", "hrManager", "hrStaff"],
      },
      {
        name: "Work Experience",
        icon: MdOutlineAppRegistration,
        route: "/employee/workExperience",
        allowedRoles: ["hq-admin", "hrManager", "hrStaff"],
      },
      {
        name: "Document Tracking",
        icon: MdOutlineAppRegistration,
        route: "/employee/document",
        allowedRoles: ["hq-admin", "hrManager", "documentStaff"],
      },
      {
        name: "Martial Status",
        icon: MdOutlineAppRegistration,
        route: "/employee/martialStatus",
        allowedRoles: ["hq-admin", "hrManager", "hrStaff"],
      },
      {
        name: "Health Record",
        icon: MdOutlineAppRegistration,
        route: "/employee/healthRecord",
        allowedRoles: ["hq-admin", "hrManager", "hrStaff"],
      },
      {
        name: "Material Record",
        icon: MdOutlineAppRegistration,
        route: "/employee/materialRecord",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Leave Permit",
        icon: MdOutlineAppRegistration,
        route: "/employee/leavePass",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Performance",
        icon: MdOutlineAppRegistration,
        route: "/employee/performanceEvaluation",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Accept Transfer",
        icon: MdOutlineAppRegistration,
        route: "/employee/acceptTransfer",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Complaint",
        icon: MdOutlineAppRegistration,
        route: "/employee/complaint",
        allowedRoles: ["hq-admin", "hrManager"],
      },
    ],
    allowedRoles: ["hq-admin", "hrManager", "documentStaff", "hrStaff"],
  },
  {
    name: "Leaves",
    icon: FaCalendarAlt,
    submenus: [
      {
        name: "Request Leave",
        icon: FaCalendarAlt,
        route: "/leave/request",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
      {
        name: "Leave Balance",
        icon: MdAccountBalance,
        route: "/leave/balance",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
    ],
    allowedRoles: ["hq-admin", "hrStaff"],
  },
  {
    name: "Attendance",
    icon: FaUserClock,
    submenus: [
      {
        name: "Daily",
        icon: FaClipboardList,
        route: "/attendance/daily",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
      {
        name: "Weekly",
        icon: FaClipboardList,
        route: "/attendance/weekly",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
      {
        name: "Missing",
        icon: FaExclamationTriangle,
        route: "/attendance/missing",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
    ],
    allowedRoles: ["hq-admin", "hrStaff","employee", "hrManager"],
  },
  {
    name: "Appraisal",
    icon: FaChartLine,
    submenus: [
      {
        name: "Candidates",
        icon: FaUsers,
        route: "/appraisal/candidates",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Form",
        icon: FaClipboardList,
        route: "/appraisal/form",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Approved List",
        icon: FaClipboardList,
        route: "/appraisal/approved",
        allowedRoles: ["hq-admin", "hrManager"],
      },
    ],
    allowedRoles: ["hq-admin", "hrManager"],
  },
  // Reward
  {
    name: "Reward",
    icon: FaMoneyBill,
    submenus: [
      {
        name: "Salary Raise",
        icon: FaMoneyBill,
        route: "/reward/salaryRaise",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Service Reward",
        icon: FaMoneyBill,
        route: "/reward/serviceReward",
        allowedRoles: ["hq-admin", "hrManager"],
      },
    ],
    allowedRoles: ["hq-admin", "hrManager"],
  },
  // Retirement
  {
    name: "Retirement",
    icon: FaUserClock,
    submenus: [
      {
        name: "Request Number",
        icon: FaClipboardList,
        route: "/retirement/requestNumber",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
      {
        name: "Form",
        icon: FaClipboardList,
        route: "/retirement/form",
        allowedRoles: ["hq-admin", "hrStaff"],
      },
    ],
    allowedRoles: ["hq-admin", "hrStaff"],
  },
  // Complaint
  {
    name: "Complaint",
    icon: FaExclamationTriangle,
    submenus: [
      {
        name: "Application",
        icon: FaExclamationTriangle,
        route: "/complaint/registration",
        allowedRoles: ["hq-admin", "hrManager"],
      },
      {
        name: "Received Candidates",
        icon: FaUsers,
        route: "/complaint/list",
        allowedRoles: ["hq-admin", "hrManager"],
      },
    ],
    allowedRoles: ["hq-admin", "hrManager"],
  },
  {
    name: "Documents",
    icon: FaExclamationTriangle,
    submenus: [
      {
        name: "Incoming",
        icon: FaExclamationTriangle,
        route: "/centerDocument/incoming",
        allowedRoles: ["hq-admin", "documentStaff"],
      },
      {
        name: "Outgoing",
        icon: FaUsers,
        route: "/centerDocument/outgoing",
        allowedRoles: ["hq-admin", "documentStaff"],
      },
    ],
    allowedRoles: ["hq-admin", "documentStaff"],
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  userRole: string; 
}

const canAccess = (allowedRoles: string[], userRole: string): boolean => {
  return allowedRoles.includes(userRole);
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, userRole }) => {
  const { t } = useTranslation("sider");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Toggle the submenu if the menu has submenus
  const handleMenuClick = (menu: string, hasSubmenus: boolean) => {
    console.log("Menu clicked:", menu);
    if (hasSubmenus) {
      
      setOpenMenu(openMenu === menu ? null : menu);
    } else {
      
      setOpenMenu(null);
    }
  };
const { user, logout } = useAuth();
const handleLogout = () => {
  logout();
  console.log("Logging out...");
};
  const handleBlur = (event: React.FocusEvent) => {
    const currentTarget = event.currentTarget;

   
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setOpenMenu(null);
      }
    }, 0);
  };

  return (
    <div
      tabIndex={0}
      onBlur={isCollapsed ? handleBlur : undefined}
      className={`bg-white shadow-lg transition-all duration-300 pb-8 ${
        isCollapsed ? "w-20" : "w-56 overflow-y-auto"
      } h-full relative z-1`}
      // style={{ overflowY: "auto" }}
    >
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {menuItems
            .filter((menu) => canAccess(menu.allowedRoles, userRole))
            .map((menu) => (
              <li key={menu.name} className="relative">
                {menu.submenus.length > 0 ? (
                  <div
                    onClick={() =>
                      handleMenuClick(menu.name, menu.submenus.length > 0)
                    }
                    className="flex items-center justify-between p-3 text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <menu.icon className="text-blue-500" />
                      {!isCollapsed && (
                        <span className="font-semibold text-sm ">
                          {t(menu.name)}
                        </span>
                      )}
                    </div>
                    {/* Conditionally render the dropdown arrow only if there are submenus */}
                    {!isCollapsed && menu.submenus.length > 0 && (
                      <FaChevronDown
                        className={`transition-transform text-xs ${
                          openMenu === menu.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                ) : (
                  // If there are no submenus, use NavLink for navigation
                  <NavLink
                    to={menu.route ?? "#"} // Set the route for the Dashboard link
                    onClick={() => setOpenMenu(null)}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-3 text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer ${
                        isActive ? "bg-blue-100" : ""
                      }`
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <menu.icon className="text-blue-500" />
                      {!isCollapsed && (
                        <span className="font-semibold text-sm ">
                          {t(menu.name)}
                        </span>
                      )}
                    </div>
                  </NavLink>
                )}

                {openMenu === menu.name && menu.submenus.length > 0 && (
                  <ul
                    className={`ml-8 mt-2 space-y-1 ${
                      isCollapsed
                        ? "absolute top-0 left-full transform -translate-x-2 bg-white shadow-lg rounded-md p-2"
                        : ""
                    }`}
                    style={{ top: 0, left: isCollapsed ? "100%" : "auto" }}
                  >
                    {menu.submenus
                      .filter((submenu) =>
                        canAccess(submenu.allowedRoles, userRole)
                      )
                      .map((submenu) => (
                        <li key={submenu.name}>
                          <NavLink
                            to={submenu.route}
                            // onClick={() => setOpenMenu(null)}
                            className={({ isActive }) =>
                              `block p-2 text-sm text-gray-600 hover:bg-blue-50 rounded ${
                                isActive ? "bg-blue-100" : ""
                              }`
                            }
                          >
                            <div className="flex items-center space-x-2">
                              <submenu.icon className="text-blue-500" />
                              <span>{t(submenu.name)}</span>
                            </div>
                          </NavLink>
                        </li>
                      ))}
                    <button onClick={handleLogout}>logout</button>
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

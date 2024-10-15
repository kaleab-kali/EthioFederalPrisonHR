import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserCheck,
  FaChevronDown,
} from "react-icons/fa";

// structure and permissions for each item
const menuItems = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    route: "/home/dashboard",
    submenus: [],
    allowedRoles: ["admin", "user", "manager"], // Example roles that can access
  },
  {
    name: "Organization",
    icon: FaBuilding,
    submenus: [
      {
        name: "Departments",
        icon: FaBuilding,
        route: "/organization/departments",
        allowedRoles: ["admin", "manager"],
      },
      {
        name: "Teams",
        icon: FaBuilding,
        route: "/organization/teams",
        allowedRoles: ["admin", "manager"],
      },
    ],
    allowedRoles: ["admin", "manager"], // Only admins and managers can access "Organization"
  },
  {
    name: "Employees",
    icon: FaUserCheck,
    submenus: [
      {
        name: "List",
        icon: FaUserCheck,
        route: "/employee/list",
        allowedRoles: ["admin", "manager"],
      },
      {
        name: "Registration",
        icon: FaUserCheck,
        route: "/employee/registration",
        allowedRoles: ["admin", "manager"],
      },
    ],
    allowedRoles: ["admin", "manager"], // Only admins and managers can access
  },
  {
    name: "Leaves",
    icon: FaUserCheck,
    submenus: [
      {
        name: "Request Leave",
        icon: FaUserCheck,
        route: "/leave/request",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "Leave Balance",
        icon: FaUserCheck,
        route: "/leave/balance",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
  {
    name: "attendance",
    icon: FaUserCheck,
    submenus: [
      {
        name: "daily",
        icon: FaUserCheck,
        route: "/attendance/daily",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "weekly",
        icon: FaUserCheck,
        route: "/attendance/weekly",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "missing",
        icon: FaUserCheck,
        route: "/attendance/missing",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
  {
    name: "Appraisal",
    icon: FaUserCheck,
    submenus: [
      {
        name: "candidates",
        icon: FaUserCheck,
        route: "/appraisal/candidates",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "form",
        icon: FaUserCheck,
        route: "/appraisal/form",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "approved list",
        icon: FaUserCheck,
        route: "/appraisal/approved",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
  {
    name: "Salary Raise",
    icon: FaUserCheck,
    submenus: [
      {
        name: "list",
        icon: FaUserCheck,
        route: "/salaryRaise/list",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
  {
    name: "Retirement",
    icon: FaUserCheck,
    submenus: [
      {
        name: "Request Number",
        icon: FaUserCheck,
        route: "/retirement/requestNumber",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "Form",
        icon: FaUserCheck,
        route: "/retirement/form",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
  {
    name: "Complaint",
    icon: FaUserCheck,
    submenus: [
      {
        name: "application",
        icon: FaUserCheck,
        route: "/complaint/apply",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "received candidates",
        icon: FaUserCheck,
        route: "/complaint/list",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  }

];

interface SidebarProps {
  isCollapsed: boolean;
  userRole: string; 
}

// Utility function to check if the user's role is allowed to see a menu item
const canAccess = (allowedRoles: string[], userRole: string): boolean => {
  return allowedRoles.includes(userRole);
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, userRole }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

 
  const handleMenuClick = (menu: string, hasSubmenus: boolean) => {
    console.log("Menu clicked:", menu);
    if (hasSubmenus) {
      
      setOpenMenu(openMenu === menu ? null : menu);
    } else {
      
      setOpenMenu(null);
    }
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
      onBlur={isCollapsed? handleBlur: undefined} 
      className={`bg-white shadow-lg transition-all duration-300 pb-8 ${
        isCollapsed ? "w-20" : "w-56"
      } h-full relative z-1`}
      style={{ overflowY: "auto" }}
    >
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {menuItems
            .filter((menu) => canAccess(menu.allowedRoles, userRole)) 
            .map((menu) => (
              <li key={menu.name} className="relative">
                {menu.submenus.length > 0 ? (
                  // If there are submenus, use a div and handle click as before
                  <div
                    onClick={() =>
                      handleMenuClick(menu.name, menu.submenus.length > 0)
                    }
                    className="flex items-center justify-between p-3 text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <menu.icon className="text-blue-500" />
                      {!isCollapsed && (
                        <span className="font-semibold text-sm ">{menu.name}</span>
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
                        <span className="font-semibold text-sm ">{menu.name}</span>
                      )}
                    </div>
                  </NavLink>
                )}

                {/* Submenu rendering for collapsed and expanded sidebar */}
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
                      ) // Filter submenus based on role
                      .map((submenu) => (
                        <li key={submenu.name}>
                          <NavLink
                            to={submenu.route}
                            // onClick={() => setOpenMenu(null)} // Ensure menu closes on submenu click
                            className={({ isActive }) =>
                              `block p-2 text-sm text-gray-600 hover:bg-blue-50 rounded ${
                                isActive ? "bg-blue-100" : ""
                              }`
                            }
                          >
                            <div className="flex items-center space-x-2">
                              <submenu.icon className="text-blue-500" />
                              <span>{submenu.name}</span>
                            </div>
                          </NavLink>
                        </li>
                      ))}
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

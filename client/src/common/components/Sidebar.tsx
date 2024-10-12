import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserCheck,
  FaChevronDown,
} from "react-icons/fa";

// Define the menu structure and permissions for each item
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
        name: "Add",
        icon: FaUserCheck,
        route: "/employee/add",
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
        route: "/leaves/request",
        allowedRoles: ["admin", "user"],
      },
      {
        name: "Leave Balance",
        icon: FaUserCheck,
        route: "/leaves/balance",
        allowedRoles: ["admin", "user"],
      },
    ],
    allowedRoles: ["admin", "user"], // Only these roles can access "Leaves"
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  userRole: string; // The role of the current user, e.g., 'admin', 'user', 'manager'
}

// Utility function to check if the user's role is allowed to see a menu item
const canAccess = (allowedRoles: string[], userRole: string): boolean => {
  return allowedRoles.includes(userRole);
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, userRole }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Toggle the submenu if the menu has submenus
  const handleMenuClick = (menu: string, hasSubmenus: boolean) => {
    if (hasSubmenus) {
      // Toggle submenu if it exists
      setOpenMenu(openMenu === menu ? null : menu);
    } else {
      // No submenu, so clear the state
      setOpenMenu(null);
    }
  };

  // Handle closing of submenus when clicking outside
  const handleBlur = (event: React.FocusEvent) => {
    const currentTarget = event.currentTarget;

    // Timeout to allow focus shift to child elements (submenus)
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setOpenMenu(null); // Close any open submenu when focus is lost
      }
    }, 0);
  };

  return (
    <div
      tabIndex={0} // Enable the sidebar to capture focus for onBlur
      onBlur={handleBlur} // Close submenus when clicking outside of the sidebar
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-56"
      } h-full relative z-1`}
    >
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {menuItems
            .filter((menu) => canAccess(menu.allowedRoles, userRole)) // Filter menu items based on role
            .map((menu) => (
              <li key={menu.name} className="relative">
                <div
                  onClick={() =>
                    handleMenuClick(menu.name, menu.submenus.length > 0)
                  }
                  className="flex items-center justify-between p-3 text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <menu.icon className="text-blue-500" />
                    {!isCollapsed && (
                      <span className="font-semibold">{menu.name}</span>
                    )}
                  </div>
                  {/* Conditionally render the dropdown arrow only if there are submenus */}
                  {!isCollapsed && menu.submenus.length > 0 && (
                    <FaChevronDown
                      className={`transition-transform ${
                        openMenu === menu.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Submenu rendering for collapsed and expanded sidebar */}
                {openMenu === menu.name && menu.submenus.length > 0 && (
                  <ul
                    className={`ml-6 mt-2 space-y-1 ${
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
                            onClick={() => setOpenMenu(null)} // Ensure menu closes on submenu click
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

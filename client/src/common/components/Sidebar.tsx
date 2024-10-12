import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserCheck,
  FaChevronDown,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Define the menu structure and permissions for each item
const menuItems = [
  {
    name: "Dashboard",
    icon: FaTachometerAlt,
    route: "/home/dashboard",
    submenus: [],
    allowedRoles: ["admin", "user", "manager"],
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
      {
        name: "Role",
        icon: FaBuilding,
        route: "/organization/role",
        allowedRoles: ["admin"],
      },
      {
        name: "Password",
        icon: FaBuilding,
        route: "/organization/password",
        allowedRoles: ["admin"],
      },
    ],
    allowedRoles: ["admin", "manager"],
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
    allowedRoles: ["admin", "manager"],
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
    allowedRoles: ["admin", "user"],
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

  const handleMenuClick = (menu: string, hasSubmenus: boolean) => {
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
      onBlur={handleBlur}
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-56"
      } h-full relative z-1`}
    >
      <nav className="mt-4 px-4">
        <ul className="space-y-2">
          {menuItems
            .filter((menu) => canAccess(menu.allowedRoles, userRole))
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
                      <span className="font-semibold">{t(menu.name)}</span>
                    )}
                  </div>
                  {!isCollapsed && menu.submenus.length > 0 && (
                    <FaChevronDown
                      className={`transition-transform ${
                        openMenu === menu.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

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
                      )
                      .map((submenu) => (
                        <li key={submenu.name}>
                          <NavLink
                            to={submenu.route}
                            onClick={() => setOpenMenu(null)}
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

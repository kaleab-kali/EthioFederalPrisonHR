import React, { useState } from 'react';
import { HiMenu, HiBell, HiUser, HiCog } from 'react-icons/hi';
import { FaGlobe } from 'react-icons/fa';  

interface HeaderProps {
    onToggleSidebar: () => void;
  }

const Header : React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(true);
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleNotifications = () => {
    setNotificationOpen(!isNotificationOpen);
    setNewNotification(false); 
  };
  const toggleLanguage = () => setLanguageOpen(!isLanguageOpen);

  return (
    <header className="flex items-center justify-between py-2 px-4 bg-white shadow-lg rounded-lg relative z-10">
      {/* Left Section: Sidebar Toggle, Logo, and Title */}
      <div className="flex items-center">
        <button
          id="toggleSidebar"
          aria-expanded="true"
          aria-controls="sidebar"
            onClick={onToggleSidebar}
          className="p-2 mr-3 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 transition duration-150 ease-in-out"
        >
          <HiMenu className="w-5 h-5" />
        </button>
        <img src="/fpp.jpg" className="h-8 mr-3" alt="Company Logo" />
        <span className="text-xl font-semibold text-gray-900">Federal Prison Commission HR</span>
      </div>

      {/* Center Section: Branch Name */}
      <div className="flex-grow text-center">
        <span className="text-gray-700 text-lg font-medium">Branch Name</span>
      </div>

      {/* Right Section: Notifications, Language Selector, User Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Button */}
        <button
          type="button"
          className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
          onClick={toggleNotifications}
          tabIndex={0}
          onBlur={() => setNotificationOpen(false)}
        >
          <span className="sr-only">View notifications</span>
          <HiBell className="w-5 h-5" />
          {newNotification && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
            <div className="py-3 px-4 border-b text-gray-700 font-medium">Notifications</div>
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-gray-500 text-sm">New message from <span className="font-semibold text-gray-900">Bonnie Green</span>: "Hey, what's up?"</p>
                  <p className="text-xs text-gray-400">a few moments ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={toggleLanguage}
            tabIndex={0}
            onBlur={() => setLanguageOpen(false)}
            className="flex items-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
          >
            <FaGlobe className="mr-2" />
            EN
          </button>
          {isLanguageOpen && (
            <div className="absolute right-0 top-12 mt-2 w-32 bg-white rounded-lg shadow-lg z-50">
              <div className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Switched to English')}>English</div>
              <div className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Switched to Spanish')}>Spanish</div>
              <div className="py-2 px-4 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => alert('Switched to French')}>French</div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            tabIndex={0}
            onBlur={() => setDropdownOpen(false)}
            className="p-2 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
          >
            <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
              <div className="py-3 px-4 border-b text-gray-700 font-medium">User Profile</div>
              <div className="p-4 space-y-1">
                <p className="text-xl font-bold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">HR Manager</span></p>
                <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">john.doe@example.com</span></p>
                <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">123456</span></p>
              </div>
              <div className="border-t">
                <button className="flex items-center w-full text-left p-2 hover:bg-gray-100">
                  <HiCog className="mr-2" /> Settings
                </button>
                <button className="flex items-center w-full text-left p-2 hover:bg-gray-100">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

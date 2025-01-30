import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ProfileMenu: React.FC = () => {
  const menuItems = [
    { name: 'Basic Info', path: 'details' },
    { name: 'Education', path: 'education' },
    { name: 'Leave', path: 'leave' },
    { name: 'Attendance', path: 'attendance' },
    { name: 'Appraisal', path: 'appraisal' },
    { name: 'health', path: 'health' },
    { name: 'Family', path: 'family' },
    { name: 'Material', path: 'material' },
    { name: 'Performance', path: 'performance' },
    { name: 'Documents', path: 'documents' },
    { name: 'Work Experience', path: 'workExperience' },
  ];

  const location = useLocation();
  
  return (
    <div className="flex space-x-7">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            ` py-2  ${
              (isActive || (item.path === 'details' && location.pathname.endsWith('/profile/' + location.pathname.split('/').pop()))) 
              ? 'bg-grey-100 text-sky-500/75 font-bold font-poppins' : 'bg-transparent text-gray-800'
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default ProfileMenu;

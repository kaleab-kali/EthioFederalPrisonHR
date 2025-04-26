// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useTranslation } from "react-i18next";

// const ProfileMenu: React.FC = () => {
//   const { t } = useTranslation("employeeProfile");
//   const menuItems = [
//     { name: 'Basic Info', path: 'details' },
//     { name: 'Education', path: 'education' },
//     { name: 'Leave', path: 'leave' },
//     { name: 'Attendance', path: 'attendance' },
//     { name: 'Appraisal', path: 'appraisal' },
//     { name: 'health', path: 'health' },
//     { name: 'Family', path: 'family' },
//     // { name: 'Material', path: 'material' },
//     { name: 'Performance', path: 'performance' },
//     { name: 'Documents', path: 'documents' },
//     { name: 'Work Experience', path: 'workExperience' },
//   ];

//   const location = useLocation();
  
//   return (
//     <div className="flex space-x-7">
//       {menuItems.map((item) => (
//         <NavLink
//           key={item.name}
//           to={item.path}
//           className={({ isActive }) =>
//             ` py-2  ${
//               (isActive || (item.path === 'details' && location.pathname.endsWith('/profile/' + location.pathname.split('/').pop()))) 
//               ? 'bg-grey-100 text-sky-500/75 font-bold font-poppins' : 'bg-transparent text-gray-800'
//             }`
//           }
//         >
//           {item.name}
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default ProfileMenu;

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ProfileMenu: React.FC = () => {
  const { t } = useTranslation("employeeProfile");
  const menuItems = [
    { name: t('employeeProfile.Basic Info'), path: 'details' },
    { name: t('employeeProfile.Education'), path: 'education' },
    { name: t('employeeProfile.Leave'), path: 'leave' },
    { name: t('employeeProfile.Attendance'), path: 'attendance' },
    { name: t('employeeProfile.Appraisal'), path: 'appraisal' },
    { name: t('employeeProfile.health'), path: 'health' },
    { name: t('employeeProfile.Family'), path: 'family' },
    { name: t('employeeProfile.Performance'), path: 'performance' },
    { name: t('employeeProfile.Documents'), path: 'documents' },
    { name: t('employeeProfile.Work Experience'), path: 'workExperience' },
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
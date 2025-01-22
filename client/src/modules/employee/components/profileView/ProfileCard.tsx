import React from 'react';

interface ProfileCardEmployeeInfo {
  picture: string;
  name: string;
  id: string;
  title: string;
  active: string;
  manager: string;
}

interface ProfileCardProps {
  employee: ProfileCardEmployeeInfo;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ employee }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center max-h-max">
      <div className="relative">
        <img
          // src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          src={employee.picture}
          alt="Employee"
          className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg"
        />
        <div className="absolute inset-0 w-32 h-32 bg-gradient-to-t from-black via-transparent to-transparent rounded-full"></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{employee.name}</h2>
        <p className="text-md text-gray-700 font-bold">{employee.id}</p>
        <p className="text-lg text-gray-500">{employee.title}</p>
        <hr className="my-4 w-full border-gray-300" />
        <div className="mt-2 space-y-1 w-full px-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Status</span>
            <span className="text-md font-bold">{employee.active}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Manager</span>
            <span className="text-md font-bold">{employee.manager}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

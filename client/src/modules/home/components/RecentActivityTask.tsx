import React from 'react';

const RecentActivityTask = ({ avatarUrl, userName, taskDescription, timestamp }) => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-gray-900">{userName}</span>{" "}
            completed the task: "{taskDescription}"
          </p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityTask;
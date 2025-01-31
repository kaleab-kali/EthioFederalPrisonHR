import React from "react";
import FirstEmployeePasswordComp from "../../components/FirstEmployeePasswordComp";

const FirstEmployeePassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-200 p-4 flex items-center justify-center shadow-md">
        <img
          src={process.env.PUBLIC_URL + "/fpp.jpg"}
          alt="Company Logo"
          className="h-16 w-16 rounded-full mr-4"
        />
        <h1 className="text-2xl font-bold text-white">Federal Prison HR</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
        <FirstEmployeePasswordComp />
      </main>

      {/* Footer */}
      <footer className="bg-blue-200 text-center p-4 shadow-md">
        <p className="text-sm text-gray-700">
          FPC @ {new Date().getFullYear()} Created by FPC Team
        </p>
      </footer>
    </div>
  );
};

export default FirstEmployeePassword;

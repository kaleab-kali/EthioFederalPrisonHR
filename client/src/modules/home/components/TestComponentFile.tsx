// import React from "react";
// import {
//   FaUsers,
//   FaClipboardList,
//   FaChartPie,
//   FaBell,
//   FaCalendarAlt,
//   FaGraduationCap,
//   FaFolderOpen,
//   FaCheckCircle,
// } from "react-icons/fa";
// import KPICard from "./KPICard";
// import RecentActivityTask from "./RecentActivityTask";
// import { useTranslation } from "react-i18next";

// const TestComponentFile: React.FC = () => {
//   const { t } = useTranslation("dashboard");
//   return (
//     <div className="p-6 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
//         <KPICard
//           title="Total Employees"
//           value="1,250"
//           icon={<FaUsers className="w-5 h-5 text-blue-500" />}
//           trend="+5.2% from last month"
//         />
//         <KPICard
//           title="Employees on Leave"
//           value={45}
//           icon={<FaUsers className="w-5 h-5 text-yellow-500" />}
//           trend="+10% from last month"
//         />
//          <KPICard
//           title="Active Employees"
//           value={12}
//           icon={<FaUsers className="w-5 h-5 text-red-500" />}
//           trend="-10% from last month"
//         />
//         <KPICard
//           title="Pending Leave Requests"
//           value={12}
//           icon={<FaUsers className="w-5 h-5 text-green-500" />}
//         />
       
//         <KPICard
//           title="Upcoming retirements"
//           value="19"
//           icon={<FaUsers className="w-5 h-5 text-blue-500" />}
//           trend="+5.2% from last month"
//         />
//         <KPICard
//           title="Total Complaints"
//           value={35}
//           icon={<FaUsers className="w-5 h-5 text-yellow-500" />}
//           trend="+10% from last month"
//         />
//         <KPICard
//           title="Pending Complaints"
//           value={5}
//           icon={<FaUsers className="w-5 h-5 text-red-500" />}
//         />
//         <KPICard
//           title="Transfer Pending"
//           value={3}
//           icon={<FaUsers className="w-5 h-5 text-green-500" />}
//           trend="-10% from last month"
//         />
//       </div>

//       {/* Bento Grid Section */}
//       <div className="grid grid-cols-3 md:grid-cols-3 grid-rows-3 md:grid-rows-3 gap-2 md:gap-2 m-4">
//         {/* Box 0: Recent Activities */}
//         <div className="col-start-1 row-start-1 col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Employee Distribution
//             </h2>
//             <FaChartPie className="w-6 h-6 text-purple-500" />
//           </div>
//           <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
//             <span className="text-gray-500">Pie Chart Here</span>
//           </div>
//         </div>

//         {/* Box 1: Employee Distribution */}
//         <div className="col-start-3 row-start-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Military Rank Distribution
//             </h2>
//             <FaChartPie className="w-6 h-6 text-purple-500" />
//           </div>
//           <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
//             <span className="text-gray-500">Pie Chart Here</span>
//           </div>
//         </div>

//         {/* Box 2: Upcoming Retirements */}
//         <div className="col-start-3 row-start-2 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Recent Activity
//             </h2>
//             <FaBell className="w-6 h-6 text-blue-500" />
//           </div>
//           <ul className="space-y-3">
//             <li className="text-sm text-gray-600">
//               <RecentActivityTask
//                 avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
//                 userName="Bonnie Green"
//                 taskDescription="Update the project documentation"
//                 timestamp="a few moments ago"
//               />
//             </li>
//             <li className="text-sm text-gray-600">
//               <RecentActivityTask
//                 avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
//                 userName="John Doe"
//                 taskDescription="Fix the login page UI"
//                 timestamp="5 minutes ago"
//               />
//             </li>
//             <li className="text-sm text-gray-600">
//               <RecentActivityTask
//                 avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
//                 userName="Bonnie Green"
//                 taskDescription="Update the project documentation"
//                 timestamp="a few moments ago"
//               />
//             </li>
//           </ul>
//         </div>

//         {/* Box 3: Complaint Status */}
//         <div className="col-start-1 row-start-3 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
//   <div className="flex items-center justify-between mb-6">
//     <h2 className="text-2xl font-bold text-gray-900">
//       Complaint Status
//     </h2>
//     <FaClipboardList className="w-8 h-8 text-indigo-500" />
//   </div>
//   <div className="space-y-3">
//     <div className="flex items-center space-x-2">
//       <FaFolderOpen className="w-5 h-5 text-indigo-500" />
//       <p className="text-base text-gray-700">
//         Open: <span className="font-semibold text-indigo-600">5</span>
//       </p>
//     </div>
//     <div className="flex items-center space-x-2">
//       <FaCheckCircle className="w-5 h-5 text-green-500" />
//       <p className="text-base text-gray-700">
//         Resolved: <span className="font-semibold text-green-500">12</span>
//       </p>
//     </div>
//   </div>
//   <div className="mt-4">
//     <div className="w-full bg-gray-200 rounded-full h-2">
//       <div
//         className="bg-indigo-500 h-2 rounded-full"
//         style={{ width: `${(12 / 17) * 100}%` }}
//       ></div>
//     </div>
//     <p className="text-xs text-gray-500 mt-1">
//       12 of 17 complaints resolved
//     </p>
//   </div>
//   <div className="mt-6 flex space-x-4">
//     <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">
//       View Details
//     </button>
//     <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300">
//       New Complaint
//     </button>
//   </div>
// </div>

//         {/* Box 4: Training Completion */}
//         <div className="col-start-2 row-start-3 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 bg-white rounded-lg shadow-sm p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Upcoming Appraisals
//             </h2>
//             <FaGraduationCap className="w-6 h-6 text-pink-500" />
//           </div>
//           <p className="text-3xl font-bold text-pink-500">92%</p>
//           <p className="text-sm text-gray-600 mt-1">On track for annual goal</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestComponentFile;

import React from "react";
import {
  FaUsers,
  FaClipboardList,
  FaChartPie,
  FaBell,
  FaCalendarAlt,
  FaGraduationCap,
  FaFolderOpen,
  FaCheckCircle,
} from "react-icons/fa";
import KPICard from "./KPICard";
import RecentActivityTask from "./RecentActivityTask";
import { useTranslation } from "react-i18next";

const TestComponentFile: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{t("dashboard.title")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <KPICard
          title={t("dashboard.kpi.totalEmployees")}
          value="1,250"
          icon={<FaUsers className="w-5 h-5 text-blue-500" />}
          trend={t("dashboard.kpi.trend", { percent: "+5.2" })}
        />
        <KPICard
          title={t("dashboard.kpi.employeesOnLeave")}
          value={45}
          icon={<FaUsers className="w-5 h-5 text-yellow-500" />}
          trend={t("dashboard.kpi.trend", { percent: "+10" })}
        />
        <KPICard
          title={t("dashboard.kpi.activeEmployees")}
          value={12}
          icon={<FaUsers className="w-5 h-5 text-red-500" />}
          trend={t("dashboard.kpi.trend", { percent: "-10" })}
        />
        <KPICard
          title={t("dashboard.kpi.pendingLeaveRequests")}
          value={12}
          icon={<FaUsers className="w-5 h-5 text-green-500" />}
        />
        <KPICard
          title={t("dashboard.kpi.upcomingRetirements")}
          value="19"
          icon={<FaUsers className="w-5 h-5 text-blue-500" />}
          trend={t("dashboard.kpi.trend", { percent: "+5.2" })}
        />
        <KPICard
          title={t("dashboard.kpi.totalComplaints")}
          value={35}
          icon={<FaUsers className="w-5 h-5 text-yellow-500" />}
          trend={t("dashboard.kpi.trend", { percent: "+10" })}
        />
        <KPICard
          title={t("dashboard.kpi.pendingComplaints")}
          value={5}
          icon={<FaUsers className="w-5 h-5 text-red-500" />}
        />
        <KPICard
          title={t("dashboard.kpi.transferPending")}
          value={3}
          icon={<FaUsers className="w-5 h-5 text-green-500" />}
          trend={t("dashboard.kpi.trend", { percent: "-10" })}
        />
      </div>

      {/* Bento Grid Section */}
      <div className="grid grid-cols-3 md:grid-cols-3 grid-rows-3 md:grid-rows-3 gap-2 md:gap-2 m-4">
        {/* Box 0: Recent Activities */}
        <div className="col-start-1 row-start-1 col-span-2 row-span-2 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("dashboard.bento.employeeDistribution.title")}
            </h2>
            <FaChartPie className="w-6 h-6 text-purple-500" />
          </div>
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">
              {t("dashboard.bento.employeeDistribution.placeholder")}
            </span>
          </div>
        </div>

        {/* Box 1: Military Rank Distribution */}
        <div className="col-start-3 row-start-1 md:col-start-3 md:row-start-1 md:col-span-1 md:row-span-1 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("dashboard.bento.militaryRankDistribution.title")}
            </h2>
            <FaChartPie className="w-6 h-6 text-purple-500" />
          </div>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">
              {t("dashboard.bento.militaryRankDistribution.placeholder")}
            </span>
          </div>
        </div>

        {/* Box 2: Recent Activity */}
        <div className="col-start-3 row-start-2 row-span-2 md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("dashboard.bento.recentActivity.title")}
            </h2>
            <FaBell className="w-6 h-6 text-blue-500" />
          </div>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600">
              <RecentActivityTask
                avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                userName="Bonnie Green"
                taskDescription={t("dashboard.bento.recentActivity.task1")}
                timestamp={t("dashboard.bento.recentActivity.timestamp1")}
              />
            </li>
            <li className="text-sm text-gray-600">
              <RecentActivityTask
                avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                userName="John Doe"
                taskDescription={t("dashboard.bento.recentActivity.task2")}
                timestamp={t("dashboard.bento.recentActivity.timestamp2")}
              />
            </li>
            <li className="text-sm text-gray-600">
              <RecentActivityTask
                avatarUrl="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                userName="Bonnie Green"
                taskDescription={t("dashboard.bento.recentActivity.task1")}
                timestamp={t("dashboard.bento.recentActivity.timestamp1")}
              />
            </li>
          </ul>
        </div>

        {/* Box 3: Complaint Status */}
        <div className="col-start-1 row-start-3 md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("dashboard.bento.complaintStatus.title")}
            </h2>
            <FaClipboardList className="w-8 h-8 text-indigo-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FaFolderOpen className="w-5 h-5 text-indigo-500" />
              <p className="text-base text-gray-700">
                {t("dashboard.bento.complaintStatus.open")}:{" "}
                <span className="font-semibold text-indigo-600">5</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-base text-gray-700">
                {t("dashboard.bento.complaintStatus.resolved")}:{" "}
                <span className="font-semibold text-green-500">12</span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${(12 / 17) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {t("dashboard.bento.complaintStatus.resolvedCount", {
                resolved: 12,
                total: 17,
              })}
            </p>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">
              {t("dashboard.bento.complaintStatus.viewDetails")}
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300">
              {t("dashboard.bento.complaintStatus.newComplaint")}
            </button>
          </div>
        </div>

        {/* Box 4: Training Completion */}
        <div className="col-start-2 row-start-3 md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {t("dashboard.bento.upcomingAppraisals.title")}
            </h2>
            <FaGraduationCap className="w-6 h-6 text-pink-500" />
          </div>
          <p className="text-3xl font-bold text-pink-500">92%</p>
          <p className="text-sm text-gray-600 mt-1">
            {t("dashboard.bento.upcomingAppraisals.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestComponentFile;
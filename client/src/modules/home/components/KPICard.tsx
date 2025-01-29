import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend = "No change" }) => {
  // Extract the percentage from the trend string and apply color
  const renderTrend = (trend: string) => {
    // Match the percentage value (e.g., "+5.2%", "-3.1%")
    const percentageMatch = trend.match(/[+-]?\d+(\.\d+)?%/);
    const percentage = percentageMatch ? percentageMatch[0] : null;

    if (!percentage) {
      return <span className="text-xs text-gray-500">{trend}</span>;
    }

    // Determine the color based on the percentage
    const color = percentage.includes("+")
      ? "text-green-500"
      : percentage.includes("-")
      ? "text-red-500"
      : "text-gray-500";

    // Split the trend text into parts and color only the percentage
    const parts = trend.split(percentage);
    return (
      <span className="text-xs text-gray-500">
        {parts[0]}
        <span className={color}>{percentage}</span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="w-full h-[134px] rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 flex flex-col p-4">
      {/* Top Section: Value and Icon */}
      <div className="flex items-center justify-between">
        <p className="text-[38px] font-roboto font-light text-gray-900">{value}</p>
        <div className="p-2 bg-blue-50 rounded-full">{icon}</div>
      </div>

      {/* Middle Section: Title */}
      <div className="">
        <div className="text-base text-gray-600">{title}</div>
      </div>

      {/* Bottom Section: Trend (always displayed) */}
      <div className="">{renderTrend(trend)}</div>
    </div>
  );
};

export default KPICard;
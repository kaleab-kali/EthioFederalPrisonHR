import React from "react";

export interface ScheduleItem {
    title: string;
    time: string;
    isPriority?: boolean;
  }
  
  export interface ScheduleCardProps {
    title: string;
    time: string;
    isPriority?: boolean;
  }


// import { ScheduleCardProps } from "./types";

const ScheduleCard: React.FC<ScheduleCardProps> = ({ title, time, isPriority }) => {
  return (
    <div className="flex overflow-hidden gap-7 items-center px-4 py-2.5 w-full rounded-md border-solid bg-neutral-50 border-[0.5px] border-neutral-200">
      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px]">
        <div className="text-base text-zinc-800">{title}</div>
        <div className="mt-1.5 text-xs leading-snug text-stone-500">{time}</div>
      </div>
      <div className="flex gap-5 items-start self-stretch my-auto min-h-[24px] w-[68px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d22ad518cc7dcb522fe975940f943649ce9596c9affc028cd0a3c3d49dcaaddf?apiKey=fb8057eaac544ddaabf4054b6bb1ca7e&"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5391d8d82b16f63f1685f34e7802b38f23a57e0a5cd06286c50b80b8bb5f30?apiKey=fb8057eaac544ddaabf4054b6bb1ca7e&"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
      </div>
    </div>
  );
};


const scheduleData: ScheduleItem[] = [
  {
    title: "Review candidate applications",
    time: "Today - 11.30 AM",
    isPriority: true
  },
  {
    title: "Interview with candidates",
    time: "Today - 10.30 AM"
  },
  {
    title: "Short meeting with product designer from IT Departement",
    time: "Today - 09.15 AM"
  },
  {
    title: "Sort Front-end developer candidates",
    time: "Today - 09.00 AM"
  }
];

export const ScheduleDashboard: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col max-w-[427px]">
      <div className="flex flex-col pt-5 w-full bg-white rounded-xl border border-solid border-neutral-200">
        <div className="flex flex-col px-5 w-full">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="self-stretch my-auto text-lg font-medium leading-loose text-blue-950 w-[200px]">
              Upcoming Schedule
            </div>
            <div className="flex gap-1.5 justify-between items-center self-stretch px-1.5 my-auto text-xs leading-7 bg-white rounded border border-solid border-zinc-100 text-stone-500 w-[145px]">
              <div className="flex-1 shrink gap-2.5 self-stretch px-0.5 py-1 my-auto min-h-[27px] w-[109px]">
                Today, 13 Sep 2021
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0f6713cea430c3576cbab06fd90a3d13f88b44f158e8098d417dc3d41e26dc1?apiKey=fb8057eaac544ddaabf4054b6bb1ca7e&"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              />
            </div>
          </div>
          
          <div className="self-start mt-6 text-xs leading-loose text-stone-500">
            Priority
          </div>
          
          {scheduleData.map((item, index) => (
            <React.Fragment key={index}>
              {index === 1 && (
                <div className="self-start mt-4 text-xs leading-loose text-stone-500">
                  Other
                </div>
              )}
              <div className={index > 0 ? "mt-2" : "mt-3"}>
                <ScheduleCard
                  title={item.title}
                  time={item.time}
                  isPriority={item.isPriority}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <button 
          className="overflow-hidden z-10 flex-1 shrink gap-2.5 self-stretch p-2.5 mt-0 text-sm font-medium leading-none text-center text-red-500 bg-white rounded-none border border-solid border-neutral-200 min-h-[39px]"
          aria-label="Create a new schedule"
        >
          Create a New Schedule
        </button>
      </div>
    </div>
  );
};

export default ScheduleDashboard
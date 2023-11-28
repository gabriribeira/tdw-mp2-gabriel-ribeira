import React, { useState } from "react";
import { useGetCalendarQuery } from "../app/api";
import { useSelector } from "react-redux";
import CalendarView from "./CalendarView";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const user = useSelector((state) => state.auth.user);
  const { data: calendar, error, isLoading } = useGetCalendarQuery(user.id);
  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  };
  return (
    <div className="w-full bg-[#2b2b2b] text-white flex">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-center md:text-2xl text-xl font-bold mb-5 md:gap-x-5 gap-x-2">
          <button onClick={handlePrevMonth}>
            <SlArrowLeft />
          </button>
          <h2 className="uppercase">
            {user.name.split(" ")[0]}
            {"'s "}
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(currentDate)}
          </h2>
          <button onClick={handleNextMonth}>
            <SlArrowRight />
          </button>
        </div>
        {!isLoading && !error && (
          <CalendarView entries={calendar} currentDate={currentDate} />
        )}
      </div>
    </div>
  );
};

export default Calendar;

import React, { useState } from "react";

import { useGetCalendarQuery } from "../app/api";
import { useSelector } from "react-redux";

import CalendarView from "./CalendarView";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  //eslint-disable-next-line
  const user = useSelector((state) => state.auth.user);
  //eslint-disable-next-line
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
    <div className="w-full bg-white text-[#2b2b2b] flex">
      <div className="w-full flex flex-col">
        <div className="calendar-header flex justify-between items-center mb-10">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(currentDate)}
          </h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        {!isLoading && (
          <CalendarView entries={calendar} currentDate={currentDate} />
        )}
      </div>
    </div>
  );
};

export default Calendar;

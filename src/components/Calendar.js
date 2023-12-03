import React, { useState, useEffect } from "react";
import { useGetCalendarQuery } from "../app/api";
import { useSelector } from "react-redux";
import CalendarView from "./CalendarView";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useGetUserByIdQuery } from "../app/api";
import PropTypes from "prop-types";

const Calendar = ({ id }) => {
  let authUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const { data: visitedUser } = useGetUserByIdQuery(id);
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
    if (visitedUser && visitedUser[0]) {
      setUser(visitedUser[0]);
    }
  }, [visitedUser, authUser]);
  const [currentDate, setCurrentDate] = useState(new Date());
  //eslint-disable-next-line
  const {
    data: calendar,
    //eslint-disable-next-line
    error,
    //eslint-disable-next-line
    isLoading,
  } = useGetCalendarQuery(user && user.id);

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
    user &&
    user.name && (
      <div className="w-full bg-[#2b2b2b] text-white flex pt-10">
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
          {user && (
            <CalendarView entries={calendar} currentDate={currentDate} />
          )}
        </div>
      </div>
    )
  );
};

Calendar.propTypes = {
  id: PropTypes.string,
};

export default Calendar;

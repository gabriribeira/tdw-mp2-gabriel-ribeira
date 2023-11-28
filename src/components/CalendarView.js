import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetTrackByIdQuery } from "../app/spotifyApi";
import DefaultImage from "../assets/default.jpg";

const CalendarView = ({ entries, currentDate }) => {
  const [dateFormatted, setDateFormatted] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    let allEntriesAux = "";
    if (entries) {
      entries.map((entry, index) => {
        if (index == entries.length - 1) {
          allEntriesAux = allEntriesAux + entry.track_id;
        } else {
          allEntriesAux = allEntriesAux + entry.track_id + ",";
        }
      });
    }
    setAllEntries(allEntriesAux);
  }, [entries]);

  useEffect(() => {
    if (currentDate) {
      setDateFormatted(formatDate(currentDate));
    }
  }, [currentDate]);

  const { data: calendarTracks } = useGetTrackByIdQuery(allEntries);

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options,
    );
    return formattedDate;
  }

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    const generateCalendar = () => {
      let calendarTracksAux = [];

      if (entries) {
        for (let i = 1; i <= 31; i++) {
          entries.map((entry) => {
            if (!calendarTracksAux[i]) {
              if (
                entry.entry_date.split("/")[2] == dateFormatted.split("/")[2] &&
                entry.entry_date.split("/")[1] == dateFormatted.split("/")[1]
              ) {
                if (entry.entry_date.split("/")[0] == i) {
                  calendarTracksAux[i] = entry.track_id;
                } else {
                  calendarTracksAux[i] = null;
                }
              }
            }
          });
        }
      }

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const calendar = [];
      const tracksInMonth = [];

      for (let day = 1; day <= daysInMonth; day++) {
        if (calendarTracksAux[day]) {
          calendarTracks.tracks.map((track) => {
            if (calendarTracksAux[day] == track.id) {
              tracksInMonth[day] = track;
            }
          });
        }

        calendar.push(
          <div
            key={day}
            className="col-span-1 w-full pb-[100%] relative flex justify-center items-center"
          >
            {tracksInMonth[day] ? (
              <h1 className="absolute top-1 left-1 text-xl font-bold text-[#2b2b2b] z-[100]">
                {day}
              </h1>
            ) : (
              <h1 className="absolute top-1 left-1 text-xl font-bold">{day}</h1>
            )}
            {tracksInMonth[day] && (
              <img
                src={
                  tracksInMonth[day]
                    ? tracksInMonth[day].album.images[0].url
                    : DefaultImage
                }
                alt="Default"
                className="w-full h-full absolute top-0 left-0"
              />
            )}
          </div>,
        );
      }

      setCalendar(calendar);
    };

    if (dateFormatted && calendarTracks) {
      generateCalendar();
    }
  }, [calendarTracks, dateFormatted]);

  return (
    <div className="w-full grid lg:grid-cols-10 md:grid-cols-8 grid-cols-5 relative">
      {calendar && calendar}
    </div>
  );
};

CalendarView.propTypes = {
  currentDate: PropTypes.object,
  entries: PropTypes.array,
};

export default CalendarView;

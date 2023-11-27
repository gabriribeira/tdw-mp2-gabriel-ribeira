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

  useEffect(() => {
    console.log(calendarTracks);
  }, [calendarTracks]);

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
        console.log(entries);
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
            <h1 className="absolute top-0 left-0">{day}</h1>
            <img
              src={
                tracksInMonth[day]
                  ? tracksInMonth[day]
                    ? tracksInMonth[day].album.images[0].url
                    : DefaultImage
                  : DefaultImage
              }
              alt="Default"
              className="w-full h-full absolute top-0 left-0"
            />
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
    <div className="w-full grid grid-cols-10 relative">
      {calendar && calendar}
    </div>
  );
};

CalendarView.propTypes = {
  currentDate: PropTypes.object,
  entries: PropTypes.array,
};

export default CalendarView;

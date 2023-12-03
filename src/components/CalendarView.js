import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useGetTrackByIdQuery } from "../app/spotifyApi";
import ItemOverlay from "./ItemOverlay";

const CalendarView = ({ entries, currentDate }) => {
  const [dateFormatted, setDateFormatted] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [trackModal, setTrackModal] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false);
  const audioRef = useRef(null);

  function playTrack(track) {
    if (audioRef.current) {
      setTrack(track);
      setPlaying(true);
      setRefreshCalendar(true);
      audioRef.current.pause();
      audioRef.current.src = track;
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setPlaying(false);
      });
    }
  }

  function pauseTrack() {
    setPlaying(false);
    setTrack(null);
    setRefreshCalendar(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

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
      let calendarTracksFullAux = [];

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
                  calendarTracksFullAux[i] = entry;
                } else {
                  calendarTracksAux[i] = null;
                  calendarTracksFullAux[i] = null;
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
            className="col-span-1 w-full pb-[100%] relative flex justify-center items-center text-preto"
          >
            {tracksInMonth[day] ? (
              <h1 className="absolute top-1 left-1 text-xl font-bold text-preto z-[100]">
                {day}
              </h1>
            ) : (
              <h1 className="absolute top-1 left-1 text-xl text-white font-bold">
                {day}
              </h1>
            )}
            {tracksInMonth[day] && (
              <ItemOverlay
                item={tracksInMonth[day]}
                itemDb={calendarTracksFullAux[day]}
                trackModal={trackModal}
                setTrackModal={setTrackModal}
                track={track}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                playing={playing}
                calendar={true}
              />
            )}
          </div>,
        );
      }

      setCalendar(calendar);
    };

    if (dateFormatted || calendarTracks) {
      generateCalendar();
    }

    if (refreshCalendar || trackModal) {
      setRefreshCalendar(false);
      generateCalendar();
    }
  }, [calendarTracks, dateFormatted, refreshCalendar, trackModal]);

  return (
    calendar && (
      <div className="w-full grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 relative">
        {calendar}
        <audio
          ref={audioRef}
          controls={false}
          type="audio/mpeg"
          className=""
          onEnded={pauseTrack}
        ></audio>
      </div>
    )
  );
};

CalendarView.propTypes = {
  currentDate: PropTypes.object,
  entries: PropTypes.array,
};

export default CalendarView;

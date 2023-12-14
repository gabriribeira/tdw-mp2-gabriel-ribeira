import React, { useEffect, useState } from "react";
import {
  useGetPlaylistQuery,
  useGetRecommendationsByTrackQuery,
} from "../app/spotifyApi";
import { useGetCalendarQuery } from "../app/api";
import Navbar from "../components/Navbar";
import HomepageGrid from "../components/HomepageGrid";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CheckTopic from "../components/CheckTopic";

const Homepage = () => {
  const authUser = useSelector((state) =>
    state.auth.user ? state.auth.user.id : null,
  );
  //eslint-disable-next-line
  const { data: playlistTracks, error, isLoading } = useGetPlaylistQuery();
  const { data: calendar } = useGetCalendarQuery(authUser);
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  const [searchTodayCalendar, setSearchTodayCalendar] = useState(null);

  const {
    //eslint-disable-next-line
    data: calendarTracks,
    //eslint-disable-next-line
    errorCalendarTracks,
    //eslint-disable-next-line
    isLoadingcalendarTracks,
  } = useGetRecommendationsByTrackQuery(searchTodayCalendar);

  useEffect(() => {
    if (authUser) {
      if (calendar && calendar.length > 0) {
        if (
          calendar[calendar.length - 1].entry_date === `${day}/${month}/${year}`
        ) {
          setSearchTodayCalendar(calendar[calendar.length - 1].track_id);
        }
      }
    } else {
      setSearchTodayCalendar(null);
    }
  }, [authUser, calendar]);

  return (
    <div>
      <Navbar />
      {searchTodayCalendar && calendarTracks && calendar ? (
        <HomepageGrid data={calendarTracks} playlist={false} />
      ) : (
        <HomepageGrid data={playlistTracks} playlist={true} />
      )}
      {!authUser && <HomepageGrid data={playlistTracks} playlist={true} />}
      <CheckTopic
        topic={
          searchTodayCalendar && calendarTracks
            ? `BASED ON TODAY'S MOOD`
            : `BASED ON COMMUNITY PLAYLIST`
        }
      />
      <Footer />
    </div>
  );
};

export default Homepage;

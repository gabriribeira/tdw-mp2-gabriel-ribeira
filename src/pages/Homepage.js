import React, { useEffect } from "react";
import { useGetPlaylistQuery } from "../app/spotifyApi";
import Navbar from "../components/Navbar";
import HomepageGrid from "../components/HomepageGrid";

const Homepage = () => {
  const { data: tracks, error, isLoading } = useGetPlaylistQuery();
  useEffect(() => {
    if (tracks) {
      console.log(tracks);
    }
    if (error) {
      console.error("Error fetching tracks:", error);
    }
  }, [tracks, error]);
  return (
    <div>
      <Navbar />
      <HomepageGrid data={tracks} />
      <h2>{isLoading ? "Loading..." : "Tracks"}</h2>
    </div>
  );
};

export default Homepage;

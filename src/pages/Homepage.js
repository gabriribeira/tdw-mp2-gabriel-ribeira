import React, { useEffect } from "react";
import { useGetPlaylistQuery } from "../app/spotifyApi";
import Navbar from "../components/Navbar";
import HomepageGrid from "../components/HomepageGrid";
import Footer from "../components/Footer";

const Homepage = () => {
  //eslint-disable-next-line
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
      <Footer />
    </div>
  );
};

export default Homepage;

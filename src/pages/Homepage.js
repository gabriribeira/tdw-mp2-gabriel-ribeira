import React, { useEffect } from "react";
import { useGetPlaylistQuery } from "../app/spotifyApi"; // Adjust the path based on your project structure

const Homepage = () => {
  // Use the generated hook to make the API call
  const { data: tracks, error, isLoading } = useGetPlaylistQuery();

  useEffect(() => {
    // Do something with the data or handle errors
    if (tracks) {
      console.log(tracks);
    }

    if (error) {
      console.error("Error fetching tracks:", error);
    }
  }, [tracks, error]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render your component based on the fetched data
  return (
    <div>
      <h2>Tracks</h2>
    </div>
  );
};

export default Homepage;

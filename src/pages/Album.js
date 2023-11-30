import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import AlbumInfo from "../components/AlbumInfo";
import { useGetAlbumByIdSingularQuery } from "../app/spotifyApi";
import AlbumDetails from "../components/AlbumDetails";

const Album = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  //eslint-disable-next-line
  const { data: albumsData, error: artistError } =
    useGetAlbumByIdSingularQuery(id);

  useEffect(() => {
    document.title = albumsData
      ? "MEEM - " + albumsData.name.toUpperCase()
      : "MEEM - ALBUM";
  }, [albumsData]);

  return (
    <div>
      <Navbar />
      <AlbumInfo albumData={albumsData} isPlaying={isPlaying} />
      <AlbumDetails
        tracks={albumsData}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

export default Album;

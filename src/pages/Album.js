import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import AlbumInfo from "../components/AlbumInfo";
import { useGetAlbumByIdQuery } from "../app/spotifyApi";

const Album = () => {
  const { id } = useParams();

  //eslint-disable-next-line
  const { data: albumsData, error: artistError } = useGetAlbumByIdQuery(id);

  useEffect(() => {
    document.title = albumsData
      ? "MEEM - " + albumsData.name.toUpperCase()
      : "MEEM - ALBUM";
  }, [albumsData]);

  return (
    <div>
      <Navbar />
      <AlbumInfo albumData={albumsData} />
    </div>
  );
};

export default Album;

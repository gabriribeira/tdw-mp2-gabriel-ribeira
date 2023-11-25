import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ArtistInfo from "../components/ArtistInfo";
import ArtistAlbums from "../components/ArtistAlbums";
import {
  useGetArtistByIdQuery,
  useGetArtistTopTracksByIdQuery,
  useGetArtistAlbumsByIdQuery,
} from "../app/spotifyApi";

const Artist = () => {
  const { id } = useParams();

  //eslint-disable-next-line
  const { data: artistData, error: artistError } = useGetArtistByIdQuery(id);
  //eslint-disable-next-line
  const { data: topTracksData, error: topTracksError } =
    useGetArtistTopTracksByIdQuery(id);
  //eslint-disable-next-line
  const { data: albumsData, error: albumsError } =
    useGetArtistAlbumsByIdQuery(id);

  useEffect(() => {
    document.title = artistData
      ? "MEEM - " + artistData.name.toUpperCase()
      : "MEEM - ARTIST";
  }, [artistData]);

  return (
    <div>
      <Navbar />
      <ArtistInfo artistData={artistData} topTracksData={topTracksData} />
      <ArtistAlbums albumsData={albumsData} topTracksData={topTracksData} />
    </div>
  );
};

export default Artist;

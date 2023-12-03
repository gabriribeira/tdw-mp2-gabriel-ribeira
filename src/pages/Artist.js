import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ArtistInfo from "../components/ArtistInfo";
import ArtistAlbums from "../components/ArtistAlbums";
import {
  useGetArtistByIdSingularQuery,
  useGetArtistTopTracksByIdQuery,
  useGetArtistAlbumsByIdQuery,
} from "../app/spotifyApi";

const Artist = () => {
  const { id } = useParams();

  //eslint-disable-next-line
  const { data: artistData, error: artistError } =
    useGetArtistByIdSingularQuery(id);
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
    <div className="bg-[#2b2b2b] min-h-screen">
      <Navbar />
      <ArtistInfo artistData={artistData} topTracksData={topTracksData} />
      <ArtistAlbums albumsData={albumsData} topTracksData={topTracksData} />
    </div>
  );
};

export default Artist;

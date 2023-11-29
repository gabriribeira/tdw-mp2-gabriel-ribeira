import React, { useEffect, useState } from "react";
import {
  useGetUserArtistsQuery,
  useGetUserAlbumsQuery,
  useGetUserTracksQuery,
} from "../app/api";
import { useSelector } from "react-redux";
import BookletSlider from "./BookletSlider";

const Booklet = () => {
  const [cleanTracks, setCleanTracks] = useState();
  const [cleanAlbums, setCleanAlbums] = useState();
  const [cleanArtists, setCleanArtists] = useState();
  const user = useSelector((state) => state.auth.user);
  const { data: tracks } = useGetUserTracksQuery(user.id);
  const { data: albums } = useGetUserAlbumsQuery(user.id);
  const { data: artists } = useGetUserArtistsQuery(user.id);

  useEffect(() => {
    if (tracks) {
      console.log(tracks);
      let cleanTracksAux = "";
      tracks.map((track, index) => {
        if (index === tracks.length - 1) {
          cleanTracksAux = cleanTracksAux + track.track_id;
        } else {
          cleanTracksAux = cleanTracksAux + track.track_id + ",";
        }
      });
      setCleanTracks(cleanTracksAux);
    }
  }, [tracks]);
  useEffect(() => {
    if (albums) {
      console.log(albums);
      let cleanAlbumsAux = "";
      albums.map((album, index) => {
        if (index === albums.length - 1) {
          cleanAlbumsAux = cleanAlbumsAux + album.album_id;
        } else {
          cleanAlbumsAux = cleanAlbumsAux + album.album_id + ",";
        }
      });
      setCleanAlbums(cleanAlbumsAux);
    }
  }, [albums]);
  useEffect(() => {
    if (artists) {
      console.log(artists);
      let cleanArtistsAux = "";
      artists.map((artist, index) => {
        if (index === artists.length - 1) {
          cleanArtistsAux = cleanArtistsAux + artist.artist_id;
        } else {
          cleanArtistsAux = cleanArtistsAux + artist.artist_id + ",";
        }
      });
      setCleanArtists(cleanArtistsAux);
    }
  }, [artists]);

  return (
    <div className="bg-[#2b2b2b] flex flex-col w-full">
      {cleanArtists && cleanAlbums && cleanTracks && (
        <BookletSlider
          tracksb={cleanTracks}
          albumsb={cleanAlbums}
          artistsb={cleanArtists}
        />
      )}
    </div>
  );
};

export default Booklet;

import React, { useEffect, useState } from "react";
import {
  useGetUserArtistsQuery,
  useGetUserAlbumsQuery,
  useGetUserTracksQuery,
} from "../app/api";
import { useSelector } from "react-redux";
import BookletSlider from "./BookletSlider";
import PropTypes from "prop-types";
import { useGetUserByIdQuery } from "../app/api";

const Booklet = ({ id }) => {
  let authUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const { data: visitedUser } = useGetUserByIdQuery(id);
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
    if (visitedUser && visitedUser[0]) {
      setUser(visitedUser[0]);
    }
  }, [visitedUser, authUser]);
  const [cleanTracks, setCleanTracks] = useState();
  const [cleanAlbums, setCleanAlbums] = useState();
  const [cleanArtists, setCleanArtists] = useState();
  const { data: tracks } = useGetUserTracksQuery(user && user.id);
  const { data: albums } = useGetUserAlbumsQuery(user && user.id);
  const { data: artists } = useGetUserArtistsQuery(user && user.id);

  useEffect(() => {
    if (tracks) {
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
    <div className="bg-preto flex flex-col w-full">
      {(cleanArtists || cleanAlbums || cleanTracks) && (
        <BookletSlider
          tracksb={cleanTracks}
          albumsb={cleanAlbums}
          artistsb={cleanArtists}
        />
      )}
    </div>
  );
};

Booklet.propTypes = {
  id: PropTypes.string,
};

export default Booklet;

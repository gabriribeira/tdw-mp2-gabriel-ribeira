import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  useAddArtistMutation,
  useAddAlbumMutation,
  useAddTrackMutation,
  useAddCalendarMutation,
} from "../app/api";
import { useSelector } from "react-redux";

const AddToModal = ({ item }) => {
  const user_id = useSelector((state) => state.auth.user.id);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [itemType, setItemType] = useState(null);
  useEffect(() => {
    if (item.track) {
      setItemType("playlistTrack");
      setItemToAdd(item);
    } else if (item.type == "track") {
      setItemType("track");
      setItemToAdd(item);
    } else if (item.type == "album") {
      setItemType("album");
      setItemToAdd(item);
    } else if (item.type == "artist") {
      setItemType("artist");
      setItemToAdd(item);
    }
  }, [item]);

  //eslint-disable-next-line
  const [addArtist, { isLoading: isAddingArtist }] = useAddArtistMutation();
  //eslint-disable-next-line
  const [addAlbum, { isLoading: isAddingAlbum }] = useAddAlbumMutation();
  //eslint-disable-next-line
  const [addTrack, { isLoading: isAddingTrack }] = useAddTrackMutation();
  //eslint-disable-next-line
  const [addTrackToCalendar, { isLoading: isAddingTrackToCalendar }] =
    useAddCalendarMutation();

  const handleAddArtist = () => {
    addArtist({ user_id, artist_id: itemToAdd.id });
  };

  const handleAddAlbum = () => {
    addAlbum({ user_id, album_id: itemToAdd.id });
  };

  const handleAddTrack = () => {
    addTrack({ user_id, track_id: itemToAdd.id });
  };

  const handleAddTrackToCalendar = () => {
    const date = new Date();
    const dateFormatted = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    addTrackToCalendar({
      user_id,
      track_id: itemToAdd.id,
      date: dateFormatted,
    });
  };

  return (
    <div className="z-[101] bg-white absolute xl:top-5 xl:right-3 lg:top-3 lg:right-1 md:top-2 md:right-1 top-0 right-0 w-auto h-auto flex md:p-3 p-2 md:pt-8 pt-6 flex flex-col items-end text-[#2b2b2b] md:text-lg text-md">
      {(itemType == "track" || itemType == "playlistTrack") && (
        <button
          onClick={handleAddTrackToCalendar}
          className="w-full text-end hover:font-bold hover:underline"
        >
          ADD TO CALENDAR
        </button>
      )}
      <button
        onClick={
          itemType == "track" || itemType == "playlistTrack"
            ? handleAddTrack
            : itemType == "album"
              ? handleAddAlbum
              : handleAddArtist
        }
        className="w-full text-end hover:font-bold hover:underline"
      >
        ADD TO BOOKLET
      </button>
      {(itemType == "track" || itemType == "playlistTrack") && (
        <Link
          to={`/artist/${item.artists[0].id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ARTIST
        </Link>
      )}
      {itemType == "album" && (
        <Link
          to={`/artist/${item.artists[0].id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ARTIST
        </Link>
      )}
      {itemType == "artist" && (
        <Link
          to={`/artist/${item.id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ARTIST
        </Link>
      )}
      {(itemType == "track" || itemType == "playlistTrack") && (
        <Link
          to={`/album/${item.album.id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ALBUM
        </Link>
      )}
      {itemType == "album" && (
        <Link
          to={`/album/${item.id}`}
          className="w-full text-end hover:font-bold hover:underline"
        >
          GO TO ALBUM
        </Link>
      )}
    </div>
  );
};

AddToModal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AddToModal;

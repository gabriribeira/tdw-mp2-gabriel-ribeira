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

  useEffect(() => {
    if (item) {
      setItemToAdd(item.id);
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
    addArtist({ user_id, itemToAdd });
  };

  const handleAddAlbum = () => {
    addAlbum({ user_id, itemToAdd });
  };

  const handleAddTrack = () => {
    addTrack({ user_id, track_id: itemToAdd });
  };

  const handleAddTrackToCalendar = () => {
    addTrackToCalendar({ user_id, itemToAdd });
  };

  return (
    <div className="z-[101] bg-white absolute top-4 right-3 w-auto h-auto flex p-3 pt-8 flex flex-col items-end text-[#2b2b2b] text-lg">
      {item.type == "track" && (
        <button
          onClick={handleAddTrackToCalendar}
          className="w-full text-end hover:font-bold hover:underline"
        >
          ADD TO CALENDAR
        </button>
      )}
      <button
        onClick={
          item.type == "track"
            ? handleAddTrack
            : item.type == "album"
              ? handleAddAlbum
              : handleAddArtist
        }
        className="w-full text-end hover:font-bold hover:underline"
      >
        ADD TO BOOKLET
      </button>
      <Link
        to={`/artist/${item.artists[0].id}`}
        className="w-full text-end hover:font-bold hover:underline"
      >
        GO TO ARTIST
      </Link>
      {(item.type == "track" || item.type == "album") && (
        <Link
          to={`/album/${item.album.id}`}
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

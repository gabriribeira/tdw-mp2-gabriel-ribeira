import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  useAddArtistMutation,
  useAddAlbumMutation,
  useAddTrackMutation,
  useAddCalendarMutation,
  useRemoveCalendarMutation,
  useRemoveArtistMutation,
  useRemoveAlbumMutation,
  useRemoveTrackMutation,
} from "../app/api";
import { useSelector } from "react-redux";

const AddToModal = ({
  item,
  itemDb,
  calendar,
  booklet,
  setEmmeModal,
  setSuccessNotification,
  setReload,
}) => {
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
  const [removeArtist, { isLoading: isRemovingArtist }] =
    useRemoveArtistMutation();
  //eslint-disable-next-line
  const [addAlbum, { isLoading: isAddingAlbum }] = useAddAlbumMutation();
  //eslint-disable-next-line
  const [removeAlbum, { isLoading: isRemovingAlbum }] =
    useRemoveAlbumMutation();
  //eslint-disable-next-line
  const [addTrack, { isLoading: isAddingTrack }] = useAddTrackMutation();
  //eslint-disable-next-line
  const [removeTrack, { isLoading: isRemovingTrack }] =
    useRemoveTrackMutation();
  //eslint-disable-next-line
  const [addTrackToCalendar, { isLoading: isAddingTrackToCalendar }] =
    useAddCalendarMutation();
  //eslint-disable-next-line
  const [removeTrackFromCalendar, { isLoading: isRemovingTrackFromCalendar }] =
    useRemoveCalendarMutation();

  const handleAddArtist = async () => {
    await addArtist({ user_id, artist_id: itemToAdd.id });
    setSuccessNotification("Artist added to booklet");
  };

  const handleRemoveArtist = async () => {
    await removeArtist({ user_id, artist_id: itemToAdd.id });
    setReload(true);
    setSuccessNotification("Artist removed from booklet");
  };

  const handleAddAlbum = async () => {
    await addAlbum({ user_id, album_id: itemToAdd.id });
    setSuccessNotification("Album added to booklet");
  };

  const handleRemoveAlbum = async () => {
    await removeAlbum({ user_id, album_id: itemToAdd.id });
    setReload(true);
    setSuccessNotification("Album removed from booklet");
  };

  const handleAddTrack = async () => {
    await addTrack({ user_id, track_id: itemToAdd.id });
    setSuccessNotification("Track added to booklet");
  };

  const handleRemoveTrack = async () => {
    await removeTrack({ user_id, track_id: itemToAdd.id });
    setReload(true);
    setSuccessNotification("Track removed from booklet");
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
    setSuccessNotification("Track added to Calendar");
  };

  const handleRemoveTrackCalendar = () => {
    removeTrackFromCalendar({
      user_id,
      entry_date: itemDb.entry_date,
    });
  };

  return (
    <div
      className={
        calendar
          ? "z-[101] bg-white absolute bottom-0 right-0 w-auto h-auto flex md:p-3 p-1 md:pt-8 pt-6 flex flex-col items-end text-preto md:text-lg text-sm w-[150%] z-[104]"
          : "z-[101] bg-white absolute xl:top-5 xl:right-3 lg:top-3 lg:right-1 md:top-2 md:right-1 top-0 right-0 w-auto h-auto flex md:p-3 p-2 md:pt-8 pt-6 flex flex-col items-end text-preto md:text-lg text-md"
      }
    >
      {(itemType == "track" || itemType == "playlistTrack") && (
        <button
          onClick={() => setEmmeModal(item)}
          className="w-full text-end hover:font-bold hover:underline"
        >
          SEND EMME
        </button>
      )}
      {(itemType == "track" || itemType == "playlistTrack") && !calendar && (
        <button
          onClick={handleAddTrackToCalendar}
          className="w-full text-end hover:font-bold hover:underline"
        >
          ADD TO CALENDAR
        </button>
      )}
      {calendar && (
        <button
          onClick={() => {
            handleRemoveTrackCalendar();
            setReload(true);
          }}
          className="w-full text-end hover:font-bold hover:underline"
        >
          REMOVE FROM CALENDAR
        </button>
      )}
      {booklet && (
        <button
          onClick={
            itemType == "track"
              ? handleRemoveTrack
              : itemType == "album"
                ? handleRemoveAlbum
                : handleRemoveArtist
          }
          className="w-full text-end hover:font-bold hover:underline"
        >
          REMOVE FROM BOOKLET
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
  itemDb: PropTypes.object,
  calendar: PropTypes.bool,
  booklet: PropTypes.bool,
  setEmmeModal: PropTypes.func,
  setSuccessNotification: PropTypes.func,
  setReload: PropTypes.func,
};

export default AddToModal;

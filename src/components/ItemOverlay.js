import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import AddToModal from "./AddToModal";
import DefaultImage from "../assets/default.jpg";
import { AiOutlinePause } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";

const ItemOverlay = ({
  item,
  trackModal,
  setTrackModal,
  track,
  playTrack,
  pauseTrack,
  playing,
}) => {
  const [itemType, setItemType] = useState(null);
  useEffect(() => {
    if (item.track) {
      setItemType("playlistTrack");
    } else if (item.type == "track") {
      setItemType("track");
    } else if (item.type == "album") {
      setItemType("album");
    } else if (item.type == "artist") {
      setItemType("artist");
    }
  }, [item]);

  return (
    itemType && (
      <div
        key={itemType == "playlistTrack" ? item.track.id : item.id}
        className={
          itemType == "playlistTrack"
            ? "flex flex-col col-span-1 group relative"
            : "xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] relative flex flex-col group"
        }
      >
        <div
          className="group-hover:block hidden transition-all duration-[0.2s] absolute hidden w-full h-full p-3 z-[10]"
          onMouseEnter={() => setTrackModal(null)}
        >
          <div className="flex flex-col items-start text-xl text-left">
            {itemType == "playlistTrack" && (
              <Link
                to={`/album/${item.track.album.id}`}
                className="uppercase font-bold cursor-pointer z-[100]"
              >
                {item.track.name}
              </Link>
            )}
            {itemType == "track" && (
              <Link
                to={`/album/${item.album.id}`}
                className="uppercase font-bold cursor-pointer z-[100]"
              >
                {item.name}
              </Link>
            )}
            {itemType == "album" && (
              <Link
                to={`/album/${item.id}`}
                className="uppercase font-bold cursor-pointer z-[100]"
              >
                {item.name}
              </Link>
            )}
            {itemType == "artist" && (
              <Link
                to={`/artist/${item.id}`}
                className="uppercase font-bold cursor-pointer z-[100]"
              >
                {item.name}
              </Link>
            )}
            {itemType == "playlistTrack" && (
              <Link
                to={`/artist/${item.track.artists[0].id}`}
                className="uppercase cursor-pointer z-[100]"
              >
                {item.track.artists[0].name}
              </Link>
            )}
            {itemType == "track" ||
              (itemType == "album" && (
                <Link
                  to={`/artist/${item.artists[0].id}`}
                  className="uppercase cursor-pointer z-[100]"
                >
                  {item.artists[0].name}
                </Link>
              ))}
          </div>
          <button
            onClick={() =>
              trackModal
                ? setTrackModal(null)
                : setTrackModal(itemType == "playlistTrack" ? item.track : item)
            }
            className="absolute top-5 right-5 text-4xl z-[102]"
          >
            <RxDotsHorizontal />
          </button>
          {trackModal &&
            trackModal.id ==
              (itemType == "playlistTrack" ? item.track.id : item.id) && (
              <AddToModal
                item={itemType == "playlistTrack" ? item.track : item}
              />
            )}
          <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
            {(itemType == "playlistTrack" || itemType == "track") &&
              (itemType == "playlistTrack"
                ? item.track.preview_url
                : item.preview_url) &&
              (itemType == "playlistTrack" ? (
                <button
                  onClick={() => {
                    playing && track == item.track.preview_url
                      ? pauseTrack()
                      : playTrack(item.track.preview_url);
                  }}
                  className="text-6xl"
                >
                  {playing && track == item.track.preview_url ? (
                    <AiOutlinePause />
                  ) : (
                    <CiPlay1 />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => {
                    playing && track == item.preview_url
                      ? pauseTrack()
                      : playTrack(item.preview_url);
                  }}
                  className="text-6xl"
                >
                  {playing && track == item.preview_url ? (
                    <AiOutlinePause />
                  ) : (
                    <CiPlay1 />
                  )}
                </button>
              ))}
          </div>
        </div>
        {itemType == "playlistTrack" && (
          <img
            src={
              item.track.album.images[0]
                ? item.track.album.images[0].url
                : DefaultImage
            }
            alt={item.track.album.name}
            className="group-hover:opacity-50 transition-all duration-[0.2s]"
          />
        )}
        {itemType == "track" && (
          <img
            src={item.album.images[0] ? item.album.images[0].url : DefaultImage}
            alt={item.album.name}
            className="group-hover:opacity-50 transition-all duration-[0.2s] h-full object-cover w-full"
          />
        )}
        {itemType == "album" && (
          <img
            src={item.images[0] ? item.images[0].url : DefaultImage}
            alt={item.name}
            className="group-hover:opacity-50 transition-all duration-[0.2s] h-full object-cover w-full"
          />
        )}
        {itemType == "artist" && (
          <img
            src={item.images[0] ? item.images[0].url : DefaultImage}
            alt={item.name}
            className="group-hover:opacity-50 transition-all duration-[0.2s] h-full object-cover w-full"
          />
        )}

        {itemType == "playlistTrack" &&
          item.track.preview_url &&
          track == item.track.preview_url && (
            <img
              src={item.track.album.images[0].url}
              alt={item.track.album.name}
              className="absolute top-0 left-0 w-full h-full group-hover:opacity-50 rounded-full animate-spinner transition-all duration-[0.2s]"
            />
          )}
        {itemType == "track" &&
          item.preview_url &&
          track == item.preview_url && (
            <img
              src={item.album.images[0].url}
              alt={item.album.name}
              className="absolute top-0 left-0 w-full h-full group-hover:opacity-50 rounded-full animate-spinner transition-all duration-[0.2s]"
            />
          )}
      </div>
    )
  );
};

ItemOverlay.propTypes = {
  item: PropTypes.object.isRequired,
  trackModal: PropTypes.object,
  setTrackModal: PropTypes.func,
  playTrack: PropTypes.func,
  pauseTrack: PropTypes.func,
  track: PropTypes.string,
  playing: PropTypes.bool,
};

export default ItemOverlay;

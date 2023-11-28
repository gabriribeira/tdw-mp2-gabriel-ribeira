import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";
import DefaultImage from "../assets/default.jpg";
import { Link } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import AddToModal from "./AddToModal";

const HomepageGrid = (props) => {
  const data = props.data;
  console.log(data);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  const [trackModal, setTrackModal] = useState(null);

  function playTrack(track) {
    if (audioRef.current) {
      setTrack(track);
      setPlaying(true);

      audioRef.current.pause();
      audioRef.current.src = track;
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setPlaying(false);
      });
    }
  }

  function pauseTrack() {
    setPlaying(false);
    setTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 relative">
      {data &&
        data.items.map((item) => (
          <div
            key={item.track.id}
            className="flex flex-col col-span-1 group relative"
          >
            <div
              className="group-hover:block hidden transition-all duration-[0.2s] absolute hidden w-full h-full p-3 z-[10]"
              onMouseEnter={() => setTrackModal(null)}
            >
              <div className="flex flex-col items-start text-xl text-left">
                <Link
                  to={`/album/${item.track.album.id}`}
                  className="uppercase font-bold cursor-pointer z-[100]"
                >
                  {item.track.name}
                </Link>
                <Link
                  to={`/artist/${item.track.artists[0].id}`}
                  className="uppercase cursor-pointer z-[100]"
                >
                  {item.track.artists[0].name}
                </Link>
              </div>
              <button
                onClick={() =>
                  trackModal ? setTrackModal(null) : setTrackModal(item.track)
                }
                className="absolute top-5 right-5 text-4xl z-[102]"
              >
                <RxDotsHorizontal />
              </button>
              {trackModal && trackModal.id == item.track.id && (
                <AddToModal item={item.track} />
              )}
              <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                {item.track.preview_url && (
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
                )}
              </div>
              <div className="flex justify-end"></div>
            </div>
            <img
              src={
                item.track.album.images[0]
                  ? item.track.album.images[0].url
                  : DefaultImage
              }
              alt={item.track.album.name}
              className="group-hover:opacity-50 transition-all duration-[0.2s]"
            />
            {item.track.preview_url && track == item.track.preview_url && (
              <img
                src={item.track.album.images[0].url}
                alt={item.track.album.name}
                className="absolute top-0 left-0 w-full h-full group-hover:opacity-50 rounded-full animate-spinner transition-all duration-[0.2s]"
              />
            )}
          </div>
        ))}
      <audio
        ref={audioRef}
        controls={false}
        type="audio/mpeg"
        className=""
        onEnded={pauseTrack}
      ></audio>
    </div>
  );
};

HomepageGrid.propTypes = {
  data: PropTypes.object,
};

export default HomepageGrid;

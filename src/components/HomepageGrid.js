import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";

const HomepageSlider = (props) => {
  const data = props.data;
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  function playTrack(track) {
    setTrack(track);
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track; // Set the source to the new track
      audioRef.current.load(); // Load the new audio track
      audioRef.current.play().catch((error) => console.error(error));
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
            <div className="group-hover:block hidden transition-all duration-[0.2s] absolute hidden w-full h-full p-5 z-[10]">
              <div className="flex flex-col items-start font-bold text-2xl text-left">
                <p>{item.track.name}</p>
                <p>{item.track.artists[0].name}</p>
              </div>
              <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                {item.track.preview_url && (
                  <button
                    onClick={() => {
                      playing
                        ? pauseTrack()
                        : playTrack(item.track.preview_url);
                    }}
                    className="text-6xl"
                  >
                    {playing ? <AiOutlinePause /> : <CiPlay1 />}
                  </button>
                )}
              </div>
              <div className="flex justify-end"></div>
            </div>
            <img
              src={item.track.album.images[0].url}
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
      ></audio>
    </div>
  );
};

HomepageSlider.propTypes = {
  data: PropTypes.object,
};

export default HomepageSlider;

import React, { useState, useRef } from "react";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";
import PropTypes from "prop-types";

const AlbumDetails = ({ tracks }) => {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);

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
    <div className="flex flex-col justify-end lg:p-10 md:p-5 p-2 bg-[#2b2b2b]">
      {tracks &&
        tracks.tracks.items.map((result) => (
          <div
            key={result.id}
            className="relative flex items-center w-full justify-between py-1 text-white/50 hover:text-white"
          >
            <div className="flex flex-col items-start text-xl text-left">
              <p>{result.name}</p>
            </div>
            {result.preview_url && (
              <button
                onClick={() => {
                  playing && track == result.preview_url
                    ? pauseTrack()
                    : playTrack(result.preview_url);
                }}
                className="text-2xl"
              >
                {playing && track == result.preview_url ? (
                  <AiOutlinePause />
                ) : (
                  <CiPlay1 />
                )}
              </button>
            )}
          </div>
        ))}
      <audio
        ref={audioRef}
        onEnded={() => {
          setPlaying(false);
          setTrack(null);
        }}
      />
    </div>
  );
};

AlbumDetails.propTypes = {
  tracks: PropTypes.object,
};

export default AlbumDetails;

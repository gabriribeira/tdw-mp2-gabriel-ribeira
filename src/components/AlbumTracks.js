import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";

const AlbumTracks = ({ tracks, setIsPlaying }) => {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  function playTrack(track) {
    if (audioRef.current) {
      setTrack(track);
      setPlaying(true);
      setIsPlaying(true);
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
    setIsPlaying(false);
    setTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  return (
    <div className="flex flex-col justify-end p-10 pt-0">
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
        controls={false}
        type="audio/mpeg"
        className=""
        onEnded={pauseTrack}
      ></audio>
    </div>
  );
};

AlbumTracks.propTypes = {
  tracks: PropTypes.object,
  setIsPlaying: PropTypes.func,
};

export default AlbumTracks;

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";
import { Link } from "react-router-dom";

const ArtistTopTracks = ({ topTracksData, setIsPlaying }) => {
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
    <div className="flex flex-col justify-end lg:p-10 p-5 pt-0 max-h-[50%]">
      {topTracksData &&
        topTracksData.tracks.map(
          (result, index) =>
            index < 5 && (
              <div
                key={result.id}
                className="relative flex items-center w-full justify-between lg:py-1 py-2 text-white/50 hover:text-white"
              >
                <div className="flex flex-col items-start lg:text-xl text-md text-left">
                  <Link to={`/album/${result.album.id}`}>{result.name}</Link>
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
            ),
        )}
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

ArtistTopTracks.propTypes = {
  topTracksData: PropTypes.object,
  setIsPlaying: PropTypes.func,
};

export default ArtistTopTracks;

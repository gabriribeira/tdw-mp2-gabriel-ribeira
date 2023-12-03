import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePause } from "react-icons/ai";
import PropTypes from "prop-types";

const AlbumDetails = ({ tracks, isPlaying, playTrack, pauseTrack, track }) => {
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
                  isPlaying && track == result.preview_url
                    ? pauseTrack()
                    : playTrack(result.preview_url);
                }}
                className="text-2xl"
              >
                {isPlaying && track == result.preview_url ? (
                  <AiOutlinePause />
                ) : (
                  <CiPlay1 />
                )}
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

AlbumDetails.propTypes = {
  tracks: PropTypes.object,
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  playTrack: PropTypes.func,
  pauseTrack: PropTypes.func,
  track: PropTypes.string,
  setTrack: PropTypes.func,
};

export default AlbumDetails;

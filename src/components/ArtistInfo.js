import React, { useState } from "react";
import PropTypes from "prop-types";
import DefaultImage from "../assets/default.jpg";
import ArtistTopTracks from "./ArtistTopTracks";

//eslint-disable-next-line
const ArtistInfo = ({ artistData, topTracksData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    artistData && (
      <div className="flex w-full">
        <div className="w-[50vw] h-[50vw] relative">
          <img
            src={artistData.images[0] ? artistData.images[0].url : DefaultImage}
            alt={artistData.name}
            className="w-full object-cover h-full"
          />
          {isPlaying && (
            <img
              src={
                artistData.images[0] ? artistData.images[0].url : DefaultImage
              }
              alt={artistData.name}
              className="absolute w-full object-cover rounded-full h-full top-0 left-0 animate-spinner"
            />
          )}
        </div>
        <div className="w-[50vw] h-[50vw] bg-[#2b2b2b] flex flex-col justify-between">
          <h1 className="text-white font-bold text-[9rem] leading-none uppercase pl-10 pt-5">
            {artistData.name}
          </h1>
          <ArtistTopTracks
            topTracksData={topTracksData}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    )
  );
};

ArtistInfo.propTypes = {
  artistData: PropTypes.object,
};

export default ArtistInfo;

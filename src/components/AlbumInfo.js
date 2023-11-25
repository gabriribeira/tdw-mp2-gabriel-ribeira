import React, { useState } from "react";
import PropTypes from "prop-types";
import DefaultImage from "../assets/default.jpg";
import AlbumTracks from "./AlbumTracks";

const AlbumInfo = ({ albumData }) => {
  console.log(albumData);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    albumData && (
      <div className="flex w-full">
        <div className="w-[50vw] h-[50vw] relative">
          <img
            src={albumData.images[0] ? albumData.images[0].url : DefaultImage}
            alt={albumData.name}
            className="w-full object-cover h-full"
          />
          {isPlaying && (
            <img
              src={albumData.images[0] ? albumData.images[0].url : DefaultImage}
              alt={albumData.name}
              className="absolute w-full object-cover rounded-full h-full top-0 left-0 animate-spinner"
            />
          )}
        </div>
        <div className="w-[50vw] h-[50vw] bg-[#2b2b2b] flex flex-col justify-between">
          <h1 className="text-white font-bold text-[9rem] leading-none uppercase pl-10 pt-5">
            {albumData.name}
          </h1>
          <AlbumTracks tracks={albumData} setIsPlaying={setIsPlaying} />
        </div>
      </div>
    )
  );
};

AlbumInfo.propTypes = {
  albumData: PropTypes.object,
};

export default AlbumInfo;

import React from "react";
import PropTypes from "prop-types";
import DefaultImage from "../assets/default.jpg";
import { Link } from "react-router-dom";

const AlbumInfo = ({ albumData, isPlaying }) => {
  return (
    albumData && (
      <div className="flex lg:flex-row flex-col w-full">
        <div className="lg:w-[50vw] lg:h-[50vw] h-[50vh] relative">
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
        <div className="lg:w-[50vw] lg:h-[50vw] bg-[#2b2b2b] flex flex-col text-white">
          <h1 className=" font-bold xl:text-[8rem] md:text-[6rem] text-[3rem] leading-none uppercase lg:pl-10 md:pl-5 pl-2 pt-5 w-full">
            {albumData.name}
          </h1>
          <Link
            to={`/artist/${albumData.artists[0].id}`}
            className="uppercase md:text-3xl text-xl lg:pl-10 md:pl-5 pl-2"
          >
            BY {albumData.artists[0].name}
          </Link>
        </div>
      </div>
    )
  );
};

AlbumInfo.propTypes = {
  albumData: PropTypes.object,
  isPlaying: PropTypes.bool,
};

export default AlbumInfo;

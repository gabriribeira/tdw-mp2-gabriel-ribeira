import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DefaultImage from "../assets/default.jpg";
import ArtistTopTracks from "./ArtistTopTracks";

//eslint-disable-next-line
const ArtistInfo = ({ artistData, topTracksData }) => {
  useEffect(() => {
    console.log(artistData);
  }, [artistData]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    artistData && (
      <div className="flex lg:flex-row flex-col w-full h-auto">
        <div className="lg:w-[50vw] lg:h-[50vw] w-screen h-[50vh] relative">
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
        <div className="lg:w-[50vw] lg:h-[50vw] w-screen h-full bg-[#2b2b2b] flex flex-col justify-between">
          <h1 className="text-white font-bold lg:text-[8rem] text-[5rem] w-full h-full leading-none tracking-tight uppercase lg:pl-10 pl-5 pt-5 line-clamp-4 align-top max-h-[60%]">
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

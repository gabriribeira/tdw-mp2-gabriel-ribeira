import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default.jpg";

const ArtistAlbums = ({ albumsData }) => {
  //console.log(albumsData);
  return (
    albumsData && (
      <div className="bg-[#2b2b2b] w-full">
        {albumsData && albumsData.items.length > 0 && (
          <div className="overflow-x-scroll">
            <div
              className={`flex`}
              style={{ width: `${albumsData.items.length * 15}vw` }}
            >
              {albumsData &&
                albumsData.items.map((result) => (
                  <Link
                    key={result.id}
                    className="w-[15vw] h-[15vw] relative flex justify-center items-center"
                    to={`/album/${result.id}`}
                  >
                    <img
                      src={
                        result.images[0] ? result.images[0].url : DefaultImage
                      }
                      alt={result.name}
                      className="object-cover absolute w-full h-full top-0 left-0"
                    />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

ArtistAlbums.propTypes = {
  albumsData: PropTypes.object,
};

export default ArtistAlbums;

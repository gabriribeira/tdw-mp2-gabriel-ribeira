import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default.jpg";
import useWindowSize from "../hooks/useWindowSize";

const ArtistAlbums = ({ albumsData }) => {
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  return (
    albumsData && (
      <div className="bg-[#2b2b2b] w-full">
        {albumsData && albumsData.items.length > 0 && (
          <div className="overflow-x-scroll">
            <div
              className={`flex`}
              style={{
                width: `${
                  albumsData.items.length *
                  (isMobile ? 45 : isTablet ? 35 : isDesktop ? 24 : 15)
                }vw`,
              }}
            >
              {albumsData &&
                albumsData.items.map((result) => (
                  <Link
                    key={result.id}
                    className="xl:w-[15vw] xl:h-[15vw] lg:w-[24vw] lg:h-[24vw] md:w-[35vw] md:h-[35vw] w-[45vw] h-[45vw] relative flex justify-center items-center"
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

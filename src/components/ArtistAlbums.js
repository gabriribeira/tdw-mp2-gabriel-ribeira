import React, { useState } from "react";
import PropTypes from "prop-types";
import useWindowSize from "../hooks/useWindowSize";
import ItemOverlay from "./ItemOverlay";

const ArtistAlbums = ({ albumsData }) => {
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const [trackModal, setTrackModal] = useState(null);
  return (
    albumsData && (
      <div className="bg-preto w-full">
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
                albumsData.items.map((result, index) => (
                  <ItemOverlay
                    key={index}
                    item={result}
                    trackModal={trackModal}
                    setTrackModal={setTrackModal}
                  />
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

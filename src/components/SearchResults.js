import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useWindowSize from "../hooks/useWindowSize";
import ItemOverlay from "./ItemOverlay";

const SearchResults = (props) => {
  const results = props.data;
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const [trackModal, setTrackModal] = useState(null);
  function playTrack(track) {
    if (audioRef.current) {
      setTrack(track);
      setPlaying(true);

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
    setTrack(null);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  return (
    <div className="flex flex-col w-full">
      {results && results.artists.items.length > 0 && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
            ARTISTS
          </div>
          <div
            className={`flex`}
            style={{
              width: `${
                results.artists.items.length *
                (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15)
              }vw`,
            }}
          >
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
              <h1 className="-rotate-90">ARTISTS</h1>
            </div>
            {results &&
              results.artists.items.map((result, index) => (
                <ItemOverlay
                  key={index}
                  item={result}
                  trackModal={trackModal}
                  setTrackModal={setTrackModal}
                  track={track}
                  playTrack={playTrack}
                  pauseTrack={pauseTrack}
                  playing={playing}
                />
              ))}
          </div>
        </div>
      )}
      {results && results.albums.items.length > 1 && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
            ALBUMS
          </div>
          <div
            className={`flex`}
            style={{
              width: `${
                results.albums.items.length *
                (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15)
              }vw`,
            }}
          >
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
              <h1 className="-rotate-90">ALBUMS</h1>
            </div>
            {results &&
              results.albums.items.map((result, index) => (
                <ItemOverlay
                  key={index}
                  item={result}
                  trackModal={trackModal}
                  setTrackModal={setTrackModal}
                  track={track}
                  playTrack={playTrack}
                  pauseTrack={pauseTrack}
                  playing={playing}
                />
              ))}
          </div>
        </div>
      )}
      {results && results.tracks.items.length > 1 && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
            TRACKS
          </div>
          <div
            className={`flex`}
            style={{
              width: `${
                results.tracks.items.length *
                (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15)
              }vw`,
            }}
          >
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
              <h1 className="-rotate-90">TRACKS</h1>
            </div>
            {results &&
              results.tracks.items.map((result, index) => (
                <ItemOverlay
                  key={index}
                  item={result}
                  trackModal={trackModal}
                  setTrackModal={setTrackModal}
                  track={track}
                  playTrack={playTrack}
                  pauseTrack={pauseTrack}
                  playing={playing}
                />
              ))}
          </div>
        </div>
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
SearchResults.propTypes = {
  data: PropTypes.object,
};
export default SearchResults;

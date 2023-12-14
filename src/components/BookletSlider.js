import React, { useState, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
import {
  useGetArtistByIdQuery,
  useGetAlbumByIdQuery,
  useGetTrackByIdQuery,
} from "../app/spotifyApi";
import PropTypes from "prop-types";
import ItemOverlay from "./ItemOverlay";

const BookletSlider = ({ tracksb, albumsb, artistsb, setReload }) => {
  const { data: artists } = useGetArtistByIdQuery(artistsb, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: albums } = useGetAlbumByIdQuery(albumsb, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });
  const { data: tracks } = useGetTrackByIdQuery(tracksb, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

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
    (tracksb || albumsb || artistsb) && (
      <div className="flex flex-col w-full">
        {artists && artistsb && (
          <div className="overflow-x-scroll">
            <div className="lg:hidden flex justify-start items-center font-bold text-4xl bg-white">
              ARTISTS
            </div>
            <div
              className={`flex`}
              style={{
                width: `${
                  artists.artists.length *
                    (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15) +
                  (isMobile ? 0 : isTablet ? 0 : isDesktop ? 20 : 15)
                }vw`,
              }}
            >
              <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
                <h1 className="-rotate-90">ARTISTS</h1>
              </div>
              {artists &&
                artists.artists.map((result, index) => (
                  <ItemOverlay
                    key={index}
                    item={result}
                    trackModal={trackModal}
                    setTrackModal={setTrackModal}
                    track={track}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    playing={playing}
                    booklet={true}
                    setReload={setReload}
                  />
                ))}
            </div>
          </div>
        )}
        {albums && albumsb && (
          <div className="overflow-x-scroll">
            <div className="lg:hidden flex justify-start items-center font-bold text-4xl bg-white">
              ALBUMS
            </div>
            <div
              className={`flex`}
              style={{
                width: `${
                  albums.albums.length *
                    (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15) +
                  (isMobile ? 0 : isTablet ? 0 : isDesktop ? 20 : 15)
                }vw`,
              }}
            >
              <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
                <h1 className="-rotate-90">ALBUMS</h1>
              </div>
              {albums &&
                albums.albums.map((result, index) => (
                  <ItemOverlay
                    key={index}
                    item={result}
                    trackModal={trackModal}
                    setTrackModal={setTrackModal}
                    track={track}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    playing={playing}
                    booklet={true}
                    setReload={setReload}
                  />
                ))}
            </div>
          </div>
        )}
        {tracks && tracksb && (
          <div className="overflow-x-scroll">
            <div className="lg:hidden flex justify-start items-center font-bold text-4xl bg-white">
              TRACKS
            </div>
            <div
              className={`flex`}
              style={{
                width: `${
                  tracks.tracks.length *
                    (isMobile ? 50 : isTablet ? 35 : isDesktop ? 20 : 15) +
                  (isMobile ? 0 : isTablet ? 0 : isDesktop ? 20 : 15)
                }vw`,
              }}
            >
              <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-preto">
                <h1 className="-rotate-90">TRACKS</h1>
              </div>
              {tracks &&
                tracks.tracks.map((result, index) => (
                  <ItemOverlay
                    key={index}
                    item={result}
                    trackModal={trackModal}
                    setTrackModal={setTrackModal}
                    track={track}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    playing={playing}
                    booklet={true}
                    setReload={setReload}
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
    )
  );
};

BookletSlider.propTypes = {
  tracksb: PropTypes.string,
  albumsb: PropTypes.string,
  artistsb: PropTypes.string,
  setReload: PropTypes.func.isRequired,
};

export default BookletSlider;

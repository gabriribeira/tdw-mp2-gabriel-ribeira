import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../assets/default.jpg";
import useWindowSize from "../hooks/useWindowSize";
import {
  useGetArtistByIdQuery,
  useGetAlbumByIdQuery,
  useGetTrackByIdQuery,
} from "../app/spotifyApi";
import PropTypes from "prop-types";
import { AiOutlinePause } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";

const BookletSlider = ({ tracksb, albumsb, artistsb }) => {
  const { data: artists } = useGetArtistByIdQuery(artistsb);
  const { data: albums } = useGetAlbumByIdQuery(albumsb);
  const { data: tracks } = useGetTrackByIdQuery(tracksb);

  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  const { isMobile, isTablet, isDesktop } = useWindowSize();
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
      {artists && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
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
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-[#2b2b2b]">
              <h1 className="-rotate-90">ARTISTS</h1>
            </div>
            {artists &&
              artists.artists.map((result) => (
                <Link
                  key={result.id}
                  className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] relative flex justify-center items-center"
                  to={`/artist/${result.id}`}
                >
                  <img
                    src={result.images[0] ? result.images[0].url : DefaultImage}
                    alt={result.name}
                    className="object-cover absolute w-full h-full top-0 left-0"
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
      {albums && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
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
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-[#2b2b2b]">
              <h1 className="-rotate-90">ALBUMS</h1>
            </div>
            {albums &&
              albums.albums.map((result) => (
                <Link
                  key={result.id}
                  className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] relative flex justify-center items-center"
                  to={`/album/${result.id}`}
                >
                  <img
                    src={result.images[0] ? result.images[0].url : DefaultImage}
                    alt={result.name}
                    className="object-cover absolute w-full h-full top-0 left-0"
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
      {tracks && (
        <div className="overflow-x-scroll">
          <div className="lg:hidden flex justify-start items-center font-bold text-4xl">
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
            <div className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] hidden bg-white relative lg:flex justify-center items-center text-4xl font-bold border-b-2 border-[#2b2b2b]">
              <h1 className="-rotate-90">TRACKS</h1>
            </div>
            {tracks &&
              tracks.tracks.map((result) => (
                <div
                  key={result.id}
                  className="xl:w-[15vw] xl:h-[15vw] lg:w-[20vw] lg:h-[20vw] md:w-[35vw] md:h-[35vw] w-[50vw] h-[50vw] relative flex justify-center items-center group"
                >
                  <div className="group-hover:block hidden transition-all duration-[0.2s] absolute hidden w-full h-full p-5 z-[10]">
                    <Link
                      className="flex flex-col items-start font-bold text-2xl text-left z-[50]"
                      to={`/album/${result.album.id}`}
                    >
                      <p>{result.name}</p>
                      <p>{result.artists[0].name}</p>
                    </Link>
                    <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                      {result.preview_url && (
                        <button
                          onClick={() => {
                            playing && track == result.preview_url
                              ? pauseTrack()
                              : playTrack(result.preview_url);
                          }}
                          className="text-6xl"
                        >
                          {playing && track == result.preview_url ? (
                            <AiOutlinePause />
                          ) : (
                            <CiPlay1 />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  <img
                    src={
                      result.album.images[0]
                        ? result.album.images[0].url
                        : DefaultImage
                    }
                    alt={result.name}
                    className="object-cover absolute w-full h-full top-0 left-0 group-hover:opacity-50 transition-all duration-[0.2s]"
                  />
                  {result.preview_url && track == result.preview_url && (
                    <img
                      src={result.album.images[0].url}
                      alt={result.album.name}
                      className="absolute top-0 left-0 w-full h-full group-hover:opacity-50 rounded-full animate-spinner transition-all duration-[0.2s]"
                    />
                  )}
                </div>
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

BookletSlider.propTypes = {
  tracksb: PropTypes.string.isRequired,
  albumsb: PropTypes.string.isRequired,
  artistsb: PropTypes.string.isRequired,
};

export default BookletSlider;

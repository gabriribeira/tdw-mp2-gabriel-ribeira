import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import AlbumInfo from "../components/AlbumInfo";
import { useGetAlbumByIdSingularQuery } from "../app/spotifyApi";
import AlbumDetails from "../components/AlbumDetails";

const Album = () => {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);

  //eslint-disable-next-line
  const { data: albumsData, error: artistError } =
    useGetAlbumByIdSingularQuery(id);

  useEffect(() => {
    document.title = albumsData
      ? "MEEM - " + albumsData.name.toUpperCase()
      : "MEEM - ALBUM";
  }, [albumsData]);

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
    <div className="bg-preto min-h-screen">
      <Navbar />
      <AlbumInfo albumData={albumsData} isPlaying={playing} />
      <AlbumDetails
        tracks={albumsData}
        isPlaying={playing}
        setIsPlaying={setPlaying}
        playTrack={playTrack}
        pauseTrack={pauseTrack}
        track={track}
        setTrack={setTrack}
      />
      <audio
        ref={audioRef}
        onEnded={() => {
          setPlaying(false);
          setTrack(null);
        }}
      />
    </div>
  );
};

export default Album;

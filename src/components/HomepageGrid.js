import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ItemOverlay from "./ItemOverlay";

const HomepageGrid = (props) => {
  const data = props.data;
  console.log(data);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
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
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 relative">
      {data &&
        data.items.map((item, index) => (
          <ItemOverlay
            key={index}
            item={item}
            trackModal={trackModal}
            setTrackModal={setTrackModal}
            track={track}
            playTrack={playTrack}
            pauseTrack={pauseTrack}
            playing={playing}
          />
        ))}
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

HomepageGrid.propTypes = {
  data: PropTypes.object,
};

export default HomepageGrid;

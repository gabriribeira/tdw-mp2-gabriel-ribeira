import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../app/api";
import ItemOverlay from "./ItemOverlay";
import { GrAddCircle } from "react-icons/gr";
import FeedbackModal from "./FeedbackModal";

const MeemsList = ({ items, data }) => {
  useEffect(() => {
    console.log(data);
    console.log(items);
  }, [data, items]);

  const { data: sender } = useGetUserByIdQuery(
    data?.map((element) => element.sender_id),
  );

  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const audioRef = useRef(null);
  const [trackModal, setTrackModal] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(null);

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
    sender &&
    items &&
    data && (
      <div className="flex flex-col bg-[#2b2b2b] h-full">
        {items.tracks.map((item, index) => (
          <div key={item.id} className="grid grid-cols-3">
            <div className="col-span-1 relative">
              <ItemOverlay
                key={index}
                item={item}
                trackModal={trackModal}
                setTrackModal={setTrackModal}
                track={track}
                playTrack={playTrack}
                pauseTrack={pauseTrack}
                playing={playing}
                meems={true}
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between text-white lg:p-5 p-0 px-2">
              <div className="flex flex-col">
                <div className="flex items-center relative gap-x-2">
                  <Link
                    to={`/album/${item.album.id}`}
                    className="lg:text-7xl md:text-3xl text-2xl font-bold uppercase"
                  >
                    {item.name}
                  </Link>
                  <div className="relative">
                    <button
                      className="text-2xl relative"
                      onClick={() => setFeedbackModal(index)}
                    >
                      <GrAddCircle />
                    </button>
                    {feedbackModal == index && (
                      <FeedbackModal
                        setFeedbackModal={() => setFeedbackModal(null)}
                        meem={data[index].id}
                      />
                    )}
                  </div>
                </div>
                <Link
                  to={`/artist/${item.artists[0].id}`}
                  className="lg:text-2xl md:text-lg text-sm uppercase"
                >
                  BY {item.artists[0].name}
                </Link>
              </div>
              <div className="flex">
                <p className="lg:text-xl md:text-lg text-sm text-white">
                  {data[index] && data[index].message}
                </p>
              </div>
              <Link
                to={`/users/${sender[index].id}`}
                className="flex items-center gap-x-5"
              >
                <div className="flex items-center gap-x-2 lg:text-xl md:text-lg text-sm uppercase">
                  <img
                    src={"http://localhost:3001" + sender[index].img_url}
                    alt={sender[index].username}
                    className="md:w-7 md:h-7 w-5 h-5 rounded-full object-cover"
                  />
                  <p className="md:block hidden">
                    {sender[index].name} on{" "}
                    {data[index] &&
                      data[index].created_at
                        .split(" ")[0]
                        .split("-")[2]
                        .slice(0, 2) +
                        "/" +
                        data[index].created_at.split(" ")[0].split("-")[1] +
                        "/" +
                        data[index].created_at.split(" ")[0].split("-")[0]}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
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

MeemsList.propTypes = {
  items: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default MeemsList;

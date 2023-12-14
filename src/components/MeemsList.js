import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetUserByIdQuery } from "../app/api";
import ItemOverlay from "./ItemOverlay";
import { GrAddCircle } from "react-icons/gr";
import FeedbackModal from "./FeedbackModal";

const MeemsList = ({ items, data, setReload }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    if (search != "") {
      setSearchResults(
        items.tracks.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
    if (search == "") {
      setSearchResults([]);
    }
  }, [search]);

  const formatDate = (date) => {
    const realDate = new Date();
    const day = realDate.getDate();
    const month = realDate.getMonth() + 1;
    const year = realDate.getFullYear();
    const hour = realDate.getHours();
    const minutes = realDate.getMinutes();

    let formattedDate =
      "ON " +
      date.split(" ")[0].split("-")[2].slice(0, 2) +
      "/" +
      date.split(" ")[0].split("-")[1] +
      "/" +
      date.split(" ")[0].split("-")[0];

    if (
      date.split(" ")[0].split("-")[2].slice(0, 2) == day &&
      date.split(" ")[0].split("-")[1] == month &&
      date.split(" ")[0].split("-")[0] == year
    ) {
      let sentHour = date.split("T")[1].split(":")[0];
      let sentMinutes = date.split("T")[1].split(":")[1];

      if (hour === sentHour && minutes === sentMinutes) {
        formattedDate = "JUST NOW";
      } else if (hour - sentHour === 0) {
        const minutesAgo = minutes - sentMinutes;
        formattedDate = `${minutesAgo} ${
          minutesAgo === 1 ? "MINUTE" : "MINUTES"
        } AGO`;
      } else {
        const hoursAgo = hour - sentHour;
        formattedDate = `${hoursAgo} ${hoursAgo === 1 ? "HOUR" : "HOURS"} AGO`;
      }
    }

    return formattedDate;
  };

  return (
    //Aqui passei-me um bocado
    sender &&
    sender != undefined &&
    sender != "undefined" &&
    sender != "" &&
    sender != [] &&
    sender != null &&
    items != null &&
    items.tracks != null &&
    items.tracks != [] &&
    items.tracks != undefined &&
    items.tracks != "undefined" &&
    items.tracks != "" &&
    items.tracks != " " &&
    items.tracks != "null" &&
    items.tracks != "[]" &&
    items.tracks != "[ ]" &&
    items.tracks != "[null]" &&
    items.tracks != "[null, null]" &&
    items.tracks != "[null, null, null]" &&
    items.tracks != "[null, null, null, null]" &&
    data != null &&
    items != [] && (
      <div className="flex flex-col bg-preto h-full">
        <div className="pt-10 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH FOR MEEMS"
            className=" px-2 w-full border-b-2 border-white bg-transparent text-xl placeholder:text-xl placeholder:text-white/50 text-white focus:outline-none"
          />
        </div>
        {searchResults.length == 0
          ? items.tracks.map((item, index) => (
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
                            setReload={setReload}
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
                    to={`/users/${
                      sender &&
                      sender.filter(
                        (item) => item.id == data[index].sender_id,
                      )[0].id &&
                      sender.filter(
                        (item) => item.id == data[index].sender_id,
                      )[0].id
                    }`}
                    className="flex items-center gap-x-5"
                  >
                    <div className="flex items-center gap-x-2 lg:text-xl md:text-lg text-sm uppercase">
                      <img
                        src={
                          //eslint-disable-next-line
                          process.env.REACT_APP_BACKEND_URL_IMG +
                          (sender &&
                            sender.filter(
                              (item) => item.id == data[index].sender_id,
                            )[0].img_url &&
                            sender.filter(
                              (item) => item.id == data[index].sender_id,
                            )[0].img_url)
                        }
                        alt={
                          sender &&
                          sender.filter(
                            (item) => item.id == data[index].sender_id,
                          )[0].username &&
                          sender.filter(
                            (item) => item.id == data[index].sender_id,
                          )[0].username
                        }
                        className="md:w-7 md:h-7 w-5 h-5 rounded-full object-cover"
                      />
                      <p className="md:block hidden">
                        {sender &&
                          sender.filter(
                            (item) => item.id == data[index].sender_id,
                          )[0].name &&
                          sender.filter(
                            (item) => item.id == data[index].sender_id,
                          )[0].name}{" "}
                        {data[index] && formatDate(data[index].created_at)}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          : searchResults.map((item, index) => (
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
                            setReload={setReload}
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
                        src={
                          //eslint-disable-next-line
                          process.env.REACT_APP_BACKEND_URL_IMG +
                          (sender &&
                            sender[index].img_url &&
                            sender[index].img_url)
                        }
                        alt={
                          sender &&
                          sender[index].username &&
                          sender[index].username
                        }
                        className="md:w-7 md:h-7 w-5 h-5 rounded-full object-cover"
                      />
                      <p className="md:block hidden">
                        {sender && sender[index].name && sender[index].name} on{" "}
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
  items: PropTypes.object,
  data: PropTypes.array,
  setReload: PropTypes.func,
};

export default MeemsList;

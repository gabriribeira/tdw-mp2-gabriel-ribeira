import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useGetEmmesQuery } from "../app/api";
import { useGetTrackByIdQuery } from "../app/spotifyApi";
import { useSelector } from "react-redux";
import MeemsList from "../components/MeemsList";

const Meems = () => {
  const [active, setActive] = useState(0);
  const [meems, setMeems] = useState(null);
  const [liked, setLiked] = useState(null);
  const [disliked, setDisliked] = useState(null);
  const [activeMeems, setActiveMeems] = useState(null);
  const user_id = useSelector((state) => state.auth.user.id);
  //eslint-disable-next-line
  const { data, error, isLoading } = useGetEmmesQuery(user_id);
  const { data: meemsList } = useGetTrackByIdQuery(
    meems && meems?.map((element) => element.track_id),
  );
  const { data: likedList } = useGetTrackByIdQuery(
    liked && liked?.map((element) => element.track_id),
  );
  const { data: dislikedList } = useGetTrackByIdQuery(
    disliked && disliked?.map((element) => element.track_id),
  );

  useEffect(() => {
    if (data) {
      setMeems(data.filter((element) => element.feedback == null));
      setLiked(data.filter((element) => element.feedback == true));
      setDisliked(data.filter((element) => element.feedback == false));
    }
  }, [data]);

  useEffect(() => {
    if (active == 0) {
      if (meemsList) {
        setActiveMeems(meemsList);
      } else {
        setActiveMeems(null);
      }
    } else if (active == 1) {
      if (likedList) {
        setActiveMeems(likedList);
      } else {
        setActiveMeems(null);
      }
    } else if (active == 2) {
      if (dislikedList) {
        setActiveMeems(dislikedList);
      } else {
        setActiveMeems(null);
      }
    }
  }, [active, meemsList, likedList, dislikedList]);

  return (
    <div className="min-h-screen  bg-[#2b2b2b]">
      <Navbar />
      <div className="relative flex sticky xl:top-[10vh] lg:top-[7vh] md:top-[5vh] z-[90] overflow-hidden h-full">
        <div className="w-full border-b-2 border-b-[#2b2b2b] bg-white text-lg focus:outline-none text-[#2b2b2b] pt-10 md:grid md:grid-cols-3 flex overflow-x-scroll justify-around items-center">
          <button
            className={`col-span-1 lg:text-5xl text-3xl font-bold w-full p-2 ${
              active == 0 && "bg-[#2b2b2b] text-white"
            } `}
            onClick={() => setActive(0)}
          >
            MEEMS
          </button>
          <button
            className={`col-span-1 lg:text-5xl text-3xl font-bold w-full p-2 ${
              active == 1 && "bg-[#2b2b2b] text-white"
            }`}
            onClick={() => setActive(1)}
          >
            LIKED
          </button>
          <button
            className={`col-span-1 lg:text-5xl text-3xl font-bold w-full p-2 ${
              active == 2 && "bg-[#2b2b2b] text-white"
            }`}
            onClick={() => setActive(2)}
          >
            DISLIKED
          </button>
        </div>
      </div>
      {data && activeMeems && (
        <MeemsList
          items={activeMeems}
          data={active == 0 ? meems : active == 1 ? liked : disliked}
        />
      )}
    </div>
  );
};

export default Meems;

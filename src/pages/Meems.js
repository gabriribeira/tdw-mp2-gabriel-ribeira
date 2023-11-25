import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Meems = () => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="relative flex sticky xl:top-[10vh] lg:top-[7vh] md:top-[5vh] z-[90] overflow-hidden">
        <div className="w-full border-b-2 border-b-[#2b2b2b] bg-white text-lg focus:outline-none mt-5 text-[#2b2b2b] pt-5 flex justify-around items-center">
          <button
            className={`text-5xl font-bold w-full p-2 ${
              active == 0 && "bg-[#2b2b2b] text-white"
            } `}
            onClick={() => setActive(0)}
          >
            MEEMS
          </button>
          <button
            className={`text-5xl font-bold w-full p-2 ${
              active == 1 && "bg-[#2b2b2b] text-white"
            }`}
            onClick={() => setActive(1)}
          >
            LIKED
          </button>
          <button
            className={`text-5xl font-bold w-full p-2 ${
              active == 2 && "bg-[#2b2b2b] text-white"
            }`}
            onClick={() => setActive(2)}
          >
            DISLIKED
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meems;

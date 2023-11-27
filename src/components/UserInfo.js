import React, { useState } from "react";
import DefaultImage from "../assets/default.jpg";
import { useSelector } from "react-redux";

const UserInfo = () => {
  //eslint-disable-next-line
  const [isPlaying, setIsPlaying] = useState(false);
  const user = useSelector((state) => state.auth.user);
  return (
    user && (
      <div className="flex flex-col w-full h-auto">
        <div className="lg:h-[40vw] w-screen h-[50vh] relative">
          <img
            src={
              user.img_url
                ? "http://localhost:3001" + user.img_url
                : DefaultImage
            }
            alt={"Profile Picture"}
            className="w-full object-cover object-center h-full"
          />
          {isPlaying && (
            <img
              src={
                user.img_url
                  ? "http://localhost:3001" + user.img_url
                  : DefaultImage
              }
              alt={"Profile Picture"}
              className="absolute w-full object-cover rounded-full h-full top-0 left-0 animate-spinner"
            />
          )}
        </div>
        <div className="w-screen h-full bg-[#2b2b2b] flex flex-col p-10">
          <h1 className="text-white font-bold lg:text-[8rem] text-[5rem] w-full leading-none tracking-tight uppercase align-top">
            {user.name}
          </h1>
          <p className="text-white text-xl uppercase">{user.description}</p>
        </div>
      </div>
    )
  );
};

export default UserInfo;

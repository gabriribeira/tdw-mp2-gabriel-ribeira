import React, { useEffect, useState } from "react";
import DefaultImage from "../assets/default.jpg";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useGetUserByIdQuery } from "../app/api";
import { MdModeEdit } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";

const UserInfo = ({ id }) => {
  let authUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);
  const [editType, setEditType] = useState(null);
  const { data: visitedUser } = useGetUserByIdQuery(id);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setIsLoggedInUser(true);
    }
    if (visitedUser && visitedUser[0]) {
      setUser(visitedUser[0]);
      setIsLoggedInUser(false);
    }
  }, [visitedUser, authUser]);
  return (
    user && (
      <div className="flex flex-col w-full h-auto">
        <div className="lg:h-[40vw] w-screen h-[50vh] relative group flex items-center justify-center">
          <img
            src={
              user.img_url
                ? "http://localhost:3001" + user.img_url
                : DefaultImage
            }
            alt={"Profile Picture"}
            className={`w-full object-cover object-center h-full ${
              isLoggedInUser &&
              "group-hover:opacity-70 transition-opacity duration-300 ease-in-out"
            }`}
          />
          {isLoggedInUser && (
            <button
              onClick={() => setEditType("photo")}
              className="group-hover:block absolute hidden text-[#2b2b2b] text-4xl"
            >
              CHANGE PHOTO
            </button>
          )}
        </div>

        <div className="w-screen h-full bg-[#2b2b2b] flex flex-col pb-10">
          {isLoggedInUser ? (
            editType !== "name" ? (
              <h1 className="group relative flex items-center text-white font-bold lg:text-[8rem] text-[5rem] w-full leading-none tracking-tight uppercase align-top">
                {user.name}
                {isLoggedInUser && (
                  <button
                    onClick={() => setEditType("name")}
                    className="group-hover:block absolute hidden right-5 text-white text-3xl"
                  >
                    <MdModeEdit />
                  </button>
                )}
              </h1>
            ) : (
              <div className="w-full flex items-center relative">
                <input
                  type="text"
                  defaultValue={user.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full uppercase bg-transparent text-white lg:text-[8rem] text-[5rem] placeholder:lg:text-[8rem] placeholder:text-[5rem] placeholder:text-white/50 border-b-2 border-white focus:outline-none mb-5"
                  placeholder="NAME"
                />
                <button
                  onClick={() => setEditType(null)}
                  className="absolute right-5 text-white/70 text-4xl hover:text-white"
                >
                  <IoCheckmarkOutline />
                </button>
              </div>
            )
          ) : (
            <h1 className="group relative flex items-center text-white font-bold lg:text-[8rem] text-[5rem] w-full leading-none tracking-tight uppercase align-top">
              {user.name}
            </h1>
          )}

          {isLoggedInUser ? (
            editType !== "description" ? (
              <h1 className="group relative flex items-center text-white text-xl w-full leading-none tracking-tight uppercase align-top">
                {user.description}
                {isLoggedInUser && (
                  <button
                    onClick={() => setEditType("description")}
                    className="group-hover:block absolute hidden right-5 text-white text-3xl"
                  >
                    <MdModeEdit />
                  </button>
                )}
              </h1>
            ) : (
              <div className="w-full flex items-center relative">
                <input
                  type="text"
                  defaultValue={user.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full uppercase bg-transparent text-white text-xl placeholder:text-xl placeholder:text-white/50 border-b-2 border-white focus:outline-none"
                  placeholder="DESCRIPTION"
                />
                <button
                  onClick={() => setEditType(null)}
                  className="absolute right-5 text-white/70 text-4xl hover:text-white"
                >
                  <IoCheckmarkOutline />
                </button>
              </div>
            )
          ) : (
            <h1 className="group relative flex items-center text-white text-xl w-full leading-none tracking-tight uppercase align-top">
              {user.description}
            </h1>
          )}
        </div>
      </div>
    )
  );
};

UserInfo.propTypes = {
  id: PropTypes.string,
};

export default UserInfo;

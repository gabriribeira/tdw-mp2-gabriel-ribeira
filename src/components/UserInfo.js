import React, { useEffect, useState } from "react";
import DefaultImage from "../assets/default.jpg";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useGetUserByIdQuery } from "../app/api";

const UserInfo = ({ id }) => {
  let authUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);
  const { data: visitedUser } = useGetUserByIdQuery(id);
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
    if (visitedUser && visitedUser[0]) {
      console.log(visitedUser[0]);
      setUser(visitedUser[0]);
    }
  }, [visitedUser, authUser]);
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
        </div>
        <div className="w-screen h-full bg-[#2b2b2b] flex flex-col pb-10">
          <h1 className="text-white font-bold lg:text-[8rem] text-[5rem] w-full leading-none tracking-tight uppercase align-top">
            {user.name}
          </h1>
          <p className="text-white text-xl uppercase">{user.description}</p>
        </div>
      </div>
    )
  );
};

UserInfo.propTypes = {
  id: PropTypes.string,
};

export default UserInfo;

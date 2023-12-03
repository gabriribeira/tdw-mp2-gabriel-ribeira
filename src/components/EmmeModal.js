import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useSendEmmeMutation, useSearchUsersQuery } from "../app/api";
import { useSelector } from "react-redux";

const EmmeModal = ({ track, setEmmeModal }) => {
  const [searchInput, setSearchInput] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const user_id = useSelector((state) => state.auth.user.id);
  //eslint-disable-next-line
  const [sendEmme, { isLoading: isSendingEmme }] = useSendEmmeMutation();
  const {
    data: searchUsersData,
    error: searchUsersError,
    //eslint-disable-next-line
    isLoading: isSearchingUsers,
  } = useSearchUsersQuery(searchInput);

  useEffect(() => {
    if (searchUsersData) {
      setUsersList(searchUsersData);
    }
    if (searchUsersError) {
      console.error("Error searching users:", searchUsersError);
    }
  }, [searchUsersData, searchUsersError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await sendEmme({
        sender_id: user_id,
        receiver_id: receiverId.id,
        is_anonymous: isAnonymous,
        message: message,
        track_id: track.id,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    track && (
      <div className="fixed top-0 left-0 w-full h-full bg-[#2b2b2b]/50 flex justify-center items-center z-[99999]">
        <div className="xl:w-[50vw] lg:w-[60vw] md:w-[80vw] w-[90vw] rounded-lg bg-[#2b2b2b] overflow-y-auto absolute flex flex-col lg:p-5 xl:pt-20 lg:pt-14 md:pt-20 pt-20 p-5 md:grid md:grid-cols-2 gap-x-10">
          <h1 className="absolute left-3 top-3 text-2xl text-white uppercase font-bold">
            SEND {track.name}
          </h1>
          <button
            onClick={() => setEmmeModal(null)}
            className="absolute right-3 top-3 text-3xl text-white"
          >
            <RxCross2 />
          </button>
          <div className="col-span-1 w-full">
            <img src={track.album.images[0].url} />
          </div>
          <form
            className="col-span-1 w-full flex flex-col justify-between gap-y-5 md:pt-0 pt-10"
            onSubmit={handleSubmit}
          >
            {receiverId ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <img
                    //eslint-disable-next-line
                    src={
                      process.env.REACT_APP_BACKEND_URL_IMG + receiverId.img_url
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-white text-2xl uppercase">
                    {receiverId.username}
                  </p>
                </div>
                <button
                  onClick={() => setReceiverId(null)}
                  className="text-xl text-white"
                >
                  <RxCross2 />
                </button>
              </div>
            ) : (
              <div className="relative flex flex-col">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="SEARCH FOR USERS"
                  className="bg-transparent w-full border-b-2 border-white text-white focus:outline-none text-xl"
                />
                <div className="absolute w-full top-[100%] left-0 bg-white text-[#2b2b2b] rounded-b-lg ">
                  {usersList &&
                    usersList.length > 0 &&
                    usersList.map((user, index) => (
                      <button
                        type="button"
                        onClick={() => setReceiverId(user)}
                        key={index}
                        className="flex items-center uppercase p-1 gap-x-2 w-full"
                      >
                        <img
                          //eslint-disable-next-line
                          src={
                            process.env.REACT_APP_BACKEND_URL_IMG + user.img_url
                          }
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="">{user.username}</p>
                      </button>
                    ))}
                </div>
              </div>
            )}
            <div className="flex flex-col w-full gap-y-5">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="MESSAGE"
                className="bg-transparent w-full border-b-2 border-white text-white focus:outline-none text-xl"
              />
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={
                    isAnonymous
                      ? "w-5 h-5 bg-white border-2 border-white rounded-full"
                      : "w-5 h-5 bg-[#2b2b2b] border-2 border-white rounded-full"
                  }
                ></button>
                <p className="text-white text-xl">
                  {isAnonymous ? "ANONYMOUS" : "NOT ANONYMOUS"}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="text-white text-xl underline font-bold w-full text-end"
            >
              SEND MEEM
            </button>
          </form>
        </div>
      </div>
    )
  );
};

EmmeModal.propTypes = {
  track: PropTypes.object.isRequired,
  setEmmeModal: PropTypes.func.isRequired,
};

export default EmmeModal;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";

const AuthModal = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#2b2b2b]/50 flex justify-center items-center z-[101]">
      <div className="w-[40vw] h-[50vh] rounded-lg bg-[#2b2b2b] overflow-y-auto absolute flex flex-col p-10">
        <h1 className="absolute left-3 top-3 text-2xl text-white font-bold">
          MEEM
        </h1>
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 text-3xl text-white"
        >
          <RxCross2 />
        </button>
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-5">
          <h1 className="text-white text-3xl font-bold"></h1>
          <input
            type="text"
            placeholder="USERNAME"
            className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="flex items-center justify-between w-full text-white text-lg">
            <button className="underline">DONT HAVE AN ACCOUNT? SIGN UP</button>
            <button className="">SIGN IN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AuthModal;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { useLoginMutation } from "../app/api";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../app/authSlice";

const AuthModal = ({ closeModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await loginUser(
        { username, password },
        { credentials: "include" },
      ).then((res) => {
        console.log(res);
        if (res.data) {
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.user));
        }
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
        <form
          className="w-full h-full flex flex-col justify-center items-center gap-y-5"
          onSubmit={handleLogin}
        >
          <h1 className="text-white text-3xl font-bold"></h1>
          <input
            type="text"
            placeholder="USERNAME"
            className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div className="w-full relative items-center flex">
            <input
              type="password"
              placeholder="PASSWORD"
              className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="right-2 absolute text-white/50 text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
            </button>
          </div>
          <div className="flex items-center justify-between w-full text-white text-lg">
            <button className="underline">DONT HAVE AN ACCOUNT? SIGN UP</button>
            {isError && <p>Login failed. Please try again.</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AuthModal;

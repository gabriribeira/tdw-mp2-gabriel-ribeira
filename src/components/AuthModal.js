import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { useLoginMutation, useRegisterMutation } from "../app/api";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../app/authSlice";

const AuthModal = ({ closeModal }) => {
  const [authType, setAuthType] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setNewShowConfirmPassword] = useState(false);

  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const [registerUser, { isLoadingRegister, isErrorRegister }] =
    useRegisterMutation();
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await registerUser(
        {
          email: newEmail,
          name: newName,
          username: newUsername,
          password: newPassword,
        },
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
      <div
        className={`xl:w-[40vw] lg:w-[50vw] md:w-[70vw] w-[90vw] md:h-[50vh] ${
          authType ? "h-[30vh]" : "h-[50vh]"
        } rounded-lg bg-[#2b2b2b] overflow-y-auto absolute flex flex-col lg:p-10 p-5`}
      >
        <h1 className="absolute left-3 top-3 text-2xl text-white font-bold">
          MEEM
        </h1>
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 text-3xl text-white"
        >
          <RxCross2 />
        </button>
        {authType ? (
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
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className="right-2 absolute text-white/50 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
              </button>
            </div>
            <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full text-white text-lg">
              <button
                type="button"
                onClick={() => setAuthType(false)}
                className="underline md:text-lg text-sm md:pt-0 pt-5"
              >
                DONT HAVE AN ACCOUNT? SIGN UP
              </button>
              {isError && <p>Login failed. Please try again.</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>
          </form>
        ) : (
          <form
            className="w-full h-full flex flex-col justify-center items-center gap-y-8"
            onSubmit={handleRegister}
          >
            <h1 className="text-white text-3xl font-bold"></h1>
            <input
              type="text"
              placeholder="EMAIL"
              className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
            />
            <input
              type="text"
              placeholder="NAME"
              className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
            <input
              type="text"
              placeholder="USERNAME"
              className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
              onChange={(e) => setNewUsername(e.target.value)}
              value={newUsername}
            />
            <div className="w-full relative items-center flex">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="PASSWORD"
                className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <button
                type="button"
                className="right-2 absolute text-white/50 text-xl"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
              </button>
            </div>
            <div className="w-full relative items-center flex">
              <input
                type={showNewConfirmPassword ? "text" : "password"}
                placeholder="CONFIRM PASSWORD"
                className="bg-transparent text-white px-2 border-b-2 border-white w-full focus:outline-none"
                onChange={(e) => setNewConfirmPassword(e.target.value)}
                value={newConfirmPassword}
              />
              <button
                type="button"
                className="right-2 absolute text-white/50 text-xl"
                onClick={() =>
                  setNewShowConfirmPassword(!showNewConfirmPassword)
                }
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlash />}
              </button>
            </div>
            <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full text-white text-lg">
              <button
                type="button"
                onClick={() => setAuthType(true)}
                className="underline md:text-lg text-sm md:pt-0 pt-5"
              >
                ALREADY HAVE AN ACCOUNT? SIGN IN
              </button>
              {isErrorRegister && <p>Login failed. Please try again.</p>}
              <button type="submit" disabled={isLoadingRegister}>
                {isLoadingRegister ? "REGISTERING USER..." : "REGISTER"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AuthModal;

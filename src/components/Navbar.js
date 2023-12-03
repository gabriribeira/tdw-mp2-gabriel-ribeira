import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CSSTransition } from "react-transition-group";
import AuthModal from "./AuthModal";
import { useSelector } from "react-redux";
import { clearUser } from "../app/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const [mobileModal, setMobileModal] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "MEEM - HOME";
        break;
      case "/search":
        document.title = "MEEM - SEARCH";
        break;
      case "/meems":
        document.title = "MEEM - MEEMS";
        break;
      case "/profile":
        document.title = "MEEM - PROFILE";
        break;
      default:
        document.title = "MEEM - HOME";
        break;
    }
  }, [location.pathname]);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {authModalOpen && (
        <AuthModal closeModal={() => setAuthModalOpen(false)} />
      )}
      <nav className="w-screen sticky top-0 flex md:justify-center justify-between items-center bg-transparent text-[#2b2b2b] font-bold xl:text-[4.5rem] lg:text-[3.8rem] md:text-[2.3rem] text-[2rem] md:py-0 md:px-0 py-2 px-2 whitespace-pre z-[100] bg-white">
        {location.pathname !== "/" && (
          <Link to={"/"} className="md:block hidden">
            HOME .
          </Link>
        )}
        {location.pathname !== "/search" && (
          <Link to={"/search"} className="md:block hidden">
            {" "}
            SEARCH .
          </Link>
        )}
        {location.pathname !== "/meems" && (
          <Link to={"/meems"} className="md:block hidden">
            {" "}
            MEEMS {location.pathname !== "/profile" && "."}
          </Link>
        )}
        {location.pathname !== "/profile" && user !== null && (
          <Link to={"/profile"} className="md:block hidden">
            {" "}
            PROFILE
          </Link>
        )}
        {location.pathname !== "/profile" && user === null && (
          <button
            className="md:block hidden"
            onClick={() => setAuthModalOpen(true)}
          >
            {" "}
            ENTER
          </button>
        )}
        {location.pathname === "/profile" && user !== null && (
          <button
            className="md:block hidden"
            onClick={() => {
              dispatch(clearUser());
              console.log("logout");
            }}
          >
            {". "}
            LOGOUT
          </button>
        )}
        <Link className="md:hidden block" to={"/"}>
          MEEM
        </Link>
        <button
          className="md:hidden block"
          onClick={() => {
            mobileModal ? setMobileModal(false) : setMobileModal(true);
          }}
        >
          <GiHamburgerMenu />
        </button>
        <CSSTransition
          in={mobileModal}
          timeout={500}
          classNames="menu-primary-vertical"
          unmountOnExit
        >
          <div className="absolute md:hidden top-[100%] left-0 w-[100vw] h-auto bg-white z-[100] flex flex-col justify-center items-end px-2">
            <Link to={"/"} className="my-2 hover:font-bold hover:underline">
              HOME
            </Link>
            <Link
              to={"/search"}
              className="my-2 hover:font-bold hover:underline"
            >
              SEARCH
            </Link>
            <Link
              to={"/meems"}
              className="my-2 hover:font-bold hover:underline"
            >
              MEEMS
            </Link>
            <Link
              to={"/profile"}
              className="my-2 hover:font-bold hover:underline"
            >
              PROFILE
            </Link>
            <Link
              to={"/about"}
              className="my-2 hover:font-bold hover:underline"
            >
              ABOUT
            </Link>
          </div>
        </CSSTransition>
      </nav>
    </>
  );
};

export default Navbar;

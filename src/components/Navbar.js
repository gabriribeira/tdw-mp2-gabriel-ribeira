import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
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
  return (
    <nav className="w-screen flex justify-center items-center bg-transparent text-[#2b2b2b] font-bold xl:text-[5rem] lg:text-[4rem] md:text-[3rem] text-[1.5rem] whitespace-pre">
      {location.pathname !== "/" && <Link to={"/"}>HOME .</Link>}
      {location.pathname !== "/search" && <Link to={"/"}> SEARCH .</Link>}
      {location.pathname !== "/meems" && <Link to={"/"}> MEEMS .</Link>}
      {location.pathname !== "/profile" && <Link to={"/"}> PROFILE</Link>}
    </nav>
  );
};

export default Navbar;

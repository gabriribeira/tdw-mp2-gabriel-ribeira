import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link
      to={"/about"}
      className="fixed bottom-2 md:left-2 left-auto md:right-auto right-2 uppercase text-white md:text-2xl text-xl font-bold bg-[#2b2b2b] w-auto"
    >
      ABOUT MEEM
    </Link>
  );
};

export default Footer;

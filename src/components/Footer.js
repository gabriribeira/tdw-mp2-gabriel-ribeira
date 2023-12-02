import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Link
      to={"/about"}
      className="fixed bottom-2 left-2 uppercase text-white text-2xl font-bold"
    >
      ABOUT MEEM
    </Link>
  );
};

export default Footer;

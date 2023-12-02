import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import Calendar from "../components/Calendar";
import Booklet from "../components/Booklet";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const authUser = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (id == authUser) {
      navigate("/profile");
    }
  }, [id, authUser, navigate]);

  return (
    id && (
      <div>
        <Navbar />
        <UserInfo id={id} />
        <Booklet id={id} />
        <Calendar id={id} />
      </div>
    )
  );
};

export default User;

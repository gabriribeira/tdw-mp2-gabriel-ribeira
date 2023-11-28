import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import Calendar from "../components/Calendar";
import Booklet from "../components/Booklet";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <UserInfo />
      <Booklet />
      <Calendar />
    </div>
  );
};

export default Profile;

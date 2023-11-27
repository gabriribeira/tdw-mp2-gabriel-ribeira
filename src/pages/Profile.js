import React from "react";
import Navbar from "../components/Navbar";
import UserInfo from "../components/UserInfo";
import Calendar from "../components/Calendar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <UserInfo />
      <Calendar />
    </div>
  );
};

export default Profile;

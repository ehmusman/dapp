"use client";

import WithAuth from "../components/WithAuth";
import Profile from "./components/Profile";

const ProfilePage = () => {
  return <Profile />;
};

export default WithAuth(ProfilePage);

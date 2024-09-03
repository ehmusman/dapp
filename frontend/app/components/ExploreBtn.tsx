"use client";
import React, { useContext } from "react";
import UserContext from "../context/user/context";
import CustomLink from "./CustomLink";

const ExploreBtn = () => {
  const context = useContext(UserContext);
  return (
    <>
      {!context?.state?.email ? (
        <div className="flex justify-center">
          <CustomLink
            href="login"
            text="Explore Now"
            className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-opacity-90 cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <CustomLink
            href="profile"
            text="Profile"
            className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-opacity-90 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default ExploreBtn;

'use client'
import { useContext, useEffect } from "react";
import UserContext from "../../context/user/context";
import io from "socket.io-client";

export const useProfileState = () => {
  const context = useContext(UserContext);
  const { isLoading, error, id, email, username, telegramBotData, created_at } =
    context?.state!;

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API!, {
      extraHeaders: {
        authorization: localStorage.getItem("token") || "",
      },
    });    
    socket.emit("join", username);
    socket.on("newMessage", (message) => {
      context?.socketUpdateBotData({ data: { ...message } });
    });
    return () => {
      socket.disconnect();
    };
  }, [context, username]);
  return {
    isLoading,
    error,
    id,
    email,
    username,
    telegramBotData,
    created_at,
  };
};

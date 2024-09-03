"use client";
import { useContext, useEffect } from "react";
import UserContext from "../../context/user/context";
import io from "socket.io-client";

export const useProfileState = () => {
  const context = useContext(UserContext);
  const { isLoading, error, id, email, username, telegramBotData, created_at } =
    context?.state!;

  useEffect(() => {
    /**
     * Creating Secure Socket Instance for listening Telegram hook data
     */
    const socket = io(process.env.NEXT_PUBLIC_API!, {
      extraHeaders: {
        authorization: localStorage.getItem("token") || "",
      },
    });
    /**
     * User joining with username
     */
    socket.emit("join", username);

    /**
     * New Message Subscriber
     */
    socket.on("newMessage", (message) => {
      /**
       * User context state updating action function
       */
      context?.socketUpdateBotData({ data: { ...message } });
    });
    return () => {
      /**
       * Socket disconnected on component Unmount
       */
      socket.disconnect();
    };
    /**
     * Dependency Array
     */
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

"use client";
import React, { useReducer, ReactNode } from "react";
import { AxiosError } from "axios";
import UserContext from "./context";
import { reducer } from "./reducer";
import { actionTypes, ErrorI, TelegramBotData, UserState } from "./types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";

interface UserProviderProps {
  children: ReactNode;
}

export const initialState: UserState = {
  isLoading: false,
  error: null,
  id: null,
  username: null,
  email: null,
  created_at: null,
  telegramBotData: null,
};
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();
  /**
   *
   * @param username
   * @param email
   * @param password
   *
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *                                      Signup User Action
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *
   */
  const signupUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      dispatch({ type: actionTypes.SIGNUP_USER_REQUEST });
      // await wait(1000)
      const response = await axiosInstance.post(`/api/auth/register`, {
        username,
        email,
        password,
      });
      dispatch({ type: actionTypes.SIGNUP_USER });
      router.push("/login");
    } catch (err) {
      console.log(err);
      const errors = err as AxiosError<ErrorI>;
      const errResponse = errors.response?.data!;
      const msg = errResponse.message;
      toast.error(msg);
      dispatch({ type: actionTypes.SIGNUP_USER_ERROR, payload: errResponse });
    }
  };

  /**
   *
   * @param email
   * @param password
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *                                      Login User Action
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *
   *    */
  const loginUser = async (email: string, password: string) => {
    try {
      dispatch({ type: actionTypes.GET_USER_PROFILE_REQUEST });
      const {
        data: { data, token },
      } = await axiosInstance.post(`/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", token);
      dispatch({ type: actionTypes.LOGIN_USER, payload: data.user });
      router.push("/profile");
    } catch (err) {
      const errors = err as AxiosError<ErrorI>;
      const errResponse = errors.response?.data!;
      const msg = errResponse.message;
      toast.error(msg);
      dispatch({ type: actionTypes.LOGIN_USER_ERROR, payload: errResponse });
    }
  };

  /**
   *
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *                                      Get User Profile Action
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *
   */
  const getUserProfile = async () => {
    try {
      dispatch({ type: actionTypes.GET_USER_PROFILE_REQUEST });
      const {
        data: { data },
      } = await axiosInstance.get(`/api/profile`);
      dispatch({ type: actionTypes.GET_USER_PROFILE, payload: data });
    } catch (err) {
      const errors = err as AxiosError<ErrorI>;
      const errResponse = errors.response?.data!;
      const msg = errResponse.message;
      toast.error(msg);
      dispatch({
        type: actionTypes.GET_USER_PROFILE_ERROR,
        payload: errResponse,
      });
      router.push("/login")
    }
  };

  /**
   *
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *                                      Logout User Action
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *
   */
  const logout = async () => {
    dispatch({ type: actionTypes.LOGOUT_USER });
    localStorage.clear();
    router.push("/");
  };


  /**
   *
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *                                      Logout User Action
   * /////////////////////////////////////////////////////////////////////////////////////////////
   *
   */
  const socketUpdateBotData = ({data}: {data: TelegramBotData}) => {
    dispatch({ type: actionTypes.ADD_BOT_SOCKET_DATA, payload: data });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        signupUser,
        loginUser,
        getUserProfile,
        logout,
        socketUpdateBotData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

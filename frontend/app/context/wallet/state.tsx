"use client";
import React, { useReducer, ReactNode } from "react";
import WalletContext from "./context";
import { reducer } from "./reducer";
import { WalletStateI } from "./types";

interface WalletProviderProps {
  children: ReactNode;
}

export const initialState: WalletStateI = {
  address: "",
  balance: 0,
  error: null,
  isConnecting: false,
};
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WalletContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

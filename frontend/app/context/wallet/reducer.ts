import { initialState } from "./state";
import { walletActionTypes, WalletActions, WalletStateI } from "./types";

export function reducer(state: WalletStateI, action: WalletActions): WalletStateI {
  switch (action.type) {
    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Wallet Connection Reducer
    // ////////////////////////////////////////////////////////////////////////////////////////
    case walletActionTypes.WALLET_CONNECT_REQUEST:
      return {
        ...state,
        isConnecting: true,
      };
    case walletActionTypes.WALLET_CONNECT_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isConnecting: false,
      };
    case walletActionTypes.WALLET_CONNECT:
      return {
        ...state,
        isConnecting: false,
        address: action.payload.address,
        balance: action.payload.balance,
      };
      case walletActionTypes.WALLET_DISCONNECT:
        return {
          ...initialState
        };

    default:
      return state;
  }
}

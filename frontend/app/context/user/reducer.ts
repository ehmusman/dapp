import { initialState } from "./state";
import { actionTypes, UserAction, UserState } from "./types";

export function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Login Reducer
    // ////////////////////////////////////////////////////////////////////////////////////////
    case actionTypes.LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case actionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Signup Reducer
    // ////////////////////////////////////////////////////////////////////////////////////////
    case actionTypes.SIGNUP_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNUP_USER:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Profile Reducer
    // ////////////////////////////////////////////////////////////////////////////////////////
    case actionTypes.GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
        telegramBotData: action.payload.telegramBotData ? [...action.payload.telegramBotData] : null,
        isLoading: false,
      };
    case actionTypes.GET_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Logout Reducer
    // ////////////////////////////////////////////////////////////////////////////////////////
    case actionTypes.LOGOUT_USER:
      return {
        ...initialState,
      };


    // ////////////////////////////////////////////////////////////////////////////////////////
    //                                Add Bot Socket Data
    // ////////////////////////////////////////////////////////////////////////////////////////
    case actionTypes.ADD_BOT_SOCKET_DATA:
      return {
        ...state,
        telegramBotData: state.telegramBotData ? [...state.telegramBotData, action.payload] : [action.payload],
        isLoading: false,      };

    default:
      return state;
  }
}

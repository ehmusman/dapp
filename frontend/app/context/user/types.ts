export interface TelegramBotData {
  id: number;
  update_id: string;
  date: number;
  username: string;
  first_name: string;
  message_id: string;
  text: string;
  created_at: Date;
}
export interface UserErrorI {
  status: boolean;
  message: string;
}

export interface UserState {
  isLoading: boolean;
  error: UserErrorI | null;
  id: number | null;
  username: string | null;
  email: string | null;
  created_at: Date | null;
  telegramBotData: TelegramBotData[] | null;
}
export const actionTypes = {
  // Login Action Types
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",

  // Signup Action Types
  SIGNUP_USER: "SIGNUP_USER",
  SIGNUP_USER_REQUEST: "SIGNUP_USER_REQUEST",
  SIGNUP_USER_ERROR: "SIGNUP_USER_ERROR",

  // Get Users Profile Action Types
  GET_USER_PROFILE: "GET_USER_PROFILE",
  GET_USER_PROFILE_REQUEST: "GET_USER_PROFILE_REQUEST",
  GET_USER_PROFILE_ERROR: "GET_USER_PROFILE_ERROR",

  // Logout User Action Types
  LOGOUT_USER: "LOGOUT_USER",

  // Add Socket data
  ADD_BOT_SOCKET_DATA: "ADD_BOT_SOCKET_DATA"
} as const;


export type UserAction =
  | { type: typeof actionTypes.LOGIN_USER; payload: UserState }
  | { type: typeof actionTypes.LOGIN_USER_REQUEST }
  | { type: typeof actionTypes.LOGIN_USER_ERROR; payload: UserErrorI }
  | { type: typeof actionTypes.SIGNUP_USER}
  | { type: typeof actionTypes.SIGNUP_USER_REQUEST }
  | { type: typeof actionTypes.SIGNUP_USER_ERROR; payload: UserErrorI }
  | { type: typeof actionTypes.GET_USER_PROFILE; payload: UserState }
  | { type: typeof actionTypes.GET_USER_PROFILE_REQUEST }
  | { type: typeof actionTypes.GET_USER_PROFILE_ERROR; payload: UserErrorI }
  | { type: typeof actionTypes.LOGOUT_USER }
  | { type: typeof actionTypes.ADD_BOT_SOCKET_DATA, payload: TelegramBotData}
  

export interface ErrorI {
  message: string;
  status: boolean;
}

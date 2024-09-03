import { createContext } from 'react';
import { TelegramBotData, UserState } from './types';


interface UserContextProps {
  state: UserState;
  loginUser: (username: string, password: string) => Promise<void>;
  signupUser: (username: string, email: string, password: string) => Promise<void>;
  getUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
  socketUpdateBotData: ({data}: {data: TelegramBotData}) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;

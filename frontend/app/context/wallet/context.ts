import { createContext } from 'react';
import {  WalletActions, WalletStateI } from './types';


export interface WalletContextStateI {
  state: WalletStateI;
  dispatch: React.Dispatch<WalletActions>
}

const WalletContext = createContext<WalletContextStateI | null>(null);

export default WalletContext;

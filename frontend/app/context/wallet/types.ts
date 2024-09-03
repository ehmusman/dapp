/**
 * Wallet State Interface
 */
export interface WalletStateI {
  address: string;
  balance: number;
  isConnecting: boolean;
  error: string | null;
}

/**
 * Wallet Action Types
 */
export const walletActionTypes = {
  // Wallet connection actions
  WALLET_CONNECT_REQUEST: "WALLET_CONNECT_REQUEST",
  WALLET_CONNECT: "WALLET_CONNECT",
  WALLET_CONNECT_ERROR: "WALLET_CONNECT_ERROR",
  WALLET_DISCONNECT: "WALLET_DISCONNECT",
} as const;

/**
 * Wallet Actions
 */
export type WalletActions =
  | { type: typeof walletActionTypes.WALLET_CONNECT_REQUEST }
  | {
      type: typeof walletActionTypes.WALLET_CONNECT;
      payload: { address: string; balance: number };
    }
  | {
      type: typeof walletActionTypes.WALLET_CONNECT_ERROR;
      payload: { error: string };
    }
  | { type: typeof walletActionTypes.WALLET_DISCONNECT };

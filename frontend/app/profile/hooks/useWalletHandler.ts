import { Context, useContext, useEffect } from "react";
import { ethers, utils } from "ethers";

import { networks, allowedChains, chains } from "./networks";
import toast from "react-hot-toast";
import WalletContext, {
  WalletContextStateI,
} from "@/app/context/wallet/context";
import { walletActionTypes } from "@/app/context/wallet/types";

export const useWalletHandler = () => {
  const context: WalletContextStateI | null = useContext(WalletContext);

  /**
   *
   * Metamask Connection Function
   */
  const connectMetaMaskWalletHandler = async () => {
    /**
     * Starting Requesting Wallet connection request
     */
    context?.dispatch({ type: walletActionTypes.WALLET_CONNECT_REQUEST });

    /**
     * Reverting User request if Metamask is not installed
     */
    if (!(window as any)?.ethereum) {
      toast.error("Please install wallet");
      context?.dispatch({
        type: walletActionTypes.WALLET_CONNECT_ERROR,
        payload: { error: "Please install metamask" },
      });
      return;
    }
    let metaMaskProvider = (window as any)?.ethereum;
    const provider = new ethers.providers.Web3Provider(metaMaskProvider, "any");
    const network = await provider.getNetwork();
    const chainId = network.chainId;

    /**
     * Checking if connected chain is allowed for this DAPP
     */
    const isChainAllowed = allowedChains.find(
      (network) => network.chainId == chainId
    );
    /**
     * If Chain is not Allowed, force the user to switch the chain to allowed chains
     */
    if (!isChainAllowed) {
      await switchAddChainHandler(chains.ETH);
      return;
    }

    /**
     * Using Browser Native APIs to request wallet connection
     */
    metaMaskProvider
      .request({ method: "eth_requestAccounts" })
      .then(async (result: any) => {
        /**
         * Fetching connected Wallet Balance
         */
        const balance = await metaMaskProvider.request({
          method: "eth_getBalance",
          params: [result[0], "latest"],
        });

        /**
         * Converting Balance in WEI unit
         */
        let balanceInWei = parseInt(balance, 16);
        /**
         * Converting balance in ETH unit
         */
        const balanceInEth = ethers.utils.formatEther(balanceInWei.toString());
        context?.dispatch({
          type: walletActionTypes.WALLET_CONNECT,
          payload: { address: result[0], balance: parseFloat(balanceInEth) },
        });
        toast.success("Wallet connected");
      })
      .catch((error: any) => {
        context?.dispatch({
          type: walletActionTypes.WALLET_CONNECT_ERROR,
          payload: { error: error?.message },
        });
        toast.error(error.message);
      });
  };

  /**
   *
   * @param symbol
   * @returns
   *
   * Switching OR Adding new chain handler
   */
  const switchAddChainHandler = async (
    symbol: typeof chains.AVAX | typeof chains.ETH
  ) => {
    let metaMaskProvider = (window as any)?.ethereum;
    if (!metaMaskProvider) {
      return;
    }
    try {
      /**
       * Using Browser Native APIs to request wallet switching
       */
      await metaMaskProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: utils.hexValue(networks[symbol].chainId) }],
      });
      toast.success("Chain switched");
      return {
        success: true,
        status: "Chain switched",
      };
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          /**
           * Using Browser Native APIs to request adding new network
           */
          await metaMaskProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                rpcUrls: networks[symbol].rpcUrl,
                chainId: utils.hexValue(networks[symbol].chainId),
                chainName: networks[symbol].name,
                nativeCurrency: {
                  name: networks[symbol].name,
                  symbol: networks[symbol].symbol,
                  decimals: networks[symbol].decimals,
                },
              },
            ],
          });
          toast.success("Chain added successfully");
          return;
        } catch (error: any) {
          toast.error(
            error.reason ||
              error.message ||
              error.data.message ||
              "Error in chain adding"
          );
          return;
        }
      }
      toast.error(
        error.reason ||
          error.message ||
          error.data.message ||
          "Error in chain adding"
      );
      return;
    }
  };

  /**
   * Disconnect Wallet Handler
   */
  const disconnectWallet = () => {
    context?.dispatch({ type: walletActionTypes.WALLET_DISCONNECT });
  };

  /**
   * States and methods exposed from custom hooks
   */
  return {
    state: context?.state,
    disconnectWallet,
    connectMetaMaskWalletHandler,
  };
};

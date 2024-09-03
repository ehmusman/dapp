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

  const connectMetaMaskWalletHandler = async () => {
    context?.dispatch({ type: walletActionTypes.WALLET_CONNECT_REQUEST });
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

    const isChainAllowed = allowedChains.find(
      (network) => network.chainId == chainId
    );
    if (!isChainAllowed) {
      await switchAddChainHandler(chains.ETH);
      return;
    }
    metaMaskProvider
      .request({ method: "eth_requestAccounts" })
      .then(async (result: any) => {
        const balance = await metaMaskProvider.request({
          method: "eth_getBalance",
          params: [result[0], "latest"],
        });
        let balanceInWei = parseInt(balance, 16);
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
  const switchAddChainHandler = async (
    symbol: typeof chains.AVAX | typeof chains.ETH
  ) => {
    let metaMaskProvider = (window as any)?.ethereum;
    if (!metaMaskProvider) {
      return;
    }
    try {
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
          return {
            success: true,
            msg: "Chain added successfully",
          };
        } catch (error: any) {
          toast.error(
            error.reason ||
              error.message ||
              error.data.message ||
              "Error in chain adding"
          );
          return {
            success: false,
            msg:
              error.reason ||
              error.message ||
              error.data.message ||
              "Error in chain adding",
          };
        }
      }
      toast.error(
        error.reason ||
          error.message ||
          error.data.message ||
          "Error in chain adding"
      );
      return {
        success: false,
        msg:
          error.reason ||
          error.message ||
          error.data.message ||
          "Error in chain switching",
      };
    }
  };
  const disconnectWallet = () => {
    context?.dispatch({ type: walletActionTypes.WALLET_DISCONNECT });
  };

  return {
    state: context?.state,
    disconnectWallet,
    connectMetaMaskWalletHandler,
  };
};

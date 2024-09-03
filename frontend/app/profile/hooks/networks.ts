// Networks that have to be added in Matamask
export const chains = {
    ETH: "ETH",
    AVAX: "AVAX"
} as const;

interface ChainDataI {
      chainId: number,
      rpcUrl: string[],
      name: string,
      symbol: typeof chains.ETH | typeof chains.AVAX,
      decimals: number,
      blockExplorerUrls: string[],
      USDT: string
}

export const networks: Record<typeof chains[keyof typeof chains], ChainDataI> = {
    [chains.ETH]: {
        chainId: 1,
        rpcUrl: ["https://mainnet.infura.io/v3/"],
        name: "Ethereum Mainnet",
        symbol: chains.ETH,
        decimals: 18,
        blockExplorerUrls: ["https://etherscan.io"],
        USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    [chains.AVAX]: {
        chainId: 43114,
        rpcUrl: ["https://api.avax.network/ext/bc/C/rpc"],
        name: "Avalanche C-Chain",
        symbol: chains.AVAX,
        decimals: 18,
        USDT: "0x3Cf2B4F9E5A8f6E1221862Cb62de185db3766244",
        blockExplorerUrls: ["https://snowtrace.io"],
    }
};

export const allowedChains = Object.values(networks).map(network => {
    return {
        chainId: network.chainId,
        symbol: network.symbol
    }

})
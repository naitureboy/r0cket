// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions";

const networks = {
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },

  ethereum: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"]
  },

  binance: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://bsc-dataseed1.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"]
  },

  avalanche: {
    chainId: `0x${Number(43114).toString(16)}`,
    chainName: "Avalanche C-Chain",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io"]
  },

  fantom: {
    chainId: `0x${Number(250).toString(16)}`,
    chainName: "Fantom Opera",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorerUrls: ["https://ftmscan.com"]
  },

  arbitrium: {
    chainId: `0x${Number(42161).toString(16)}`,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"]
  },

  optimism: {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimism",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.optimism.io/"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"]
  },

  rinkeby: {
    chainId: `0x${Number(4).toString(16)}`,
    chainName: "Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "RIN",
      decimals: 18
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/"],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"]
  },

  mumbai: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
  },
}

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const switchRequest = () => {
  return {
    type: "SWITCH_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const switchSuccess = (payload) => {
  return {
    type: "SWITCH_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const switchFailed = () => {
  return {
    type: "SWITCH_FAILED"
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = (networkId) => {

  return async (dispatch) => {
    let contractAddr = pickAddress(networkId);

    dispatch(connectRequest());
    const abiResponse = await fetch("/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentnetworkId = await ethereum.request({
          method: "net_version",
        });
        if (currentnetworkId == networkId) {
          const SmartContractObj = new Web3EthContract(
            abi,
            contractAddr
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`switch network.`));
        }
      } catch (err) {
        dispatch(connectFailed("something went wrong."));
      }
    } else {
      dispatch(connectFailed("install metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

export function pickAddress(chainID){
  switch(chainID){
    //ETHEREUM
    case 1:
      return "0x23dcf3a5f8b3327c3d8c01974d41491a1791cdc2"
    //OPTIMISM
    case 10:
      return "0x05b2fc8ab800a1650a4989203bfdeec8b9731440"
    //FANTOM
    case 250:
      return "0xbcC0fbcc982AB58DabD0E0CA8fB8D1A08410CE7c"
    //POLYGON
    case 137:
      return "0xbcC0fbcc982AB58DabD0E0CA8fB8D1A08410CE7c"
    //AVALANCHE
    case 43114:
      return "0xa643e1778c82e213b90b430e9ae96c59ffcf5924"
    //BINANCE
    case 56:
      return "0x7eb26b6145f0c11da4ed95609f347a644062852e"
    //ARBITRIUM
    case 42161:
      return "0xb16ed82e07d93882378357d3cf7e3e92efd5abfb"
    //RINKEBY
    case 4:
      return "0x6D004bF78fd56BBD021492BfaE3E29dc52CF0e32"
    //MUMBAI
    case 80001:
      return "0xeae4734b79c141a23eb7865ede0ea1a21a23ce94"
    default:
      return "";
  }
}

export const switchNetwork = (networkName,networkId) => {

  return async (dispatch) => {
    let contractAddr = pickAddress(networkId);
    console.log(contractAddr)

    dispatch(switchRequest())
    const abiResponse = await fetch("/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        if(networkName == 'ethereum'){
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
              params: [{ chainId: Web3.utils.toHex(1) }],
            });
        }
        else{
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...networks[networkName]
                }
              ]
            })
        }

        const SmartContractObj = new Web3EthContract(
          abi,
          contractAddr
        );

        dispatch(
          switchSuccess({
            smartContract: SmartContractObj,
            web3: web3,
          })
        );
        dispatch(fetchData());
      } catch (err) {
        console.log("ERRORE")
        dispatch(switchFailed());
      }
    } else {
      dispatch(connectFailed("install metamask."));
    }
  };
};


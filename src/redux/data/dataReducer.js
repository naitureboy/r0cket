const initialState = {
    initialized: false,
    loading: false,
    totalSupply: 0,
    cost: 0,
    pubsaleOn: false,
    kickflip: false,
    maxSupply: 0,
    maxAmount: 0,
    maxPerWallet: 0,
    balance: 0,
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          totalSupply: action.payload.totalSupply,
          cost: action.payload.cost,
          pubsaleOn: action.payload.pubsaleOn,
          kickflip: action.payload.kickflip,
          maxSupply: action.payload.maxSupply,
          maxAmount: action.payload.maxAmount,
          maxPerWallet: action.payload.maxPerWallet,
          balance: action.payload.balance,
          error: false,
          errorMsg: "",
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          inizialized: false,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;
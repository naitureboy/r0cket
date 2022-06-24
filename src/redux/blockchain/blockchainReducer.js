const initialState = {
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: "",
    switchStatus: true,
  };
  
  const blockchainReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CONNECTION_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CONNECTION_SUCCESS":
        return {
          ...state,
          loading: false,
          account: action.payload.account,
          smartContract: action.payload.smartContract,
          web3: action.payload.web3,
        };
      case "CONNECTION_FAILED":
        return {
          ...initialState,
          loading: false,
          errorMsg: action.payload,
        };
      case "UPDATE_ACCOUNT":
        return {
          ...state,
          account: action.payload.account,
        };
      case "SWITCH_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "SWITCH_SUCCESS":
        return {
          ...state,
          loading: false,
          smartContract: action.payload.smartContract,
          web3: action.payload.web3,
          switchStatus: true,
        };
      case "SWITCH_FAILED":
        return {
          ...state,
          loading: false,
          switchStatus: false,
        };
      default:
        return state;
    }
  };
  
  export default blockchainReducer;
// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

      let cost = await store
      .getState()
      .blockchain.smartContract.methods.price()
      .call();

      let pubsaleOn = await store
      .getState()
      .blockchain.smartContract.methods.publicSale()
      .call();

      let kickflip = await store
      .getState()
      .blockchain.smartContract.methods.kickflipSale()
      .call();

      let maxSupply = await store
      .getState()
      .blockchain.smartContract.methods.supplyLimit()
      .call();

      let maxAmount = await store
      .getState()
      .blockchain.smartContract.methods.maxMintAmountPerTx()
      .call();

      let maxPerWallet = await store
      .getState()
      .blockchain.smartContract.methods.maxLimitPerWallet()
      .call();

      let balance = await store
      .getState()
      .blockchain.smartContract.methods.balanceOf(store.getState().blockchain.account)
      .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          cost,
          pubsaleOn,
          kickflip,
          maxSupply,
          maxAmount,
          maxPerWallet,
          balance
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
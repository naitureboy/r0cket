import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect, pickAddress } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import Web3 from "web3";
import DropDown from "../DropDownChain/DropDown";


export const Container = styled.div`
  width: 1350px;
  height: ${({ connected }) => (connected ? '1100' : '1380')}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  @media(max-width: 1354px){
    width: 100%;
  }

  @media(max-width: 402px){
    height: ${({ connected }) => (connected ? '1200' : '1380')}px;
  }

  @media(max-width: 368px){
    height: ${({ connected }) => (connected ? '1400' : '1480')}px;
  }

  @media(max-width: 352px){
    height: ${({ connected }) => (connected ? '1400' : '1480')}px;
  }
`;

export const Title = styled.h1`
  color: #a7db4e;
  font-size: 70px;
  height: 0;
`;

export const Text = styled.p`
  width: 60%;
  font-size: 35px;
  color: white;
  transition: width .3s ease;

  ${(
    ({ connected }) => (
      connected ?
        (
          `
          @media(max-width: 1206px){
            width: 80%;
          }

          @media(max-width: 737px){
            width: 90%;
          }

          @media(max-width: 655px){
            font-size: 30px;
          }

          @media(max-width: 497px){
            width: 95%;
          }

          @media(max-width: 475px){
            font-size: 27px;
          }
          `
        )
        :
        (
          `
          @media(max-width: 1100px){
            font-size: 30px;
          }

          @media(max-width: 872px){
            width: 70%;
          }

          @media(max-width: 680px){
            width: 85%;
          }

          @media(max-width: 556px){
            width: 95%;
          }

          @media(max-width: 500px){
            font-size: 27px;
          }
          `
        )
    )
  )}
`;

export const InfoBox = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media(max-width: 604px){
    width: 100%;
  }
`;

export const InfoText = styled.p`
  font-size: 40px;
  color: white;
  margin-top: 0;
  margin-bottom: 0;

  @media(max-width: 437px){
    font-size: 35px;
  }
`;

export const Roadmap = styled.div`
  width: 600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 604px){
    width: 100%;
  }
`;

export const Line = styled.div`
  width: 200px;
  height: 10px;
  background-color: white;
  transition: width .3s ease;

  @media(max-width: 596px){
    width: 150px;
  }

  @media(max-width: 466px){
    width: 100px;
  }

  @media(max-width: 364px){
    width: 80px;
  }
`;

export const Point = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  color: #a7db4e;

  :before{
    content: '';
    width: 10px;
    height: 10px;
    background-color: #a7db4e;
  }

  :hover div{
    display: flex;
    animation: appear .2s ease-in-out;
  }

  div{
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 150px;
    height: 70px;
    position: absolute;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 100px;
    opacity: 1;
    transition: width .3s ease;
  }

  div h1{
    font-size: 20px;
    text-align: center;
    color: black;
    margin-top: 0;
    margin-bottom: 0;
  }

  @keyframes appear{
    0%{
      transform: translateY(5px);
      opacity: 0;
    }
    100%{
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media(max-width: 492px){
    div{
      width: 120px;
    }
  }
`;

export const ConnectBtn = styled.div`
  border-radius: 10px;
  width: 250px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 38px;
  cursor: pointer;
  animation: ${({ loading }) => (loading ? 'bounce .6s ease infinite' : '')};
  ${({ disabled, loading }) => (
    disabled || loading ?
      `
        border: 3px solid red;
        color: red;
      `
      :
      `
        border: 3px solid #a7db4e;
        color: #a7db4e;
        transition: all .2s ease;

        :hover{
            background-color: #a7db4e;
            color: white;
            animation: bounce .6s ease;
        }
      `
  )
  }

  :before{
      content: '${({ connected, disabled, loading }) => (loading ? "loading" : (connected ? 'connect wallet' : (disabled ? 'disabled' : 'mint')))}';
  }

  @keyframes bounce {
    0% {
        transform: scale(1,1) translate(0px, 0px);
    }

    30%{
        transform: scale(1,0.8) translate(0px, 10px); 
    }

    75%{
        transform: scale(1,1.1) translate(0px, -25px); 
    }

    100% {
        transform: scale(1,1) translate(0px, 0px);
    }
  }
`;

export const MintAmountSection = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  font-size: 40px;
`;

export const MintAmountButton = styled.div`
  width: 27px;
  height: 30px;
  border: 3px solid #a7db4e;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a7db4e;
  font-size: 40px;
  padding-left: 3px;
  cursor: pointer;

  ::selection{
    background-color: unset;
  }
`;

function InteractionPanel() {

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [mintAmount, setMint] = useState(1);
  const [chainInfo, setInfo] = useState({
    chainID: 1,
    contractAddress: pickAddress(1)
  })
  const [currentChain, updateChain] = useState(4)

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const updateInfo = (id) => {
    let obj = {
      chainID: id,
      contractAddress: pickAddress(id)
    }
    setInfo(obj)
  }

  const mint = () => {
    if (data.kickflip) {
      blockchain.smartContract
        .methods.Kickflip(mintAmount)
        .send(
          {
            from: blockchain.account,
            to: chainInfo.contractAddress,
            value: 0,
            gasLimit: null,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          }
        )
        .once("error", (err) => {
          console.log(err);
        })
        .then((receipt) => {
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
        });
    }
    else if (data.pubsaleOn) {
      let totalCostWei = mintAmount * Number(data.cost)
      blockchain.smartContract
        .methods.PublicMint(mintAmount)
        .send(
          {
            from: blockchain.account,
            to: "",
            value: totalCostWei,
            gasLimit: null,
            maxPriorityFeePerGas: null,
            maxFeePerGas: null
          }
        )
        .once("error", (err) => {
          console.log(err);
        })
        .then((receipt) => {
          console.log(receipt);
          dispatch(fetchData(blockchain.account));
        });
    }
  }

  const increment = () => {
    if (mintAmount < data.maxAmount || data.kickflip) setMint(mintAmount + 1)
  }

  const decrement = () => {
    if (mintAmount > 1) setMint(mintAmount - 1)
  }

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  document.addEventListener('chain', function (e) {
    setInfo({
      chainID: e.detail.chain,
      contractAddress: pickAddress(e.detail.chain)
    })
    console.log(e.detail.chain)
  }, false)

  return (
    <Container connected={blockchain.account == null || data.balance >= data.maxPerWallet}>
      <Title>header</Title>
      <Text connected={true}>
        the r0cket flippers airdrop symbolizes and marks the first major project after the initial release of the st0ked collection. in skateboarding one of the first tricks you learn on your journey is a kickflip, but when learning them you have to go thru a phase of “rocket flips” and this is where the name of this airdrop derives from. nobody starts off having a clean, leveled out/boned kick flip that they catch in the air. you have to work for that to get your kickflips looking the way you want them to and higher, faster, and more consistent. just like in skateboarding you have to pay your dues to earn learning a new trick, the st0ked collection is just getting started and this is our first step forward with the project. you have to pay your dues, spend the time to earn your trick and respect. we wanted to reward our early holders and community for what we’ve been able to accomplish thus far - but this symbolizes more then just an airdrop. it is the next step in continuing the lifelong journey for the never ending desire for mastery and progress. just like in skateboarding, the journey starts when you get hooked in  - and for most of us never really ends. it is a lifelong passion, and this project to me will be a lifelong project. i’m st0ked to see where it goes, and hope you stick around for the journey. till the wheels fall off… stay st0ked.
      </Text>
      <Roadmap>
        <Point>
          <div>
            june 21st
            <h1>
              (go skate day!) <br />claim begins
            </h1>
          </div>
        </Point>
        <Line />
        <Point>
          <div>
            june 26th
            <h1>
              claim ends
            </h1>
          </div>
        </Point>
        <Line />
        <Point>
          <div>
            june 27th
            <h1>
              public<br />unclaimed mint
            </h1>
          </div>
        </Point>
      </Roadmap>
      {
        blockchain.account == null || data.balance >= data.maxPerWallet ?
          (
            <></>
          )
          :
          (
            !data.kickflip && !data.pubsaleOn ?
              (
                <></>
              )
              :
              (
                <InfoBox>
                  <InfoText>
                    supply: {blockchain.account == null ? "" : `${data.totalSupply}/${data.maxSupply}`}
                  </InfoText>
                  <InfoText>
                    price: {blockchain.account == null ? "" : `${(Number(Web3.utils.fromWei(data.cost.toString())) * mintAmount).toFixed(5)}`}
                  </InfoText>
                </InfoBox>
              )
          )
      }
      <DropDown />
      <ConnectBtn
        connected={blockchain.account == null}
        disabled={blockchain.account == null ? false : data.balance >= data.maxPerWallet || !data.kickflip && !data.pubsaleOn}
        loading={data.loading}
        onClick={(e) => {
          if (blockchain.account == null) {
            e.preventDefault();
            dispatch(connect(chainInfo.chainID))
            getData()
          }
          else if (data.balance < data.maxPerWallet) {
            mint()
          }
        }}
      />
      {/*<button onClick={() =>{ console.log(data.kickflip) }}>CLICCAMI</button>*/}
      {
        blockchain.account == null || data.balance >= data.maxPerWallet ?
          (
            <></>
          )
          :
          (
            !data.kickflip && !data.pubsaleOn ?
              (
                <></>
              )
              :
              (
                <MintAmountSection>
                  <MintAmountButton
                    onClick={() => decrement()}
                  >
                    -
                  </MintAmountButton>
                  {mintAmount}
                  <MintAmountButton
                    onClick={() => increment()}
                  >
                    +
                  </MintAmountButton>
                </MintAmountSection>
              )
          )
      }
    </Container>
  );
}

export default InteractionPanel;
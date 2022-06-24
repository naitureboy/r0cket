import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";

export const Container = styled.div`
  width: 90%;
  height: 80px;
  background-color: #ff767b;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: width .3s ease;

  @media(max-width: 606px){
    width: 100%;
  }
`;

export const Left = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-y: hidden;

    @media(max-width: 388px){
      margin-left: -20px;
    }
`;

export const ConnectBtn = styled.div`
    border: 3px solid #a7db4e;
    border-radius: 30px;
    width: 150px;
    height: 40px;
    color: #a7db4e;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-right: 20px;
    cursor: pointer;
    transition: all .2s ease;

    :hover{
        background-color: #a7db4e;
        color: white;
    }

    :before{
        content: '${({connected}) => (connected ? 'connect wallet' : 'connected')}';
    }
`;

export const LogoTitle = styled.h1`
  color: white;
  font-size: 60px;

  @media(max-width: 456px){
    font-size: 55px;
  }

  @media(max-width: 418px){
    font-size: 40px;
  }

  @media(max-width: 388px){
    margin-left: -10px;
  }
`;

export const Logo = styled.img`
  height: 130px;
  margin-top: 10px;

  @media(max-width: 456px){
    height: 100px;
  }
`;

function Header() {

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [chain, setChain] = useState(4)

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  document.addEventListener('chain', function(e){
    setChain(e.detail.chain)
  },false)

  return (
    <Container>
        <Left>
          <Logo src="/imgs/logo.png"/>
          <LogoTitle>st0ked</LogoTitle>
        </Left>
        <ConnectBtn
          connected = {blockchain.account == null}
          onClick = {(e) =>{
            if(blockchain.account == null){
              e.preventDefault();
              dispatch(connect(chain))
              getData()
            }
          }}
        />
    </Container>
  );
}

export default Header;
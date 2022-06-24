import styled from "styled-components";
import Header from "./Header/Header";
import InteractionPanel from "./InteractionPanel/InteractionPanel";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//MAX 348px

export const Container = styled.div`
  width: 100%;
  height: 1800px;
  background-color: #ff767b;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 100px;
  overflow-x: hidden;
`;

export const TextContainer = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  color: white;
  height: 20px;
  font-size: 100px;
`;

export const GifContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height .3s ease;

  @media(max-width: 1186px){
    height: 300px;
  }

  @media(max-width: 894px){
    height: 200px;
  }
`;

export const Gif = styled.img`
  width: 100%;
  min-height: 502px;
  min-width: 809px;
`;

export const SubTitle = styled.h1`
  color: red;
  font-size: 50px;
`;

export const ErrorContainer = styled.div`
  width: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: ${({appear}) => (appear ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  position: fixed;
  top: 15px;
  background-color: rgb(255,0,0,.3);
  border: 5px solid red;
  border-radius: 10px;
  font-size: 35px;
  color: white;
  animation: ${({animate}) => (animate ? "appear" : "disappear")} .3s ease;

  @keyframes appear{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  @keyframes disappear{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
`;

function App() {

  const [animation, setAnimation] = useState(false)
  const [appear, setAppear] = useState(false)
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  useEffect(() =>{
    if(blockchain.errorMsg != "" || data.errorMsg != ""){

      setAppear(true)
      setAnimation(true)
      setTimeout(() => setAnimation(false), 1400)
      setTimeout(() => setAppear(false), 1500)
    }
  }, [blockchain.errorMsg,data.errorMsg])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <Header/>
      <ErrorContainer appear={appear} animate={animation}>
        {
          blockchain.errorMsg != "" || data.errorMsg != "" ?
          (
            blockchain.errorMsg != "" ? blockchain.errorMsg : data.errorMsg
          )
          :
          (
            <></>
          )
        }
      </ErrorContainer>
      <Container>
        <GifContainer>
          <Gif src="/imgs/skater.gif"/>
        </GifContainer>
        <TextContainer>
          <Title>
            r0cket
          </Title>
          <SubTitle>
            flippers
          </SubTitle>
        </TextContainer>
        <InteractionPanel/>
      </Container>
    </div>
  );
}

export default App;

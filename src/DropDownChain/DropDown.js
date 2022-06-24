import styled from "styled-components";
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { switchNetwork } from "../redux/blockchain/blockchainActions";
import { useDispatch, useSelector } from "react-redux";

export const Container = styled.div`
    height: 60px;
    width: 250px;
    overflow: ${({visible}) => (visible ? 'visible' : 'hidden')};
`;

export const HiddenContainer = styled.div`
    display:flex;
    flex-direction: column;
    wrap: reverse;
    margin-top: -360px;
`;

export const Blockchain = styled.div`
    border-radius: ${({shape}) => (shape ? '0' : '10')}px;
    height: 60px;
    width: 250px;
    background-color: #ededeb;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    ${({last}) => (last ? 'transition: all .2s ease;' : 'transition: background-color .2s ease;')}

    p{
        font-size: 30px;
        color: black;
    }

    ${({last}) => (
        last ? 
        ``
        : 
        `
            :hover{
                background-color: #bfbfbf;
            }
        `
    )}
`;

export const Logo = styled.img`
    width: 15px;
`;

function DropDown() {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const[visible,setVisible] = useState(false)
    const[current,setCurrent] = useState(1)
    const[backup,saveID] = useState()
    const[networks,setNetworks] = useState(
        [
            {
                id: 10,
                name: "optimism",
                logo: "/imgs/optimism.png"
            },
            {
                id: 42161,
                name: "arbitrium",
                logo: "/imgs/arbitrium.png"
            },
            {
                id: 250,
                name: "fantom",
                logo: "/imgs/fantom.png"
            },
            {
                id: 43114,
                name: "avalanche",
                logo: "/imgs/avalanche.png"
            },
            {
                id: 56,
                name: "binance",
                logo: "/imgs/binance.png"
            },
            {
                id: 137,
                name: "polygon",
                logo: "/imgs/polygon.png"
            },
            {
                id: 1,
                name: "ethereum",
                logo: "/imgs/ethereum.png"
            }
        ]
    )

    const disposeNetworks = (chainID) =>{
        let shuffleNetwork = networks;
        for(let i = 0; i < shuffleNetwork.length; i++){
            if(shuffleNetwork[i].id == chainID){
                let aux = shuffleNetwork[shuffleNetwork.length - 1]
                shuffleNetwork[shuffleNetwork.length - 1] = shuffleNetwork[i]
                shuffleNetwork[i] = aux;
                break;
            }
        }
        setNetworks(shuffleNetwork)
    }

    const switchChain = (networkName,chainID) =>{
        disposeNetworks(chainID)
        saveID(current)
        setCurrent(chainID)
        if(blockchain.account != null) dispatch(switchNetwork(networkName,chainID))
    }

    let changeChain = new CustomEvent('chain',{
        detail:{
            chain: current
        }
    })

    useEffect(() =>{
        document.dispatchEvent(changeChain)
    }, [current])

    useEffect(() =>{
        if(!blockchain.switchStatus){
            disposeNetworks(backup)
            setCurrent(backup)
        }
    }, [blockchain.switchStatus])

    return (
        <Container visible={visible}>
            <HiddenContainer>
                {
                    networks.map((n,i) =>(
                        <Blockchain 
                            key={i}
                            last = {i == networks.length - 1}
                            shape = {visible}
                            onClick = {
                                () =>{
                                    if(i == networks.length - 1 && !visible) setVisible(true)
                                    else{
                                        setVisible(false)
                                        if(i != networks.length - 1) switchChain(n.name,n.id)
                                    }
                                }
                            }
                        >
                            {i == networks.length - 1 ? <FontAwesomeIcon icon={Icons.faAngleUp}/> : <FontAwesomeIcon icon={Icons.faCircleNodes}/>}
                            <p>{n.name}</p>
                            <Logo src={n.logo}/>
                        </Blockchain>
                    ))
                }
            </HiddenContainer>
        </Container>
    );
}

/*
OPTIMISTIC
POLYGON 
FANTOM
ARBITRIUM
BINANCE
AVALANCHE
ETHEREUM
*/


export default DropDown;

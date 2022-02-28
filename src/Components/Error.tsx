import React from 'react'
import styled from "styled-components";

function Error(props: { handleClose: () => void; error: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  return (
    <Container>
        <div>
            <img onClick={()=>props.handleClose()} src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-close-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png" alt=""/>
            <h2>Error</h2>
            <p>{props.error}</p>
        </div>
    </Container>
  )
}

export default Error

const Container=styled.div`
    z-index:1000;
    position: fixed;
    overflow: hidden;
    top:0;
    left:0;
    right:0;
    bottom:0;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:rgba(0,0,0,0.4);
    
    &>div{
        position: relative;
        border-radius:10px;
        padding:10px;
        max-width:350px;
        min-width:300px;
        background-color:white;
        
        text-align: center;

        &>img{
            position:absolute;
            width:30px;
            top:10px;
            right:10px;
            cursor:pointer;
        }
    }
`;

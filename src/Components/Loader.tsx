

import React from 'react'
import styled from "styled-components";

function Loader() {
  return (
    <Container>
        <div>
            <img src="/loader.gif" alt=""/>
        </div>
    </Container>
  )
}

export default Loader

const Container=styled.div`
    z-index:1000;
    position: absolute;
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
        max-width:100px;
        min-width:100px;
        text-align: center;

        &>img{
            width:100%;
        }
    }
`;
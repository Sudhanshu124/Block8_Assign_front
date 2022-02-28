import { type } from 'os';
import react, { useState } from 'react';
import styled from 'styled-components';
import updateWallet from '../Api/upDateWallet';
const UpdateUser=(props: { userId: string,handleClose: () => void; update: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; })=>{
    const [walletSize,setWallet]=useState({wallet:0});
    const handleUpdate=async ()=>{
        var wallet=walletSize.wallet;
         const res=await updateWallet(wallet,props.userId);
         //props.handleClose();
         window.location.reload();
    }
return(
   
    <Container>
        <div>
           <img onClick={()=>props.handleClose()} src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-close-banking-and-finance-kiranshastry-lineal-color-kiranshastry.png" alt=""/>
            <Div>
             <label htmlFor="name">Wallet size</label>
             <StyledInput onChange={(e)=>setWallet({wallet:parseInt(e.target.value)})} type="number" name="wallet"
              placeholder="Enter Wallet amount" value={walletSize.wallet===0?"":walletSize.wallet} />  
            </Div>
            <Button onClick={handleUpdate}>Submit</Button>
        </div>
    </Container>
)
}
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
    max-width:350px;
    min-width:300px;
    background-color:white;
    height:300px;
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
const Div= styled.div`
margin: 30px 2px 5px 1px;
font-weight: bold;
font-size: 25px;
color:green;
`
const StyledInput= styled.input`
display:flex;
flex-direction: column;
justify-content:center;
align-items: center;
width:100%;
margin-top:20px;
height:30px;
border-color:green;
border-radius:5px
`
const Button= styled.button`
margin-top: 20px;
width:100%;
height:30px;
color:white;
background-color:green;
border-radius:5px;
&:hover{
    transform: Scale(1.02);
    transition-duration:0.5s;
  }
`
export default UpdateUser;
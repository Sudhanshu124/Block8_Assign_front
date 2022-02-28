import React,{useState} from 'react'
import styled from 'styled-components';
import Loader from "../Components/Loader"
import buyTicket from "../Api/buyTicket";
import { useNavigate } from "react-router-dom"

function TicketCard(props:any) {

  const date=new Date(props.createdAt);
  const lastUpdatedOn=new Date(props.updatedAt);
  const [loader,setLoader] = useState(false);
  const navigate=useNavigate();


  const handleBuy=async ()=>{
    //handle ticket buy here
    if(props.participants.includes(localStorage.getItem("id"))){
      return;
    }
    setLoader(true);
    const res=await buyTicket(localStorage.getItem("id"),props._id,localStorage.getItem("token"))
    setLoader(false);
    if(res.result){
      navigate("/draw/"+localStorage.getItem("id")+"/"+props._id)
    }else{
      props.showError(res.error);
    }
  }


  return (
    <Container>
      {loader && <Loader/>}
      <h1>Winning Sum: <span className="yellowtxt">₹ {props.winningSum}</span> </h1>
      
      <p> <span></span></p>
      <p> <span></span></p>
      <table>
        <tbody>
          <tr>
            <td>
              <h2>TICKET ID:</h2>
            </td>
            <td>
              <h2 className="ticketid">{props._id}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <h3>CREATED ON:</h3>
            </td>
            <td>
              <h3>{date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <h3>LAST UPDATED:</h3>
            </td>
            <td>
              <h3>{lastUpdatedOn.getDate()+"-"+(lastUpdatedOn.getMonth()+1)+"-"+lastUpdatedOn.getFullYear()}</h3>
            </td>
          </tr>
          <tr>
            <td>
              <h3>PARTICIPANTS: </h3>
            </td>
            <td>
              <h3><span className="whitetxt">{props.participants.length}</span>/5</h3>
            </td>
          </tr>
        </tbody>
      </table>
      <Buy onClick={handleBuy} disabled={props.participants.includes(localStorage.getItem("id"))}>BUY NOW @ ₹ {props.buyPrice} </Buy>
    </Container>
  )
}

export default TicketCard

const Container=styled.div`
    width:100%;
    border:4px solid #1BA94C;
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(191,233,205,1) 62%, rgba(27,169,76,1) 100%);
    box-shadow: -4px -1px 19px 1px rgba(0,0,0,0.75);
    border-radius: 10px;
    margin:0 0 20px;
    

    &>h1{
      padding:10px;
    }
    .yellowtxt{
        color:#F4A442;
      }
      .whitetxt{
        color:white;
      }

      table{
        width:100%;
         padding:10px;
        td:first-child{
          color:#1BA94C;
        }
        td:last-child{
          text-align: right;
        }
      }


    &:hover{
      transform:Scale(1.02);
      transition-duration: 0.4s;
    }
    

    @media only screen and (max-width: 1000px) {
      
      table{
        width:100%;
       
        td:first-child{
          color:#1BA94C;
          font-size:14px;
        }
        .ticketid{
          font-size:11px;
        }
      }
    }
`;

const Buy=styled.div<{disabled:boolean}>`
  width:100%;
  padding:15px;
  // background-color:#1BA94C;
  background-color:${props=> props.disabled ? "grey":"#1BA94C"};
  color:white;
  font-size:20px;
  cursor:pointer;
  border-radius: 0 0 5px 5px;
  font-weight:bold;

  &:hover{
    // background-color: #81B214;
    background-color:${props=> props.disabled ? "grey":"#1BA94C"};
  }
`;




import React from 'react'
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function TransactionCard(props:any) {

    const date=new Date(props.createdAt);
    const navigate=useNavigate();


 function handleTicket(){
     navigate("/draw/"+props.userId+"/"+props.ticketId)
 }
  return (
    <Container>
        <table>
            <tbody>
                <tr>
                    <td>Transaction ID:</td>
                    <td>{props._id}</td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>{date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}</td>
                </tr>
                <tr>
                    <td>Ticket ID:</td>
                    <td>{props.ticketId}</td>
                </tr>
                <tr>
                    <td>User ID:</td>
                    <td>{props.userId}</td>
                </tr>
                <tr>
                    <td>Previous Balance:</td>
                    <td>₹ {props.previousBalance}</td>
                </tr>
                <tr>
                    <td>Closing Balance:</td>
                    <td>{props.closingBalance < props.previousBalance? "🔻":"🔼"} ₹  {props.closingBalance} </td>
                </tr>
            </tbody>
        </table>
        <Button onClick={handleTicket}>
            View this Ticket
        </Button>
    </Container>
  )
}

export default TransactionCard


const Container=styled.div`
    width:100%;
    border-radius:10px;
    margin:10px 0;
    padding:10px;
    border:2px solid green;
    box-shadow: 1px 1px 14px 0px rgba(0,0,0,0.75);
    table{
        width:100%;
        td:first-child{
            font-weight: bold;
        }
        td:last-child{
            text-align:right
        }
    }
`;

const Button=styled.div`
    padding:10px;
    width:100%;
    color:white;
    border-radius:10px;
    background-color:#357C3C;
    cursor:pointer;
    text-align:center;
    &:hover{
        transform: Scale(1.02);
        transition-duration: 0.3s;
    }
`;
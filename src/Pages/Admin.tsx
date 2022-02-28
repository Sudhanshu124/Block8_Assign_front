import React,{useState,useEffect} from 'react'
import Header from "../Components/Header"
import Loader from "../Components/Loader"
import Error from "../Components/Error"
import getAllTickets from '../Api/getAllTickets';
import getAllUsers from '../Api/getAllUsers';
import styled from "styled-components"
import AdminToggler from '../Components/AdminToggler';
import {Navigate} from "react-router-dom";

function Admin() {
    
  const [tickets,setTickets]=useState([]);
  const [users,setUsers]=useState([]);
  const [error,setError]=useState("");
  
  const [openTicketCount,setOpenTicketCount]=useState(0);
 const [closedTicketCount,setClosedTicketCount]=useState(0);
  const isAdmin:any=localStorage.getItem('isAdmin');

  useEffect(() => {
    async function onLoad(){
      const ticketRes=await getAllTickets(localStorage.getItem("token"));
      const userRes=await getAllUsers(localStorage.getItem("token"));
      if(ticketRes.result){
        let open=0;
        let closed=0;
         ticketRes.data.forEach((o:any)=>{
          if(o.participants.length===5) {
            closed++;
          }
          else {
            
            open++;
          }
        })
        setOpenTicketCount(open);
        setClosedTicketCount(closed);
        setTickets(ticketRes.data);
      }else{
        setError(ticketRes.error);
      }

      if(userRes.result){
        setUsers(userRes.data);
      }else{
        setError(userRes.error);
      }
    }
    onLoad();
  },[])


  function handleErrorClose(){
    setError("");
  }
  return (
    <div>
      {!localStorage.getItem("token") && <Navigate to="/"/>}
      {isAdmin==="false" && <Navigate to="/home"/>}
      {error && <Error handleClose={handleErrorClose} error={error}/>}
        <Header/>
        <Cards>
          <Card><h2>Total Tickets</h2><h1>{tickets.length}</h1></Card>
           <Card><h2>Total Open Tickets</h2><h1>{openTicketCount}</h1></Card>
            <Card><h2>Total Closed Tickets</h2><h1>{closedTicketCount}</h1></Card>
             <Card><h2>Total Users</h2><h1>{users.length}</h1></Card>
        </Cards>
        <AdminToggler users={users}/>
    </div>
  )
}

export default Admin;

const Cards=styled.div`
  display:flex;
  justify-content: space-between;
  margin:20px 0;
  padding:0 10px;
  gap:20px;

  @media only screen and (max-width:768px){
    flex-direction: column;
  }
`;

const Card=styled.div`
  flex:1;
   background-color: #1ba94c;
  border-radius:10px;
  padding:10px;
  box-shadow: 1px 1px 14px 0px rgba(0,0,0,0.75);

  &>h2{
    color:white;
    text-align:center;
  }

  &>h1{
    color:white;
    text-align:center;
  }
`;
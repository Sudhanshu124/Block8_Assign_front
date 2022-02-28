import React from 'react'
import Header from "../Components/Header"
import {Navigate} from "react-router-dom";
import styled from "styled-components";
import TicketCard from "../Components/TicketCard"
import getOpenTickets from '../Api/getOpenTickets';
import {useState,useEffect} from "react";
import Loader from "../Components/Loader"
import Error from "../Components/Error"
import getUser from "../Api/getUser"


interface userDetails{
  email?: string,
  name?: string,
  participatedBids?:number,
  wallet?: number,
  wonBids?: number,
  _id?: string
}

interface ticketDetails{
  buyPrice: number
  createdAt: Date
  drawn: boolean
  participants: [string]
  startedOn: Date
  updatedAt: Date
  winningSum: number
  _id: string
}

function Home() {

  const [openTickets,setOpenTickets]=useState([]);
  const [loader,setLoader]=useState(false);
  const [error,setError]=useState("");
  const [currentUserDetails,setCurrentUserDetails]=useState<userDetails>({});
  const [reload,setReload]=useState(false);


  //will run only one time when component is loaded
  useEffect(() => {
    async function onLoad(){
      setLoader(true);
      const res=await getOpenTickets(localStorage.getItem("token"));
      const res2=await getUser(localStorage.getItem("id"),localStorage.getItem("token"));
      setLoader(false);
      if(res.result){
        //handle success
        setOpenTickets(res.data);
      }else{
        //handle error
        setError(res.error);
        return;
      }
      if(res2.result){
        console.log(res2.data);
        setCurrentUserDetails(res2.data);
      }else{
        setError(res.error);
        return;
      }
    }
    onLoad();
  },[reload])
  

  function handleErrorClose(){
    setError("")
  }

  function handleReloader(){
    setReload(!reload);
  }

  function showError(msg:string){
    setError(msg);
  }
  return (
    <div>
    {!localStorage.getItem("token") && <Navigate to="/"/>}
    {loader && <Loader/>}
    {error && <Error handleClose={handleErrorClose} error={error}/>}
        <Header username={currentUserDetails.name}/>
        <Container>
          <Tickets>
            {openTickets.length<=0 ? <h3 style={{textAlign:"center",color:"grey"}}>No Ticket available, Please check back later</h3> :openTickets.map((obj:ticketDetails)=><TicketCard showError={(msg:string)=>showError(msg)} handleReload={handleReloader} key={obj._id} {...obj}/>)}
          </Tickets>
          <Info>
              <h2 style={{textAlign:"center"}}>DASHBOARD</h2>
              <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" alt=""></img>
              <table>
                <tbody>
                  <tr>
                    <td>User ID:</td>
                    <td>{currentUserDetails._id}</td>
                  </tr>
                   <tr>
                    <td>User Name:</td>
                    <td>{currentUserDetails.name}</td>
                  </tr>
                  <tr>
                    <td>Your Wallet:</td>
                    <td>{currentUserDetails.wallet} 💰</td>
                  </tr>
                  <tr>
                    <td>Participated Bids:</td>
                    <td>{currentUserDetails.participatedBids}</td>
                  </tr>
                  <tr>
                    <td>Won Bids:</td>
                    <td>{currentUserDetails.wonBids}</td>
                  </tr>
                </tbody>
              </table>

              <News>
                <h2>Latest News</h2>
                <div>
                  <b>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical </b>
                  <p>Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.</p>
                </div>
                <div>
                  <b>Latin literature from 45 BC, making it over 2000 years old</b>
                  <p>Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure </p>
                </div>
              </News>
          </Info>
        </Container>
    </div>
  )
}

export default Home

const Container=styled.div`
  
  display:flex;
  align-items:start;
  padding:50px 200px;
  @media only screen and (max-width:1240px){
    padding:50px 20px;
  }
  @media only screen and (max-width:768px){
    flex-direction: column-reverse;
  }
`;

const Tickets=styled.div`
  width:100%;
  padding:0 20px;

  @media only screen and (max-width:768px){
    padding:0;
  }
`;

const Info=styled.div`
  position:sticky;
  top:0px;
  width:100%;
  max-width:400px;
  margin:0 auto;
  background-color:#1BA94C;
  padding:15px;
  color:white;
  font-size: 18px;
  border-radius:10px;
  margin-bottom: 30px;

  img{
    width:30%;
    display:block;
    margin:0 auto;
  }

  @media only screen and (max-width:768px){
    max-width:768px;
    position: static;
  }

  table{
    width:100%;
    margin:20px 0;
  }
  td:last-child{
    text-align:right;
  }

`;

const News=styled.div`
  color:black;
  background-color:#EEEDDE;
  border-radius: 5px;
  padding:5px;

  &>div{
    padding:5px;
    border:2px solid #008E89;
    margin:10px 0;
  }

  @media only screen and (max-width: 768px) {
    display:none;
  }
`;
import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import Header from "../Components/Header"
import {io} from "socket.io-client";
import {BACKEND_URL} from "../constants";
import {useParams} from "react-router-dom";

function Draw() {

  const [socket,setSocket]=useState<any>(null);
  const {userId,ticketId} =useParams();
  const [message,setMessage]=useState("");
  const [result,setResult] = useState("");
  const [counter,setCounter] = useState<number>();
  console.log(userId,ticketId);

  //  socket.on("connect",()=>console.log("Connected"))
 
  

  useEffect(() =>{
    const newSocket=io(BACKEND_URL);
    setSocket(newSocket);
    

  },[setSocket])

  useEffect(() =>{
    if(socket)socket.emit("join",{id:userId,room:ticketId,ticketId:ticketId});
    if(socket)socket.on("message",(msg:any)=>{
      setMessage(msg)})
    if(socket)socket.on("success",(winner:string)=>{
      setMessage("")
      setCounter(undefined);
      setResult(winner)
      socket.close();
    })
    if(socket)socket.on("count",(count:number)=>{
      setCounter(undefined);
      setMessage("")
      setCounter(count)})

  },[socket])
  return (
    <Container>
        <Header/>
        <h1>Welcome to the Draw</h1>
        {message && <h2>{message}</h2>}
        {counter && <h4>{counter}</h4>}
        {result && <div>
          {localStorage.getItem("id")===result ? <Success>
              <h1>Congratulations! You Won</h1>
              <h3> Winning Sum has been credited to your wallet</h3>
          </Success>:
          <Loss>
              <h1>Oops! You Loose.</h1>
              <h3>Better Luck Next Time.</h3>
          </Loss>}
        </div>}
    </Container>
  )
}

export default Draw

const Container=styled.div`
  &>h1,&>h2,&>h4{
    text-align: center;
  }
  &>h1{
    margin:30px 0;
    font-size: 35px;
  }

  &>h4{
    font-size: 55px;
  }
`;

const Success =styled.div`

  background-image: url(https://i.gifer.com/6k2.gif);
  width: 100%;
  height:70vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;

  &>h1{
    color:#FFD32D;
    font-size:50px;
  }
`;

const Loss =styled.div`
background-image: url(https://i.pinimg.com/originals/91/95/f4/9195f4dd1b69f90038f627c8af422429.gif);
  width: 100%;
  height:70vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
   text-align:center;

  &>h1{
    color:red;
    font-size:50px;
  }
`;
import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import TransactionCard from "../Components/TransactionCard";
import getUserTransactions from "../Api/getUserTransactions"
import Error from "../Components/Error"
import Header from "../Components/Header"
function Transactions() {

    const [transactions,setTransactions]=useState([]);
    const [error,setError]=useState("")

    useEffect(() =>{
        async function onLoad(){
            const res=await getUserTransactions(localStorage.getItem("id"),localStorage.getItem("token"));
            if(res.result){
                
                setTransactions(res.data.reverse());
            }else{
                setError(res.error);
            }
        }
        onLoad();
    },[])


    const handleErrorClose=()=>{
        setError("");
    }
  return (
      <div>
          <Header/>
          <Container>
        
        {error && <Error handleClose={handleErrorClose} error={error}/>}
        {transactions.map((obj:any)=><TransactionCard key={obj._id} {...obj}/>)}
    </Container>
      </div>
    
  )
}

export default Transactions;

const Container=styled.div`
    width:100%;
    max-width:600px;
    min-height: 100vh;
    margin:0 auto;
`;
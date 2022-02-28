import React,{useState} from 'react'
import styled from "styled-components";
import getUserDelete from '../Api/getUserDelete';
import Loader from "../Components/Loader"
import UpdateUser from "../Pages/UserUpdate"
import CreateTicket from "../Api/createTicket"
import Error from "../Components/Error"
function AdminToggler(props:any) {

    const [firstSelected,setFirstSelected]=useState(true);
    const [loader,setLoader]=useState(false);
    const [update,setUpdate]=useState({show:false,id:""});
    const [createTicket,setCreateTicket]=useState();
    const [err,setError]=useState("");
    const [winSum,setWinSum]=useState("500");
    //Handle user Update
   // setLoader(true);
   const data={
       
   }
    const handleUpdate=(userId:string) =>{
        
        // getUserUpdate(userId,data)
        setUpdate({show:true,id:userId});
    }
    
    const handleDelete=async (userId:string) =>{
       
        await getUserDelete(userId);
         window.location.reload();
       
    }
    const handleUpdateClose=()=>{
        setUpdate({show:false,id:""});
    }
  //
    //handle Create Ticket
    const handleCreateTicket=async(e:any) =>{
        e.preventDefault();
        console.log(winSum);
        if(!winSum)
        {
            setError("All fields are mandatory")
            return;
        }
        const res=await CreateTicket(parseInt(winSum));
        if(res.result==="Success"){
            window.location.reload();
        }
        else{
            setError(res.data)
        }
        //
       
         
        //code below----

    }
    const handleClose=()=>{
      setError("");
      
    }
  return (
   <Container>
       
       <Toggler firstSelected={firstSelected}>
           <div onClick={()=>setFirstSelected(true)}>Show All Users</div>
           <div onClick={()=>setFirstSelected(false)}>Create a Ticket</div>
       </Toggler>
       <View>
       
           {firstSelected ? 

           //if FirstSelected is true show below table
            <table>
               <thead>
                   <tr>
                       <th>ID</th>
                       <th>NAME</th>
                       <th>EMAIL</th>
                       <th>WALLET</th>
                       <th>PARTICIPATED BIDS</th>
                        <th>WON BIDS</th>
                       <th colSpan={2}>ACTION</th>
                       
                   </tr>
               </thead>

               <tbody>
                    {props.users.map((obj:any)=>{
                        return <tr>
                            <td>{obj._id}</td>
                             <td>{obj.name}</td>
                              <td>{obj.email}</td>
                               <td>{obj.wallet}</td>
                               <td>{obj.participatedBids}</td>
                               <td>{obj.wonBids}</td>
                               <td><Update onClick={()=>handleUpdate(obj._id)}>Update</Update></td>
                               {loader && <Loader/>}
                               <td><Delete onClick={()=>handleDelete(obj._id)}>Delete</Delete></td>
                        </tr>
                    })}
               </tbody>
           </table>: 
           
           //if FirstSelected is false show below form in
          
           <div>
               {err && <Error handleClose={handleClose} error={err}/>}
                <Form>
                    
                    <label htmlFor="sum">Winning Sum:</label>
                    <input id="sum" type="number" required placeholder="Enter Winning Sum" onChange={(e:any)=>setWinSum(e.target.value)} value={winSum}/>
                    <button type="submit" onClick={(e:any)=>handleCreateTicket(e)}>Create</button>
                </Form>
            </div>}
       </View>

       {/* ---------handling update popup---------- */}
          {update.show && <UpdateUser handleClose={handleUpdateClose} userId={update.id} update={undefined}/>}
   </Container>
  )
}

export default AdminToggler


const Container=styled.div`
    width:100%;
    border-radius: 10px;
    padding:0 10px;
`;

const Toggler=styled.div<{firstSelected:boolean}>`
    display:flex;
    justify-content:start;

    &>div:first-child{
        color:${props=>props.firstSelected? "white":"black"};
        background-color: ${props=>props.firstSelected? "#1ba94c":"white"};
        border-radius: 10px 0 0 0;
    }
    &>div:last-child{
        background-color: ${props=>props.firstSelected? "white":"#1ba94c"};
        color:${props=>props.firstSelected? "black":"white"};
        border-radius: 0 10px 0 0;
    }
    &>div{
        padding:15px;
        text-align:center;
        cursor:pointer;
        border:1px solid #1ba94c;
    }
`;
const View=styled.div`
    border:1px solid #1ba94c;

    &>table{
        width:100%;
        
        border-collapse: collapse;
        td,th{
             border:1px solid #1ba94c;
            border-collapse: collapse;
            padding:5px;
            text-align:left;
        }

        &>thead{
            background-color: #1ba94c;
            color:white;
        }
    }

    tbody>tr{
        &:hover{
            background-color:#C1DEAE;
        }
    }
`;

const Update=styled.div`
    width:100%;
    color:white;
    padding:5px;
    background-color: #B33030;
    text-align:center;
    cursor:pointer;

    &:hover{
        transform: Scale(1.02);
        transition-duration:0.2s;
    }

`;

const Delete=styled.div`
    width:100%;
    color:white;
    padding:5px;
    background-color: #1ba94c;
    text-align:center;
    cursor:pointer;
    &:hover{
        transform: Scale(1.02);
        transition-duration:0.2s;
    }
`;


const Form=styled.form`
    width:100%;
    max-width:500px;
    margin:0 auto;
    padding:10px;

    &>input{
        padding:10px;
        border-radius: 5px;
        width:100%;
        margin:5px 0;
    }
    &>button{
        width:100%;
        padding:10px;
        background-color:#1ba94c;
        margin:10px 0;
        border-radius: 5px;
        outline:none;
        border:none;
        color:white;
        cursor:pointer;

        &:hover{
        transform: Scale(1.02);
        transition-duration:0.2s;
    }
    }

`
const Div =styled.div`
overlay-shadow:
`
;
import {BACKEND_URL} from "../constants";
import axios from "axios";

const buyTicket=async (userId:string|null,ticketId:string|null,token: string | null)=>{
    // console.log(userId,ticketId,token);
    try{
        const response =await axios.post(`${BACKEND_URL}/api/tickets/${userId}/${ticketId}`,{},
        {
            headers:{
                token:`Bearer ${token}`
            }
        });
        return {result:true,data:response.data}
    }catch(e:any){
        return {result:false,error:e.response.data.message || e.response.data.error}
    }
}

export default buyTicket;
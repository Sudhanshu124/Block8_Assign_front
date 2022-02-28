import {BACKEND_URL} from "../constants";
import axios from "axios";

const getUserTransactions=async (userId:string|null,token: string | null)=>{
    console.log("called")
    try{
        const response =await axios.get(`${BACKEND_URL}/api/transactions/user/${userId}`,
        {
            headers:{token:`Bearer ${token}`}
        });
        return {result:true,data:response.data}
    }catch(e:any){
        return {result:false,error:e.response.data.message || e.response.data.error}
    }
}

export default getUserTransactions;
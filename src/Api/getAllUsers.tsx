import {BACKEND_URL} from "../constants";
import axios from "axios";

const getAllUsers=async (token: string | null)=>{
    try{
        const response =await axios.get(`${BACKEND_URL}/api/users`,
        {
            headers:{token:`Bearer ${token}`}
        });
        return {result:true,data:response.data}
    }catch(e:any){
        return {result:false,error:e.response.data.message || e.response.data.error}
    }
}

export default getAllUsers;
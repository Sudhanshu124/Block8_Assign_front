import axios from "axios";
import {BACKEND_URL} from "../constants"

export default async function register(registerData: { name: string; email: string; password: string; }){
    try{
        const response =await axios.post(`${BACKEND_URL}/api/auth/register`, registerData);
        return {result:true,data:response.data} 
    }catch(e:any){
        console.log(e.response);
        return {result:false,error: e.response.data.message.isArray? e.response.data.message[0] : e.response.data.message};
    }
}
 

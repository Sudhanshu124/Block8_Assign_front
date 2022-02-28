import axios from "axios";
import {BACKEND_URL} from "../constants";


const login=async (loginData: { email: any; password: any; })=>{
    try{
        const response= await axios.post(
            `${BACKEND_URL}/api/auth/login`,
            {
                email: loginData.email,
                password: loginData.password
            }
        )

        return {result:true,data:response.data};
    }catch(e:any){
        console.log(e.response)
        return {result:false,error: e.response.data.message.isArray? e.response.data.message : e.response.data.message};
    }
}

export default login;

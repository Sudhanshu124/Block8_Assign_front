import react from 'react';
import axios from 'axios';
import {BACKEND_URL} from '../constants'
const getUserDelete=async (userId:string)=>{
    try{
        const token=localStorage.getItem('token');
    const res=await axios.delete(`${BACKEND_URL}/api/users/${userId}`,
             {headers:{token:`Bearer ${token}`}}
    );
    }
    catch(e:any)
    {
        return {result:false,error:e.response.data.message || e.response.data.error}
    }
}
export default  getUserDelete;
import {BACKEND_URL} from "../constants";
import React from "react";
import axios from "axios";
const  updateWallet=async(wallet:number,userId:string) => {
try{
    const token = localStorage.getItem("token");
    const data={
        wallet:wallet
    }
    const res = await axios.put(`${BACKEND_URL}/api/users/${userId}`,data,   
    {
        
        headers: {token: `Bearer ${token}`}
    }
    )
    return {data:res.data}
}
catch(err){

}
}
export default updateWallet;
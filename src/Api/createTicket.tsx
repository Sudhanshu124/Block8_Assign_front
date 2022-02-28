import {BACKEND_URL} from "../constants";
import axios from "axios";
//Some part left
const CreateTicket=async(winSum:number)=>{
    try{
        const data={
            winningSum:winSum,
            participants:[],
            startedOn: new Date()
        }
        const token= localStorage.getItem("token");
       const url=`${BACKEND_URL}/api/tickets/`
       const res= await axios.post(url,data,
         {
            headers:{token:`Bearer ${token}`}
         }
        );
        return {data:res.data,result:"Success"}
        //console.log(res.data)
    }
    catch(err:any){
      return {data:err.response.data.message[0],result:"Failure"}
    //console.log(result);
    }
}
export default CreateTicket;
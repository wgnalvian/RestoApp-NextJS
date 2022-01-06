import { respone } from "../../../helper/respone";
import { getFoods } from "../../../models/foods";

export default function handler(req,res){
   
    if(req.method === 'POST'){
        getFoods((err, result) => {
            
            if(err === null){
                respone(res,200,result)
            }
        })
    }

}
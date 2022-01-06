import { getDataJwt } from "../../../helper/getDataJwt"
import { deleteCart } from "../../../models/carts"
import {respone} from '../../../helper/respone'

export default async function handler(req, res){

    if(req.method === 'POST'){
        const data = JSON.parse(req.body)
        
        const decode = await getDataJwt(data.token,process.env.JWT_SECRET)
        
        
        if(decode.err === null){
           const result = await deleteCart(decode.decode.userId,data.id)
           if(result.err === null){
               return respone(res,200)
           }
        }
        
    } 
}
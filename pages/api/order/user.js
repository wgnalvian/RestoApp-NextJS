import { getDataJwt } from "../../../helper/getDataJwt"
import { respone } from "../../../helper/respone"
import { getUserOrder, getUserOrderFood } from "../../../models/orders"

export default async function handler(req, res){
    if(req.method === 'POST'){
        const token = JSON.parse(req.body)
   
        const decode = await getDataJwt(token.token,process.env.JWT_SECRET)
      
        const result = await getUserOrder(decode.decode.userId)
        const data = []
       for(const item of result){
           const foods = await getUserOrderFood(item.order_id)
           data.push(...foods)
       }
     
        return respone(res,200,data)
    }
}
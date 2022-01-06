import jwt from 'jsonwebtoken'
import {getDataJwt} from '../../../helper/getDataJwt'
import { respone } from '../../../helper/respone'
import { getCarts } from '../../../models/carts'
export default async function handler(req, res){
    if(req.method === 'POST'){

       const data = JSON.parse(req.body)
      
      const decode = await getDataJwt(data.token,process.env.JWT_SECRET)
      if(decode.err === null){
          const result = await getCarts(decode.decode.userId)
          let totalPay = 0;
          let totalAmount = 0;
          result.result.map(i => {
              totalPay += (parseInt(i.price) * parseInt(i.amount))
              totalAmount += parseInt(i.amount)
              
          })
          respone(res,200,{carts : result.result,totalPay,totalAmount})
      }

    }
}
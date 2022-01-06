import { getDataJwt } from "../../../helper/getDataJwt"
import { respone } from "../../../helper/respone"
import { createCart } from "../../../models/carts"

export default async function handler(req, res){

    if(req.method === 'POST'){
        const data = JSON.parse(req.body)
        
        const decode = await getDataJwt(data.token,process.env.JWT_SECRET)
        if(decode.err === null){

            
            const result = await createCart(data,decode.decode.userId)
            if(result.err === null){

                    respone(res,200)
            }
        }

        
        
    }

}
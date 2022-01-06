import { respone } from "../../../helper/respone"
import { serveOrder } from "../../../models/orders"

export default async function handler(req, res){

    if(req.method === 'POST'){
        const data = JSON.parse(req.body)


        const result = await serveOrder(data.id)
       
        if(result.err === null){
            return respone(res,200)
        }
    }

}
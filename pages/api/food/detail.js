import { respone } from "../../../helper/respone"
import { getFoodPromise } from "../../../models/foods"


export default async function handler(req, res){

    if(req.method === 'POST'){

        const data = JSON.parse(req.body)




        const result = await getFoodPromise(data.id)

        if(result.err === null){
            respone(res,200,result.result)
        }
    }
}
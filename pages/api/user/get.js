import { respone } from "../../../helper/respone"
import { getUsers } from "../../../models/users"

export default async function handler(req, res){
    if(req.method === 'POST'){
        const result  = await getUsers()

        return respone(res,200,result)
    }
}
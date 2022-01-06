import jwt from 'jsonwebtoken'
import { respone } from '../../../helper/respone'

export default async function handler(req, res){
    if(req.method === 'POST'){
        const data = JSON.parse(req.body)
        if(data.password === `${process.env.JWT_SECRET_ADMIN}`){

            const token = await jwt.sign({},`${process.env.JWT_SECRET_ADMIN}`)

            return respone(res,200,token)
        }else  {
            return respone(res,400,"Wrong Password")
        }
    }
}
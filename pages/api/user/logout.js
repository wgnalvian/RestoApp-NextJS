import {getDataJwt} from '../../../helper/getDataJwt'
import { respone } from '../../../helper/respone'
import { getUserOrder } from '../../../models/orders'
import { getUserById, isUserOrderFood, updateUserLogout } from '../../../models/users'

export default async function handler(req, res){
    if(req.method === 'POST'){
        let errors = []

        const data = JSON.parse(req.body)

        const userData = await getDataJwt(data.token,process.env.JWT_SECRET)
        
        const orders = await getUserOrder(userData.decode.userId)
        
        const servedN = orders.filter(i => i.is_served === 'N')

        
        if(servedN.length > 0){
            errors.push('You have an unfinished order')
        }

        const user =  await getUserById(userData.decode.userId)
        const mustPayUser = await isUserOrderFood(userData.decode.userId)
        console.log(mustPayUser)



        
        if(mustPayUser === 'Y'){

            if(user[0].is_pay === 'N'){
                errors.push('You have made a payment, please come to the cashier')
            }
        }

        if(errors.length < 1){
            await updateUserLogout(userData.decode.userId)
            respone(res,200)
        }else{
            respone(res,400,errors)
        }

    }
}
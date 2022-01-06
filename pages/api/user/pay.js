import {respone} from '../../../helper/respone'
import { getUserOrder, getUserOrderFood } from "../../../models/orders";
import { getUsers, updatePayUser } from "../../../models/users";

export default async function handler(req, res){
    if(req.method === 'POST'){
        const users = await getUsers()
        
        let data = []
        for(const [index,user] of users.entries()){
            let totalPrice = 0
            const orders = await getUserOrder(user.id)
            
            if(orders.length > 0){
                let foods = []
                for(const order of orders){
                    const foodOrders = await getUserOrderFood(order.order_id)

                    foods.push(...foodOrders)

                    for(const food of foodOrders){
                        totalPrice += parseInt(food.price) * parseInt(food.amount)
                    }
                }
                data[index] = {...user,totalPrice,foods : [...foods]}
            }else{
                data[index] = {...user,totalPrice : 0,foods : []}
            }
        }

        return respone(res,200,data)
    }else if(req.method === 'PUT'){

        const data = JSON.parse(req.body)
        
        await updatePayUser(data.id)

        return respone(res,200)

    }
}
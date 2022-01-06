import { respone } from "../../../helper/respone";
import { getFoodPromise, getFoods } from "../../../models/foods";
import { getFoodOrder, getOrders } from "../../../models/orders";

export default async function handler(req, res) {
  var result = await getOrders();

  for (const [index, i] of result.result.entries()) {
    const item = await getFoodOrder(i.order_id);
    let totalPrice = 0;
    let data = [];
    for (const foodOrders of item.result) {
      const foods = await getFoodPromise(foodOrders.food_id);
      totalPrice += parseInt(foods.result[0].price);
      data.push({...foods.result[0],amount : foodOrders.amount,message : foodOrders.message})
    }
    result.result[index] = {
      ...result.result[index],
      foodAmount: item.result.length,
      totalPrice,
      foods: data,
    };
  }

  if (result.err === null) {
    return respone(res, 200, result.result);
  }
}

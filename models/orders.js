import conn from "../helper/connection"
import date from 'date-and-time'

export const getOrders = () => {
    return new Promise((resolve, reject) => {

        conn.query('SELECT * FROM orders JOIN users ON orders.user_id=users.id',(err, result) => {
            resolve({err, result})
        } )

    })
}


export const getFoodOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM foodOrders WHERE order_id='${orderId}'`,(err,result) => {
            resolve({err,result})
        })
    })
}

export const serveOrder = (id) => {
    return new Promise((resolve,reject) => {
        const now = new Date();
        conn.query(`UPDATE orders SET is_served='Y', updated_at='${ date.format(now, "YYYY/MM/DD HH:mm:ss")}' WHERE order_id='${id}'`,(err,result) => {
            resolve({err,  result})
        })
    })
}


export const getUserOrder = (id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM orders WHERE user_id=${id}`,(err, result) => {
            resolve(result)
        })
    })
}

export const getUserOrderFood = (orderId) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM foodOrders JOIN orders ON foodOrders.order_id=orders.order_id JOIN foods ON foodOrders.food_id=foods.food_id WHERE orders.order_id='${orderId}'`,(err,result) => {
            resolve(result)
        })
    })
}
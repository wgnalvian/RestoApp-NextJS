import date from 'date-and-time'
import conn from "../helper/connection"


export const createFood = (food,price,image,cb) => {
    const now = new Date();
    conn.query(`INSERT INTO foods (food,price,image,created_at,updated_at) VALUES ('${food}','${price}','${image}','${date.format(now, 'YYYY/MM/DD HH:mm:ss')}','${date.format(now, 'YYYY/MM/DD HH:mm:ss')}')`,(err,result) => {
        cb(err,result)
    })
}

export const getFoods = (cb) => {
    conn.query('SELECT * FROM foods',(err,result) => {
        cb(err,result)
    })
}


export const deleteFoods = (id, cb) => {
    conn.query(`DELETE FROM foods WHERE food_id=${id} `,(err, result) => {
        cb(err,result)
    })
}

export const getFood = (id, cb) => {
    conn.query(`SELECT * FROM foods WHERE food_id=${id}`,(err, result) => {
        cb(err,result)
    })
}




export const getFoodPromise = (id) => {
    return new Promise((resolve,reject) => {

        conn.query(`SELECT * FROM foods WHERE food_id=${id}`,(err, result) => {
            resolve({err,result})
        })
    })
}

export const updateFoodPromise = (fields,image = null) => {
    return new Promise((resolve, reject) => {
        const now = new Date();
        if(image === null){
            conn.query(`UPDATE foods SET food='${fields.food}', price='${fields.price}',updated_at='${date.format(now, 'YYYY/MM/DD HH:mm:ss')}' WHERE food_id=${fields.id}`, (err, result) => {
                resolve({err,result})
            })
        }else {
            conn.query(`UPDATE foods SET food='${fields.food}', price='${fields.price}', image='${image}',updated_at='${date.format(now, 'YYYY/MM/DD HH:mm:ss')}' WHERE food_id=${fields.id}`, (err, result) => {
                resolve({err,result})
            })
        }
    })
}
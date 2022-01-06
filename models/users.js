import date from 'date-and-time'
import conn from "../helper/connection"


export const userInsert = (username,numTable,is_done = 'N', is_pay = 'N',cb) => {
    const now = new Date();

    conn.query(`INSERT INTO users (username,num_table,is_done,is_pay,created_at,updated_at) VALUES ('${username}',${numTable},'${is_done}','${is_pay}','${date.format(now, 'YYYY/MM/DD HH:mm:ss')}', '${date.format(now, 'YYYY/MM/DD HH:mm:ss')}')`,(err,result) => {
       cb(err)
    })
}


export const getUserNow = (userName,tableNum) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE username='${userName}' && num_table='${tableNum}' && is_done='N'`,(err, result) => {
            resolve({err,result})
        })
    })
}

export const getUsers = () => {
    return new Promise((resolve,reject) => {
        conn.query('SELECT * FROM users ', (err, result) => {
            resolve(result)
        })
    })
}


export const updatePayUser= (id) => {
    const now = new Date();
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE users SET is_pay='Y', updated_at='${date.format(now, 'YYYY/MM/DD HH:mm:ss')}' WHERE id='${id}'`,(err,result) => {
            if(err === null){
                resolve(result)
            }
        })

    })
}


export const getUserById = (id) => {
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM users WHERE id=${id} `,(err,result) => {
            resolve(result)
        })
    })
}
export const updateUserLogout = (id) => {
    return new Promise((resolve,reject) => {
        conn.query(`UPDATE users SET is_done='Y' WHERE id=${id} `,(err,result) => {
            resolve(result)
        })
    })
}

export const isTableUsed = (numTable) => {
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM users WHERE num_table='${numTable}' && is_done='N'`,(err,result) => {
            resolve(result)
        })
    })
}


export const isUserOrderFood = (id) => {
    return new Promise((resolve,reject) => {
        conn.query(`SELECT SUM(foods.price) as total FROM foodOrders JOIN foods ON foodOrders.food_id=foods.food_id JOIN orders ON orders.order_id=foodOrders.order_id JOIN users ON orders.user_id=users.id WHERE users.id='${id}' && users.is_done='N'`,(err,result) => {
           console.log(result[0].total)
            if(result[0].total === null){
                resolve('N')
            }else{
                resolve('Y')
            }
        })
    })
}
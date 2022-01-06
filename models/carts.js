import conn from "../helper/connection";
import date from "date-and-time";

export const getCarts = (userId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM carts INNER JOIN foods ON carts.food_id = foods.food_id INNER JOIN users ON carts.user_id = users.id WHERE carts.user_id = '${userId}' && is_ordered='N'`,
      (err, result) => {
        resolve({ err, result });
      }
    );
  });
};

export const createCart = (fields, userId) => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    conn.query(
      `INSERT INTO carts (food_id,user_id,amount,message,created_at,updated_at) VALUES ('${
        fields.foodId
      }','${userId}','${fields.amount}','${fields.message}', '${date.format(
        now,
        "YYYY/MM/DD HH:mm:ss"
      )}','${date.format(now, "YYYY/MM/DD HH:mm:ss")}')`,
      (err, result) => {
        resolve({ err, result });
      }
    );
  });
};

export const deleteCart = (userId, cartId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `DELETE FROM carts WHERE cart_id='${cartId}' && user_id='${userId}' && is_ordered='N'`,
      (err, result) => {
        resolve({ err, result });
      }
    );
  });
};

export const CartsToOrders = (userId) => {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const time = date.format(now, "YYYY/MM/DD HH:mm:ss");
    conn.query(
      `SELECT * FROM carts WHERE user_id='${userId}' && is_ordered='N'`,
      (err, carts) => {
        conn.query(
          `INSERT INTO orders (user_id,is_served,created_at,updated_at) VALUES ('${carts[0].user_id}','N','${time}','${time}')`,
          (err, result) => {
            
            carts.map((i) => {

                conn.query(
                  `SELECT * FROM orders WHERE user_id='${i.user_id}' && created_at='${time}' && is_served='N'`,
                  (err, result) => {
                    if (err === null) {
                      conn.query(
                        `INSERT INTO foodOrders (order_id,food_id,amount,message) VALUES ('${result[0].order_id}','${i.food_id}','${i.amount}','${i.message}')`,(err, result) => {

                          conn.query(`UPDATE carts SET is_ordered='Y', updated_at='${date.format(now, 'YYYY/MM/DD HH:mm:ss')}' WHERE cart_id='${i.cart_id}'`,(err, result) => {
          
                              resolve({err,result})
                          })
                        }
                      );
                    }
                  }
                );

              
            });
          }
        );
      }
    );
  });
};

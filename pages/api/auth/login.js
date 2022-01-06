import conn from "../../../helper/connection";
import date from "date-and-time";
import jwt from "jsonwebtoken";
import { getUserNow, isTableUsed, userInsert } from "../../../models/users";
import {respone} from '../../../helper/respone'



export default async function handler(req, res) {
  if (req.method === "POST") {
    let data = JSON.parse(req.body);


    const checkTable = await isTableUsed(data.numTable)

    if(checkTable.length !== 0){
      return respone(res,400,'The table is use by other user')
    }

    // insert into database
    userInsert(data.username, data.numTable, "N", "N", async(err) => {
      if (err === null) {

        const result = await getUserNow(data.username,data.numTable)
        if(result.err === null){

          // generate jwt token
          
          const token = jwt.sign({userId : result.result[0].id,username : data.username, numTable : data.numTable},`${process.env.JWT_SECRET}`)
          
          return respone(res,200,{token}) 
        }
      }
    });
  }
}

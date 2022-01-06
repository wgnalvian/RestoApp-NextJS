
import {respone} from '../../../helper/respone'
import fs from 'fs'
import { asyncParse } from "../../../helper/formDataParser";
import { createFood } from '../../../models/foods';
export const config = {
  api: {
    bodyParser: false
  }
};



export default async function handler(req, res) {
   
 
  if (req.method === "POST") {
    // Formdata parser
    const result = await asyncParse(req);

    const image = `${Date.now()}-${result.files.image.originalFilename}`;
    fs.rename(`./public/images/${result.files.image.newFilename}`,`./public/images/${image}`,(err) => {
        if(err){
          return err
        }

        createFood(result.fields.food,result.fields.price,image,(err, result) => {
          if(err === null){
            return respone(res,200)
          }
        })

    })
   
  }
}

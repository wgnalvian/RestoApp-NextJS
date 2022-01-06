import { respone } from "../../../helper/respone";
import { deleteFoods, getFood, getFoods } from "../../../models/foods";
import fs from 'fs'


export default function handler(req, res){
    if(req.method === 'POST'){
        const data = JSON.parse(req.body)
        
        // Get data food by id
        getFood(data.id,(err,result) => {
            
         
            if(err === null){
                // Delete Image food 
                fs.unlink(`./public/images/${result[0].image}`,(err) => {

                    if(err === null){
                        // Delete data food
                        deleteFoods(data.id,(err,result) => {
                           
                            if(err === null){
                                return respone(res,200,result)
                            }
                        })
                    }
                })
            }
        })
    }
}
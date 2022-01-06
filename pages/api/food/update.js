import { IncomingForm } from "formidable";
import { getFoodPromise, updateFoodPromise } from "../../../models/foods";
import fs from "fs";

import { respone } from "../../../helper/respone";
import { move } from "../../../helper/move";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new IncomingForm();
  // form data parse
  form.parse(req, async (err, fields, files) => {
    
    if (!fields.hasOwnProperty('image')) {
      //  get data food by id
      const result = await getFoodPromise(fields.id);
      if (result.err === null) {
        // delete image
        fs.unlink(`./public/images/${result.result[0].image}`, async(err) => {
          if (err === null) {
            console.log(files)
            // save update image
            const image = `${Date.now()}-${files.image.originalFilename}`;
            move(`${files.image.filepath}`, `./public/images/${image}`);
            const data = await updateFoodPromise(fields, image);
            
            if (data.err === null) {
              return respone(res, 200);
            }
          }
        });
      }
    }else {
      const data = await updateFoodPromise(fields);
          console.log(data)
      if (data.err === null) {
        return respone(res, 200);
      }
    }
  });
}

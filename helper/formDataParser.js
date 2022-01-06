import { IncomingForm } from "formidable";
export const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true,uploadDir :  `./public/images`});
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
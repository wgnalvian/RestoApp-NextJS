import {
  Image,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { Field } from "formik";

import React, { useEffect } from "react";
import { AiFillWarning } from "react-icons/ai";

function InputImageCustom({ name, label,refreshPrev,src='/images/image.png'}) {

  useEffect(() => {

    document.querySelector(".previewImage").src = "/images/image.png";
  },[refreshPrev])

  // handle change input file
  const handleChange = (e, form) => {
    
    


    form.setFieldValue("image", e.target.files[0]);
    // preview image
    const previewImg = URL.createObjectURL(e.target.files[0]);
    document.querySelector(".previewImage").src = previewImg;

    
  };
// ValidateImage
  const validateImg = (value) => {
    let error = "";
    if (!value) {
      
      error = "File image is required";
    }
    if (value.size > 1000000) {
      error = "File size too large";
    }

    if (
      !["image/jpg", "image/jpeg", "image/gif", "image/png","image/svg","image/svg+xml"].includes(
        value.type
      )
    ) {
      error = "Unsupported File Format";
    }
    return error;
  };





  return (
    <Field name={name} validate={validateImg}>
      {({ field, form }) => (
        <FormControl
          field={name}
          isInvalid={form.errors[name] && form.touched[name]}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Box position="relative" w="300px" h="200px" border="1px solid grey">
            <Input
              w="100%"
              h="100%"
              zIndex="1"
              cursor="pointer"
              bgColor="gray.100"
              type="file"
              position="absolute"
              opacity="0"
              onChange={(e) => handleChange(e, form)}
            />
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              className="previewImage"
              position="absolute"
              src={src}
            />
          </Box>

          <FormErrorMessage>
            <AiFillWarning /> {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default InputImageCustom;

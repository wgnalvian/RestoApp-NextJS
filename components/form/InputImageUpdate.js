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

function InputImageUpdate({
  setFieldValue,
  name,
  label,
  
  src = "/images/image.png",
}) {
  const [srcImg, setSrcImg] = React.useState(src);
  const [error, setError] = React.useState("");
  

  // handle change input file
  const handleChange = (e) => {
    const image = e.target.files;

    if (image.length > 0) {
      if (image[0].size > 1000000) {
        setError("File image too large");
        return;
      } else if (
        ![
          "image/jpg",
          "image/jpeg",
          "image/gif",
          "image/png",
          "image/svg",
          "image/svg+xml",
        ].includes(image[0].type)
      ) {
        setError("Unsupported type file image");
        return;
      } else {
        setError("");

        const previewImg = URL.createObjectURL(e.target.files[0]);
        setSrcImg(previewImg);
        setFieldValue("image", e.target.files[0]);
      }
    }

    //   form.setFieldValue("image", e.target.files[0]);
    // preview image
  };

  return (
    <FormControl isInvalid={error}>
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
          onChange={(e) => handleChange(e)}
        />
        <Image
          w="100%"
          h="100%"
          objectFit="cover"
          className="previewImage"
          position="absolute"
          src={srcImg}
        />
      </Box>

      <FormErrorMessage>
        <AiFillWarning /> {error}
      </FormErrorMessage>
    </FormControl>
  );
}

export default InputImageUpdate;

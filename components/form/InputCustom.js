import {
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";
import { AiFillWarning } from "react-icons/ai";

function InputCustom({ label, type, placeholder, name, icon, showLabel = true }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          field={name}
          isInvalid={form.errors[name] && form.touched[name]}
        >
          {showLabel ?    <FormLabel htmlFor={name}>{label}</FormLabel> : null}
       
          <InputGroup>
          
          <InputLeftElement
            pointerEvents="none"
            children={icon()}
          />
          <Input
           
            
            type={type}
            placeholder={placeholder}
            {...field}
          />
          </InputGroup>
          <FormErrorMessage>
            <AiFillWarning /> {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default InputCustom;

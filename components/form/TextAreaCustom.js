import { FormControl, FormErrorMessage, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { AiFillWarning } from 'react-icons/ai'

function TextAreaCustom({ label, type, placeholder, name, icon, showLabel = true }) {
    return (
        <Field name={name}>
      {({ field, form }) => (
        <FormControl
          field={name}
          isInvalid={form.errors[name] && form.touched[name]}
        >
          {showLabel ?    <FormLabel htmlFor={name}>{label}</FormLabel> : null}
        
          <InputGroup>
          
          
         <Textarea colorScheme="whiteAlpha" backgroundColor="whiteAlpha.600" placeholder={placeholder} {...field}  />
          </InputGroup>
          <FormErrorMessage>
            <AiFillWarning /> {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
    )
}

export default TextAreaCustom

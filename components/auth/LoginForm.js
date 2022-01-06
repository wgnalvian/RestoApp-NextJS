import React from "react";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Field,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {useFetchHook} from '../../hooks/useFetchHook'
import dynamic from 'next/dynamic'
import { AiOutlineMail } from "react-icons/ai";
import { FaUserAlt} from "react-icons/fa";
import Swal from "sweetalert2";
const InputCustom = dynamic(
  () => import('../form/InputCustom'),
  {ssr : false}
)


function LoginForm() {
  // define router
  const router = useRouter();
  
  // define handle submit method
  const onSubmit = async(values,form) => {
   const res = await useFetchHook(`http://localhost:3000/api/auth/login`,values,'POST')
   
   if(res.hasOwnProperty('success')){
     
    localStorage.setItem('token',res.data.token)
    
    router.push('/')

   }else{
     Swal.fire('Fail',res.data,'error')
      form.resetForm()
   }
  
  }

  // define validation form
  const validateSchema = Yup.object().shape({
    username: Yup.string().required("username is required !"),
    numTable: Yup.string().required("number table is required !"),
  });

  // define init value
  const initialValue = {
    username: "",
    numTable: "",
  };

 

  return (
   <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validateSchema}>
     {(formik) => (

        <Form>

          <VStack spacing={4} mb={5}>
            {/* input email */}
            <InputCustom
            icon={() => <FaUserAlt />}
              label="Username"
              type="text"
              placeholder="Username"
              name="username"
             
            />

            {/* input  password */}
            <InputCustom
            icon={() => <AiOutlineMail />}
              label="Nomor Meja"
              type="number"
              placeholder="Nomor Meja"
              name="numTable"
            />
            <Button type="submit" w="100%" colorScheme="green">
              Sign Up
            </Button>

          
          </VStack>
        </Form>
     )}
   </Formik>
       
   
   
  );
}

export default LoginForm;

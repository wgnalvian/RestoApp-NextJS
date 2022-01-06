import React from 'react'
import {Flex,Button, HStack, VStack} from  '@chakra-ui/react'
import { Form, Formik } from 'formik'

import * as Yup from 'yup'
import { FaUserAlt } from 'react-icons/fa'
import dynamic from 'next/dynamic'
import { useFetchHook } from '../../hooks/useFetchHook'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
const InputCustom = dynamic(
    () => import('../form/InputCustom'),
    {ssr : false}
  )
function LoginAdmin() {

    const router = useRouter()
    const initVal = {
        password  :  ''
    }

    const validate = Yup.object().shape({
        password : Yup.string().required('Password is required !')
    })


    const onSubmit = async(value,form) => {
        const res = await useFetchHook('http://localhost:3000/api/auth/admin',{password : value.password},'POST')

        if(res.hasOwnProperty('success')){
            localStorage.setItem('tokenAdmin',res.data)
            router.push('/admin')
            form.resetForm()
        }else {
            Swal.fire('Fail',res.data,'error')
            form.resetForm()
        }

    }   

    return (
      
            <Formik initialValues={initVal} validationSchema={validate} onSubmit={onSubmit}>
                <Form>
                    <VStack w="100%">

                    <InputCustom label="Password" type="password" placeholder="type password admin" name="password" icon={() => <FaUserAlt />} showLabel={true} />
                    <Button type="submit" colorScheme="green" w="100%">Submit</Button>
                    </VStack>
                </Form>
            </Formik>
        
    )
}

export default LoginAdmin

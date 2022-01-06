import { Button, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import {MdFastfood, MdOutlinePriceChange} from 'react-icons/md'
import {Form, Formik} from 'formik'
import {useFetchHook} from '../../hooks/useFetchHook'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { values } from 'lodash'
const InputCustom = dynamic(
    () => import('../form/InputCustom'),
    {ssr : false}
  )
const InputImageCustom = dynamic(
    () => import('../form/InputImageCustom'),
    {ssr : false}
  )




function AddMenu() {
    const [loading,setLoading] = React.useState(false)
    const [refreshPrev,setRefreshPrev] = React.useState(false)

    const initValue = {
        food : '',
        price : '',
        image : ''
    }

    const validationSchema = Yup.object().shape({
        food : Yup.string().required('Name of food is required !'),
        price : Yup.number().required('Price of food is required !'),
        
    })


    const handleSubmit = async (values,form) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image',values.image)
        formData.append('food',values.food)
        formData.append('price',values.price)
        
        
        const res = await axios.post('http://localhost:3000/api/food/create',formData)
        
        if(res.data.hasOwnProperty('success')){
            setLoading(false)
            Swal.fire('Success','The data food successfully saved','success')
            form.resetForm()
            setRefreshPrev(prev => prev === true ? false : true)
        }
        
        
    }




    return (
        <Flex flexDirection="column" w="100%" boxSizing="border-box" px={7} py="5">
            <Formik initialValues={initValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form>
                    <VStack spacing={5}>    
                    <InputCustom icon={() => <MdFastfood />}  label="Food" type="text" placeholder="Name of food" name="food" />
                    <InputCustom icon={() => "Rp"}    label="Price" type="number" placeholder="Price of food" name="price" />
                  <Flex justifyContent="space-between" w="100%">
                  <InputImageCustom refreshPrev={refreshPrev} name="image" label="Image" />
                  <Button  isLoading={loading} loadingText="Submitting" type="submit" colorScheme="yellow" size="lg">Submit</Button>
                  </Flex>
                    </VStack>
                </Form>
            </Formik>
        </Flex>
    )
}

export default AddMenu

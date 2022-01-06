import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { MdFastfood } from "react-icons/md";
import Swal from "sweetalert2";
import * as Yup from "yup";
import InputCustom from "../form/InputCustom";
import InputImageCustom from "../form/InputImageCustom";
import InputImageUpdate from "../form/InputImageUpdate";

function ModalUpdateFood({ isOpen, onClose, data }) {


  const router = useRouter()


  const initValue = {
    id : data.food_id,
    food: data.food,
    price: data.price,
    image: '' 
  };

  const validationSchema = Yup.object().shape({

    food: Yup.string().required("Name of food is required !"),
    price: Yup.number().required("Price of food is required !"),
  });

  const handleSubmit = async(values, form) => {
    const formData = new FormData()
    formData.append('id',values.id)
    formData.append('image',values.image)
    formData.append('price',values.price)
    formData.append('food',values.food)
   
    const res = await axios.post('http://localhost:3000/api/food/update',formData)
   
    if(res.data.hasOwnProperty('success')){
      Swal.fire({title : 'Success',html : 'Successfully update data food',icon : 'success',position : 'top-right',showConfirmButton : false,width : 500, timer : 1000})
      
      router.replace(router.asPath)
    }


  };






  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initValue}
      validationSchema={validationSchema}
    >
      {({ setFieldValue,handleSubmit }) => (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Form>
                <InputCustom
                  icon={() => <MdFastfood />}
                  label="Food"
                  type="text"
                  placeholder="Name of food"
                  name="food"
                />
                <InputCustom
                  icon={() => "Rp"}
                  label="Price"
                  type="number"
                  placeholder="Price of food"
                  name="price"
                />
                <InputImageUpdate
                  setFieldValue={setFieldValue}
                  name="image"
                  label="Image"                   
                  src={`/images/${data.image}`}
                />
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} type="submit" colorScheme="yellow">
                Edit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
}

export default ModalUpdateFood;

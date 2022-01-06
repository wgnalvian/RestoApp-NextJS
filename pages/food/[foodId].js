import {
  Box,
  Flex,
  Image,
  Table,
  Button,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Navbar from "../../components/layout/Navbar";

import { SiDatabricks } from "react-icons/si";

import { AiOutlineMessage } from "react-icons/ai";
import { Router, useRouter } from "next/router";
import { useFetchHook } from "../../hooks/useFetchHook";
import { useTokenHook } from "../../hooks/useTokenHook";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
const InputCustom = dynamic(() => import("../../components/form/InputCustom"), {
  ssr: false,
});
const TextAreaCustom = dynamic(
  () => import("../../components/form/TextAreaCustom"),
  { ssr: false }
);

function Detail({ data }) {
  const [updateCart, setUpdateCart] = React.useState(false)
  const router = useRouter();
  const token = useTokenHook()
  const initValue = {
    foodId: data.food_id,
    amount: 1,
    message: "",
  };

  const handleSubmit = async (values, form) => {
    const res = await useFetchHook('http://localhost:3000/api/cart/create',{...values,token},'POST')
    
    if(res.hasOwnProperty('success')){
      Swal.fire('Success','Successfully add food into cart','success')
      form.resetForm()
      setUpdateCart(prev => prev === false ? true : false)
    }
  };

  const validateSchema = Yup.object().shape({
    amount: Yup.number().required("Amount of food is required !").test('notZeroValue','The value cannot zero number !',(value) => value !== 0),
  });

  return (
    <Flex
      overflow="auto"
      flexDirection="column"
      bgColor="facebook.100"
      minH="100vh"
      overflow="auto"
    >
      <Navbar updateCart={updateCart} />
      <Box w="100%" p={10}>
        <Flex w="100%" justifyContent="space-between">
          <Text fontSize={40} fontWeight="extrabold">
            Food Detail
          </Text>
          <Button
            onClick={() => {
              router.push("/");
            }}
            colorScheme="red"
          >
            Back
          </Button>
        </Flex>
        <hr style={{ backgroundColor: "grey", border: "1px solid grey" }} />
        <Flex alignItems="start" mt={10} boxSizing="border-box">
          <Image src={`/images/${data.image}`} w="500px" flex="1" />
          <Box flex="1" px={10}>
            <Formik
              validationSchema={validateSchema}
              initialValues={initValue}
              onSubmit={handleSubmit}
            >
              {
                (formik) => (

              <Form>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="30%"
                      >
                        Food
                      </Td>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="10%"
                      >
                        :
                      </Td>
                      <Td fontSize={20} fontWeight="bold" borderColor="grey">
                        {data.food}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="30%"
                      >
                        Price
                      </Td>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="10%"
                      >
                        :
                      </Td>
                      <Td fontSize={20} fontWeight="bold" borderColor="grey">
                        Rp. {data.price}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="30%"
                      >
                        Amount
                      </Td>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="10%"
                      >
                        :
                      </Td>
                      <Td fontSize={20} fontWeight="bold" borderColor="grey">
                        <InputCustom
                          showLabel={false}
                          name="amount"
                          type="number"
                          placeholder="Amount of foods"
                          label="Amount"
                          icon={() => <SiDatabricks />}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="30%"
                      >
                        Total
                      </Td>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="10%"
                      >
                        :
                      </Td>
                      <Td fontSize={20} fontWeight="bold" borderColor="grey">
                        <TextAreaCustom
                          name="message"
                          label="Message"
                          showLabel={false}
                          placeholder="Message for food"
                          icon={() => <AiOutlineMessage />}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="30%"
                      >
                        Total Price
                      </Td>
                      <Td
                        fontSize={20}
                        fontWeight="bold"
                        borderColor="grey"
                        w="10%"
                      >
                        :
                      </Td>
                      {console.log(formik)}
                      <Td fontSize={20} fontWeight="bold" borderColor="grey">
                      
                       Rp. {isNaN(parseInt(data.price) * parseInt(formik.values.amount)) ? '0' :  (parseInt(data.price) * parseInt(formik.values.amount))}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colSpan="3">
                        <Button
                          type="submit"
                          py={7}
                          colorScheme="yellow"
                          w="100%"
                        >
                          Add Cart
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Form>
                )
              }
            </Formik>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Detail;

export async function getServerSideProps({ params }) {
  const res = await useFetchHook(
    "http://localhost:3000/api/food/detail",
    { id: params.foodId },
    "POST"
  );

  return {
    props: {
      data: res.data[0],
    },
  };
}

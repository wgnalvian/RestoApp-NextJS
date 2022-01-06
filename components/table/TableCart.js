import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Button,
} from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import {BsTrash} from 'react-icons/bs'
import Swal from "sweetalert2";
import { useFetchHook } from "../../hooks/useFetchHook";
import { useTokenHook } from "../../hooks/useTokenHook";







function TableCart({ data,setUpdateCart }) {
   
    const router = useRouter()

 
    const handleDeleteCart = async (id) => {
        const token = await useTokenHook()

        const res = await useFetchHook('http://localhost:3000/api/cart/delete',{id,token},'POST')

        if(res.hasOwnProperty('success')){
            Swal.fire('Success','Successfully delete cart item','success')
            router.replace(router.asPath)
            setUpdateCart(prev => prev === false ? true : false)
        }
    }


    const handleOrder = async () => {
      const token = await useTokenHook()
     
      const res = await useFetchHook('http://localhost:3000/api/cart/order',{token},'POST')
      if(res.hasOwnProperty('success')){
        Swal.fire('Success','Successfully ordered food','success')
            router.replace(router.asPath)
            setUpdateCart(prev => prev === false ? true : false)
      }
    }















  return (
    <Table variant="striped" bgColor="whiteAlpha.500" mt={5} borderRadius={10}>
      <Thead>
        <Tr>
          <Th>Food</Th>
          <Th>Image</Th>
          <Th>Price</Th>
          <Th>Amount</Th>
          <Th>Message</Th>
          <Th>Total Price</Th>
          <Th>Created_at</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.carts.map((i, index) => {
          return (
            <Tr key={index}>
              <Td>{i.food}</Td>
              <Td>
                <Image src={`/images/${i.image}`} w={50} />
              </Td>
              <Td>Rp. {i.price}</Td>
              <Td>{i.amount}</Td>
              <Td>{i.message}</Td>
              <Td>Rp. {i.price * i.amount}</Td>
              <Td>{i.created_at}</Td>
              <Td>
                <Button onClick={() => handleDeleteCart(i.cart_id)} colorScheme="red"><BsTrash /></Button>
              </Td>
            </Tr>
          );
        })}
        <Tr >
          <Td fontWeight="extrabold" colSpan="7" textAlign="end">
            Total Amount
          </Td>
          {/* <Td fontWeight="extrabold" textAlign="end" >:</Td> */}
          <Td fontWeight="extrabold" textAlign="center">
            {data.totalAmount}
          </Td>
        </Tr>
        <Tr>
          <Td fontWeight="extrabold" colSpan="7" textAlign="end">
            Total Pay
          </Td>

          <Td fontWeight="extrabold" textAlign="center">
            Rp. {data.totalPay}
          </Td>
        </Tr>
        <Tr>
            <Td textAlign="end" colSpan="7"></Td>
            <Td >{data.carts.length === 0 ? null :<Button onClick={handleOrder} colorScheme="yellow">Order</Button>}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default TableCart;

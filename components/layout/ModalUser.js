import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr,Thead,Th, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import React from 'react'
import Swal from 'sweetalert2'
import { useFetchHook } from '../../hooks/useFetchHook'

function ModalUser({isOpen,onClose,data}) {

    const router = useRouter()


    const handlePay = async() => {

        const res = await useFetchHook('http://localhost:3000/api/user/pay',{id : data.id},'PUT')
        if(res.hasOwnProperty('success')){
            Swal.fire('Success','Successfully pay user','success')
            router.replace(router.asPath)
        }


    }

   

    return (
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Payment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Table>
                <Thead>
                    <Tr>

                    <Th>Food</Th>
                    <Th>Image</Th>
                    <Th>Price</Th>
                    <Th>Amount</Th>
                    <Th>Total Price</Th>
                    </Tr>
                
                </Thead>
                <Tbody>
                    {data.foods.map((i,index) => (

                    <Tr key={index}>
                        <Td>{i.food}</Td>
                        <Td><Image src={`/images/${i.image}`} w="100px" /></Td>
                        <Td>Rp. {i.price}</Td>
                        <Td>{i.amount}</Td>
                        <Td>Rp. {i.amount * i.price}</Td>
                    </Tr>
                    ))}

                    <Tr>
                        <Td colSpan="2"></Td>
                        <Td >Total Pay</Td>
                        <Td >:</Td>
                        <Td fontWeight="bold" >Rp. {data.totalPrice}</Td>
                    </Tr>
                </Tbody>
            </Table>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>{data.is_pay === 'N'?  <Button onClick={handlePay} type="submit" colorScheme="yellow">
                Pay now
              </Button> : null }
            
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
}

export default ModalUser

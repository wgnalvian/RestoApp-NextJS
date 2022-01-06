import {Th,Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Thead, Tr, Td, Image, Badge } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
import { useFetchHook } from '../../hooks/useFetchHook'

function ModalOrderFood({isOpen,foods,onClose}) {

  const router = useRouter()


  const handleServed = async( ) => {
    const res = await useFetchHook('http://localhost:3000/api/order/serve',{id : foods.order_id},'POST')

    if(res.hasOwnProperty('success')){
      Swal.fire('Success','Successfully served','success')
      router.replace(router.asPath)
    }

  }










    return (
        <Modal size="3xl" closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} overflow="auto">
            <Table>
              <Tbody>
                <Tr>
                  <Th w="20%">Username</Th>
                  <Th w="10%">:</Th>
                  <Td>{foods.username}</Td>
                </Tr>
                <Tr>
                  <Th>Number of table</Th>
                  <Th>:</Th>
                  <Td>{foods.num_table}</Td>
                </Tr>
                <Tr>
                  <Th>Is Served</Th>
                  <Th>:</Th>
                  <Td>{foods.is_served === 'N'? <Badge colorScheme="red">NO</Badge> : <Badge colorScheme="green">YES</Badge>}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table variant="striped">
                <Thead>
                    <Tr>

                    <Th>Food</Th>
                    <Th>Image</Th>
                    <Th>Price</Th>
                    <Th>Amount</Th>
                    <Th>Message</Th>
                    <Th>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {foods.foods.map((i,index) => (

                    <Tr key={index}>
                        <Td>{i.food}</Td>
                        <Td><Image src={`/images/${i.image}`} /></Td>
                        <Td>Rp. {i.price}</Td>
                        <Td>{i.amount}</Td>
                        <Td>{i.message}</Td>
                        <Td>Rp. {parseInt(i.amount * parseInt(i.price))}</Td>
                    </Tr>
                    ))}
                </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleServed} disabled={foods.is_served === 'N' ? false : true} colorScheme='teal' mr={3}>
              Served !
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default ModalOrderFood

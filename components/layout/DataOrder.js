import { Badge, Box, Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import ModalOrderFood from './ModalOrderFood'

function DataOrder({data}) {
    const [id, setId] = React.useState('')
  
    









    return (
       <Box w="100%" h="100%" boxSizing="border-box" p={5} overflow="auto">
           <Table variant="striped">
               <Thead>
                   <Tr>
                       <Th>Username</Th>
                       <Th>Num Table</Th>                     
                       <Th>Amount Order</Th>
                       <Th>Total Price</Th>
                       <Th>Is Served</Th>
                       <Th>Created_at</Th>
                       <Th>Action</Th>
                   </Tr>
               </Thead>
               <Tbody>
                   {data.reverse().map((i,index) => (

                   <Tr key={index}>
                       <Td>{i.username}</Td>
                       <Td>{i.num_table}</Td>
                       <Td>{i.foodAmount} menu</Td>
                       <Td>Rp. {i.totalPrice}</Td>
                       <Td fontWeight="bold">{i.is_served === 'N'? <Badge colorScheme="red">NO</Badge> : <Badge colorScheme="green">YES</Badge>}</Td>
                       <Td>{i.created_at}</Td>
                       <Td><Button onClick={() => {
                        
                        setId(i.order_id)


                       }} colorScheme="yellow">Detail</Button></Td>
                       <Td><ModalOrderFood isOpen={i.order_id === id ? true : false} onClose={() => setId('')} foods={i} /></Td>
                   </Tr>
                   ))}
               </Tbody>
           </Table>
       </Box>
    )
}

export default DataOrder

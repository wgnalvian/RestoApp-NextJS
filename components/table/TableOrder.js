import { Th, Table, Td, Thead, Tr, Tbody, Image,Badge } from "@chakra-ui/react";
import React from "react";

function TableOrder({data}) {





  return (
    <Table>
      <Thead>
        <Tr>        
         
          <Th>Foods</Th>
          <Th>Image</Th>
          <Th>Price</Th>
          <Th>Amount</Th>
          <Th>Total Price</Th>
          <Th>Created_at</Th>
          <Th>Is Served</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((i,index) => (

        <Tr>
          <Td>{i.food}</Td>
          <Td><Image src={`/images/${i.image}`}  w="200px" /></Td>
          <Td>Rp. {i.price}</Td>
          <Td>{i.amount}</Td>
          <Td>Rp. {i.amount * i.price}</Td>
          <Td>{i.created_at}</Td>
          <Td>{i.is_served === 'N' ? <Badge colorScheme="red">NO</Badge> : <Badge colorScheme="green">YES</Badge>}</Td>
        </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default TableOrder;

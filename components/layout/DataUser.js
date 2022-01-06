import {
  Flex,
  Table,
  TableCaption,
  Tbody,
  Box,
  Td,
  Thead,
  Button,
  Tr,
  Th,
  Image,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import ModalUser from "./ModalUser";

function DataUser({data}) {

  const [id,setId] = React.useState(0)


  return (
    <Box w="100%" h="100%" boxSizing="border-box" p={5} overflow="auto">
        <Table>
            <Thead>
                <Tr>
                    <Th>username</Th>
                    <Th>number table</Th>
                    <Th>is done</Th>
                    <Th>is pay</Th>
                    <Th>created_at</Th>
                    <Th>action</Th>
                </Tr>
                {data.reverse().map((i, index) => 
                <Tr key={index}>
                  <Td>{i.username}</Td>
                  <Td>{i.num_table}</Td>
                  <Td>{i.is_done === 'N' ? <Badge colorScheme="red">NO</Badge> : <Badge colorScheme="green">YES</Badge>}</Td>
                  <Td>{i.is_pay === 'N' ? <Badge colorScheme="red">NO</Badge> : <Badge colorScheme="green">YES</Badge>}</Td>                  
                  <Td>{i.created_at}</Td>
                  <Td>{ i.is_pay && <Button onClick={() => setId(i.id)} colorScheme="blue">Payment</Button>}</Td>
                  <Td><ModalUser isOpen={id === i.id ? true : false} onClose={() => setId('')} data={i} /></Td>
                </Tr>
                
                )}
            </Thead>
        </Table>
    </Box>
  );
}

export default DataUser;

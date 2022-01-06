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
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import { useFetchHook } from "../../hooks/useFetchHook";
import ModalUpdateFood from "./ModalUpdateFood";

function DataMenu({ data }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const router = useRouter()
    const handleDeleteFood = async (id) => {
        const res = await useFetchHook('http://localhost:3000/api/food/delete',{id},'POST')
        if(res.hasOwnProperty('success')){
            Swal.fire('Success','Data Food Successfully Deleted','success')
            router.replace(router.asPath)
        }
    }







  return (
    <Box w="100%" h="100%" overflow="auto" boxSizing="border-box" p={6}>
      <Table variant="striped" textAlign="center" colorScheme="linkedin">
          {data.length < 1 ? <TableCaption>Data Not Found <Button colorScheme="messenger" onClick={() => router.push('/admin')}>Add Data</Button></TableCaption> : false}
        <Thead >
          <Tr>
            <Th textAlign="center">Food</Th>
            <Th textAlign="center" isNumeric>Price</Th>
            <Th textAlign="center">Image</Th>
            <Th textAlign="center">Created at</Th>
            <Th textAlign="center">Updated at</Th>
            <Th textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((i, index) => (
            <React.Fragment key={index}>
            <Tr >
              <Td  textAlign="center" >{i.food}</Td>
              <Td textAlign="center" isNumeric>Rp.{i.price}</Td>
              <Td   justifyContent="center" display="flex"><Image src={`/images/${i.image}`} w={200}  /></Td>
              <Td   textAlign="center">{i.created_at}</Td>
              <Td   textAlign="center">{i.updated_at}</Td>
              <Td  textAlign="center"><Button onClick={onOpen} colorScheme="yellow">edit</Button> <Button onClick={() => handleDeleteFood(i.food_id)} colorScheme="red">delete</Button></Td>
              <Td> <ModalUpdateFood data={i} isOpen={isOpen} onClose={onClose}/></Td>
            </Tr>
             
          </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default DataMenu;

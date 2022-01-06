import React from "react";
import Navbar from "../../components/layout/Navbar";
import {Box, Flex, Text} from '@chakra-ui/react'
import TableCart from "../../components/table/TableCart";
import { useFetchHook } from "../../hooks/useFetchHook";
function cart({data}) {

  const [updateCart, setUpdateCart] = React.useState(false)
 

  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      bgColor="facebook.100"
      minH="100vh"
      overflow="auto"
    >
      <Navbar updateCart={updateCart} />
      <Box w="100%" p={10}>

      <Text fontSize={40} fontWeight="extrabold">
          Carts
        </Text>
        <hr style={{ backgroundColor: "grey", border: "1px solid grey" }} />
        <TableCart setUpdateCart={setUpdateCart} data={data} />
      </Box>
    </Flex>
  );
}

export default cart;


export async function getServerSideProps({params}){
  
    const res = await useFetchHook('http://localhost:3000/api/cart/get',{token : params.token},'POST')
  
    return {
        props : {
            data : res.data
        }
    }
}
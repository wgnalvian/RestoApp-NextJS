import { Box, Text,Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../../components/layout/Navbar'
import TableOrder from '../../components/table/TableOrder'
import { useFetchHook } from '../../hooks/useFetchHook'

function order({data}) {

    const router = useRouter()


  React.useEffect(() => {
   const interval = setInterval(() => router.replace(router.asPath),2000)
    return () => clearInterval(interval)
  }, [])


    return (
        <Flex
        alignItems="center"
        flexDirection="column"
        bgColor="facebook.100"
        minH="100vh"
        overflow="auto"
      >
        <Navbar  />
        <Box w="100%" p={10}>
  
        <Text fontSize={40} fontWeight="extrabold">
            Orders
          </Text>
          <hr style={{ backgroundColor: "grey", border: "1px solid grey" }} />
          <TableOrder data={data} />
        </Box>
      </Flex>
    )
}

export default order



export async function getServerSideProps({params}){

    const res = await useFetchHook('http://localhost:3000/api/order/user',{token : params.token},'POST')

    return {
        props : {
            data : res.data
        }
    }


}
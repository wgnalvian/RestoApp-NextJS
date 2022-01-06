import { Flex } from '@chakra-ui/react'
import React from 'react'
import { AiFillDatabase } from 'react-icons/ai'
import DataUser from '../../components/layout/DataUser'
import Main from '../../components/layout/Main'
import SideBar from '../../components/layout/SideBar'
import { useFetchHook } from '../../hooks/useFetchHook'

function user({data}) {
   
    return (
        <Flex w="100%" h="100vh" bgColor="facebook.100">
        <SideBar />
        <Main title="Data Order" content={() => <DataUser data={data} />}>
          <AiFillDatabase />
        </Main>
      </Flex>
    )
}

export default user


export async function getServerSideProps(){
    const res = await useFetchHook(`http://localhost:3000/api/user/pay`,{},'POST')
    
    return {
        props : {
            data : res.data
        }
    }
}
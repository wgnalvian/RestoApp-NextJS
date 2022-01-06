
import React, { useEffect } from "react";
import DataMenu from "../../components/layout/DataMenu";
import SideBar from "../../components/layout/SideBar";
import {Flex} from '@chakra-ui/react'
import { AiFillDatabase } from "react-icons/ai";
import Main from "../../components/layout/Main";
function data({res}) {

    

  return (
    <Flex w="100%" h="100vh" bgColor="facebook.100">
      <SideBar />
      <Main title="Data Menu" content={() => <DataMenu data={res} />}>
        <AiFillDatabase/>
      </Main>
    </Flex>
  );
}

export default data;


export async function getServerSideProps(){
    let res = await fetch('http://localhost:3000/api/food/get',{
        method : 'POST'
    })
    res = await res.json()
   
    return {
        props : {
            res : res.data
        }
    }
}
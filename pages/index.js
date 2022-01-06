import { Flex, Text } from "@chakra-ui/react";
import Hero from "../components/layout/Hero";
import Menu from "../components/layout/Menu";
import Navbar from "../components/layout/Navbar";
import { useFetchHook } from "../hooks/useFetchHook";

export default function Home({data,nama}) {
  
  return (
    <Flex alignItems="center" flexDirection="column" bgColor="facebook.100" minH="100vh" overflow="auto">
      <Navbar />
      <Hero />
      <Menu data={data}/>
    </Flex>
  );
}

export async function getServerSideProps(){
  let res = await useFetchHook('http://localhost:3000/api/food/get',{},'POST')
  
  return {
    props : {
      data : res.data
    }
  }
}
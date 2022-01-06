import { Flex } from "@chakra-ui/react";
import React from "react";
import Main from "../../components/layout/Main";
import SideBar from "../../components/layout/SideBar";
import { AiFillFileAdd } from "react-icons/ai";
import AddMenu from "../../components/layout/AddMenu";

function Admin() {
  return (
    <Flex w="100%" h="100vh" bgColor="facebook.100">
      <SideBar />
      <Main title="Add Menu" content={() => <AddMenu />}>
        <AiFillFileAdd />
      </Main>
    </Flex>
  );
}

export default Admin;

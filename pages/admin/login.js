import { Text,Flex } from '@chakra-ui/react'
import React from 'react'
import LoginAdmin from '../../components/auth/LoginAdmin'
import Style from '../../styles/Home.module.css' 
function login() {
    return (
        <Flex overflow="hidden" justifyContent="center" alignItems="start"  className={Style.container} bgImage="url('/images/bg-resto.jpg')" backgroundSize="cover">
        <Flex flexDirection="column" maxW={400} w="100%" minH={200}  backgroundColor="white" marginTop={5} borderRadius="1rem" boxSizing="border-box" padding={2} px={5} >
            <Text textColor="teal.500" marginBottom={4} alignSelf="center" fontSize={25}  fontWeight="extrabold" className={Style.styleFont}>Next Resto</Text>
            {/* Login Form */}
         <LoginAdmin />
        </Flex>
    </Flex>
    )
}

export default login

import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import InputCustom from '../form/InputCustom'

function Main(props) {
    
    return (
       <Flex w="80%" h="100%" boxSizing="border-box" px="10" justifyContent="space-between" py="5" flexDirection="column">
           <Flex w="100%" h="10%" bgColor="whiteAlpha.600" boxShadow="0px 1px 0px rgba(17,17,26,0.05), 0px 0px 8px rgba(17,17,26,0.1);" alignItems="center" boxSizing="border-box" px="5">
               <Text fontSize={30} fontWeight="extrabold">{props.children}</Text>
                <Text fontSize={30} fontWeight="extrabold" px="2">{props.title}</Text>
           </Flex>
           <Flex w="100%" h="88%" bgColor="whiteAlpha.800" boxShadow="0px 1px 0px rgba(17,17,26,0.05), 0px 0px 8px rgba(17,17,26,0.1);">
                {props.content()}
           </Flex>
       </Flex>
    )
}

export default Main

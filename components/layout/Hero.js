import { Box,Image, Text } from '@chakra-ui/react'

import React from 'react'

function Hero() {
    return (
        <>
        <Box w="90%" height={260} mt={5} position="relative">
            <Text fontWeight="extrabold" fontSize={100} textColor="white"  zIndex={1} position="absolute" fontFamily="fantasy" left={10} top={10}>Welcome</Text>
            <Image src="http://localhost:3000/images/bg-resto.jpg" w="100%" height="100%" objectFit="cover" borderRadius={10}  position="absolute"  zIndex={0} opacity={0.9}/>
        </Box>

        <hr />
        </>
    )
}

export default Hero

import { Box, Flex,StylesProvider,Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import LoginForm from '../../components/auth/LoginForm'
import { useTokenHook } from '../../hooks/useTokenHook'
import Style from '../../styles/Home.module.css' 
function Login() {
    
    const router = useRouter()


    React.useEffect(async() => {
    const tokenData = await useTokenHook()

    if(tokenData !== null){
        return router.push('/')
    }

    }, [])


    return (
        <Flex overflow="hidden" justifyContent="center" alignItems="start"  className={Style.container} bgImage="url('/images/bg-resto.jpg')" backgroundSize="cover">
            <Flex flexDirection="column" maxW={400} w="100%" minH={200}  backgroundColor="white" marginTop={5} borderRadius="1rem" boxSizing="border-box" padding={2} px={5} >
                <Text textColor="teal.500" marginBottom={4} alignSelf="center" fontSize={25}  fontWeight="extrabold" className={Style.styleFont}>Next Resto</Text>
                {/* Login Form */}
             <LoginForm />
            </Flex>
        </Flex>
    )
}

export default Login

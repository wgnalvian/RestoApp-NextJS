import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillFileAdd, AiTwotoneFolderAdd } from 'react-icons/ai'
import { HiUsers } from 'react-icons/hi'
import { MdFastfood } from "react-icons/md";
import Swal from 'sweetalert2'
import { useTokenAdminHook } from '../../hooks/useTokenHook'
import { FiLogOut } from "react-icons/fi";
import { useFetchHook } from '../../hooks/useFetchHook'
function SideBar() {

    const router = useRouter()
    const [token,setToken] = React.useState('')
    React.useEffect(async() => {
        
        const tokenAdmin = await useTokenAdminHook()

        if(tokenAdmin === null){
            Swal.fire('Fail','You not admin','error')
            return router.push('/admin/login')
        }

        setToken(tokenAdmin)
    }, [])



    const handleAdminLogout = async () => {
        await localStorage.removeItem('tokenAdmin')

        return router.push('/admin/login')
    }








    return (
        <Flex w="20%" h="100%" bgColor="teal.600" flexDirection="column">
            <Text textColor="facebook.100" fontSize={25} fontWeight="extrabold" px="5" py="10">Admin Page</Text>
            <VStack   alignItems="start" px="6" spacing={5}>
               <Box cursor="pointer" onClick={() => router.push('/admin')} display="flex" alignItems="center"><Text fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline"><AiFillFileAdd /> </Text>   <Text px="2" fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline">Add Menu</Text></Box>

               <Box cursor="pointer"  onClick={() => router.push('/admin/data')} display="flex" alignItems="center"><Text fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline"><AiTwotoneFolderAdd /> </Text>   <Text px="2" fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline">Data Menu</Text></Box>


               <Box onClick={() => router.push('/admin/order')}  display="flex" alignItems="center"><Text fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline"><MdFastfood /> </Text>   <Text px="2" fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline">Data Order</Text></Box>
               
               <Box onClick={() => router.push('/admin/user')}  display="flex" alignItems="center"><Text fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline"><HiUsers /> </Text>   <Text px="2" fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline">Data User</Text></Box>

               <Box onClick={handleAdminLogout}  display="flex" alignItems="center"><Text fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline"><FiLogOut /> </Text>   <Text px="2" fontSize="18" fontWeight="bold" textColor="facebook.100" display="inline">Logout</Text></Box>
             
               
            </VStack>
        </Flex>
    )
}

export default SideBar

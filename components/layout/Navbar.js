import { Flex, Text, Button, Badge, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useFetchHook } from "../../hooks/useFetchHook";
import { useTokenHook } from "../../hooks/useTokenHook";
import Swal from "sweetalert2";
function Navbar({ updateCart }) {
  const [countCart, setCountCart] = React.useState(0);
  const [countOrder, setCountOrder] = React.useState(0);
  const [token, setToken] = React.useState("");

  const router = useRouter();


  const handleLogout = async() => {

    const result = await useFetchHook('http://localhost:3000/api/user/logout',{token},'POST')

    if(result.hasOwnProperty('success')){
      router.push('/auth/login')
      localStorage.removeItem('token')
    }else{
      Swal.fire('Error',result.data[0],'error')
    }

  }




  const getCountCarts = async (token) => {
    const res = await useFetchHook(
      "http://localhost:3000/api/cart/get",
      { token },
      "POST"
    );

    return res.data;
  };


  const getCountOrders = async (token) => {
    const res = await useFetchHook("http://localhost:3000/api/order/count",
    { token },
    "POST")

    return res.data
  }

  React.useEffect(async () => {
    const tokenData = await useTokenHook();
    if(tokenData === null){
      Swal.fire('Forbidden','Yo must login before','error')
      return router.push('/auth/login')
    }
    setToken(tokenData);
    const res = await getCountCarts(tokenData);
    const order = await getCountOrders(tokenData)

    setCountOrder(order)
    setCountCart(res.carts.length);
  }, [updateCart]);

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      h={51}
      bgColor="teal.700"
      boxSizing="border-box"
      alignItems="center"
      px={5}
    >
      <Text
        cursor="pointer"
        onClick={() => {
          router.push("/");
        }}
        fontWeight="extrabold"
        fontSize={22}
        textColor="teal.50"
      >
        Next Resto
      </Text>
      <Box>
        {" "}
        <Button
          size="sm"
          onClick={() => {
            router.push(`/cart/${token}`);
          }}
          colorScheme="yellow"
          fontSize={20}
          fontWeight="bold"
        >
          <AiOutlineShoppingCart />
          <Badge bgColor="red" color="white">
            {countCart}
          </Badge>
        </Button>
        <Button
        ml={4}
          size="sm"
          onClick={() => {
            router.push(`/order/${token}`);
          }}
          colorScheme="red"
          fontSize={20}
          fontWeight="bold"
        >
          <MdFastfood />
          <Badge bgColor="teal" color="white" ml={2}>
            {countOrder}
          </Badge>
        </Button>
        <Button
        ml={4}
          size="sm"
          onClick={handleLogout}
          colorScheme="blue"
          fontSize={20}
          fontWeight="bold"
        >
          <FiLogOut />
          
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React from "react";

function ItemMenu({item}) {

    const router = useRouter()







  return (
    <Flex
      flexDirection="column"
      h="260px"
      bgColor="white"
      borderRadius={10}
      boxShadow="0px 1px 0px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 48px rgba(17,17,26,0.1);"
      boxSizing="border-box"
    >
      <Image 
        h="60%"
        w="100%"
        src={`images/${item.image}`}
        objectFit="cover"
        objectPosition="center"
        borderRadius={10}
      />
      <Box w="100%" px={4} my={2}>
        <Text fontSize={18} fontWeight="extrabold">
          {item.food}
        </Text>
        <Text fontSize={15} fontWeight="extrabold">
          Rp {item.price}
        </Text>
      </Box>
      <Button
      onClick={() => router.push(`/food/${item.food_id}`)}
        colorScheme="teal"
        w="100%"
        alignSelf="center"
        borderTopRadius="none"
      >
        Detail
      </Button>
    </Flex>
  );
}

export default ItemMenu;

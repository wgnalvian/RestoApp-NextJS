import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import React from 'react'
import ItemMenu from './ItemMenu'

function Menu({data}) {
    return (
        <Flex maxW="90%" w="100%" mt={10} flexDirection="column" mb={50} >
            <Text fontWeight="extrabold" fontSize={25} mb={3}>Available Menu</Text>
            <hr style={{border : '1px solid grey', width : '100%', opacity : 0.5}}  />

            {/* Menu */}
            <Grid gridTemplateColumns="1fr 1fr 1fr 1fr" w="100%" gap={5} mt={5}>
               {data.map(i => <ItemMenu key={i.food_id} item={i} />)}              
            </Grid>
        </Flex>
    )
}

export default Menu


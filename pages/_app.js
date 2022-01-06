import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
function MyApp({ Component, pageProps }) {

  return (
  <ChakraProvider>
    <Component {...pageProps} nama="alvian" />
  </ChakraProvider>
  )
}

export default MyApp

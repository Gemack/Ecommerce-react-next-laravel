import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;

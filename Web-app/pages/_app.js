import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";
import { store } from "../Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistStore } from "reduxjs-toolkit-persist";

const persistor = persistStore(store);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

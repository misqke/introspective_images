import axios from "axios";
import { GlobalStyles } from "../components";

// axios.defaults.baseURL = "https://introspective-images.vercel.app";
axios.defaults.baseURL = "http://localhost:3000";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

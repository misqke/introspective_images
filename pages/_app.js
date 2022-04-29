import "../styles/globals.scss";
import axios from "axios";

axios.defaults.baseURL = "https://introspective-images.netlify.app";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

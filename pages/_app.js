import "../styles/globals.scss";
import axios from "axios";

// axios.defaults.baseURL = "https://introspective-images.netlify.app";
axios.defaults.baseURL = "http://localhost:3000";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

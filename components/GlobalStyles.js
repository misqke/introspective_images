import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    scroll-behavior: smooth;
    height: 100%;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ::-webkit-scrollbar {
    background: #bbb;
    width: 8px;
    height: 5px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
  }
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export default GlobalStyles;

import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import About from "./About";
import Gallery from "./Gallery";
import Hero from "./Hero";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
  background-image: url(${(props) => props.cover.url});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 900px) {
    background-attachment: scroll;
  }
`;

export { GlobalStyles, Page, About, Hero, Gallery };

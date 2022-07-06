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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  box-shadow: 0px 10px 6px 8px #0008;
  margin: 40vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: ${(props) => props.max || 850}px;
  padding: 2rem 0.5rem;
  gap: 2rem;
  overflow: hidden;
`;

export { GlobalStyles, Page, About, Hero, Gallery, Container };

import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Overlay from "./Overlay";
import AdminPage from "./Admin";
import AdminLogin from "./Admin/AdminLogin";

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
  gap: 70vh;
  overflow: hidden;
  @media screen and (max-width: 900px) {
    background-attachment: undefined;
    background-size: cover;
    max-height: 100vh;
    overflow: scroll;
    gap: 50vh;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  box-shadow: 0px 10px 6px 8px #0008;
  z-index: 2;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: ${(props) => props.max || 850}px;
  padding: 2rem 0.5rem;
  gap: 2rem;
  overflow: hidden;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const ALink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 2em;
  color: #00f;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 8px 0px #0008;
  transition-duration: 300ms;
  &:hover {
    box-shadow: 0px 2px 4px 0px #0008;
    background-color: #00f3;
  }
`;

const LogoBox = styled.div.attrs((props) => ({
  style: {
    transform: `translateY(${props.pos}px)`,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  width: 300px;
  max-width: 90%;
  height: auto;
  background: #5551;
  border-radius: 50%;
  backdrop-filter: blur(4px);
  border: 0.25px solid #fff;
  box-shadow: 0px 10px 9px 8px #0008;
  position: absolute;
  top: 75px;
  z-index: 1;
  @media screen and (min-width: 900px) {
    padding: 50px;
    width: 450px;
  }
`;

export {
  GlobalStyles,
  Page,
  About,
  Gallery,
  Contact,
  AdminPage,
  AdminLogin,
  Overlay,
  Content,
  Container,
  LogoBox,
  LinkBox,
  ALink,
};

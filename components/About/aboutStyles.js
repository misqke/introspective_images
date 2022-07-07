import styled from "styled-components";

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background: #fff;
  box-shadow: 0px 10px 6px 8px #0008;
  margin-top: 75vh;
  z-index: 2;
`;

export const TextContainer = styled.div`
  display: flex;
  height: 25vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 1em;
  max-width: 50ch;
  font-size: 1.25em;
  text-align: center;
  @media screen and (min-width: 600px) {
    font-size: 1.5em;
  }
  @media screen and (min-width: 1000px) {
    font-size: 1.75em;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background: #000;
  border-radius: 2rem;
`;

export const ContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;
export const ContactBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00f;
  color: #00f;
  background: transparent;
  font-size: 1em;
  padding: 0.5em 1em;
  width: 100%;
  max-width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0px 8px 8px 0px #0008;
  transition-duration: 300ms;
  &:hover {
    box-shadow: 0px 2px 4px 0px #0008;
    background-color: #00f3;
  }
  @media screen and (min-width: 800px) {
    font-size: 1.25em;
  }
`;

import React from "react";
import {
  AboutContainer,
  TextContainer,
  Text,
  Line,
  ContactBox,
  ContactBtn,
} from "./aboutStyles";
import { Content, LinkBox, ALink } from "..";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const About = ({ about, email }) => {
  return (
    <AboutContainer>
      <Content>
        <TextContainer>
          <Text>{about}</Text>
          <Line />
        </TextContainer>
        <ContactBox>
          <ContactBtn href={`mailto: ${email}`}>Get in touch</ContactBtn>
          <LinkBox>
            <ALink
              href={`https://www.facebook.com/Moondogwp20/`}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare />
            </ALink>
            <ALink
              href={`https://www.instagram.com/Introspective.images/`}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </ALink>
          </LinkBox>
        </ContactBox>
      </Content>
    </AboutContainer>
  );
};

export default About;

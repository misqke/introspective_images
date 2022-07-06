import React from "react";
import {
  Text,
  Line,
  ContactBox,
  ContactBtn,
  LinkBox,
  ALink,
} from "./aboutStyles";
import { Container, Content } from "..";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const About = ({ about, email }) => {
  return (
    <Container>
      <Content>
        <Text>{about}</Text>
        <Line />
        <ContactBox>
          <ContactBtn href={`mailto: ${email}`}>Get in touch</ContactBtn>
          <LinkBox
            href={`https://www.facebook.com/Moondogwp20/`}
            target="_blank"
            rel="noreferrer"
          >
            <ALink>
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
    </Container>
  );
};

export default About;

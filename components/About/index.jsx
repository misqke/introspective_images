import React from "react";
import {
  Container,
  Text,
  TextBox,
  Box,
  Line,
  ContactBox,
  ContactBtn,
  LinkBox,
  ALink,
  Content,
} from "./aboutStyles";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const About = ({ about, email }) => {
  return (
    <Container>
      <Box>
        <Content>
          <Text>{about}</Text>
          <Line />
          <ContactBox>
            <ContactBtn href={`mailto: ${email}`}>Get in touch</ContactBtn>
            <LinkBox>
              <ALink>
                <FaFacebookSquare />
              </ALink>
              <ALink>
                <FaInstagram />
              </ALink>
            </LinkBox>
          </ContactBox>
        </Content>
      </Box>
    </Container>
  );
};

export default About;

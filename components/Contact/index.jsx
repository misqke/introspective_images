import React from "react";
import { Container, Content, LinkBox, ALink } from "..";
import { ContactTitle, ContactText, Email, LinksBox } from "./contactStyles";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";

const Contact = ({ email }) => {
  return (
    <Container>
      <Content>
        <ContactTitle>Introspective Images</ContactTitle>
        <ContactText>Photography services in New Castle, PA</ContactText>
        <Email>{email}</Email>
        <LinksBox>
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
        </LinksBox>
      </Content>
    </Container>
  );
};

export default Contact;

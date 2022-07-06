import React from "react";
import { Container, Content } from "..";
import {
  GalleryDisplay,
  GalleryRow,
  RowTitle,
  ImagesRow,
  ImageBox,
} from "./galleryStyles";
import Image from "next/image";

const Gallery = ({ gallery, tags }) => {
  return (
    <Container>
      <Content max={1300}>
        <GalleryDisplay>
          {tags.map((tag) => (
            <GalleryRow key={tag}>
              <RowTitle>{tag}</RowTitle>
              <ImagesRow>
                {gallery
                  .filter((img) => img.tags.includes(tag))
                  .map((img) => (
                    <ImageBox>
                      <Image
                        src={img.url}
                        width={img.width}
                        height={img.height}
                        objectPosition="center"
                      />
                    </ImageBox>
                  ))}
              </ImagesRow>
            </GalleryRow>
          ))}
        </GalleryDisplay>
      </Content>
    </Container>
  );
};

export default Gallery;

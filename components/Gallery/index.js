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

const Gallery = ({ gallery, tags, click }) => {
  return (
    <Container>
      <Content max={1300}>
        <GalleryDisplay>
          {tags.map((tag) => (
            <GalleryRow key={tag}>
              <RowTitle>{tag.toUpperCase()}</RowTitle>
              <ImagesRow>
                {gallery
                  .filter((img) => img.tags.includes(tag))
                  .map((img) => (
                    <ImageBox key={img._id} onClick={() => click(img)}>
                      <Image
                        src={img.url}
                        width={img.width}
                        height={img.height}
                        objectPosition="bottom"
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

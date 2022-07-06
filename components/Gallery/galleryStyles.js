import styled from "styled-components";

export const GalleryDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const GalleryRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: fit-content;
  width: 100%;
`;

export const RowTitle = styled.h3`
  font-size: 1.5em;
`;

export const ImagesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  overflow-x: scroll;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #333 #111;

  @media screen and (min-width: 850px) {
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`;

export const ImageBox = styled.div`
  width: 200px;
  min-width: 200px;
  padding: 0.5rem;
`;

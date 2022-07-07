import styled from "styled-components";

export const GalleryDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GalleryRow = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  width: 100%;
`;

export const RowTitle = styled.h3`
  font-size: 1.5em;
  font-weight: 550;
`;

export const ImagesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow-x: scroll;
  overflow-y: visible;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: #333 #111;
  padding: 1.5rem;
  @media screen and (min-width: 800px) {
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  width: 150px;
  min-width: 150px;
  box-shadow: 0px 2px 8px 0px #0008;
  transition-duration: 150ms;
  cursor: pointer;
  &:hover {
    transform: scale(110%);
    box-shadow: 0px 4px 12px 2px #0008;
  }
  @media screen and (min-width: 800px) {
    width: 200px;
    min-width: 200px;
  }
`;

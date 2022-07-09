import styled from "styled-components";

export const AdminGalleryOverlay = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  align-items: center;
  padding: 1rem;
  justify-content: space-center;
  top: 0;
  right: 0;
  left: 0;
  gap: 1rem;
  min-height: 100vh;
  background: #0003;
  z-index: 15;
  backdrop-filter: blur(6px);
  @media screen and (min-width: 800px) {
    flex-direction: ${(props) => (props.update ? "column" : "row")};
  }
`;

export const GalleryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  max-width: 300px;
  background-color: #333;
  gap: 1rem;
  border-radius: 0.5rem;
  margin-top: 2.25rem;
  @media screen and (min-width: 500px) {
    flex-direction: row;
    max-width: 600px;
  }
  @media screen and (min-width: 800px) {
    flex-direction: column;
    max-width: 300px;
  }
`;

export const GalleryFormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const GalleryFormLabel = styled.label`
  color: #fff;
`;
export const GalleryFormTags = styled.input`
  width: 100%;
  font-size: 1em;
  padding: 0.25rem;
  border-radius: 0.5rem;
`;
export const GalleryFormCaption = styled.textarea`
  width: 100%;
  font-size: 1em;
  padding: 0.25rem;
  border-radius: 0.5rem;
`;

export const GallerySwitch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export const CloseBox = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
  color: #000;
  background: #fff;
  transition-duration: 200ms;
  &:hover {
    color: #888;
  }
`;

export const GalleryCanvas = styled.canvas``;

export const GalleryNewImage = styled.img``;

export const GalleryDisplayBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.75rem;
  justify-content: center;
`;

export const GalleryImgBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 200px;
  cursor: pointer;
  padding: 0.25rem;
  transition-duration: 250ms;
  &:hover {
    padding: 0;
  }
`;

export const GalleryOverlayImgBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  @media screen and (min-width: 800px) {
    width: 50%;
  }
`;

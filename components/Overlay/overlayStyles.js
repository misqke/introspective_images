import styled from "styled-components";

export const OverlayContainer = styled.div`
  position: fixed;
  display: ${(props) => (props.img === null ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  background: #0003;
  backdrop-filter: blur(6px);
  z-index: 20;
`;

export const OverlayImage = styled.div`
  width: 95%;
  max-width: 100%;
  height: auto;
  @media screen and (min-width: 900px) {
    width: 75%;
  }
`;

export const CloseBox = styled.div`
  position: absolute;
  top: 8%;
  right: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 50px;
  cursor: pointer;
  color: #000;
  background: #fff;
  transition-duration: 200ms;
  &:hover {
    color: #888;
  }
`;

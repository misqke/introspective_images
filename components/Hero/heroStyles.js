import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 75px;
  width: 700px;
  max-width: 90%;
  height: auto;
  background: #5551;
  border-radius: 50%;
  backdrop-filter: blur(4px);
  border: 0.25px solid #fff;
  box-shadow: 0px 10px 9px 8px #0008;
`;

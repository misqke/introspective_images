import styled from "styled-components";

export const AdminLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  position: relative;
  ::-webkit-scrollbar-track {
    width: 0.5rem;
    background-color: #888;
  }
  ::-webkit-scrollbar-thumb {
    color: #333;
  }
  @media screen and (min-width: 800px) {
    padding-left: 250px;
  }
`;

export const AdminNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 250px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: #333;
  transition-duration: 400ms;
  z-index: 9;
  padding: 1rem 0;
  transform: translateX(${(props) => (props.open ? 0 : "-100%")});
  @media screen and (min-width: 800px) {
    transform: translateX(0);
  }
`;

export const AdminNavToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #333;
  color: #fff;
  font-size: 1.75rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem;
  z-index: 10;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export const AdminNavButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  padding: 1rem;
  border: none;
  cursor: pointer;
  background: transparent;
  color: ${(props) => (props.active ? "#fff" : "#ccc")};
  transition-duration: 250ms;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: #00f;
    transform: translateX(${(props) => (props.active ? 0 : "-99%")});
    transition-duration: 250ms;
    z-index: -1;
  }
  &:hover {
    &:before {
      transform: translateX(0);
    }
  }
`;

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const AdminCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00f;
  background: transparent;
  color: #00f;
  width: 90%;
  max-width: 400px;
  border: 2px solid #00f;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition-duration: 250ms;
  &:hover {
    background: #00f8;
    color: #fff;
    border-color: #fff;
  }
`;

export const AdminPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
  gap: 1rem;
`;

export const UpdateLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00f;
  background: transparent;
  color: #00f;
  width: 90%;
  max-width: 400px;
  border: 2px solid #00f;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition-duration: 250ms;
  &:hover {
    background: #00f8;
    color: #fff;
    border-color: #fff;
  }
`;

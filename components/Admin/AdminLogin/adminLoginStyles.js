import styled from "styled-components";

export const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 500px;
  background: #888;
  padding: 2rem 1rem;
  gap: 1rem;
  border-radius: 0.5rem;
`;

export const LoginLabel = styled.label`
  font-size: 1.5em;
  color: #fff;
`;
export const LoginInput = styled.input`
  display: flex;
  width: 80%;
  font-size: 1.25em;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

export const LoginSubmit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 2px solid #00f;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 0.5rem;
  color: #00f;
  width: fit-content;
  padding: 1rem 2rem;
`;

export const LoginError = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  top: 20%;
  left: 0;
  right: 0;
  background: #f008;
  color: #fff;
`;

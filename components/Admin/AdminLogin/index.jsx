import React, { useState } from "react";
import {
  LoginPage,
  LoginForm,
  LoginLabel,
  LoginInput,
  LoginSubmit,
  LoginError,
} from "./adminLoginStyles";
import axios from "axios";

const AdminLogin = ({ setAuthed }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { data } = await axios.post(`/api/auth/login`, { password });
    if (data.error) {
      setError(data.error.message);
    } else {
      setAuthed();
    }
  };

  return (
    <LoginPage>
      {error.length > 0 && <LoginError>{error}</LoginError>}
      <LoginForm onSubmit={handleSubmit}>
        <LoginLabel>Password:</LoginLabel>
        <LoginInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <LoginSubmit>Log In</LoginSubmit>
      </LoginForm>
    </LoginPage>
  );
};

export default AdminLogin;

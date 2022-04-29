import React, { useState } from "react";
import Router from "next/router";
import Nav from "../components/Nav";
import axios from "axios";
import styles from "../styles/Login.module.scss";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    if (error) setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/auth/login`, {
        password,
      });
      if (data.error) {
        setError(data.error.message);
      } else {
        Router.push(`/admin`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          placeholder="Enter your password"
        />
        <button type="submit">Log In</button>
      </form>
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
};

export default Login;

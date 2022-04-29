import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import styles from "../styles/Login.module.scss";

const login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    if (error) setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          password,
        }
      );
      if (data.error) {
        setError(data.error.message);
      } else {
        Router.push("http://localhost:3000/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
        <button type="submit">Log In</button>
      </form>
      {error.length > 0 && <p>{error}</p>}
    </div>
  );
};

export default login;

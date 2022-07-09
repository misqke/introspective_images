import React, { useState, useEffect } from "react";
import { AdminPage, AdminLogin } from "../components";
import { authenticate } from "../controllers/auth";

const Admin = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authenticate();
      if (isAuth) {
        setAuthed(true);
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  if (!authChecked) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          width: "100vw",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Authenticating...
      </div>
    );
  } else if (!authed) {
    return <AdminLogin setAuthed={() => setAuthed(true)} />;
  } else {
    return <AdminPage />;
  }
};

export default Admin;

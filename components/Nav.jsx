import React from "react";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/Nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <CameraEnhanceOutlinedIcon fontSize="large" />
          <p>INTROSPECTIVE IMAGES</p>
        </div>
        <button className={styles.hamburger}>
          <MenuIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Nav;

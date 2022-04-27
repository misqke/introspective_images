import React from "react";
import CameraEnhanceOutlinedIcon from "@mui/icons-material/CameraEnhanceOutlined";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/Nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.titleContainer}>
        <Link href="/">
          <div className={styles.title}>
            <CameraEnhanceOutlinedIcon fontSize="large" />
            <p>INTROSPECTIVE IMAGES</p>
          </div>
        </Link>
        <button className={styles.hamburger}>
          <MenuIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Nav;

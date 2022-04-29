import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../styles/Nav.module.scss";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.navContainer}>
      <div className={styles.titleContainer}>
        <Link href="/">
          <div className={styles.title}>
            <Image src={"/logoIcon.png"} width="279" height="65" />
          </div>
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>
      <nav className={`${styles.nav} ${isOpen ? styles.open : null}`}>
        <ul>
          <li>
            <a href="/#aboutContainer">About</a>
          </li>
          <li>
            <Link href="/gallery" passHref>
              <a>Gallery</a>
            </Link>
          </li>
          <li>
            <a href="/#contactContainer">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;

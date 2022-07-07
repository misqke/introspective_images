import React, { useState } from "react";
import {
  AdminLayout,
  AdminNav,
  AdminNavToggle,
  AdminNavButton,
  AdminContainer,
} from "./adminStyles";
import AdminCover from "./AdminCover";
import AdminInfo from "./AdminInfo";
import AdminGallery from "./AdminGallery";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminPage = () => {
  const [navOpen, setNavOpen] = useState(true);
  const [page, setPage] = useState("cover");

  return (
    <AdminLayout>
      <AdminNavToggle
        open={navOpen}
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <GiHamburgerMenu />
      </AdminNavToggle>
      <AdminNav open={navOpen}>
        <AdminNavButton
          active={page === "cover"}
          onClick={() => setPage("cover")}
        >
          Cover
        </AdminNavButton>
        <AdminNavButton
          active={page === "gallery"}
          onClick={() => setPage("gallery")}
        >
          Gallery
        </AdminNavButton>
        <AdminNavButton
          active={page === "info"}
          onClick={() => setPage("info")}
        >
          Info
        </AdminNavButton>
      </AdminNav>
      <AdminContainer>
        {page === "cover" ? (
          <AdminCover />
        ) : page === "gallery" ? (
          <AdminGallery />
        ) : (
          <AdminInfo />
        )}
      </AdminContainer>
    </AdminLayout>
  );
};

export default AdminPage;

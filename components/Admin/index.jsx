import React, { useState, useEffect } from "react";
import {
  AdminLayout,
  AdminNav,
  AdminNavToggle,
  AdminNavButton,
  AdminContainer,
  AdminCol,
  OutlineButton,
} from "./adminStyles";
import AdminCover from "./AdminCover";
import AdminInfo from "./AdminInfo";
import AdminGallery from "./AdminGallery";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useRouter } from "next/router";
import { handleCoverUpdate, handleGalleryAdd } from "../../controllers/images";

const AdminPage = () => {
  const router = useRouter();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const [page, setPage] = useState("cover");
  const [cover, setCover] = useState({});
  const [gallery, setGallery] = useState([]);
  const [tags, setTags] = useState([]);
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");

  const logOut = async () => {
    const { data } = await axios.get(`/api/auth/logout`);
    if (data.message === "logout successful") {
      router.push("/");
    }
  };

  const updateCover = async (url, id, width, height) => {
    const newCover = await handleCoverUpdate(url, id, width, height);
    setCover(newCover);
  };

  const addToGallery = async (url, id, width, height, tags, caption) => {
    console.log("sending to server");
    const newGalleryImage = await handleGalleryAdd(
      url,
      id,
      width,
      height,
      tags,
      caption
    );
    console.log(newGalleryImage);
    setGallery((prev) => [newGalleryImage, ...prev]);
  };

  useEffect(() => {
    const getImageData = async () => {
      const { data } = await axios.get(`/api/admin/images`);
      setCover(data.data.cover);
      setGallery(data.data.gallery);
      setTags(data.data.tags);
      setDataLoaded(true);
    };
    const getInfoData = async () => {
      const { data } = await axios.get(`api/admin/info`);
      setAbout(data.data.about);
      setEmail(data.data.email);
    };
    getImageData();
    getInfoData();
  }, []);

  return (
    <AdminLayout>
      <AdminNavToggle
        open={navOpen}
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <GiHamburgerMenu />
      </AdminNavToggle>
      <AdminNav open={navOpen}>
        <AdminCol>
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
        </AdminCol>
        <OutlineButton onClick={() => logOut()}>Log Out</OutlineButton>
      </AdminNav>
      {dataLoaded === true && (
        <AdminContainer>
          {page === "cover" ? (
            <AdminCover cover={cover} updateCover={updateCover} />
          ) : page === "gallery" ? (
            <AdminGallery
              gallery={gallery}
              tags={tags}
              addToGallery={addToGallery}
            />
          ) : (
            <AdminInfo about={about} email={email} />
          )}
        </AdminContainer>
      )}
    </AdminLayout>
  );
};

export default AdminPage;

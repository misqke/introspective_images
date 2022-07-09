import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Page, About, Gallery, LogoBox, Overlay, Contact } from "../components";
import Image from "next/image";

const Home = ({ cover, gallery, tags, about, email }) => {
  const [logoPos, setLogoPos] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (img) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY * 1.2;
      const bodyHeight = document.body.scrollHeight;
      if (scrollHeight < bodyHeight - bodyHeight * 0.21) {
        setLogoPos(scrollHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Page cover={cover}>
      <Head>
        <title>Introspective Images</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Overlay img={selectedImage} click={handleSelectImage} />
      <LogoBox pos={logoPos}>
        <Image src={"/logo.png"} width={2447} height={1713} priority alt="" />
      </LogoBox>
      <About about={about} email={email} />
      <Gallery gallery={gallery} tags={tags} click={handleSelectImage} />
      <Contact email={email} />
    </Page>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const imgData = await axios.get(`/api/admin/images`);
    const infoData = await axios.get(`/api/admin/info`);
    return {
      props: {
        cover: imgData.data.data.cover,
        gallery: imgData.data.data.gallery,
        tags: imgData.data.data.tags,
        about: infoData.data.data.about,
        email: infoData.data.data.email,
        infoId: infoData.data.data._id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        cover: null,
        gallery: null,
        tags: null,
        about: null,
        email: null,
      },
    };
  }
};

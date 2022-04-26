import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Introspective Images</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Nav />
      <Hero />
    </div>
  );
}

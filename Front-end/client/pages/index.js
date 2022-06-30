import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { Content } from "antd/lib/layout/layout";
import MoviesList from "../components/MoviesList";
import { Carousel } from 'antd';

const contentStyle = {
  height: '700px',
  width: '100%',
  color: '#fff',
  lineHeight: '250px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>S Major F cineplex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Carousel autoplay style={{paddingLeft:'100px', paddingRight:'100px', paddingTop: '20px'}}>
    <div>
      <h3 style={contentStyle}>
        <img src="https://i.ibb.co/KxVmH9M/truemoneywallet-major-cineplex-promotion-20210928-1100x550px.webp" style={{width:'100%', height:'100%'}}/>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://i.ibb.co/dfBJF4p/JCB-x-Major-Cineplex-1-get-1-promo.webp" style={{width:'100%', height:'100%'}}/>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://i.ibb.co/vsKHXRr/The-Beatles-Get-Back-landscape.webp" style={{width:'100%', height:'100%'}}/>
      </h3>
    </div>
  </Carousel>

      <MoviesList />

      <Footer />
    </div>
  );
}

import React from 'react';
import Head from 'next/head';
import Comparator from '../components/Comparator/Comparator';
import styles from '../styles/Home.module.scss'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>CompareMate</title>
        <link rel="icon" href="/next.svg" />
      </Head>
      <div className={styles.home}>
        <h1>Bienvenido a CompareMate</h1>
        <Comparator />
      </div>
    </>
  );
};

export default HomePage;
import React from 'react';
import Comparator from '../components/Comparator/Comparator';
import styles from '../styles/Home.module.scss'

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1>Bienvenido a CompareMate</h1>
      <Comparator />
    </div>
  );
};

export default HomePage;
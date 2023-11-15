import React, { useState } from 'react';
import styles from './Comparator.module.scss';

const Comparator = () => {
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [difference, setDifference] = useState('');

  const compareTexts = () => {
    // Lógica de comparación aquí (CompareUtils)
    setDifference('Resultado de la comparación');
  };

  return (
    <div className={styles.comparator}>
      <textarea value={inputOne} onChange={e => setInputOne(e.target.value)} placeholder="Ingresa el primer texto"></textarea>
      <textarea value={inputTwo} onChange={e => setInputTwo(e.target.value)} placeholder="Ingresa el segundo texto"></textarea>
      <button onClick={compareTexts}>Comparar</button>
      <div className={styles.result}>{difference}</div>
    </div>
  );
};

export default Comparator;

import React, { useState, useEffect } from 'react';
import styles from './Comparator.module.scss';
import { compareTexts } from '../../utils/compareUtils';

const Comparator = () => {
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [highlightedTextOne, setHighlightedTextOne] = useState('');
  const [highlightedTextTwo, setHighlightedTextTwo] = useState('');

  useEffect(() => {
    const { textOne, textTwo } = compareTexts(inputOne, inputTwo);
    setHighlightedTextOne(textOne);
    setHighlightedTextTwo(textTwo);
  }, [inputOne, inputTwo]);

  return (
    <div className={styles.comparator}>
      <div className={styles.boxContainer}>
        <div 
          contentEditable 
          className={styles.textArea} 
          onInput={(e) => setInputOne(e.currentTarget.textContent)}
          dangerouslySetInnerHTML={{ __html: highlightedTextOne }}
        />
        <div 
          contentEditable 
          className={styles.textArea} 
          onInput={(e) => setInputTwo(e.currentTarget.textContent)}
          dangerouslySetInnerHTML={{ __html: highlightedTextTwo }}
        />
      </div>
      <button onClick={() => compareTexts(inputOne, inputTwo)}>Comparar</button>
    </div>
  );
};

export default Comparator;

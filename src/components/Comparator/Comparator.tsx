import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import styles from './Comparator.module.scss';

const Comparator = () => {
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [language, setLanguage] = useState('javascript');
  const monaco = useMonaco();
  const editorRef = useRef(null);
  
  useEffect(() => {
    if (monaco && editorRef.current) {
      const originalModel = monaco.editor.createModel(inputOne, language);
      const modifiedModel = monaco.editor.createModel(inputTwo, language);

      const diffEditor = monaco.editor.createDiffEditor(editorRef.current, {
        readOnly: false,
        automaticLayout: true,
        theme: 'vs-dark', // Modo oscuro
        enableSplitViewResizing: true,
        renderSideBySide: true
      });

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
      });

      // Funcionalidad para mover diferencias de un lado a otro
      diffEditor.getModifiedEditor().addAction({
        id: 'my-unique-id',
        label: 'Move Change Left',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 1,
        run: function (editor) {
          // Implementar lógica para mover el cambio
        }
      });

      return () => diffEditor.dispose();
    }
  }, [monaco, inputOne, inputTwo, language]);

  return (
    <div className={styles.comparator}>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <div className={styles.boxContainer}>
        <MonacoEditor
          height="400px"
          language={language}
          value={inputOne}
          onChange={setInputOne}
          options={{ lineNumbers: 'on' }}
        />
        <MonacoEditor
          height="400px"
          language={language}
          value={inputTwo}
          onChange={setInputTwo}
          options={{ lineNumbers: 'on' }}
        />
      </div>
      
      <div ref={editorRef} className={styles.diffEditor} style={{ height: '400px', width: '100%' }} />

      
    </div>
  );
};

export default Comparator;

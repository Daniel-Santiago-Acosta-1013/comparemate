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
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 1,
        run: function (editor) {
          // Obtener la selección actual
          const selection = editor.getSelection();
          const modifiedModel = editor.getModel();
          const originalModel = diffEditor.getOriginalEditor().getModel();
        
          if (selection && modifiedModel && originalModel) {
            // Obtener el texto seleccionado
            const text = modifiedModel.getValueInRange(selection);
        
            // Calcular la posición de inserción en el modelo original
            const insertPosition = {
              lineNumber: selection.startLineNumber,
              column: 1 // Inicio de la línea
            };
        
            // Insertar el texto en el modelo original
            originalModel.pushEditOperations([], [{
              range: new monaco.Range(insertPosition.lineNumber, insertPosition.column, insertPosition.lineNumber, insertPosition.column),
              text: text,
              forceMoveMarkers: true
            }], () => null);
        
            // Opcional: eliminar el texto del modelo modificado
            modifiedModel.pushEditOperations([], [{
              range: selection,
              text: null,
              forceMoveMarkers: true
            }], () => null);
          }
        }
      });

      return () => diffEditor.dispose();
    }
  }, [monaco, inputOne, inputTwo, language]);


  const handleInputOneChange = (newValue: string | undefined) => {
    setInputOne(newValue ?? '');
  };

  const handleInputTwoChange = (newValue: string | undefined) => {
    setInputTwo(newValue ?? '');
  };

  return (
    <div className={styles.comparator}>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
      <div className={styles.boxContainer}>
        <MonacoEditor
          height="400px"
          language={language}
          value={inputOne}
          onChange={handleInputOneChange}
          options={{ lineNumbers: 'on' }}
        />
        <MonacoEditor
          height="400px"
          language={language}
          value={inputTwo}
          onChange={handleInputTwoChange}
          options={{ lineNumbers: 'on' }}
        />
      </div>
      
      <div ref={editorRef} className={styles.diffEditor} style={{ height: '400px', width: '100%' }} />

      
    </div>
  );
};

export default Comparator;

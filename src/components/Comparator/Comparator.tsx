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
        theme: 'vs-dark',
        enableSplitViewResizing: true,
        renderSideBySide: true
      });

      diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
      });

      diffEditor.getModifiedEditor().addAction({
        id: 'move-change-left',
        label: 'Move Change Left',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        contextMenuGroupId: '9_cutcopypaste',
        contextMenuOrder: 1,
        run: function (editor) {
          const selection = editor.getSelection();
          const modifiedModel = editor.getModel();
          const originalModel = diffEditor.getOriginalEditor().getModel();

          if (selection && modifiedModel && originalModel) {
            const text = modifiedModel.getValueInRange(selection);
            const lineCount = modifiedModel.getLineCount();
            const lastLineLength = modifiedModel.getLineLength(lineCount);

            originalModel.pushEditOperations([], [{
              range: new monaco.Range(1, 1, lineCount, lastLineLength + 1),
              text: text + '\n' + originalModel.getValue(),
              forceMoveMarkers: true
            }], () => null);
        
            modifiedModel.pushEditOperations([], [{
              range: selection,
              text: '',
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

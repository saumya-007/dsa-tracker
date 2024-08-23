import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/ext-language_tools";

const GoEditor = ({ value = "", name, onChange, width = "40vw", height = "40vh" }) => {
  const [code, setCode] = useState(value)
  const [uniqueName, setUniqueName] = useState(name)

  useEffect(() => {
    setCode(value)
  }, [value])

  useEffect(() => {
    setUniqueName(name)
  }, [name])

  return (
    <AceEditor
      mode="golang"
      theme="tomorrow_night"
      onChange={(currentValue) => onChange(currentValue, name)}
      value={code}
      name={uniqueName}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
      style={{
        width,
        height,
        border: '2px solid gray',
        borderRadius: '15px'
      }}
      fontSize={16} // Increased font size
      showPrintMargin={false}
      highlightActiveLine={true}
    />
  );
};

export default GoEditor;

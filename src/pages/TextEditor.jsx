import React, { useRef } from "react";
import { PageHeader } from "../components/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContextProvider } from "../context/ContextProvider";

const TextEditor = () => {
  const { textEditorContent, setTextEditorContent } = useContextProvider();
  const editorRef = useRef(null);

  return (
    <div className="flex h-full flex-col flex-1">
      <PageHeader title={"text editor"} subTitle={"text editor"} />
      <ReactQuill
        ref={editorRef}
        theme="snow"
        value={textEditorContent}
        onChange={() => setTextEditorContent(editorRef.current.value)}
        placeholder="start typing..."
        className="bg-section-bg flex-1 overflow-auto p-4 max-h-[460px]"
      />
    </div>
  );
};

export default TextEditor;

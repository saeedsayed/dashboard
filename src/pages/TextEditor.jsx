// hooks
import { useRef } from "react";
import { useContextProvider } from "../context/ContextProvider";
// components
import { PageHeader } from "../components/index";
import ReactQuill from "react-quill";
import { CardBody } from "../components/index";
// styles
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const { textEditorContent, setTextEditorContent } = useContextProvider();
  const editorRef = useRef(null);

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={"text editor"} subTitle={"text editor"} />
      <div className="h-[calc(100vh-196px)]">
        <CardBody>
          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={textEditorContent}
            onChange={() => setTextEditorContent(editorRef.current.value)}
            placeholder="start typing..."
            className="overflow-auto h-full"
          />
        </CardBody>
      </div>
    </div>
  );
};

export default TextEditor;

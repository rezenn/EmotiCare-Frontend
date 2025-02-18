import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./textEditor.css"; 

function TextEditor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
      ],
    },
  });

  // Handle paste events to prevent image/video pasting
  useEffect(() => {
    if (quill) {
      const handlePaste = (event) => {
        const clipboardData = event.clipboardData || window.clipboardData;
        const items = clipboardData.items;

        for (let i = 0; i < items.length; i++) {
          if (
            items[i].type.indexOf("image") !== -1 ||
            items[i].type.indexOf("video") !== -1
          ) {
            event.preventDefault();
            alert("Image and video pasting is not allowed.");
            return;
          }
        }
      };

      quill.root.addEventListener("paste", handlePaste);

      return () => {
        quill.root.removeEventListener("paste", handlePaste);
      };
    }
  }, [quill]);

  // Ensure links open in a new tab
  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        const links = quill.root.querySelectorAll("a");
        links.forEach((link) => {
          link.setAttribute("target", "_blank"); // Open links in a new tab
          link.setAttribute("rel", "noopener noreferrer"); // Security best practice
        });
      };

      quill.on("text-change", handleTextChange);

      return () => {
        quill.off("text-change", handleTextChange);
      };
    }
  }, [quill]);

  // Handle changes in the editor content
  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML;
        if (onChange) {
          onChange(html);
        }
      };

      quill.on("text-change", handler);

      return () => {
        quill.off("text-change", handler);
      };
    }
  }, [quill, onChange]);

  return (
    <div className="Editor">
      <div ref={quillRef} style={{ width: "100%", height: 350 }} />
    </div>
  );
}

export default TextEditor;

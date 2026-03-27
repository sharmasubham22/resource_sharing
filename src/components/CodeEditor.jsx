import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { useEffect, useState } from "react";
import hljs from "highlight.js";

export default function CodeEditor({ value = "", onChange }) {
  const [language, setLanguage] = useState("javascript");

  const detectLanguage = (code) => {
    const result = hljs.highlightAuto(code);
    return result.language || "javascript";
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "html":
        return html();
      case "css":
        return css();
      case "json":
        return json();
      default:
        return javascript();
    }
  };

  // detect language when value changes
  useEffect(() => {
    if (!value) return;

    const detected = detectLanguage(value);
    setLanguage(detected);
  }, [value]);

  return (
    <CodeMirror
      value={value || ""} // 🔥 IMPORTANT
      height="200px"
      extensions={[getLanguageExtension(language)]}
      onChange={(val) => onChange(val)} // 🔥 pass to parent
      theme="dark"
    />
  );
}
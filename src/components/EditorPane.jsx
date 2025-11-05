import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import {
  monokaiPro,
  nord,
  tokyoNight,
  dracula,
  solarizedLight,
  githubLight,
  materialOcean,
  ayuMirage,
} from "../themes/customThemes";

const lightTheme = EditorView.theme(
  {
    "&": {
      color: "#000",
      backgroundColor: "#fafafa",
    },
    ".cm-content": {
      caretColor: "#000",
    },
    "&.cm-focused .cm-cursor": { borderLeftColor: "#000" },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#d7d7d7",
    },
  },
  { dark: false }
);

const highContrastTheme = EditorView.theme(
  {
    "&": { backgroundColor: "#000", color: "#0f0" },
    ".cm-content": { caretColor: "#0f0" },
    "&.cm-focused .cm-cursor": { borderLeftColor: "#0f0" },
  },
  { dark: true }
);

const getThemeExtension = (theme, isDark) => {
  switch (theme) {
    case "vsCode":
      return isDark ? vscodeDark : vscodeLight;
    case "oneDark":
      return oneDark;
    case "light":
      return lightTheme;
    case "highContrast":
      return highContrastTheme;
    case "monokaiPro":
      return monokaiPro;
    case "nord":
      return nord;
    case "tokyoNight":
      return tokyoNight;
    case "dracula":
      return dracula;
    case "solarizedLight":
      return solarizedLight;
    case "githubLight":
      return githubLight;
    case "materialOcean":
      return materialOcean;
    case "ayuMirage":
      return ayuMirage;
    default:
      return oneDark;
  }
};

const languageExtensions = {
  html: html(),
  css: css(),
  javascript: javascript(),
};

export default function EditorPane({
  language,
  value,
  onChange,
  isDark,
  theme,
  isActive,
}) {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const themeExtension = getThemeExtension(theme, isDark);
    const extensions = [
      basicSetup,
      languageExtensions[language],
      EditorView.lineWrapping,
      themeExtension,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      }),
    ];

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [language, theme, isDark]);

  useEffect(() => {
    if (viewRef.current) {
      const currentValue = viewRef.current.state.doc.toString();
      if (currentValue !== value) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: currentValue.length,
            insert: value,
          },
        });
      }
    }
  }, [value]);

  return (
    <div
      className={`
        absolute inset-0 h-full flex flex-col transition-opacity duration-300
        ${isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}
      `}
    >
      <div ref={editorRef} className="flex-1 overflow-auto" />
    </div>
  );
}

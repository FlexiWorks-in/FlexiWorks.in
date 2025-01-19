import React, { useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  ContentBlock,
  DraftStyleMap,
  DraftHandleValue,
} from "draft-js";
import { Controller, Control } from "react-hook-form";
import { stateToHTML } from "draft-js-export-html";
import { styled, Box } from "@mui/material";
import "draft-js/dist/Draft.css";

import Toolbar from "./Toolbar/Toolbar";

interface FormData {
  title: string;
  description: string;
  image: FileList | null;
  fileName?: string;
}

interface RealtimeEditorProps {
  name: keyof FormData;
  control: Control<FormData>;
}

const EditorWrapper = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const EditorContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  minHeight: "200px",
  cursor: "text",
}));

const RealTimeEditor: React.FC<RealtimeEditorProps> = ({ name, control }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef<Editor | null>(null);

  const onFocusEditor = () => {
    if (editor.current) editor.current.focus();
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const styleMap: DraftStyleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: "0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  const blockStyleFunctions = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        return "";
    }
  };

  const isEditorEmpty = (): boolean => {
    const plainText = editorState.getCurrentContent().getPlainText();
    return plainText.trim() === "";
  };
  const getHTMLContent = (): string => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const contentState = convertFromRaw(rawContentState);
    const htmlContent = stateToHTML(contentState);
    return !isEditorEmpty() ? htmlContent : "";
  };

  return (
    <EditorWrapper>
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <EditorContainer onClick={onFocusEditor}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              ref={editor}
              handleKeyCommand={handleKeyCommand}
              editorState={editorState}
              customStyleMap={styleMap}
              blockStyleFn={blockStyleFunctions}
              onChange={(editorState) => {
                setEditorState(editorState);
                onChange(getHTMLContent());
              }}
            />
          )}
        />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default RealTimeEditor;

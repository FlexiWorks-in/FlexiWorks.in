import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
} from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RichUtils, EditorState } from "draft-js";

interface ToolbarProps {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
}

const ToolbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
}));

const ToolbarGrid = styled(Box)({
  display: "flex",
  gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
  gap: "8px",
});

const Toolbar: React.FC<ToolbarProps> = ({ editorState, setEditorState }) => {
  const tools = [
    { label: "Bold", style: "BOLD", icon: <FormatBold />, method: "inline" },
    {
      label: "Italic",
      style: "ITALIC",
      icon: <FormatItalic />,
      method: "inline",
    },
    {
      label: "Underline",
      style: "UNDERLINE",
      icon: <FormatUnderlined />,
      method: "inline",
    },
    {
      label: "Strikethrough",
      style: "STRIKETHROUGH",
      icon: <FormatStrikethrough />,
      method: "inline",
    },
    {
      label: "Unordered List",
      style: "unordered-list-item",
      icon: <FormatListBulleted />,
      method: "block",
    },
    {
      label: "Ordered List",
      style: "ordered-list-item",
      icon: <FormatListNumbered />,
      method: "block",
    },
    {
      label: "Left Align",
      style: "leftAlign",
      icon: <FormatAlignLeft />,
      method: "block",
    },
    {
      label: "Center Align",
      style: "centerAlign",
      icon: <FormatAlignCenter />,
      method: "block",
    },
    {
      label: "Right Align",
      style: "rightAlign",
      icon: <FormatAlignRight />,
      method: "block",
    },
    { label: "H1", style: "header-one", method: "block" },
    { label: "H2", style: "header-two", method: "block" },
    { label: "H3", style: "header-three", method: "block" },
  ];

  const applyStyle = (
    e: React.MouseEvent<HTMLButtonElement>,
    style: string,
    method: string
  ) => {
    e.preventDefault();
    method === "block"
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style: string, method: string) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <ToolbarContainer>
      <ToolbarGrid>
        {tools.map((item, idx) => (
          <IconButton
            key={`${item.label}-${idx}`}
            title={item.label}
            onClick={(e) => applyStyle(e, item.style, item.method)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={item.label}
            size="small"
            color={isActive(item.style, item.method) ? "primary" : "default"}
          >
            {item.icon || item.label}
          </IconButton>
        ))}
      </ToolbarGrid>
    </ToolbarContainer>
  );
};

export default Toolbar;

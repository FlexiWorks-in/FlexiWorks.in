import { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import { Comment } from "../types/api";

interface CommentCardProps {
  comment: Comment;
  onUpdatedComment: (commentId?: string, content?: string) => void;
  onDeleteComment: (commentId?: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onUpdatedComment,
  onDeleteComment,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editingContent, setEditingContent] = useState<string>("");

  const onSave = (commentId?: string, content?: string) => {
    onUpdatedComment(commentId, content);
    setIsEdit(false);
  };

  const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingContent(e.target.value);
  };

  const onEditCancel = () => {
    setIsEdit(false);
  };

  const onEditAction = (commentId: string) => {
    setIsEdit(true);
    setEditingContent(comment.content || "");
    console.log("EditComment State Updated To:", commentId);
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>{comment.createdBy.firstName[0]}</Avatar>
      </ListItemAvatar>

      {isEdit ? (
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            value={editingContent}
            onChange={onEditChange}
            fullWidth
            variant="outlined"
            size="small"
          />
          <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSave(comment._id, editingContent)}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={onEditCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
            secondary={comment.content}
          />
          <CommentActions
            commentId={comment._id}
            onEditAction={onEditAction}
            onDeleteComment={onDeleteComment}
          />
        </>
      )}
    </ListItem>
  );
};

const CommentActions = ({
  commentId,
  onEditAction,
  onDeleteComment,
}: {
  commentId?: string;
  onEditAction: (content: string) => void;
  onDeleteComment: (commentId?: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const actions = [
    { name: "Edit", action: () => commentId && onEditAction(commentId) },
    { name: "Delete", action: () => commentId && onDeleteComment(commentId) },
  ];

  return (
    <>
      <IconButton aria-label="settings" onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {actions.map((action) => (
          <MenuItem key={action.name} onClick={action.action}>
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CommentCard;

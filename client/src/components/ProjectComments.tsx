import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useNotification } from "../hooks/NotificationProvider";

import CommentCard from "./CommentCard";

import { commentService } from "../services";
import { Comment } from "../types/api";

interface ProjectCommentsProps {
  projectId: string;
}

const ProjectComments: React.FC<ProjectCommentsProps> = ({ projectId }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [projectComments, setProjectComments] = useState<Comment[]>([]);

  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    commentService
      .getComments(projectId)
      .then((response) => {
        setProjectComments(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  const onAddComment = async () => {
    try {
      const response = await commentService.addComment(projectId, newComment);
      console.log("ProjectDetails:: comment added", response);
      showSuccess(response.message);
      setNewComment("");
      setProjectComments((prevComments) => [...prevComments, response.data]);
    } catch (err: any) {
      showError(err.message);
      console.error(err);
    }
  };

  const onUpdateComment = async (commentId?: string, content?: string) => {
    console.log("update comment", commentId);
    try {
      const response = await commentService.updateComment(commentId, content);
      console.log("ProjectDetails:: comment updated", response);
      showSuccess(response.message);
      setProjectComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: content || "" }
            : comment
        )
      );
    } catch (err: any) {
      showError(err.message);
      console.error(err);
    }
  };

  const onDeleteComment = async (commentId?: string) => {
    try {
      const response = await commentService.deleteComment(commentId);
      console.log("ProjectDetails:: comment deleted", response);
      showSuccess(response.message);
      setProjectComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (err: any) {
      showError(err.message);
      console.error(err);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <Box mt={2}>
        <FormControl fullWidth>
          <FormLabel htmlFor="comment">Add a comment</FormLabel>
          <TextField
            fullWidth
            multiline
            id="comment"
            maxRows={3}
            variant="outlined"
            sx={{ mb: 2 }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={onAddComment}>
          Project Comment
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {projectComments.length > 0 ? (
          projectComments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              onUpdatedComment={onUpdateComment}
              onDeleteComment={onDeleteComment}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default ProjectComments;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommentOutlined,
  MoreVert,
  ShareOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import parse from "html-react-parser";
import { Project } from "../types/props";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import { deleteProject } from "../app/features/projectSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 16,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  width: "100%",
  "&:last-child": {
    paddingBottom: 16,
  },
});

const ProjectCard: React.FC<Project> = ({
  _id,
  imageUrl,
  description,
  createdBy,
  createdAt,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onDeleteProject = (
    event: React.MouseEvent<HTMLElement>,
    projectId: string
  ) => {
    event.stopPropagation();
    dispatch(deleteProject(projectId));
  };

  console.log(createdBy);

  return (
    <StyledCard key={_id} onClick={() => navigate(`/projects/${_id}`)}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }} aria-label="profile">
            {createdBy.firstName.charAt(0)}
          </Avatar>
        }
        action={
          <ProjectActions projectId={_id} onDeleteProject={onDeleteProject} />
        }
        title={`${createdBy.firstName} ${createdBy.lastName}`}
        subheader={createdAt}
      />
      {imageUrl && (
        <CardMedia
          component="img"
          height="400"
          image={imageUrl}
          alt="Social media project image"
          sx={{
            aspectRatio: "4 / 5",
            borderRadius: 2,
          }}
        />
      )}
      <StyledCardContent>
        <Typography component="div" variant="body2" color="text.secondary">
          {parse(description)}
        </Typography>
      </StyledCardContent>
      <Divider />
      <CardActions>
        <IconButton aria-label="like">
          <ThumbUpOutlined />
        </IconButton>
        <IconButton aria-label="comment">
          <CommentOutlined />
        </IconButton>
        <IconButton aria-label="share">
          <ShareOutlined />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

const ProjectActions = ({
  projectId,
  onDeleteProject,
}: {
  projectId: string;
  onDeleteProject: (
    event: React.MouseEvent<HTMLElement>,
    projectId: string
  ) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const actions = [
    { name: "Edit", action: () => console.log("Edit project") },
    {
      name: "Delete",
      action: (event: React.MouseEvent<HTMLElement>) =>
        onDeleteProject(event, projectId),
    },
    { name: "Share", action: () => console.log("Share project") },
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

export default ProjectCard;

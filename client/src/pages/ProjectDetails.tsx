import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ShareOutlined,
  MoreVert,
} from "@mui/icons-material";
import parse from "html-react-parser";

import ProjectComments from "../components/ProjectComments";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { getProject } from "../app/features/projectSlice";

const ProjectDetails: React.FC = () => {
  const { _id } = useParams() as { _id: string };
  const { project, loading } = useSelector(
    (state: RootState) => state.projects
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProject(_id));
  }, [_id, dispatch]);

  const onDeleteProject = (projectId?: string) => {
    console.log("Delete Project", projectId);
  };
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  console.log("ProjectDetails :: project:", project);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4, px: 2 }}>
      {/* Project Details */}
      <Card variant="outlined">
        <CardContent>
          <CardHeader
            sx={{ mb: 2 }}
            avatar={
              <Avatar sx={{ bgcolor: "secondary.main" }} aria-label="profile">
                {project?.createdBy.firstName.charAt(0)}
              </Avatar>
            }
            action={
              <ProjectActions
                projectId={_id}
                onDeleteProject={onDeleteProject}
              />
            }
            title={`${project?.createdBy.firstName} ${project?.createdBy.lastName}`}
            subheader={
              project?.createdAt
                ? new Date(project.createdAt).toLocaleString("en-us", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : ""
            }
          />
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {project?.title}
          </Typography>
          {project?.imageUrl && (
            <CardMedia
              component="img"
              height="400"
              image={`http://localhost:3001/${project?.imageUrl}`}
              alt="Social media project image"
              sx={{
                aspectRatio: "4 / 5",
                borderRadius: 2,
              }}
            />
          )}
          <Typography component="div" variant="body1" sx={{ mb: 2 }}>
            {parse(project?.description || "")}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={handleLikeToggle}
            color={liked ? "primary" : "default"}
            aria-label="like"
          >
            {liked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
            {likes}
          </Typography>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </CardActions>
      </Card>

      <ProjectComments projectId={_id} />
    </Box>
  );
};

const ProjectActions = ({
  projectId,
  onDeleteProject,
}: {
  projectId: string;
  onDeleteProject: (projectId?: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onEditAction = (projectId: string) => {
    console.log("Edit Project", projectId);
  };

  const actions = [
    {
      name: "Edit",
      action: () => projectId && onEditAction(projectId),
    },
    {
      name: "Delete",
      action: () => projectId && onDeleteProject(projectId),
    },
  ];
  return (
    <>
      <IconButton aria-label="actions" onClick={handleMenuOpen}>
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

export default ProjectDetails;

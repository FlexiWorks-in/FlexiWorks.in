import React, { useEffect } from "react";
import { Box, List, Typography } from "@mui/material";
import ProjectCard from "../components/ProjectCard";

import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../app/features/projectSlice";
import store, { RootState } from "../app/store";

const ProjectPage: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { projects, loading } = useSelector(
    (state: RootState) => state.projects
  );
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(projects);
  return (
    <List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              _id={project._id}
              title={project.title}
              description={project.description}
              imageUrl={
                project.imageUrl
                  ? `http://localhost:3001/${project.imageUrl}`
                  : null
              }
              createdBy={project.createdBy}
              createdAt={new Date(project.createdAt).toLocaleString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            />
          ))
        ) : (
          <Typography variant="h3">No projects available.</Typography>
        )}
      </Box>
    </List>
  );
};

export default ProjectPage;

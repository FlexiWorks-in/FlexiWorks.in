import { useState } from "react";

import { Box, Collapse, Container, Fab } from "@mui/material";
import ProjectsPage from "./ProjectsPage";
import ProjectForm from "../components/ProjectForm";
import AddIcon from "@mui/icons-material/Add";

const HomePage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 2,
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Fab
            variant="extended"
            size="medium"
            onClick={handleToggle}
            sx={{ ml: "auto" }}
          >
            <AddIcon sx={{ mr: 1 }} />
            Post Project
          </Fab>
          <Collapse in={open} unmountOnExit>
            <ProjectForm toggleProjectForm={handleToggle} />
          </Collapse>
        </Box>
        <ProjectsPage />
      </Container>
    </>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  Theme,
} from "@mui/material/styles";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import getAppTheme from "./styles/theme/getAppTheme";
import { CssBaseline, Box, Toolbar } from "@mui/material";
import { Footer, NavBar } from "./components";
import { HomePage, AuthPage, PageNotFoundPage, LandingPage } from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetails from "./pages/ProjectDetails";
import { gray } from "./styles/theme/colors";

const App: React.FC = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const appTheme: Theme = createTheme(getAppTheme(mode));

  useEffect((): void => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark: boolean = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode: "light" | "dark" = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
            },
            (theme:Theme) => ({
              backgroundColor: gray[100],
              ...theme.applyStyles("dark", {
                backgroundColor: gray[900],
              }),
            }),
          ]}
        >
          <CssBaseline enableColorScheme />
          <BrowserRouter>
            <NavBar mode={mode} toggleColorMode={toggleColorMode} />
            <Toolbar variant="dense" disableGutters />
            <Box
              sx={{
                flexGrow: 1,
                overflow: "auto",
                padding: 2,
              }}
            >
              <Routes>
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/landing-page" element={<LandingPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<PageNotFoundPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects/:_id" element={<ProjectDetails />} />
                </Route>
              </Routes>
            </Box>
            <Footer />
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;

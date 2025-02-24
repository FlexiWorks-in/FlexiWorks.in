import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";

import { ContentPanel, RegisterForm, LoginForm } from "../components";
import { RootState } from "../app/store";

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const login = location.pathname === "/login";
  const register = location.pathname === "/register";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  return (
    <Box>
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "space-between",
            height: { xs: "auto", md: "100%" },
          },
          (theme) => ({
            backgroundImage:
              "radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundSize: "cover",
            ...theme.applyStyles("dark", {
              backgroundImage:
                "radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
            }),
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: { xs: 2, sm: 4 },
            m: "auto",
          }}
        >
          <ContentPanel />
          {login && <LoginForm />}
          {register && <RegisterForm />}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthPage;

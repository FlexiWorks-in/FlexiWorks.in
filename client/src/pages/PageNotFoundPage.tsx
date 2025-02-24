import { Stack, Typography, Box } from "@mui/material";

const PageNotFoundPage: React.FC = () => {
  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
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
          <Box
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
              height: "100",
            }}
          >
            <Typography variant="h1"> 404 - Page Not Found </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default PageNotFoundPage;

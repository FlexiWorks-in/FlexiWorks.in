import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  RocketOutlined,
  TerminalOutlined,
  FormatColorFill,
  BoltOutlined
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import hero1 from "../assets/images/hero-1.webp";
import hero2 from "../assets/images/hero-2.webp";
import hero3 from "../assets/images/hero-3.webp";
import hero4 from "../assets/images/hero-4.webp";
import hero5 from "../assets/images/hero-5.webp";
import hero6 from "../assets/images/hero-6.webp";
import hero7 from "../assets/images/hero-7.webp";
import { RootState } from "../app/store";
import { color } from '../global.color';

const heroImages = [
  { src: hero1, alt: "Home hero 1", zIndex: 10 },
  { src: hero2, alt: "Home hero 2", zIndex: 9 },
  { src: hero3, alt: "Home hero 3", zIndex: 3 },
  { src: hero4, alt: "Home hero 4", zIndex: 8 },
  { src: hero5, alt: "Home hero 5", zIndex: 1 },
  { src: hero6, alt: "Home hero 6", zIndex: 7 },
  { src: hero7, alt: "Home hero 7", zIndex: 6 },
];

const services = [
  {
    title: "AI Solutions",
    icon: (
      <RocketOutlined
        style={{ fontSize: "50px", color: color.primaryGreen }}
      />
    ),
    description:
      "Harness the power of artificial intelligence to transform your business. Our cutting-edge AI solutions help automate processes, gain insights, and drive innovation.",
  },
  {
    title: "Web Apps",
    icon: (
      <TerminalOutlined style={{ fontSize: "50px", color: color.primaryGreen }} />
    ),
    description:
      "Custom web applications built with modern technologies. From simple websites to complex enterprise solutions, we deliver scalable and responsive web experiences.",
  },
  {
    title: "Graphics Design",
    icon: (
      <FormatColorFill
        style={{ fontSize: "50px", color: color.primaryGreen }}
      />
    ),
    description:
      "Eye-catching designs that tell your story. Our designers create compelling visuals for brands, marketing materials, and digital platforms.",
  },
  {
    title: "Social Media Marketing",
    icon: (
      <BoltOutlined
        style={{ fontSize: "50px", color: color.primaryGreen }}
      />
    ),
    description:
      "Strategic social media campaigns that connect with your audience. Build your brand presence and engage customers across all major platforms.",
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { from } = location.state as { from: { pathname: string } };

  useEffect(() => {
    if (isAuthenticated) navigate(from ? from.pathname : "/");
  });
  const onGetStarted = () => {
    navigate("/register");
  };
  return (
    <>
      <Container maxWidth="xl" >
        <Box sx={{display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 4,
              flex: 1,
              height: "100vh",
            }}
          >
            <Box>
              <Typography
                component="div"
                variant="h2"
                gutterBottom
                fontSize={24}
              >
                Connect with Top Digital Talent
              </Typography>
              <Typography variant="body1" gutterBottom>
                FlexiWorks brings together clients and skilled
                professionals in AI, web development, design, and digital
                marketing. Transform your ideas into reality with our
                expert network.              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" gutterBottom>
                  We are excited to have you on board!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flex: 1,
              p: 4,
            }}
          >
            {heroImages.map((image, index) => (
              <Box
                key={index}
                component="img"
                alt="Home hero"
                src={image.src}
                sx={{
                  position: "absolute",
                  opacity: 1,
                  transform: "none",
                  willChange: "auto",
                  width: "100%",
                  zIndex: image.zIndex,
                  height: "auto"
                }}
              />
            ))}
          </Box>
        </Box>
        {/* Features Section */}
        <Box sx={{ py: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid key={index} sx={{ sm: 2, md: 2, sx: 12 }} size={3}>
                  <Card sx={{ textAlign: "center", py: 4, height: "100%" }}>
                    {service.icon}
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "#000142" }}
                      >
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

      </Container>
    </>
  );
};

export default LandingPage;

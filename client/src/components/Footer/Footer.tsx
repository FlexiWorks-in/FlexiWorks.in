import React from 'react';
import { Box,  Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Theme } from '@mui/material/styles';
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <>
      <Box
        component="footer"
        sx={[
          {
          p: 4,
        },
          (theme: Theme) => ({
            backgroundColor: theme.palette.background.paper,
          })
        ]}
      >
        <Grid container spacing={2}>
          <Grid sx={{ sm: 2, md: 2, sx: 12 }} size={3}>
            <Typography variant="h4" gutterBottom component="div">
              FlexiWorks
            </Typography>
            <Typography className="text-gray-400">
              Connecting talent with opportunity
            </Typography>
          </Grid>
          <Grid sx={{ sm: 2, md: 2, sx: 12 }} size={3}>
            <Typography variant="h4" className="text-white">
              Services
            </Typography>
            <ul className="Footer-list">
              <li className="list-item">AI Solutions</li>
              <li className="list-item">Web Apps</li>
              <li className="list-item">Graphics Design</li>
              <li className="list-item">Social Media Marketing</li>
            </ul>
          </Grid>
          <Grid sx={{ sm: 2, md: 2, sx: 12 }} size={3}>
            <Typography variant="h4" className="text-white">
              Company
            </Typography>
            <ul className="list-none p-0">
              <li className="text-gray-400 mb-2">About Us</li>
              <li className="text-gray-400 mb-2">Careers</li>
              <li className="text-gray-400 mb-2">Blog</li>
              <li className="text-gray-400 mb-2">Contact</li>
            </ul>
          </Grid>
          <Grid sx={{ sm: 2, md: 2, sx: 12 }} size={3}>
            <Typography variant="h4" className="text-white">
              Connect
            </Typography>
            <ul className="list-none p-0">
              <li className="text-gray-400 mb-2">Twitter</li>
              <li className="text-gray-400 mb-2">LinkedIn</li>
              <li className="text-gray-400 mb-2">Instagram</li>
              <li className="text-gray-400 mb-2">Facebook</li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  Grid2 as Grid,
} from '@mui/material';
import { Link, NavLink } from 'react-router';

import IconFacebook from 'src/assets/images/frontend-pages/icons/icon-facebook.svg';
import IconTwitter from 'src/assets/images/frontend-pages/icons/icon-twitter.svg';
import IconInstagram from 'src/assets/images/frontend-pages/icons/icon-instagram.svg';
import LogoIcon from 'src/assets/images/logos/logoIcon.svg';

const footerLinks = [
  {
    id: 1,
    children: [
      {
        title: true,
        titleText: 'Company Info',
      },
      {
        title: false,
        titleText:
          'We provide reliable household services including cleaning, plumbing, electrical, and more — trusted by 10,000+ households.',
        link: '#',
      },
    ],
  },
  {
    id: 2,
    children: [
      { title: true, titleText: 'Quick Links' },
      { title: false, titleText: 'Home', link: '#' },
      { title: false, titleText: 'Services', link: '#' },
      { title: false, titleText: 'Blog', link: '#' },
      { title: false, titleText: 'Invoice', link: '#' },
      { title: false, titleText: 'FAQ', link: '#' },
    ],
  },
  {
    id: 3,
    children: [
      { title: true, titleText: 'Policy Links' },
      { title: false, titleText: 'Privacy Policy', link: '#' },
      { title: false, titleText: 'Terms & Conditions', link: '#' },
      { title: false, titleText: 'Cancellation & Refund Policy', link: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : 'linear-gradient(180deg, #f9f9fb 0%, #ffffff 100%)',
        color: 'text.secondary',
        mt: 8,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 6, md: 10 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Grid container spacing={5} justifyContent="space-between" mb={6}>
          {footerLinks.map((section) => (
            <Grid
              key={section.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              {section.children.map((child, i) =>
                child.title ? (
                  <Typography
                    key={i}
                    fontSize="18px"
                    fontWeight="700"
                    mb="20px"
                    color="text.primary"
                  >
                    {child.titleText}
                  </Typography>
                ) : (
                  <Typography
                    key={i}
                    component={Link}
                    to={child.link}
                    sx={{
                      display: 'block',
                      fontSize: '15px',
                      lineHeight: 1.8,
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: 'primary.main',
                        pl: 0.5,
                      },
                    }}
                  >
                    {child.titleText}
                  </Typography>
                )
              )}
            </Grid>
          ))}

          {/* Social Icons */}
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Typography
              fontSize="18px"
              fontWeight="700"
              mb="20px"
              color="text.primary"
            >
              Follow Us
            </Typography>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {[
                { icon: IconFacebook, label: 'Facebook' },
                { icon: IconTwitter, label: 'Twitter' },
                { icon: IconInstagram, label: 'Instagram' },
              ].map((social, idx) => (
                <Tooltip title={social.label} key={idx}>
                  <IconButton
                    component={NavLink}
                    to="#"
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        '& img': { filter: 'invert(1)' },
                      },
                    }}
                  >
                    <img src={social.icon} alt={social.label} width={20} height={20} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Bottom Bar */}
      {/*   <Box
          py={2}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Stack direction="row" gap={1.5} alignItems="center">
            <img src={LogoIcon} width={24} height={24} alt="logo" />
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Fixidi. All rights reserved.
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Produced by{' '}
            <Typography
              component={Link}
              to="https://adminmart.com/"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              AdminMart
            </Typography>
            .
          </Typography>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Footer;

import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  Container,
  Grid2 as Grid,
  useTheme,
  Autocomplete,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

// icons
import icon1 from 'src/assets/images/FixidiIcons/hammer-solid.svg';
import icon2 from 'src/assets/images/FixidiIcons/tv-solid.svg';
import icon3 from 'src/assets/images/FixidiIcons/screwdriver-wrench-solid.svg';
import icon4 from 'src/assets/images/FixidiIcons/cleaning-svgrepo-com.svg';
import icon5 from 'src/assets/images/FixidiIcons/truck-solid.svg';
import icon6 from 'src/assets/images/FixidiIcons/dots-vertical-svgrepo-com.svg';

import icon7 from 'src/assets/images/FixidiIcons/hanging-rectangular-frame-svgrepo-com.svg';
import icon8 from 'src/assets/images/FixidiIcons/light-bulb-svgrepo-com.svg';
import icon9 from 'src/assets/images/FixidiIcons/smoke-detector-svgrepo-com.svg';

import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';

import houseServices from '../forms/form-elements/autoComplete/data';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import HpHeader from '../frontend-pages/shared/header/HpHeader';
import Footer from '../landingpage/footer/Footer';
import ScrollToTop from '../frontend-pages/shared/scroll-to-top';
import { useNavigate } from 'react-router';
/* import BannerTopLeft from 'src/assets/images/frontend-pages/homepage/banner-top-left.svg'; */
import BannerBottomPart from 'src/assets/images/frontend-pages/homepage/bottom-part.svg';
/* import BannerTopRight from 'src/assets/images/frontend-pages/homepage/banner-top-right.svg'; */
import { useMediaQuery } from '@mui/system';
import { Reviews } from '@mui/icons-material';
import DefendFocus from '../frontend-pages/homepage/defend-focus';
import ExceptionalFeature from '../frontend-pages/homepage/exceptional-feature';
import FAQ from '../frontend-pages/homepage/faq';
import PowerfulDozens from '../frontend-pages/homepage/powerful-dozens';
import C2a from '../frontend-pages/shared/c2a';
import Leadership from '../frontend-pages/shared/leadership';
import Pricing from '../frontend-pages/shared/pricing';
import Features from '../landingpage/features/Features';

const Frameworks = [
  {
    name: 'General handyman',
    id: 1,
    icon: icon1,
  },
  {
    name: 'TV Mounting',
    id: 2,
    icon: icon2,
  },
  {
    name: 'Furniture assembly',
    id: 3,
    icon: icon3,
  },
  {
    name: 'House Cleaning',
    id: 4,
    icon: icon4,
  },
  {
    name: 'Furniture moving',
    id: 5,
    icon: icon5,
  },
  {
    name: 'Hanging',
    id: 6,
    icon: icon7,
  },
  {
    name: 'Light fixtures',
    id: 7,
    icon: icon8,
  },

  {
    name: 'Smoke detectors',
    id: 12,
    icon: icon9,
  },

  {
    name: 'More',
    id: 999,
    icon: icon6,
  },
];
const FixidiLandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [, setSelectedService] = useState<string | null>(null);
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const handleButtonClick = (fwName: string, userType: 'client' | 'professional') => {
    if (fwName === 'More') {
      navigate('/all-services');
      return;
    }

    const dataToSend = {
      username: 'JohnDoe',
      userType: userType,
      serviceType: fwName,
      frameworkId: Frameworks.find((fw) => fw.name === fwName)?.id,
      houseServiceId: houseServices.find((fw) => fw.title === fwName)?.id,
    };

    navigate('/user-registration', { state: dataToSend });
  };
  return (
    <>
      <HpHeader
        showProfessionalButton={true}
        onProfessionalClick={() =>
          navigate('/user-registration', {
            state: {
              username: 'JohnDoe',
              userType: 'professional',
              serviceType: '',
            },
          })
        }
      />
      <Box bgcolor="primary.light" pt={7}>
        <Container
          sx={{
            maxWidth: '1400px !important',
            position: 'relative',
          }}
        >
          <Grid container spacing={3} justifyContent="center" mb={4}>
         
            <Grid
              textAlign="center"
              size={{
                xs: 12,
                lg: 7,
              }}
            >
              <Typography
                variant="h1"
                fontWeight={700}
                lineHeight="1.2"
                sx={{
                  fontSize: {
                    xs: '40px',
                    sm: '56px',
                  },
                  mb: 5,
                }}
              >
                Most powerful &{' '}
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: '40px',
                      sm: '56px',
                    },
                  }}
                  fontWeight={700}
                  component="span"
                  color="primary.main"
                >
                  developer friendly
                </Typography>{' '}
                dashboard
              </Typography>

              <Stack>
                {/* <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                  options={houseServices.map((option) => option.title)}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Tell us what you’re looking for."
                      aria-label="FreeSolo"
                    />
                  )}
                /> */}
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  fullWidth
                  sx={{ mb: 2 }}
                  options={houseServices.map((option) => option.title)}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setSelectedService(newValue); // ✅ Correct
                      handleButtonClick(newValue, 'client');
                    }
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Tell us what you’re looking for."
                      aria-label="FreeSolo"
                    />
                  )}
                />
              </Stack>

              <Stack
                direction="row"
                sx={{ flexWrap: 'wrap' }}
                alignItems="center"
                spacing={3}
                mb={8}
                justifyContent="center"
              >
                {Frameworks.map((fw, i) => (
                  <Tooltip title={fw.name} key={i}>
                    <Box
                      width="54px"
                      height="54px"
                      display="flex"
                      sx={{
                        boxShadow: theme.palette.mode === 'dark' ? null : theme.shadows[10],
                        backgroundColor: theme.palette.mode === 'dark' ? '#1f2c4f' : '#D7E2FF',
                        borderRadius: '50%',

                        cursor: 'pointer',
                      }}
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="16px"
                      onClick={() => handleButtonClick(fw.name, 'client')}
                    >
                      <img
                        src={fw.icon}
                        alt={fw.icon}
                        width={26}
                        height={26}
                        style={{ fill: '#4570EA' }}
                      />
                    </Box>
                  </Tooltip>
                ))}
              </Stack>
              <Stack
                my={3}
                direction={{ xs: 'column', sm: 'row' }}
                spacing="20px"
                alignItems="center"
                justifyContent="center"
              >
                <AvatarGroup>
                  <Avatar alt="Remy Sharp" src={user1} sx={{ width: 40, height: 40 }} />
                  <Avatar alt="Travis Howard" src={user2} sx={{ width: 40, height: 40 }} />
                  <Avatar alt="Cindy Baker" src={user3} sx={{ width: 40, height: 40 }} />
                </AvatarGroup>
                <Typography variant="h6" fontWeight={500}>
                  Trusted by 52,589+ users and agencies worldwide
                </Typography>
              </Stack>
            </Grid>
         
          </Grid>
          {lgUp ? (
            <img
              src={BannerBottomPart}
              alt="banner"
              width={500}
              height={300}
              style={{
                width: '100%',
                marginBottom: '-11px',
              }}
            />
          ) : null}
        </Container>
      </Box>
      <Features />
      <DefendFocus />
      <Leadership />
      <PowerfulDozens />
      <Reviews />
      <ExceptionalFeature />
      <Pricing />
      <FAQ />
      <C2a />
      <Footer />
      <ScrollToTop />
    </>
  );
};
export default FixidiLandingPage;

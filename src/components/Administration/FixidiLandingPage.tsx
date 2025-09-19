import { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  /*  AvatarGroup,
  Avatar, */
  Container,
  Grid2 as Grid,
  useTheme,
  Autocomplete,
} from '@mui/material';
import AnimationFadeIn from '../landingpage/animation/Animation';
// icons
import icon1 from 'src/assets/images/FixidiIcons/generalHandyman.svg';
import icon2 from 'src/assets/images/FixidiIcons/tvMounting.svg';
import icon3 from 'src/assets/images/FixidiIcons/furnitureAssembly.svg';
import icon4 from 'src/assets/images/FixidiIcons/houseCleaning.svg';
import icon5 from 'src/assets/images/FixidiIcons/hanging.svg';
import icon6 from 'src/assets/images/FixidiIcons/furnitureMoving.svg';

import icon7 from 'src/assets/images/FixidiIcons/hauling.svg';
import icon8 from 'src/assets/images/FixidiIcons/lightfix.svg';
import icon9 from 'src/assets/images/FixidiIcons/smokeDetector.svg';
import icon10 from 'src/assets/images/FixidiIcons/gutterCleaning.svg';
import icon11 from 'src/assets/images/FixidiIcons/gardening-machinery-svgrepo-com.svg';
import icon12 from 'src/assets/images/FixidiIcons/lights.svg';
/* import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg'; */

import houseServices from '../forms/form-elements/autoComplete/data';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import HpHeader from '../frontend-pages/shared/header/HpHeader';

import Footer from 'src/components/frontend-pages/shared/footer';
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
import Features from 'src/components/frontend-pages/homepage/features/Features';

import FeaturesTitle from '../landingpage/features/FeaturesTitle';
import TabWorkflows from '../frontend-pages/homepage/defend-focus/TabWorkflows';
import HowItWorks from './howItWorks';
import MobileAppSection from './MobileAppSection';
import HowItWorksContainer from './HowItWorksContainer';

const Frameworks = [
  {
    name: 'Handyman',
    id: 1,
    icon: icon1,
    subtext: 'Reliable solutions for all household fixes, big or small.',
  },
  {
    name: 'TV Mounting',
    id: 2,
    icon: icon2,
    subtext: 'Secure, stylish TV mounting with the perfect viewing angle.',
  },
  {
    name: 'Assembly',
    id: 3,
    icon: icon3,
    subtext: 'Fast, precise furniture and equipment assembly, hassle-free.',
  },
  {
    name: 'Cleaning',
    id: 4,
    icon: icon4,
    subtext: 'Spotless, stress-free cleaning for homes and offices.',
  },
  {
    name: 'Hauling',
    id: 5,
    icon: icon7,
    subtext: 'Quick, eco-friendly junk and debris removal made easy.',
  },
  {
    name: 'Hanging',
    id: 6,
    icon: icon5,
    subtext: 'Professional hanging for frames, mirrors, curtains, and more.',
  },
  {
    name: 'Lighting',
    id: 7,
    icon: icon8,
    subtext: 'Safe, stylish lighting installations to brighten your space.',
  },
  {
    name: 'Moving',
    id: 8,
    icon: icon6,
    subtext: 'Stress-free moving with careful packing and reliable transport.',
  },
  {
    name: 'Detectors',
    id: 12,
    icon: icon9,
    subtext: 'Trusted gutter cleaning, repair, and installation services.',
  },

  {
    name: 'Gutterworks',
    id: 9,
    icon: icon10,
    subtext: 'Creative decorating that adds style and personality to any space.',
  },
  {
    name: 'Landscaping',
    id: 11,
    icon: icon11,
    subtext: 'Beautiful, affordable landscaping for lawns and gardens.',
  },
  {
    name: 'Decorating',
    id: 10,
    icon: icon12,
    subtext: 'Expert smoke & CO detector installation for peace of mind.',
  },
  /////////////
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
      <Box bgcolor="primary.light" pt={7} py={6}>
        {/* <Container
          sx={{
            maxWidth: '1400px !important',
            position: 'relative',
          }}
        > */}<Container maxWidth="lg">
          <FeaturesTitle />
          <Grid container spacing={3} justifyContent="center" mb={4}>
            <Grid
              textAlign="center"
              size={{
                xs: 12,
                md: 10,
                lg: 7,
              }}
            >
              <Stack>
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
            </Grid>
          </Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid
              textAlign="center"
              size={{
                xs: 12,
                lg: 12,
              }}
            >
              <AnimationFadeIn>
                <>
                   <Grid container spacing={3} justifyContent="center">
                    {Frameworks.slice(0, 12).map((fw, index) => (
                      <Grid
                        textAlign="center"
                        key={index}
                        size={{
                          xs: 12,
                          sm: 4,
                          lg: 2,
                        }}
                        width="200px"
                        height="200px"
                        display="flex"
                        sx={{
    cursor: 'pointer',
    borderRadius: '16px',
    border: '1px solid transparent', // default transparent border to prevent layout shift
    transition: 'all 0.3s ease',     // smooth transition
    '&:hover': {
      border: '1px solid #1976d2',   // MUI primary blue (or any color you like)
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // optional shadow on hover
    },
  }}
                        spacing={3}
                        alignItems="center"
                        justifyContent="space-around"
                        flexDirection="column"
                        borderRadius="16px"
                        onClick={() => handleButtonClick(fw.name, 'client')}
                      >
                        <img
                          src={fw.icon}
                          alt={fw.icon}
                          width={50}
                          height={70}
                          style={{ fill: '#8A8D8C', padding:"5px" }}
                        />
                        {/*    <b>{fw.name}</b> */}
                        <Typography variant="h5" mt={3}>
                          {fw.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" mt={1} mb={3}>
                          {fw.subtext}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>

                  {/*  <Stack direction="row" flexWrap="wrap" justifyContent="center" mb={2}>
                  {Frameworks.slice(6, 12).map((fw) => (
                    <Box
                      width="120px"
                      height="100px"
                      display="flex"
                      sx={{
                        cursor: 'pointer',
                      }}
                      alignItems="center"
                      justifyContent="space-around"
                      flexDirection="column"
                      borderRadius="16px"
                      onClick={() => handleButtonClick(fw.name, 'client')}
                    >
                      <img
                        src={fw.icon}
                        alt={fw.icon}
                        width={50}
                        height={70}
                        style={{ fill: '#4570EA' }}
                      />
                      <b>{fw.name}</b>
                    </Box>
                  ))}
                </Stack> */}
                </>
              </AnimationFadeIn>
            </Grid>
          </Grid>
        </Container>
      </Box>
     {/*  <DefendFocus />
      <Leadership />
      <PowerfulDozens />
      <Reviews />
      <ExceptionalFeature />
      <Pricing />
      <FAQ />
      <C2a />
      <Features /> */}
{/*       <Box>
<Grid container spacing={3} justifyContent="center">

      <Leadership/>
      <Leadership/>
</Grid>
      </Box> */}
      <HowItWorksContainer/>
    {/*   <Leadership/> */}
      <MobileAppSection/>
      <Footer />
      <ScrollToTop />
    </>
  );
};
export default FixidiLandingPage;

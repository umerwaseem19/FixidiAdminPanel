
import { Box, CardContent, Container, Grid2 as Grid, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import HpHeader from '../frontend-pages/shared/header/HpHeader';

import icon1 from 'src/assets/images/FixidiIcons/hammer-solid.svg';
import icon2 from 'src/assets/images/FixidiIcons/tv-solid.svg';
import icon3 from 'src/assets/images/FixidiIcons/screwdriver-wrench-solid.svg';
import icon4 from 'src/assets/images/FixidiIcons/cleaning-svgrepo-com.svg';
import icon5 from 'src/assets/images/FixidiIcons/truck-solid.svg';
import icon6 from 'src/assets/images/FixidiIcons/dump-truck-svgrepo-com.svg';

import icon7 from 'src/assets/images/FixidiIcons/hanging-rectangular-frame-svgrepo-com.svg';
import icon8 from 'src/assets/images/FixidiIcons/light-bulb-svgrepo-com.svg';
import icon9 from 'src/assets/images/FixidiIcons/smoke-detector-svgrepo-com.svg';
import icon10 from 'src/assets/images/FixidiIcons/toilet-svgrepo-com.svg';
import icon11 from 'src/assets/images/FixidiIcons/gardening-machinery-svgrepo-com (1).svg';
import icon12 from 'src/assets/images/FixidiIcons/lights-holiday-svgrepo-com.svg';
interface cardType {
  icon: string;
  name: string;
  digits: string;
  bgcolor: string;
}

const topcards: cardType[] = [
  {
    icon: icon1,
    name: 'General Handyman',
    digits: '59',
    bgcolor: 'info',
  },
  {
    icon: icon2,
    name: 'TV Mounting',
    digits: '96',
    bgcolor: 'success',
  },
  {
    icon: icon3,
    name: 'Furniture Assembly',
    digits: '3,650',
    bgcolor: 'warning',
  },
  {
    icon: icon4,
    name: 'House Cleaning',
    digits: '356',
    bgcolor: 'secondary',
  },
  {
    icon: icon5,
    name: 'Furniture Moving',
    digits: '696',
    bgcolor: 'warning',
  },
  {
    icon: icon6,
    name: 'Hauling',
    digits: '696',
    bgcolor: 'error',
  },
  {
    icon: icon7,
    name: 'Hanging',
    digits: '$96k',
    bgcolor: 'success',
  },
  {
    name: 'Light fixtures',
    icon: icon8,
    digits: '696',
    bgcolor: 'error',
  },



  {
    icon: icon10,
    name: 'Gutter Cleaning',
    digits: '$96k',
    bgcolor: 'error',
  },
  {
    icon: icon11,
    name: 'Landscaping',
    digits: '$96k',
    bgcolor: 'success',
  },
  {
    icon: icon12,
    name: 'Holiday Lights',
    digits: '$96k',
    bgcolor: 'error',
  },
    {
    name: 'Smoke Detectors',
    icon: icon9,
    digits: '3,650',
    bgcolor: 'warning',
  },
];
function AllServices() {
  const navigate = useNavigate();

  const handleButtonClick = (fwName: string) => {
    if (fwName === 'More') {
      // Redirect to a different route (e.g., /all-services)
      navigate('/all-services');
      return;
    }
    const dataToSend = {
      username: 'JohnDoe',
      userType: 'client',
      serviceType: fwName,
    };

    // Navigate to UserRegistration and pass state
    navigate('/user-registration', { state: dataToSend });
  };
  return (
    <>
          <HpHeader />
    
      <Box pt={7}>
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
                Explore our full range of{' '}
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
                  Home Service
                </Typography>{' '}
                solutions
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {topcards.map((topcard, i) => (
              <Tooltip title={topcard.name} key={i}>
                <Grid
                  key={i}
                  size={{
                    xs: 12,
                    sm: 4,
                    lg: 2,
                  }}
                >
                  <Box
                    bgcolor={topcard.bgcolor + '.light'}
                    textAlign="center"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleButtonClick(topcard.name)}
                  >
                    <CardContent>
                      <img src={topcard.icon} alt={topcard.icon} width="50" height="50" />
                      <Typography
                        color={topcard.bgcolor + '.main'}
                        mt={1}
                        variant="subtitle1"
                        fontWeight={600}
                      >
                        {topcard.name}
                      </Typography>
                      <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                        {/*  {topcard.digits} */}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              </Tooltip>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default AllServices;

import {
  Box,
  Typography,
  Grid2 as Grid,
  Button,
  CardContent,
  Chip,
  Divider,
  Stack,
  Avatar,
  Container,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import customer1 from 'src/assets/images/FixidiImages/customer1.png';
import customer2 from 'src/assets/images/FixidiImages/customer2.png';
import customer3 from 'src/assets/images/FixidiImages/customer3.png';
import customer4 from 'src/assets/images/FixidiImages/customer4.png';

import professional1 from 'src/assets/images/FixidiImages/professional1.png';
import professional2 from 'src/assets/images/FixidiImages/professional2.png';
import professional3 from 'src/assets/images/FixidiImages/professional3.png';
import professional4 from 'src/assets/images/FixidiImages/professional4.png';
import BlankCard from '../shared/BlankCard';

//import BlankCard from '../../../shared/BlankCard';
import howitworks from './howitworkspicture.jpg';
import IconCheck from 'src/assets/images/frontend-pages/icons/icon-check.svg';
import IconClose from 'src/assets/images/frontend-pages/icons/icon-close.svg';

const Licenses = [
    {
      id: 1,
      type: 'Customer',
      isPopular: false,
      typeText: 'Use for single end product which end users can’t be charged for.',
      price: '49',
      fullSourceCode: true,
      isDoc: true,
      isSass: false,
      isSingleProject: true,
      isSupport: true,
      isUpdate: true,
      step1: 'Find Your Helper',
      step2: 'Book Instantly',
      step3: 'Get It Done',
      step4: 'Pay & Review Easily',
      step1Desc: 'Browse trusted professionals by price, skills, and ratings.',
      step2Desc: 'Schedule your service at a convenient time—even the same day.',
      step3Desc:
        'Choose a Tasker by price, skills, and reviews',
      step4Desc: 'Secure payments, tips, and reviews—all managed in one place.',
    },
    
  
  ];
const Licenses2 = [
  {
      id: 2,
      type: 'Professional',
      isPopular: false,
      typeText: 'Use for unlimited end products end users can’t be charged for.',
      price: '89',
      fullSourceCode: true,
      isDoc: true,
      isSass: false,
      isSingleProject: false,
      isSupport: true,
      isUpdate: true,
      step1: 'Sign Up & Create Profile',
      step2: 'Receive Job Requests',
      step3: 'Deliver Quality Service',
      step4: 'Get Paid Securely',
      step1Desc: 'Join the platform, showcase your skills, and set your availability.',
      step2Desc: 'Get matched with nearby customers who need your services.',
      step3Desc: 'Complete tasks on time and build your reputation with positive reviews.',
      step4Desc: 'Payments are transferred directly to your account, hassle-free.',
    },
]

function HowItWorks() {
  const theme = useTheme();


  return (
  <>
    <Container
      sx={{
        maxWidth: '1400px !important',
        py: { xs: '20px', lg: '30px' },
      }}
    >
      <Box position="relative">
        {/* Background Image */}
        <Box
          borderRadius="24px"
          overflow="hidden"
          sx={{
            py: { xs: '40px', lg: '70px' },
            backgroundImage: `url(${howitworks})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: { xs: 300, sm: 400, lg: 500 },
          }}
        />

        {/* Overlay Grids */}
       <Grid
  container
  spacing={3}
  sx={{
    position: {
      xs: 'static',   // mobile: normal flow
      md: 'absolute', // desktop: overlay
    },
    top: { md: '50%' },
    left: { md: 0 },
    width: '100%',
    transform: {
      xs: 'none',       // no vertical shift on mobile
      md: 'translateY(-50%)', // center vertically on desktop
    },
    px: { xs: 2, md: 4 },
    mt: { xs: 2, sm: 3 }, // some margin below image for mobile
  }}
>
  {Licenses.map((license, i) => (
    <Grid
      key={i}
      item
      xs={12}
      md={6}
      sx={{
        display: 'flex',
        justifyContent: i === 0 ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          transform: {
            xs: 'none', // inside on mobile
            md: i === 0 ? 'translateX(-50%)' : 'translateX(50%)', // half out on desktop
          },
        }}
      >
        <BlankCard>
          <CardContent sx={{ p: '32px' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h4" fontSize="30px" fontWeight={600}>
                {license.type}
              </Typography>
            </Box>
            <Divider />
            <Stack my={4} gap="12px">
              {[license.step1, license.step2, license.step3, license.step4].map(
                (step, idx) => (
                  <Box key={idx} display="flex" alignItems="center" gap="8px">
                    <Avatar
                      sx={{
                        width: 9,
                        height: 9,
                        bgcolor: theme.palette.primary.main,
                        svg: { display: 'none' },
                      }}
                    />
                    <Typography fontSize="19px" fontWeight={600}>
                      {step}
                    </Typography>
                  </Box>
                )
              )}
            </Stack>
          </CardContent>
        </BlankCard>
      </Box>
    </Grid>
  ))}
</Grid>

   <Grid
  container
  spacing={3}
  sx={{
    position: {
      xs: 'static',   // mobile: normal flow
      md: 'absolute', // desktop: overlay
    },
    top: { md: '50%' },
    left: { md: 0 },
    width: '100%',
    transform: {
      xs: 'none',       // no vertical shift on mobile
      md: 'translateY(-50%)', // center vertically on desktop
    },
    px: { xs: 2, md: 4 },
    mt: { xs: 2, sm: 3 }, // some margin below image for mobile
  }}
>
  {Licenses2.map((license, i) => (
  <Grid
    key={i}
    item
    xs={12}
    md={6}
    sx={{
      display: 'flex',
      justifyContent: 'flex-start', // 👈 push card to right side
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        transform: {
          xs: 'none',              // mobile: inside
          md: 'translateX(50%)',   // desktop: half outside to right
        },
      }}
    >
      <BlankCard>
        <CardContent sx={{ p: '32px' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h4" fontSize="30px" fontWeight={600}>
              {license.type}
            </Typography>
          </Box>
          <Divider />
          <Stack my={4} gap="12px">
            {[license.step1, license.step2, license.step3, license.step4].map(
              (step, idx) => (
                <Box key={idx} display="flex" alignItems="center" gap="8px">
                  <Avatar
                    sx={{
                      width: 9,
                      height: 9,
                      bgcolor: theme.palette.primary.main,
                      svg: { display: 'none' },
                    }}
                  />
                  <Typography fontSize="19px" fontWeight={600}>
                    {step}
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  </Grid>
))}

</Grid>

      </Box>
    </Container>
  </>
);

}

export default HowItWorks;

import { Box, Container, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import DesignCol from 'src/assets/images/FixidiImages/Gemini_Generated_Image_lzfrozlzfrozlzfre.png';
import   LogoLight from './Fixidi SVG.svg';
function MobileAppSection() {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.only('sm'));

  return (
    <Container
      sx={{
        maxWidth: '1400px !important',
        py: { xs: '20px', lg: '30px' },
      }}
    >
      <Grid
                  size={{
                    xs: 12,
                    lg: 7
                  }}>
                  <Typography
                    textAlign="center"
                    variant="h4"
                    lineHeight={1.4}
                    mb={6}
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        lg: '40px',
                        xs: '35px',
                      },
                    }}
                  >
                    Join now
                  </Typography>
                </Grid>
      <Box
        borderRadius="24px"
        overflow="hidden"
        sx={{
          py: { xs: '40px', lg: '70px' },
          backgroundImage: `url(${LogoLight})`,
          backgroundSize: 'cover',   // makes image fill area
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: { xs: 300, sm: 400, lg: 500 }, // adjust height as needed
        }}
      >
        {/* Content goes here */}
      </Box>
    </Container>
  );
}

export default MobileAppSection;

import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import DesignCol from 'src/assets/images/FixidiImages/Gemini_Generated_Image_lzfrozlzfrozlzfre.png';
import   LogoLight from './fixidilogo.png';
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

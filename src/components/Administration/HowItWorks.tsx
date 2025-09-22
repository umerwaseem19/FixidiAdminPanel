import {
  Box,
  Typography,
  CardContent,
  Divider,
  Stack,
  Avatar,
  Container,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import BlankCard from '../shared/BlankCard';

// Background images
import howitworks from './howitworkspicture.jpg';
import professionalBg from './howitworks2.jpg';

const howItworksClient = [
  {
    id: 1,
    type: 'Customer',
    steps: [
      'Find Your Helper',
      'Book Instantly',
      'Get It Done',
      'Pay & Review Easily',
    ],
  },
];

const howItworksProfessional = [
  {
    id: 2,
    type: 'Professional',
    steps: [
      'Sign Up & Create Profile',
      'Receive Job Requests',
      'Deliver Quality Service',
      'Get Paid Securely',
    ],
  },
];

function HowItWorks() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        maxWidth: '1400px !important',
        py: { xs: 6, md: 2 },
        textAlign: 'center',
        overflowX: 'hidden', 
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h3"
        fontWeight={700}
        mb={{ xs: 6, md: 10 }}
        fontSize={{ xs: '26px', md: '36px' }}
        color="text.primary"
      >
        How It Works
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 10, md: 2 }}
      >
        {/* LEFT SIDE (Customer) */}
        <Box
          position="relative"
          flex={1}
          sx={{ mx: { xs: 0, md: 2 } }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Image */}
          <Box
            borderRadius="24px"
            overflow="hidden"
            sx={{
              height: { xs: 300, sm: 360, md: 420, lg: 460 },
              backgroundImage: `url(${howitworks})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          />

          {/* Card */}
          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { xs: 'auto', md: '50%' },
              left: { xs: 'auto', md: '-12%' },
              transform: { xs: 'none', md: 'translateY(-50%)' },
              width: { xs: '95%', sm: '85%', md: 300, lg: 340 },
              mx: { xs: 'auto', md: 0 },
              mt: { xs: -6, md: 0 },
              zIndex: 2,
            }}
          >
            <BlankCard
              sx={{
                borderRadius: '20px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                background: `linear-gradient(145deg, ${theme.palette.background.paper}, #f9f9f9)`,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mb={2}
                  color={theme.palette.primary.main}
                >
                  {howItworksClient[0].type}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack gap="16px">
                  {howItworksClient[0].steps.map((step, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      alignItems="center"
                      gap="12px"
                      justifyContent={{ xs: 'center', md: 'flex-start' }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: theme.palette.primary.main,
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {idx + 1}
                      </Avatar>
                      <Typography fontSize="15px" fontWeight={600}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </BlankCard>
          </Box>
        </Box>

        {/* RIGHT SIDE (Professional) */}
        <Box
          position="relative"
          flex={1}
          sx={{ mx: { xs: 0, md: 2 } }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Image */}
          <Box
            borderRadius="24px"
            overflow="hidden"
            sx={{
              height: { xs: 300, sm: 360, md: 420, lg: 460 },
              backgroundImage: `url(${professionalBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          />

          {/* Card */}
          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { xs: 'auto', md: '50%' },
              right: { xs: 'auto', md: '-12%' },
              transform: { xs: 'none', md: 'translateY(-50%)' },
              width: { xs: '95%', sm: '85%', md: 300, lg: 340 },
              mx: { xs: 'auto', md: 0 },
              mt: { xs: -6, md: 0 },
              zIndex: 2,
            }}
          >
            <BlankCard
              sx={{
                borderRadius: '20px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                background: `linear-gradient(145deg, ${theme.palette.background.paper}, #f9f9f9)`,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  mb={2}
                  color={theme.palette.secondary.main}
                >
                  {howItworksProfessional[0].type}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack gap="16px">
                  {howItworksProfessional[0].steps.map((step, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      alignItems="center"
                      gap="12px"
                      justifyContent={{ xs: 'center', md: 'flex-start' }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: theme.palette.secondary.main,
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {idx + 1}
                      </Avatar>
                      <Typography fontSize="15px" fontWeight={600}>
                        {step}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </BlankCard>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default HowItWorks;

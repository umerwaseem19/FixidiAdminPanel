import { Typography } from '@mui/material';
import { Box, Container, Grid } from '@mui/system';
import React from 'react'

import HowItWorks from './howItWorks';

function HowItWorksContainer() {

      return (<>
    <Box
      sx={{
        py: {
          xs: 5,
          lg: 11,
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
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
              How it works
            </Typography>
          </Grid>
        </Grid>

        <HowItWorks />

        {/* <PaymentMethods /> */}
      </Container>
    </Box>
  </>);
  
}

export default HowItWorksContainer
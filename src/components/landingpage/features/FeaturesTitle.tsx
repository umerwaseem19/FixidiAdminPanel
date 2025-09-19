// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';


const FeaturesTitle = () => {

    return (
        (<Grid container spacing={3} justifyContent="center">
            <Grid
                size={{
                    xs: 12,
                    sm: 10,
                    lg: 8
                }}>
                {/* <Typography fontSize="16" textTransform="uppercase" color="primary.main" fontWeight={500} textAlign="center" mb={1}>ALMOST COVERED EVERYTHING</Typography>
                 */}<Typography variant='h1' fontWeight={700} textAlign="center" sx={{
                    fontSize: {
                        lg: '36px',
                        xs: '25px'
                    },
                    mb: 4,
                    lineHeight: {
                        lg: '43px',
                        xs: '30px'
                    }
                }}>Fixing lives with <Typography
                  variant="h1"
                  
                  component="span"
                  color="primary.main"
                >
                  neighbourly care
                </Typography>{' '}</Typography>
            </Grid>
        </Grid>)
    );
};

export default FeaturesTitle;

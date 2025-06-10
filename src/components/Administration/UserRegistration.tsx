import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import HpHeader from '../frontend-pages/shared/header/HpHeader';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import houseServices from '../forms/form-elements/autoComplete/data';
import { useNavigate, useLocation } from 'react-router';
/* import apiService from 'src/api.service'; */

const canadaAreas = [
  { title: 'Toronto' },
  { title: 'Vancouver' },
  { title: 'Montreal' },
  { title: 'Calgary' },
  { title: 'Ottawa' },
  { title: 'Edmonton' },
  { title: 'Quebec City' },
  { title: 'Winnipeg' },
  { title: 'Halifax' },
];

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('phoneNumber number is required'),
  hourlyRates: Yup.number()
    .typeError('Must be a number')
    .positive('Must be positive')
    .required('Rates are required'),
  area: Yup.string().required('Area is required'),
  expertise: Yup.string()
    .oneOf(
      houseServices.map((service) => service.title),
      'Please select a valid expertise',
    )
    .required('Expertise is required'),
});

const UserRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userType, serviceType, frameworkId, houseServiceId } = location.state || {};

  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <HpHeader />

      <Box pt={3}>
        <Container
          sx={{
            maxWidth: '1400px !important',
            position: 'relative',
          }}
        >
          <Grid container spacing={3} justifyContent="center" mb={4}>
            <Card
              sx={{
                width: { xs: '100%', sm: 400, md: 600 },
                maxWidth: 800,
                mx: 'auto',
                px: 2,
                boxShadow: 3,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}
                >
                  {userType === 'client' ? 'User Registration' : 'Register as a Professional'}
                </Typography>

                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    hourlyRates: '',
                    area: '',
                    expertise: serviceType || '',
                    userType: userType,
                    serviceName: '',
                    serviceId: '',
                  }}
                  validationSchema={validationSchema}
                  /*   onSubmit={(values) => {
                    const result = apiService.addUser(values);
                    console.log('result==>', result);

                    console.log('Submitted values ===>', values);
                    setOpenAlert(true);
                    setTimeout(() => navigate('/FixidiLandingPage'), 2000);
                  }} */
                  onSubmit={async (values) => {
                    try {
                      const cleanedPhone = values.phoneNumber.replace(/\s+/g, '');
                      const payload = {
                        ...values,
                          phoneNumber: cleanedPhone,
                        serviceName: values.expertise, // extract title if backend expects a string
                      };
                      console.log('payload ==>', payload);

                    /*   const result = await apiService.addUser(payload);
                      console.log('API Result ==>', result); */
                      await fetch(
                        'https://script.google.com/macros/s/AKfycbxa38zs6vgfBUwoxXJUCbDfx-aqCs12PQiCsYrsdo7a8iLzrhsNEMtSR2Y3OXIKlP4p0g/exec',
                        {
                          method: 'POST',
                          body: JSON.stringify(payload),
                          mode: 'no-cors',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        },
                      );
                      // Check for conflict or error in response
                     /*  if (
                        result?.status === 'CONFLICT' ||
                        result?.message === 'User already exists'
                      ) {
                        console.error('User already exists!');
                        // Display this to the user if needed
                        return;
                      }
 */
                      console.log('Submitted values ===>', values);
                      setOpenAlert(true); // Success message
                      setTimeout(() => navigate('/FixidiLandingPage'), 2000);
                    } catch (error) {
                      console.error('Error while submitting user:', error);
                    }
                  }}
                >
                  {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
                    useEffect(() => {
                      if (userType === 'client' || 'professional') {
                        const matchedService = houseServices.find(
                          (s) => s.title === values.expertise,
                        );
                        console.log('matchedService ===>', matchedService);

                        setFieldValue('serviceId', matchedService?.id || '');
                      }
                    }, [userType, frameworkId, houseServiceId, values.expertise, setFieldValue]);

                    return (
                      <Form>
                        <Grid container spacing={3}>
                          {/* Expertise */}
                          <Grid item xs={5}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              {userType === 'client'
                                ? 'Required Services'
                                : 'Select Your Expertise'}
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Autocomplete
                              disableClearable
                              fullWidth
                              size="small"
                              options={houseServices.map((option) => option.title)} // options must be strings
                              value={values.expertise || ''}
                              onChange={(_, newValue) => {
                                setFieldValue('expertise', newValue || '');
                              }}
                              onInputChange={(_, newInputValue) => {
                                setFieldValue('expertise', newInputValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Expertise"
                                  name="expertise"
                                  placeholder="Smoke detectors, Plumbing, etc."
                                  onBlur={handleBlur}
                                  error={touched.expertise && Boolean(errors.expertise)}
                                  helperText={
                                    touched.expertise && typeof errors.expertise === 'string'
                                      ? errors.expertise
                                      : ''
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {/* Area */}
                          <Grid item xs={5}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              Select Your Area
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Autocomplete
                              freeSolo
                              disableClearable
                              size="small"
                              value={values.area}
                              options={canadaAreas.map((option) => option.title)}
                              onChange={(_, newValue: string | null) => {
                                setFieldValue('area', newValue || '');
                              }}
                                onInputChange={(_, newInputValue) => {
    setFieldValue('area', newInputValue); // This is important!
  }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Areas"
                                  placeholder="Enter city or area"
                                  name="area"
                                  onBlur={handleBlur}
                                  error={touched.area && Boolean(errors.area)}
                                  helperText={touched.area && errors.area}
                                />
                              )}
                            />
                          </Grid>

                          {/* Hourly Rates */}
                          <Grid item xs={5}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              {userType === 'client' ? 'Estimated Rates' : 'Hourly Rates'}
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              label="Rates"
                              slotProps={{
                                input: {
                                  startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                  ),
                                },
                              }}
                              variant="outlined"
                              fullWidth
                              size="small"
                              name="hourlyRates"
                              value={values.hourlyRates}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="number"
                              placeholder="78.00"
                              error={touched.hourlyRates && Boolean(errors.hourlyRates)}
                              helperText={touched.hourlyRates && errors.hourlyRates}
                            />
                          </Grid>

                          {/* First and Last Name */}
                          <Grid item xs={6}>
                            <TextField
                              name="firstName"
                              fullWidth
                              size="small"
                              placeholder="Enter your first name"
                              label="First Name"
                              variant="outlined"
                              type="text"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.firstName && Boolean(errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Last Name"
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              variant="outlined"
                              fullWidth
                              size="small"
                              onBlur={handleBlur}
                              placeholder="Enter your last name"
                              error={touched.lastName && Boolean(errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                          </Grid>

                          {/* phoneNumber */}
                          <Grid item xs={12}>
                            <MuiTelInput
                              name="phoneNumber"
                              value={values.phoneNumber}
                              defaultCountry="CA"
                              onChange={(value) => setFieldValue('phoneNumber', value)}
                              onBlur={handleBlur}
                              size="small"
                              fullWidth
                              placeholder="Enter your phoneNumber number e.g +1234567890"
                              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                          </Grid>

                          {/* Email */}
                          <Grid item xs={12}>
                            <TextField
                              label="Email"
                              variant="outlined"
                              fullWidth
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              size="small"
                              placeholder="Enter your email"
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>

                          {/* Submit */}
                          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" type="submit" size="small">
                              {userType === 'client'
                                ? 'Hire a Professional'
                                : 'Become a Professional'}
                            </Button>
                          </Grid>
                        </Grid>

                        <Snackbar
                          open={openAlert}
                          autoHideDuration={2000}
                          onClose={() => {
                            setOpenAlert(false);
                            //  navigate('/FixidiLandingPage');
                          }}
                        >
                          <Alert severity="success" sx={{ width: '100%' }}>
                            Submitted Successfully!
                          </Alert>
                        </Snackbar>
                      </Form>
                    );
                  }}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserRegistration;

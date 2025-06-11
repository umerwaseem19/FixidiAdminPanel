import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { MuiTelInput } from 'mui-tel-input';
import { useLocation, useNavigate } from 'react-router';
import HpHeader from '../frontend-pages/shared/header/HpHeader';
import houseServices from '../forms/form-elements/autoComplete/data';
interface ExpertiseEntry {
  expertise: string;
  serviceId: string | number; // or whatever type your serviceId is
  hourlyRates: string;
  comments: string;
}
interface Address {
  area: string;
  postalCode: string;
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  area: string;
  addressList: Address[];
  expertiseList: ExpertiseEntry[];
}

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

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  postalCode: Yup.string().required('Postal code is required'),
  area: Yup.string().required('Area is required'),
  expertiseList: Yup.array().of(
    Yup.object().shape({
      expertise: Yup.string()
        .oneOf(
          houseServices.map((s) => s.title),
          'Please select a valid expertise',
        )
        .required('Expertise is required'),
      hourlyRates: Yup.number()
        .typeError('Must be a number')
        .positive('Must be positive')
        .required('Rates are required'),
      comments: Yup.string(),
    }),
  ),
});

const UserRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openAlert, setOpenAlert] = useState(false);
  const { userType, serviceType, frameworkId, houseServiceId } = location.state || {};
  return (
    <>
      <HpHeader />
      {/*   <p>userType {userType}</p>
      <p>serviceType {serviceType}</p>
      <p>frameworkId {frameworkId}</p>
      <p>houseServiceId {houseServiceId}</p> */}
      <Box pt={3} mt={2}>
        <Container sx={{ maxWidth: '1400px !important', position: 'relative' }}>
          <Grid container spacing={3} justifyContent="center" mb={4}>
            <Card
              sx={{
                width: '100%',
                maxWidth: 1200,
                mx: 'auto',
                px: { xs: 1, sm: 2 },
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

                <Formik<FormValues>
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    addressList:
                      userType === 'client'
                        ? [{ area: '', postalCode: '' }]
                        : [{ area: '', postalCode: '' }],
                    expertiseList: [
                      { expertise: serviceType || '', hourlyRates: '', comments: '' },
                    ],
                    serviceId: '',
                    userType: userType,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    try {
                      const cleanedPhone = values.phoneNumber.replace(/\s+/g, '');
                      const payload = {
                        ...values,
                        phoneNumber: cleanedPhone,
                        serviceName: values.expertiseList.map((e) => e.expertise),
                        area: values.addressList[0]?.area || '',
                        postalCode: values.addressList[0]?.postalCode || '',
                        addressList: userType === 'professional' ? values.addressList : undefined,
                      };
                      console.log('payload ==>', payload);

                      await fetch(
                        'https://script.google.com/macros/s/AKfycbxa38zs6vgfBUwoxXJUCbDfx-aqCs12PQiCsYrsdo7a8iLzrhsNEMtSR2Y3OXIKlP4p0g/exec',
                        {
                          method: 'POST',
                          body: JSON.stringify(payload),
                          mode: 'no-cors',
                          headers: { 'Content-Type': 'application/json' },
                        },
                      );

                      setOpenAlert(true);
                      setTimeout(() => navigate('/FixidiLandingPage'), 2000);
                    } catch (error) {
                      console.error('Error while submitting user:', error);
                    }
                  }}
                >
                  {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
                    // On mount, set initial values for expertise and serviceId
                    useEffect(() => {
                      if (houseServices.length > 0) {
                        let matchedService = null;

                        if (houseServiceId) {
                          matchedService = houseServices.find((s) => s.id === houseServiceId);
                        } else if (serviceType) {
                          matchedService = houseServices.find((s) => s.title === serviceType);
                        }

                        if (matchedService) {
                          // If expertiseList is empty, initialize it
                          if (!values.expertiseList || values.expertiseList.length === 0) {
                            setFieldValue('expertiseList', [
                              {
                                expertise: matchedService.title,
                                serviceId: matchedService.id,
                                hourlyRates: '',
                                comments: '',
                              },
                            ]);
                          } else {
                            // Otherwise update first item
                            setFieldValue('expertiseList[0].expertise', matchedService.title);
                            setFieldValue('expertiseList[0].serviceId', matchedService.id);
                          }
                        }
                      }
                    }, [houseServiceId, serviceType, houseServices, setFieldValue]);
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              name="firstName"
                              label="First Name"
                              fullWidth
                              size="small"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.firstName && Boolean(errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              name="lastName"
                              label="Last Name"
                              fullWidth
                              size="small"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.lastName && Boolean(errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              name="email"
                              label="Email"
                              fullWidth
                              size="small"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                         <Grid item xs={12} sm={6} md={3}>
                            <MuiTelInput
                              name="phoneNumber"
                              defaultCountry="CA"
                              value={values.phoneNumber}
                              onChange={(value) => setFieldValue('phoneNumber', value)}
                              onBlur={handleBlur}
                              size="small"
                              fullWidth
                              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                          </Grid>
                          <FieldArray name="addressList">
                            {({ push, remove }) => (
                              <>
                                {values.addressList.map((item, index) => (
                                  <Grid item xs={12} key={index}>
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <Autocomplete
                                          size="small"
                                          options={canadaAreas.map((option) => option.title)}
                                          value={item.area}
                                          onChange={(_, newValue) =>
                                            setFieldValue(
                                              `addressList[${index}].area`,
                                              newValue || '',
                                            )
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Area"
                                              name={`addressList[${index}].area`}
                                              onBlur={handleBlur}
                                              error={
                                                touched.addressList?.[index]?.area &&
                                                Boolean(errors.addressList?.[index]?.area)
                                              }
                                              helperText={
                                                touched.addressList?.[index]?.area &&
                                                errors.addressList?.[index]?.area
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>

                                   <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                          name={`addressList[${index}].postalCode`}
                                          label="Postal Code"
                                          fullWidth
                                          size="small"
                                          value={item.postalCode}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={
                                            touched.addressList?.[index]?.postalCode &&
                                            Boolean(errors.addressList?.[index]?.postalCode)
                                          }
                                          helperText={
                                            touched.addressList?.[index]?.postalCode &&
                                            errors.addressList?.[index]?.postalCode
                                          }
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={6} md={6} lg={3}>
                                        {userType === 'professional' && index > 0 && (
                                          <Button color="error" onClick={() => remove(index)}>
                                            Remove
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>{' '}
                                  </Grid>
                                ))}

                                {userType === 'professional' && (
                                  <Grid item xs={12}>
                                    <Button
                                      variant="outlined"
                                      onClick={() => push({ area: '', postalCode: '' })}
                                    >
                                      Add Address
                                    </Button>
                                  </Grid>
                                )}
                              </>
                            )}
                          </FieldArray>

                          <FieldArray name="expertiseList">
                            {({ push, remove }) => (
                              <>
                                {values.expertiseList.map((item, index) => (
                                  <Grid item xs={12} key={index}>
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <Autocomplete
                                          size="small"
                                          options={houseServices}
                                          getOptionLabel={(option) => option.title}
                                          value={
                                            houseServices.find((h) => h.id === item.serviceId) ||
                                            null
                                          }
                                          onChange={(_, newVal) => {
                                            if (newVal) {
                                              setFieldValue(
                                                `expertiseList[${index}].expertise`,
                                                newVal.title,
                                              );
                                              setFieldValue(
                                                `expertiseList[${index}].serviceId`,
                                                newVal.id,
                                              );
                                            } else {
                                              setFieldValue(
                                                `expertiseList[${index}].expertise`,
                                                '',
                                              );
                                              setFieldValue(
                                                `expertiseList[${index}].serviceId`,
                                                '',
                                              );
                                            }
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              name={`expertiseList[${index}].expertise`}
                                              label="Expertise"
                                              error={
                                                touched.expertiseList?.[index]?.expertise &&
                                                Boolean(errors.expertiseList?.[index]?.expertise)
                                              }
                                              helperText={
                                                touched.expertiseList?.[index]?.expertise &&
                                                errors.expertiseList?.[index]?.expertise
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                          name={`expertiseList[${index}].hourlyRates`}
                                          label="Hourly Rates"
                                          fullWidth
                                          size="small"
                                          value={item.hourlyRates}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          error={
                                            touched.expertiseList?.[index]?.hourlyRates &&
                                            Boolean(errors.expertiseList?.[index]?.hourlyRates)
                                          }
                                          helperText={
                                            touched.expertiseList?.[index]?.hourlyRates &&
                                            errors.expertiseList?.[index]?.hourlyRates
                                          }
                                        />
                                      </Grid>
                                     <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextField
                                          name={`expertiseList[${index}].comments`}
                                          label="Comments"
                                          fullWidth
                                          size="small"
                                          value={item.comments}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </Grid>
                                      <Grid item xs={2}>
                                        {index > 0 && (
                                          <Button color="error" onClick={() => remove(index)}>
                                            Remove
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))}
                                <Grid item xs={12}>
                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      push({
                                        expertise: '',
                                        serviceId: '',
                                        hourlyRates: '',
                                        comments: '',
                                      })
                                    }
                                  >
                                    Add Expertise
                                  </Button>
                                </Grid>
                              </>
                            )}
                          </FieldArray>

                          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" type="submit" size="small">
                              {userType === 'client'
                                ? 'Hire a Professional'
                                : 'Become a Professional'}
                            </Button>
                          </Grid>
                        </Grid>
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {  Grid2 as Grid,  Box,  Stack,  Typography,  Button,  Card,  CardContent,  Container,  TextField,  Autocomplete,  Alert,  Snackbar,  Checkbox,  FormControlLabel,  InputAdornment,  Switch, Slider,} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PageContainer from 'src/components/container/PageContainer';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { MuiTelInput } from 'mui-tel-input';
import { useLocation, useNavigate } from 'react-router';
import HpHeader from '../frontend-pages/shared/header/HpHeader';
import houseServices from '../forms/form-elements/autoComplete/data';
import Logo from 'src/layouts/full/shared/logo/Logo';
import img1 from 'src/assets/images/FixidiIcons/userRegistration.svg';
interface ExpertiseEntry {
  expertise: string; serviceId: string | number;  hourlyRates: string; comments: string; isHourlyRateApplicable: false;}
interface Address {
  area: string;  postalCode: string;  city:string
}
interface FormValues {
  firstName: string;  lastName: string;  email: string;  phoneNumber: string;  postalCode: string;  area: string;  addressList: Address[];  expertiseList: ExpertiseEntry[];}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  addressList: Yup.array().of(
    Yup.object().shape({
      area: Yup.string().required('Area is required'),
      postalCode: Yup.string().required('Postal code is required'),
      city: Yup.string().required('City is required')
    })
  ),
  expertiseList: Yup.array().of(
    Yup.object().shape({
      expertise: Yup.string()
        .oneOf(
          houseServices.map((s) => s.title),
          'Please select a valid expertise'
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
function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;
const UserRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [openAlert, setOpenAlert] = useState(false);
  const { userType, serviceType, frameworkId, houseServiceId } = location.state || {};
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  return (
    <>
      <PageContainer title="Login" description="this is Login page">
        <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
          <Grid
            sx={{
              position: 'relative',              '&:before': {
                content: '""',                background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite',
                position: 'absolute',                height: '100%',                width: '100%',                opacity: '0.3',              },
            }}
            size={{
              xs: 12, sm: 12, lg: 7, xl: 8,}}
          >
            <Box position="relative">
              <Box px={3}>
                <Logo />
              </Box>
              <Box
                alignItems="center"
                justifyContent="center"
                height={'calc(100vh - 75px)'}
                sx={{
                  display: {
                    xs: 'none', lg: 'flex', },
                }}
              >
                <img
                  src={img1}
                  alt="bg"
                  style={{
                    width: '100%', maxWidth: '1400px', }}
                />
              </Box>
            </Box>
          </Grid>

          {/* form */}
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            size={{
              xs: 12, sm: 12, lg: 5, xl: 4,}}
          >
            <Box display="flex" flexDirection="column" height="100vh">
              {/* Scrollable form content */}
              <Box
                p={4}
                sx={{
                  flex: 1, overflowY: 'auto', overflowX: 'hidden', // optional padding for scrollbar space
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}
                >
                  {userType === 'client' ? 'Service Request' : 'Register as a Professional'}
                </Typography>
                <Formik<FormValues>
                  initialValues={{
                    firstName: '', lastName: '', email: '', phoneNumber: '', addressList:
                      userType === 'client'
                        ? [{ area: '',postalCode: '', city: '' }]
                        : [{ area: '', postalCode: '', city: '' }],
                    expertiseList: [   {
                        expertise: serviceType || '', hourlyRates: '', comments: '', isHourlyRateApplicable: false, },    ],
                    serviceId: '',
                    userType: userType,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values) => {
                    try {
                      const cleanedPhone = values.phoneNumber.replace(/\s+/g, '');
                      const payload = {
                        ...values,                        phoneNumber: cleanedPhone,                        serviceName: values.expertiseList.map((e) => e.expertise),                        area: values.addressList[0]?.area || '',                        postalCode: values.addressList[0]?.postalCode || '',                        city: values.addressList[0]?.city || '',                        addressList: userType === 'professional' ? values.addressList : undefined,                      };
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
                          <Grid
                            size={{
                              xs: 12,   sm: 12,   lg: 6,   xl: 6, }}
                          >
                            <TextField
                              name="firstName"
                              label="First Name *"
                              fullWidth
                              size="small"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.firstName && Boolean(errors.firstName)}
                              helperText={touched.firstName && errors.firstName}
                            />
                          </Grid>
                          <Grid
                            size={{
                              xs: 12,  sm: 12,  lg: 6,  xl: 6,}}
                          >
                            <TextField
                              name="lastName"
                              label="Last Name *"
                              fullWidth
                              size="small"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.lastName && Boolean(errors.lastName)}
                              helperText={touched.lastName && errors.lastName}
                            />
                          </Grid>
                          <Grid
                            size={{
                              xs: 12,   sm: 12,   lg: 6,   xl: 6, }}
                          >
                            <TextField
                              name="email"
                              label="Email *"
                              fullWidth
                              size="small"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                          <Grid
                            size={{
                              xs: 12,  sm: 12,  lg: 6,  xl: 6,}}
                          >
                            <MuiTelInput
                              name="phoneNumber *"
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
                                  <Grid
                                    size={{
                                      xs: 12,  sm: 12,  lg: 12,  xl: 12,}}
                                    key={index}
                                  >
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid
                                        size={{
                                          xs: 12,   sm: 12,   lg: 6,   xl: 6, }}
                                      >
                                        <Autocomplete
                                          size="small"
                                          options={canadaAreas.map((option) => option.title)}
                                          value={item.area}
                                          onChange={(_, newValue) =>
                                            setFieldValue(
                                              `addressList[${index}].city`,
                                              newValue || '',
                                            )
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="City *"
                                              name={`addressList[${index}].city`}
                                              onBlur={handleBlur}
                                              error={
                                                touched.addressList?.[index]?.city &&
                                                Boolean(errors.addressList?.[index]?.city)
                                              }
                                              helperText={
                                                touched.addressList?.[index]?.city &&
                                                errors.addressList?.[index]?.city
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>
                                      {userType === 'client' && (
                                        <Grid
                                          size={{
                                            xs: 12,  sm: 12,  lg: 6,  xl: 6,}}
                                        >
                                          <TextField
                                            name={`addressList[${index}].postalCode`}
                                            label="Postal Code *"
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
                                      )}
                                      {userType === 'client' && (
                                        <Grid size={{ xs: 12,sm: 12, lg: 12,xl: 12, }}
                                        >
                                          <TextField
                                            name={`addressList[${index}].area`}
                                            label="Address Line *"
                                            fullWidth
                                            size="small"
                                            value={values.area}
                                            onChange={handleChange}
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
                                        </Grid>
                                      )}
                                      {userType === 'professional' && (
                                        <Grid
                                          size={{
                                            xs: 12,   sm: 12,   lg: 12,   xl: 12, }}
                                        >
                                    
                                          <Autocomplete
                                            multiple
                                            fullWidth
                                            size="small"
                                            id="checkboxes-tags-demo"
                                            options={canadaAreas}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.title}
                                            renderOption={(props, option, { selected }) => {
                                              const { key, ...optionProps } = props;
                                              return (
                                                <li key={key} {...optionProps}>
                                                  <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                  />
                                                  {option.title}
                                                </li>
                                              );
                                            }}
                                            renderInput={(params) => (
                                              <TextField
                                                name={`addressList[${index}].area`}
                                                label="Coverage Area *"
                                                {...params}
                                                placeholder="Select Areas"
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
                                      )}

                                      <Grid
                                        size={{
                                          xs: 12,    sm: 12,    lg: 3,    xl: 3,  }}
                                      >
                                        {index > 0 && (
                                          <Button color="error" onClick={() => remove(index)}>
                                            Remove
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))}
                              </>
                            )}
                          </FieldArray>

                          <FieldArray name="expertiseList">
                            {({ push, remove }) => (
                              <>
                                {values.expertiseList.map((item, index) => (
                                  <Grid
                                    size={{
                                      xs: 12,   sm: 12,   lg: 12,   xl: 12, }}
                                    key={index}
                                  >
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid
                                        size={{
                                          xs: 12,  sm: 12,  lg: 6,  xl: 6,}}
                                      >
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
                                              label="Expertise *"
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
                                      {userType === 'professional' && (
                                        <Grid
                                          size={{
                                            xs: 12,
                                            sm: 12,
                                            lg: 6,
                                            xl: 6,
                                          }}
                                        >
                                          <TextField
                                            name={`expertiseList[${index}].hourlyRates`}
                                            label="Rates *"
                                            slotProps={{
                                              input: {
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    $
                                                  </InputAdornment>
                                                ),
                                              },
                                            }}
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
                                      )}

                                      {userType === 'client' && (
                                        <Grid
                                          size={{
                                            xs: 12,
                                            sm: 12,
                                            lg: 6,
                                            xl: 6,
                                          }}
                                        >
                                          <Box display="flex" alignItems="center" gap={2}>
                                            <Typography>Min</Typography>{' '}
                                            {/* This acts like a start adornment */}
                                            <Slider
                                              getAriaLabel={() => 'Minimum distance'}
                                              value={value1}
                                              onChange={handleChange1}
                                              valueLabelDisplay="auto"
                                              getAriaValueText={valuetext}
                                              disableSwap
                                            />
                                            <Typography>Max</Typography>
                                          </Box>
                                        </Grid>
                                      )}
                                      <Grid
                                        size={{
                                          xs: 12,
                                          sm: 12,
                                          lg: 6,
                                          xl: 6,
                                        }}
                                      >
                                      
                                        <FormControlLabel
                                          style={{ marginLeft: '0' }}
                                          control={
                                            <Box display="flex" alignItems="center" gap={1}>
                                              <Typography variant="body2">Hourly</Typography>
                                              <Switch
                                                name={`expertiseList[${index}].isHourlyRateApplicable`}
                                                checked={
                                                  values.expertiseList[index].isHourlyRateApplicable
                                                }
                                                onChange={handleChange}
                                              />
                                              <Typography variant="body2">Fixed</Typography>
                                            </Box>
                                          }
                                        />
                                      </Grid>
                                      {userType === 'client' && (
                                        <Grid
                                          size={{
                                            xs: 12,
                                            sm: 12,
                                            lg: 9,
                                            xl: 9,
                                          }}
                                        >
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
                                      )}
                                      <Grid
                                        size={{
                                          xs: 2,
                                          sm: 12,
                                          lg: 3,
                                          xl: 3,
                                        }}
                                      >
                                        {index > 0 && (
                                          <Button color="error" onClick={() => remove(index)}>
                                            Remove
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))}
                                <Grid
                                  size={{
                                    xs: 12,
                                    sm: 12,
                                    lg: 12,
                                    xl: 12,
                                  }}
                                >
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() =>
                                      push({
                                        expertise: '',
                                        serviceId: '',
                                        hourlyRates: '',
                                        comments: '',
                                        isHourlyRateApplicable: false,
                                      })
                                    }
                                  >
                                    Add Expertise
                                  </Button>
                                </Grid>
                              </>
                            )}
                          </FieldArray>
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
              </Box>{' '}
              <Box
                sx={{
                  py: 2,borderTop: '1px solid #ccc',backgroundColor: '#fff',textAlign: 'center',}}
              >
                <Button variant="contained" type="submit">
                  {userType === 'client' ? 'Hire a Professional' : 'Become a Professional'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default UserRegistration;

const canadaAreas = [
  { title: 'Toronto' },  { title: 'Vancouver' },  { title: 'Montreal' },  { title: 'Calgary' },  { title: 'Ottawa' },  { title: 'Edmonton' },  { title: 'Quebec City' },  { title: 'Winnipeg' },  { title: 'Halifax' },];

const canadaCityAreas = [
  { title: 'Downtown' },  { title: 'Scarborough' },  { title: 'Richmond Hill' },  { title: 'North York' },  { title: 'Etobicoke' },  { title: 'Markham' },  { title: 'Mississauga' },  { title: 'Brampton' },  { title: 'York' },  { title: 'East York' },  { title: 'Vaughan' },  { title: 'Thornhill' },  { title: 'Pickering' },  { title: 'Ajax' },  { title: 'Whitby' },  { title: 'Oshawa' },  { title: 'Milton' },  { title: 'Oakville' },  { title: 'Burlington' },  { title: 'Newmarket' },];

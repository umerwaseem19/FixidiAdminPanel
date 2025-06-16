import { useEffect, useRef, useState } from 'react';
import {
  Grid2 as Grid,
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Alert,
  Snackbar,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Switch,
  Slider,
  Tooltip,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PageContainer from 'src/components/container/PageContainer';
import { Formik, Form, FieldArray, FormikProps, getIn } from 'formik';
import * as Yup from 'yup';
import { MuiTelInput } from 'mui-tel-input';
import { useLocation, useNavigate } from 'react-router';

import houseServices from '../forms/form-elements/autoComplete/data';
import Logo from 'src/layouts/full/shared/logo/Logo';
import img1 from 'src/assets/images/FixidiIcons/userRegistration.svg';
interface ExpertiseEntry {
  expertise: string;
  serviceId: string | number;
  hourlyRates: number[];
  comments: string;
  isHourlyRateApplicable: false;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  area: { title: string }[];
  areaLine: string; // for clients
  expertiseList: ExpertiseEntry[];
  userType: 'client' | 'professional';
}

const UserRegistration = () => {
  const location = useLocation();
  const formikRef = useRef<FormikProps<any>>(null);
  const navigate = useNavigate();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [openAlert, setOpenAlert] = useState(false);
  const { userType, serviceType, houseServiceId } = location.state || {};
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    postalCode:
      userType === 'client' ? Yup.string().required('Postal code is required') : Yup.string(),

    areaLine: Yup.string().when('userType', {
      is: 'client',
      then: Yup.string().required('Address line is required'),
      otherwise: Yup.string().notRequired(),
    }),
    area: Yup.array().when('userType', {
      is: 'professional',
      then: Yup.array()
        .of(Yup.object().shape({ title: Yup.string().required() }))
        .min(1, 'Select at least one area')
        .required('Coverage area is required'),
      otherwise: Yup.array().notRequired(),
    }),

    expertiseList: Yup.array().of(
      Yup.object().shape({
        expertise: Yup.string()
          .oneOf(
            houseServices.map((s) => s.title),
            'Please select a valid expertise',
          )
          .required('Expertise is required'),
        // Conditional hourly rates for professionals
        hourlyRates: Yup.mixed().when('$userType', {
          is: 'client',
          then: Yup.array()
            .of(Yup.number().min(0).max(200))
            .length(2, 'Provide both minimum and maximum rates')
            .required('Hourly rate range is required'),
          otherwise: Yup.number()
            .min(0, 'Rate must be at least 0')
            .max(200, 'Rate cannot exceed 200')
            .nullable(true),
        }),

        comments: Yup.string(),
      }),
    ),
  });
  return (
    <>
      <PageContainer title="Login" description="this is Login page">
        <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
          <Grid
            sx={{
              position: 'relative',
              '&:before': {
                content: '""',
                background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite',
                position: 'absolute',
                height: '100%',
                width: '100%',
                opacity: '0.3',
              },
            }}
            size={{
              xs: 12,
              sm: 12,
              lg: 7,
              xl: 8,
            }}
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
                    xs: 'none',
                    lg: 'flex',
                  },
                }}
              >
                <img
                  src={img1}
                  alt="bg"
                  style={{
                    width: '100%',
                    maxWidth: '1400px',
                  }}
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
              xs: 12,
              sm: 12,
              lg: 5,
              xl: 4,
            }}
          >
            <Box display="flex" flexDirection="column" height="100vh">
              {/* Scrollable form content */}
              <Box
                p={4}
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  overflowX: 'hidden', // optional padding for scrollbar space
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: 'text.secondary', mb: 5, textAlign: 'center' }}
                >
                  {userType === 'client' ? 'Service Request' : 'Register as a Professional'}
                </Typography>
                <Formik<FormValues>
                  innerRef={formikRef}
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    city: '',
                    postalCode: '',
                    //area: userType === 'professional' ? [] : '',
                    area: [], // ✅ Always an array for Autocomplete
                    areaLine: '',
                    expertiseList: [
                      {
                        expertise: serviceType || '',
                        serviceId: '',
                        hourlyRates: userType === 'professional' ? [] : [20, 80], // Initialize
                        comments: '',
                        isHourlyRateApplicable: false,
                      },
                    ],

                    userType: userType,
                  }}
                  validationSchema={validationSchema}
                  validateOnMount
                  //  validationContext={{ userType }}
                  onSubmit={async (values) => {
                    try {
                      const cleanedPhone = values.phoneNumber.replace(/\s+/g, '');
                      const payload = {
                        ...values,
                        phoneNumber: cleanedPhone,
                        serviceName: values.expertiseList.map((e) => e.expertise),
                      };
                      console.log('payload ==>', payload);

                      await fetch(
                        'https://script.google.com/macros/s/AKfycbwMzlpivNVCyZs1vSn-OleSpZHOIhMaNk1Pw6nvxEaspf9fanP3T4TYeExz1IAZfJp0Tg/exec',
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
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    submitForm,
                  }) => {
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
                      <Form onSubmit={submitForm}>
                        <Grid container spacing={2}>
                          <Grid
                            size={{
                              xs: 12,
                              sm: 12,
                              lg: 6,
                              xl: 6,
                            }}
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
                              xs: 12,
                              sm: 12,
                              lg: 6,
                              xl: 6,
                            }}
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
                              xs: 12,
                              sm: 12,
                              lg: 6,
                              xl: 6,
                            }}
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
                              xs: 12,
                              sm: 12,
                              lg: 6,
                              xl: 6,
                            }}
                          >
                            <MuiTelInput
                              name="phoneNumber *"
                              label="Phone Number *"
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
                          <Grid
                            size={{
                              xs: 12,
                              sm: 12,
                              lg: 6,
                              xl: 6,
                            }}
                          >
                            <Autocomplete
                              size="small"
                              options={canadaAreas.map((option) => option.title)}
                              value={values.city}
                              onChange={(_, newValue) => setFieldValue('city', newValue || '')}
                              getOptionLabel={(option) => option}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="City *"
                                  name="city"
                                  value={values.city}
                                  onChange={(e) => setFieldValue('city', e.target.value)}
                                  onBlur={handleBlur}
                                  error={touched.city && Boolean(errors.city)}
                                  helperText={touched.city && errors.city}
                                />
                              )}
                            />
                          </Grid>

                          {userType === 'client' && (
                            <Grid
                              size={{
                                xs: 12,
                                sm: 12,
                                lg: 6,
                                xl: 6,
                              }}
                            >
                              <TextField
                                name="postalCode"
                                label="Postal Code *"
                                fullWidth
                                size="small"
                                value={values.postalCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.postalCode && Boolean(errors.postalCode)}
                                helperText={touched.postalCode && errors.postalCode}
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
                              <TextField
                                name="areaLine"
                                label="Address Line *"
                                fullWidth
                                size="small"
                                value={values.areaLine}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.areaLine && Boolean(errors.areaLine)}
                                helperText={touched.areaLine && errors.areaLine}
                              />
                            </Grid>
                          )}

                          {userType === 'professional' && (
                            <Grid
                              size={{
                                xs: 12,
                                sm: 12,
                                lg: 12,
                                xl: 12,
                              }}
                            >
                              <Autocomplete
                                multiple
                                fullWidth
                                size="small"
                                id="checkboxes-tags-demo"
                                options={canadaAreas}
                                disableCloseOnSelect
                                getOptionLabel={(option) => option.title}
                                value={values.area || []}
                                onChange={(_, newValue) => {
                                  setFieldValue('area', newValue);
                                }}
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
                                    {...params}
                                    name="area"
                                    label="Coverage Area *"
                                    placeholder="Select Areas You Serve"
                                    error={touched.area && Boolean(errors.area)}
                                    helperText={
                                      touched.area &&
                                      (typeof errors.area === 'string'
                                        ? errors.area
                                        : Array.isArray(errors.area)
                                        ? 'Coverage area is required'
                                        : '')
                                    }
                                  />
                                )}
                              />
                            </Grid>
                          )}

                          <FieldArray name="expertiseList">
                            {({ push, remove }) => (
                              <>
                                {values.expertiseList.map((item, index) => (
                                  <Grid
                                    size={{
                                      xs: 12,
                                      sm: 12,
                                      lg: 12,
                                      xl: 12,
                                    }}
                                    key={index}
                                  >
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid
                                        size={{
                                          xs: 12,
                                          sm: 12,
                                          lg: 6,
                                          xl: 6,
                                        }}
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
                                              label={
                                                userType === 'client' ? 'Service *' : 'Expertise *'
                                              }
                                              placeholder={
                                                userType === 'client'
                                                  ? 'Select Service Name'
                                                  : 'Select Expertise Expertise'
                                              }
                                              error={
                                                getIn(
                                                  touched,
                                                  `expertiseList[${index}].expertise`,
                                                ) &&
                                                Boolean(
                                                  getIn(
                                                    errors,
                                                    `expertiseList[${index}].expertise`,
                                                  ),
                                                )
                                              }
                                              helperText={
                                                getIn(
                                                  touched,
                                                  `expertiseList[${index}].expertise`,
                                                ) &&
                                                getIn(errors, `expertiseList[${index}].expertise`)
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
                                            lg: 3,
                                            xl: 3,
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
                                              getIn(touched, `expertiseList[${index}].expertise`) &&
                                              Boolean(
                                                getIn(errors, `expertiseList[${index}].expertise`),
                                              )
                                            }
                                            helperText={
                                              getIn(touched, `expertiseList[${index}].expertise`) &&
                                              getIn(errors, `expertiseList[${index}].expertise`)
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
                                              name={`expertiseList[${index}].hourlyRates`}
                                              getAriaLabel={() => 'Minimum distance'}
                                              /* value={
                                                values.expertiseList[index].hourlyRates || [20, 80]
                                              } */
                                              value={
                                                Array.isArray(
                                                  values.expertiseList[index].hourlyRates,
                                                )
                                                  ? values.expertiseList[index].hourlyRates
                                                  : [20, 80]
                                              }
                                              onChange={(_, newValue) => {
                                                setFieldValue(
                                                  `expertiseList[${index}].hourlyRates`,
                                                  newValue,
                                                );
                                              }}
                                              valueLabelDisplay="on" // 👈 shows label above thumbs
                                              getAriaValueText={(value) => `$${value}`} // 👈 screen readers
                                              valueLabelFormat={(value) => `$${value}`}
                                              disableSwap
                                              min={0}
                                              max={100}
                                              step={20}
                                            />
                                            <Typography>Max </Typography>
                                          </Box>
                                        </Grid>
                                      )}
                                      {userType === 'professional' && (
                                        <Grid
                                          size={{
                                            xs: 12,
                                            sm: 12,
                                            lg: 3,
                                            xl: 3,
                                          }}
                                        >
                                          <FormControlLabel
                                            label=""
                                            style={{ marginLeft: '0' }}
                                            control={
                                              <Box display="flex" alignItems="center" gap={1}>
                                                <Tooltip title="Enable if you charge by the hour">
                                                  <Typography variant="body2">
                                                    {values.expertiseList[index]
                                                      .isHourlyRateApplicable
                                                      ? 'Hourly'
                                                      : 'Fixed'}
                                                  </Typography>
                                                </Tooltip>
                                                <Switch
                                                  name={`expertiseList[${index}].isHourlyRateApplicable`}
                                                  checked={
                                                    values.expertiseList[index]
                                                      .isHourlyRateApplicable
                                                  }
                                                  onChange={handleChange}
                                                />
                                              </Box>
                                            }
                                          />
                                        </Grid>
                                      )}
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
                                            placeholder="Enter any notes or preferences..."
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
                                    {userType === 'client'
                                      ? 'Add Another Service'
                                      : 'Add Another Expertise'}
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
                        {/*  <Button variant="contained" type="submit">
                          {userType === 'client' ? 'Hire a Professional' : 'Become a Professional'}
                        </Button> */}
                      </Form>
                    );
                  }}
                </Formik>
              </Box>{' '}
              <Box
                sx={{
                  py: 2,
                  borderTop: '1px solid #ccc',
                  backgroundColor: '#fff',
                  textAlign: 'center',
                }}
              >
                <Button variant="contained" onClick={() => formikRef.current?.submitForm()}>
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

/* const canadaCityAreas = [
  { title: 'Downtown' },
  { title: 'Scarborough' },
  { title: 'Richmond Hill' },
  { title: 'North York' },
  { title: 'Etobicoke' },
  { title: 'Markham' },
  { title: 'Mississauga' },
  { title: 'Brampton' },
  { title: 'York' },
  { title: 'East York' },
  { title: 'Vaughan' },
  { title: 'Thornhill' },
  { title: 'Pickering' },
  { title: 'Ajax' },
  { title: 'Whitby' },
  { title: 'Oshawa' },
  { title: 'Milton' },
  { title: 'Oakville' },
  { title: 'Burlington' },
  { title: 'Newmarket' },
]; */

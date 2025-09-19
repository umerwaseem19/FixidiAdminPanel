// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import FeaturesTitle from './FeaturesTitle';
import { Typography, Grid2 as Grid, Container, Box } from '@mui/material';
import {
  IconAdjustments,
  IconArchive,
  IconArrowsShuffle,
  IconBook,
  IconBuildingCarousel,
  IconCalendar,
  IconChartPie,
  IconDatabase,
  IconDiamond,
  IconLanguageKatakana,
  IconLayersIntersect,
  IconMessages,
  IconRefresh,
  IconShieldLock,
  IconTag,
  IconWand,
  IconTable,
  IconPresentation,
} from '@tabler/icons-react';
import AnimationFadeIn from '../animation/Animation';

import icon1 from 'src/assets/images/FixidiIcons/generalHandyman.svg';
import icon2 from 'src/assets/images/FixidiIcons/tvMounting.svg';
import icon3 from 'src/assets/images/FixidiIcons/furnitureAssembly.svg';
import icon4 from 'src/assets/images/FixidiIcons/houseCleaning.svg';
import icon5 from 'src/assets/images/FixidiIcons/hanging.svg';
import icon6 from 'src/assets/images/FixidiIcons/furnitureMoving.svg';

import icon7 from 'src/assets/images/FixidiIcons/hauling.svg';
import icon8 from 'src/assets/images/FixidiIcons/lightfix.svg';
import icon9 from 'src/assets/images/FixidiIcons/smokeDetector.svg';
import icon10 from 'src/assets/images/FixidiIcons/gutterCleaning.svg';
import icon11 from 'src/assets/images/FixidiIcons/gardening-machinery-svgrepo-com.svg';
import icon12 from 'src/assets/images/FixidiIcons/lights.svg';


interface FeaturesType {
   id: number;
  icon: React.ReactElement;
  title: string;
  subtext: string;
}

const featuresData: FeaturesType[] = [
 {
    id: 1,
    title: 'Handyman',
    icon: <img src={icon1} width={40} height={40} alt="Handyman" />,
    subtext: 'Reliable solutions for all household fixes, big or small.',
  },
  {
    id: 2,
    title: 'TV Mounting',
    icon: <img src={icon2} width={40} height={40} alt="TV Mounting" />,
    subtext: 'Secure, stylish TV mounting with the perfect viewing angle.',
  },
  {
    id: 3,
    title: 'Assembly',
    icon: <img src={icon3} width={40} height={40} alt="Assembly" />,
    subtext: 'Fast, precise furniture and equipment assembly, hassle-free.',
  },
  {
    id: 4,
    title: 'Cleaning',
    icon: <img src={icon4} width={40} height={40} alt="Cleaning" />,
    subtext: 'Spotless, stress-free cleaning for homes and offices.',
  },
  {
    id: 5,
    title: 'Hauling',
    icon: <img src={icon7} width={40} height={40} alt="Hauling" />,
    subtext: 'Quick, eco-friendly junk and debris removal made easy.',
  },
  {
    id: 6,
    title: 'Hanging',
    icon: <img src={icon5} width={40} height={40} alt="Hanging" />,
    subtext: 'Professional hanging for frames, mirrors, curtains, and more.',
  },
  {
    id: 7,
    title: 'Lighting',
    icon: <img src={icon8} width={40} height={40} alt="Lighting" />,
    subtext: 'Safe, stylish lighting installations to brighten your space.',
  },
  {
    id: 8,
    title: 'Moving',
    icon: <img src={icon6} width={40} height={40} alt="Moving" />,
    subtext: 'Stress-free moving with careful packing and reliable transport.',
  },
  {
    id: 9,
    title: 'Gutterworks',
    icon: <img src={icon10} width={40} height={40} alt="Gutterworks" />,
    subtext: 'Trusted gutter cleaning, repair, and installation services.',
  },
  {
    id: 10,
    title: 'Decorating',
    icon: <img src={icon12} width={40} height={40} alt="Decorating" />,
    subtext: 'Creative decorating that adds style and personality to any space.',
  },
  {
    id: 11,
    title: 'Landscaping',
    icon: <img src={icon11} width={40} height={40} alt="Landscaping" />,
    subtext: 'Beautiful, affordable landscaping for lawns and gardens.',
  },
  {
    id: 12,
    title: 'Detectors',
    icon: <img src={icon9} width={40} height={40} alt="Detectors" />,
    subtext: 'Expert smoke & CO detector installation for peace of mind.',
  },
 /*  {
    icon: <IconLanguageKatakana width={40} height={40} strokeWidth={1.5} />,
    title: 'i18 React',
    subtext: 'react-i18 is a powerful internationalization framework for React.',
  },
  {
    icon: <IconLayersIntersect width={40} height={40} strokeWidth={1.5} />,
    title: 'Lots of Table Examples',
    subtext: 'Data Tables are initial requirement and we added them.',
  },
  {
    icon: <IconRefresh width={40} height={40} strokeWidth={1.5} />,
    title: 'Regular Updates',
    subtext: 'We are constantly updating our pack with new features.',
  },
  {
    icon: <IconBook width={40} height={40} strokeWidth={1.5} />,
    title: 'Detailed Documentation',
    subtext: 'We have made detailed documentation, so it will easy to use.',
  },
  {
    icon: <IconCalendar width={40} height={40} strokeWidth={1.5} />,
    title: 'Calendar Design',
    subtext: 'Calendar is available with our package & in nice design.',
  },
  {
    icon: <IconMessages width={40} height={40} strokeWidth={1.5} />,
    title: 'Dedicated Support',
    subtext: 'We believe in supreme support is key and we offer that.',
  }, */
];

const Features = () => {
  return (
    (<Box py={6}>
      <Container maxWidth="lg">
        <FeaturesTitle />
        <AnimationFadeIn>
          <Box mt={6}>
            <Grid container spacing={3}>
              {featuresData.map((feature, index) => (
                <Grid
                  textAlign="center"
                  key={index}
                  size={{
                    xs: 12,
                    sm: 4,
                    lg: 3
                  }}>
                  <Box color="primary.main">{feature.icon}</Box>
                  <Typography variant="h5" mt={3}>
                    {feature.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" mt={1} mb={3}>
                    {feature.subtext}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AnimationFadeIn>
      </Container>
    </Box>)
  );
};

export default Features;

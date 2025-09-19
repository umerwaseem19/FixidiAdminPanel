import { Box, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled, useTheme } from '@mui/material/styles';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import './carousel.css';

import user1 from 'src/assets/images/frontend-pages/homepage/user1.jpg';
import user2 from 'src/assets/images/frontend-pages/homepage/user2.jpg';
import user3 from 'src/assets/images/frontend-pages/homepage/user3.jpg';
import user4 from 'src/assets/images/frontend-pages/homepage/user4.jpg';
import user5 from 'src/assets/images/frontend-pages/homepage/user5.jpg';

function SampleNextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowRight />
    </Box>
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: '60px',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowLeft />
    </Box>
  );
}

const LeaderShipCarousel = () => {
  const theme = useTheme();

  const slideStyle = {
    padding: '0 15px',
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const UserBox = styled(Box)(() => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : 'white',
    maxWidth: 'calc(100% - 30px)',
    margin: '0 auto',
    borderRadius: '8px',
    marginTop: '-30px',
    boxShadow: '0px 6px 12px rgba(127, 145, 156, 0.12)',
    marginBottom: '10px',
  }));

  const members = [
    { img: user1, name: 'Alex Martinez', role: 'CEO & Co-Founder' },
    { img: user2, name: 'Jordan Nguyen', role: 'CTO & Co-Founder' },
    { img: user3, name: 'Taylor Roberts', role: 'Product Manager' },
    { img: user4, name: 'Morgan Patel', role: 'Lead Developer' },
    { img: user5, name: 'Kiana Collins', role: 'Software Developer' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Slider {...settings} className="leadership-carousel">
          {members.map((member, index) => (
            <Box key={index} sx={slideStyle}>
              <img
                src={member.img}
                alt={member.name}
                width={270}
                height={290}
                style={{ borderRadius: '16px' }}
              />
              <UserBox px="10px" py="16px" textAlign="center">
                <Typography variant="h5" mb={1}>
                  {member.name}
                </Typography>
                <Typography variant="body1">{member.role}</Typography>
              </UserBox>
            </Box>
          ))}
        </Slider>
      </Grid>
        <Grid item xs={12}>
        <Slider {...settings} className="leadership-carousel">
          {members.map((member, index) => (
            <Box key={index} sx={slideStyle}>
              <img
                src={member.img}
                alt={member.name}
                width={270}
                height={290}
                style={{ borderRadius: '16px' }}
              />
              <UserBox px="10px" py="16px" textAlign="center">
                <Typography variant="h5" mb={1}>
                  {member.name}
                </Typography>
                <Typography variant="body1">{member.role}</Typography>
              </UserBox>
            </Box>
          ))}
        </Slider>
      </Grid>
    </Grid>
  );
};

export default LeaderShipCarousel;
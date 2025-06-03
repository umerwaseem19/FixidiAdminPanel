import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from '../../../../layouts/full/shared/logo/Logo';

import { useNavigate } from 'react-router';

type HpHeaderProps = {
  onProfessionalClick?: () => void; // function to handle button click
  showProfessionalButton?: boolean; // optional control
};

const MobileSidebar: React.FC<HpHeaderProps> = ({  showProfessionalButton }) =>  {
  const showButton = showProfessionalButton ?? location.pathname === '/FixidiLandingPage';
    const navigate = useNavigate();
 const onProfessionalClickk = () => {
    navigate('/user-registration', { state: { userType: 'professional' } });
  };
  return (
    <>
      <Box px={3}>
        <Logo />
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          {/*  {NavLinks.map((navlink, i) => (
            <Button
              color="inherit"
              key={i}
              href={navlink.to}
              sx={{
                justifyContent: 'start',
              }}
            >
              {navlink.title}{' '}
              {navlink.new ? (
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    ml: '6px',
                    borderRadius: '8px',
                    color: 'primary.main',
                    backgroundColor: 'rgba(93, 135, 255, 0.15)',
                  }}
                />
              ) : null}
            </Button>
          ))}

          <Button
            color="inherit"
            href="#"
            sx={{
              justifyContent: 'start',
            }}
          >
            Support
          </Button> */}
           {showButton && (
                            <Button color="primary" variant="contained" onClick={onProfessionalClickk} >
                              Become a Professional
                            </Button>
                          )}
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;

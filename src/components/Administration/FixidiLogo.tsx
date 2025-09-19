import styled from "@emotion/styled";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { AppState } from "src/store/Store";
import   LogoLight from './fixidilogo.png';

const FixidiLogo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled
        to="/FixidiLandingPage"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {customizer.activeMode === 'dark' ? (
           <img src={LogoLight} alt="Fixidi Logo" />
        ) : (
           <img src={LogoLight} alt="Fixidi Logo" />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {customizer.activeMode === 'dark' ? (
         <img src={LogoLight} alt="Fixidi Logo" />
      ) : (
         <img src={LogoLight} alt="Fixidi Logo" />
      )}
    </LinkStyled>
  );
};

export default FixidiLogo;
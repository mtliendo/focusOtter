import React, { useState } from 'react';
import { Container } from '@components/global';
import { Auth } from 'aws-amplify';
import { Link } from '@reach/router';
import { Button } from 'antd';
import { ReactComponent as MenuIcon } from '@static/icons/menu.svg';
import {
  Nav,
  NavItem,
  Brand,
  StyledContainer,
  NavListWrapper,
  MobileMenu,
  Mobile, // render component to inherit media-queries
} from './style';

const Navbar = props => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState);
  };

  const handleAuthButtonClick = async () => {
    console.log('called');
    await Auth.signOut();
  };

  const getNavList = ({ mobile = false }) => (
    <NavListWrapper mobile={mobile}>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to="/activities/home"
      >
        Activities List
      </Link>
      <Button
        type="text"
        style={{ color: 'black' }}
        onClick={handleAuthButtonClick}
      >
        Sign Out
      </Button>
    </NavListWrapper>
  );

  return (
    <Nav {...props}>
      <StyledContainer>
        <Brand>
          <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
            Focus Otter
          </Link>
        </Brand>
        {props.username && `Welcome back, ${props.username}!`}
        <Mobile>
          <button onClick={toggleMobileMenu} style={{ color: 'black' }}>
            <MenuIcon />
          </button>
        </Mobile>
        <Mobile hide>{getNavList({})}</Mobile>
        <Mobile>
          {mobileMenuOpen && (
            <MobileMenu>{getNavList({ mobile: true })}</MobileMenu>
          )}
        </Mobile>
      </StyledContainer>
    </Nav>
  );
};

export default Navbar;

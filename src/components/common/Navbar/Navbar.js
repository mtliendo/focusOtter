import React, { useState } from 'react';
import { Container } from '@components/global';
import { Auth } from 'aws-amplify';
import { Link, navigate } from '@reach/router';
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
    props.user.username ? 
      await Auth.signOut().then(props.signOut) : 
      navigate('/activities/home');    
  };

  const getNavList = ({ mobile = false }) => (
    <NavListWrapper mobile={mobile}>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to="/activities/home"
      >
        Activities List
      </Link>
      {/* <Link
        style={{ textDecoration: 'none', color: 'black', marginLeft: '0.5em' }}
        to="/activities/journal"
      >
        Journal
      </Link> */}
      <Button type="text" onClick={handleAuthButtonClick}>
        {!props.user.username ? 'Sign In' : 'Sign Out'}
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
        {props.user.username && `Welcome back, ${props.user.username}!`}
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

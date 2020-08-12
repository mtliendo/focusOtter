import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Auth } from 'aws-amplify';
import { Link } from '@reach/router';
import { Button } from 'antd';
import {
  Nav,
  NavItem,
  Brand,
  StyledContainer,
  NavListWrapper,
  MobileMenu,
  Mobile, // render this component to inherit media-queries
} from './style';

class Navbar extends Component {
  // getNavAnchorLink = item => (
  //   <AnchorLink href={`#${item.toLowerCase()}`} onClick={this.closeMobileMenu}>
  //     {item}
  //   </AnchorLink>
  // );

  handleAuthButtonClick = async () => {
    console.log('called');
    await Auth.signOut();
  };

  getNavList = ({ mobile = false }) => (
    <NavListWrapper mobile={mobile}></NavListWrapper>
  );

  render() {
    return (
      <Nav {...this.props}>
        <StyledContainer>
          <Brand>
            <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
              Focus Otter
            </Link>
          </Brand>
          <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to="/activities/home"
          >
            Activities List
          </Link>
          <Button
            type="text"
            style={{ color: 'black' }}
            onClick={this.handleAuthButtonClick}
          >
            Sign Out
          </Button>
        </StyledContainer>
      </Nav>
    );
  }
}

export default Navbar;

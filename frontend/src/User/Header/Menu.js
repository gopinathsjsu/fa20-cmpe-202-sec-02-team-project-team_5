import React from 'react';
import {Navbar,Nav,NavDropdown,Dropdown, Form,FormControl,Button,Container,Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';
import {FaUser, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';

function Menu(props) {
  return (
  <Container className='menu-container'>
    <Navbar>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href='/buy'>Buy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/rent'>Rent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/sell'>Sell</Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Brand href='/home'>Home Finder</Navbar.Brand>
        <Nav className="ml-auto" activeKey="/home">
          {localStorage.getItem('email') ? (
            
              <NavDropdown title={<FaUser/>} id="basic-nav-dropdown">
                <NavDropdown.Item href='/favourite-searches'>Favorite Searches</NavDropdown.Item>
                <NavDropdown.Item href='/favourite-homes'>Favorite Homes</NavDropdown.Item>
                <NavDropdown.Item href='/listings'> Listings</NavDropdown.Item>
                <NavDropdown.Item href='/applications'> Applications(Buy/Sell)</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/sign-out'>Sign out &nbsp;<FaSignOutAlt/></NavDropdown.Item>
              </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link href='/sign-in'>Sign in &nbsp;</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
    </Navbar>
  </Container>  
  );
}

export default Menu;
import React from 'react';
import {Navbar,Nav,NavDropdown,Dropdown, Form,FormControl,Button,Container,Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';
import logo from '../../Home-Finder.png'
import {FaUser, FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';

function Menu(props) {
  return (
  <Container className='menu-container'>
    <Navbar>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link><Link className="navigation-links" to='/buy'>Buy</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link className="navigation-links" to='/rent'>Rent</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link className="navigation-links" to='/sell'>Sell</Link></Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Brand href='/home'><img className = 'logo' src = {logo} alt ="Home Finder"/></Navbar.Brand>

        <Nav className="ml-auto" activeKey="/home">
        {localStorage.getItem('email') ? (
          <Nav.Item> 
            <NavDropdown title="Manage Listings" id="basic-nav-dropdown">
              <NavDropdown.Item href='/view-listings'> View Listings</NavDropdown.Item>
              <NavDropdown.Item href='/create-listings'> Create Listings</NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
          ) : (
            <Nav.Item> 
            </Nav.Item>
          )}
          {localStorage.getItem('email') ? (
              <Nav.Item> 
                <NavDropdown title={<FaUser/>} id="basic-nav-dropdown">
                  <NavDropdown.Item href='/favourite-searches'>Favorite Searches</NavDropdown.Item>
                  <NavDropdown.Item href='/favourite-homes'>Favorite Homes</NavDropdown.Item>
                  <NavDropdown.Item href='/applications'> Applications(Buy/Sell)</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/sign-out'>Sign out &nbsp;<FaSignOutAlt/></NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
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
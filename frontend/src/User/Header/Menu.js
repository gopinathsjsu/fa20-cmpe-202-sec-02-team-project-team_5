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
          <Nav.Link><Link to='/buy'>Buy</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to='/sell'>Sell</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to='/rent'>Rent</Link></Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Brand><Link to='/home'>Home Finder</Link></Navbar.Brand>
        <Nav className="ml-auto" activeKey="/home">
          {localStorage.getItem('email') ? (
            
              <NavDropdown title={<FaUser/>} id="basic-nav-dropdown">
                <NavDropdown.Item><Link to='/favourite-searches'>Favorite Searches</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/favourite-homes'>Favorite Homes</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/listings'>Listings</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/applications'>Applications(Buy/Sell)</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Link to='/sign-out'>Sign out &nbsp;<FaSignOutAlt/></Link></NavDropdown.Item>
              </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link><Link to='/sign-in'>Sign in  &nbsp;</Link></Nav.Link>
            </Nav.Item>
          )}
        </Nav>
    </Navbar>
  </Container>  
  );
}

export default Menu;
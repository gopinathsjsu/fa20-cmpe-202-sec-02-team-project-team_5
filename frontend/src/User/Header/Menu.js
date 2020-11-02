import React from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Container,Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu(props) {
  return (
  <Container className='menu-container'>
    <Row>
      <Col>
      <Nav className="justify-content-left" activeKey="/home">
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
      </Col>
      <Col xs={6}>
      <Navbar.Brand><Link to='/home'>Home Finder</Link></Navbar.Brand>
      </Col>
      <Col>
        <Nav className="justify-content-end" activeKey="/home">
        <NavDropdown title="Manage Rentals" id="basic-nav-dropdown">
          <NavDropdown.Item><Link to='/list-a-rentals'>List a rental</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to='/my-listings'>My Listings</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to='/applications'>Applications</Link></NavDropdown.Item>
        </NavDropdown>
          <Nav.Item>
            {localStorage.getItem('email') ? (
              <Nav.Link><Link to='/sign-out'>Sign out</Link></Nav.Link>
            ) : (
              <Nav.Link><Link to='/sign-in'>Sign in</Link></Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  </Container>  
  );
}

export default Menu;
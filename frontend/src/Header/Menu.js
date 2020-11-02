import React from 'react';
import {Navbar,Nav,NavDropdown,Form,FormControl,Button,Container,Row,Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu(props) {
  return (
  <Container>
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
      <Navbar.Brand>Home Finder</Navbar.Brand>
      </Col>
      <Col>
        <Nav className="justify-content-end" activeKey="/home">
        <NavDropdown title="Manage Rentals" id="basic-nav-dropdown">
          <NavDropdown.Item><Link to='/list-a-rentals'>List a rental</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to='/my-listings'>My Listings</Link></NavDropdown.Item>
          <NavDropdown.Item><Link to='/applications'>Applications</Link></NavDropdown.Item>
        </NavDropdown>
          <Nav.Item>
            <Nav.Link>Sign in</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  </Container>  
  );
}

export default Menu;
import React from 'react';
import {Modal, Container, Row, Col, Button, Tabs, Tab, Form} from 'react-bootstrap';
import RedirectToHome from './RedirectToHome';
import { Redirect } from 'react-router-dom';
import { useDataContext } from './../../App';
import axios from 'axios';
import { rooturl } from '../../config/config';
import jwt_decode from 'jwt-decode';

function SignIn(props) {

  const [show, setShow] = React.useState(true);
  const {data,setData} = useDataContext();
  const [closeModal,setCloseModal] = React.useState(null);

  const handleClose = (e) => {
    setCloseModal(<Redirect to={`/home`} />);
  }

  const handleAdminSigninSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    console.log("@@@@@@@@@@@",rooturl);
    //axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    axios.post(`${rooturl}/users/login`, formData)
    .then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
          let decodedUserInfo = JSON.stringify(jwt_decode(response.data.token));
          localStorage.setItem('token', response.data.token);
          localStorage.setItem("userType", 'admin');
          localStorage.setItem("email", formData.email);
          setShow(false);
          setData({...data,logggedIn: true});
      }
    });
  } 

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    localStorage.setItem("userType", 'user');
    localStorage.setItem("email", formData.email);
    setShow(false);
    setData({...data,logggedIn: true});
  }

  const handleUserSigninSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };
    axios.post(`${rooturl}/users/login`, formData)
    .then((response) => {
      console.log('Status Code : ', response.status);
      if (response.status === 200) {
          let decodedUserInfo = JSON.stringify(jwt_decode(response.data.token));
          localStorage.setItem('token', response.data.token);
          localStorage.setItem("userType", 'user');
          localStorage.setItem("email", formData.email);
          setShow(false);
          setData({...data,logggedIn: true});
      }
    });
  }

  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
      <RedirectToHome />
      {closeModal}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Home Finder
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
      <Tabs defaultActiveKey="signin">
        <Tab eventKey="signin" title="User Sign In">
          <Container>
            <br />
            <Form onSubmit={handleUserSigninSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign In
              </Button>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="register" title="User Register">
          <Container>
            <br />
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
                <Form.Text className="text-muted">
                  At least 8 characters
                </Form.Text>
                <Form.Text className="text-muted">
                  Mix of letters and numbers
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>
          </Container>
        </Tab>
        <Tab eventKey="adminsiginin" title="Admin Sign In">
          <Container>
            <br />
            <Form onSubmit={handleAdminSigninSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required/>
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Sign In
              </Button>
            </Form>
          </Container>
        </Tab>
      </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default SignIn;
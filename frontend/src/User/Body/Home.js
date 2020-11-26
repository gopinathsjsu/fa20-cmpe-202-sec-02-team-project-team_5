import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './Home.css';
import RedirectToSignin from './RedirectToSignin';

function Home(props) {
  let [redirect,setRedirect] = React.useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    setRedirect(<Redirect to={`/rent?query=${e.target.search.value}`}></Redirect>)
  }
  return (
    <div className = 'home'>
      {/* <RedirectToSignin/> */}
      <div className = 'header'>
        <h2>Reimagine home!</h2>
        <h2>We’ll help you find a place you’ll love.</h2>
        {redirect}
        <Form onSubmit={e => handleSubmit(e)}>
          <input className='pa3 w-90 ba center' type='search' required name='search' placeholder='Enter an address, city or ZIP code'/>
          <Button variant='primary' type='submit'>Search</Button>
        </Form>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import './Home.css';
import RedirectToSignin from './RedirectToSignin';

function Home(props) {
  return (
    <div className = 'home'>
      <RedirectToSignin/>
      <div className = 'header'>
        <h2>Reimagine home!</h2>
        <h2>We’ll help you find a place you’ll love.</h2>
        <input className='pa3 w-90 ba center' type='search' placeholder='Enter an address, city or ZIP code'/>
      </div>
    </div>
  );
}

export default Home;

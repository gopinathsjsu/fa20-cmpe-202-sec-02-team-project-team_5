import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Buy from './Buy';
import Home from './Home';
import Rent from './Rent';
import Sell from './Sell';
import SignIn from './SignIn';
import SignOut from './SignOut';

function Body(props) {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/rent" component={Rent} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-out" component={SignOut} />
    </Switch>
  );
}

export default Body;
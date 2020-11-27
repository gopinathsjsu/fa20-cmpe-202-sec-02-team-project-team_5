import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Buy from './Buy';
import Home from './Home';
import Rent from './Rent';
import Sell from './Sell';
import SignIn from './SignIn';
import SignOut from './SignOut';
import CreateListings from './CreateListings';
import ViewListings from './ViewListings';

function Body(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/rent" component={Rent} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-out" component={SignOut} />
      <Route exact path="/create-listings" component={CreateListings} />
      <Route exact path="/view-listings" component={ViewListings} />
    </Switch>
  );
}

export default Body;
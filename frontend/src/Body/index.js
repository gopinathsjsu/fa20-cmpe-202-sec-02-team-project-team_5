import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Buy from './Buy';
import Rent from './Rent';
import Sell from './Sell';

function Body(props) {
  return (
    <Switch>
      {/* SignUp and Registrations */}
      {/* <Route path="/" component={<Menu />} /> */}
      <Route exact path="/buy" component={Buy} />
      <Route exact path="/sell" component={Sell} />
      <Route exact path="/rent" component={Rent} />
    </Switch>
  );
}

export default Body;
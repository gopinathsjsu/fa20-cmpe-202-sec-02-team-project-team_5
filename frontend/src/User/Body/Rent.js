import React from 'react';
import ListingsGrid from './Grids/ListingsGrid';
import qs from 'qs';

const Rent = (props) => {
  let queryString = qs.parse(props.location.search, { ignoreQueryPrefix: true }).query;
  return (
    <ListingsGrid type = "rent" queryString ={queryString}/>
  );
}

export default Rent;
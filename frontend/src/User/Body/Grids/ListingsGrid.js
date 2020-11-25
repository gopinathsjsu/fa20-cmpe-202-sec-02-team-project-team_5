import React from 'react';
import Grids from './Grids'
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch,Hits}from 'react-instantsearch-dom';

import './ListingsGrid.css';

const Hit = (listing) => {
    const homes = listing.hit;
    return (
      <Grids className="home-info" homes = {homes}></Grids>
    );
}

const searchClient = algoliasearch(
    '50QVKJC1V8',
    '015c1da5c884e9c79068465473b92e79'
);

const ListingsGrid = (props) => {
    return (
        <div>
          <h2 style = {{color: '#000'}}>Buy Homes</h2>
          <InstantSearch indexName={props.type} searchClient={searchClient}>
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </div>
      );

}

export default ListingsGrid;
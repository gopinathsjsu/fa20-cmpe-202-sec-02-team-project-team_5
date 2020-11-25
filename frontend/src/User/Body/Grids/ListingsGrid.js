import React from 'react';
import Grids from './Grids'
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch,Hits}from 'react-instantsearch-dom';

import './ListingsGrid.css';

// const Hit = (listing) => {
//     const house_listing = listing.hit;
//     return (
//       <Grids className="home-info" house = {house_listing}></Grids>
//     );
// }

// const searchClient = algoliasearch(
//     '50QVKJC1V8',
//     '015c1da5c884e9c79068465473b92e79'
// );

// const ListingsGrid = ({type}) => {
//     console.log("listing grid----->")
//     return (
//         <div>
//           {/* <InstantSearch indexName={type} searchClient={searchClient}>
//             <Hits hitComponent={Hit} />
//           </InstantSearch> */}
//         </div>
//       );

// }


class ListingsGrid extends React.Component {

  state = {
    hits: []
  }

  getListingsData() {
    // change to use env variables
    const searchClient = algoliasearch(
      '50QVKJC1V8',
      '015c1da5c884e9c79068465473b92e79'
    );
    const index = searchClient.initIndex("Listing");
    const filters = `listing_type:${this.props.type}`;

    index.search('', {
      filters: filters
    }).then(({ hits }) => {
      console.log("hits: ", hits);
      this.setState({hits});
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    console.log("component mounted: ", this.props);
    this.getListingsData()
  }

  render() {
    console.log("state: ", this.state)
    return (<div>
      {this.state.hits.map((hit) =>
        <Grids house={hit}/>
      )}
    </div>);
  }
}

export default ListingsGrid;
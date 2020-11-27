import React, {useState, useEffect} from 'react';
import { rooturl } from '../../config/config';

function ViewListings(props) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
      fetch("https://home-finder-backend-staging.herokuapp.com/listings/19")
        .then((response) => response.json())
        .then((data) => setHomes(data));
    },[]);
    return (
      <div>
        <div>{homes['street_address']}</div>
      </div>
    );
  }

export default ViewListings;
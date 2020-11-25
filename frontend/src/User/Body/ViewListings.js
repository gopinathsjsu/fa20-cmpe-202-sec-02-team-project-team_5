import React, {useState, useEffect} from 'react';

function ViewListings(props) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(proxyurl + "https://home-finder-backend-staging.herokuapp.com/listings/1")
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
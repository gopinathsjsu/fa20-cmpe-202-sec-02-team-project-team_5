import React, {useState, useEffect} from 'react';
import {rooturl} from '../../../config/config'

function GridModal({home_id}) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      console.log(home_id);
      fetch(proxyurl + rooturl + "/listings/" + home_id)
        .then((response) => response.json())
        .then((data) => setHomes(data));
    },[]);
    console.log(homes['images']);
    // const a = setTimeout(() => {
    //     return (
    //         <div>
    //             <div>{home_id}</div>
    //             <div>{homes['street_address']}</div>
    //         </div>
    //       );
    //   }, 1000);
    // return (a);
    return (
        <div>
            <div>{home_id}</div>
            <div>{homes['street_address']}</div>
        </div>
      );
    }

    export default GridModal;
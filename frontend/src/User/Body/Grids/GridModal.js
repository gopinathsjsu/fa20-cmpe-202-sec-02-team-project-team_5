import React, {useState, useEffect} from 'react';
import {rooturl} from '../../../config/config'

function GridModal({home_id}) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   console.log(house_info);
      fetch(rooturl + "/listings/" + home_id)
        .then((response) => response.json())
        .then((data) => setHomes(data));
    },[]);
    console.log(homes);
    return (
        <div>
            <div>{home_id}</div>
            <img src =  {homes['images'] && homes['images'][0]} alt = "house"/>
            <img src =  {homes['images'] && homes['images'][1]} alt = "house"/>
            <br></br>
            <h3>Price: ${homes['price']}</h3>
            <h4>Address: {homes['street_address']+ ', ' + homes['city'] + ', ' + homes['state'] + ' - ' + homes['zip_code']}</h4>
            <br></br>
            <h3>Facts and features</h3>
            <div>
                <ul>
                <li>Bedrooms: {homes['bedrooms']}</li>
                <li>Bathrooms: {homes['bathroom']}</li>
                <li>Home Status: {homes['home_status']}</li>
                <li>Year Built: {homes['year_built']}</li>
                <li>Home Area: {homes['sqft_area']}  sqft</li>
                <li>Heater: {homes['heater']}</li>
                <li>Kitchen: {homes['kitchen']}</li>
                <li>Laundry: {homes['laundry']}</li>
                </ul>
            </div>
            <h3>Schedule a visit</h3>
            <div>
                <input type="date" className="form-control" id="date" name="date"/>
            </div>
        </div>
    );
}

export default GridModal;
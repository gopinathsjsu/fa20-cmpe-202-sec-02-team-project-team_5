import React, {useState, useEffect} from 'react';
import {rooturl} from '../../../config/config'

function GridModal({house_info,home_id}) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      console.log(house_info);
      fetch(proxyurl + rooturl + "/listings/" + home_id)
    // fetch("https://home-finder-backend-staging.herokuapp.com/favorites/")
        .then((response) => response.json())
        .then((data) => setHomes(data));
    },[]);
    function getDate(){
        var today = new Date();
        document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }
    return (
        <div>
            <div>{home_id}</div>
            <img src =  {house_info['images'][0]} alt = "house"/>
            <img src =  {house_info['images'][1]} alt = "house"/>
            <br></br>
            <h3>Price: ${house_info['price']}</h3>
            <h4>Address: {house_info['street_address']+ ', ' + house_info['city'] + ', ' + house_info['state'] + ' - ' + house_info['zip_code']}</h4>
            <br></br>
            <h3>Facts and features</h3>
            <div>
                <ul>
                <li>Bedrooms: {house_info['bedrooms']}</li>
                <li>Bathrooms: {house_info['bathroom']}</li>
                <li>Home Status: {house_info['home_status']}</li>
                <li>Year Built: {house_info['year_built']}</li>
                <li>Home Area: {house_info['sqft_area']}  sqft</li>
                <li>Heater: {house_info['heater']}</li>
                <li>Kitchen: {house_info['kitchen']}</li>
                <li>Laundry: {house_info['laundry']}</li>
                </ul>
            </div>
            <h3>Schedule a visit</h3>
            <div>
                <input type="date" onload="getDate()" class="form-control" id="date" name="date"/>
            </div>
        </div>
    );
}

export default GridModal;
import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {rooturl} from '../../../config/config'
import './GridModal.css'

function GridModal({home_id}) {
    const[homes, setHomes] = useState([]);
    useEffect(() => {
      fetch(rooturl + "/listings/" + home_id)
        .then((response) => response.json())
        .then((data) => setHomes(data));
    },[]);
    return (
        <div className="grid-modal">
            <div className="images">
                <img src =  {homes['images'] && homes['images'][0].url} alt = "house"/>
                <br/>
                <img src =  {homes['images'] && homes['images'][1].url} alt = "house"/>
            </div>
            <div className="home-details">
                <h4>Price: ${homes['price']}</h4>
                <br/>
                <h4>Address: {homes['street_address']+ ', ' + homes['city'] + ', ' + homes['state'] + ' - ' + homes['zip_code']}</h4>
                <br/>
                <h3>Facts and features</h3>
                <div>
                    <ul>
                    <li>Status: {homes['home_status']}</li>
                    <li>Type: {homes['home_type']}</li>
                    <li>Bedrooms: {homes['bedrooms']}</li>
                    <li>Bathrooms: {homes['bathroom']}</li>
                    <li>Year Built: {homes['year_built']}</li>
                    <li>Home Area: {homes['sqft_area']} sqft</li>
                    <li>Flooring Type: {homes['floor_type']}</li>
                    <li>Heater: {homes['heater']}</li>
                    <li>Kitchen: {homes['kitchen']}</li>
                    <li>Laundry: {homes['laundry']}</li>
                    <li>Parking Type: {homes['parking_space_type']}</li>
                    {(homes['home_type'] === "apartments") ?
                     <div>
                     <li>Lease Term: {homes['lease_term']}</li>
                     <li>Security Deposit: {homes['security_deposit']}</li>
                     </div> : <div/>}
                    </ul>
                </div>
                <h3>Schedule a visit</h3>
                <div>
                    <input type="date" className="form-control" id="date" name="date"/>
                </div>
                <br/>
                <h3>Submit an application</h3>
                <div>
                    <Link to={`/new-application/${home_id}`}><Button variant="primary" >Application</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default GridModal;
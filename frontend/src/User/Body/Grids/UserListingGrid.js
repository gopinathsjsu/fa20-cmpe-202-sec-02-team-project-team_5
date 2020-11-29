import React from 'react';
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import './UserListingGrid.css';
import { rooturl } from '../../../config/config';
import Axios from "axios";

const UserListingGrid = (props) => {
    const house = props.house;
    Axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    const deleteHome = (index) => {
        const listing_id = house[index].id;
        console.log("Deleting a listing!!!!!");
        console.log(listing_id);
        Axios.delete(`${rooturl}/listings/${listing_id}`, {validateStatus: false}).then((response) =>{
            if(response.status === 200 || response.status === 204) {
                props.setRefreshList(!props.refreshList);
            }
        });
    }
    const homeList = house.map((user, i) => {
    return (
    <div key = {house[i].id} className ='bg-light-gray dib br3 pa3 ma2 bw2 shadow-5'>
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={house[i]['images'][1].url} />
            <Card.Body>
                <Card.Title style={{ height: '2rem' }}>{house[i]['street_address'] + ', ' + house[i]['city'] + ', ' + house[i]['state'] + ' - ' + house[i]['zip_code']}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{house[i]['price']}</ListGroupItem>
                <ListGroupItem>{house[i]['bedrooms'] + 'bd | ' + house[i]['bathroom'] +'ba | ' + house[i]['sqft_area'] + ' sqft'}</ListGroupItem>
                <ListGroupItem>{house[i]['home_status']}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Button href="#" variant="primary">Edit Listing</Button>
                <br/>
                <br/>
                <Button href="#" variant="danger" onClick= {() => deleteHome(i)}>Delete Home</Button>
            </Card.Body>
        </Card>
    </div>
    );
    });
    return(
    <div>{homeList}</div>
    );
}

export default UserListingGrid;
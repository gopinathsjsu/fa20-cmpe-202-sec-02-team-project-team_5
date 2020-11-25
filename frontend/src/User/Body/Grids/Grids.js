import React from 'react';
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import './Grids.css';

const Grids = ({homes}) => {
    // const homeList = homes.map((user, i) => {
    // console.log(homes);
    return (
    <div key = {homes.id} className ='bg-light-gray dib br3 pa3 ma2 bw2 shadow-5'>
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src="https://photos.zillowstatic.com/fp/24b94dbb3c4e561bcb2d7b376ab99b68-p_e.jpg" />
            <Button href="#" variant="outline-danger" size="sm">Save as Favorite</Button>
            <Card.Body>
                <Card.Title style={{ height: '2rem' }}>{homes['street_address'] + ', ' + homes['city'] + ', ' + homes['state'] + ' - ' + homes['zip_code']}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{homes['price']}</ListGroupItem>
                <ListGroupItem>{homes['bedrooms'] + 'bd | ' + homes['bathroom'] +'ba | ' + homes['sqft_area'] + ' sqft'}</ListGroupItem>
                <ListGroupItem>{homes['home_status']}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Button href="#" variant="primary">View Home</Button>
            </Card.Body>
        </Card>
    </div>
    );}
    // return(
    // <div>{homeList}</div>
    // );

export default Grids;
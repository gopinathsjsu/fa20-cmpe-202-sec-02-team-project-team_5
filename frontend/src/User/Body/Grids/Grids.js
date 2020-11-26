import React, {useState, useEffect} from 'react';
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import Modal from "react-modal";
import GridModal from './GridModal'
import './Grids.css';

const Grids = ({house}) => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    console.log(house['objectID']);
    return (
        <div className ='bg-light-gray dib br3 pa3 ma2 bw2 shadow-5'>
            <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={house['images'][1]} />
                <Button href="#" variant="outline-danger" size="sm">Save as Favorite</Button>
                <Card.Body>
                    <Card.Title style={{height: '2rem'}}>{house['street_address'] + ', ' + house['city'] + ', ' + house['state'] + ' - ' + house['zip_code']}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>{house['price']}</ListGroupItem>
                    <ListGroupItem>{house['bedrooms'] + 'bd | ' + house['bathroom'] +'ba | ' + house['sqft_area'] + ' sqft'}</ListGroupItem>
                    <ListGroupItem>{house['home_status']}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button onClick={toggleModal} variant="primary">View Home</Button>
                </Card.Body>
            </Card>
            <Modal isOpen={isOpen} overlayClassName="myoverlay" onRequestClose={toggleModal} ariaHideApp={false} contentLabel="My dialog">
                <GridModal home_id = {house['objectID']}/>
                <Button variant="primary" onClick={toggleModal}>Close</Button>
            </Modal>
        </div>
    );
}

export default Grids;
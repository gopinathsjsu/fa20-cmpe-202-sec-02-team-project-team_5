import React, {useState} from 'react';
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import Modal from "react-modal";
import GridModal from './GridModal'
import './Grids.css';
import PropTypes from 'prop-types';

const Grids = (props) => {
    let house  = props.hit;
    const [isOpen, setIsOpen] = React.useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    console.log(house['objectID']);
    return (
        <div className =''>
            <Card>
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
                <GridModal house_info = {house} home_id = {house['objectID']}/>
                <br/>
                <Button variant="primary" onClick={toggleModal}>Close</Button>
            </Modal>
        </div>
    );
}

Grids.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default Grids;

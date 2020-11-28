import React from 'react';
import { ListGroup, ListGroupItem, Card, Button, Alert } from 'react-bootstrap';
import Modal from "react-modal";
import GridModal from './GridModal'
import './Grids.css';
import PropTypes from 'prop-types';
import { rooturl } from '../../../config/config';
import Axios from 'axios';

const Grids = (props) => {
    let house  = props.hit;
    const [isOpen, setIsOpen] = React.useState(false);
    let handleFavorite = () => {
        let formData = {
            'listing_id': parseInt(house['objectID']),
        }
        Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        Axios.post(`${rooturl}/favorites/listing/`, formData,{ validateStatus: false })
        .then((response) => {
            if (response.status === 200 || response.status === 204) {
                setFavourite(<Alert variant="success">Marked as favourite!</Alert>)
            }
        });
    };
    const [favorite,setFavourite] = React.useState(<Button onClick={handleFavorite} variant="outline-danger" size="sm">Save as Favorite</Button>);
    function toggleModal() {
        setIsOpen(!isOpen);
    }
    return (
        <div className =''>
            <Card>
                <Card.Img variant="top" src={house['images'][1]} />
                {localStorage.getItem('email') ? (
                    favorite
                ) : ('')}
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

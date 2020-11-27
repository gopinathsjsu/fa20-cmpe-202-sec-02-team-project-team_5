import React, { useState, useEffect } from "react";
import { rooturl } from "../../config/config";
import { ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap';
import './ViewListings.css'

function ViewListings(props) {
  const [homes, setHomes] = useState([]);
  useEffect(() => {
    fetch("https://home-finder-backend-staging.herokuapp.com/listings/19")
      .then((response) => response.json())
      .then((data) => setHomes(data));
  }, []);
  console.log(homes['images'] && homes['images'][0].url);
  return (
    <div className = "grid">
      <Card>
        <Card.Img variant="top" src={homes['images'] && homes['images'][0].url}/>
        <Button href="#" variant="outline-danger" size="sm">
          Save as Favorite
        </Button>
        <Card.Body>
          <Card.Title style={{ height: "2rem" }}>
            {homes["street_address"] +
              ", " +
              homes["city"] +
              ", " +
              homes["state"] +
              " - " +
              homes["zip_code"]}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{homes["price"]}</ListGroupItem>
          <ListGroupItem>
            {homes["bedrooms"] +
              "bd | " +
              homes["bathroom"] +
              "ba | " +
              homes["sqft_area"] +
              " sqft"}
          </ListGroupItem>
          <ListGroupItem>{homes["home_status"]}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="primary">
            View Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewListings;

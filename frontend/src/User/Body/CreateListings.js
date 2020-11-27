import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Axios from "axios";
import { rooturl } from '../../config/config';

function CreateListings(props) {
  const [createListingsError, showCreateListingsError] = useState("");
  Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

  const apiEndpoint = rooturl + "/listings/";
  console.log(apiEndpoint);

  const handleCreateListings = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    var formattedDate = new Date(form.available_date.value).toISOString();
    const formData = {
      home_status: "available",
      country : "United States",
      parking_space_type: "open",
      lease_term : "12",
      security_deposit : "500",
      heater : "forced",
      kitchen : "granite",
      laundry : "in-unit",
      air_conditioner : "True",
      floor_type: "hardwood",
      images : ["https://photos.zillowstatic.com/fp/06a267a26fc021cac6c4204e5b5cabd4-cc_ft_768.jpg", "https://photos.zillowstatic.com/fp/f8d95bd5320fe0e7afd6959cef180660-cc_ft_768.jpg"],
      open_house : [ {"open_house_date" : "2020-11-24", "open_house_start_time" : "01:33:12", "open_house_end_time" : "02:33:12"}, {"open_house_date" : "2020-11-26", "open_house_start_time" : "12:33:12", "open_house_end_time" : "13:33:12"}],
      home_type: form.home_type.value,
      zip_code: form.zip_code.value,
      listing_type: form.listing_type.value,
      street_address: form.street_address.value,
      city: form.city.value,
      state: form.state.value,
      description: form.description.value,
      price: form.price.value,
      bedrooms: form.bedrooms.value,
      bathroom: form.bathroom.value,
      sqft_area: form.sqft_area.value,
      year_built: form.year_built.value,
      available_date: formattedDate,
    };
    console.log(formData);
    Axios.defaults.withCredentials = true;

    Axios.post(apiEndpoint, formData,{ validateStatus: false })
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        showCreateListingsError(<Alert variant="success">Your listing has been posted successfully</Alert>);
      }
      else{
        let errors = Object.values(response.data || {'error' : ['Something went wrong']});
        showCreateListingsError(errors.map(error => {
          return <Alert variant="danger">{error}</Alert>
        }));
      }
    });
  };

  return (
      <Form onSubmit={handleCreateListings}>
        {createListingsError}
        <Form.Group>
          <Form.Check
            inline
            type="radio"
            name="listing_type"
            value="sale"
            aria-label="radio 1"
            label="Sale"
          />
          <Form.Check
            type="radio"
            inline
            name="listing_type"
            value="rent"
            aria-label="radio 1"
            label="Rent"
          />
        </Form.Group>
        <Form.Group controlId="formBasicType">
          <Form.Label>House Type</Form.Label>
          <Form.Control
            type="text"
            name="home_type"
            placeholder="Apartment or Single Family House"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Property Address</Form.Label>
          <Form.Control
            type="text"
            name="street_address"
            placeholder="Address"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="City"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            placeholder="State"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicZipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="number"
            name="zip_code"
            placeholder="Zip Code"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Property Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Property Description"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPrice">
          <Form.Label>Lising Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Listing Price"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicYear">
          <Form.Label>Year Built</Form.Label>
          <Form.Control
            type="number"
            name="year_built"
            placeholder="Year Built"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicBedrooms">
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control
            type="number"
            name="bedrooms"
            placeholder="Number of Bedrooms"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicBathrooms">
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control
            type="number"
            name="bathroom"
            placeholder="Number of Bathrooms"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicArea">
          <Form.Label>Lising Area</Form.Label>
          <Form.Control
            type="number"
            name="sqft_area"
            placeholder="Listing Area in sqft"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Available Date</Form.Label>
          <Form.Control
            type="date"
            name="available_date"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" block>
          Submit
        </Button>
      </Form>
  );
}

export default CreateListings;
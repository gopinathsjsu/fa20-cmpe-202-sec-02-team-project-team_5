import React, { useState, Fragment } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Modal from "react-modal";
import Axios from "axios";
import { rooturl } from "../../config/config";
import "./CreateListings.css";

function CreateListings(props) {
  const [createListingsError, showCreateListingsError] = useState("");
  const [inputFields, setInputFields] = useState([
    { open_house_date: "", open_house_start_time: "", open_house_end_time: "" },
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  Axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      open_house_date: "",
      open_house_start_time: "",
      open_house_end_time: "",
    });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    console.log("index: " + index);
    if (index !== 0) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    console.log(event.target.name);
    if (event.target.name === "open_house_date") {
      values[index].open_house_date = event.target.value;
    } else if (event.target.name === "open_house_start_time") {
      values[index].open_house_start_time = event.target.value;
    } else {
      values[index].open_house_end_time = event.target.value;
    }
    setInputFields(values);
    console.log(values);
  };

  const apiEndpoint = rooturl + "/listings/";

  const handleCreateListings = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // var formattedDate = new Date(form.available_date.value).toISOString();
    var lease = null;
    var deposit = null;
    if (form.lease_term.value !== "") {
      lease = form.lease_term.value;
    }
    if (form.security_deposit.value !== "") {
      deposit = form.lease_term.value;
    }
    const formData = {
      home_status: form.home_status.value,
      country: "United States",
      parking_space_type: form.parking_space_type.value,
      lease_term: lease,
      security_deposit: deposit,
      heater: form.heating.value,
      kitchen: form.kitchen.value,
      laundry: form.laundry.value,
      air_conditioner: form.air_conditioner.value,
      floor_type: form.flooring.value,
      images: [
        "https://photos.zillowstatic.com/fp/06a267a26fc021cac6c4204e5b5cabd4-cc_ft_768.jpg",
        "https://photos.zillowstatic.com/fp/f8d95bd5320fe0e7afd6959cef180660-cc_ft_768.jpg",
      ],
      open_house: inputFields,
      home_type: form.house_type.value,
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
      available_date: form.available_date.value,
      s3_image_file_data: [form.image.files[0]]
    };
    console.log(formData);
    console.log(form.lease_term.value);

    Axios.post(apiEndpoint, formData, { validateStatus: false }).then(
      (response) => {
        console.log(response);
        if (response.status === 201) {
          showCreateListingsError(
            <Alert variant="success">
              Your listing has been posted successfully
            </Alert>
          );
          toggleModal();
        } else {
          let errors = Object.values(
            response.data || { error: ["Something went wrong"] }
          );
          showCreateListingsError(
            errors.map((error) => {
              return <Alert variant="danger">{error}</Alert>;
            })
          );
        }
      }
    );
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="listings-form">
      <h2>Create a New Listing</h2>
      <br />
      <Form onSubmit={handleCreateListings}>
        {createListingsError}
        <Form.Group>
          <Form.Label>Listing Type </Form.Label>
          <br />
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
        <Form.Group controlId="HouseType">
          <Form.Label>House Type</Form.Label>
          <Form.Control as="select" name="house_type">
            <option value="houses">Houses</option>
            <option value="apartments">Apartments</option>
            <option value="condos">Condos</option>
            <option value="multi-family">Multi-Family</option>
            <option value="townhomes">Town Homes</option>
            <option value="single-family-home">Single Family Homes</option>
            <option value="single-family-detached">
              Single Family Detached Homes
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="HouseType">
          <Form.Label>House Status</Form.Label>
          <Form.Control as="select" name="home_status">
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="rented">Rented</option>
            <option value="sold">Sold</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Image Upload</Form.Label>
          <Form.File name ="image" id="custom-file" label="Upload Images" custom />
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
          <Form.Control type="text" name="city" placeholder="City" required />
        </Form.Group>
        <Form.Group controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" name="state" placeholder="State" required />
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
        <Form.Group controlId="FlooringType">
          <Form.Label>Flooring Type</Form.Label>
          <Form.Control as="select" name="flooring">
            <option value="carpet">Carpet</option>
            <option value="hardwood">Hardwood</option>
            <option value="laminate">Laminate</option>
            <option value="concrete">Concrete</option>
            <option value="tile">Tile</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="KitchenType">
          <Form.Label>Kitchen</Form.Label>
          <Form.Control as="select" name="kitchen">
            <option value="granite">Granite</option>
            <option value="quartz">Quartz</option>
            <option value="open-kitchen">Open Kitchen</option>
            <option value="closed-kichen">Closed Kitchen</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="ParkingType">
          <Form.Label>Parking Space Type</Form.Label>
          <Form.Control as="select" name="parking_space_type">
            <option value="garage-attached">Attached Garage</option>
            <option value="garage-detached">Detached Garage</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="on-street">Street</option>
            <option value="carport">Carport</option>
            <option value="none">None</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Air Conditioning</Form.Label>
          <br />
          <Form.Check
            inline
            type="radio"
            name="air_conditioner"
            value="true"
            aria-label="radio 1"
            label="Cental AC"
          />
          <Form.Check
            type="radio"
            inline
            name="air_conditioner"
            value="false"
            aria-label="radio 1"
            label="No AC"
          />
        </Form.Group>
        <Form.Group controlId="HeatingType">
          <Form.Label>Heating</Form.Label>
          <Form.Control as="select" name="heating">
            <option value="centralized">Centralized</option>
            <option value="gas">Gas</option>
            <option value="none">None</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="LaundryType">
          <Form.Label>Laundry</Form.Label>
          <Form.Control as="select" name="laundry">
            <option value="washer-dryer">Washer and Dryer</option>
            <option value="washer-only">Washer Only</option>
            <option value="none">None</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Available Date</Form.Label>
          <Form.Control type="date" name="available_date" required />
        </Form.Group>
        <Form.Group controlId="formBasicArea">
          <Form.Label>Lease Term (If Applicable)</Form.Label>
          <Form.Control
            type="text"
            name="lease_term"
            placeholder="Lease Term"
          />
        </Form.Group>
        <Form.Group controlId="formBasicArea">
          <Form.Label>Security Deposit (If Applicable)</Form.Label>
          <Form.Control
            type="text"
            name="security_deposit"
            placeholder="Security Deposit"
          />
        </Form.Group>
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Open House Date(If Applicable)</Form.Label>
              <Form.Control
                type="date"
                name="open_house_date"
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTime">
              <Form.Label>Open House Start Time(If Applicable)</Form.Label>
              <Form.Control
                type="time"
                name="open_house_start_time"
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTime">
              <Form.Label>Open House End Time(If Applicable)</Form.Label>
              <Form.Control
                type="time"
                name="open_house_end_time"
                onChange={(event) => handleInputChange(index, event)}
              />
            </Form.Group>
            <button
              className="btn btn-link"
              type="button"
              onClick={() => handleAddFields()}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-link"
              type="button"
              onClick={() => handleRemoveFields(index)}
            >
              {" "}
              Remove{" "}
            </button>
          </Fragment>
        ))}
        <Button variant="primary" type="submit" block>
          {" "}
          Submit{" "}
        </Button>
      </Form>
      <Modal
        style={customStyles}
        isOpen={isOpen}
        overlayClassName="myoverlay"
        onRequestClose={toggleModal}
        ariaHideApp={false}
        contentLabel="My dialog"
      >
        <div className="modal-listing">
          <Alert>{createListingsError}</Alert>
          <br />
          <Button
            className="listing-button"
            variant="primary"
            href="/view-listings"
          >
            View Listings
          </Button>
          <br />
          <br />
          <Button
            className="listing-button"
            variant="primary"
            href="/create-listings"
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateListings;

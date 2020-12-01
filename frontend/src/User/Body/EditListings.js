import React, { useState, useEffect, Fragment } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import Modal from "react-modal";
import Axios from "axios";
import { rooturl } from "../../config/config";
import "./CreateListings.css";
import ListingsForm from "./ListingsForm";

function EditListings(props) {
  const [homes, setHomes] = useState([]);
  const [createListingsError, showCreateListingsError] = useState("");
  const listing_id = props.match.params.id;
  const [inputFields, setInputFields] = useState([
    { open_house_date: "", open_house_start_time: "", open_house_end_time: "" },
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  Axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  const listingApiEndpoint = rooturl + "/listings/" + listing_id;
  useEffect(() => {
    Axios.get(listingApiEndpoint, { validateStatus: false }).then(
      (response) => {
        if (response.status === 200) {
          if (response.data) {
            setHomes(response.data);
          }
        }
      }
    );
  }, []);

  console.log("+++++++++++++++++");
  console.log(homes);
  console.log("+++++++++++++++++");


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
      // s3_image_file_data: [form.image.files[0]]
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
    <div>
      <h2>Edit listing</h2>
      <div className="create-listings">
        <div className="create-listings-form">
          <ListingsForm handleCreateListings={handleCreateListings} homes={homes} />
        </div>
        {/* <div className="open-house">
          <p>
            <strong>Open House Details</strong>
          </p>
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
        </div> */}
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
    </div>
  );
}

export default EditListings;

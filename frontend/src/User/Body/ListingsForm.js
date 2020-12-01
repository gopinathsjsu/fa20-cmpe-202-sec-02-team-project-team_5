import React from "react";
import { Form, Button } from "react-bootstrap";
import "./ListingsForm.css";

function ListingsForm({ handleCreateListings, homes }) {
  if(homes !== undefined){
    console.log("coming from Listing from");
    console.log(homes);
  }
  else {
    console.log("Homes are undefined");
  }
  return (
    <div>
      <Form className="listings-form" onSubmit={handleCreateListings}>
        <div className="listings-form-1">
          <Form.Group className="form-1 listing">
            <Form.Label>Listing Type</Form.Label>
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
          <Form.Group controlId="HouseType" className="form-1">
            <Form.Label>House Type</Form.Label>
            <Form.Control as="select" name="house_type">
              <option selected="selected">{(homes === undefined) ? "": homes['home_type']}</option>
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
          <Form.Group controlId="HouseStatus" className="form-1">
            <Form.Label>House Status</Form.Label>
            <Form.Control as="select" name="home_status">
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form-1">
            <Form.Label>Image Upload</Form.Label>
            <Form.File name="image" id="formcheck-api-regular" multiple />
          </Form.Group>
          <Form.Group controlId="formBasicAddress" className="form-1">
            <Form.Label>Property Address</Form.Label>
            <Form.Control
              type="text"
              name="street_address"
              defaultValue = {(homes === undefined) ? "": homes['street_address']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity" className="form-1">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              name="city" 
              defaultValue = {(homes === undefined) ? "" : homes['city']}
              required />
          </Form.Group>
          <Form.Group controlId="formBasicState" className="form-1">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              defaultValue = {(homes === undefined) ? "" : homes['state']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicZipCode" className="form-1">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              name="zip_code"
              defaultValue = {(homes === undefined) ? "" : homes['zip_code']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription" className="form-1">
            <Form.Label>Property Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              defaultValue = {(homes === undefined) ? "" : homes['description']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice" className="form-1">
            <Form.Label>Lising Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              defaultValue = {(homes === undefined) ? "" : homes['price']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicYear" className="form-1">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="number"
              name="year_built"
              defaultValue = {(homes === undefined) ? "" : homes['year_built']}
              required
            />
          </Form.Group>
        </div>
        <div className="listings-form-2">
          <Form.Group controlId="formBasicBedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              defaultValue = {(homes === undefined) ? "" : homes['bedrooms']}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicBathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathroom"
              defaultValue = {(homes === undefined) ? "" : homes['bathroom']}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Label>Lising Area</Form.Label>
            <Form.Control
              type="number"
              name="sqft_area"
              defaultValue = {(homes === undefined) ? "" : homes['sqft_area']}
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
              defaultValue = {(homes === undefined) ? "" : homes['lease_term']}
            />
          </Form.Group>
          <Form.Group controlId="formBasicArea">
            <Form.Label>Security Deposit (If Applicable)</Form.Label>
            <Form.Control
              type="text"
              name="security_deposit"
              defaultValue = {(homes === undefined) ? "" : homes['security_deposit']}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" block>
            {" "}
            Submit{" "}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ListingsForm;

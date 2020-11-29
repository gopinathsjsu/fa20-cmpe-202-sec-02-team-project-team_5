import React from "react";
import Grids from "./Grids";
import algoliasearch from "algoliasearch/lite";
import { appid, rooturl, searchapikey } from "../../../config/config";
import "./ListingsGrid.css";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  MenuSelect,
  Configure,
  RangeInput,
} from "react-instantsearch-dom";
import { Alert, Button, Card, Col, Collapse, Container, Form, Modal, Row } from "react-bootstrap";
import Axios from "axios";

const ListingsGrid = (props) => {
  let {type, filterParams} = props;
  const searchClient = algoliasearch(appid, searchapikey);
  let [filterState,setFilterState] = React.useState({});
  let setSearchStateChange = (searchState) =>{
    setFilterState(JSON.parse(JSON.stringify(searchState)));
  }
  let [saveSearchMsg,setSaveSearchMsg] = React.useState('');
  let handleSaveSearch = (e) => {
    e.preventDefault();
    console.log(filterState);
    let formData = {
      query_params: filterState,
      name: e.target.name.value,
    }
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    Axios.post(`${rooturl}/favorites/search/`,formData,{ validateStatus: false })
    .then((response) => {
      if (response.status === 201) {
        e.target.reset();
        setSaveSearchMsg(<Alert variant='success'>Search Saved!</Alert>);
      }
    });
  }
  const [isOpen, setIsOpen] = React.useState(false);
  let toggleModal = () => {setIsOpen(!isOpen)};
  const [showFilter, setShowFilter] = React.useState(false);
  let toggleShowFilter = () => {setShowFilter(!showFilter)};
  return (
    <div className="">
      <InstantSearch indexName="Listing" searchClient={searchClient}
      onSearchStateChange={setSearchStateChange}>
        <Configure
          hitsPerPage={9}
          filters={`listing_type:${type}`}
        />
        <Container>
          <Card>
            <Card.Body>
              <Row>
                <Col lg="4" md="6" sm="12">
                  <div className="ais-InstantSearch">
                    <SearchBox defaultRefinement={filterParams.query} />
                  </div>
                </Col>
                <Col lg="4" md="6" sm="12">
                  <span>Bedrooms&nbsp;</span>
                  <span>
                    <MenuSelect attribute="bedrooms" defaultRefinement={filterParams.menu &&filterParams.menu.bedrooms}/>
                  </span>
                </Col>
                <Col lg="4" md="6" sm="12">
                  <span>Bathrooms&nbsp;</span>
                  <span>
                    <MenuSelect attribute="bathroom" defaultRefinement={filterParams.menu &&filterParams.menu.bathroom}/>
                  </span>
                </Col>
              </Row>
              <br />
              <Row>
              <Col lg="4" md="6" sm="12">
                  <span>Home Type&nbsp;</span>
                  <span>
                    <MenuSelect attribute="home_type" defaultRefinement={filterParams.menu && filterParams.menu.home_type}/>
                  </span>
                </Col>
                <Col lg="4" md="6" sm="12">
                  <span>Price&nbsp;</span>
                  <span>
                    <RangeInput attribute={"price"} defaultRefinement={{ min: filterParams.range && filterParams.range.price && parseInt(filterParams.range.price.min), max: filterParams.range && filterParams.range.price && parseInt(filterParams.range.price.max) }}/>
                  </span>
                </Col>
                <Col lg="4" md="6" sm="12">
                  <span>Area&nbsp;</span>
                  <span>
                    <RangeInput attribute={"sqft_area"} defaultRefinement={{ min: filterParams.range && filterParams.range.sqft_area && filterParams.range.sqft_area.min, max: filterParams.range && filterParams.range.sqft_area && filterParams.range.sqft_area.max }}
                    min={filterParams.range && filterParams.range.sqft_area && filterParams.range.sqft_area.min}
                    max={filterParams.range && filterParams.range.sqft_area && filterParams.range.sqft_area.max}
                    />
                  </span>
                </Col>
                {/* <Col lg="4" md="6" sm="12">
                  <Button onClick={toggleShowFilter} variant="primary" aria-controls="example-collapse-text"
        aria-expanded={showFilter}>More filters</Button>
                </Col> */}
              </Row>
              <Row>
                <Col>
                  <Collapse in={showFilter}>
                    <div id="example-collapse-text">
                      <br/>
                      <Row >
                        <Col>
                          <Row>
                            <Col>home_status</Col>
                            <Col><MenuSelect attribute="home_status" defaultRefinement={filterParams.menu && filterParams.menu.home_status}/></Col>
                          </Row>
                          <Row>
                            <Col>zip_code</Col>
                            <Col><MenuSelect attribute="zip_code" defaultRefinement={filterParams.menu && filterParams.menu.zip_code}/></Col>
                          </Row>
                          <Row>
                            <Col>city</Col>
                            <Col><MenuSelect attribute="city" defaultRefinement={filterParams.menu && filterParams.menu.city}/></Col>
                          </Row>
                          <Row>
                            <Col>state</Col>
                            <Col><MenuSelect attribute="state" defaultRefinement={filterParams.menu && filterParams.menu.state}/></Col>
                          </Row>
                          <Row>
                            <Col>country</Col>
                            <Col><MenuSelect attribute="country" defaultRefinement={filterParams.menu && filterParams.menu.country}/></Col>
                          </Row>
                          <Row>
                            <Col>year_built</Col>
                            <Col><MenuSelect attribute="year_built" defaultRefinement={filterParams.menu && filterParams.menu.year_built}/></Col>
                          </Row>
                          <Row>
                            <Col>kitchen</Col>
                            <Col><MenuSelect attribute="kitchen" defaultRefinement={filterParams.menu && filterParams.menu.kitchen}/></Col>
                          </Row>
                          <Row>
                            <Col>laundry</Col>
                            <Col><MenuSelect attribute="laundry" defaultRefinement={filterParams.menu && filterParams.menu.laundry}/></Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </Col>
              </Row>
              <br/>
              <Row><Col>
                  <Modal show={isOpen} onHide={toggleModal} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                      <h4>Enter your filter name</h4>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={ e => handleSaveSearch(e)}>
                        {saveSearchMsg}
                        <Form.Group>
                          <Form.Control inline type="text" name='name' placeholder="Please enter the filter name" required/>
                        </Form.Group>
                        <Button variant="primary" type='submit'>Save Search</Button>{' '}
                        <Button style={{"float" : "right"}} variant="primary" onClick={toggleModal}>Close</Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button onClick={toggleShowFilter} variant="primary" aria-controls="example-collapse-text"
        aria-expanded={showFilter}>More filters</Button>{' '}
                  <Button onClick={toggleModal} variant="primary">Save Search</Button>
              </Col></Row>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Hits hitComponent={Grids} />
        <Pagination />
      </InstantSearch>
    </div>
  );
};

export default ListingsGrid;

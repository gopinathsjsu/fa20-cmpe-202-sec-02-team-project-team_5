import React, {useState, useEffect} from 'react';
import Grids from './Grids'
import algoliasearch from 'algoliasearch/lite';
import {appid, searchapikey} from '../../../config/config'
import './ListingsGrid.css';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    MenuSelect,
    Configure,
    RangeInput,
  } from 'react-instantsearch-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ListingsGrid = ({type,queryString}) => {
    
    const searchClient = algoliasearch(appid,searchapikey);
    console.log('type ' + type);
    //const[hits, setHits] = useState([]);
    // const index = searchClient.initIndex("Listing");
    //const filters = `listing_type:${type}`;

    // const homeGrids = Object.entries(hits).map(([k,v]) => {
    //     console.log(hits);
    //     if(k === 'hits'){
    //         const map = Object.entries(v).map(([key, value]) => {
    //             // console.log(value);
    //             return(
    //                 <Grids key={key} className="home-info" house={value}/>
    //             );
    //         });
    //         return map;
    //     }
    // });

    return(
        <div className="">
            <InstantSearch indexName="Listing" searchClient={searchClient}>
                {/* <div>{homeGrids}</div> */}
                <Configure hitsPerPage={9} filters={`listing_type:${type}`} query={'san francisco'} />
                <Container>
                <Card>
                    <Card.Body>
                    <Row>
                        <Col lg='4' md='6' sm='12'><div class="ais-InstantSearch"><SearchBox defaultRefinement={queryString}/></div></Col>
                        <Col lg='4' md='6' sm='12'><span>Bedrooms&nbsp;</span><span><MenuSelect attribute='bedrooms'/></span></Col>
                        <Col lg='4' md='6' sm='12'><span>Bathrooms&nbsp;</span><span><MenuSelect attribute='bathroom'/></span></Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col lg='4' md='6' sm='12'><span>Home Type&nbsp;</span><span><MenuSelect attribute='home_type'/></span></Col>
                        <Col lg='4' md='6' sm='12'><span>Price&nbsp;</span><span><RangeInput attribute={'price'}/></span></Col>
                        <Col lg='4' md='6' sm='12'><span>Area&nbsp;</span><span><RangeInput attribute={'sqft_area'}/></span></Col>
                    </Row>
                    </Card.Body>
                </Card>
                </Container>
                
                <br/>
                <Hits hitComponent={Grids} />
                <Pagination />
            </InstantSearch>
        </div>
    );
}

export default ListingsGrid;
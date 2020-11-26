import React, {useState, useEffect} from 'react';
import Grids from './Grids'
import algoliasearch from 'algoliasearch/lite';
import {appid, searchapikey} from '../../../config/config'
import './ListingsGrid.css';

const ListingsGrid = ({type}) => {
    
    const searchClient = algoliasearch(appid,searchapikey);
    const[hits, setHits] = useState([]);
    const index = searchClient.initIndex("Listing");
    const filters = `listing_type:${type}`;

    useEffect(() =>{
        index.search('', {filters: filters})
        .then((hits) => {setHits(hits)});
    }, []);

    const homeGrids = Object.entries(hits).map(([k,v]) => {
        console.log(hits);
        if(k === 'hits'){
            const map = Object.entries(v).map(([key, value]) => {
                // console.log(value);
                return(
                    <Grids key={key} className="home-info" house={value}/>
                );
            });
            return map;
        }
    });

    return(
    <div>{homeGrids}</div>
    );
}

export default ListingsGrid;
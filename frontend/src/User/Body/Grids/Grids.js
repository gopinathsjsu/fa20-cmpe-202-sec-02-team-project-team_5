import React from 'react';
import './Grids.css';

const Grids = ({homes}) => {
    const homeList = homes.map((user, i) => {
    return (
    <div key = {homes[i].id} className ='bg-light-gray dib br3 pa3 ma2 grow bw2 shadow-5'>
        <img alt='homes' src={`https://photos.zillowstatic.com/fp/496260a98a1fdf958bd229746ec78d73-p_e.jpg`} />
        <div className='home-info'>
            <h5>1031 Clyde Ave, Apt 603, Santa Clara, CA-95054</h5>
            <h5>{homes[i].name}</h5>
            <p>{homes[i].email}</p>
        </div>
    </div>
    );
    });
    return(
    <div>{homeList}</div>
    );
}

export default Grids;
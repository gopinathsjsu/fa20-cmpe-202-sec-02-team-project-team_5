import React, {useState, useEffect} from 'react';
import Grids from './Grids/Grids';

function Rent(props) {
  const[homes, setHomes] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setHomes(data));
  },[]);
  return (
    <div>
      <h2 style = {{color: '#000'}}>Buy Homes</h2>
      <Grids homes = {homes}></Grids>
    </div>
  );
}

export default Rent;
import React, { useState, useEffect } from "react";
import { rooturl } from "../../config/config";
import UserListingGrid from './Grids/UserListingGrid';
import './ViewListings.css';
import Axios from "axios";

function ViewListings(props) {
  const [homes, setHomes] = useState([]);
  let [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    Axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    Axios.get(`${rooturl}/listings/`, {validateStatus: false}).then((response) => {
        console.log(response.data);
        if(response.status ===200){
          if(response.data){
            setHomes(response.data)
          }
        }
      });
  }, [refreshList]);
  return(
    <div>
        <UserListingGrid house = {homes} refreshList = {refreshList} setRefreshList={setRefreshList}></UserListingGrid>
    </div>
  );
}

export default ViewListings;

  // return (
  //   <div className = "grid">
  //     <Card>
  //       <Card.Img variant="top" src={homes['images'] && homes['images'][0].url}/>
  //       <Button href="#" variant="outline-danger" size="sm">
  //         Save as Favorite
  //       </Button>
  //       <Card.Body>
  //         <Card.Title style={{ height: "2rem" }}>
  //           {homes["street_address"] +
  //             ", " +
  //             homes["city"] +
  //             ", " +
  //             homes["state"] +
  //             " - " +
  //             homes["zip_code"]}
  //         </Card.Title>
  //       </Card.Body>
  //       <ListGroup className="list-group-flush">
  //         <ListGroupItem>{homes["price"]}</ListGroupItem>
  //         <ListGroupItem>
  //           {homes["bedrooms"] +
  //             "bd | " +
  //             homes["bathroom"] +
  //             "ba | " +
  //             homes["sqft_area"] +
  //             " sqft"}
  //         </ListGroupItem>
  //         <ListGroupItem>{homes["home_status"]}</ListGroupItem>
  //       </ListGroup>
  //       <Card.Body>
  //         <Button variant="primary">
  //           View Home
  //         </Button>
  //       </Card.Body>
  //     </Card>
  //   </div>
  // );

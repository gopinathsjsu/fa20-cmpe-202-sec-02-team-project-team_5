import Axios from 'axios';
import React from 'react';
import {Table, Container,ToggleButton,ToggleButtonGroup, Button, Badge, Alert} from 'react-bootstrap'
import { rooturl } from '../../config/config';
import cloneDeep from 'lodash/cloneDeep';

function Home(props) {
  let [usersList, setUsersList] = React.useState([]);
  let [error, setError] = React.useState('');
  
  Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

  let handleUserVaildation = (user_id, status) => {
    console.log('user_id',user_id);
    console.log('status',status);
    let formData = {
      user_id : user_id,
      user_status : status
    }
    Axios.put(`${rooturl}/core/admin/update/user`,formData,{validateStatus: false}).then(response => {
      if(response.status === 201){
        setUsersList(usersList.map(list => {
          list['processed'] = false;
          return list;
        }));
        let usersListClone = cloneDeep(usersList)
        usersListClone.find(user => user.id === user_id).processed = true;
        setUsersList(usersListClone);
        setError('');
      }else{
        console.log(response.data);
        setError(<Alert variant='danger'>Something went wrong</Alert>);
      }
    });
  };
  
  React.useEffect(() =>{
    Axios.get(`${rooturl}/core/admin/users`,{validateStatus: false}).then(response => {
      console.log(response);
      if(response.status === 200){
        if(response.data){
          setUsersList(response.data.users_list.map(list => {
            list['processed'] = false;
            return list;
          }));
        }
      }
    });
  },[]);
    
  return (
    <div>
      <Container>
        {error}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Approve/Reject</th>
            </tr>
          </thead>
          <tbody>
            {!usersList.length ? (
              <tr><td colSpan={3}>No Users..</td></tr>
            ) 
            : 
            (usersList.map(user => {
              return <tr>
              <td>{user.first_name}&nbsp;{user.last_name}</td>
              <td>{user.email_id}</td>
              {user.processed ? (
                <td><Badge variant="secondary">Submitted!</Badge>  </td>
              ) : (
                <td><Button onClick={e => handleUserVaildation(user.id,1)}variant="success">Approve</Button>{' '}
                <Button onClick={e => handleUserVaildation(user.id,2)}variant="danger">Reject</Button></td>
              )}
            </tr>
            }))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;
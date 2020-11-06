import React from 'react';
import {Table, Container,ToggleButton,ToggleButtonGroup} from 'react-bootstrap'

function Home(props) {
  return (
    <div>
      <Container>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Approve/Reject</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Bob</td>
              <td>Bob@gmail.com</td>
              <td>
              <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
                <ToggleButton value={1}>Approve</ToggleButton>
                <ToggleButton value={2}>Reject</ToggleButton>
              </ToggleButtonGroup>
                
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Van</td>
              <td>Van@gmail.com</td>
              <td>
              <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
                <ToggleButton value={1}>Approve</ToggleButton>
                <ToggleButton value={2}>Reject</ToggleButton>
              </ToggleButtonGroup>
                
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;
import React, { Component } from 'react';
import Users from './components/users';

  class App extends Component {
      constructor(props){
      super(props);
      this.state = {
        users: []
      }
    }
    componentDidMount() {
      const apiUrl = "http://127.0.0.1:7000/api/user/"
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({users: data}));
    }
    render() {
      return (
          <Users users={this.state.users} />
        )
    }
  }
  export default App;

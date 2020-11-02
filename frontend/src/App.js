import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom'
import User from './User';
import Admin from './Admin';
import React from 'react'
export const DataContext = React.createContext({});
export const useDataContext = () => React.useContext(DataContext);

const initialState = {logggedIn : false,
}

function App() {
  const [data, setData] = React.useState(initialState);
  return (
    <DataContext.Provider value={{ data, setData }}>
      <div className="App">
        <Router>
          {localStorage.getItem('userType') === 'admin' ? (
            <Admin/>
          ) : (
            <User/>
          )}
        </Router>
      </div>
    </DataContext.Provider>
  );
}

export default App;

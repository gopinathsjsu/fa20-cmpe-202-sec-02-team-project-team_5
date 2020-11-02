import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDataContext } from './../../App';

const SignOut = () => {
  const {data,setData} = useDataContext();
  localStorage.removeItem('email');
  localStorage.removeItem('userType');
  setData({...data,logggedIn: true});
  return <Redirect to={`/sign-in`} />;
};

export default SignOut;
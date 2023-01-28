import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset, businessLogout } from '../features/businesses/businessSlice';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { businessUser } = useSelector((state) => state.businesses);

  useEffect(() => {
    if (!businessUser) {
      navigate('/');
    }
  }, [businessUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(businessLogout());
    dispatch(reset());
    console.log('logout');
    console.log(businessUser);
  };

  console.log('BUSINESSUSER ', businessUser);
  return (
    <>
      <h1>UNDER CONSTRUCTION</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
};

export default BusinessDashboard;

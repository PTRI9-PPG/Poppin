import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BusinessDashboard = () => {
  const { businessUser } = useSelector((state) => state.businesses);

  console.log('BUSINESSUSER ', businessUser);
  return <h1>UNDER CONSTRUCTION</h1>;
};

export default BusinessDashboard;

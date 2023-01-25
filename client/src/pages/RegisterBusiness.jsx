import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterBusiness = () => {
  const { selectedBusiness } = useSelector((state) => state.businesses);
  console.log('selected business ', selectedBusiness);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    maxCapacity: '',
    businessImage: '',
    phoneNumber: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('woohoo');
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='businessName'
        id='businessName'
        name='businessName'
        placeholder='businessName'
        required={true}
        onChange={onChange}
      />
      <input
        type='maxCapacity'
        id='maxCapacity'
        name='maxCapacity'
        placeholder='maxCapacity'
        required={true}
        onChange={onChange}
      />
      <input
        type='businessImage'
        id='businessImage'
        name='businessImage'
        placeholder='Image URL'
        required={true}
        onChange={onChange}
      />
      <input
        type='phoneNumber'
        id='phoneNumber'
        name='phoneNumber'
        placeholder='phoneNumber'
        required={true}
        onChange={onChange}
      />
      <button type='submit' className='button'>
        Submit
      </button>
    </form>
  );
};

export default RegisterBusiness;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerBusiness, reset } from '../features/businesses/businessSlice';

const RegisterBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBusiness,
    // isLoading,
    isSuccess,
    isError,
    businessUser,
    message,
  } = useSelector((state) => state.businesses);

  useEffect(() => {
    if (isSuccess || businessUser) {
      navigate('/businessDashboard');
    }

    if (isError) {
      window.alert(message);
    }
    dispatch(reset());
  }, [isSuccess, businessUser, isError]);
  console.log('selected business ', selectedBusiness);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessImage: '',
    phoneNumber: '',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('woohoo');

    const businessData = { businessName, businessImage, phoneNumber, location };
    dispatch(registerBusiness(businessData));
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   username,
  //   businessname,**
  //   email,
  //   password,
  //   location,**
  //   poppinscore,
  //   maxcapacity,
  //   currentcapacity,
  //   latitude,
  //   longitude,
  //   image,**
  //   phonenumber,**
  //   incentive,
  //   currentcode: 'felix',
  //   codestouse: generatedCodes,
  //   storedcodes: [],
  // });

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
      <input
        type='location'
        id='location'
        name='location'
        placeholder='location'
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

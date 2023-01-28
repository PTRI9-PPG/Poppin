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
  }, [dispatch, isSuccess, businessUser, isError]);
  // console.log('selected business ', selectedBusiness);
  const [businessInfo, setBusinessInfo] = useState({
    businessname: '',
    image: '',
    phonenumber: '',
    location: '',
  });

  const { businessname, image, phonenumber, location } = businessInfo;
  console.log('SELECTED BUSINESS ', selectedBusiness);
  const handleSubmit = (e) => {
    e.preventDefault();
    const businessData = {
      email: selectedBusiness.email,
      password: selectedBusiness.password,
      businessname,
      image,
      phonenumber,
      location,
    };
    console.log('businessDATA', businessData);
    dispatch(registerBusiness(businessData));
  };

  const onChange = (e) => {
    setBusinessInfo((prev) => ({
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
        type="text"
        id="businessname"
        name="businessname"
        placeholder="businessname"
        required={true}
        value={businessname}
        onChange={onChange}
      />
      <input
        type="text"
        id="image"
        name="image"
        placeholder="Image URL"
        required={true}
        value={image}
        onChange={onChange}
      />
      <input
        type="text"
        id="phonenumber"
        name="phonenumber"
        placeholder="phonenumber"
        required={true}
        value={phonenumber}
        onChange={onChange}
      />
      <input
        type="text"
        id="location"
        name="location"
        placeholder="location"
        required={true}
        value={location}
        onChange={onChange}
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default RegisterBusiness;

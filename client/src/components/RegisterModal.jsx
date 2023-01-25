import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import {
  initialRegisterBusiness,
  setSelectedBusiness,
} from '../features/businesses/businessSlice';

function RegisterModal({ setShowReg }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const { email, password, password2 } = formData;

  const { isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const { isSuccess: businessSuccess, selectedBusiness } = useSelector(
    (state) => state.businesses
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    if (businessSuccess) {
      navigate('/registerBusiness');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      window.alert('passwords do not match');
    }
    const userInfo = { email, password };
    if (isChecked) {
      dispatch(register(userInfo));
    } else {
      dispatch(initialRegisterBusiness(userInfo));
      dispatch(setSelectedBusiness(userInfo));
      console.log('selected business ', selectedBusiness);
    }
  };

  const handleClick = () => {
    setShowReg(false);
  };

  return (
    <>
      <div className='authPrompt'>
        <div onClick={handleClick}>
          <AiOutlineCloseCircle />
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='email'
            required={true}
            onChange={onChange}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required={true}
            onChange={onChange}
          />
          <input
            type='password'
            id='password2'
            name='password2'
            placeholder='confirm password'
            required={true}
            onChange={onChange}
          />
          <button type='submit' className='button'>
            Submit
          </button>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={() => {
              if (isChecked) {
                setIsChecked(false);
              } else {
                setIsChecked(true);
              }
              console.log(isChecked);
            }}
          />
          <p>Business?</p>
        </form>
      </div>
    </>
  );
}

export default RegisterModal;

import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
// import GoogleAuth from './GoogleAuth';
import Google from '../assets/images/google.png';
import Github from '../assets/images/github.png';
import {
  loginBusiness,
  reset as businessReset,
} from '../features/businesses/businessSlice';

const LoginModal = ({ setShowLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  //used to dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //grab state from redux
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    businessUser,
    isError: businessError,
    isSuccess: businessSuccess,
    message: businessMessage,
  } = useSelector((state) => state.businesses);

  const [isBusiness, setIsBusiness] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
      window.alert(message);
    }

    if (businessError) {
      window.alert(businessMessage);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    if (businessSuccess || businessUser) {
      navigate('/businessDashboard');
    }

    dispatch(reset());
    dispatch(businessReset());
  }, [
    user,
    businessUser,
    isError,
    businessError,
    isSuccess,
    businessSuccess,
    message,
    businessMessage,
    navigate,
    dispatch,
  ]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    if (isBusiness) {
      dispatch(loginBusiness(userData));
      console.log('business');
    } else dispatch(login(userData));
  };

  const handleClick = () => {
    setShowLogin(false);
  };

  const google = () => {
    window.open('http://localhost:3005/auth/google', '_self');
  };

  const github = () =>{
    window.open("http://localhost:3005/auth/github", "_self")
  };

  return (
    <div className='authPrompt'>
      <div onClick={handleClick}>
        <AiOutlineCloseCircle />
      </div>
      <h1 className='loginTitle'>Login</h1>
      <div className='wrapper'>
        <div className='left'>
          <div className='loginButton google' onClick={google}>
            <img src={Google} className="icon"/> Google
          </div>
          <div className='loginButton github' onClick={github}>
            <img src={Github} className="icon"/> Github
          </div>
        </div>
        <div className='center'>
          <div className='line'></div>
        </div>
        <div className='right'>
          <form onSubmit={onSubmit}>
            <input
              autoComplete='off'
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder=' Type Your Email'
              required={true}
              onChange={onChange}
            />
            <input
              autoComplete='off'
              type='password'
              id='password'
              name='password'
              placeholder='Type Your Password'
              value={password}
              required={true}
              onChange={onChange}
            />
            <button className='stdButton' type='submit'>
              Login
            </button>
            <p>Business?</p>
            <input
              type='checkbox'
              checked={isBusiness}
              onChange={() => {
                setIsBusiness(!isBusiness);
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
// import GoogleAuth from './GoogleAuth';
import Google from '../assets/images/google.png';
import Github from '../assets/images/github.png';

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
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      window.alert(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
    dispatch(login(userData));
  };

  const handleClick = () => {
    setShowLogin(false);
  };

  const google = () =>{
    window.open("http://localhost:3005/auth/google", "_self");
  };

  const github = () =>{
    window.open("http://localhost:3005/auth/github")
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
              autocomplete='off'
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder=' Type Your Email'
              required={true}
              onChange={onChange}
            />
            <input
              autocomplete='off'
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
          </form>
        </div>
      </div>
    </div>
  );
};


export default LoginModal;

import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkCode,
  getAllBusinesses,
  updateBusiness,
} from '../features/businesses/businessSlice';
import Alert from './Alert';
import { setCheckedIn } from '../features/auth/authSlice';

const CheckIn_OutModal = ({ setShowCheckinModal }) => {
  const { selectedBusiness, message } = useSelector(
    (state) => state.businesses,
  );
  const { checkedIn } = useSelector((state) => state.auth);

  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('button clicked');
    try {
<<<<<<< HEAD
      const response = dispatch(
=======
      const response = await dispatch(
>>>>>>> dev
        checkCode({ id: selectedBusiness.id, code: code }),
      );
      console.log('RESPONSEEE', response);
      if (response.payload.message === 'Code matched, new code generated') {
        dispatch(setCheckedIn(true));
        dispatch(
          updateBusiness({
            id: selectedBusiness.id,
            currentcapacity: selectedBusiness.currentcapacity,
            poppinscore: selectedBusiness.poppinscore,
          }),
        );
        dispatch(getAllBusinesses()); //not sure if still needed, check later
        // window.location.reload();
        setShowCheckinModal(false);
      } else {
        console.log('message', message);
        // window.alert('code does not match');
        setShowAlert(true);
        setInterval(() => {
          setShowAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const handleClick = () => {
    setShowCheckinModal(false);
  };

  const handleCheckin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='checkFlex'>
      <div className='checkIn'>
        <div onClick={handleClick} className='x'>
          <AiOutlineCloseCircle />
        </div>
        <h2>Ask Your Server For A Code:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            id='code'
            name='code'
            placeholder='code'
            required={true}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {showAlert ? <Alert /> : null}
          <button type='submit'>Check In</button>
        </form>
      </div>
    </div>
  );
};

export default CheckIn_OutModal;

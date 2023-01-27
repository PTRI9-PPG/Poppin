import React, { useState, useEffect } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCheckedIn } from '../features/auth/authSlice';
import { setSelectedBusiness } from '../features/businesses/businessSlice';
import Fillimg from '../assets/images/beer-loop.gif';

const CheckinDetails = () => {
  const navigate = useNavigate();
  const { selectedBusiness } = useSelector((state) => state.businesses);
  const [image, setImage] = useState(null);
  const [addy, setAddy] = useState(null);

  const { checkedIn } = useSelector((state) => state.auth);

  useEffect(() => {}, []);
  setTimeout(() => {
    setImage(selectedBusiness.photos[0].getUrl());
    setAddy(selectedBusiness.vicinity);
  }, 0);

  const random = Math.floor(Math.random() * (100 - 21 + 1) + 21);

  const dispatch = useDispatch();
  const handleCheckOut = (e) => {
    e.preventDefault();
    dispatch(setSelectedBusiness(null));
    dispatch(setCheckedIn(false));
    console.log('checked out!');
    navigate('/home');
  };
  console.log('SELECTED BUSINESS ', selectedBusiness);
  //below, data needs to be mapped to multiple cards and rendered for each card checked in
  return (
    <>
      <div className='checkInContainer'>
        {!checkedIn ? (
          <div className='notChecked'>
            <h3>You are not currently checked in anywhere...</h3>
            <img src={Fillimg} alt='' />
          </div>
        ) : (
          <div className='checkInDetail'>
            <h3>Your Current Checkin Details</h3>
            <div>
              <img src={image} alt='img' />
              {/* <img src={Fillimg} alt='' /> */}
              <div>{selectedBusiness?.businessname} </div>
              <div>Address: </div>
              <div>{addy} </div>
              <div>Poppin Score</div>
              <div>
                <GiChampagneCork
                  color={random >= 20 ? '#f45d5d' : '#a1ccdcb7'}
                />
                <GiChampagneCork
                  color={random >= 40 ? '#f45d5d' : '#a1ccdcb7'}
                />
                <GiChampagneCork
                  color={random >= 60 ? '#f45d5d' : '#a1ccdcb7'}
                />
                <GiChampagneCork
                  color={random >= 80 ? '#f45d5d' : '#a1ccdcb7'}
                />
                <GiChampagneCork
                  color={random >= 100 ? '#f45d5d' : '#a1ccdcb7'}
                />
              </div>
            </div>
            <div></div>
            <button onClick={handleCheckOut}>Check Out</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckinDetails;

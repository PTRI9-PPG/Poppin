import React from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCheckedIn } from '../features/auth/authSlice';
import { setSelectedBusiness } from '../features/businesses/businessSlice';
import Fillimg from './placeHolder.png';

const CheckinDetails = () => {
  const navigate = useNavigate();
  const { selectedBusiness } = useSelector((state) => state.businesses);

  const { checkedIn } = useSelector((state) => state.auth);

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
          <h3>You are not currently checked in anywhere...</h3>
        ) : (
          <div className='checkInDetail'>
            <h3>Your Current Checkin Details</h3>
            <div>
              <img src={selectedBusiness?.image} alt='img' />
              {/* <img src={Fillimg} alt='' /> */}
              <div>{selectedBusiness?.businessname} </div>
              <div>City: </div>
              <div>{selectedBusiness?.location} </div>
              <div>Phone Number:</div>
              <div>{selectedBusiness?.phonenumber}</div>
              <div>Poppin Score</div>
              <div>
                <GiChampagneCork
                  color={
                    selectedBusiness?.poppinscore >= 20
                      ? '#f45d5d'
                      : '#a1ccdcb7'
                  }
                />
                <GiChampagneCork
                  color={
                    selectedBusiness?.poppinscore >= 40
                      ? '#f45d5d'
                      : '#a1ccdcb7'
                  }
                />
                <GiChampagneCork
                  color={
                    selectedBusiness?.poppinscore >= 60
                      ? '#f45d5d'
                      : '#a1ccdcb7'
                  }
                />
                <GiChampagneCork
                  color={
                    selectedBusiness?.poppinscore >= 80
                      ? '#f45d5d'
                      : '#a1ccdcb7'
                  }
                />
                <GiChampagneCork
                  color={
                    selectedBusiness?.poppinscore >= 100
                      ? '#f45d5d'
                      : '#a1ccdcb7'
                  }
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

import React from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedBusiness } from '../features/businesses/businessSlice';

const BusinessCard = ({
  businessCard,
  setShowCheckinModal,
}) => {
  const dispatch = useDispatch();
  const { checkedIn } = useSelector((state) => state.auth);
  const handleBusinessClick = (e) => {
    dispatch(setSelectedBusiness(businessCard));
    setShowCheckinModal(true);
  };

  return (
    <div className='BusinessCard'>
      <div>
        <div>
          <img src={businessCard?.image} alt='img' />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
        </div>
        <div className='cardInfo'>
          <div>
            <div className='bussName'>{businessCard?.businessname}</div>
            <div className='loc'>{businessCard?.location}</div>
            <div className='phone'> Phone Number: </div>
            <div className='phoneNum'>{businessCard?.phonenumber}</div>
            <div>
              <div>Deal: {businessCard?.incentive}</div>
              {/* the question mark is needed as it AWAITS for the data to populate */}
              <div className='score'>
                <div>Poppin Score:</div>
                <div>
                  <GiChampagneCork
                    color={
                      businessCard?.poppinscore >= 20 ? '#f45d5d' : '#a1ccdcb7'
                    }
                  />
                  <GiChampagneCork
                    color={
                      businessCard?.poppinscore >= 40 ? '#f45d5d' : '#a1ccdcb7'
                    }
                  />
                  <GiChampagneCork
                    color={
                      businessCard?.poppinscore >= 60 ? '#f45d5d' : '#a1ccdcb7'
                    }
                  />
                  <GiChampagneCork
                    color={
                      businessCard?.poppinscore >= 80 ? '#f45d5d' : '#a1ccdcb7'
                    }
                  />
                  <GiChampagneCork
                    color={
                      businessCard?.poppinscore >= 100 ? '#f45d5d' : '#a1ccdcb7'
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* This need to change only when check in or out is confirmed */}
          {!checkedIn ? (
            <button onClick={handleBusinessClick}>Check In</button>
          ) : (
            // FIX LATER TO : checked in card has checkout button but the rest have no button when checked out
            // <button className='checkinButton' onClick={handleBusinessClick}>
            //   Check out
            // </button>
            <button>
              Already <br /> Checked In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;

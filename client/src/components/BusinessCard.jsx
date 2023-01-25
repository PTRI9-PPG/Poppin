import React, { useState, useEffect } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import barPromotions from '../features/businesses/util'

const BusinessCard = ({ businessCard, setShowCheckinModal }) => {
  const [image, setImage] = useState(null);
  const [addy, setAddy] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const { checkedIn } = useSelector((state) => state.auth);
  const handleBusinessClick = (e) => {
    dispatch(setSelectedBusiness(businessCard));
    setShowCheckinModal(true);
  };

  

  const promo = barPromotions[Math.floor(Math.random() * 20)];

  const random = Math.floor(Math.random() * (100 - 21 + 1) + 21);

  setTimeout(() => {
    setImage(businessCard.photos[0].getUrl());
    setAddy(businessCard.vicinity);
  }, 0);

  console.log(businessCard);

  return (
    <div className='BusinessCard'>
      <div>
        <div>
          <img src={image ? image : null} alt='img' />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
        </div>
        <div className='cardInfo'>
          <div>
            <div className='bussName'>{businessCard?.businessname}</div>
            <div className='loc'>{addy}</div>
            <div>
              <div>Deal: {promo}</div>
              {/* the question mark is needed as it AWAITS for the data to populate */}
              <div className='score'>
                <div>Poppin Score:</div>
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

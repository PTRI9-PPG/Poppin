import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BusinessCard from './BusinessCard';

const BusinessCardContainer = ({
  showCheckinModal,
  setShowCheckinModal,
  bars,
}) => {
  const dispatch = useDispatch();

  console.log(bars);

  useEffect(() => {
    //fetching all businesses from backend
    // dispatch(getAllBusinesses());
  }, []); //If you remove the dispatch from the dependency array, the useEffect hook will run on every render of BusinessCardContainer, bad for performance

  return (
    <>
      <ul className='businessCardContainer'>
        {/* mapping through array of businesses and passing it through prop to be used in BusinessCard*/}
        {bars.map((businessCard) => (
          <BusinessCard
            key={businessCard.place_id}
            businessCard={businessCard}
            showCheckinModal={showCheckinModal}
            setShowCheckinModal={setShowCheckinModal}
          />
        ))}
      </ul>
    </>
  );
};

export default BusinessCardContainer;

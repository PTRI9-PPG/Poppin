import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import CardContainer from '../components/BusinessCardContainer';
import CheckIn_OutModal from '../components/CheckIn_OutModal';
import corkMarker from '../assets/images/corkMarker';

import API_KEY from '../../key';
import {
  MarkerF,
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Dashboard = () => {
  //intialize state for map and searchbox
  //state is mainly to reference map and searchbox components so we can use methods under the hood
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [bars, setBars] = useState([]);
  const { user } = useSelector((state) => state.auth);
  //show modal for entering checkin code
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const navigate = useNavigate();

  //Upon rendering, ensure that the map loads with the client's location
  useEffect(() => {}, []);

  //when user is falsey and routes aren't protected, temp link to dashboard will redirect to landing page
  // useEffect(() => {
  //   if (!user) {
  //     console.log('user', user);
  //     navigate('/');
  //   }
  // }, [user]);

  //determine if loaded or not
  //useJsApiLoader will leverage the api loader from google to make the request to the API
  //don't use loadscript if using useJSApiLoader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places'],
  });

  //This is required otheriwse, map won't render
  const containerStyle = {
    width: '65vw',
    height: 'calc(100vh - 4.12em)',
    overflow: 'hidden',
  };

  const getAllCoordinates = async () => {
    try {
      const allBars = bars;
      const latLngArr = [];
      console.log(allBars);

      allBars.forEach((bar) => {
        console.log(
          'lat: ',
          bar.geometry.location.lat(),
          'lng: ',
          bar.geometry.location.lng(),
        );
        latLngArr.push({
          lat: parseFloat(bar.geometry.location.lat()),
          lng: parseFloat(bar.geometry.location.lng()),
          id: place_id,
        });
      });
      console.log(latLngArr);
      return latLngArr;
    } catch (error) {
      console.log(error);
    }
  };

  const createMarkers = async () => {
    const coordinatesArr = await getAllCoordinates();
    const markersArr = coordinatesArr.map((element) => {
      return (
        <MarkerF
          position={{ lat: element.lat, lng: element.lng }}
          animation={2}
          key={element.id}
          icon={{
            url: corkMarker,
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      );
    });

    return markersArr;
  };

  //Move the map to the query location provided in the searchbox
  const onPlacesChanged = async () => {
    const places = await searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    const location = {
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
    };

    const request = {
      location,
      radius: '1500',
      type: ['bar'],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (res, stat) => {
      if (stat === google.maps.places.PlacesServiceStatus.OK) {
        console.log(res);
        setBars(res);
      }
    });

    bounds.union(places[0].geometry.viewport);
    map.fitBounds(bounds);
    setMarkers(await createMarkers());
    setSearched(true);
    setShowCards(true);
  };

  //set the reference object to the searchbox state upon the searchbox component rendering
  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  //set the reference object to the map state upon the GoogleMap component rendering
  const onMapLoad = (ref) => {
    setMap(ref);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('zip code submitted');
  };

  // removed current location button since it's not imperative for an MVP
  // const handleCurrentLoc = (e) => {
  //   e.preventDefault();
  //   console.log('current location requested');
  // };

  return isLoaded ? (
    <>
      <div className='Dashboard'>
        <Header className='header' />
        <StandaloneSearchBox
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <form
            onSubmit={handleSubmit}
            className='search'
            style={
              searched
                ? {
                    zIndex: 1,
                    position: 'fixed',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: '2em',
                    height: '20em',
                    width: '20em',
                  }
                : {
                    left: '25vw',
                    top: '35vh',
                    width: '45vw',
                  }
            }
          >
            <input
              type='text'
              placeholder={
                searched ? 'Address' : 'Where Would You Like to Search?'
              }
            />
            {/* Deactivated since selecting on map is submitting */}
            {/* <button className='stdButton' type='submit'>
                  Submit
                </button> */}
          </form>
        </StandaloneSearchBox>
        <main style={{ filter: searched ? 'none' : 'blur(5px)' }}>
          {' '}
          {/*  max width 1100px margin 0 auto */}
          {/* User Location form section */}
          <div>
            <h3>Select a location:</h3>
            {/* removed current location button since it's not imperative for an
          MVP
          <form onSubmit={handleCurrentLoc}>
            <button className='stdButton' type='submit'>
            </button>
          </form>
          <h3>OR</h3> */}
          </div>
          {/* End User Form Section */}
          {/* Map section */}
          <div
            className='MapContainer'
            style={{ filter: searched ? 'none' : 'blur(5px)' }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={14}
              onLoad={onMapLoad}
            >
              {markers}
            </GoogleMap>
          </div>
          {/* End Map section */}
          {/* pic - <address / phone > <poppin score/ incentive>  <checkin>*/}
          {showCards ? (
            <CardContainer
              setShowCheckinModal={setShowCheckinModal}
              showCheckinModal={showCheckinModal}
            />
          ) : null}
        </main>
      </div>
      {showCheckinModal ? (
        <CheckIn_OutModal setShowCheckinModal={setShowCheckinModal} />
      ) : null}
    </>
  ) : (
    ''
  );
};

export default React.memo(Dashboard);

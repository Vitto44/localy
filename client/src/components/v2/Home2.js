import React, { useState, useEffect } from 'react';
import '../Home.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Home2() {
  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const loginClick = () => {
    setIsLogin(true);
    navigate('/user-form', { isLogin });
  };

  const registerClick = () => {
    setIsLogin(false);
    navigate('/user-form', { isLogin });
  };

  // sets user's position to be passed to the Map component:
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setPosition({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <section className='homePageWrap'>
      <img
        className='whitePinLogotype'
        src={require('../../assets/white_pin.png')}
        alt='Localy Pin Icon'></img>
      <img
        className='fullLogotype'
        src={require('../../assets/white_logo_full.png')}
        alt='Localy Logotype'></img>
      <h1 className='homePageH1'>Find your local shopkeeper</h1>
      <Link className='mapLink' to={'/map'} position={position}>
        <button className='goToMapBtn'>Go to Map</button>
      </Link>
      <section className='loginSection'>
        <h2 className='homePageH2'>Are you a shop owner?</h2>
        <button className='loginBtn' onClick={loginClick}>
          Login
        </button>
        <button className='registerBtn' onClick={registerClick}>
          Register
        </button>
      </section>
    </section>
  );
}

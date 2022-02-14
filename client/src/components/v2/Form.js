import React from 'react';
import FormLogIn from './FormLogIn';
import FormRegister from './FormRegister';
import '../ShopAuth.css';

export default function Form({ isLogin }) {
  return (
    <>
      <div className='shopAuthWrap'>
        <img
          className='whitePinLogotype'
          src={require('../../assets/purple_pin.png')}
          alt='Localy Pin Icon'></img>
        <img
          className='fullLogotype'
          src={require('../../assets/purple_logo_full.png')}
          alt='Localy Logotype'></img>
        <h1 className='loginPageH1'>Introduce your login details</h1>
        {isLogin === true ? <FormLogIn /> : <FormRegister />}
      </div>
    </>
  );
}

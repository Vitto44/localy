import React, { useNavigate } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userRequest } from '../../ApiClientAxios';
import '../ShopAuth.css';

export default function FormRegister() {
  const navigate = useNavigate();
  const navigateToHome = navigate('/home');
  const navigateToLogin = navigate('/login');

  const formik = useFormik({
    intialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Ivalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      const user = await userRequest('POST', values);
      navigate('/profile', { user });
    },
  });

  return (
    <>
      <form className='loginForm' onSubmit={formik.handleSubmit}>
        <input
          className='formInput'
          name='firstName'
          onChange={formik.handleChange}
          type='text'
          value={formik.values.firstName}
          placeholder='Enter your first name'
          required
        />
        <input
          className='formInput'
          name='lastName'
          onChange={formik.handleChange}
          type='text'
          value={formik.values.lastName}
          placeholder='Enter your last name'
          required
        />
        <input
          className='formInput'
          name='email'
          onChange={formik.handleChange}
          type='text'
          value={formik.values.email}
          placeholder='Enter your e-mail'
          required
        />
        <input
          className='formInput'
          name='password'
          onChange={formik.handleChange}
          type='text'
          value={formik.values.password}
          placeholder='Enter your password'
          required
        />
        <button className='submitBtn' type='submit'>
          Register
        </button>
      </form>
      <h2 className='regFormPageH2'>I already have an account</h2>
      <button className='changeFormBtn' onClick={navigateToLogin}>
        Log In
      </button>
      <img
        className='regLocalyFormIcon'
        src={require('../assets/purple_logo_short.png')}
        alt='Localy Icon'></img>
      <button className='closeFormBtn' onClick={navigateToHome}>
        <img src={require('../assets/cross.png')} alt='Click to close' />
      </button>
    </>
  );
}

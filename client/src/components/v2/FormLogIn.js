import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userRequest } from '../../ApiClientAxios';
import '../ShopAuth.css';

export default function FormLogIn() {
  const navigate = useNavigate();
  const navigateToHome = navigate('/home');
  const navigateToRegister = navigate('/register');

  const formik = useFormik({
    intialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().password('Invalid password'),
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
          className='formInput email'
          name='email'
          onChange={formik.handleChange}
          type='email'
          value={formik.values.email}
          placeholder='Enter your email'
          required
        />
        <input
          className='formInput password'
          name='password'
          onChange={formik.handleChange}
          type='password'
          value={formik.values.password}
          placeholder='Enter your password'
          required
        />
        <button className='submitBtn' type='submit'>
          Log In
        </button>
      </form>
      <h2 className='formPageH2'>I don't have a shopkeeper account</h2>
      <button className='changeFormBtn' onClick={navigateToRegister}>
        Register
      </button>
      <img
        className='logLocalyFormIcon'
        src={require('../assets/purple_logo_short.png')}
        alt='Localy Icon'></img>
      <button className='closeFormBtn' onClick={navigateToHome}>
        <img src={require('../assets/cross.png')} alt='Click to close' />
      </button>
    </>
  );
}

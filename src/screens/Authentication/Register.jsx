import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import { RegisterNewUser } from '../../api/registerApi'
import { RegisterValidation } from '../../components/RegisterValidation';

import './Register.css';

const formData = {
  userName: '',
  userEmail: '',
  userFirstName: '',
  userLastName: '',
  userPassword: '',
  confirmPassword: '',

  addressLine: '',
  street: '',
  city: '',
  state: '',
  pincode: ''

};

const Register = () => {

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: formData,
    validationSchema: RegisterValidation,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const requestData = {
        userName: values.userName,
        userEmail: values.userEmail,
        userFirstName: values.userFirstName,
        userLastName: values.userLastName,
        userPassword: values.userPassword,
        confirmPassword: values.confirmPassword,
        address: {
          addressLine: values.addressLine,
          street: values.street,
          city: values.city,
          state: values.state,
          pincode: parseInt(values.pincode)
        }
      }
      //console.log('requestData);
       await RegisterNewUser(requestData)
        .then(response => {
        console.log('Registration succesfull' + JSON.stringify(response));
        resetForm();
        navigate('/');
        })
        .catch(error => {
          if (error.response) {
          const errormessage = error.response.data.ErrorMessage;
          alert('Error message:  ' + errormessage);
          }
          else {
           console.error('error occuured while sending the request' + error.response);
          }
        setSubmitting(false);
      });
      //console.log('final response of register' + JSON.stringify( data));
  },
});


const handleSubmit1 = () => {
  alert('submitted registration form');
}

const handleLogin1 = () => {
  navigate('/');
}

return (
  <div className='page-container'>
    <div className='register-container'>
      <div className='mini-logo' >
        <img src={require('../../assets/mini-shopper-logo.png')} alt='logo' className='img-logo' />
      </div>
      <form onSubmit={handleSubmit} className='register-form-container'>
        <Row className='row-container'>
          <Col>
            <div className='form-group'>
              <label htmlFor='userName'>Username</label>
              <input type='text' id='userName' name='userName' value={values.userName}
                placeholder='Enter your username' onChange={handleChange} onBlur={handleBlur} />
              {errors.userName && touched.userName ? (
                <p className='form-error'>{errors.userName}</p>
              ) : null}
            </div>
          </Col>
          <Col>
            <div className='form-group'>
              <label htmlFor='userEmail'>Email</label>
              <input type='text' id='userEmail' name='userEmail' value={values.userEmail}
                placeholder='Enter your email' onChange={handleChange} onBlur={handleBlur} />
              {errors.userEmail && touched.userEmail ? (
                <p className='form-error'>{errors.userEmail}</p>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='form-group'>
              <label htmlFor='userFirstName'>FirstName</label>
              <input type='text' id='userFirstName' name='userFirstName' value={values.userFirstName}
                placeholder='Enter your firstname' onChange={handleChange} onBlur={handleBlur} />
              {errors.userFirstName && touched.userFirstName ? (
                <p className='form-error'>{errors.userFirstName}</p>
              ) : null}
            </div>
          </Col>
          <Col>
            <div className='form-group'>
              <label htmlFor='userLastName'>LastName</label>
              <input type='text' id='userLastName' name='userLastName' value={values.userLastName}
                placeholder='Enter your lastname' onChange={handleChange} onBlur={handleBlur} />
              {errors.userLastName && touched.userLastName ? (
                <p className='form-error'>{errors.userLastName}</p>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='form-group'>
              <label htmlFor='userPassword'>Password</label>
              <input type='password' id='userPassword' name='userPassword' value={values.userPassword}
                placeholder='Enter your password' onChange={handleChange} onBlur={handleBlur} />
              {errors.userPassword && touched.userPassword ? (
                <p className='form-error'>{errors.userPassword}</p>
              ) : null}
            </div>
          </Col>
          <Col>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>ConfirmPassword</label>
              <input type='password' id='confirmPassword' name='confirmPassword' value={values.confirmPassword}
                placeholder='Enter your password' onChange={handleChange} onBlur={handleBlur} />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className='form-error'>{errors.confirmPassword}</p>
              ) : null}
            </div>
          </Col>
        </Row>
        <h4 style={{ marginBottom: '15px', textDecoration: 'underline', color: 'orangered',  fontFamily: 'Catamaran' }}>Address</h4>
        <Row>
          <Col>
            <div className='form-group'>
              <label htmlFor='addressLine'>AddressLine</label>
              <input type='text' id='addressLine' name='addressLine' value={values.addressLine}
                placeholder='Enter your addressLine' onChange={handleChange} onBlur={handleBlur} />
              {errors.addressLine && touched.addressLine ? (
                <p className='form-error'>{errors.addressLine}</p>
              ) : null}
            </div>
          </Col>
          <Col>
            <div className='form-group'>
              <label htmlFor='street'>Street</label>
              <input type='text' id='street' name='street' value={values.street}
                placeholder='Enter your street' onChange={handleChange} onBlur={handleBlur} />
              {errors.street && touched.street ? (
                <p className='form-error'>{errors.street}</p>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='form-group'>
              <label htmlFor='city'>City</label>
              <input type='text' id='city' name='city' value={values.city}
                placeholder='Enter your city' onChange={handleChange} onBlur={handleBlur} />
              {errors.city && touched.city ? (
                <p className='form-error'>{errors.city}</p>
              ) : null}
            </div>
          </Col>
          <Col>
            <div className='form-group'>
              <label htmlFor='state'>State</label>
              <input type='state' id='state' name='state' value={values.state}
                placeholder='Enter your state' onChange={handleChange} onBlur={handleBlur} />
              {errors.state && touched.state ? (
                <p className='form-error'>{errors.state}</p>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='form-group'>
              <label htmlFor='pincode'>Pincode</label>
              <input type='text' id='pincode' name='pincode' value={values.pincode}
                placeholder='Enter your pincode' onChange={handleChange} onBlur={handleBlur} />
              {errors.pincode && touched.pincode ? (
                <p className='form-error'>{errors.pincode}</p>
              ) : null}
            </div>
          </Col>
          <Col></Col>
        </Row>

        <button type='submit' className='register-button'>Register</button>
        <div className='signin-container'>
          <p style={{ display: 'inline', marginBottom: '1rem', marginLeft: '28px', padding: '20px', paddingRight: '10px', fontFamily: 'Catamaran' }}>Already have an account ? </p>
          <button type='button' className='signin-button' onClick={handleLogin1}>Sign In</button>
        </div>
      </form>

    </div>
    <div className='image-container'>
      <img src={require('../../assets/login-page-image.png')} alt='image' className='register-image' />
    </div>
  </div>
)
}

export default Register;

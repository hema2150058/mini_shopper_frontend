// import React, { useState } from 'react'
// import { useNavigate, NavLink } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Button, Col, Row } from 'react-bootstrap';
// import './Register.css';

// const Register = () => {

//   const [formData, setFormData] = useState({
//     userName: '',
//     userEmail: '',
//     userFirstName: '',
//     userLastName: '',
//     userPassword: '',
//     confirmPassword: '',

//     addressLine: '',
//     street: '',
//     city: '',
//     state: '',
//     pincode: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e, field) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
//   const handleSubmit = () => {
//     alert('submitted registration form');
//   }

//   const handleLogin = () => {
//     navigate('/login');
//   }

//   return (
//     <div className='page-container'>
//       <div className='register-container'>
//         <div className='mini-logo' >
//           <img src={require('../../assets/mini-shopper-logo.png')} alt='logo' className='img-logo' />
//         </div>
//         <form onSubmit={handleSubmit} className='form-container'>
//           <Row>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='userName'>Username</label>
//                 <div className='textbox'>
//                 <input type='text' id='userName' name='userName' value={formData.userName} 
//                   placeholder='Enter your username' onChange={e => handleChange(e, 'userName')} />
//                   </div>
//               </div>
//             </Col>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='userEmail'>Email</label>
//                 <input type='text' id='userEmail' name='userEmail' value={formData.userEmail}
//                   placeholder='Enter your email' onChange={e => handleChange(e, 'userEmail')} />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='userFirstName'>FirstName</label>
//                 <input type='text' id='userFirstName' name='userFirstName' value={formData.userFirstName}
//                   placeholder='Enter your firstname' onChange={e => handleChange(e, 'userFirstName')} />
//               </div>
//             </Col>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='userLastName'>LastName</label>
//                 <input type='text' id='userLastName' name='userLastName' value={formData.userLastName}
//                   placeholder='Enter your lastname' onChange={e => handleChange(e, 'userLastName')} />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='userPassword'>Password</label>
//                 <input type='text' id='userPassword' name='userPassword' value={formData.userPassword}
//                   placeholder='Enter your password' onChange={e => handleChange(e, 'userPassword')} />
//               </div>
//             </Col>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='confirmPassword'>ConfirmPassword</label>
//                 <input type='text' id='confirmPassword' name='confirmPassword' value={formData.confirmPassword}
//                   placeholder='Enter your confirmPassword' onChange={e => handleChange(e, 'confirmPassword')} />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='addressLine'>AddressLine</label>
//                 <input type='text' id='addressLine' name='addressLine' value={formData.addressLine}
//                   placeholder='Enter your addressLine' onChange={e => handleChange(e, 'addressLine')} />
//               </div>
//             </Col>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='street'>Street</label>
//                 <input type='text' id='street' name='street' value={formData.street}
//                   placeholder='Enter your street' onChange={e => handleChange(e, 'street')} />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='city'>City</label>
//                 <input type='text' id='city' name='city' value={formData.city}
//                   placeholder='Enter your city' onChange={e => handleChange(e, 'city')} />
//               </div>
//             </Col>
//             <Col>
//               <div className='form-group'>
//                 <label htmlFor='state'>State</label>
//                 <input type='state' id='state' name='state' value={formData.state}
//                   placeholder='Enter your state' onChange={e => handleChange(e, 'state')} />
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//             <div className='form-group'>
//               <label htmlFor='pincode'>Pincode</label>
//               <input type='text' id='pincode' name='pincode' value={formData.pincode}
//                 placeholder='Enter your pincode' onChange={e => handleChange(e, 'pincode')} />
//             </div>
//             </Col>
//             <Col></Col>
//           </Row>

//           <button type='submit' className='register-button'>Register</button>
//           <div>
//           <p>Already have an account ? </p>
//           <button type='button' className='signin-button' onClick={handleLogin}>Sign In</button>
//         </div>
//         </form>
        
//       </div>
//       <div className='image-container'>
//         <img src={require('../../assets/login-page-image.png')} alt='image' className='image' />
//       </div>
//     </div>
//   )
// }

// export default Register;

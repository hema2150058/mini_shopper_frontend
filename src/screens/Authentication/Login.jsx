import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, } from '@fortawesome/free-solid-svg-icons';

import { LoginUser } from '../../api/registerApi';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === '' && password === '') {
            alert('Please enter email and password. ');
            return;
        }
        else if (!email.trim() && !password.trim()) {
            setEmailError('Email is required');
            setPasswordError('Password is required');
        }
        else if (!email.trim() && password.trim()) {
            setEmailError('Email is required');
            setPasswordError('');
        }
        else if (email.trim() && !password.trim()) {
            setEmailError('');
            setPasswordError('Password is required');
        }
        else if (!email.trim()) {
            setEmailError('Email is required');
        }
        else if (!email.trim()) {
            setPasswordError('Password is required');
        }
        else {
            const userData = {
                emailId: email,
                userPassword: password
            }
            await LoginUser(userData)
                .then(response => {
                    console.log('Login is successfull ' + JSON.stringify(response));
                    localStorage.setItem('userName',response.username);
                    localStorage.setItem('token',response.jwtAuthToken);
                    alert('Login Success');
                    console.log('naviagte to products');
                    if(localStorage.getItem('userName') === 'Shopper123'){
                        navigate('/pendingOrders');
                    }else{
                    navigate('/products');
                    }
                })
                .catch(error => {
                    if (error.response) {
                        const errormessage = error.response.data.ErrorMessage;
                        alert('Error message : ' + errormessage);
                    }
                    else {
                        console.error('error occured while sending the request' + error.response);
                    }
                })

        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(showPassword ? false : true);
    }

    const handleRegister = () => {
        //alert('going to rlogi');
        navigate('/register');
    }

    return (
        <div className='page-container'>
            <div className='login-container'>
                <div className='mini-logo'>
                    <img src={require('../../assets/mini-shopper-logo.png')} alt="logo" className='img-logo' />
                </div>
                <h3 className='heading'>Let's Get Started</h3>
                <form onSubmit={handleLogin} className='login-form-container'>
                    <div className='form-group'>
                        <label className='login-label'>Email</label>
                        <div>
                        <input type='text' id='email' name='email' value={email} className='login-input'
                            placeholder='Enter your email' onChange={e => setEmail(e.target.value)}
                        />
                        {emailError ? <p>{emailError}</p> : null}
                        </div>
                        {/* will be a error msg here */}
                    </div>
                    
                    <div className='form-group'>
                        <label className='login-label'>Password</label>
                        <div className='password-input'>
                            <input type={showPassword ? 'text' : 'password'} className='login-input'
                                id='password' name='password' value={password}
                                placeholder='Enter your password' onChange={e => setPassword(e.target.value)}
                            />
                            <span className='toggleicon' onClick={togglePasswordVisibility}>{showPassword ? <FontAwesomeIcon icon={faEye} color='grey' transform='down-3'/> : <FontAwesomeIcon icon={faEyeSlash} color='grey' transform='down-3'/>}</span>
                            {passwordError ? <p>{passwordError}</p> : null}
                        </div>
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                    <div className='signup-container'>
                        <p style={{ display: 'inline', marginBottom: '1rem', marginLeft: '25px', padding: '20px', paddingRight: '10px', fontFamily: 'Catamaran', fontWeight: '500' }}>New User ?</p>
                        <button type='button' className='signup-button' onClick={handleRegister}>Sign up</button>

                    </div>
                </form>
            </div>

            <div className='image-container'>
                <img src={require('../../assets/login-page-image.png')} alt='image' className='image' />
            </div>

        </div>
    );
}
export default Login;

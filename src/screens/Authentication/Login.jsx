import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    const handleLogin = async (e) => {
        alert('success');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <div className='page-container'>
            <div className='login-container'>
                <div className='logo-conatiner'>
                    <img src={require('../../assets/mini-shopper-logo.png')} alt="logo" className='logo'/>
                </div>
                <h4 className='heading'></h4>
                <form onSubmit={handleLogin}>
                    <div className='login-data'>
                        <label>Email</label>
                        <input type='text' id='email' name='email' value={email}
                            placeholder='Enter your email id' onChange={e => setEmail(e.target.value)}
                        />
                        {/* will be a error msg here */}
                    </div>
                    <div className='login-data'>
                        <label>Password</label>
                        <input type='password' id='password' name='password' value={password}
                            placeholder='Enter your password' onChange={e => setPassword(e.target.value)}
                        />
                        {/* toggle icons for passowrd visibility
                    will be error msg here */}
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                </form>
            </div>

            <div className='image-container'></div>
            <div>
                <p>New User ? </p>
                <button type='button' className='signup-button' onClick={handleRegister}>Sign up</button>
            </div>
        </div>
    );
}
export default Login;

import React, {useState} from 'react'
import { useNavigate, NavLink } from 'react-router-dom';


const Register = () => {

  const [formdData, setFormData] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',

    addressLine:'',
    street:'',
    city:'',
    state:'',
    pincode:''
  });
  const navigate = useNavigate();

  const handleSubmit = () =>{
    alert('submitted registration form');
  }

  return (
    <div className='page-container'> 
      <div className='register-container'>
        <div className='mini-logo' >
          <img src={require('../../assets/mini-shopper-logo.png')} alt='logo' className='img-logo' />
        </div>
        <form onSubmit={handleSubmit}>
          
        </form>
      </div>
      <p>registration form</p>
    </div>
  )
}

export default Register;

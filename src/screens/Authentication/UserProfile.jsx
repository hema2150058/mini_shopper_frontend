import React, { useEffect, useState } from 'react'
import ShopperNavHeader from '../HeaderFooter/ShopperNavHeader';
import { getPersonalDetails } from '../../api/registerApi';
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import './UserProfile.css';

const UserProfile = () => {

  let userId = localStorage.getItem('userName');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getPersonalDetails(userId);
        if(response.status === 200) {
          console.log(response.data);
          console.log(response.data.address);
          setUserProfile({
            userName: response.data.userEmail,
            userEmail: response.data.userName,
            userFirstName: response.data.userFirstName,
            userLastName: response.data.userLastName,
            address: {
              addressLine: response.data.address.addressLine,
              street: response.data.address.street,
              city: response.data.address.city,
              state: response.data.address.state,
              pincode: response.data.address.pincode
            }
          });
        }
      }
      catch (error) {
        console.log('Error fetching the personal details: ', error);
      }
    }
    fetchUserProfile();
  },[])
  const [userProfile, setUserProfile] = useState({
    userName: '',
    userEmail: '',
    userFirstName: '',
    userLastName: '',
    address: {
      addressLine:'',
      street: '',
      city:'',
      state: '',
      pincode: ''
    }
  });
  console.log(userProfile);

  return (
    <div style={{marginTop: '74px'}}>
      { userId === 'Shopper123' ? <ShopperNavHeader /> : <CustomerNavHeader /> }

      <div className='profile-main'>
        <img src={require('../../assets/user-profile-img.png') } className='profileImg' alt='profileImg'/>
        <div className='profile-container'>
          <div className='profile-box'>
            
            <div className='row feild'>
              <div className='col-6'>
              <label className='profile-label'>Email:</label>
              <input type='text' disabled className='value'value={userProfile.userEmail} />
            </div>
            <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>Username:</label>
              <input type='text' disabled className='value'value={userProfile.userName} />
              {/* <div>{userProfile.userName}</div> */}
              {/* </div> */}
            </div>
            </div>

            <hr width='100%' size='4' style={{color: 'red'}}></hr> 
            {/* <div className='row' style={{borderWidth: '3px', borderColor: 'red'}}></div> */}

            <div className='row feild'>
              <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>First name:</label>
              <input type='text' disabled className='value'value={userProfile.userFirstName} />
              {/* <div>{userProfile.userFirstName}</div> */}
            {/* </div> */}
            </div>
            <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>Last name:</label>
              <input type='text' disabled className='value'value={userProfile.userLastName} />
              {/* <div>{userProfile.userLastName}</div> */}
            {/* </div> */}
            </div>
            </div>

            <div style={{color: 'rgb(242 101 88)', fontFamily: 'Catamaran', fontSize: 25, fontWeight: 600,textAlign: 'center', margin: '10px', textDecoration: 'underLine'}}>Address</div>

            <div className='row feild' style={{marginBottom: '15px'}}>
              <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>Address line:</label>
              <input type='text' disabled className='value'value={userProfile.address.addressLine} />
              {/* <div>{userProfile.address.addressLine}</div> */}
            {/* </div> */}
            </div>
            <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>Street:</label>
              <input type='text' disabled className='value'value={userProfile.address.street} />
              {/* <div>{userProfile.address.street}</div> */}
            {/* </div> */}
            </div>
            </div>

            <div className='row feild' style={{marginBottom: '15px'}}>
              <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>City:</label>
              <input type='text' disabled className='value'value={userProfile.address.city} />
              {/* <div>{userProfile.address.city}</div> */}
            {/* </div> */}
            </div>
            <div className='col-6'>
            {/* <div className='feild'> */}
              <label className='profile-label'>State:</label>
              <input type='text' disabled className='value'value={userProfile.address.state} />
              {/* <div>{userProfile.address.state}</div> */}
            {/* </div> */}
            </div>
            </div>
            <div className='feild'>
              <label className='profile-label'>Pincode:</label>
              <input type='text' disabled className='value'value={userProfile.address.pincode} />
              {/* <div>{userProfile.address.pincode}</div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfile;

import React, { useState, useEffect } from 'react';
import { getPersonalDetails, updateAddress } from '../api/registerApi';
import axios from 'axios';
import { useNavigate } from "react-router";
import { number } from 'yup';


const AddressForm = () => {
  const userId = localStorage.getItem('userName');
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    addressLine: '',
    street: '',
    city: '',
    state: '',
    pincode: number
  });
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch address data from backend when component mounts
    fetchAddressData();
  }, []);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
};
  const fetchAddressData = async () => {
    // Make API call to fetch address data from backend
    try {
      const response = await getPersonalDetails(userId);
      if (response.status === 200) {
        console.log('fetched personal details');
        setAddressData(response.data.address);
        console.log(addressData);
      }
    }
    catch (error) {
      console.error('Error fetching address data:', error);
    };
  };

  const handleSubmit = async () => {
    // Make API call to update address data on backend
    if(!validateForm()) return;
    try {
      const updatedAddress = await updateAddress(userId,addressData);
      if (updatedAddress.status === 200) {
        console.log('Address data updated successfully:', updatedAddress.data);
        // Convert address data to string format and make POST request to another API
        const formattedAddress = convertToString(addressData);
        console.log(formattedAddress);
        navigate('/checkout');
        //postFormattedAddress(formattedAddress);
      }
    }
    catch (error) {
      console.error('Error updating address data:', error);
    };
  };

  const convertToString = (addressData) => {
    // Convert address data object to string format with comma separation
    return Object.values(addressData).join(', ');
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};
 
    // Validate required fields
    Object.entries(addressData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = 'Required';
        valid = false;
      }
    });
    setErrors(errors);
    return valid;
  };

  const postFormattedAddress = (formattedAddress) => {
    // Make API call to post formatted address data to another API
    axios.post('api/another-address', { formattedAddress })
      .then(response => {
        console.log('Formatted address posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting formatted address:', error);
      });
  };

  const handleEditToggle = () => {
    // Toggle edit mode
    setEditMode(prevMode => !prevMode);
    setErrors({});
  };

  const handleChange = (e) => {
    // Update address data when input fields change
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      {editMode ? (
        <div>
          <label>
            Address Line:
            <input type="text" name="addressLine" value={addressData.addressLine} onChange={handleChange}/>
            {errors.addressLine && <span>{errors.addressLine}</span>}
          </label>
          <label>
            Street:
            <input type="text" name="street" value={addressData.street} onChange={handleChange} />
            {errors.street && <span>{errors.street}</span>}
          </label>
          <label>
            City:
            <input type='text' name='city' value={addressData.city} onChange={handleChange} />
            {errors.city && <span> {errors.city}</span>}
          </label>
          <label>
            State:
            <input type="text" name="state" value={addressData.state} onChange={handleChange} />
            {errors.state && <span>{errors.state}</span>}
          </label>
          <label>
            Pincode:
            <input type="number" name="pincode" value={addressData.pincode} onChange={handleChange} />
            {errors.pincode && <span>{errors.pincode}</span>}
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>
          <div>Address Line: {addressData.addressLine}</div>
          <div>Street: {addressData.street}</div>
          <div>City: {addressData.city}</div>
          <div>State: {addressData.state}</div>
          <div>Pincode: {addressData.pincode}</div>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
  )
}
    </div >
  );
};

export default AddressForm;
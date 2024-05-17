import React, { useState, useEffect } from 'react';
import { getPersonalDetails, updateAddress } from '../api/registerApi';
import axios from 'axios';
import { placeOrder } from '../api/CustomerApi';
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
  const [billingData, setBillingData] = useState({
    billingName: '',
    billingPhNumber: '',
    addressLine: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
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
        console.log('fetched personal details', response.data.address);
        addressData.addressLine = response.data.address.addressLine;
        addressData.street = response.data.address.street;
        addressData.city = response.data.address.city;
        addressData.state = response.data.address.state;
        addressData.pincode = response.data.address.pincode;
        setAddressData(response.data.address);
        billingData.billingName = userId;
        billingData.billingPhNumber = '';
        billingData.addressLine = response.data.address.addressLine;
        billingData.street = response.data.address.street;
        billingData.city = response.data.address.city;
        billingData.state = response.data.address.state;
        billingData.pincode = response.data.address.pincode;
        console.log(addressData);
        console.log(billingData);
      }
    }
    catch (error) {
      console.error('Error fetching address data:', error);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setBillingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make API call to update address data on backend
    //if(!validateForm()) return;
    if (editMode) {
      if (validateForm()) {
        try {
          const updatedAddress = await updateAddress(userId, addressData);
          if (updatedAddress.status === 200) {
            console.log('Address data updated successfully:', updatedAddress.data);
            const formatdata = {
              addressLine: addressData.addressLine,
              street: addressData.street,
              city: addressData.city,
              state: addressData.state,
              pincode: addressData.pincode
            }
            // Convert address data to string format and make POST request to another API
            const formattedAddress = Object.values(formatdata).join(', ');
            console.log(formattedAddress);
            //navigate('/checkout');
            submitBillingData(formattedAddress);
          }
        }
        catch (error) {
          console.error('Error updating address data:', error);
        };
      }else alert('All feilds are mandatory. Please enter all the details');
      } else {
        const formattedAddress = Object.values(addressData).join(', ');
        // Make POST request with formatted address data
        submitBillingData(formattedAddress);
      }
    };

    const submitBillingData = async (formattedAddress) => {
      try {
        let billName = billingData.billingName;
        let billPhno = billingData.billingPhNumber;
        console.log(billName, billPhno);
        await placeOrder({ billingName: billName, billingphoneNum: billPhno, billingAddress: formattedAddress, userId: userId, }).then((res) => {
          console.log(res.data);
          navigate('/purchaseHistory');
        })
        // Implement your order placement logic here using axios.post or any other method
      } catch (error) {
        console.error('Error placing order:', error);
      }
    };

    const validateForm = () => {
      // Simple validation for required fields
      const errors = {};
      Object.keys(billingData).forEach(key => {
        if (!billingData[key]) {
          errors[key] = 'This feild is required';
        }
      });
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };

    // const convertToString = (addressData) => {
    //   // Convert address data object to string format with comma separation
    //   return Object.values(addressData).join(', ');
    // };

    // const validateForm = () => {
    //   let valid = true;
    //   let errors = {};

    //   // Validate required fields
    //   Object.entries(addressData).forEach(([key, value]) => {
    //     if (!value.trim()) {
    //       errors[key] = 'Required';
    //       valid = false;
    //     }
    //   });
    //   setErrors(errors);
    //   return valid;
    // };


    const handleEditToggle = () => {
      // Toggle edit mode
      setEditMode(prevMode => !prevMode);
      setErrors({});
    };

    return (
      <div>
        {editMode ? (
          <div>
            <label>
              biiling name:*
              <input type="text" name="billingName" placeholder='Enter you Full name' value={billingData.billingName} onChange={handleInputChange} />
              {errors.addressLine && <span>{errors.addressLine}</span>}
            </label>
            <label>
              billing Phone Number:*
              <input type="number" name="billingPhNumber" placeholder='Enter your Phone number' maxLength={10} value={billingData.billingPhNumber} onChange={handleInputChange} />
              {errors.billingPhNumber && <span>{errors.billingPhNumber}</span>}
            </label>
            <label>
              Address Line:*
              <input type="text" name="addressLine" placeholder='Enter your address line' value={billingData.addressLine} onChange={handleInputChange} />
              {errors.addressLine && <span>{errors.addressLine}</span>}
            </label>
            <label>
              Street:*
              <input type="text" name="street" placeholder='Enter your street' value={billingData.street} onChange={handleInputChange} />
              {errors.street && <span>{errors.street}</span>}
            </label>
            <label>
              City:*
              <input type='text' name='city' placeholder='Enter your city' value={billingData.city} onChange={handleInputChange} />
              {errors.city && <span> {errors.city}</span>}
            </label>
            <label>
              State:*
              <input type="text" name="state" placeholder='Enter your state' value={billingData.state} onChange={handleInputChange} />
              {errors.state && <span>{errors.state}</span>}
            </label>
            <label>
              Pincode:*
              <input type="text" name="pincode" placeholder='Enter your area pincode' value={billingData.pincode} onChange={handleInputChange} />
              {errors.pincode && <span>{errors.pincode}</span>}
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        ) : (
          <div>
            <label>
              biiling name:
              <input type="text" name="billingName" value={billingData.billingName} onChange={handleInputChange} />
              {errors.addressLine && <span>{errors.addressLine}</span>}
            </label>
            <label>
              billingPhNumber:
              <input type="text" name="billingPhNumber" value={billingData.billingPhNumber} onChange={handleInputChange} />
              {errors.billingPhNumber && <span>{errors.billingPhNumber}</span>}
            </label>
            <label>
              Address Line:
              <input type="text" name="addressLine" value={addressData.addressLine} onChange={handleInputChange} disabled />
              {errors.addressLine && <span>{errors.addressLine}</span>}
            </label>
            <label>
              Street:
              <input type="text" name="street" value={billingData.street} onChange={handleInputChange} disabled />
              {errors.street && <span>{errors.street}</span>}
            </label>
            <label>
              City:
              <input type='text' name='city' value={billingData.city} onChange={handleInputChange} disabled />
              {errors.city && <span> {errors.city}</span>}
            </label>
            <label>
              State:
              <input type="text" name="state" value={billingData.state} onChange={handleInputChange} disabled />
              {errors.state && <span>{errors.state}</span>}
            </label>
            <label>
              Pincode:
              <input type="text" name="pincode" value={billingData.pincode} onChange={handleInputChange} disabled />
              {errors.pincode && <span>{errors.pincode}</span>}
            </label>
            <button onClick={handleEditToggle}>Edit</button>
          </div>
        )
        }
      </div >


      // <div>
      // <h2>Checkout Page</h2>
      // <form>
      //   <div>
      //     <label htmlFor="billingName">Billing Name:</label>
      //     <input type="text" id="billingName" name="billingName" value={billingData.billingName} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.billingName && <div className="error">{errors.billingName}</div>}
      //   </div>
      //   <div>
      //     <label htmlFor="billingPhNumber">Billing phone number:</label>
      //     <input type="text" id="billingPhNumber" name="billingPhNumber" value={billingData.billingPhNumber} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.billingPhNumber && <div className="error">{errors.billingPhNumber}</div>}
      //   </div>

      //   {/* Repeat for other billing fields */}

      //   {/* Address Fields */}
      //   <div>
      //     <label htmlFor="addressLine">Address Line:</label>
      //     <input type="text" id="addressLine" name="addressLine" value={billingData.addressLine} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.addressLine && <div className="error">{errors.addressLine}</div>}
      //   </div>
      //   <div>
      //     <label htmlFor="street">Street:</label>
      //     <input type="text" id="street" name="street" value={billingData.street} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.street && <div className="error">{errors.street}</div>}
      //   </div>
      //   <div>
      //     <label htmlFor="city">city Name:</label>
      //     <input type="text" id="city" name="city" value={billingData.city} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.city && <div className="error">{errors.city}</div>}
      //   </div>
      //   <div>
      //     <label htmlFor="state">State Name:</label>
      //     <input type="text" id="state" name="state" value={billingData.state} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.state && <div className="error">{errors.state}</div>}
      //   </div>
      //   <div>
      //     <label htmlFor="pincode">Pincode:</label>
      //     <input type="text" id="pincode" name="pincode" value={billingData.pincode} onChange={handleInputChange} disabled={!editMode} required />
      //     {errors.pincode && <div className="error">{errors.pincode}</div>}
      //   </div>
      //   {/* Repeat for other address fields */}

      //   {editMode ? (
      //     <button type="submit" onClick={handleSubmit}>Submit</button>
      //   ) : (
      //     <button type="button" onClick={() => setEditMode(true)}>Edit</button>
      //   )}
      // </form>
      // </div>


    );
  };

  export default AddressForm;
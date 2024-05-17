import React, { useEffect, useState } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { getPersonalDetails, updateAddress } from '../../api/registerApi';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Row } from 'react-bootstrap';
import { uploadExcel, getCartItems, updateCart, removeFromCart, placeOrder } from '../../api/CustomerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faSquareMinus, faSquarePlus, faTrashCan, faCartShopping, faPenToSquare, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'
import { Navigate } from 'react-router';
import { number } from 'yup';

const Cart = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userName');

  const [cartItems, setCartItems] = useState([]);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [billingForm, setBillingForm] = useState({
    billingName: '',
    billingAddress: '',
    billingPhNumber: '',
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('userName');
      try {
        await getCartItems(userId).then(response => { // Replace 'api/cartItems' with your actual API endpoint
          setCartItems(response.data);
          console.log(cartItems);
          //getItemsPrice();
          //calculateItemsPrice();
        })
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();

  }, []);

  useEffect(() => {
    const calculateItemsPrice = () => {
      let total = 0;
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      setItemsPrice(total);

    };
    console.log(itemsPrice);
    calculateItemsPrice();
  }, [cartItems]);

  // const calculateItemsPrice = async () => {
  //   let total = 0;
  //   console.log(cartItems.price, cartItems.quantity);
  //   cartItems.forEach(item => {
  //     total += item.price  * item.quantity;
  //   });
  //   setItemsPrice(total);
  // };

  let itemFinalPrice = 0;
  function getItemsPrice() {
    let itemPrice = 0;
    for (var i = 0; i < cartItems.length; i++) {
      itemPrice += ((cartItems[i].price) * this.cartItems[i].quantity);
    }

    itemFinalPrice = itemPrice;
    console.log(itemFinalPrice);
  }

  function getItemQty(productId) {
    // console.log("qunat");
    return cartItems.find(p => p.productId == productId).quantity;
  }

  async function increaseQuantity(productId) {
    const userId = localStorage.getItem('userName');
    const quantity = cartItems.find(p => p.productId == productId).quantity + 1;
    await updateCart({ userId, productId, quantity })
      .then((res) => {
        if (res.status == 200) {
          console.log(productId);
          console.log(cartItems);
          console.log(quantity);
          const updatedCart = cartItems.map(p => p.productId === productId ? { ...p, quantity } : p);
          setCartItems(updatedCart);
          console.log(cartItems);
          console.log(updatedCart);
        }
      })
      .catch(error => {
        console.log('error increasing item quantity', error);
      })
  };

  async function decreaseQuantity(productId) {
    const userId = localStorage.getItem('userName');
    let quantity = cartItems.find(p => p.productId == productId).quantity;
    if (quantity > 1) quantity = quantity - 1;
    else { removeItemFromCart(productId); return; }
    await updateCart({ userId: userId, productId: productId, quantity: quantity })
      .then((res) => {
        if (res.status == 200) {
          const updatedCart = cartItems.map(p => p.productId === productId ? { ...p, quantity } : p);
          setCartItems(updatedCart);
          console.log(updatedCart);
        }
      })
      .catch(error => {
        console.log('error decreasing item quantity', error);
      })
  }

  async function removeItemFromCart(productId) {
    console.log(productId);
    const userId = localStorage.getItem('userName');
    const removeproduct = { "userId": userId, "productId": productId }
    console.log(productId, userId);
    try {
      console.log('inside the deletehandle');
      fetch('http://localhost:8082/removeFromCart', {
        method: "DELETE",
        body: JSON.stringify(removeproduct)
        ,
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      })
        .then(response => {
          console.log(response.body);
          const removedCart = cartItems.filter(p => p.productId != productId);
          setCartItems(removedCart);
          //calculateItemsPrice(); 
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log('getting error removing item', error);
    }
  }

  function isCartEmpty() {
    console.log("ff");
    // console.log("is cart empty ",this.cart?.products?.length==0);
    console.log(cartItems);
    return cartItems.length == 0;
  }




  // ----------code from chat------------
  // useEffect(() => {
  //   const calculateItemsPrice = () => {
  //     let total = 0;
  //     cartItems.forEach(item => {
  //       total += (item.price - (item.discount / 100) * item.price) * item.quantity;
  //     });
  //     setItemsPrice(total);
  //   };

  //   calculateItemsPrice();
  // }, [cartItems]);

  // useEffect(() => {
  //   setDeliveryCharge(billingForm.deliveryType === 'InstDelv' ? 100 : 50);
  // }, [billingForm.deliveryType]);




  // const [cart, setCart] = useState([]);
  // //Fetch cart
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const userId = localStorage.getItem("userName");
  //       console.log(userId); // Assuming you store userId in localStorage after login
  //       const response = await getCart(userId);
  //       console.log('getting the cart');
  //       if (response.status === 200) {
  //         setCart(response.data);
  //         console.log(cart);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };
  //   fetchCart();
  // }, []);



  // ---------------------billing form data-------------------

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
  const token = localStorage.getItem('token');
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch address data from backend when component mounts
    fetchAddressData();
  }, []);

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
      } else alert('All feilds are mandatory. Please enter all the details');
    } else {
      const formatdata = {
        addressLine: addressData.addressLine,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode
      }
      const formattedAddress = Object.values(formatdata).join(', ');
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
        localStorage.setItem('orderNumber',res.data.orderNumber);
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

  const handleEditToggle = () => {
    //e.preventDefault();
    // Toggle edit mode
    setEditMode(prevMode => !prevMode);
    setErrors({});
  };

  const handleEmptyCart = () => {
    navigate('/products');
  }



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setBillingForm(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  // const handleSubmit1 = async (e) => {
  //   const userId = localStorage.getItem('userName');
  //   e.preventDefault();
  //   console.log(e.value);
  //   try {
  //     await placeOrder({...billingForm, userId}).then((res) => {
  //       console.log(res.data);
  //       navigate('/purchaseHistory');
  //     })
  //     // Implement your order placement logic here using axios.post or any other method
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //   }
  // };



  return (
    <div style={{ marginTop: '74px' }}>
      <CustomerNavHeader />


      {/* <div className='cart-conatiner'>
      {cart.map((carts) => (
        <div key={carts.cartId}>
          <div className='cart-items'>
            <div>{carts.userId}</div>
            <div>{carts.productId}</div>
            <div>{carts.quantity}</div>
            <div>{carts.price}</div>
          </div>
        </div>
      )
      )}
    </div> */}

      <div className='cart-main-container'>
        {!cartItems.length ? (
          <div className="w-75 mt-5 m-auto rounded">
            <div className="card w-75 m-auto bg-white rounded mt-5 px-5 py-2">
              <div className="card-body text-green text-center">
                <div className="fs-4 mb-2 text-green ls-3">Your Cart is Empty</div>
                <div>
                  <button type="button" className="fs-5 mt-4 mb-2 ls-2 snbtn shadow btn rounded text-light proceed-to-order fw-bold" onClick={handleEmptyCart}>CONTINUE SHOPPING</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="fs-2 text-center pt-5 pb-5 ls-2 fw-bold" style={{ color: 'rgb(239 100 88 / 86%)' }}>My Cart ({cartItems.length} items)</div>





              <div className="cart-container px-5">
                <form>
                  <div className="form-main-container">
                    <div className="form-inside-container">
                      <div className="cart-details" style={{ width: '37em' }}>
                        <div className="fs-5">
                          <FontAwesomeIcon size='lg' icon={faCartShopping} />
                          <span style={{ marginLeft: '7px' }}>Order Summary</span>
                        </div>
                        <table className="table mt-4 prod-table" style={{ borderCollapse: 'collapse' }}>
                          <thead>
                            <tr className="text-secondary text-center">
                              <th className="border-none">Name</th>
                              <th className="border-none">Price</th>
                              <th className="border-none">Quantity</th>
                              <th className="border-none">Total</th>
                              <th className="border-none"></th>
                              <th className="border-none"></th>
                            </tr>
                          </thead>
                          <tbody className="align-middle">
                            {cartItems.map(item => (
                              <tr key={item.productId} className="">
                                <td className="border-none">
                                  <div className=" ls-1 ">
                                    {/* <img src="../../../assets/BP-Tablet.png" alt="img" width="70" height="70" />
                                    &nbsp;&nbsp;&nbsp;&nbsp; */}
                                    {item.productName}
                                  </div>
                                </td>

                                <td className="text-center border-none">
                                  {(item.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </td>

                                <td className="border-none">
                                  <div className="input-group d-flex justify-content-center">
                                    <span className="input-group-btn">
                                      {/* <button type="button" onClick={() => decreaseQuantity(item.productId)} className="quantity-left-minus btn btn-danger btn-number text-center" data-type="minus" data-field=""> */}
                                      <FontAwesomeIcon size='1x' icon={faSquareMinus} className='cart-minus-icon' transform=" down-5 left-5" onClick={() => decreaseQuantity(item.productId)} />
                                      {/* </button> */}
                                    </span>
                                    <input type="text" id="quantity" disabled value={item.quantity} name="quantity" className="text-center" style={{ width: '40px', borderRadius: '10px', borderColor: 'darkgrey' }} min="1" />
                                    <span className="input-group-btn">
                                      {/* <button type="button" onClick={() => increaseQuantity(item.productId)} className="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field=""> */}
                                      <FontAwesomeIcon size='1x' icon={faSquarePlus} className='cart-plus-icon' onClick={() => increaseQuantity(item.productId)} color='green' transform=" down-5 right-5" />
                                      {/* </button> */}
                                    </span>
                                  </div>
                                </td>

                                <td className="text-center" style={{ borderRadius: '5px' }}>
                                  <div style={{ borderRadius: '5px' }}>{(item.price * item.quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
                                </td>
                                <td className="border-none cursor-pointer">
                                  <FontAwesomeIcon color='red' icon={faTrashCan} onClick={() => removeItemFromCart(item.productId)} />
                                  {/* <button type='button' onClick={() => removeItemFromCart(item.productId)}>
                             Remove
                            </button> */}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className='totalprice-div'>Total Price : <span style={{ fontWeight: '500', marginLeft: '30px' }}>{itemsPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span></div>
                      </div>
                      {/* <div className="row my-1">
                        <div className="col-6">

                        </div>
                        <div className="col-6">

                        </div>
                      </div> */}


                      <div className="customer-container" >
                        <div className="fs-5 mb-3">
                          <FontAwesomeIcon icon={faCircleUser} />
                          <span> Customer Information</span>
                        </div>



                        {/* <div className="row mb-4 justify-content-between m-auto" >
                          <div className="mt-2 mb-1">Full Name</div>
                          <input type="text" id="billingName" name="billingName" placeholder="Full Name"
                            value={billingForm.billingName} className="w-100 p-2 bg-grey" onChange={handleChange} />
                          <div>
                          </div>


                          <div className="mt-2 mb-1">Phone Number</div>
                          <input type="text" id="billingPhNumber" name="billingPhNumber" placeholder="Phone Number"
                            value={billingForm.billingPhNumber} className="w-100 p-2 bg-grey" onChange={handleChange} />
                          <div>              </div>
                        </div>

                        <div className="form-group mb-2">
                          <div className="mt-2 mb-1">Address</div>
                          <input type="text" id="billingAddress" name="billingAddress" placeholder="Address"
                            value={billingForm.billingAddress} className="w-100 p-2 bg-grey" onChange={handleChange} />
                          <div className="invalid-feedback" >
                            </div>
                        </div> */}


                        <div>
                          {editMode ? (
                            <div>
                              <div className='row form-group'>
                                <label>
                                  Full name:*
                                  <input type="text" name="billingName" style={{marginTop: '2px'}} placeholder='Enter you Full name' value={billingData.billingName} onChange={handleInputChange} />
                                  {errors.billingName && <div style={{color: 'red', fontSize: 13}}>{errors.billingName}</div>}
                                </label>
                              </div>
                              <div className='row form-group'>
                                <label>
                                  Phone Number:*
                                  <input type="number" name="billingPhNumber" style={{marginTop: '2px'}} placeholder='Enter your Phone number' maxLength={10} value={billingData.billingPhNumber} onChange={handleInputChange} />
                                  {errors.billingPhNumber && <div style={{color: 'red', fontSize: 13}}>{errors.billingPhNumber}</div>}
                                </label>
                              </div>

                              <div className='row form-group' style={{marginLeft: '0px', fontSize: 24, fontWeight: 400, marginTop: '-15px', color: 'rgb(241 104 92)', textDecoration: 'underline'}}>Address</div>
                              
                              <div className='row form-group'>
                                <div className='col-sm-6' >
                                  <label>
                                    Address Line:*
                                    <input type="text" name="addressLine" style={{marginTop: '2px'}} placeholder='Enter your address line' value={billingData.addressLine} onChange={handleInputChange} />
                                    {errors.addressLine && <div style={{color: 'red', fontSize: 13}}>{errors.addressLine}</div>}
                                  </label>
                                </div>
                                <div className='col-6'>
                                  <label>
                                    Street:*
                                    <input type="text" name="street" style={{marginTop: '2px'}} placeholder='Enter your street' value={billingData.street} onChange={handleInputChange} />
                                    {errors.street && <div style={{color: 'red', fontSize: 13}}>{errors.street}</div>}
                                  </label>
                                </div>
                              </div>
                              <div className='row form-group'>
                                <div className='col-6'>
                                  <label>
                                    City:*
                                    <input type='text' name='city' style={{marginTop: '2px'}} placeholder='Enter your city' value={billingData.city} onChange={handleInputChange} />
                                    {errors.city && <div style={{color: 'red', fontSize: 13}}> {errors.city}</div>}
                                  </label>
                                </div>
                              
                              <div className='col-6'>
                                  <label>
                                    State:*
                                    <input type="text" name="state" style={{marginTop: '2px'}} placeholder='Enter your state' value={billingData.state} onChange={handleInputChange} />
                                    {errors.state && <div style={{color: 'red', fontSize: 13}}>{errors.state}</div>}
                                  </label>
                                  </div>
                                  </div>
                                    <div className='row form-group'>
                                      <div className='col-6'>
                                    <label>
                                      Pincode:*
                                      <input type="text" name="pincode" style={{marginTop: '2px'}} placeholder='Enter your pincode' value={billingData.pincode} onChange={handleInputChange} />
                                      {errors.pincode && <div style={{color: 'red', fontSize: 13}}>{errors.pincode}</div>}
                                    </label>
                                    </div>
                                    <div className='col-6'></div>
                              </div>
                              <button type='button' className='w-60 btn proceed-to-order px-5 py-2' onClick={handleSubmit}>Place order</button>
                            </div>

                          ) : (
                            <div>
                              <div className='row form-group'>
                                <label>
                                  Full name:*
                                  <input type="text" name="billingName" style={{marginTop: '2px'}} placeholder='Enter you Full name' value={billingData.billingName} onChange={handleInputChange} />
                                  {errors.billingName && <div style={{color: 'red', fontSize: 13}}>{errors.billingName}</div>}
                                </label>
                              </div>
                              <div className='row form-group'>
                                <label>
                                  Phone Number:*
                                  <input type="number" name="billingPhNumber" style={{marginTop: '2px'}} placeholder='Enter your Phone number' maxLength={10} value={billingData.billingPhNumber} onChange={handleInputChange} />
                                  {errors.billingPhNumber && <div style={{color: 'red', fontSize: 13}}>{errors.billingPhNumber}</div>}
                                </label>
                              </div>
                              <span className='form-group' style={{marginLeft: '0px', fontSize: 24, fontWeight: 400, marginTop: '-15px', color: 'rgb(241 104 92)', textDecoration: 'underline'}}>Address <FontAwesomeIcon icon={faPenToSquare} style={{marginLeft: '5px'}} className='address-edit-icon' onClick={handleEditToggle}/></span>
                              
                              <div className='row form-group' style={{marginTop: '15px'}}>
                                <div className='col-sm-6' >
                                  <label>
                                    Address Line:*
                                    <input type="text" name="addressLine" style={{marginTop: '2px'}} placeholder='Enter your address line' value={billingData.addressLine} onChange={handleInputChange} disabled/>
                                    {errors.addressLine && <div style={{color: 'red', fontSize: 13}}>{errors.addressLine}</div>}
                                  </label>
                                </div>
                                <div className='col-6'>
                                  <label>
                                    Street:*
                                    <input type="text" name="street" style={{marginTop: '2px'}} placeholder='Enter your street' value={billingData.street} onChange={handleInputChange} disabled/>
                                    {errors.street && <div style={{color: 'red', fontSize: 13}}>{errors.street}</div>}
                                  </label>
                                </div>
                              </div>
                              <div className='row form-group'>
                                <div className='col-6'>
                                  <label>
                                    City:*
                                    <input type='text' name='city' style={{marginTop: '2px'}} placeholder='Enter your city' value={billingData.city} onChange={handleInputChange} disabled/>
                                    {errors.city && <div style={{color: 'red', fontSize: 13}}> {errors.city}</div>}
                                  </label>
                                </div>
                              
                              <div className='col-6'>
                                  <label>
                                    State:*
                                    <input type="text" name="state" style={{marginTop: '2px'}} placeholder='Enter your state' value={billingData.state} onChange={handleInputChange} disabled/>
                                    {errors.state && <div style={{color: 'red', fontSize: 13}}>{errors.state}</div>}
                                  </label>
                                  </div>
                                  </div>
                                  <div className='row form-group'>
                                      <div className='col-6'>
                                    <label>
                                      Pincode:*
                                      <input type="text" name="pincode" style={{marginTop: '2px'}} placeholder='Enter your pincode' value={billingData.pincode} onChange={handleInputChange} disabled />
                                      {errors.pincode && <div style={{color: 'red', fontSize: 13}}>{errors.pincode}</div>}
                                    </label>
                                    </div>
                                    <div className='col-6'></div>
                              </div>
                              {/* <button type='button' className='address-edit-button w-40 btn' onClick={handleEditToggle}>Edit</button> */}
                            </div>
                          )
                          }
                        </div >
                        {!editMode &&
                        <button type='button' className='w-60 btn proceed-to-order px-5 py-2'  onClick={handleSubmit}>Place order</button>
                        }
                        </div>
                    </div>
                  </div >
                </form >
              </div >

            </div >
          </>)
        }
      </div >
      
    </div>

  )
}

export default Cart;

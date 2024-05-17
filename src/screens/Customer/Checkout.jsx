import React, { useEffect, useState } from 'react';
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import './Checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDay, faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons';
import {faUser, faFileLines} from '@fortawesome/free-regular-svg-icons';
import { getOrderDetails } from '../../api/CustomerApi';

const Checkout = () => {

  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchingOrderDetails = async () => {
      try {
        const orderNumber = localStorage.getItem('orderNumber');
        const response = await getOrderDetails(orderNumber);
        if (response.status === 200) {
          console.log(response.data);
          setOrderDetails(response.data);
          console.log(orderDetails);
          setOrderItems(response.data.productList);
          console.log(orderItems); // Assuming orderItems is part of the response
        }
      }
      catch (error) {
        console.error('Error fetching order details:', error);
      };

    }
    fetchingOrderDetails();
  }, []);

  console.log(orderDetails);
  console.log(orderItems);
  return (
    <div style={{ marginTop: '74px' }}>
      <CustomerNavHeader />
      <div className="container-fluid">
        <div className="container w-50  text-center pb-5 pt-5">
          <img className='checkout-img' height={200} width={200} src={require('C:/Users/2150058/Videos/ReactJs_POCS/Mini_ShopperAPP/mini_shopper_frontend/src/assets/checkout-img.jpg')} alt="Checkout" />
          <div className="m-auto">
            <div className="fs-5 ls-1 mb-2 mt-4 fw-bold">Thank You for your Purchase!</div>
          </div>
          <div className="container bg-white w-75 p-4">
            <div className="row">
              <div className="row justify-content-between subrow mb-3">
                <div className="col-5 text-start fw-light">
                <FontAwesomeIcon color='rgba(253, 69, 52, 0.5)' icon={faCalendarDay} transform='down-3' />
                  &nbsp; &nbsp;Date
                </div>
                <div className="col-5 text-end fw-500">
                  {orderDetails.orderDate}
                </div>
              </div>

              <div className="row justify-content-between subrow mb-3">
                <div className="col-5 text-start fw-light">
                <FontAwesomeIcon color='rgba(253, 69, 52, 0.5)' icon={faUser}  transform='down-3' />
                &nbsp; &nbsp;Customer
                </div>
                <div className="col-5 text-end fw-500">
                  {orderDetails.customerName}
                </div>
              </div>

              <div className="row justify-content-between subrow mb-3">
                <div className="col-5 text-start fw-light">
                <FontAwesomeIcon color='rgba(253, 69, 52, 0.5)' icon={faFileLines}  transform='down-3' />
                &nbsp; &nbsp;Order Number
                </div>
                <div className="col-5 text-end fw-500">
                  {orderDetails.orderNumber}
                </div>
              </div>

              <div className="row justify-content-between subrow mb-3">
                <div className="col-5 text-start fw-light">
                <FontAwesomeIcon color='rgba(253, 69, 52, 0.5)' icon={faIndianRupeeSign}  transform='down-3' />
                &nbsp; &nbsp; Total
                </div>
                <div className="col-5 fs-5 fw-bold mb-3 text-end">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(orderDetails.totalPrice)}
                </div>
                <hr />
              </div>

              {orderItems.map((orderItem, index) => (
                <div key={index} className="d-flex align-items-center px-4 justify-content-between mb-2">
                  <img src={require('../../assets/shoe2-img.jpg')} alt="product-image" width="80" height="70" />
                  <div className="ms-2 text-start d-flex flex-column">
                    <div>{orderItem.productName}</div>
                  </div>
                  <div className="ms-4 flex-column bg-grey rounded-pill px-2">
                    <div>x{orderItem.quantity} Items</div>
                  </div>
                  <div className="ms-5 flex-column">
                    <div>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(orderItem.price)}</div>
                  </div>
                </div>
              ))}

              <div>
                <button type="button" onClick={() => window.location.href = '/products'}
                  className="fs-6 ls-2  snbtn shadow btn rounded text-light proceed-to-order">Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;

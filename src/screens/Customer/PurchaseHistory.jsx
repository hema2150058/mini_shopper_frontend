import React, { useEffect, useState } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import { getPurchaseHistory } from '../../api/CustomerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faMagnifyingGlass, faDownload, faLeaf } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './PurchaseHistory.css';
import Modal from 'react-modal';

// Define the custom styles for the Modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '400px',
    //height: '300px',
    backgroundColor: 'rgb(248 152 143 / 50%)',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const PurchaseHistory = () => {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const userId = localStorage.getItem('userName');
        const response = await getPurchaseHistory(userId);
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data);
        }
      }
      catch (error) {
        console.log('Error fetching the purchase history: ', error);
      }
    }
    fetchOrderHistory();
  }, [])

  console.log(orders);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };





  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const downloadPDF = (orderNumber) => {
    setLoader(true);
    setError('');
    //const orderNumber = 34883;
    if (orderNumber) {
      const axiosPdfConfig = {
        responseType: 'blob',
        headers: {
          Accept: 'application/json',
        }
      }
      console.log('inside the handlePDF');
      axios.get('http://localhost:8082/receipt/' + orderNumber, axiosPdfConfig)
        .then((response) => {
          console.log('inside the axios then');
          setLoader(false);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'MoneyReceipt.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
          setError(error.message);
        })
    }

  }

  return (

    <div style={{ marginTop: '74px', }}>
      <CustomerNavHeader />
      <div className='history-main-container'>
        <div className='name'>Purchase History</div>
        <div className="col-4 search-history">
          <div className="form-group has-search" >
            <span className="material-icons form-control-feedback"></span>
            <FontAwesomeIcon className='search-icon' color='silver' icon={faMagnifyingGlass} />
            <input type="text" className="form-control rounded-pill bg-grey" placeholder="Search" />
          </div>
        </div>
        <div className="history-container mt-5">
          <table className="history-table table-bordered">
            <thead className="history-table-head">
              <tr>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th>Download PDF</th>
              </tr>
            </thead>
            <tbody className='history-table-body'>
              {orders.map((order) => (
                <tr key={order.orderNumber}>
                  <td>
                    <button type='button' className="btn popclick" onClick={() => openModal(order)}>
                      {order.orderNumber}
                    </button>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{(order.totalPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <button type='button' className="btn download-btn" onClick={() => downloadPDF(order.orderNumber)}>
                      {loader ? (
                        <>Downloading</>
                      ) : (
                        <><FontAwesomeIcon transform='down-3' size='' icon={faDownload} /></>
                      )}
                    </button>
                    {error !== '' && (
                      <div className='error.msg'>{error}</div>
                    )}
                    {/* <a hred='' className="btn download-btn">
                      <FontAwesomeIcon transform='down-3' size='' icon={faDownload} />
                    </a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Order Details"
          >

            
            <h4>Order Details</h4>
            {selectedOrder && (
              <div>
                <table className="history-table table-bordered">
                  <thead className='history-table-head'>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody className='history-table-body' style={{padding: '3px'}}>
                    {selectedOrder.productList.map((product, index) => (
                      <tr key={index}>
                        <td>{product.productName}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn proceed-to-order" style={{marginLeft: '43%'}} onClick={closeModal}>OK</button>
              </div>
            )}
          </Modal>
        </div>

      </div>
    </div>
  )
}

export default PurchaseHistory;

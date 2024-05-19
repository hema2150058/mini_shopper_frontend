import React, { useEffect, useState } from 'react'
import ShopperNavHeader from '../HeaderFooter/ShopperNavHeader';
import { getAllOrders, getAllPendingOrders, statusChangeToRejected, statusChangeToReview, statusChangeToSuccess } from '../../api/ShopperApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate, NavLink } from 'react-router-dom';


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

const PendingOrders = () => {

  
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPendingOrderHistory = async () => {
      try {
        const response = await getAllPendingOrders();
        if (response.status === 200) {
          console.log(response.data);
          setPendingOrders(response.data);
          setFilteredOrders(response.data);
          setLoading(false);
        }
      }
      catch (error) {
        console.log('Error fetching the pending orders: ', error);
        setLoading(false);
      }
    }
    fetchPendingOrderHistory();
  }, [])

  console.log(pendingOrders);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterOrders(query);
};

const filterOrders = (query) => {
  const filtered = pendingOrders.filter(order =>
      order.orderNumber.toString().includes(query) ||
      order.orderDate.includes(query) ||
      order.customerName.toLowerCase().includes(query.toLowerCase()) ||
      order.totalPrice.toString().includes(query) ||
      order.orderStatus.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredOrders(filtered);
};

  const handleStatusChange = (orderNumber, newStatus) => {
    const apiMap = {
      'Reject': statusChangeToRejected,
      'Accept': statusChangeToSuccess,
      'Send to Review': statusChangeToReview
    };

    const apiCall = apiMap[newStatus];

    if (apiCall) {
      apiCall(orderNumber)
        .then(response => {

          console.log(response.data);
          // Update the order status locally after successful API call
          setPendingOrders(pendingOrders.map(order =>
            order.orderNumber === orderNumber ? { ...order, orderStatus: newStatus } : order
          ));
          window.location.reload();
        })
        .catch(error => {
          console.error(`There was an error updating the order status to ${newStatus}!`, error);
        });
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEmptyOrders = () => {
    navigate('/allOrders');
  }

  return (
    <div style={{ marginTop: '74px' }}>
      <ShopperNavHeader />
      <div className='history-main-container'>
      {!pendingOrders.length ? (
          <div className="w-75 mt-5 m-auto rounded">
            <div className="card w-75 m-auto bg-white rounded mt-5 px-5 py-2">
              <div className="card-body text-center">
                <div className="fs-4 mb-2 ls-3" style={{color: 'rgb(240 68 53 / 83%)'}}>No orders to review</div>
                <div>
                  <button type="button" className="fs-5 mt-4 mb-2 ls-2 snbtn shadow btn rounded text-light proceed-to-order fw-bold" onClick={handleEmptyOrders}>Go to Orders Page</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <div>
        <div className='name'>Pending Orders</div>
        <div className="col-4 search-history">
          <div className="form-group has-search" >
            <span className="material-icons form-control-feedback"></span>
            <FontAwesomeIcon className='search-icon' color='silver' icon={faMagnifyingGlass} />
            <input type="text" value={searchQuery} onChange={handleSearchChange}  className="form-control rounded-pill bg-grey" placeholder="Search" />
          </div>
        </div>
        <div className="history-container mt-5">
          <table className="history-table table-bordered">
            <thead className="history-table-head">
              <tr>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Customer Name</th>
                <th>Total Price</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody className='history-table-body'>
              {filteredOrders.map((order) => (
                <tr key={order.orderNumber}>
                  <td>
                    <button type='button' className="btn popclick" onClick={() => openModal(order)}>
                      {order.orderNumber}
                    </button>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.customerName}</td>
                  <td>{(order.totalPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                  <td>
                    <select style={{textAlign: 'center'}}
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                    >
                      <option>Pending</option>
                      <option value="Reject">Reject</option>
                      <option value="Accept">Accept</option>
                      <option value="Send to Review">Send to Review</option>
                    </select>
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
                  <tbody className='history-table-body' style={{ padding: '3px' }}>
                    {selectedOrder.productList.map((product, index) => (
                      <tr key={index}>
                        <td>{product.productName}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="btn proceed-to-order" style={{ marginLeft: '43%' }} onClick={closeModal}>OK</button>
              </div>
            )}
          </Modal>
        </div>
        </div>
)}
      </div>
    </div>
  )
}

export default PendingOrders;

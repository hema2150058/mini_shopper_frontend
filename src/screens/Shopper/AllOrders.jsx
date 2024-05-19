import React, { useEffect, useState } from 'react'
import ShopperNavHeader from '../HeaderFooter/ShopperNavHeader';
import { getAllOrders } from '../../api/ShopperApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faMagnifyingGlass, faDownload, faLeaf } from '@fortawesome/free-solid-svg-icons';
import './AllOrders.css';
import Modal from 'react-modal';

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

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllUserOrder = async () => {
      try {
        const response = await getAllOrders();
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data);
          setFilteredOrders(response.data);
        }
      }
      catch (error) {
        console.log('Error fetching the order history: ', error);
      }
    }
    fetchAllUserOrder();
  }, [])

  console.log(orders);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterOrders(query);
};

const filterOrders = (query) => {
  const filtered = orders.filter(order =>
      order.orderNumber.toString().includes(query) ||
      order.orderDate.includes(query) ||
      order.customerName.toLowerCase().includes(query.toLowerCase()) ||
      order.totalPrice.toString().includes(query) ||
      order.orderStatus.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredOrders(filtered);
};

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div style={{marginTop: '74px'}}>
      <ShopperNavHeader />
    <div className='history-main-container'>
        <div className='name'>Order History</div>
        <div className="col-4 search-history">
          <div className="form-group has-search" >
            <span className="material-icons form-control-feedback"></span>
            <FontAwesomeIcon className='search-icon' color='silver' icon={faMagnifyingGlass} />
            <input type="text" value={searchQuery} onChange={handleSearchChange} className="form-control rounded-pill bg-grey" placeholder="Search" />
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
                  <td>{order.orderStatus}</td>
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

export default AllOrders;

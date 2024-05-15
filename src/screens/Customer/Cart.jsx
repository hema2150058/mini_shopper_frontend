import React, { useEffect, useState } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import axios from 'axios';
import { uploadExcel, getCartItems, updateCart, removeFromCart, placeOrder } from '../../api/CustomerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
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
    await updateCart({ userId: userId, productId: productId, quantity: quantity })
      .then((res) => {
        if (res.status == 200) {
          console.log(productId);
          console.log(this.cartItems);
          console.log(quantity);
          cartItems.find(p => p.productId == productId).quantity = quantity;
          console.log(this.cartItems);
          //calculateItemsPrice();
          // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

          // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

        }
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
          console.log(productId);
          console.log(this.cartItems);
          console.log(quantity);
          this.cartItems.find(p => p.productId == productId).quantity = quantity;
          console.log(this.cartItems);
          //calculateItemsPrice();
          // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

          // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

        }
      })
  }

  async function removeItemFromCart(productId) {
    console.log(productId);
    const userId = localStorage.getItem('userName');
    const removeproduct = { "userId": userId, "productId": productId }
    console.log(productId, userId);
    try{
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
        .then(response => { console.log(response.body);
          //calculateItemsPrice(); 
        })
        .catch(error => {
          console.log(error);
        });
    } catch(error) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(e.value);
  //   try {
  //     await placeOrder(e.value).then((res) => {
  //       console.log(res.data);
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

      <div>
        {!cartItems.length ? (
          <div className="w-75 mt-5 m-auto rounded">
            <div className="card w-75 m-auto bg-white rounded mt-5 px-5 py-2">
              <div className="card-body text-green text-center">
                <div className="fs-4 mb-2 text-green ls-3">Your Cart is Empty</div>
                <div>
                  <button type="button" className="fs-5 mt-4 mb-2 ls-2 snbtn shadow btn rounded text-light bg-green fw-bold">CONTINUE SHOPPING</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="fs-2 text-center pt-5 pb-5 ls-2 fw-bold">My Cart ({cartItems.length} items)</div>
            <div className="container px-5">
              <form>
                <div className="row justify-content-between">
                  <div className="col-8 pe-5">
                    <div className="row mb-4 p-2 pt-4 bg-white">
                      <div className="fs-5">
                        <span>Order Summary</span>
                      </div>
                      <table className="table mt-4" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                          <tr className="text-secondary text-center">
                            <th className="border-none">Name</th>
                            <th className="border-none">Price</th>
                            <th className="border-none">Quantity</th>
                            <th className="border-none">Total</th>
                            <th className="border-none"></th>
                          </tr>
                        </thead>
                        <tbody className="align-middle">
                          {cartItems.map(item => (
                            <tr key={item.productId} className="">
                              <td className="border-none">
                                <div className="fw-bold ls-1">
                                  <img src="../../../assets/BP-Tablet.png" alt="user-image" width="70" height="70" />
                                  {item.productName}
                                </div>
                              </td>
                              <td className="text-center border-none">
                                {item.price}
                              </td>
                              <td className="border-none">
                                <div className="input-group d-flex justify-content-center">
                                  <button type="button" className="quantity-left-minus btn btn-danger btn-number text-center" data-type="minus" data-field="">
                                    <span className="fa fa-minus"></span>
                                  </button>
                                  <input type="text" id="quantity" disabled value={item.quantity} name="quantity" className="text-center" style={{ width: '40px' }} min="1" />
                                  <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field="">
                                    <span className="fa fa-plus"></span>
                                  </button>
                                </div>
                              </td>
                              <td className="text-center border-none">
                                {(item.price *item.quantity).toFixed(2)}
                              </td>
                              <td className="border-none cursor-pointer">
                                <button type='button' onClick={() => removeItemFromCart(item.productId)}>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-4 p-4">
                    <div className="fw-bold fs-5 ls-1">Payment method</div>
                    <div className="w-100 mt-3">
                      <h2>Summary</h2>
                      <div>
                        <span>Subtotal:</span>
                        <span>{itemsPrice.toFixed(2)}</span>
                      </div>
                      <div>
                        <span>Delivery Fee:</span>
                        <span>{deliveryCharge.toFixed(2)}</span>
                      </div>
                      <div>
                        <span>Total:</span>
                        <span>{(itemsPrice).toFixed(2)}</span>
                      </div>
                      <div>
                        <button type="submit">Proceed to Payment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart;

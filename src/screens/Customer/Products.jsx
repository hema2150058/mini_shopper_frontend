import React, { useState, useEffect } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import { getProducts, addToCart, updateCart, getCart, getCartItems, isitemInCart, removeFromCart } from '../../api/CustomerApi';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Products.css';

const Products = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let userId = localStorage.getItem('userName');

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.status === 200) {
          console.log('got the products data');
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    // Fetch cart
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("userName");
        console.log(userId); // Assuming you store userId in localStorage after login
        const response = await getCart(userId);
        console.log('getting the cart');
        if (response.status === 200) {
          setCart(response.data);
          console.log(cart);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const getCartSize = () => {
    return cart.length;
  };

  const orderByAsc = () => {
    setProducts([...products.sort((a, b) => ((a.price ) - (b.price)))]);
  };

  const orderByDesc = () => {
    setProducts([...products.sort((a, b) => ((b.price) - (a.price )))]);
  };

   async function AddToCart(productId){
    try {
      const userId = localStorage.getItem("userName");
      console.log(productId);
      const response = await addToCart({ userId, productId, quantity: 1 });

      if (response.status === 201) {
        console.log('add to cart data', response);
        setCart([...cart, response.data]);
      }
    } catch (error) {
      console.error('error adding to cart:', error);
    }

  };

  const getItemQty = (productId) => cart.find((p) => p.productId === productId)?.quantity || 0;

  const isItemInCart = (productId) => cart.some((p) => p.productId === productId);

  const increaseQuantity = async (productId) => {
    try {
      const userId = localStorage.getItem('userName');
      const quantity = cart.find((p) => p.productId === productId)?.quantity + 1 || 1;
      await updateCart({ userId, productId, quantity }).then((res) => {
        if (res.status === 200) {
          // cart.find(p=>p.productId==productId).quantity=quantity;
          // console.log(cart);
          const updatedCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item);

          setCart(updatedCart);
        }
      })
    } catch (error) {
      console.error('enter updating quantity(increase quantity):', error);

    };
  };

  const decreaseQuantity = async (productId) => {
    try {
      const userId = localStorage.getItem('userName');
      let quantity = cart.find((p) => p.productId === productId)?.quantity;
      if (quantity > 1) {
        quantity -= 1;
      } else {
        removeProductFromCart(productId, userId);
        return;
      }
      await updateCart({ userId, productId, quantity }).then((res) => {
        
        if (res.status === 200) {
          const updatedCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item);
          setCart(updatedCart);
        }
      });
    } catch (error) {
      console.error("error updating quantity(decrease quantity)", error);
    };
  }
  const removeProductFromCart = async (productId, userId) => {
    try {
      await removeFromCart({ userId, productId }).then((res) => {
        if (res.status === 200) {
          const updatedCart = cart.filter((p) => p.productId !== productId);
          setCart(updatedCart);
        }
      });
    } catch (error) {
      console.error('error updating quantity', error);
    };
  }

  return (
    <div style={{ marginTop: '74px' }}>
      <CustomerNavHeader />



      
      <div className="container-fluid rectangleBox">
        <div className="row h-50 justify-content-center align-items-center">
          <div className="col-md-12 d-flex  flex-column justify-content-center align-items-center">
            <div className="UserInfo fs-2 ls-1 fw-bold" style={{textTransform: 'capitalize', marginTop: '20px'}}>Hi {userId}</div>
            <div className="mt-2 fs-2 fw-bold ls-1">
              Welcome to &nbsp;
              <img src={require('../../assets/Nav-header-logo.png') } alt="logo" className="img-fluid" width="200px" height="200px" />
              
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5">
        <div className="row justify-content-center align-items-center">
          {/* Search Input */}
          <div className="col-5 ">
            <div className="form-group has-search">
              <span className="material-icons form-control-feedback"></span>
              <input type="text" className="form-control rounded-pill bg-grey" placeholder="Search" value={filteredProducts} onChange={(e) => setFilteredProducts(e.target.value)} />
            </div>
          </div>
          {/* Sort Dropdown */}
          <div className="col-1">
            <div className="dropdown">
              <button className="btn bg-grey dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sortby</button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item cursor-pointer" onClick={orderByAsc}>Price : Low to High</button></li>
                <li><button className="dropdown-item cursor-pointer" onClick={orderByDesc}>Price : High to Low</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-3 mb-5" key={product.productId}>
              <div className="card h-100   shadow">
                <div className="img-background card-header px-3 pt-4 pb-2 bg-white border-0">
                  <img src={product.imageUrl} className=" position-relative" alt="No image" />
                  {/* {product.discount > 0 && (
                    <div className="position-absolute top-0 end-0 p-2 bg-warning text-light fw-bold">
                      -{product.discount}%
                    </div>
                  )} */}
                  <div className="card-title text-green font-weight-bold mt-2">
                    {product.productName}-{product.productDesc}
                  </div>
                </div>
                <div className="card-body mt-1">
                  <hr />
                  <div className="text-center">
                    <h4 className="card-text">
                      {product.discount === 0 ? (
                        `MRP ${product.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`
                      ) : (
                        <>
                          MRP 
                          <br />
                          {(product.price ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </>
                      )}
                    </h4>
                  </div>
                </div>
                <div className="card-footer bg-dark p-0">
                  <div className="d-flex w-100 justify-content-between">
                    {isItemInCart(product.productId) ? (
                      <div className="">
                        <div className="input-group">
                          <span className="input-group-btn">
                            <button type="button" onClick={() => decreaseQuantity(product.productId)} className="quantity-left-minus btn btn-danger btn-number text-center px-4" data-type="minus" data-field="">
                              <span className="fa fa-minus"></span>
                            </button>
                          </span>

                          <input type="text" id="quantity" disabled value={getItemQty(product.productId)} name="quantity" className="form-control input-number text-center" min="1" max="10" />

                          <span className="input-group-btn">
                            <button type="button" onClick={() => increaseQuantity(product.productId)} className="quantity-right-plus btn btn-success btn-number px-4" data-type="plus" data-field="">
                              <span className="fa fa-plus"></span>
                            </button>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-100">
                        <button onClick={() => AddToCart(product.productId)} className="py-2 ls-2 w-100 fw-bold btn text-light bg-darkgreen">
                          ADD TO <span className="fa fa-shopping-cart fs-5"></span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              {products.length === 0 && <p>No Products Found</p>}
            </div>
          </div>
        </div>
      </div>
</div>
      );
};


      export default Products;

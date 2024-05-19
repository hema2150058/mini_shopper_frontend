import React, { useState, useEffect } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import { getProducts, addToCart, updateCart, getCart, getCartItems, IsitemInCart, removeFromCart, uploadExcel } from '../../api/CustomerApi';
import { faCartShopping, faEye, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import ShopperNavHeader from '../HeaderFooter/ShopperNavHeader';

const ShopperInventory = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let userId = localStorage.getItem('userName');
  const navigate = useNavigate();
  const [cartSize, setCartSize] = useState(0);

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
    fetchCart();
  }, []);

  const fetchCart = async () => {

    const userId = localStorage.getItem("userName");
    console.log(userId); // Assuming you store userId in localStorage after login
    const response = await getCart(userId);
    console.log('getting the cart');
    if (response.status === 200) {
      setCart(response.data);
      console.log(cart);
    }
    console.log(cart);
  };

  function isItemInCart(productId) {
    return cart.some(p => {
      // console.log(p);
      return p.productId == productId
    });
  }

  const orderByAsc = () => {
    setProducts([...products.sort((a, b) => ((a.price) - (b.price)))]);
  };

  const orderByDesc = () => {
    setProducts([...products.sort((a, b) => ((b.price) - (a.price)))]);
  };

  async function handleAddToCart(productId) {
    try {
      // Check if the item is already in the cart
      const userId = localStorage.getItem("userName");
      const response = isItemInCart(productId);
      console.log(response);
      const removeproduct = { "userId": userId, "productId": productId }
      if (response === true) {
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
          .then(response => { console.log(response.body); fetchCart(); })
          .catch(error => {
            console.log(error);
          });
        //setInCart(false);
      }
      else {
        // Item is already in the cart, so remove it
        // Item is not in the cart, so add it
        await addToCart({ userId, productId, quantity: 1 });
        fetchCart();
        console.log('added to cart');
        //setInCart(true);
      }

      //await fro update cart
    } catch (error) {
      console.error("Error adding/removing item from cart:", error);
    }
  };

  return (
    <div style={{ marginTop: '74px' }}>
      <ShopperNavHeader />
      <div className="container-fluid rectangleBox">
        <div className="row h-50 justify-content-center align-items-center">
          <div className="col-md-12 d-flex  flex-column justify-content-center align-items-center">
            <div className="UserInfo fs-2 ls-1 fw-bold" style={{ textTransform: 'capitalize', marginTop: '20px' }}>Hi {userId}</div>
            <div className="mt-2 fs-2 fw-bold ls-1">
              Welcome to &nbsp;
              <img src={require('../../assets/Nav-header-logo.png')} alt="logo" className="img-fluid" width="200px" height="200px" />
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5">
        <div className="row justify-content-center align-items-center">
          {/* Search Input */}
          <div className="col-4 ">
            <div className="form-group has-search">
              <span className="material-icons form-control-feedback"></span>
              <input type="text" className="form-control rounded-pill bg-grey" placeholder="Search" value={filteredProducts} onChange={(e) => setFilteredProducts(e.target.value)} />
            </div>
          </div>
          {/* Sort Dropdown */}
          <div className="col-1" style={{ marginTop: '-15px' }}>
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
      {/* ---------------products----------------   */}
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-3 mb-5" key={product.productId}>
              <div className="card h-80   shadow">
                <div className="img-background card-header px-3 pt-4 pb-2 bg-white border-0">
                  <img src={product.imageUrl} className=" position-relative" alt="No image" />
                  {/* {product.discount > 0 && (
                    <div className="position-absolute top-0 end-0 p-2 bg-warning text-light fw-bold">
                      -{product.discount}%
                    </div>
                  )} */}

                </div>
                <div className="card-title-productname font-weight-bold ">
                  {product.productName}
                </div>
                <div className="card-title-proddesc font-weight-bold mt-1">
                  {product.productDesc}
                </div>
                <div className="card-body">
                  <hr />
                  <div className="text-start">
                    <h6 className="card-text">
                      MRP &nbsp;
                      {(product.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </h6>


                    <div className="card-text h-20" style={{ marginRight: '10px', fontWeight: 600 }}>
                      &nbsp;Qty- {product.stockQuantity}
                    </div>
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
  )
}

export default ShopperInventory;

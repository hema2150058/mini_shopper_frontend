import React, { useState, useEffect } from 'react'
import CustomerNavHeader from '../HeaderFooter/CustomerNavHeader';
import { getProducts, addToCart, updateCart, getCart, getCartItems, IsitemInCart, removeFromCart, uploadExcel } from '../../api/CustomerApi';
import { faCartShopping, faEye, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Products.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {

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

    // Fetch cart
    
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
      return p.productId == productId});
  }

  const getCartSize = () => {
    console.log(cart.length);
    //setCartSize(cartSize);
    //console.log(cartSize);
    return cart.length;
  };

  const orderByAsc = () => {
    setProducts([...products.sort((a, b) => ((a.price) - (b.price)))]);
  };

  const orderByDesc = () => {
    setProducts([...products.sort((a, b) => ((b.price) - (a.price)))]);
  };

  async function AddToCart(productId) {
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

  //const isItemInCart = (productId) => cart.some((p) => p.productId === productId);


  //const [inCart, setInCart] = useState(false);

  async function handleAddToCart(productId) {
    try {
      // Check if the item is already in the cart
      const userId = localStorage.getItem("userName");
      const response = isItemInCart(productId );
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
          .then(response => { console.log(response.body);fetchCart(); })
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

  // async function handledeleteToCart(productId) {
  //   try {
  //   const userId = localStorage.getItem("userName");
  //     const response = await IsitemInCart({userId, productId });
  //     const removeproduct = { "userId": userId, "productId" : productId}
  //     if(response.data === true) {
  //       console.log('inside the deletehandle');
  //       fetch('http://localhost:8082/removeFromCart',{
  //         method: "DELETE",
  //         body: JSON.stringify(removeproduct)
  //         ,
  //         headers: {
  //             "Content-Type": "application/json",
  //             'Accept': 'application/json',
  //             "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
  //         },
  //     })
  //       .then(response => {console.log(response.body)})
  //       .catch(error => {
  //         console.log(error);
  //       });
  //       setInCart(false);
  //     }
  // }catch (error){
  //   console.error('error deleting from handledelete', error);
  // }
  // }
  // async function isItempresent() {
  //   const response = await
  // }

  // const increaseQuantity = async (productId) => {
  //   try {
  //     const userId = localStorage.getItem('userName');
  //     const quantity = cart.find((p) => p.productId === productId)?.quantity + 1 || 1;
  //     await updateCart({ userId, productId, quantity }).then((res) => {
  //       if (res.status === 200) {
  //         // cart.find(p=>p.productId==productId).quantity=quantity;
  //         // console.log(cart);
  //         const updatedCart = cart.map(item =>
  //           item.productId === productId ? { ...item, quantity } : item);

  //         setCart(updatedCart);
  //       }
  //     })
  //   } catch (error) {
  //     console.error('enter updating quantity(increase quantity):', error);

  //   };
  // };

  // const decreaseQuantity = async (productId) => {
  //   try {
  //     const userId = localStorage.getItem('userName');
  //     let quantity = cart.find((p) => p.productId === productId)?.quantity;
  //     if (quantity > 1) {
  //       quantity -= 1;
  //     } else {
  //       removeProductFromCart(productId, userId);
  //       return;
  //     }
  //     await updateCart({ userId, productId, quantity }).then((res) => {

  //       if (res.status === 200) {
  //         const updatedCart = cart.map(item =>
  //           item.productId === productId ? { ...item, quantity } : item);
  //         setCart(updatedCart);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("error updating quantity(decrease quantity)", error);
  //   };
  // }
  // const removeProductFromCart = async (productId, userId) => {
  //   try {
  //     await removeFromCart({ userId, productId }).then((res) => {
  //       if (res.status === 200) {
  //         const updatedCart = cart.filter((p) => p.productId !== productId);
  //         setCart(updatedCart);
  //       }
  //     });
  //   } catch (error) {
  //     console.error('error updating quantity', error);
  //   };
  // }


  // ------------------------file upload-----------------

  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  async function handleSubmit(event) {
    
      event.preventDefault()
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      console.log(formData);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      await uploadExcel(formData)
        .then((response) => {

          console.log(response.data);
          localStorage.setItem('orderNumber', response.data);
          console.log(response.data);
          alert('File uploaded successfully and ' + response.data);
          event = '';
          
          navigate('/checkout');
        })
        .catch(error => {
          alert('Error uploading file', error);
        })
    
  };

  

  return (
    <div style={{ marginTop: '74px' }}>
      <CustomerNavHeader cartSize={cart.length} />




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
          <div className="col-3">
            <form  onSubmit={handleSubmit} id='upload-form-group'>
              {/* //<h1>React File Upload</h1> */}
              <input type="file" accept=".xl*" onChange={(e) => handleChange(e)} />
              <span><button className='upload-button' type="submit">Upload</button></span>
            </form>
          </div>
        </div>
      </div>
      {/* -----products-- */}
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
                <div className="card-title-productname text-green font-weight-bold ">
                  {product.productName}
                </div>
                <div className="card-title-proddesc text-green font-weight-bold mt-1">
                  {product.productDesc}
                </div>
                <div className="card-body">
                  <hr />
                  <div className="text-start">
                    <h6 className="card-text">
                      MRP &nbsp;
                      {(product.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </h6>


                    <div className="card-text h-20 shadow" style={{marginRight: '20px'}}>
                      <div className={`btn ${isItemInCart(product.productId) ? "btn-outline-success" : "btn-outline-secondary"
                        } btn-number`} onClick={() => handleAddToCart(product.productId)}>
                        <FontAwesomeIcon size='lg' icon={faCartShopping} />
                      </div>
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
        );
};


        export default Products;

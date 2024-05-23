import React, { Children } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, Navigate } from 'react-router-dom';
import Register from './screens/Authentication/Register';

import Login from './screens/Authentication/Login';
import LandingPage from './screens/Authentication/LandingPage';
import AuthRoute from './screens/Authentication/AuthRoute';
import CustomerNavHeader from './screens/HeaderFooter/CustomerNavHeader';
import Products from './screens/Customer/Products';
import Checkout from './screens/Customer/Checkout';
import PurchaseHistory from './screens/Customer/PurchaseHistory';
import Cart from './screens/Customer/Cart';
import ShopperNavHeader from './screens/HeaderFooter/ShopperNavHeader';
import UserProfile from './screens/Authentication/UserProfile';
import AllCustomers from './screens/Shopper/AllCustomers';
import AllOrders from './screens/Shopper/AllOrders';
import PendingOrders from './screens/Shopper/PendingOrders';
import ProtectedRoute from './ProtectedRoute';
import AddressForm from './components/Test2';
import FileUpload from './components/Test4';
import ShopperInventory from './screens/Shopper/ShopperInventory';
import Footer from './screens/HeaderFooter/Footer';
import NavBar from './components/TestHeader';
import { isShopper, isUserLoggedIn } from './components/AuthService';


function App() {

  const AuthorizedUser = ({ children }) => {
    const isAuth = isShopper();
    const isLoggedIn = isUserLoggedIn();
    if(isAuth && isLoggedIn) return children;
    return <Navigate to="/products" />
  }
 
  const UnAuthorizedUser = ({ children }) => {
    const isAuth = isShopper();
    const isLoggedIn = isUserLoggedIn();
    if(!isAuth && isLoggedIn) return children;
    return <Navigate to="/pendingOrders" />
  }

  const LoginPrevention = ({ children }) => {
    const isAuth = isShopper();
    const isLoggedIn = isUserLoggedIn();
    if(!isLoggedIn) return children;
    if(isAuth) return <Navigate to='/pendingOrders' />
    return <Navigate to="/products" />
  }

  return (
    <Router>
      <Routes>
        <Route exact='true' path='/'   element={
        <LoginPrevention> 
          <Login />
        </LoginPrevention>} />
        <Route path='/login'   element={<LoginPrevention> 
          <Login />
        </LoginPrevention>} />
        <Route path='/register' element={<LoginPrevention> 
          <Register />
        </LoginPrevention>} /> 
        <Route path='landingPage' Component={LandingPage} />
        <Route path='userprofile' element={
            <UserProfile />
        } />
        
        {/* ----------customers---------- */}
        {/* <Route path='/customerNavHeader' Component={CustomerNavHeader} /> */}
        <Route path='/products' element={
          <UnAuthorizedUser>
            <Products />
          </UnAuthorizedUser>} />
        <Route path='/checkout' element= {
          <UnAuthorizedUser>
            <Checkout />
          </UnAuthorizedUser>
        } />
        <Route path='/purchaseHistory' element={
          <UnAuthorizedUser>
            <PurchaseHistory />
          </UnAuthorizedUser>
        }/>
        <Route path='/cart' element={
          <UnAuthorizedUser>
            <Cart />
          </UnAuthorizedUser>
        } />

        {/* -------------Shopper------------ */}
        {/* <Route path='/shopperNavHeader' Component={ShopperNavHeader} /> */}
            {/* --products-- also gonna be added */}
        <Route path='/pendingOrders' element={
          <AuthorizedUser>
            <PendingOrders />
          </AuthorizedUser>
        } />
        <Route path='allCustomers' 
        element={
          <AuthorizedUser>
            <AllCustomers />
          </AuthorizedUser>
        } />
        <Route path='/allOrders' element={
          <AuthorizedUser>
            <AllOrders />
          </AuthorizedUser>
        } />
        <Route path='/shopperInventory' element={
          <AuthorizedUser>
            <ShopperInventory />
          </AuthorizedUser>
        } />

        <Route path='authNav' Component={AuthRoute} />
        <Route path='footer' Component={Footer} />
        <Route path='/updateAddress' Component={AddressForm} />
        <Route path='/fileUpload' Component={FileUpload} />
        {/* <Route path='/navbar' Component={NavBar} /> */}
        {/* <Route path='/admin'  element= {<ProtectedRoute component={AllCustomers}  allowedRoles={[ROLES.ADMIN]} />}  /> */}
      </Routes>
    </Router>

  );
}

export default App;

import React from 'react';
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


function App() {

  const userId = localStorage.getItem('userName');
  
  const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  };
  const isAuthenticated = () => {
    // Check if user is logged in, and their role
    // For demonstration, let's assume the user is logged in as an admin
    if(userId === 'Shopper123'){
      //let rolee = ROLES.ADMIN
    return {
      isLoggedIn: true,
      role: ROLES.ADMIN, 
    }}
  };  

  // const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  //   const { isLoggedIn, role } = isAuthenticated();
   
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) => {
  //         if (isLoggedIn && allowedRoles.includes(role)) {
  //           return <Component {...props} />;
  //         } else {
  //           return <Navigate to="/login" />;
  //         }
  //       }}
  //     />
  //   );
  // };
  
  //console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        {/* <Route exact path = '/' element={isAuthenticated ?  <LandingPage/> : <Login/> } />
        <Route path='/login'  element= {isAuthenticated ? <LandingPage/> : <Navigate to='/login' /> } /> */}
        <Route exact='true' path='/'   element={<Login />} />
        <Route path='/login'   element={<Login />} />
        {/* <Route path='/register' element= {isAuthenticated ? <LandingPage/> : <Register />}  /> */}
        {/* <Route path='/landingPage' element= {isAuthenticated ? <LandingPage/> : <Navigate to='/register' />}  />  */}
        <Route path='/register' Component={Register} /> 
        <Route path='landingPage' Component={LandingPage} />
        <Route path='userprofile' Component={UserProfile} />
        
        {/* ----------customers---------- */}
        <Route path='/customerNavHeader' Component={CustomerNavHeader} />
        <Route path='/products' Component={Products} />
        <Route path='/checkout' Component={Checkout} />
        <Route path='/purchaseHistory' Component={PurchaseHistory} />
        <Route path='/cart' Component={Cart} />

        {/* -------------Shopper------------ */}
        <Route path='/shopperNavHeader' Component={ShopperNavHeader} />
            {/* --products-- also gonna be added */}
        <Route path='/pendingOrders' Component={PendingOrders} />
        <Route path='allCustomers' Component={AllCustomers} />
        <Route path='/allOrders' Component={AllOrders} />
        <Route path='/shopperInventory' Component={ShopperInventory} />

        <Route path='authNav' Component={AuthRoute} />
        <Route path='/updateAddress' Component={AddressForm} />
        <Route path='/fileUpload' Component={FileUpload} />
        {/* <Route path='/admin'  element= {<ProtectedRoute component={AllCustomers}  allowedRoles={[ROLES.ADMIN]} />}  /> */}
      </Routes>
    </Router>


    // <Routes>
    //       <Route path='/' element={<LandingPage />} />
    //       <Route path='/signup' element={isAuth ? <Navigate to="/" /> : <SignUp />} />
    //       <Route path='/login' element={isAuth ? <Navigate to="/" /> : <Login />} />
    //       <Route path='/forgetpassword' element={isAuth ? <Navigate to="/" /> : <ForgetPassword />} />
    //       <Route path='/contactus' element={<ContactUs />} />
    //       {/* Protected Routes starts from here */}
    //       <Route element={<ProtectedRoutes auth={isAuth}/>}>
    //         <Route path='/dashboard' element={<Dashboard />} />
    //         <Route path='/availablechitplans' element={<AvailableChitPlans/>}/>
    //         <Route path='/notifications' element={<Notifications/>}/>
    //         <Route path='/chitplaninfo' element={<ChitPlanInfo/>}/>
    //         <Route path='/payment' element={<PaymentPage />}/>
    //       </Route>
    //     </Routes>

  );
}

export default App;

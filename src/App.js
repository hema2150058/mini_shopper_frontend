import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Switch, Navigate } from 'react-router-dom';
import Register from './screens/Authentication/Register';

import Login from './screens/Authentication/Login';
import LandingPage from './screens/Authentication/LandingPage';
import AuthRoute from './screens/Authentication/AuthRoute';


function App() {

  const isAuthenticated = !!localStorage.getItem('userName');
  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route exact path = '/' element={isAuthenticated ?  <LandingPage/> : <Login/> } />
        <Route path='/login'  element= {isAuthenticated ? <LandingPage/> : <Navigate to='/login' /> } />
        {/* {/* <Route path='login' Component={Login} /> */}
        
        <Route path='/register' element= {isAuthenticated ? <LandingPage/> : <Register />}  />
        {/* <Route path='/landingPage' element= {isAuthenticated ? <LandingPage/> : <Navigate to='/register' />}  />  */}
        <Route path='/register' Component={Register} /> 
        <Route path='landingPage' Component={LandingPage} />
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

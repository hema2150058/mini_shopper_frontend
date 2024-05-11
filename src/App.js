import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './screens/Authentication/Register';

import Login from './screens/Authentication/Login';
import landingPage from './screens/Authentication/LandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/' Component={Login} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/landingPage' Component={landingPage} />
      </Routes>
    </Router>
  );
}

export default App;

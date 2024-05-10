import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './screens/Authentication/Register';

import Login from './screens/Authentication/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/' Component={Login} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
      </Routes>
    </Router>
  );
}

export default App;

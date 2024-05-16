import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
 //import isAuthenticated from './App';

 const userId = localStorage.getItem('userName');
  
 const ROLES = {
   ADMIN: 'admin',
   USER: 'user',
 };
 const isAuthenticated = () => {
   // Check if user is logged in, and their role
   // For demonstration, let's assume the user is logged in as an admin
   console.log(2);
   if(userId === 'Shopper123'){
     //let rolee = ROLES.ADMIN
     console.log(userId);
   return {
     isLoggedIn: true,
     role: ROLES.ADMIN, 
   }}
   
 };  
const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    console.log('l');
    const { isLoggedIn, role } = isAuthenticated();
    console.log(isLoggedIn,role);
//   const isAuthenticated = true; // Replace with your authentication logic
//   const userRole = 'admin'; // Replace with actual user role
 
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn && allowedRoles.includes(role)) {
          return <Component {...props} />;
        } else {
          return <Navigate to="/login" />;
        }
      }}
    />
  );
};
 
export default ProtectedRoute;
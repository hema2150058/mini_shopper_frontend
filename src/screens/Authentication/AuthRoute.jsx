import React, { Component } from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';
import Login from './Login';
import LandingPage from './LandingPage';

const AuthRoute = ({isAuthenticated}) => {
    
    return (
        isAuthenticated ? <LandingPage/> : <Login />
    )

};
export default AuthRoute;

const ProtectedRoutes = ({auth}) => {
    
    return (auth === true ? <Outlet /> : <Navigate to="/" replace/>)
}

const AuthRoute1 = ({isAuthenticated}) => {
    return (isAuthenticated ? <Outlet /> : <Navigate to="/" replace/>)
};

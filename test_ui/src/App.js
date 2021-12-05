import React,{Fragment, useEffect, useState} from "react";
import { BrowserRouter, Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import './assets/css/style.css'
import apiBaseUrl from "./config";

// import pages
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/UserDashboard";

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Tostbox popup of messages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, checkIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}verify`, {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? checkIsAuthenticated(true) : checkIsAuthenticated(false);
      localStorage.setItem('loggedIN', isAuthenticated);
      console.log('parseRes',parseRes)
    } catch (err) {
      console.log('verification Error')
      console.error(err.message);
    }
  };

  const setAuth = boolean => {
    checkIsAuthenticated(boolean);
  };

  useEffect(() => {
    checkAuthenticated();
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            {/* <Route path="/sign-in" element={() => {
              !isAuthenticated ? <SignIn /> : <Navigate to="/user-dashboard" />
            } 
            }/> */}
            {/* <Route path="/user-dashboard"  element={(props) => {
              !isAuthenticated ? <SignIn {...props} setAuth={setAuth}/> : <UserDashboard />
            } 
            }/> */}
          </Routes>
          <Footer />
        </Fragment>
      </BrowserRouter>  
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />      
    </div>
  );
}

export default App;

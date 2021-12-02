import React,{Fragment} from "react";
import { BrowserRouter, Router, Route, Routes, Redirect } from "react-router-dom";
import './App.css';
import './assets/css/style.css'

// import pages
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
          <Footer />
        </Fragment>
      </BrowserRouter>        
    </div>
  );
}

export default App;

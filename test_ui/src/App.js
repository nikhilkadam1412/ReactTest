import React,{Fragment} from "react";
import { BrowserRouter, Router, Route, Routes, Redirect } from "react-router-dom";
import './App.css';
import './assets/css/style.css'

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer />
        </Fragment>
      </BrowserRouter>        
    </div>
  );
}

export default App;

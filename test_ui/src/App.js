import React,{Component} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }

  checkAuthenticated = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}verify`, {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? this.setState({ isAuthenticated: true }) : this.setState({ isAuthenticated: false });
      console.log('parseRes',parseRes)
    } catch (err) {
      console.log('verification Error')
      console.error(err.message);
    }
  };

  setAuth = boolean => {
    this.setState({ isAuthenticated: boolean })
  };

  componentDidMount() {
    this.checkAuthenticated();
  }

  render() {
    return (
    <div className="App">
      <BrowserRouter basename="/">
          <Switch>
            <Route exact path="/">
              <Header setAuth={this.setAuth}/>
              <HomePage />
              <Footer />
            </Route>
            <Route path="/about-us">
              <Header setAuth={this.setAuth}/>
              <AboutUs />
              <Footer />
            </Route>

            <Route exact path="/sign-in" render={props =>
                !this.state.isAuthenticated ? (
                  <>
                    <Header setAuth={this.setAuth}/>
                    <SignIn props={props} setAuth={this.setAuth} />
                    <Footer />
                  </>
                ) : (
                  <Redirect to="/user-dashboard" />
                )
              } />

            <Route exact path="/user-dashboard" render={props =>
                !this.state.isAuthenticated ? (
                  <>
                    <Header setAuth={this.setAuth}/>
                    <SignIn props={props} setAuth={this.setAuth} />
                    <Footer />
                  </>
                ) : (
                  <>
                    <Header setAuth={this.setAuth}/>
                    <UserDashboard />
                    <Footer />
                  </>
                )
              } />
            
          </Switch>
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
  )};
}

export default App;
